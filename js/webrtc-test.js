(() => {
  const SIGNALING_SERVICE_URL = 'https://endless-dungeon-signal.netapet.chatgpt.site';
  const overlay = document.getElementById('rtcTestOverlay');
  const openButton = document.getElementById('openRtcTestButton');
  const closeButton = document.getElementById('closeRtcTestButton');
  const hostButton = document.getElementById('rtcHostButton');
  const joinButton = document.getElementById('rtcJoinButton');
  const acceptAnswerButton = document.getElementById('rtcAcceptAnswerButton');
  const copyButton = document.getElementById('rtcCopyButton');
  const roomCodeInput = document.getElementById('rtcRoomCode');
  const createRoomButton = document.getElementById('rtcCreateRoomButton');
  const joinRoomButton = document.getElementById('rtcJoinRoomButton');
  const signalInput = document.getElementById('rtcSignalInput');
  const signalOutput = document.getElementById('rtcSignalOutput');
  const status = document.getElementById('rtcStatus');
  const messageInput = document.getElementById('rtcMessageInput');
  const sendButton = document.getElementById('rtcSendButton');
  const messageLog = document.getElementById('rtcMessageLog');
  let peer = null;
  let channel = null;
  let roomPollTimer = null;
  let hostedRoom = null;
  let localRole = 'none';

  const setStatus = (text, kind = '') => {
    status.textContent = text;
    status.className = `rtc-status ${kind}`.trim();
  };

  const addLog = (text) => {
    const line = document.createElement('div');
    line.textContent = text;
    messageLog.appendChild(line);
    messageLog.scrollTop = messageLog.scrollHeight;
  };

  const encodeDescription = (description) => btoa(JSON.stringify(description));
  const decodeDescription = (text) => JSON.parse(atob(text.trim()));
  const delay = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

  const normalizeRoomCode = () => roomCodeInput.value.toUpperCase().replace(/[^A-HJ-NP-Z2-9]/g, '').slice(0, 6);
  const randomRoomCode = () => {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const bytes = crypto.getRandomValues(new Uint8Array(6));
    return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('');
  };
  const requestSignal = async (path, options = {}) => {
    const headers = { ...(options.headers || {}) };
    if (options.body) headers['content-type'] = 'application/json';
    let response;
    try {
      response = await fetch(`${SIGNALING_SERVICE_URL}${path}`, { ...options, mode: 'cors', cache: 'no-store', headers });
    } catch {
      throw new Error('This browser could not reach the room service. Open the game in a normal Chrome window and try again.');
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.error || `Connection service returned ${response.status}.`);
      error.status = response.status;
      throw error;
    }
    return data;
  };

  const waitForIce = (connection) => new Promise((resolve) => {
    if (connection.iceGatheringState === 'complete') {
      resolve();
      return;
    }
    const onStateChange = () => {
      if (connection.iceGatheringState !== 'complete') return;
      connection.removeEventListener('icegatheringstatechange', onStateChange);
      resolve();
    };
    connection.addEventListener('icegatheringstatechange', onStateChange);
  });

  const attachChannel = (dataChannel) => {
    channel = dataChannel;
    channel.onopen = () => {
      setStatus('Connected directly! The WebRTC data channel is open.', 'connected');
      messageInput.disabled = false;
      sendButton.disabled = false;
      addLog('Connection opened.');
      channel.send(JSON.stringify({ type: 'hello', sentAt: Date.now() }));
      overlay.classList.add('hidden');
      window.dispatchEvent(new CustomEvent('dungeon-rtc-connected', { detail: { role: localRole } }));
    };
    channel.onclose = () => {
      setStatus('Connection closed.', 'failed');
      messageInput.disabled = true;
      sendButton.disabled = true;
    };
    channel.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'hello') {
          channel.send(JSON.stringify({ type: 'hello-reply', sentAt: message.sentAt }));
          addLog('Other PC says hello.');
        } else if (message.type === 'hello-reply') {
          addLog(`Ping: ${Date.now() - message.sentAt} ms`);
        } else if (message.type === 'text') {
          addLog(`Other PC: ${message.text}`);
        } else if (message.type === 'player-state') {
          window.dispatchEvent(new CustomEvent('dungeon-remote-player-state', { detail: message.state }));
        } else if (message.type === 'session-state') {
          window.dispatchEvent(new CustomEvent('dungeon-remote-session-state', { detail: message.state }));
        } else if (message.type === 'arena-state') {
          window.dispatchEvent(new CustomEvent('dungeon-remote-arena-state', { detail: message.state }));
        } else if (message.type === 'player-action') {
          window.dispatchEvent(new CustomEvent('dungeon-remote-player-action', { detail: message.action }));
        }
      } catch {
        addLog(`Other PC: ${event.data}`);
      }
    };
  };

  const createPeer = () => {
    if (roomPollTimer) window.clearInterval(roomPollTimer);
    roomPollTimer = null;
    peer?.close();
    peer = new RTCPeerConnection({ iceServers: [] });
    peer.onconnectionstatechange = () => {
      if (peer.connectionState === 'connecting') setStatus('Connecting directly to the other PC...');
      if (peer.connectionState === 'failed' || peer.connectionState === 'disconnected') {
        setStatus(`Connection ${peer.connectionState}. Confirm both PCs are on the same Wi-Fi and try again.`, 'failed');
      }
    };
    peer.ondatachannel = (event) => attachChannel(event.channel);
    return peer;
  };

  const hostRoom = async () => {
    try {
      localRole = 'host';
      let code = normalizeRoomCode();
      if (code.length !== 6) code = randomRoomCode();
      roomCodeInput.value = code;
      const connection = createPeer();
      attachChannel(connection.createDataChannel('dungeon-test', { ordered: true }));
      await connection.setLocalDescription(await connection.createOffer());
      setStatus('Preparing the room...');
      await waitForIce(connection);
      const created = await requestSignal(`/rooms/${code}/offer`, {
        method: 'POST',
        body: JSON.stringify({ offer: encodeDescription(connection.localDescription) }),
      });
      hostedRoom = { code, hostKey: created.hostKey };
      setStatus('Checking that the room is visible to the other player...');
      let verified = false;
      for (let attempt = 0; attempt < 8 && !verified; attempt += 1) {
        try {
          const check = await requestSignal(`/rooms/${code}/offer`);
          verified = check.offer === encodeDescription(connection.localDescription);
        } catch {
          await delay(350);
        }
      }
      if (!verified) throw new Error('The room was created but is not visible yet. Please host again.');
      setStatus(`Room ${code} is ready. Tell the other player this code.`);
      roomPollTimer = window.setInterval(async () => {
        try {
          const result = await requestSignal(`/rooms/${code}/answer?hostKey=${encodeURIComponent(created.hostKey)}`);
          if (!result.answer || peer.remoteDescription) return;
          await peer.setRemoteDescription(decodeDescription(result.answer));
          window.clearInterval(roomPollTimer);
          roomPollTimer = null;
          setStatus('Other player joined. Connecting directly...');
        } catch (error) {
          if (!peer.remoteDescription) setStatus(error.message, 'failed');
        }
      }, 1200);
    } catch (error) {
      setStatus(`Could not host room: ${error.message}`, 'failed');
    }
  };

  const joinRoom = async () => {
    try {
      localRole = 'join';
      const code = normalizeRoomCode();
      roomCodeInput.value = code;
      if (code.length !== 6) throw new Error('Enter the host\'s six-character code.');
      let room = null;
      let lastLookupError = null;
      for (let attempt = 0; attempt < 12 && !room; attempt += 1) {
        setStatus(`Finding room ${code}... attempt ${attempt + 1} of 12`);
        try {
          room = await requestSignal(`/rooms/${code}/offer`);
        } catch (error) {
          lastLookupError = error;
          if (error.status && error.status !== 404) throw error;
          await delay(500);
        }
      }
      if (!room) throw lastLookupError || new Error('Room was not found.');
      setStatus(`Room ${code} found. Preparing the direct connection...`);
      const connection = createPeer();
      await connection.setRemoteDescription(decodeDescription(room.offer));
      await connection.setLocalDescription(await connection.createAnswer());
      await waitForIce(connection);
      await requestSignal(`/rooms/${code}/answer`, {
        method: 'POST',
        body: JSON.stringify({ answer: encodeDescription(connection.localDescription) }),
      });
      setStatus('Answer sent. Connecting directly to the host...');
    } catch (error) {
      setStatus(`Could not join room: ${error.message}`, 'failed');
    }
  };

  roomCodeInput.addEventListener('input', () => {
    roomCodeInput.value = normalizeRoomCode();
  });
  createRoomButton.addEventListener('click', hostRoom);
  joinRoomButton.addEventListener('click', joinRoom);

  hostButton.addEventListener('click', async () => {
    try {
      const connection = createPeer();
      attachChannel(connection.createDataChannel('dungeon-test', { ordered: true }));
      await connection.setLocalDescription(await connection.createOffer());
      setStatus('Gathering local network details...');
      await waitForIce(connection);
      signalOutput.value = encodeDescription(connection.localDescription);
      setStatus('Offer ready. Copy it to PC 2, then paste PC 2\'s answer back here.');
    } catch (error) {
      setStatus(`Could not create offer: ${error.message}`, 'failed');
    }
  });

  joinButton.addEventListener('click', async () => {
    try {
      const connection = createPeer();
      await connection.setRemoteDescription(decodeDescription(signalInput.value));
      await connection.setLocalDescription(await connection.createAnswer());
      setStatus('Gathering local network details...');
      await waitForIce(connection);
      signalOutput.value = encodeDescription(connection.localDescription);
      setStatus('Answer ready. Copy it back to the host PC.');
    } catch (error) {
      setStatus(`Could not accept offer: ${error.message}`, 'failed');
    }
  });

  acceptAnswerButton.addEventListener('click', async () => {
    try {
      if (!peer) throw new Error('Create a host offer first.');
      await peer.setRemoteDescription(decodeDescription(signalInput.value));
      setStatus('Answer accepted. Connecting directly...');
    } catch (error) {
      setStatus(`Could not accept answer: ${error.message}`, 'failed');
    }
  });

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(signalOutput.value);
      setStatus('Generated connection text copied.');
    } catch {
      signalOutput.select();
      setStatus('Clipboard permission was blocked. The text is selected; copy it manually.');
    }
  });

  const sendMessage = () => {
    const text = messageInput.value.trim();
    if (!text || channel?.readyState !== 'open') return;
    channel.send(JSON.stringify({ type: 'text', text }));
    addLog(`This PC: ${text}`);
    messageInput.value = '';
  };
  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });

  window.dungeonRtc = {
    get connected() {
      return channel?.readyState === 'open';
    },
    get role() {
      return localRole;
    },
    sendPlayerState(state) {
      if (channel?.readyState !== 'open' || channel.bufferedAmount > 65536) return false;
      channel.send(JSON.stringify({ type: 'player-state', state }));
      return true;
    },
    sendSessionState(state) {
      if (channel?.readyState !== 'open' || channel.bufferedAmount > 65536) return false;
      channel.send(JSON.stringify({ type: 'session-state', state }));
      return true;
    },
    sendArenaState(state) {
      if (channel?.readyState !== 'open' || channel.bufferedAmount > 131072) return false;
      channel.send(JSON.stringify({ type: 'arena-state', state }));
      return true;
    },
    sendPlayerAction(action) {
      if (channel?.readyState !== 'open' || channel.bufferedAmount > 65536) return false;
      channel.send(JSON.stringify({ type: 'player-action', action }));
      return true;
    },
  };

  openButton.addEventListener('click', () => overlay.classList.remove('hidden'));
  closeButton.addEventListener('click', () => overlay.classList.add('hidden'));
  window.addEventListener('keydown', (event) => {
    if (overlay.classList.contains('hidden')) return;
    event.stopImmediatePropagation();
    if (event.key === 'Escape') overlay.classList.add('hidden');
  }, true);
})();
