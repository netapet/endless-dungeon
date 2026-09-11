(() => {
  const SERVICE_URL = 'https://endless-dungeon-signal.netapet.chatgpt.site';
  const TOKEN_KEY = 'endlessDungeonAccountSession';
  const NAME_KEY = 'endlessDungeonAccountName';
  const loginOverlay = document.getElementById('accountLoginOverlay');
  const loginForm = document.getElementById('accountLoginForm');
  const nameInput = document.getElementById('accountNameInput');
  const pinInput = document.getElementById('accountPinInput');
  const loginButton = document.getElementById('accountLoginButton');
  const loginStatus = document.getElementById('accountLoginStatus');
  const forgotPinButton = document.getElementById('accountForgotPinButton');
  const recoveryOverlay = document.getElementById('accountRecoveryOverlay');
  const recoveryForm = document.getElementById('accountRecoveryForm');
  const recoveryQuestions = document.getElementById('accountRecoveryQuestions');
  const recoveryPinInput = document.getElementById('accountRecoveryPinInput');
  const recoveryCancelButton = document.getElementById('accountRecoveryCancelButton');
  const recoveryStatus = document.getElementById('accountRecoveryStatus');
  const settingsButton = document.getElementById('accountSettingsButton');
  const settingsOverlay = document.getElementById('accountSettingsOverlay');
  const settingsName = document.getElementById('accountSettingsName');
  const settingsStatus = document.getElementById('accountSettingsStatus');
  const saveNowButton = document.getElementById('accountSaveNowButton');
  const logoutButton = document.getElementById('accountLogoutButton');
  const settingsCloseButton = document.getElementById('accountSettingsCloseButton');
  let token = sessionStorage.getItem(TOKEN_KEY) || '';
  let accountName = sessionStorage.getItem(NAME_KEY) || '';
  let profileVersion = 0;
  let lastSaveText = '';
  let saveTimer = null;
  let gameLoaded = false;

  const setLoginStatus = (message, error = false) => {
    loginStatus.textContent = message;
    loginStatus.classList.toggle('error', error);
  };

  const request = async (path, options = {}) => {
    const headers = { 'content-type': 'application/json', ...(options.headers || {}) };
    if (token) headers.authorization = `Bearer ${token}`;
    const response = await fetch(`${SERVICE_URL}${path}`, { ...options, headers, mode: 'cors', cache: 'no-store' });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.error || 'The account service is unavailable.');
      error.status = response.status;
      error.data = data;
      throw error;
    }
    return data;
  };

  const collectProfile = () => {
    const profile = {};
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key?.startsWith('endlessDungeon') && key !== TOKEN_KEY && key !== NAME_KEY) {
        profile[key] = localStorage.getItem(key);
      }
    }
    return profile;
  };

  const clearLocalProfile = () => {
    const keys = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key?.startsWith('endlessDungeon') && key !== TOKEN_KEY && key !== NAME_KEY) keys.push(key);
    }
    keys.forEach((key) => localStorage.removeItem(key));
  };

  const parseSavedList = (value) => {
    try {
      const parsed = JSON.parse(value || '[]');
      return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
    } catch {
      return [];
    }
  };

  // Protector unlocks belong to the account, not to an individual run or
  // device. Older saves can rebuild Roman cohorts from their armor milestones.
  const normalizeProtectorProgress = (profile = {}) => {
    const normalized = { ...profile };
    const armor = new Set(parseSavedList(normalized.endlessDungeonArmor));
    const protectors = new Set(['guardian', ...parseSavedList(normalized.endlessDungeonProtectors)]);
    if (armor.has('royalArmor')) protectors.add('romanLegion');
    if (armor.has('emeraldAegis')) protectors.add('romanSpearCohort');
    if (armor.has('worldforged')) protectors.add('romanArcherCohort');
    normalized.endlessDungeonProtectors = JSON.stringify([...protectors]);
    const equipped = normalized.endlessDungeonEquippedProtector;
    if (!equipped || !protectors.has(equipped)) normalized.endlessDungeonEquippedProtector = 'guardian';
    return normalized;
  };

  const mergeProtectorProgress = (remoteProfile = {}, localProfile = {}) => {
    const merged = { ...localProfile };
    const protectors = new Set([
      ...parseSavedList(remoteProfile.endlessDungeonProtectors),
      ...parseSavedList(localProfile.endlessDungeonProtectors),
    ]);
    merged.endlessDungeonProtectors = JSON.stringify([...protectors]);
    return normalizeProtectorProgress(merged);
  };

  const applyProfile = (profile) => {
    for (const [key, value] of Object.entries(profile || {})) {
      if (key.startsWith('endlessDungeon') && typeof value === 'string') localStorage.setItem(key, value);
    }
  };

  const loadGame = () => {
    if (gameLoaded) return;
    gameLoaded = true;
    let coreGameStarted = false;
    const loadCoreGame = () => {
      if (coreGameStarted) return;
      coreGameStarted = true;
      const gameScript = document.createElement('script');
      gameScript.src = 'js/game.js?v=20260912-8';
      document.body.appendChild(gameScript);
    };
    const rtcScript = document.createElement('script');
    rtcScript.src = 'js/webrtc-test.js?v=20260911-1';
    rtcScript.onload = loadCoreGame;
    // Multiplayer is optional. A missing or blocked RTC helper must never stop
    // the Armory, Arena, Battleground, or main-menu controls from starting.
    rtcScript.onerror = loadCoreGame;
    document.body.appendChild(rtcScript);
  };

  const saveProfile = async (force = false) => {
    if (!token || !gameLoaded) return;
    const profile = collectProfile();
    const text = JSON.stringify(profile);
    if (!force && text === lastSaveText) return;
    try {
      const result = await request('/accounts/profile', {
        method: 'PUT', body: JSON.stringify({ profile, version: profileVersion }),
      });
      profileVersion = result.version;
      lastSaveText = text;
      settingsStatus.textContent = 'Progress saved.';
    } catch (error) {
      if (error.status === 409) {
        profileVersion = error.data.version;
        const mergedProfile = mergeProtectorProgress(error.data.profile || {}, profile);
        applyProfile(mergedProfile);
        lastSaveText = '';
        settingsStatus.textContent = 'Protector unlocks from both devices were combined. Saving again...';
      } else {
        settingsStatus.textContent = 'Save will retry when the connection returns.';
      }
    }
  };

  const finishLogin = async (result) => {
    token = result.token || token;
    accountName = result.accountName || accountName;
    profileVersion = Number(result.version) || 0;
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(NAME_KEY, accountName);
    const rawServerProfile = result.profile || {};
    const hasServerProfile = Object.keys(rawServerProfile).length > 0;
    const serverProfile = hasServerProfile ? normalizeProtectorProgress(rawServerProfile) : rawServerProfile;
    if (hasServerProfile) {
      clearLocalProfile();
      applyProfile(serverProfile);
    }
    loginOverlay.classList.add('hidden');
    settingsButton.classList.remove('hidden');
    settingsName.textContent = accountName;
    loadGame();
    lastSaveText = JSON.stringify(collectProfile());
    if (result.created || !hasServerProfile) window.setTimeout(() => saveProfile(true), 1200);
    saveTimer = window.setInterval(saveProfile, 2500);
  };

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const pin = pinInput.value.trim();
    if (!/^\d{4}$/.test(pin)) {
      setLoginStatus('Enter exactly four digits.', true);
      return;
    }
    loginButton.disabled = true;
    setLoginStatus('Loading your hero...');
    try {
      const result = await request('/accounts/login', { method: 'POST', body: JSON.stringify({ name, pin }) });
      await finishLogin(result);
    } catch (error) {
      setLoginStatus(error.message, true);
    } finally {
      loginButton.disabled = false;
    }
  });

  forgotPinButton.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    if (name.length < 2) {
      setLoginStatus('Enter your account name first.', true);
      return;
    }
    forgotPinButton.disabled = true;
    setLoginStatus('Preparing recovery questions...');
    try {
      const result = await request('/accounts/recovery/questions', {
        method: 'POST', body: JSON.stringify({ name }),
      });
      recoveryQuestions.replaceChildren(...result.questions.map((question) => {
        const wrapper = document.createElement('div');
        const label = document.createElement('label');
        label.textContent = question.text;
        const select = document.createElement('select');
        select.dataset.questionId = question.id;
        select.required = true;
        const unselected = document.createElement('option');
        unselected.value = '';
        unselected.textContent = 'Choose Yes or No';
        unselected.disabled = true;
        unselected.selected = true;
        select.appendChild(unselected);
        for (const option of question.options) {
          const element = document.createElement('option');
          element.value = option.value;
          element.textContent = option.label;
          select.appendChild(element);
        }
        wrapper.append(label, select);
        return wrapper;
      }));
      recoveryStatus.textContent = '';
      loginOverlay.classList.add('hidden');
      recoveryOverlay.classList.remove('hidden');
    } catch (error) {
      setLoginStatus(error.message, true);
    } finally {
      forgotPinButton.disabled = false;
    }
  });

  recoveryCancelButton.addEventListener('click', () => {
    recoveryOverlay.classList.add('hidden');
    loginOverlay.classList.remove('hidden');
  });

  recoveryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const newPin = recoveryPinInput.value.trim();
    if (!/^\d{4}$/.test(newPin)) {
      recoveryStatus.textContent = 'Choose exactly four digits.';
      recoveryStatus.classList.add('error');
      return;
    }
    const answers = {};
    let hasUnansweredQuestion = false;
    recoveryQuestions.querySelectorAll('select').forEach((select) => {
      if (!select.value) hasUnansweredQuestion = true;
      answers[select.dataset.questionId] = select.value;
    });
    if (hasUnansweredQuestion) {
      recoveryStatus.textContent = 'Choose Yes or No for every question using the arrow.';
      recoveryStatus.classList.add('error');
      return;
    }
    recoveryStatus.textContent = 'Checking your answers...';
    recoveryStatus.classList.remove('error');
    try {
      await request('/accounts/recovery/reset', {
        method: 'POST', body: JSON.stringify({ name: nameInput.value.trim(), newPin, answers }),
      });
      pinInput.value = newPin;
      recoveryOverlay.classList.add('hidden');
      loginOverlay.classList.remove('hidden');
      setLoginStatus('Code reset. You can log in with the new code.');
    } catch (error) {
      recoveryStatus.textContent = error.message;
      recoveryStatus.classList.add('error');
    }
  });

  settingsButton.addEventListener('click', () => settingsOverlay.classList.remove('hidden'));
  settingsCloseButton.addEventListener('click', () => settingsOverlay.classList.add('hidden'));
  saveNowButton.addEventListener('click', () => saveProfile(true));
  logoutButton.addEventListener('click', async () => {
    await saveProfile(true);
    try { await request('/accounts/profile', { method: 'DELETE' }); } catch {}
    if (saveTimer) window.clearInterval(saveTimer);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(NAME_KEY);
    clearLocalProfile();
    location.reload();
  });
  window.addEventListener('pagehide', () => saveProfile(true));

  const resume = async () => {
    if (!token) return;
    setLoginStatus('Restoring your account...');
    try {
      const result = await request('/accounts/profile');
      await finishLogin({ ...result, token, accountName });
    } catch {
      token = '';
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(NAME_KEY);
      setLoginStatus('Log in to continue.');
    }
  };
  resume();
})();
