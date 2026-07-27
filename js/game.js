const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const fullscreenButton = document.getElementById('fullscreenButton');

// Lets the player enter or leave browser full screen without interrupting play.
fullscreenButton.addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  } catch {
    setMessage('Full screen is not available in this browser.');
  }
});

document.addEventListener('fullscreenchange', () => {
  const isFullscreen = Boolean(document.fullscreenElement);
  fullscreenButton.setAttribute('aria-label', isFullscreen ? 'Exit full screen' : 'Enter full screen');
  fullscreenButton.title = isFullscreen ? 'Exit full screen' : 'Enter full screen';
});
const overlay = document.getElementById('overlay');
const startButton = document.getElementById('startButton');
const overlayTitle = overlay.querySelector('h1');
const overlayText = document.getElementById('overlayText');
const deathCauseText = document.getElementById('deathCauseText');
const controlsGrid = overlay.querySelector('.controls-grid');
const heroProverb = document.getElementById('heroProverb');
const menuHero = document.getElementById('menuHero');
const openArmoryButton = document.getElementById('openArmoryButton');
const armoryOverlay = document.getElementById('armoryOverlay');
const armorGrid = document.getElementById('armorGrid');
const weaponGrid = document.getElementById('weaponGrid');
const closeArmoryButton = document.getElementById('closeArmoryButton');
const gearNotification = document.getElementById('gearNotification');
const genderOverlay = document.getElementById('genderOverlay');
const chooseMaleButton = document.getElementById('chooseMaleButton');
const chooseFemaleButton = document.getElementById('chooseFemaleButton');
const gearPreview = document.getElementById('gearPreview');
const gearPreviewType = document.getElementById('gearPreviewType');
const gearPreviewImage = document.getElementById('gearPreviewImage');
const gearPreviewName = document.getElementById('gearPreviewName');
const gearPreviewUnlock = document.getElementById('gearPreviewUnlock');
const gearPreviewStats = document.getElementById('gearPreviewStats');
const applyGearButton = document.getElementById('applyGearButton');
const cancelGearButton = document.getElementById('cancelGearButton');
const heroNameInput = document.getElementById('heroNameInput');
const heroNameEditor = document.querySelector('.hero-name-editor');
const randomizeHeroNameButton = document.getElementById('randomizeHeroNameButton');
const changeHeroButton = document.getElementById('changeHeroButton');
const openHighScoresButton = document.getElementById('openHighScoresButton');
const highScoresOverlay = document.getElementById('highScoresOverlay');
const highScoresList = document.getElementById('highScoresList');
const closeHighScoresButton = document.getElementById('closeHighScoresButton');

const armorSets = [
  { id: 'wayfarer', name: "Wayfarer's Resolve", boss: 0, portrait: 'assets/player/armor/male-wayfarer-portrait.png', combat: 'assets/player/armor/male-wayfarer-combat-swordless.png', femalePortrait: 'assets/player/armor/female-wayfarer-combat.png', femaleCombat: 'assets/player/armor/female-wayfarer-combat-swordless.png', defense: 0, health: 0, stamina: 0, thorns: 0 },
  { id: 'leather', name: 'Thornhide Vanguard', boss: 1, portrait: 'assets/player/armor/male-leather-portrait.png', combat: 'assets/player/armor/male-leather-combat-swordless.png', femalePortrait: 'assets/player/armor/female-leather-combat.png', femaleCombat: 'assets/player/armor/female-leather-combat-swordless.png', defense: 8, health: 10, stamina: 5, thorns: 6 },
  { id: 'lightPlate', name: 'Silverwind Harness', boss: 5, portrait: 'assets/player/armor/male-light-plate-portrait.png', combat: 'assets/player/armor/male-light-plate-combat-swordless.png', femalePortrait: 'assets/player/armor/female-light-plate-combat.png', femaleCombat: 'assets/player/armor/female-light-plate-combat-swordless.png', defense: 16, health: 20, stamina: 10, thorns: 10 },
  { id: 'heavyPlate', name: 'Iron Bastion Plate', boss: 8, portrait: 'assets/player/armor/male-heavy-plate-portrait.png', combat: 'assets/player/armor/male-heavy-plate-combat-swordless.png', femalePortrait: 'assets/player/armor/female-heavy-plate-combat.png', femaleCombat: 'assets/player/armor/female-heavy-plate-combat-swordless.png', defense: 24, health: 35, stamina: 15, thorns: 15 },
  { id: 'dragonPlate', name: 'Wyrmscale Eclipse', boss: 10, portrait: 'assets/player/armor/male-dragon-plate-portrait.png', combat: 'assets/player/armor/male-dragon-plate-combat-swordless.png', femalePortrait: 'assets/player/armor/female-dragon-plate-combat.png', femaleCombat: 'assets/player/armor/female-dragon-plate-combat-swordless.png', defense: 32, health: 50, stamina: 20, thorns: 20 },
  { id: 'royalArmor', name: 'Crownward Regalia', boss: 20, portrait: 'assets/player/armor/male-royal-armor-portrait.png', combat: 'assets/player/armor/male-royal-armor-combat-swordless.png', femalePortrait: 'assets/player/armor/female-dragon-plate-combat.png', femaleCombat: 'assets/player/armor/female-dragon-plate-combat-swordless.png', defense: 40, health: 70, stamina: 25, thorns: 25 },
  { id: 'worldforged', name: 'Worldforged Aegis', boss: 25, portrait: 'assets/player/armor/male-worldforged-portrait.png', combat: 'assets/player/armor/male-worldforged-combat-swordless.png', femalePortrait: 'assets/player/armor/female-dragon-plate-combat.png', femaleCombat: 'assets/player/armor/female-dragon-plate-combat-swordless.png', defense: 50, health: 100, stamina: 35, thorns: 30 },
];

const weaponSets = [
  { id: 'lavaBlade', name: 'Cinderfang', boss: 2, portrait: 'assets/player/weapons/lava-blade-portrait.png', combat: 'assets/player/weapons/lava-blade-combat.png', damage: 4, reach: 2 },
  { id: 'broadSword', name: 'Oathkeeper Broadblade', boss: 4, portrait: 'assets/player/weapons/broad-sword.png', combat: 'assets/player/weapons/broad-sword.png', damage: 8, reach: 4 },
  { id: 'diamondSword', name: 'Diamondheart Greatsword', boss: 7, portrait: 'assets/player/weapons/diamond-sword-portrait.png', combat: 'assets/player/weapons/diamond-sword-combat.png', damage: 15, reach: 8 },
  { id: 'emeraldSword', name: 'Emerald Sovereign', boss: 27, portrait: 'assets/player/weapons/emerald-sword-portrait.png', combat: 'assets/player/weapons/emerald-sword-combat.png', damage: 24, reach: 12 },
];
const starterWeapon = { id: 'starterBlade', name: 'Starter Blade', boss: 0, damage: 0, reach: 0 };

let unlockedArmor = new Set(['wayfarer']);
let equippedArmorId = 'wayfarer';
let unlockedWeapons = new Set();
let equippedWeaponId = 'starterBlade';
let unseenGear = new Set();
let selectedGender = 'male';
let pendingGearChoice = null;
try {
  const savedGender = window.localStorage.getItem('endlessDungeonGender');
  if (savedGender === 'male' || savedGender === 'female') selectedGender = savedGender;
  const savedArmor = JSON.parse(window.localStorage.getItem('endlessDungeonArmor') || '[]');
  unlockedArmor = new Set(['wayfarer', ...savedArmor]);
  const savedEquipped = window.localStorage.getItem('endlessDungeonEquippedArmor');
  if (savedEquipped && unlockedArmor.has(savedEquipped)) equippedArmorId = savedEquipped;
  const savedWeapons = JSON.parse(window.localStorage.getItem('endlessDungeonWeapons') || '[]');
  unlockedWeapons = new Set(savedWeapons);
  const savedWeapon = window.localStorage.getItem('endlessDungeonEquippedWeapon');
  if (savedWeapon && unlockedWeapons.has(savedWeapon)) equippedWeaponId = savedWeapon;
  unseenGear = new Set(JSON.parse(window.localStorage.getItem('endlessDungeonUnseenGear') || '[]'));
  if (window.localStorage.getItem('endlessDungeonWeaponMilestones') !== 'v2') {
    unlockedWeapons.delete('broadSword');
    unlockedWeapons.delete('diamondSword');
    equippedWeaponId = 'starterBlade';
    window.localStorage.setItem('endlessDungeonWeaponMilestones', 'v2');
    window.localStorage.setItem('endlessDungeonWeapons', JSON.stringify([...unlockedWeapons]));
    window.localStorage.setItem('endlessDungeonEquippedWeapon', equippedWeaponId);
  }
} catch (error) {
  unlockedArmor = new Set(['wayfarer']);
}

// Resolves the currently equipped armour, falling back to the starter set.
function getEquippedArmor() {
  return armorSets.find((armor) => armor.id === equippedArmorId) || armorSets[0];
}

// Resolves the current weapon, including the always-available starter blade.
function getEquippedWeapon() {
  return weaponSets.find((weapon) => weapon.id === equippedWeaponId) || starterWeapon;
}

// Persists unlocked and equipped gear while keeping run-specific choices temporary.
function saveArmorCollection() {
  try {
    window.localStorage.setItem('endlessDungeonArmor', JSON.stringify([...unlockedArmor]));
    window.localStorage.setItem('endlessDungeonEquippedArmor', equippedArmorId);
    window.localStorage.setItem('endlessDungeonWeapons', JSON.stringify([...unlockedWeapons]));
    window.localStorage.setItem('endlessDungeonEquippedWeapon', equippedWeaponId);
    window.localStorage.setItem('endlessDungeonUnseenGear', JSON.stringify([...unseenGear]));
  } catch (error) {
    // Armor still works for the current browser session.
  }
}

// Shows the armory notification whenever newly unlocked gear is unseen.
function updateGearNotification() {
  gearNotification.classList.toggle('hidden', unseenGear.size === 0);
}

// Closes the gear comparison without changing equipment.
function closeGearPreview() {
  pendingGearChoice = null;
  gearPreview.classList.add('hidden');
}

// Opens a comparison card before the player equips a selected item.
function showGearPreview(type, gear, image) {
  pendingGearChoice = { type, gear };
  gearPreviewType.textContent = type === 'armor' ? 'Armor Selection' : 'Weapon Selection';
  gearPreviewImage.src = image;
  gearPreviewImage.alt = gear.name;
  gearPreviewName.textContent = gear.name;
  gearPreviewUnlock.textContent = gear.boss === 0
    ? 'The equipment your journey began with.'
    : `Reward for defeating Boss ${gear.boss}.`;
  gearPreviewStats.innerHTML = type === 'armor'
    ? `<strong>Damage reduction: ${gear.defense}%</strong><strong>Thorns reflection: ${gear.thorns}%</strong><strong>Maximum health: +${gear.health}</strong><strong>Maximum stamina: +${gear.stamina}</strong>`
    : `<strong>Attack damage: +${gear.damage}%</strong><strong>Attack reach: +${gear.reach}</strong>`;
  applyGearButton.textContent = 'Apply';
  gearPreview.classList.remove('hidden');
}

// Equips the item currently displayed in the comparison card.
function applyPendingGearChoice() {
  if (!pendingGearChoice) return;
  const { type, gear } = pendingGearChoice;
  if (type === 'armor') {
    equippedArmorId = gear.id;
    applyEquippedArmor(false);
  } else {
    equippedWeaponId = gear.id;
  }
  saveArmorCollection();
  closeGearPreview();
  renderArmory();
}

// Rebuilds the armour and weapon grids from the current unlock state.
function renderArmory() {
  armorGrid.replaceChildren();
  for (const armor of armorSets) {
    const unlocked = unlockedArmor.has(armor.id);
    const armorPortrait = selectedGender === 'female' ? armor.femalePortrait : armor.portrait;
    const option = document.createElement('button');
    option.className = `armor-option${unlocked ? '' : ' locked'}${equippedArmorId === armor.id ? ' selected' : ''}`;
    option.disabled = !unlocked;
    option.innerHTML = `
      ${unseenGear.has(`armor:${armor.id}`) ? '<em class="new-gear-label">NEW</em>' : ''}
      <img src="${armorPortrait}" alt="${armor.name}">
      <strong>${unlocked ? armor.name : `Defeat Boss ${armor.boss}`}</strong>
      <span>Defense ${armor.defense}% · Thorns ${armor.thorns}% · Health +${armor.health} · Stamina +${armor.stamina}</span>
    `;
    if (unlocked) option.addEventListener('click', () => showGearPreview('armor', armor, armorPortrait));
    armorGrid.appendChild(option);
  }
  weaponGrid.replaceChildren();
  for (const weapon of weaponSets) {
    const unlocked = unlockedWeapons.has(weapon.id);
    const option = document.createElement('button');
    option.className = `armor-option${unlocked ? '' : ' locked'}${equippedWeaponId === weapon.id ? ' selected' : ''}`;
    option.disabled = !unlocked;
    option.innerHTML = `
      ${unseenGear.has(`weapon:${weapon.id}`) ? '<em class="new-gear-label">NEW</em>' : ''}
      <img src="${weapon.portrait}" alt="${weapon.name}">
      <strong>${unlocked ? weapon.name : `Defeat Boss ${weapon.boss}`}</strong>
      <span>Damage +${weapon.damage}% · Reach +${weapon.reach}</span>
    `;
    if (unlocked) option.addEventListener('click', () => showGearPreview('weapon', weapon, weapon.portrait));
    weaponGrid.appendChild(option);
  }
}

// Applies armour stats and artwork, optionally restoring health and stamina.
function applyEquippedArmor(refill = true) {
  const armor = getEquippedArmor();
  player.maxHealth = 100 + armor.health;
  player.maxStamina = 100 + armor.stamina;
  player.armorLevel = 1 + armor.defense / 8;
  if (refill) {
    player.health = player.maxHealth;
    player.stamina = player.maxStamina;
  } else {
    player.health = Math.min(player.health, player.maxHealth);
    player.stamina = Math.min(player.stamina, player.maxStamina);
  }
  const combatArt = selectedGender === 'female' ? armor.femaleCombat : armor.combat;
  const portraitArt = selectedGender === 'female' ? armor.femalePortrait : armor.portrait;
  art.hero.src = combatArt;
  menuHero.classList.add('portrait-loading');
  menuHero.onload = () => menuHero.classList.remove('portrait-loading');
  menuHero.src = portraitArt;
  menuHero.alt = armor.name;
  if (menuHero.complete && menuHero.naturalWidth > 0) {
    window.requestAnimationFrame(() => menuHero.classList.remove('portrait-loading'));
  }
}

// Starts each run with a fresh gender choice and name while preserving armour.
function chooseGender(gender) {
  selectedGender = gender;
  currentHeroName = generateHeroName();
  heroNameInput.value = currentHeroName;
  try {
    window.localStorage.setItem('endlessDungeonGender', selectedGender);
  } catch (error) {
    // The current session still retains the selection.
  }
  applyEquippedArmor(true);
  genderOverlay.classList.add('hidden');
}

const heroProverbs = [
  '“A steady blade outlives a reckless heart.”',
  '“The darkest room still fears a carried flame.”',
  '“Count your scars; each one is a lesson that missed your grave.”',
  '“A locked door tests courage, but an open one tests wisdom.”',
  '“The dungeon grows hungry whenever the hero grows careless.”',
  '“Steel wins a battle; patience survives the next one.”',
  '“A hero who watches the shadows never fights alone.”',
  '“Take what the fallen learned, and leave what made them fall.”',
  '“Even monsters hesitate when the wounded stand again.”',
  '“The final step is only impossible before you take it.”',
];

const fallenHeroProverbs = [
  '"My ribs are playing a victory song, but none of them know the tune."',
  '"If the dungeon wanted my blood, it should have brought a larger bucket."',
  '"Never trust a staircase that has already tasted one boot."',
  '"I have been hit so hard that tomorrow apologized."',
  '"A ringing helmet means the ghosts are applauding."',
  '"The trick to surviving is falling down in a direction that looks intentional."',
  '"My sword is sharp, my plan is missing, and somehow we continue."',
  '"When your knees begin negotiating, let your elbows lead."',
  '"Every monster has a weakness; sometimes it is being struck repeatedly."',
  '"I left my dignity three rooms back. It was slowing me down."',
  '"Blood inside the body is tradition, not law."',
  '"If both eyes still point forward, the battle was educational."',
  '"The floor and I are old friends. It catches me often."',
  '"A cracked shield is just armour with ventilation."',
  '"Victory is what you call limping away before anyone checks the details."',
];

// Picks one hopeful proverb for the main menu.
function getRandomHeroProverb() {
  return heroProverbs[Math.floor(Math.random() * heroProverbs.length)];
}

// Picks one mournful proverb for defeat or close-call victory.
function getRandomFallenHeroProverb() {
  return fallenHeroProverbs[Math.floor(Math.random() * fallenHeroProverbs.length)];
}

// Refreshes the proverb displayed beneath the hero menu.
function showRandomHeroProverb() {
  heroProverb.textContent = getRandomHeroProverb();
}

const hud = {
  wave: document.getElementById('waveValue'),
  score: document.getElementById('scoreValue'),
  health: document.getElementById('healthValue'),
  food: document.getElementById('foodValue'),
  hydration: document.getElementById('hydrationValue'),
  stamina: document.getElementById('staminaValue'),
  bandage: document.getElementById('bandageValue'),
  enemy: document.getElementById('enemyValue'),
  protector: document.getElementById('protectorValue'),
  opener: document.getElementById('openerValue'),
  shield: document.getElementById('shieldValue'),
  theme: document.getElementById('themeValue'),
};
const messageBox = document.getElementById('messageBox');
const lootHighlight = document.getElementById('lootHighlight');
const pauseOverlay = document.getElementById('pauseOverlay');
const resumeGameButton = document.getElementById('resumeGameButton');
const quitGameButton = document.getElementById('quitGameButton');
const challengeOverlay = document.getElementById('challengeOverlay');
const acceptChallengeButton = document.getElementById('acceptChallengeButton');
const declineChallengeButton = document.getElementById('declineChallengeButton');
const waveSplash = document.getElementById('waveSplash');
const waveSplashKicker = document.getElementById('waveSplashKicker');
const waveSplashTitle = document.getElementById('waveSplashTitle');
const waveSplashEnemies = document.getElementById('waveSplashEnemies');
const waveSplashText = document.getElementById('waveSplashText');
const waveSplashWarning = document.getElementById('waveSplashWarning');
const waveSplashContinuePrompt = waveSplash.querySelector('.continue-prompt');
const highScoreValue = document.getElementById('highScoreValue');
const menuHighScoreValue = document.getElementById('menuHighScoreValue');
let lootHighlightTimer = null;
let deathScreenReady = false;

const heroNameSuggestions = {
  male: [
    'Alistair the Almost',
    'Banksy the Brave',
    'Bartholomew the Barely Prepared',
    'Basil the Bold',
    'Cedric the Conquered',
    'Dexter the Daring',
    'Edgar the Unexpired',
    'Finn the Frequently Fortunate',
    'Gareth the Gallant',
    'Gideon the Grim',
    'Hector the Hard-to-Kill',
    'Jasper the UnJust',
    'Leopold the Last-to-Leave',
    'Milo the Mournful',
    'Mordecai the Mildly Concerned',
    'Orson the Unshaken',
    'Percival the Persistent',
    'Quentin the Quick',
    'Rufus the Relentless',
    'Silas the Steadfast',
    'Tristan the Trampled',
    'Xander the Extremely Ready',
    'Yorick the Yet Living',
  ],
  female: [
    'Bridget the Broken',
    'Cassandra the Cursed',
    'Cleo the Cunning',
    'Daphne the Dungeonwise',
    'Delilah the Doomed',
    'Freya the Fearless',
    'Iris the Ironhearted',
    'Kora the Keen',
    'Luna the Last Standing',
    'Mabel the Merciless',
    'Mina the Mourned',
    'Nora the Nimble',
    'Ophelia the Overwhelmed',
    'Tilda the Tenacious',
    'Una the Unyielding',
    'Vesper the Valiant',
    'Wanda the Watchful',
    'Zelda the Over Zealous',
    'Astrid the Absolutely Certain',
    'Beatrix the Battlewise',
    'Greta the Gravedigger',
    'Gwendolyn the Grim',
    'Phoebe the Phenomenally Prepared',
  ],
};
const highScoresStorageKey = 'endlessDungeonHighScores';
const leaderboardLimit = 10;
let highScores = [];
let currentHeroName = '';
let latestRunId = null;

// Picks a different suggested hero name from the selected gender list.
function generateHeroName() {
  const suggestions = selectedGender
    ? heroNameSuggestions[selectedGender]
    : [...heroNameSuggestions.male, ...heroNameSuggestions.female];
  const alternatives = suggestions.filter((name) => name !== currentHeroName);
  return alternatives[Math.floor(Math.random() * alternatives.length)] || suggestions[0];
}

// Normalizes custom hero names for safe display and storage.
function cleanHeroName(name) {
  return String(name || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 28);
}

// Ranks arcade entries by score, then wave, bosses, and earliest timestamp.
function sortHighScores(scores) {
  return [...scores].sort((a, b) => (
    b.score - a.score
    || b.wave - a.wave
    || b.bosses - a.bosses
    || a.recordedAt - b.recordedAt
  ));
}

// Persists the current top-ten list in browser-local storage.
function saveLeaderboard() {
  try {
    window.localStorage.setItem(highScoresStorageKey, JSON.stringify(highScores));
  } catch (error) {
    // The leaderboard still works for this session if browser storage is unavailable.
  }
}

// Loads, validates, migrates, and trims locally stored leaderboard entries.
function loadLeaderboard() {
  try {
    const savedScores = JSON.parse(window.localStorage.getItem(highScoresStorageKey) || '[]');
    if (Array.isArray(savedScores)) {
      highScores = savedScores
        .filter((entry) => (
          entry
          && Number.isFinite(Number(entry.wave))
          && Number(entry.wave) >= 1
          && cleanHeroName(entry.name)
        ))
        .map((entry, index) => ({
          id: String(entry.id || `saved-${index}`),
          name: cleanHeroName(entry.name),
          score: Math.max(0, Math.floor(Number(entry.score) || 0)),
          wave: Math.max(1, Math.floor(Number(entry.wave))),
          bosses: Math.max(0, Math.floor(Number(entry.bosses) || 0)),
          recordedAt: Number(entry.recordedAt) || Date.now() + index,
        }));
    }
    const legacyHighScore = Math.floor(Number(window.localStorage.getItem('endlessDungeonHighScore')) || 1);
    if (highScores.length === 0 && legacyHighScore > 1) {
      highScores.push({
        id: 'legacy-best',
        name: 'Eldric the Enduring',
        score: 0,
        wave: legacyHighScore,
        bosses: 0,
        recordedAt: Date.now() - 1,
      });
    }
  } catch (error) {
    highScores = [];
  }
  highScores = sortHighScores(highScores).slice(0, leaderboardLimit);
  if (!currentHeroName) currentHeroName = generateHeroName();
  heroNameInput.value = currentHeroName;
  saveLeaderboard();
}

// Updates menu and controls-panel labels with the best arcade score.
function updateHighScoreDisplay() {
  const bestScore = highScores[0]?.score || 0;
  highScoreValue.textContent = bestScore.toLocaleString();
  menuHighScoreValue.textContent = bestScore.toLocaleString();
}

// Rebuilds the Hall of Heroes list without injecting stored text as HTML.
function renderHighScores() {
  highScoresList.replaceChildren();
  if (highScores.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'high-scores-empty';
    empty.textContent = 'No names are carved here yet. Be the first.';
    highScoresList.appendChild(empty);
    return;
  }
  highScores.forEach((entry) => {
    const item = document.createElement('li');
    if (entry.id === latestRunId) item.classList.add('latest-run');

    const hero = document.createElement('div');
    hero.className = 'high-score-hero';
    const name = document.createElement('strong');
    name.textContent = entry.name;
    const details = document.createElement('span');
    const date = new Date(entry.recordedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    details.textContent = `Wave ${entry.wave} · ${entry.bosses} boss${entry.bosses === 1 ? '' : 'es'} · ${date}`;
    hero.append(name, details);

    const wave = document.createElement('div');
    wave.className = 'high-score-wave';
    wave.textContent = `${entry.score.toLocaleString()} PTS`;
    item.append(hero, wave);
    highScoresList.appendChild(item);
  });
}

// Inserts a finished run and returns its rank when it reaches the top ten.
function recordCompletedRun(score, wave, bosses) {
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: currentHeroName,
    score: Math.max(0, Math.floor(Number(score) || 0)),
    wave: Math.max(1, Math.floor(Number(wave) || 1)),
    bosses: Math.max(0, Math.floor(Number(bosses) || 0)),
    recordedAt: Date.now(),
  };
  const ranked = sortHighScores([...highScores, entry]);
  const rank = ranked.findIndex((score) => score.id === entry.id) + 1;
  highScores = ranked.slice(0, leaderboardLimit);
  latestRunId = highScores.some((score) => score.id === entry.id) ? entry.id : null;
  saveLeaderboard();
  updateHighScoreDisplay();
  renderHighScores();
  return rank <= leaderboardLimit ? rank : null;
}

// Commits an edited name or replaces an empty value with a suggestion.
function saveHeroName() {
  const editedName = cleanHeroName(heroNameInput.value);
  currentHeroName = editedName || generateHeroName();
  heroNameInput.value = currentHeroName;
  saveLeaderboard();
}

const wallThickness = 20;
const doorWidth = 96;
let lastTime = 0;
const keys = new Set();

const art = {
  roomRuins: new Image(),
  hero: new Image(),
  retroHero: new Image(),
  walker: new Image(),
  runner: new Image(),
  brute: new Image(),
  spitter: new Image(),
  assassin: new Image(),
  crawler: new Image(),
  sentinel: new Image(),
  wraith: new Image(),
  burrower: new Image(),
  arcaneOrb: new Image(),
  reaper: new Image(),
  lushGolem: new Image(),
  lushGolemOverhead: new Image(),
  lavaGolem: new Image(),
  lavaGolemOverhead: new Image(),
  oceanBoss: new Image(),
  oceanBossOverhead: new Image(),
  iceBoss: new Image(),
  iceBossOverhead: new Image(),
  iceMinion: new Image(),
  lavaMinion: new Image(),
  lavaTank: new Image(),
  oceanMinion: new Image(),
  oceanTank: new Image(),
  lushMinion: new Image(),
  lushTank: new Image(),
  woodBoss: new Image(),
  woodBossOverhead: new Image(),
  woodMinion: new Image(),
  skeletonBoss: new Image(),
  skeletonBossOverhead: new Image(),
  skeletonMinion: new Image(),
  skeletonTank: new Image(),
  skeletonSpider: new Image(),
  skeletonOrb: new Image(),
  sandBoss: new Image(),
  sandBossOverhead: new Image(),
  lushCave: new Image(),
  cyanRoom: new Image(),
  lavaRoom: new Image(),
  waterRoom: new Image(),
  skeletonRoom: new Image(),
  crate: new Image(),
  openCrate: new Image(),
  lushArena: new Image(),
  lavaArena: new Image(),
  waterArena: new Image(),
  iceArena: new Image(),
  skeletonArena: new Image(),
  sandArena: new Image(),
  diamondSword: new Image(),
  broadSword: new Image(),
  emeraldSword: new Image(),
  lavaBlade: new Image(),
  protector: new Image(),
  protectorPawSwipe: new Image(),
  protectorBite: new Image(),
  opener: new Image(),
};

// Starts loading every reusable image asset before the animation loop begins.
function preloadArt() {
  const sources = {
    roomRuins: 'assets/worlds/rooms/ruins.svg',
    hero: 'assets/player/armor/male-worldforged-portrait.png',
    retroHero: 'assets/player/base-hero.svg',
    walker: 'assets/enemies/generic/walker.svg',
    runner: 'assets/enemies/generic/runner.svg',
    brute: 'assets/enemies/generic/brute.svg',
    spitter: 'assets/enemies/generic/spitter.svg',
    assassin: 'assets/enemies/generic/assassin.svg',
    crawler: 'assets/enemies/generic/crawler.svg',
    sentinel: 'assets/enemies/generic/sentinel.svg',
    wraith: 'assets/enemies/generic/wraith.svg',
    burrower: 'assets/enemies/generic/burrower.svg',
    arcaneOrb: 'assets/enemies/generic/arcane-orb.svg',
    reaper: 'assets/enemies/generic/reaper.svg',
    lushGolem: 'assets/enemies/bosses/lush-golem.png',
    lushGolemOverhead: 'assets/enemies/bosses/lush-golem-overhead.png',
    lavaGolem: 'assets/enemies/bosses/lava-golem.png',
    lavaGolemOverhead: 'assets/enemies/bosses/lava-golem-overhead.png',
    oceanBoss: 'assets/enemies/bosses/ocean-boss.png',
    oceanBossOverhead: 'assets/enemies/bosses/ocean-boss-overhead.png',
    iceBoss: 'assets/enemies/bosses/ice-boss.png',
    iceBossOverhead: 'assets/enemies/bosses/ice-boss-overhead.png',
    iceMinion: 'assets/enemies/units/ice-minion.png',
    lavaMinion: 'assets/enemies/units/lava-minion.png',
    lavaTank: 'assets/enemies/units/lava-tank.png',
    oceanMinion: 'assets/enemies/units/ocean-minion.png',
    oceanTank: 'assets/enemies/units/ocean-tank.png',
    lushMinion: 'assets/enemies/units/lush-minion.png',
    lushTank: 'assets/enemies/units/lush-tank.png',
    woodBoss: 'assets/enemies/bosses/wood-boss.png',
    woodBossOverhead: 'assets/enemies/bosses/wood-boss-overhead.png',
    woodMinion: 'assets/enemies/units/wood-minion.png',
    skeletonBoss: 'assets/enemies/bosses/skeleton-warlord.png',
    skeletonBossOverhead: 'assets/enemies/bosses/skeleton-warlord-overhead.png',
    skeletonMinion: 'assets/enemies/units/skeleton-minion.png',
    skeletonTank: 'assets/enemies/units/skeleton-tank.png',
    skeletonSpider: 'assets/enemies/units/skeleton-spider.png',
    skeletonOrb: 'assets/enemies/units/skeleton-orb.png',
    sandBoss: 'assets/enemies/bosses/sand-tyrant.png',
    sandBossOverhead: 'assets/enemies/bosses/sand-tyrant-overhead.png',
    lushCave: 'assets/worlds/rooms/lush-cave.png',
    cyanRoom: 'assets/worlds/rooms/cyan-room.png',
    lavaRoom: 'assets/worlds/rooms/lava-room.png',
    waterRoom: 'assets/worlds/rooms/water-room.png',
    skeletonRoom: 'assets/worlds/rooms/skeleton-room.png',
    crate: 'assets/props/crate-closed.png',
    openCrate: 'assets/props/crate-open.png',
    lushArena: 'assets/worlds/arenas/lush-arena.png',
    lavaArena: 'assets/worlds/arenas/lava-arena.png',
    waterArena: 'assets/worlds/arenas/water-arena.png',
    iceArena: 'assets/worlds/arenas/ice-arena.png',
    skeletonArena: 'assets/worlds/arenas/skeleton-arena.png',
    sandArena: 'assets/worlds/arenas/sand-arena.png',
    diamondSword: 'assets/player/weapons/diamond-sword-combat.png',
    broadSword: 'assets/player/weapons/broad-sword.png',
    emeraldSword: 'assets/player/weapons/emerald-sword-combat.png',
    lavaBlade: 'assets/player/weapons/lava-blade-combat.png',
    protector: 'assets/helpers/protector.png',
    protectorPawSwipe: 'assets/helpers/protector-paw-swipe.png',
    protectorBite: 'assets/helpers/protector-bite.png',
    opener: 'assets/helpers/scout.png',
  };

  Object.entries(sources).forEach(([key, src]) => {
    art[key].src = src;
  });
}

preloadArt();

const player = {
  x: 180,
  y: 180,
  radius: 18,
  speed: 220,
  health: 100,
  maxHealth: 100,
  food: 100,
  hydration: 100,
  stamina: 100,
  maxStamina: 100,
  sprintExhausted: false,
  damageInvulnerability: 0,
  attackCooldown: 0,
  attackDuration: 0,
  facing: { x: 1, y: 0 },
  inventory: {
    food: 0,
    water: 0,
    bandage: 0,
    protectorShard: 0,
    openerShard: 0,
    shieldShard: 0,
  },
  shieldActive: false,
  shieldTimer: 0,
  protectorActive: false,
  protector: null,
  protectors: [],
  openers: [],
  weaponLevel: 1,
  armorLevel: 1,
};

const world = {
  width: 4200,
  height: 2600,
  themeIndex: 0,
  themes: [
    {
      name: 'Verdant Ruins',
      bg: '#152517',
      room: '#4b7640',
      accent: '#d0f88b',
      floor: '#6d9b5a',
      wall: '#23331d',
      glow: '#f6d38d',
      shadow: '#0a1209',
    },
    {
      name: 'Sunken Shrine',
      bg: '#0d2a25',
      room: '#2d6a63',
      accent: '#7ff2d0',
      floor: '#3a9488',
      wall: '#102622',
      glow: '#c8fbef',
      shadow: '#061613',
    },
    {
      name: 'Cinder Keep',
      bg: '#2a1208',
      room: '#8c451c',
      accent: '#ffd489',
      floor: '#c46824',
      wall: '#321607',
      glow: '#ffc170',
      shadow: '#160700',
    },
    {
      name: 'Moonwood',
      bg: '#101a25',
      room: '#375c7d',
      accent: '#dff7fc',
      floor: '#6a8ea8',
      wall: '#0f1e2b',
      glow: '#f7fdff',
      shadow: '#071018',
    },
    {
      name: 'Bloomed Hollow',
      bg: '#211030',
      room: '#62368b',
      accent: '#ffafef',
      floor: '#8453b6',
      wall: '#1d0f2e',
      glow: '#ffe0fb',
      shadow: '#090312',
    },
    {
      name: 'Bony Ruins',
      bg: '#090b0b',
      room: '#595342',
      accent: '#67e8f9',
      floor: '#746d58',
      wall: '#27251f',
      glow: '#a5f3fc',
      shadow: '#050606',
    },
  ],
};

const state = {
  wave: 1,
  score: 0,
  maxRooms: 8,
  enemies: [],
  crates: [],
  boss: null,
  rooms: [],
  challengeRooms: [],
  roomCount: 0,
  roomCleared: false,
  bossDefeated: 0,
  isGameOver: false,
  bossArenaOpen: false,
  rareThemeChance: 0.05,
  particles: [],
  started: false,
  paused: false,
  shake: 0,
  teleportTimer: 0,
  teleportDuration: 3,
  teleportMoved: false,
  teleportTarget: null,
  challengePromptOpen: false,
  pendingChallengeRoom: null,
  developerMode: false,
  closeZoom: false,
  retroMode: false,
  foodWarningShown: false,
  waterWarningShown: false,
  lastDeathCause: null,
  threatSplashOpen: false,
  gearChoiceOpen: false,
  pendingWaveSplash: false,
};

// Displays a short gameplay notification, optionally with a critical flash.
function setMessage(text, critical = false) {
  messageBox.textContent = text;
  messageBox.classList.toggle('critical-warning', critical);
  messageBox.classList.remove('hidden');
}

// Restricts a number to an inclusive range.
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// Returns a random floating-point value inside a range.
function rand(min, max) {
  return min + Math.random() * (max - min);
}

// Measures straight-line distance between two positioned objects.
function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Converts enemy combat stats into a rounded arcade point value.
function getEnemyScore(enemy) {
  const baseScore = enemy.maxHealth * 0.65
    + enemy.damage * 5
    + enemy.speed * 0.35
    + enemy.radius * 1.5;
  const eliteMultiplier = enemy.elite ? 1.75 : 1;
  const minionMultiplier = enemy.bossMinion ? 1.25 : 1;
  return Math.max(10, Math.round(baseScore * eliteMultiplier * minionMultiplier / 5) * 5);
}

// Awards kill points once, regardless of who landed the finishing blow.
function awardEnemyScore(enemy) {
  if (enemy.scoreAwarded) return;
  enemy.scoreAwarded = true;
  state.score += getEnemyScore(enemy);
}

// Awards each successive boss another thousand points.
function getBossScore(boss) {
  return boss.tier * 1000;
}

// Selects the next biome, including rare Retro Mode and fixed boss-five routing.
function getTheme() {
  // Boss five belongs to the Bony Ruins; always introduce its biome first.
  if (state.bossDefeated === 4) {
    world.themeIndex = 5;
    return world.themes[5];
  }
  const rareRoll = Math.random();
  if (rareRoll < state.rareThemeChance) {
    world.themeIndex = 4;
    return world.themes[4];
  }
  const standardThemes = [0, 1, 2, 3, 5];
  world.themeIndex = standardThemes[Math.floor(Math.random() * standardThemes.length)];
  return world.themes[world.themeIndex];
}

// Rolls one weighted crate reward.
function randomLoot() {
  const roll = Math.random();
  if (roll < 0.32) return 'food';
  if (roll < 0.5) return 'water';
  if (roll < 0.66) return 'bandage';
  if (roll < 0.74) return 'protectorShard';
  if (roll < 0.9) return 'openerShard';
  return 'shieldShard';
}

// Applies one crate reward directly to resources or stored inventory.
function applyLoot(item) {
  if (item === 'food') {
    player.food = clamp(player.food + 15, 0, 100);
    player.inventory.food += 1;
  } else if (item === 'water') {
    player.hydration = clamp(player.hydration + 18, 0, 100);
    player.inventory.water += 1;
  } else if (item === 'bandage') {
    if (player.health >= player.maxHealth) {
      player.inventory.bandage += 1;
    } else {
      player.health = clamp(player.health + 30, 0, player.maxHealth);
      setMessage('Bandage applied automatically: +30 health.');
    }
  } else if (item === 'protectorShard') {
    player.inventory.protectorShard += 1;
  } else if (item === 'openerShard') {
    player.inventory.openerShard += 1;
  } else if (item === 'shieldShard') {
    player.inventory.shieldShard += 1;
  }
}

// Creates the full grid connections available to a room before pruning.
function makeDoorways(room) {
  const roomIndex = room.gy * 4 + room.gx;
  const roomInside = { top: false, right: false, bottom: false, left: false };
  if (room.gx > 0) roomInside.left = true;
  if (room.gx < 3 && roomIndex + 1 < state.maxRooms) roomInside.right = true;
  if (room.gy > 0) roomInside.top = true;
  if (roomIndex + 4 < state.maxRooms) roomInside.bottom = true;
  return roomInside;
}

// Removes random redundant connections while preserving one connected dungeon.
function removeRandomCorridors() {
  const edges = [];
  for (const room of state.rooms) {
    if (room.doorways.right) {
      const neighbor = state.rooms.find((candidate) => candidate.gx === room.gx + 1 && candidate.gy === room.gy);
      if (neighbor) edges.push({ room, neighbor, roomSide: 'right', neighborSide: 'left' });
    }
    if (room.doorways.bottom) {
      const neighbor = state.rooms.find((candidate) => candidate.gx === room.gx && candidate.gy === room.gy + 1);
      if (neighbor) edges.push({ room, neighbor, roomSide: 'bottom', neighborSide: 'top' });
    }
  }

  const shuffledEdges = [...edges].sort(() => Math.random() - 0.5);
  const roomsWithRemovedExit = new Set();
  const targetRemovals = Math.max(1, Math.ceil(state.rooms.length / 3));
  let removed = 0;

  for (const edge of shuffledEdges) {
    if (removed >= targetRemovals) break;
    if (roomsWithRemovedExit.has(edge.room) || roomsWithRemovedExit.has(edge.neighbor)) continue;

    edge.room.doorways[edge.roomSide] = false;
    edge.neighbor.doorways[edge.neighborSide] = false;

    const visited = new Set([state.rooms[0]]);
    const queue = [state.rooms[0]];
    while (queue.length > 0) {
      const current = queue.shift();
      for (const neighbor of getRoomNeighbors(current)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    if (visited.size === state.rooms.length) {
      roomsWithRemovedExit.add(edge.room);
      roomsWithRemovedExit.add(edge.neighbor);
      removed += 1;
    } else {
      edge.room.doorways[edge.roomSide] = true;
      edge.neighbor.doorways[edge.neighborSide] = true;
    }
  }
}

// Generates room geometry, loot, challenges, corridors, biome state, and arena bounds.
function createRooms() {
  state.rooms = [];
  state.crates = [];
  state.challengeRooms = [];

  const theme = getTheme();
  state.retroMode = world.themeIndex === 4;
  const roomWidth = 900;
  const roomHeight = 580;
  const columns = 4;
  const rows = Math.ceil(state.maxRooms / columns);
  const gap = 50;
  let roomIndex = 0;

  for (let gy = 0; gy < rows; gy += 1) {
    for (let gx = 0; gx < columns; gx += 1) {
      if (roomIndex >= state.maxRooms) break;
      const x = 140 + gx * (roomWidth + gap);
      const y = 110 + gy * (roomHeight + gap);
      const room = {
        x,
        y,
        w: roomWidth,
        h: roomHeight,
        gx,
        gy,
        theme,
        doorways: { top: false, right: false, bottom: false, left: false },
        crates: [],
        rare: Math.random() < 0.12,
      };

      room.doorways = makeDoorways(room);
      const crateCount = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < crateCount; i += 1) {
        const crate = {
          x: room.x + 120 + i * 150 + Math.random() * 45,
          y: room.y + 115 + Math.random() * 150,
          radius: 18,
          openProgress: 0,
          isOpen: false,
          rewards: Array.from({ length: 4 }, randomLoot),
        };
        room.crates.push(crate);
        state.crates.push(crate);
      }

      if (room.rare) {
        room.challenge = true;
        state.challengeRooms.push(room);
      }

      state.rooms.push(room);
      roomIndex += 1;
    }
  }

  removeRandomCorridors();

  state.bossArena = {
    x: world.width / 2 - 1100,
    y: world.height / 2 - 875,
    w: 2200,
    h: 1750,
  };

  hud.theme.textContent = theme.name;
  setMessage(`Wave ${state.wave} begins. Explore the rooms, open crates, and survive.`);
}

// Centers the hero in the dungeon's starting room.
function placePlayerInFirstRoom() {
  const firstRoom = state.rooms[0];
  if (!firstRoom) return;
  player.x = firstRoom.x + firstRoom.w / 2;
  player.y = firstRoom.y + firstRoom.h / 2;
}

// Chooses a themed splash portrait when available and an SVG fallback otherwise.
function getEnemySplashArt(enemy) {
  if (state.retroMode) {
    const retroFilename = enemy.type === 'arcaneOrb' ? 'arcane-orb' : enemy.type;
    return `assets/enemies/generic/${retroFilename}.svg`;
  }
  const minionTypes = ['runner', 'crawler', 'assassin', 'wraith', 'arcaneOrb'];
  const tankTypes = ['walker', 'brute', 'spitter', 'sentinel', 'burrower', 'reaper'];
  const role = minionTypes.includes(enemy.type) ? 'minion' : tankTypes.includes(enemy.type) ? 'tank' : null;
  if (role && world.themeIndex === 0) return `assets/enemies/units/lush-${role}.png`;
  if (role && world.themeIndex === 2) return role === 'minion' ? 'assets/enemies/units/lava-minion.png' : 'assets/enemies/units/lava-tank.png';
  if (role && (world.themeIndex === 1 || world.themeIndex === 3)) return `assets/enemies/units/ocean-${role}.png`;
  if (world.themeIndex === 5) {
    if (enemy.type === 'crawler') return 'assets/enemies/units/skeleton-spider.png';
    if (enemy.type === 'arcaneOrb') return 'assets/enemies/units/skeleton-orb.png';
    if (role === 'minion') return 'assets/enemies/units/skeleton-minion.png';
    if (role === 'tank') return 'assets/enemies/units/skeleton-tank.png';
  }
  return role === 'minion'
    ? 'assets/enemies/units/lush-minion.png'
    : 'assets/enemies/units/lush-tank.png';
}

// Pauses at a new wave to introduce one featured threat in a single sentence.
function showWaveSplash() {
  state.pendingWaveSplash = false;
  state.threatSplashOpen = true;
  keys.clear();
  waveSplashKicker.textContent = 'Incoming Threat';
  waveSplashTitle.classList.remove('ally-splash-title');
  waveSplashTitle.textContent = state.retroMode ? `Wave ${state.wave} · Retro Mode` : `Wave ${state.wave}`;
  waveSplashText.classList.remove('hero-splash-proverb');
  waveSplashEnemies.replaceChildren();
  if (!state.retroMode && Math.random() < 0.24) {
    const protectorSplashImages = [
      'assets/helpers/protector.png',
      'assets/helpers/protector-paw-swipe.png',
      'assets/helpers/protector-bite.png',
    ];
    const allyDetails = Math.random() < 0.5
      ? {
        name: 'Protector',
        image: protectorSplashImages[Math.floor(Math.random() * protectorSplashImages.length)],
        alt: 'Protector wolf ready for the wave',
        imageClass: 'protector-splash-image',
        saying: 'Let the dungeon send its hungriest. The Protector has sharper teeth.',
        instruction: 'Collect 5 Protector Shards, then press E to summon.',
      }
      : {
        name: 'Scout',
        image: 'assets/helpers/scout.png',
        alt: 'Scout ready to raid the dungeon',
        imageClass: 'scout-splash-image',
        saying: 'The Scout runs where monsters gather. Every locked prize will be ours before their claws can close.',
        instruction: 'Summon him with 3 Scout Shards, then press T.',
    };
    waveSplashKicker.textContent = 'Dungeon Ally';
    waveSplashTitle.classList.add('ally-splash-title');
    waveSplashTitle.textContent = `Wave ${state.wave} · ${allyDetails.name}`;
    const allyImage = document.createElement('img');
    allyImage.src = allyDetails.image;
    allyImage.alt = allyDetails.alt;
    allyImage.classList.add('ally-splash-image', allyDetails.imageClass);
    waveSplashEnemies.appendChild(allyImage);
    waveSplashText.textContent = allyDetails.saying;
    waveSplashWarning.textContent = allyDetails.instruction;
    waveSplash.classList.remove('hidden');
    return;
  }
  const livingEnemies = state.enemies.filter((enemy) => !enemy.dead);
  const enemyThreats = {
    walker: 'Walkers claw forward without fear, tearing at anything they can drag to the floor.',
    runner: 'Runners rush exposed flesh, striking before their victims can turn to face them.',
    crawler: 'Crawlers skitter beneath your guard and rip at your legs until you cannot escape.',
    spitter: 'Spitters launch corrosive bile that burns through armour and skin.',
    burrower: 'Burrowers wait beneath the floor, then burst upward under their prey.',
    arcaneOrb: 'Arcane Orbs scorch living bodies with unstable dungeon magic.',
    brute: 'Brutes crush bone with heavy blows and leave broken bodies in their wake.',
    assassin: 'Assassins slip into blind spots and open deep wounds before disappearing.',
    sentinel: 'Sentinels march through attacks and batter trapped victims into the stone.',
    wraith: 'Wraiths pass through solid walls to drain the life from anyone hiding nearby.',
    reaper: 'Reapers swing for the neck and do not stop when their target falls.',
  };
  const featuredEnemy = livingEnemies[Math.floor(Math.random() * livingEnemies.length)];
  const randomDescription = state.retroMode
    ? "The dungeon throws you back to the '90s, when heroes were pixels and every monster had sharp edges."
    : enemyThreats[featuredEnemy?.type]
      || 'Something unknown is stalking this level, hungry for anything still alive.';
  if (featuredEnemy) {
    const image = document.createElement('img');
    image.src = getEnemySplashArt(featuredEnemy);
    image.alt = `${formatLootName(featuredEnemy.type)} approaching this wave`;
    waveSplashEnemies.appendChild(image);
  }
  waveSplashText.textContent = randomDescription;
  waveSplashWarning.textContent = '';
  waveSplash.classList.remove('hidden');
}

// Presents the incoming boss at the invisible midpoint of the teleport.
function showBossSplash() {
  if (!state.boss) return;
  const bossDetails = {
    lushGolem: { name: 'Lush Golem', image: 'assets/enemies/bosses/lush-golem.png', warning: 'Its roots can crush you in place, and its healing bloom can undo your hard-earned damage.' },
    lavaGolem: { name: 'Lava Golem', image: 'assets/enemies/bosses/lava-golem.png', warning: 'Its hammer slams break defenses, while eruptions can engulf almost the entire arena.' },
    oceanBoss: { name: 'Ocean Boss', image: 'assets/enemies/bosses/ocean-boss.png', warning: 'Its tidal attacks sweep across the arena and leave nowhere safe to stand still.' },
    iceBoss: { name: 'Ice Boss', image: 'assets/enemies/bosses/ice-boss.png', warning: 'Its blizzards punish hesitation, and more Ice Minions arrive as the battle drags on.' },
    skeletonWarlord: { name: 'Skeleton Warlord', image: 'assets/enemies/bosses/skeleton-warlord.png', warning: 'This crowned butcher raises four Skeleton Orbs as its health falls, crowding the arena with hungry dead.' },
    sandBoss: { name: 'Sand Tyrant', image: 'assets/enemies/bosses/sand-tyrant.png', warning: 'The buried king commands three Skeleton Minions and five Skeleton Orbs, raising another servant whenever its strength breaks.' },
    woodBoss: { name: 'Wood Boss', image: 'assets/enemies/bosses/wood-boss.png', warning: 'It summons reinforcements as it weakens, turning one monster into an advancing horde.' },
  };
  const details = bossDetails[state.boss.variant] || {
    name: 'Dungeon Guardian',
    image: 'assets/player/shadow boss.png',
    warning: 'It grows more dangerous with every victory you have taken from the dungeon.',
  };
  state.threatSplashOpen = true;
  keys.clear();
  waveSplashKicker.textContent = 'Incoming Boss';
  waveSplashTitle.classList.remove('ally-splash-title');
  waveSplashText.classList.remove('hero-splash-proverb');
  waveSplashTitle.textContent = details.name;
  waveSplashEnemies.replaceChildren();
  const image = document.createElement('img');
  image.src = details.image;
  image.alt = details.name;
  image.classList.add('boss-splash-image');
  waveSplashEnemies.appendChild(image);
  waveSplashText.textContent = details.warning;
  waveSplashWarning.textContent = '';
  waveSplash.classList.remove('hidden');
}

// Shows a fallen-hero proverb and any newly unlocked gear after a boss victory.
function showHeroVictorySplash() {
  state.pendingWaveSplash = false;
  state.threatSplashOpen = true;
  keys.clear();
  waveSplashKicker.textContent = 'Victory';
  waveSplashTitle.classList.remove('ally-splash-title');
  waveSplashTitle.textContent = 'The Hero Endures';
  waveSplashEnemies.replaceChildren();
  const image = document.createElement('img');
  image.src = 'assets/player/armor/male-worldforged-portrait.png';
  image.alt = 'The victorious hero';
  image.classList.add('hero-head-image');
  waveSplashEnemies.appendChild(image);
  waveSplashText.classList.add('hero-splash-proverb');
  waveSplashText.textContent = getRandomFallenHeroProverb();
  state.gearChoiceOpen = unseenGear.size > 0;
  waveSplashWarning.textContent = state.gearChoiceOpen
    ? `New gear recovered. Wave ${state.wave} waits beyond the darkness.`
    : `Boss defeated. Wave ${state.wave} waits beyond the darkness.`;
  waveSplashContinuePrompt.textContent = state.gearChoiceOpen
    ? 'Press C to customize · Any other key to continue'
    : 'Press any key to continue';
  waveSplash.classList.remove('hidden');
}

// Resumes the paused transition after a threat screen is dismissed.
function closeThreatSplash() {
  state.threatSplashOpen = false;
  state.gearChoiceOpen = false;
  waveSplashContinuePrompt.textContent = 'Press any key to continue';
  keys.clear();
  waveSplash.classList.add('hidden');
}

// Returns the room containing an entity, or null while it is in a corridor.
function getContainingRoom(entity) {
  return state.rooms.find((room) => entity.x >= room.x && entity.x <= room.x + room.w && entity.y >= room.y && entity.y <= room.y + room.h) || null;
}

// Finds the closest room centre when an entity is between rooms.
function getNearestRoom(entity) {
  let nearest = null;
  let nearestDistance = Infinity;
  for (const room of state.rooms) {
    const centerX = room.x + room.w / 2;
    const centerY = room.y + room.h / 2;
    const roomDistance = Math.hypot(entity.x - centerX, entity.y - centerY);
    if (roomDistance < nearestDistance) {
      nearestDistance = roomDistance;
      nearest = room;
    }
  }
  return nearest;
}

// Returns currently open orthogonal neighbors for graph traversal.
function getRoomNeighbors(room) {
  return state.rooms.filter((candidate) => {
    if (room.locked || candidate.locked) return false;
    const dx = candidate.gx - room.gx;
    const dy = candidate.gy - room.gy;
    if (dx === 1 && dy === 0) return room.doorways.right && candidate.doorways.left;
    if (dx === -1 && dy === 0) return room.doorways.left && candidate.doorways.right;
    if (dx === 0 && dy === 1) return room.doorways.bottom && candidate.doorways.top;
    if (dx === 0 && dy === -1) return room.doorways.top && candidate.doorways.bottom;
    return false;
  });
}

// Uses breadth-first search to find a valid room-to-room route.
function findRoomPath(start, goal) {
  if (!start || !goal || start === goal) return start ? [start] : [];
  const frontier = [start];
  const cameFrom = new Map([[start, null]]);
  while (frontier.length > 0) {
    const current = frontier.shift();
    if (current === goal) break;
    for (const neighbor of getRoomNeighbors(current)) {
      if (!cameFrom.has(neighbor)) {
        cameFrom.set(neighbor, current);
        frontier.push(neighbor);
      }
    }
  }
  if (!cameFrom.has(goal)) return [];
  const path = [];
  for (let room = goal; room; room = cameFrom.get(room)) path.unshift(room);
  return path;
}

// Openers deliberately draw enemy attention while they scurry between crates.
function getEnemyPreferredTarget(enemy) {
  const nearestOpener = player.openers
    .filter((opener) => opener.health > 0)
    .sort((a, b) => distance(enemy, a) - distance(enemy, b))[0];
  if (nearestOpener) return nearestOpener;
  return [player, ...player.protectors, ...player.openers].reduce((nearest, candidate) => (
    distance(enemy, candidate) < distance(enemy, nearest) ? candidate : nearest
  ), player);
}

// Guides an aggro enemy through the next doorway toward its chosen target.
function getEnemyNavigationTarget(enemy) {
  const combatTarget = getEnemyPreferredTarget(enemy);
  if (enemy.bossMinion) return combatTarget;
  const containingRoom = getContainingRoom(enemy);
  const startRoom = containingRoom || getNearestRoom(enemy);
  const goalRoom = getContainingRoom(combatTarget) || getNearestRoom(combatTarget);
  if (!startRoom || !goalRoom) return combatTarget;

  if (goalRoom.locked && startRoom !== goalRoom) {
    enemy.navigationRoom = null;
    return { x: startRoom.x + startRoom.w / 2, y: startRoom.y + startRoom.h / 2 };
  }

  if (containingRoom && enemy.navigationRoom === containingRoom) {
    enemy.navigationRoom = null;
  }

  // While crossing a corridor, stay aligned with the nearest room's center door.
  if (!containingRoom) {
    const corridorGoal = enemy.navigationRoom || startRoom;
    return { x: corridorGoal.x + corridorGoal.w / 2, y: corridorGoal.y + corridorGoal.h / 2 };
  }

  const path = findRoomPath(startRoom, goalRoom);
  if (path.length < 2) return combatTarget;
  const nextRoom = path[1];
  enemy.navigationRoom = nextRoom;
  const gap = 44;
  if (nextRoom.gx > startRoom.gx) return { x: startRoom.x + startRoom.w + gap, y: startRoom.y + startRoom.h / 2 };
  if (nextRoom.gx < startRoom.gx) return { x: startRoom.x - gap, y: startRoom.y + startRoom.h / 2 };
  if (nextRoom.gy > startRoom.gy) return { x: startRoom.x + startRoom.w / 2, y: startRoom.y + startRoom.h + gap };
  return { x: startRoom.x + startRoom.w / 2, y: startRoom.y - gap };
}

// Guides a protector through the room graph toward its chosen target.
function getProtectorNavigationTarget(protector, target) {
  const containingRoom = getContainingRoom(protector);
  const startRoom = containingRoom || getNearestRoom(protector);
  const goalRoom = getContainingRoom(target) || getNearestRoom(target);
  if (!startRoom || !goalRoom) return target;
  if (containingRoom && protector.navigationRoom === containingRoom) protector.navigationRoom = null;
  if (!containingRoom) {
    const corridorGoal = protector.navigationRoom || startRoom;
    return { x: corridorGoal.x + corridorGoal.w / 2, y: corridorGoal.y + corridorGoal.h / 2 };
  }
  const path = findRoomPath(startRoom, goalRoom);
  if (path.length < 2) return target;
  const nextRoom = path[1];
  protector.navigationRoom = nextRoom;
  const gap = 44;
  if (nextRoom.gx > startRoom.gx) return { x: startRoom.x + startRoom.w + gap, y: startRoom.y + startRoom.h / 2 };
  if (nextRoom.gx < startRoom.gx) return { x: startRoom.x - gap, y: startRoom.y + startRoom.h / 2 };
  if (nextRoom.gy > startRoom.gy) return { x: startRoom.x + startRoom.w / 2, y: startRoom.y + startRoom.h + gap };
  return { x: startRoom.x + startRoom.w / 2, y: startRoom.y - gap };
}

// Tests whether an entity can cross a particular wall at its current offset.
function doorBlocked(room, side, position, radius = 0) {
  if (room.locked) return true;
  if (!room.doorways[side]) return true;
  const doorHalf = Math.max(0, doorWidth / 2 - radius);
  const doorCenter = side === 'top' || side === 'bottom'
    ? room.x + room.w / 2
    : room.y + room.h / 2;
  const insideDoor = position > doorCenter - doorHalf && position < doorCenter + doorHalf;
  return !insideDoor;
}

// Identifies the traversable corridor bounds currently containing an entity.
function getContainingCorridor(entity) {
  const radius = entity.radius || 0;
  for (const room of state.rooms) {
    if (room.doorways.right) {
      const neighbor = state.rooms.find((candidate) => candidate.gx === room.gx + 1 && candidate.gy === room.gy);
      if (neighbor) {
        const minX = room.x + room.w;
        const maxX = neighbor.x;
        const centerY = room.y + room.h / 2;
        const minY = centerY - doorWidth / 2 + radius;
        const maxY = centerY + doorWidth / 2 - radius;
        if (entity.x >= minX && entity.x <= maxX && entity.y >= minY && entity.y <= maxY) {
          return { orientation: 'horizontal', minX, maxX, minY, maxY, room, neighbor };
        }
      }
    }
    if (room.doorways.bottom) {
      const neighbor = state.rooms.find((candidate) => candidate.gx === room.gx && candidate.gy === room.gy + 1);
      if (neighbor) {
        const minY = room.y + room.h;
        const maxY = neighbor.y;
        const centerX = room.x + room.w / 2;
        const minX = centerX - doorWidth / 2 + radius;
        const maxX = centerX + doorWidth / 2 - radius;
        if (entity.x >= minX && entity.x <= maxX && entity.y >= minY && entity.y <= maxY) {
          return { orientation: 'vertical', minX, maxX, minY, maxY, room, neighbor };
        }
      }
    }
  }
  return null;
}

// Clamps a proposed move to room walls, open doors, corridors, and world bounds.
function resolveRoomCollision(entity, nextX, nextY) {
  const candidate = { x: nextX, y: nextY };

  // Boss fights use the entire arena and ignore the dungeon room walls.
  if (state.boss && (entity === player || entity.bossMinion)) {
    candidate.x = clamp(
      candidate.x,
      state.bossArena.x + entity.radius,
      state.bossArena.x + state.bossArena.w - entity.radius,
    );
    candidate.y = clamp(
      candidate.y,
      state.bossArena.y + entity.radius,
      state.bossArena.y + state.bossArena.h - entity.radius,
    );
    return candidate;
  }

  const room = getContainingRoom(entity);

  if (!room) {
    const candidateRoom = getContainingRoom(candidate);
    const corridor = getContainingCorridor(entity) || getContainingCorridor(candidate);
    if (candidateRoom && !candidateRoom.locked && corridor) return candidate;
    if (!corridor) return { x: entity.x, y: entity.y };
    candidate.x = clamp(candidate.x, corridor.minX, corridor.maxX);
    candidate.y = clamp(candidate.y, corridor.minY, corridor.maxY);
    return candidate;
  }

  const margin = wallThickness + entity.radius;
  const leftWall = candidate.x - entity.radius < room.x + wallThickness;
  const rightWall = candidate.x + entity.radius > room.x + room.w - wallThickness;
  const topWall = candidate.y - entity.radius < room.y + wallThickness;
  const bottomWall = candidate.y + entity.radius > room.y + room.h - wallThickness;

  if (leftWall && doorBlocked(room, 'left', candidate.y, entity.radius)) {
    candidate.x = room.x + wallThickness + entity.radius;
  }
  if (rightWall && doorBlocked(room, 'right', candidate.y, entity.radius)) {
    candidate.x = room.x + room.w - wallThickness - entity.radius;
  }
  if (topWall && doorBlocked(room, 'top', candidate.x, entity.radius)) {
    candidate.y = room.y + wallThickness + entity.radius;
  }
  if (bottomWall && doorBlocked(room, 'bottom', candidate.x, entity.radius)) {
    candidate.y = room.y + room.h - wallThickness - entity.radius;
  }

  candidate.x = clamp(candidate.x, 0, world.width);
  candidate.y = clamp(candidate.y, 0, world.height);
  return candidate;
}

// Builds one wave-scaled enemy with a weighted type and combat profile.
function createEnemy(room, index) {
  const easyTypes = ['walker', 'runner'];
  const mediumTypes = ['crawler', 'spitter', 'burrower', 'arcaneOrb'];
  const hardTypes = ['brute', 'assassin', 'sentinel', 'wraith', 'reaper'];
  const hardChance = Math.min(0.38, 0.01 + (state.wave - 1) * 0.022);
  const mediumChance = Math.min(0.34, 0.1 + (state.wave - 1) * 0.025);
  const typeRoll = Math.random();
  let type;
  if (typeRoll < hardChance) {
    type = hardTypes[Math.floor(Math.random() * hardTypes.length)];
  } else if (typeRoll < hardChance + mediumChance) {
    type = mediumTypes[Math.floor(Math.random() * mediumTypes.length)];
  } else {
    type = easyTypes[Math.floor(Math.random() * easyTypes.length)];
  }
  const base = {
    x: room.x + 120 + Math.random() * (room.w - 220),
    y: room.y + 110 + Math.random() * (room.h - 220),
    radius: 16,
    speed: 105,
    health: 32 + state.wave * 8,
    maxHealth: 32 + state.wave * 8,
    damage: 8 + state.wave * 2,
    type,
    cooldown: 0,
    aiTimer: 0,
    attackTimer: rand(0, 0.45),
    hitFlash: 0,
    lunge: 0,
    retreatTimer: 0,
    retreatFromX: null,
    retreatFromY: null,
    movePhase: Math.random() * Math.PI * 2,
    spawnRoom: room,
    aggro: false,
    idleMoveTimer: 0,
    idleTargetX: null,
    idleTargetY: null,
    elite: Math.random() < Math.min(0.18, Math.max(0, state.wave - 2) * 0.015),
  };

  if (type === 'runner') {
    base.speed = 162;
    base.health = 24 + state.wave * 6;
    base.damage = 7 + state.wave;
  }
  if (type === 'brute') {
    base.speed = 81;
    base.health = 78 + state.wave * 12;
    base.damage = 12 + state.wave * 2.6;
    base.radius = 22;
  }
  if (type === 'spitter') {
    base.speed = 75;
    base.health = 44 + state.wave * 10;
    base.damage = 10 + state.wave;
  }
  if (type === 'assassin') {
    base.speed = 183;
    base.health = 32 + state.wave * 9;
    base.damage = 9 + state.wave * 1.6;
  }

  if (type === 'crawler') {
    base.speed = 142.5;
    base.health = 28 + state.wave * 7;
    base.damage = 6 + state.wave * 1.2;
    base.radius = 20;
  }
  if (type === 'sentinel') {
    base.speed = 66;
    base.health = 110 + state.wave * 15;
    base.damage = 16 + state.wave * 2.8;
    base.radius = 25;
  }
  if (type === 'wraith') {
    base.speed = 135;
    base.health = 48 + state.wave * 10;
    base.damage = 12 + state.wave * 1.8;
    base.radius = 18;
  }
  if (type === 'burrower') {
    base.speed = 118;
    base.health = 62 + state.wave * 10;
    base.damage = 11 + state.wave * 1.7;
    base.radius = 23;
  }
  if (type === 'arcaneOrb') {
    base.speed = 148;
    base.health = 38 + state.wave * 8;
    base.damage = 10 + state.wave * 1.5;
    base.radius = 17;
  }
  if (type === 'reaper') {
    base.speed = 128;
    base.health = 86 + state.wave * 13;
    base.damage = 18 + state.wave * 2.5;
    base.radius = 24;
  }

  // Keep the chase manageable while preserving each class's relative speed.
  base.speed *= 0.72;
  const earlyDifficulty = state.wave === 1 ? 0.72 : state.wave === 2 ? 0.84 : state.wave === 3 ? 0.94 : 1;
  base.health *= earlyDifficulty;
  base.damage *= earlyDifficulty;
  base.maxHealth = base.health;

  if (base.elite) {
    base.health *= 1.8;
    base.maxHealth = base.health;
    base.damage *= 1.3;
    base.radius += 4;
  }
  return base;
}

// Doubles the wave roster, making half immediate hunters and half room patrols.
function spawnEnemiesForWave() {
  state.enemies = [];
  const originalCount = Math.min(32, state.wave <= 3 ? (3 + state.wave) * 2 : 3 + Math.ceil(state.wave * 1.5));
  const count = Math.min(64, originalCount * 2);
  for (let i = 0; i < count; i += 1) {
    const room = state.rooms[i % state.rooms.length];
    const enemy = createEnemy(room, i);
    // Half begin hunting immediately; the other half wander in their rooms
    // until the hero approaches or attacks them.
    enemy.aggro = i % 2 === 0;
    state.enemies.push(enemy);
  }
}

// Creates the next tiered boss and places the party inside its arena.
function spawnBoss() {
  const isFirstBoss = state.bossDefeated === 0;
  const isSecondBoss = state.bossDefeated === 1;
  const isThirdBoss = state.bossDefeated === 2;
  const isFourthBoss = state.bossDefeated === 3;
  const isFifthBoss = state.bossDefeated === 4;
  const isSixthBoss = state.bossDefeated === 5;
  const isTenthBoss = state.bossDefeated === 9;
  const bossTier = state.bossDefeated + 1;
  const bossHealth = 470 + bossTier * 230 + Math.max(0, bossTier - 2) * 90;
  const bossDamage = 14 + bossTier * 5 + Math.max(0, bossTier - 2) * 1.5;
  state.boss = {
    x: world.width / 2,
    y: world.height / 2,
    radius: isFirstBoss ? 48 : isSecondBoss ? 52 : isThirdBoss ? 54 : isFourthBoss ? 55 : isFifthBoss ? 57 : isSixthBoss ? 58 : isTenthBoss ? 58 : 36,
    health: bossHealth,
    maxHealth: bossHealth,
    damage: bossDamage,
    tier: bossTier,
    cooldown: 1.1,
    attackWindup: 0,
    attackWindupTotal: 0.38,
    attackType: isFirstBoss ? 'rootSlam' : isSecondBoss ? 'hammerSlam' : isThirdBoss ? 'tideSlam' : isFourthBoss ? 'iceSlam' : isFifthBoss ? 'boneSlam' : isSixthBoss ? 'sandSlam' : isTenthBoss ? 'woodSlam' : 'slam',
    attackPulse: 0,
    hitFlash: 0,
    lungeTimer: 0,
    lungeDuration: 0,
    lungeRemaining: 0,
    lungeDirX: 0,
    lungeDirY: 0,
    lungeDamageScale: 1,
    lungeHitRange: 75,
    lungeEffectColor: '#fb7185',
    lungeIsDash: false,
    retreatTimer: 0,
    retreatDelay: 0,
    retreatFromX: null,
    retreatFromY: null,
    movePhase: 0,
    facingX: -1,
    defeatedTimer: 0,
    halfHealthMinionSummoned: false,
    nextWoodMinionThreshold: 0.9,
    nextSkeletonOrbThreshold: 0.8,
    skeletonOrbsSummoned: 0,
    nextSandSummonThreshold: 0.9,
    sandSummonsCompleted: 0,
    variant: isFirstBoss ? 'lushGolem' : isSecondBoss ? 'lavaGolem' : isThirdBoss ? 'oceanBoss' : isFourthBoss ? 'iceBoss' : isFifthBoss ? 'skeletonWarlord' : isSixthBoss ? 'sandBoss' : isTenthBoss ? 'woodBoss' : 'standard',
  };
  player.x = world.width / 2 - 150;
  player.y = world.height / 2;
  player.protectors.forEach((protector, index) => {
    protector.x = player.x - 38 - index * 24;
    protector.y = player.y + 38 + (index % 2) * 30;
    protector.navigationRoom = null;
    protector.target = null;
  });
  player.openers.forEach((opener, index) => {
    opener.x = player.x + 42 + index * 22;
    opener.y = player.y + 48 + (index % 2) * 26;
    opener.navigationRoom = null;
    opener.target = null;
  });
  setMessage(`Boss arena reached. Defeat the boss to gain stronger loot.`);
  if (state.boss.variant === 'iceBoss') summonIceMinion(state.boss, 'opening');
}

// Advances progression and prepares the next connected dungeon off-screen.
function startNextWave() {
  state.wave += 1;
  state.maxRooms += 1;
  createRooms();
  spawnEnemiesForWave();
  state.roomCleared = false;
  state.boss = null;
  state.bossArenaOpen = false;
  placePlayerInFirstRoom();
  player.protectors.forEach((protector, index) => {
    protector.x = player.x + 38 + (index % 3) * 28;
    protector.y = player.y + 38 + Math.floor(index / 3) * 28;
    protector.navigationRoom = null;
    protector.target = null;
  });
  player.openers.forEach((opener, index) => {
    opener.x = player.x - 42 - (index % 3) * 24;
    opener.y = player.y + 42 + Math.floor(index / 3) * 26;
    opener.navigationRoom = null;
    opener.target = null;
  });
  player.health = clamp(player.health + 5, 0, player.maxHealth);
  player.food = clamp(player.food - 4, 0, 100);
  player.hydration = clamp(player.hydration - 5, 0, 100);
  state.pendingWaveSplash = true;
}

// Awards rising boss points, loot, unlocks, and periodic equipment upgrades.
function rewardBossLoot() {
  const defeatedBossNumber = state.bossDefeated + 1;
  state.score += getBossScore(state.boss);
  for (let i = 0; i < 10; i += 1) {
    applyLoot(randomLoot());
  }
  state.bossDefeated += 1;
  const unlockedSet = armorSets.find((armor) => armor.boss === defeatedBossNumber);
  if (unlockedSet && !unlockedArmor.has(unlockedSet.id)) {
    unlockedArmor.add(unlockedSet.id);
    unseenGear.add(`armor:${unlockedSet.id}`);
    saveArmorCollection();
    updateGearNotification();
    setMessage(`${unlockedSet.name} unlocked in the Hero Armory!`);
  }
  const unlockedWeapon = weaponSets.find((weapon) => weapon.boss === defeatedBossNumber);
  if (unlockedWeapon && !unlockedWeapons.has(unlockedWeapon.id)) {
    unlockedWeapons.add(unlockedWeapon.id);
    unseenGear.add(`weapon:${unlockedWeapon.id}`);
    saveArmorCollection();
    updateGearNotification();
    setMessage(`${unlockedWeapon.name} unlocked in the Hero Armory!`);
  }
  if (state.bossDefeated % 5 === 0) {
    player.weaponLevel += 1;
    player.armorLevel += 1;
    setMessage('Boss chain completed! Your weapon and armor have been upgraded.');
  }
}

// Converts five shards into a persistent allied protector for the current run.
function createProtector() {
  if (player.inventory.protectorShard < 5) {
    setMessage('Need 5 protector shards to summon a protector.');
    return;
  }
  player.inventory.protectorShard -= 5;
  const angle = player.protectors.length * 1.9;
  player.protectors.push({
    x: player.x + Math.cos(angle) * 42,
    y: player.y + Math.sin(angle) * 42,
    radius: 18,
    health: player.maxHealth,
    maxHealth: player.maxHealth,
    energy: 100,
    maxEnergy: 100,
    attackCooldown: 0,
    attackPoseTimer: 0,
    attackPose: 'paw',
    facingX: -1,
    retreatTimer: 0,
    retreatFromX: null,
    retreatFromY: null,
    target: null,
  });
  setMessage(`Protector summoned! You now have ${player.protectors.length}.`);
}

// Converts three shards into a three-hit helper that opens four crates.
function createOpener() {
  if (player.inventory.openerShard < 3) {
    setMessage('Need 3 Scout Shards to summon a Scout.');
    return;
  }
  player.inventory.openerShard -= 3;
  const angle = player.openers.length * 2.1 + 0.8;
  player.openers.push({
    kind: 'opener',
    x: player.x + Math.cos(angle) * 48,
    y: player.y + Math.sin(angle) * 48,
    radius: 16,
    health: 3,
    maxHealth: 3,
    cratesOpened: 0,
    openCooldown: 0,
    navigationRoom: null,
    target: null,
    facingX: -1,
    isMoving: false,
    scurryPhase: 0,
    showcaseTimer: 1.15,
    showcaseDuration: 1.15,
  });
  setMessage(`Scout summoned! ${player.openers.length} active.`);
}

// Consumes shield shards to block all incoming damage for a short duration.
function activateShield() {
  if (player.shieldActive) {
    setMessage(`Shield already active for ${Math.ceil(player.shieldTimer)} more seconds.`);
    return;
  }
  if (player.inventory.shieldShard < 3) {
    setMessage('Need 3 shield shards to activate a shield.');
    return;
  }
  player.inventory.shieldShard -= 3;
  player.shieldActive = true;
  player.shieldTimer = 7;
  setMessage('Shield activated for 7 seconds.');
}

// Pushes the hero away from a hit source without bypassing collision boundaries.
function knockHeroAwayFrom(attacker, knockbackDistance) {
  const dx = player.x - attacker.x;
  const dy = player.y - attacker.y;
  const separation = Math.hypot(dx, dy);
  const awayX = separation > 0 ? dx / separation : Math.sign(attacker.facingX || 1);
  const awayY = separation > 0 ? dy / separation : 0;
  const nextX = player.x + awayX * knockbackDistance;
  const nextY = player.y + awayY * knockbackDistance;
  if (state.boss) {
    player.x = clamp(nextX, state.bossArena.x + player.radius, state.bossArena.x + state.bossArena.w - player.radius);
    player.y = clamp(nextY, state.bossArena.y + player.radius, state.bossArena.y + state.bossArena.h - player.radius);
  } else {
    const safe = resolveRoomCollision(player, nextX, nextY);
    player.x = safe.x;
    player.y = safe.y;
  }
}

// Applies invulnerability, shields, armour reduction, damage, and hero knockback.
function applyCombatDamage(victim, amount, attacker = null) {
  if (victim.kind === 'opener') {
    victim.health = Math.max(0, victim.health - 1);
    return true;
  }
  if (victim === player && state.developerMode) {
    player.health = Math.max(1, player.health);
    return false;
  }
  // Prevent overlapping enemies and boss summons from stacking several hits
  // into the same frame and bypassing the visible health warning.
  if (victim === player && player.damageInvulnerability > 0) {
    return false;
  }
  if (victim === player && player.shieldActive) {
    spawnBurst(player.x, player.y, 6, '#67e8f9', 70);
    state.shake = Math.max(state.shake, 2);
    return false;
  }
  const armorReduction = victim === player ? getEquippedArmor().defense / 100 : 0;
  if (victim === player && attacker) {
    const attackerName = attacker === state.boss
      ? String(attacker.variant || 'boss').replace(/([a-z])([A-Z])/g, '$1 $2')
      : String(attacker.type || 'enemy').replace(/([a-z])([A-Z])/g, '$1 $2');
    state.lastDeathCause = `an attack from the ${attackerName}`;
  }
  const healthBeforeHit = victim.health;
  victim.health = Math.max(0, victim.health - amount * (1 - armorReduction));
  if (victim === player && attacker && typeof attacker.health === 'number') {
    const thornsPercent = getEquippedArmor().thorns || 0;
    const damageTaken = healthBeforeHit - victim.health;
    const reflectedDamage = damageTaken * thornsPercent / 100;
    if (reflectedDamage > 0) {
      attacker.health = Math.max(0, attacker.health - reflectedDamage);
      if ('hitFlash' in attacker) attacker.hitFlash = Math.max(attacker.hitFlash || 0, 0.18);
      spawnBurst(attacker.x, attacker.y, 7, '#a3e635', 95);
      if (attacker !== state.boss && attacker.health <= 0 && !attacker.dead) {
        awardEnemyScore(attacker);
        attacker.dead = true;
        attacker.deathTimer = 0.55;
        spawnBurst(attacker.x, attacker.y, 14, '#bef264', 125);
      }
    }
  }
  if (victim === player && attacker) {
    player.damageInvulnerability = 0.4;
    knockHeroAwayFrom(attacker, attacker === state.boss ? 28 : 14);
  }
  return true;
}

// Opens the accept-or-decline prompt on first entry to a rare room.
function maybeOpenChallengeRoom() {
  if (state.boss || state.challengePromptOpen) return;
  for (const room of state.challengeRooms) {
    if (player.x > room.x && player.x < room.x + room.w && player.y > room.y && player.y < room.y + room.h) {
      if (room.challengeResolved) continue;
      room.challengeResolved = true;
      state.challengePromptOpen = true;
      state.pendingChallengeRoom = room;
      keys.clear();
      challengeOverlay.classList.remove('hidden');
      break;
    }
  }
}

// Either seals in a powered-up guardian or dismisses the room challenge.
function resolveChallengeChoice(accept) {
  const room = state.pendingChallengeRoom;
  if (!room) return;

  if (accept) {
    room.challengeAccepted = true;
    room.locked = true;
    const elite = createEnemy(room, state.wave + 10);
    elite.health *= 3;
    elite.maxHealth = elite.health;
    elite.damage *= 2.7;
    elite.radius += 8;
    elite.elite = true;
    elite.specialEnemy = true;
    elite.specialRoom = room;
    room.specialEnemy = elite;
    state.enemies.push(elite);
    setMessage('The chamber seals shut. Defeat its guardian to escape!');
  } else {
    room.challenge = false;
    room.rare = false;
    setMessage('You leave the Forbidden Chamber undisturbed.');
  }

  state.challengePromptOpen = false;
  state.pendingChallengeRoom = null;
  keys.clear();
  challengeOverlay.classList.add('hidden');
}

// Converts held movement keys into collision-safe movement and resource drain.
function handleInput(dt) {
  player.damageInvulnerability = Math.max(0, player.damageInvulnerability - dt);
  const dx = (keys.has('d') ? 1 : 0) - (keys.has('a') ? 1 : 0);
  const dy = (keys.has('s') ? 1 : 0) - (keys.has('w') ? 1 : 0);
  const isMoving = dx !== 0 || dy !== 0;
  const len = Math.hypot(dx, dy) || 1;
  const moveX = dx / len;
  const moveY = dy / len;

  // Once fully drained, sprint stays disabled until enough stamina has
  // recovered. This prevents held G from alternating boosted/recovery frames.
  if (player.sprintExhausted && player.stamina >= player.maxStamina * 0.2) {
    player.sprintExhausted = false;
  }
  const isSprinting = isMoving && keys.has('g') && !player.sprintExhausted && player.stamina > 0;
  let speed = player.speed;
  if (isSprinting) {
    speed *= 1.55;
    player.stamina = clamp(player.stamina - 20 * dt, 0, player.maxStamina);
    if (player.stamina === 0) player.sprintExhausted = true;
  } else {
    player.stamina = clamp(player.stamina + 13 * dt, 0, player.maxStamina);
  }

  const proposedX = player.x + moveX * speed * dt;
  const proposedY = player.y + moveY * speed * dt;
  const currentRoom = getContainingRoom(player);
  let safePosition;
  if (currentRoom?.locked) {
    const horizontalMove = resolveRoomCollision(player, proposedX, player.y);
    safePosition = resolveRoomCollision(player, horizontalMove.x, proposedY);
  } else {
    safePosition = resolveRoomCollision(player, proposedX, proposedY);
  }
  player.x = safePosition.x;
  player.y = safePosition.y;

  if (Math.abs(moveX) > 0.1 || Math.abs(moveY) > 0.1) {
    player.facing.x = moveX;
    player.facing.y = moveY;
  }

  player.food = clamp(player.food - 1.2 * dt, 0, 100);
  player.hydration = clamp(player.hydration - 1.8 * dt, 0, 100);
  if (player.food <= 25 && !state.foodWarningShown) {
    state.foodWarningShown = true;
    setMessage('Food is critically low! Open crates to find food and restore it automatically.', true);
  } else if (player.food > 40) {
    state.foodWarningShown = false;
  }
  if (player.hydration <= 25 && !state.waterWarningShown) {
    state.waterWarningShown = true;
    setMessage('Hydration is critically low! Open crates—water loot restores hydration automatically.', true);
  } else if (player.hydration > 40) {
    state.waterWarningShown = false;
  }
  if (!state.foodWarningShown && !state.waterWarningShown) {
    messageBox.classList.remove('critical-warning');
  }
  if (!state.developerMode && player.food <= 0) {
    state.lastDeathCause = 'starvation';
    player.health = clamp(player.health - 1 * dt, 0, player.maxHealth);
  }
  if (!state.developerMode && player.hydration <= 0) {
    state.lastDeathCause = 'dehydration';
    player.health = clamp(player.health - 1.5 * dt, 0, player.maxHealth);
  }

  if (player.attackCooldown > 0) player.attackCooldown -= dt;
  if (player.attackDuration > 0) player.attackDuration -= dt;
  if (player.shieldTimer > 0) player.shieldTimer -= dt;
  if (player.shieldTimer <= 0) player.shieldActive = false;

}

// Consumes one stored bandage when the hero has missing health.
function useBandage() {
  if (player.inventory.bandage <= 0) {
    setMessage('You do not have any stored bandages.');
    return;
  }
  if (player.health >= player.maxHealth) {
    setMessage('You are already at full health.');
    return;
  }
  player.inventory.bandage -= 1;
  player.health = clamp(player.health + 30, 0, player.maxHealth);
  setMessage('Stored bandage used: +30 health.');
}

// Emits a lightweight radial particle burst for combat and transitions.
function spawnBurst(x, y, count, color, speed = 50) {
  for (let i = 0; i < count; i += 1) {
    state.particles.push({
      x,
      y,
      vx: rand(-speed, speed),
      vy: rand(-speed, speed),
      life: rand(0.3, 0.75),
      age: 0,
      color,
      size: rand(2, 5),
    });
  }
}

// Begins the fade-out from a cleared dungeon toward its boss encounter.
function startBossTeleport() {
  state.teleportTimer = state.teleportDuration;
  state.teleportMoved = false;
  state.teleportTarget = 'boss';
  keys.clear();
  spawnBurst(player.x, player.y, 34, '#67e8f9', 150);
  setMessage('Wave cleared! Teleporting to the boss arena...');
}

// Begins the fade-out from a defeated boss toward the next wave.
function startWaveTeleport() {
  state.teleportTimer = state.teleportDuration;
  state.teleportMoved = false;
  state.teleportTarget = 'wave';
  keys.clear();
  spawnBurst(player.x, player.y, 42, '#a5f3fc', 175);
  setMessage('Boss defeated! Teleporting to the next wave...');
}

// Pauses teleportation at invisibility for a splash, then completes arrival.
function updateBossTeleport(dt) {
  if (state.teleportTimer <= 0) return;

  state.teleportTimer = Math.max(0, state.teleportTimer - dt);
  const elapsed = state.teleportDuration - state.teleportTimer;
  if (!state.teleportMoved && elapsed >= state.teleportDuration / 2) {
    state.teleportMoved = true;
    if (state.teleportTarget === 'wave') {
      startNextWave();
      const healthRatio = player.health / player.maxHealth;
      const heroSplashChance = healthRatio <= 0.2 ? 0.8 : healthRatio <= 0.35 ? 0.45 : 0;
      if (Math.random() < heroSplashChance) showHeroVictorySplash();
      else showWaveSplash();
    } else {
      spawnBoss();
      // Pause at the invisible midpoint: the hero has left the dungeon, but
      // does not materialize in the arena until the warning is dismissed.
      showBossSplash();
    }
    spawnBurst(player.x, player.y, 42, '#a5f3fc', 175);
    state.shake = 9;
  }

  if (state.teleportTimer === 0) {
    keys.clear();
    setMessage(state.teleportTarget === 'wave'
      ? `Teleport complete. Wave ${state.wave} begins!`
      : 'Teleport complete. Defeat the boss!');
    state.teleportTarget = null;
  }
}

// Tests range and the hero's forward-facing melee cone.
function isInsideAttackArc(target, range) {
  const dx = target.x - player.x;
  const dy = target.y - player.y;
  const targetDistance = Math.hypot(dx, dy);
  const targetRadius = target.radius || 0;
  if (targetDistance > range + targetRadius) return false;
  if (targetDistance === 0) return true;

  // A 100-degree cone centered on the direction the character is facing.
  const directionDot = (dx / targetDistance) * player.facing.x
    + (dy / targetDistance) * player.facing.y;
  return directionDot >= Math.cos(50 * Math.PI / 180);
}

// Performs one swing with a fixed damage pool shared by every overlapping target.
function tryAttack() {
  if (player.attackCooldown > 0) return;
  player.attackCooldown = 0.42;
  player.attackDuration = 0.24;
  const equippedWeapon = getEquippedWeapon();
  const damageMultiplier = 1 + equippedWeapon.damage / 100;
  spawnBurst(player.x + player.facing.x * 24, player.y + player.facing.y * 24, 7, '#f8fafc', 80);

  const enemyRange = 70 + player.weaponLevel * 8 + equippedWeapon.reach;
  const attackCandidates = state.enemies
    .filter((enemy) => !enemy.dead && isInsideAttackArc(enemy, enemyRange));
  if (state.boss && isInsideAttackArc(state.boss, 88 + player.weaponLevel * 5 + equippedWeapon.reach)) {
    attackCandidates.push(state.boss);
  }
  attackCandidates.sort((a, b) => distance(player, a) - distance(player, b));
  const primaryTarget = attackCandidates[0] || null;
  const targets = primaryTarget
    ? attackCandidates.filter((candidate) => (
      candidate === primaryTarget
      || distance(primaryTarget, candidate) <= primaryTarget.radius + candidate.radius + 8
    ))
    : [];
  const bossOnlyHit = targets.length === 1 && targets[0] === state.boss;
  const totalSwingDamage = (
    bossOnlyHit ? 26 + player.weaponLevel * 6 : 21 + player.weaponLevel * 5
  ) * damageMultiplier;
  const damagePerTarget = targets.length > 0 ? totalSwingDamage / targets.length : 0;

  for (const target of targets) {
    target.health -= damagePerTarget;
    target.hitFlash = target === state.boss ? 0.2 : 0.18;
    target.x += player.facing.x * (target === state.boss ? 10 : 18);
    target.y += player.facing.y * (target === state.boss ? 10 : 18);
    if (target === state.boss) {
      const bossHitColor = target.variant === 'lavaGolem' ? '#fb923c' : target.variant === 'oceanBoss' ? '#67e8f9' : target.variant === 'iceBoss' ? '#dbeafe' : target.variant === 'skeletonWarlord' ? '#a5f3fc' : target.variant === 'sandBoss' ? '#fbbf24' : target.variant === 'woodBoss' ? '#bef264' : '#fca5a5';
      spawnBurst(target.x, target.y, 8, bossHitColor, 120);
    } else {
      target.aggro = true;
      spawnBurst(target.x, target.y, 4, '#fb7185', 70);
      if (target.health <= 0) {
        awardEnemyScore(target);
        target.dead = true;
        target.deathTimer = 0.55;
        spawnBurst(target.x, target.y, 14, '#f97316', 120);
      }
    }
  }
}

// Keeps living enemies from occupying the same space and multiplying one hit.
function separateOverlappingEnemies() {
  const livingEnemies = state.enemies.filter((enemy) => !enemy.dead);
  for (let firstIndex = 0; firstIndex < livingEnemies.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < livingEnemies.length; secondIndex += 1) {
      const first = livingEnemies[firstIndex];
      const second = livingEnemies[secondIndex];
      let dx = second.x - first.x;
      let dy = second.y - first.y;
      let separation = Math.hypot(dx, dy);
      const minimumSeparation = first.radius + second.radius + 4;
      if (separation >= minimumSeparation) continue;
      if (separation === 0) {
        const angle = (firstIndex * 2.4 + secondIndex) % (Math.PI * 2);
        dx = Math.cos(angle);
        dy = Math.sin(angle);
        separation = 1;
      }
      const push = (minimumSeparation - separation) / 2;
      const pushX = dx / separation * push;
      const pushY = dy / separation * push;
      const firstX = first.x - pushX;
      const firstY = first.y - pushY;
      const secondX = second.x + pushX;
      const secondY = second.y + pushY;
      if (state.boss && first.bossMinion && second.bossMinion) {
        first.x = clamp(firstX, state.bossArena.x + first.radius, state.bossArena.x + state.bossArena.w - first.radius);
        first.y = clamp(firstY, state.bossArena.y + first.radius, state.bossArena.y + state.bossArena.h - first.radius);
        second.x = clamp(secondX, state.bossArena.x + second.radius, state.bossArena.x + state.bossArena.w - second.radius);
        second.y = clamp(secondY, state.bossArena.y + second.radius, state.bossArena.y + state.bossArena.h - second.radius);
      } else {
        const firstSafe = resolveRoomCollision(first, firstX, firstY);
        const secondSafe = resolveRoomCollision(second, secondX, secondY);
        first.x = firstSafe.x;
        first.y = firstSafe.y;
        second.x = secondSafe.x;
        second.y = secondSafe.y;
      }
    }
  }
}

// Runs enemy patrol, persistent aggro, navigation, lunge, strike, and retreat AI.
function updateEnemies(dt) {
  const playerRoom = getContainingRoom(player);
  for (const enemy of state.enemies) {
    if (enemy.dead) {
      enemy.deathTimer = Math.max(0, (enemy.deathTimer ?? 0.55) - dt);
      continue;
    }

    const enemyRoom = enemy.spawnRoom || getContainingRoom(enemy);
    const helperNearby = player.protectors.some((helper) => distance(enemy, helper) <= 300)
      || player.openers.some((opener) => distance(enemy, opener) <= 600);
    if (
      enemy.bossMinion
      || playerRoom === enemyRoom
      || distance(enemy, player) <= 300
      || helperNearby
    ) {
      enemy.aggro = true;
    }

    enemy.hitFlash = Math.max(0, enemy.hitFlash - dt);
    enemy.attackTimer = Math.max(0, enemy.attackTimer - dt);
    enemy.lunge = Math.max(0, enemy.lunge - dt * 5);
    enemy.retreatTimer = Math.max(0, (enemy.retreatTimer || 0) - dt);

    if (!enemy.aggro) {
      enemy.idleMoveTimer = Math.max(0, (enemy.idleMoveTimer || 0) - dt);
      const idleTargetDistance = enemy.idleTargetX == null
        ? 0
        : Math.hypot(enemy.idleTargetX - enemy.x, enemy.idleTargetY - enemy.y);
      if (enemyRoom && (enemy.idleMoveTimer <= 0 || idleTargetDistance < 10)) {
        const padding = enemy.radius + 28;
        enemy.idleTargetX = rand(enemyRoom.x + padding, enemyRoom.x + enemyRoom.w - padding);
        enemy.idleTargetY = rand(enemyRoom.y + padding, enemyRoom.y + enemyRoom.h - padding);
        enemy.idleMoveTimer = rand(1.4, 3.2);
      }
      if (enemy.idleTargetX != null) {
        const idleDx = enemy.idleTargetX - enemy.x;
        const idleDy = enemy.idleTargetY - enemy.y;
        const idleDistance = Math.hypot(idleDx, idleDy) || 1;
        const idleSpeed = Math.min(38, enemy.speed * 0.28);
        const step = Math.min(idleDistance, idleSpeed * dt);
        enemy.x += (idleDx / idleDistance) * step;
        enemy.y += (idleDy / idleDistance) * step;
        if (Math.abs(idleDx) > 1) enemy.facingX = idleDx;
      }
      enemy.movePhase += dt * 1.8;
      continue;
    }

    if (enemy.retreatTimer > 0 && enemy.retreatFromX != null) {
      const retreatDx = enemy.x - enemy.retreatFromX;
      const retreatDy = enemy.y - enemy.retreatFromY;
      const retreatDistance = Math.hypot(retreatDx, retreatDy) || 1;
      const retreatSpeed = enemy.speed * 1.25;
      const retreatX = enemy.x + (retreatDx / retreatDistance) * retreatSpeed * dt;
      const retreatY = enemy.y + (retreatDy / retreatDistance) * retreatSpeed * dt;
      if (state.boss && enemy.bossMinion) {
        enemy.x = clamp(retreatX, state.bossArena.x + enemy.radius, state.bossArena.x + state.bossArena.w - enemy.radius);
        enemy.y = clamp(retreatY, state.bossArena.y + enemy.radius, state.bossArena.y + state.bossArena.h - enemy.radius);
      } else {
        const safeRetreat = resolveRoomCollision(enemy, retreatX, retreatY);
        enemy.x = safeRetreat.x;
        enemy.y = safeRetreat.y;
      }
      enemy.movePhase += dt * (enemy.speed / 18);
      continue;
    }

    const navigationTarget = getEnemyNavigationTarget(enemy);
    const dx = navigationTarget.x - enemy.x;
    const dy = navigationTarget.y - enemy.y;
    const len = Math.hypot(dx, dy) || 1;
    const dirX = dx / len;
    const dirY = dy / len;

    enemy.movePhase += dt * (enemy.speed / 24);

    const weave = enemy.type === 'crawler' ? 75 : enemy.type === 'arcaneOrb' ? 52 : 24;
    const sideX = -dirY * Math.sin(enemy.movePhase) * weave;
    const sideY = dirX * Math.sin(enemy.movePhase) * weave;
    const nextX = enemy.x + (dirX * enemy.speed + sideX) * dt;
    const nextY = enemy.y + (dirY * enemy.speed + sideY) * dt;
    if (state.boss && enemy.bossMinion) {
      enemy.x = clamp(nextX, state.bossArena.x + enemy.radius, state.bossArena.x + state.bossArena.w - enemy.radius);
      enemy.y = clamp(nextY, state.bossArena.y + enemy.radius, state.bossArena.y + state.bossArena.h - enemy.radius);
    } else {
      const safe = resolveRoomCollision(enemy, nextX, nextY);
      enemy.x = safe.x;
      enemy.y = safe.y;
    }

    const nearbyHelper = [...player.protectors, ...player.openers]
      .filter((helper) => distance(enemy, helper) < enemy.radius + helper.radius + 24)
      .sort((a, b) => distance(enemy, a) - distance(enemy, b))[0] || null;
    const helperInRange = Boolean(nearbyHelper);
    const playerInRange = distance(enemy, player) < enemy.radius + player.radius + 24;
    if (helperInRange || playerInRange) {
      if (enemy.attackTimer <= 0) {
        enemy.attackTimer = enemy.type === 'runner' || enemy.type === 'crawler' ? 0.55 : enemy.type === 'reaper' ? 1.15 : 0.85;
        enemy.lunge = 1;
        const victim = helperInRange ? nearbyHelper : player;
        const attackDx = victim.x - enemy.x;
        const attackDy = victim.y - enemy.y;
        const attackDistance = Math.hypot(attackDx, attackDy) || 1;
        const lungeX = enemy.x + (attackDx / attackDistance) * Math.min(14, attackDistance);
        const lungeY = enemy.y + (attackDy / attackDistance) * Math.min(14, attackDistance);
        if (state.boss && enemy.bossMinion) {
          enemy.x = clamp(lungeX, state.bossArena.x + enemy.radius, state.bossArena.x + state.bossArena.w - enemy.radius);
          enemy.y = clamp(lungeY, state.bossArena.y + enemy.radius, state.bossArena.y + state.bossArena.h - enemy.radius);
        } else {
          const safeLunge = resolveRoomCollision(enemy, lungeX, lungeY);
          enemy.x = safeLunge.x;
          enemy.y = safeLunge.y;
        }
        enemy.retreatTimer = 0.34;
        enemy.retreatFromX = victim.x;
        enemy.retreatFromY = victim.y;
        const damageLanded = applyCombatDamage(victim, enemy.damage, enemy);
        state.shake = Math.max(state.shake, 5);
        spawnBurst(victim.x, victim.y, 7, damageLanded ? '#f87171' : '#67e8f9', 75);
        if (victim !== player && victim.health <= 0) {
          spawnBurst(victim.x, victim.y, 18, '#60a5fa', 110);
          if (victim.kind === 'opener') {
            player.openers = player.openers.filter((opener) => opener !== victim);
            setMessage('Your Scout was defeated after three hits.');
          } else {
            player.protectors = player.protectors.filter((protector) => protector !== victim);
            setMessage('Your protector was defeated.');
          }
        }
      }
    }
  }

  separateOverlappingEnemies();

  for (const enemy of state.enemies) {
    if (enemy.dead && enemy.deathTimer <= 0 && enemy.specialEnemy && enemy.specialRoom?.locked) {
      enemy.specialRoom.locked = false;
      enemy.specialRoom.specialEnemy = null;
      setMessage('Special enemy defeated! Every door is open again.');
    }
  }

  state.enemies = state.enemies.filter((enemy) => !enemy.dead || enemy.deathTimer > 0);

  if (state.enemies.length === 0 && !state.boss && !state.roomCleared) {
    state.roomCleared = true;
    state.bossArenaOpen = false;
    startBossTeleport();
  }

}

// Assigns protector priorities and drives interception or boss attack runs.
function updateProtectors(dt) {
  if (player.protectors.length === 0) return;
  for (let protectorIndex = 0; protectorIndex < player.protectors.length; protectorIndex += 1) {
  const protector = player.protectors[protectorIndex];

  protector.maxHealth = player.maxHealth;
  protector.health = Math.min(protector.health, protector.maxHealth);
  protector.maxEnergy = protector.maxEnergy || 100;
  protector.energy = clamp((protector.energy ?? protector.maxEnergy) + 12 * dt, 0, protector.maxEnergy);
  protector.attackCooldown = Math.max(0, protector.attackCooldown - dt);
  protector.attackPoseTimer = Math.max(0, (protector.attackPoseTimer || 0) - dt);
  protector.retreatTimer = Math.max(0, (protector.retreatTimer || 0) - dt);

  const livingEnemies = state.enemies.filter((enemy) => !enemy.dead);
  const possibleTargets = livingEnemies.filter((enemy) => distance(protector, enemy) <= 850);

  const mustProtectPlayer = player.health < player.maxHealth * 0.5;
  let target = state.boss && state.boss.health > 0 ? state.boss : null;
  if (!target && mustProtectPlayer && livingEnemies.length > 0) {
    target = livingEnemies.reduce((closest, enemy) => (
      distance(player, enemy) < distance(player, closest) ? enemy : closest
    ), livingEnemies[0]);
  } else if (!target && possibleTargets.length > 0) {
    target = possibleTargets.reduce((strongest, enemy) => {
      const strength = enemy.maxHealth + enemy.damage * 6;
      const strongestScore = strongest.maxHealth + strongest.damage * 6;
      return strength > strongestScore ? enemy : strongest;
    });
  }
  protector.target = target;
  if (target && Math.abs(target.x - protector.x) > 2) {
    protector.facingX = target.x - protector.x;
  }

  if (protector.retreatTimer > 0 && protector.retreatFromX != null) {
    const retreatDx = protector.x - protector.retreatFromX;
    const retreatDy = protector.y - protector.retreatFromY;
    const retreatDistance = Math.hypot(retreatDx, retreatDy) || 1;
    const nextX = protector.x + (retreatDx / retreatDistance) * player.speed * 1.45 * dt;
    const nextY = protector.y + (retreatDy / retreatDistance) * player.speed * 1.45 * dt;
    if (state.boss) {
      protector.x = clamp(nextX, state.bossArena.x + protector.radius, state.bossArena.x + state.bossArena.w - protector.radius);
      protector.y = clamp(nextY, state.bossArena.y + protector.radius, state.bossArena.y + state.bossArena.h - protector.radius);
    } else {
      const safe = resolveRoomCollision(protector, nextX, nextY);
      protector.x = safe.x;
      protector.y = safe.y;
    }
    continue;
  }

  const destination = state.boss && target === state.boss
      ? target
    : target
      ? getProtectorNavigationTarget(protector, target)
      : {
      x: player.x + Math.cos(protectorIndex * 1.9) * 46,
      y: player.y + Math.sin(protectorIndex * 1.9) * 46,
    };
  const dx = destination.x - protector.x;
  const dy = destination.y - protector.y;
  const targetDistance = Math.hypot(dx, dy) || 1;
  const stopDistance = target
    ? protector.radius + (target.radius || 16)
    : 12;

  if (targetDistance > stopDistance) {
    const speed = player.speed * (target ? 1.15 : 1.35);
    const nextX = protector.x + (dx / targetDistance) * speed * dt;
    const nextY = protector.y + (dy / targetDistance) * speed * dt;
    if (state.boss) {
      protector.x = clamp(nextX, state.bossArena.x + protector.radius, state.bossArena.x + state.bossArena.w - protector.radius);
      protector.y = clamp(nextY, state.bossArena.y + protector.radius, state.bossArena.y + state.bossArena.h - protector.radius);
    } else {
      const safe = resolveRoomCollision(protector, nextX, nextY);
      protector.x = safe.x;
      protector.y = safe.y;
    }
  }

  const touchingTarget = target && distance(protector, target) <= protector.radius + (target.radius || 16);
  const attackEnergyCost = 18;
  if (touchingTarget && protector.attackCooldown <= 0 && protector.energy >= attackEnergyCost) {
    protector.attackCooldown = 0.62;
    protector.energy -= attackEnergyCost;
    protector.attackPose = Math.random() < 0.5 ? 'paw' : 'bite';
    protector.attackPoseTimer = 0.3;
    const lungeDx = target.x - protector.x;
    const lungeDy = target.y - protector.y;
    const lungeDistance = Math.hypot(lungeDx, lungeDy) || 1;
    protector.x += (lungeDx / lungeDistance) * 12;
    protector.y += (lungeDy / lungeDistance) * 12;
    protector.retreatTimer = 0.3;
    protector.retreatFromX = target.x;
    protector.retreatFromY = target.y;
    const damage = 18 + player.weaponLevel * 4;
    target.health -= damage;
    if (target !== state.boss) target.aggro = true;
    if ('hitFlash' in target) target.hitFlash = 0.18;
    spawnBurst(target.x, target.y, 7, '#60a5fa', 85);
    if (target.health <= 0 && target !== state.boss) {
      awardEnemyScore(target);
      target.dead = true;
      target.deathTimer = 0.55;
      spawnBurst(target.x, target.y, 14, '#60a5fa', 120);
    }
  }
  }
}

// Opens one crate and grants all of its stored rewards.
function openCrate(crate) {
  if (crate.isOpen) return;
  crate.openProgress = 2;
  crate.isOpen = true;
  crate.rewards.forEach(applyLoot);
  showLootHighlight(crate.rewards);
}

// Sends each Opener scurrying to the nearest closed crate until it has opened four.
function updateOpeners(dt) {
  for (const opener of player.openers) {
    opener.openCooldown = Math.max(0, opener.openCooldown - dt);
    opener.scurryPhase = (opener.scurryPhase || 0) + dt * (opener.isMoving ? 18 : 4);
    if ((opener.showcaseTimer || 0) > 0) {
      opener.showcaseTimer = Math.max(0, opener.showcaseTimer - dt);
      opener.isMoving = false;
      opener.target = null;
      continue;
    }
    const closedCrates = state.crates.filter((crate) => (
      !crate.isOpen && !getContainingRoom(crate)?.locked
    ));
    if (closedCrates.length === 0) {
      opener.target = null;
      opener.isMoving = false;
      continue;
    }
    const target = closedCrates.reduce((nearest, crate) => (
      distance(opener, crate) < distance(opener, nearest) ? crate : nearest
    ), closedCrates[0]);
    opener.target = target;
    if (Math.abs(target.x - opener.x) > 2) opener.facingX = target.x - opener.x;

    const destination = getProtectorNavigationTarget(opener, target);
    const dx = destination.x - opener.x;
    const dy = destination.y - opener.y;
    const destinationDistance = Math.hypot(dx, dy) || 1;
    const stopDistance = opener.radius + target.radius + 8;
    if (distance(opener, target) > stopDistance) {
      opener.isMoving = true;
      const scurrySpeed = player.speed * 1.3;
      const nextX = opener.x + (dx / destinationDistance) * scurrySpeed * dt;
      const nextY = opener.y + (dy / destinationDistance) * scurrySpeed * dt;
      const safe = resolveRoomCollision(opener, nextX, nextY);
      opener.x = safe.x;
      opener.y = safe.y;
    } else {
      opener.isMoving = false;
      if (opener.openCooldown <= 0) {
        openCrate(target);
        opener.cratesOpened += 1;
        opener.openCooldown = 0.5;
        spawnBurst(target.x, target.y, 10, '#f59e0b', 90);
      }
    }
  }

  const completed = player.openers.filter((opener) => opener.cratesOpened >= 4);
  for (const opener of completed) {
    spawnBurst(opener.x, opener.y, 18, '#fbbf24', 120);
    setMessage('A Scout finished opening four crates and headed home.');
  }
  player.openers = player.openers.filter((opener) => opener.health > 0 && opener.cratesOpened < 4);
}

// Advances particle motion and discards expired effects.
function updateParticles(dt) {
  state.particles = state.particles.filter((particle) => {
    particle.age += dt;
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vx *= 0.98;
    particle.vy *= 0.98;
    return particle.age < particle.life;
  });
}

// Tracks hold-to-open progress and dispenses completed crate rewards.
function updateCrates(dt) {
  for (const crate of state.crates) {
    if (crate.isOpen) continue;
    if (distance(player, crate) < 64) {
      if (keys.has('f')) {
        crate.openProgress += dt;
        if (crate.openProgress >= 2) {
          openCrate(crate);
          setMessage('Crate opened! Four items collected.');
        }
      } else {
        crate.openProgress = Math.max(0, crate.openProgress - dt * 0.8);
      }
    } else {
      crate.openProgress = Math.max(0, crate.openProgress - dt * 0.8);
    }
  }
}

// Adds an ice reinforcement at an opening or half-health phase.
function summonIceMinion(boss, phase) {
  const angle = phase === 'opening' ? -0.7 : 2.4;
  const health = 78 + boss.tier * 11;
  state.enemies.push({
    x: clamp(boss.x + Math.cos(angle) * 125, state.bossArena.x + 19, state.bossArena.x + state.bossArena.w - 19),
    y: clamp(boss.y + Math.sin(angle) * 125, state.bossArena.y + 19, state.bossArena.y + state.bossArena.h - 19),
    radius: 19,
    speed: 108,
    health,
    maxHealth: health,
    damage: 9 + boss.tier * 1.4,
    type: 'iceMinion',
    bossMinion: true,
    cooldown: 0,
    aiTimer: 0,
    attackTimer: 0.6,
    hitFlash: 0,
    lunge: 0,
    movePhase: Math.random() * Math.PI * 2,
    elite: false,
  });
  spawnBurst(boss.x, boss.y, 30, '#dbeafe', 165);
  setMessage(phase === 'opening'
    ? 'Iceboss enters with an Ice Minion!'
    : 'Iceboss reached half health and summoned another Ice Minion!');
}

// Adds one increasingly frequent reinforcement for the Wood Boss.
function summonWoodMinion(boss) {
  const angle = Math.random() * Math.PI * 2;
  const health = 65 + boss.tier * 9;
  state.enemies.push({
    x: clamp(boss.x + Math.cos(angle) * 115, state.bossArena.x + 18, state.bossArena.x + state.bossArena.w - 18),
    y: clamp(boss.y + Math.sin(angle) * 115, state.bossArena.y + 18, state.bossArena.y + state.bossArena.h - 18),
    radius: 18,
    speed: 112,
    health,
    maxHealth: health,
    damage: 8 + boss.tier * 1.3,
    type: 'woodMinion',
    bossMinion: true,
    cooldown: 0,
    aiTimer: 0,
    attackTimer: 0.5 + Math.random() * 0.4,
    hitFlash: 0,
    lunge: 0,
    movePhase: Math.random() * Math.PI * 2,
    elite: false,
  });
  spawnBurst(boss.x, boss.y, 30, '#a3e635', 170);
  setMessage(`Woodboss lost ${Math.round((1 - boss.nextWoodMinionThreshold) * 100)}% health and summoned a Woodminion!`);
}

// Raises one of the Skeleton Warlord's health-threshold orbs.
function summonSkeletonOrb(boss) {
  const summonNumber = boss.skeletonOrbsSummoned + 1;
  const angle = (summonNumber - 1) * (Math.PI / 2) + Math.PI / 4;
  const health = 58 + boss.tier * 9;
  state.enemies.push({
    x: clamp(boss.x + Math.cos(angle) * 150, state.bossArena.x + 20, state.bossArena.x + state.bossArena.w - 20),
    y: clamp(boss.y + Math.sin(angle) * 150, state.bossArena.y + 20, state.bossArena.y + state.bossArena.h - 20),
    radius: 18,
    speed: 112,
    health,
    maxHealth: health,
    damage: 9 + boss.tier * 1.35,
    type: 'skeletonOrb',
    bossMinion: true,
    cooldown: 0,
    aiTimer: 0,
    attackTimer: 0.55,
    hitFlash: 0,
    lunge: 0,
    movePhase: Math.random() * Math.PI * 2,
    elite: false,
  });
  boss.skeletonOrbsSummoned = summonNumber;
  spawnBurst(boss.x, boss.y, 34, '#67e8f9', 185);
  setMessage(`The Skeleton Warlord raises Skeleton Orb ${summonNumber} of 4!`);
}

// Advances the Sand Tyrant's scripted minion-and-orb summon sequence.
function summonSandServant(boss) {
  const summonPlan = ['skeletonOrb', 'skeletonMinion', 'skeletonOrb', 'skeletonOrb', 'skeletonMinion', 'skeletonOrb', 'skeletonMinion', 'skeletonOrb'];
  const type = summonPlan[boss.sandSummonsCompleted];
  if (!type) return;
  const angle = boss.sandSummonsCompleted * (Math.PI * 0.75);
  const isOrb = type === 'skeletonOrb';
  const health = (isOrb ? 62 : 82) + boss.tier * 9;
  state.enemies.push({
    x: clamp(boss.x + Math.cos(angle) * 155, state.bossArena.x + 20, state.bossArena.x + state.bossArena.w - 20),
    y: clamp(boss.y + Math.sin(angle) * 155, state.bossArena.y + 20, state.bossArena.y + state.bossArena.h - 20),
    radius: isOrb ? 18 : 20,
    speed: isOrb ? 114 : 102,
    health,
    maxHealth: health,
    damage: (isOrb ? 9 : 11) + boss.tier * 1.3,
    type,
    bossMinion: true,
    cooldown: 0,
    aiTimer: 0,
    attackTimer: 0.55,
    hitFlash: 0,
    lunge: 0,
    movePhase: Math.random() * Math.PI * 2,
    elite: false,
  });
  boss.sandSummonsCompleted += 1;
  spawnBurst(boss.x, boss.y, 32, '#fbbf24', 180);
  setMessage(`The Sand Tyrant summons ${isOrb ? 'a Skeleton Orb' : 'a Skeleton Minion'}!`);
}

// Runs boss phases, animated attacks, damage, retreat, summons, and death.
function updateBoss(dt) {
  if (!state.boss) return;
  const boss = state.boss;
  if (player.health <= 0) {
    die();
    return;
  }
  if (boss.health <= 0) {
    if (!boss.defeated) {
      rewardBossLoot();
      boss.health = 0;
      boss.defeated = true;
      boss.deathTimer = 1.8;
      boss.deathBurstTimer = 0;
      boss.attackWindup = 0;
      spawnBurst(boss.x, boss.y, 90, '#fef3c7', 260);
      state.shake = 18;
      setMessage('Boss defeated!');
    }
    boss.deathTimer = Math.max(0, boss.deathTimer - dt);
    boss.deathBurstTimer -= dt;
    if (boss.deathBurstTimer <= 0 && boss.deathTimer > 0) {
      boss.deathBurstTimer = 0.12;
      const burstColor = boss.variant === 'lavaGolem' ? '#fb923c'
        : boss.variant === 'oceanBoss' ? '#67e8f9'
          : boss.variant === 'iceBoss' ? '#dbeafe'
            : boss.variant === 'lushGolem' ? '#86efac'
              : boss.variant === 'skeletonWarlord' ? '#67e8f9'
              : '#fef3c7';
      spawnBurst(boss.x, boss.y, 12, burstColor, 210);
    }
    if (boss.deathTimer === 0) startWaveTeleport();
    return;
  }
  if (boss.variant === 'iceBoss' && !boss.halfHealthMinionSummoned && boss.health <= boss.maxHealth * 0.5) {
    boss.halfHealthMinionSummoned = true;
    summonIceMinion(boss, 'halfHealth');
  }
  if (boss.variant === 'woodBoss') {
    while (boss.nextWoodMinionThreshold >= 0.1 && boss.health <= boss.maxHealth * boss.nextWoodMinionThreshold) {
      summonWoodMinion(boss);
      boss.nextWoodMinionThreshold = Math.round((boss.nextWoodMinionThreshold - 0.1) * 10) / 10;
    }
  }
  if (boss.variant === 'skeletonWarlord') {
    while (boss.skeletonOrbsSummoned < 4 && boss.health <= boss.maxHealth * boss.nextSkeletonOrbThreshold) {
      summonSkeletonOrb(boss);
      boss.nextSkeletonOrbThreshold = Math.round((boss.nextSkeletonOrbThreshold - 0.2) * 10) / 10;
    }
  }
  if (boss.variant === 'sandBoss') {
    while (boss.sandSummonsCompleted < 8 && boss.health <= boss.maxHealth * boss.nextSandSummonThreshold) {
      summonSandServant(boss);
      boss.nextSandSummonThreshold = Math.round((boss.nextSandSummonThreshold - 0.1) * 10) / 10;
    }
  }

  // Bosses also choose the nearest hero-side target, so helpers can be attacked.
  boss.attackTarget = player;
  const attackTarget = getEnemyPreferredTarget(boss);
  const dx = attackTarget.x - boss.x;
  const dy = attackTarget.y - boss.y;
  const len = Math.hypot(dx, dy) || 1;
  const dirX = dx / len;
  const dirY = dy / len;
  boss.movePhase += dt * 5;
  boss.hitFlash = Math.max(0, boss.hitFlash - dt);
  boss.attackPulse = Math.max(0, boss.attackPulse - dt * 4);
  boss.retreatTimer = Math.max(0, (boss.retreatTimer || 0) - dt);
  boss.retreatDelay = Math.max(0, (boss.retreatDelay || 0) - dt);
  boss.cooldown -= dt;

  if (boss.lungeTimer > 0) {
    boss.lungeTimer = Math.max(0, boss.lungeTimer - dt);
    boss.attackPulse = Math.max(boss.attackPulse, 0.65);
    const lungeSpeed = boss.lungeRemaining / Math.max(dt, boss.lungeTimer + dt);
    const lungeStep = Math.min(boss.lungeRemaining, lungeSpeed * dt);
    boss.x = clamp(boss.x + boss.lungeDirX * lungeStep, state.bossArena.x + boss.radius, state.bossArena.x + state.bossArena.w - boss.radius);
    boss.y = clamp(boss.y + boss.lungeDirY * lungeStep, state.bossArena.y + boss.radius, state.bossArena.y + state.bossArena.h - boss.radius);
    boss.lungeRemaining = Math.max(0, boss.lungeRemaining - lungeStep);
    if (boss.lungeTimer === 0 || boss.lungeRemaining === 0) {
      if (distance(boss, attackTarget) < boss.radius + attackTarget.radius + boss.lungeHitRange) {
        applyCombatDamage(attackTarget, boss.damage * boss.lungeDamageScale, boss);
        spawnBurst(attackTarget.x, attackTarget.y, boss.lungeIsDash ? 14 : 20, boss.lungeEffectColor, 155);
      }
      spawnBurst(boss.x, boss.y, boss.lungeIsDash ? 24 : 10, boss.lungeEffectColor, 180);
      state.shake = boss.lungeIsDash ? 10 : 16;
      boss.retreatTimer = boss.lungeIsDash ? 0.3 : 0.36;
      boss.retreatDelay = 0.1;
      boss.retreatFromX = attackTarget.x;
      boss.retreatFromY = attackTarget.y;
    }
    return;
  } else if (boss.attackWindup > 0) {
    boss.attackWindup -= dt;
    if (boss.attackWindup <= 0) {
      boss.attackPulse = 1;
      const effectColor = boss.variant === 'lavaGolem' ? '#f97316' : boss.variant === 'lushGolem' ? '#4ade80' : boss.variant === 'oceanBoss' ? '#38bdf8' : boss.variant === 'iceBoss' ? '#bfdbfe' : boss.variant === 'skeletonWarlord' ? '#67e8f9' : boss.variant === 'sandBoss' ? '#fbbf24' : boss.variant === 'woodBoss' ? '#84cc16' : '#fb7185';

      if (boss.attackType.includes('Dash')) {
        const dashDistance = boss.attackType === 'flameDash' ? 260 : boss.attackType === 'waterDash' ? 240 : boss.attackType === 'frostDash' ? 225 : 190 + boss.tier * 8;
        if (Math.abs(dirX) > 0.05) boss.facingX = dirX;
        boss.lungeDuration = 0.24;
        boss.lungeTimer = boss.lungeDuration;
        boss.lungeRemaining = dashDistance;
        boss.lungeDirX = dirX;
        boss.lungeDirY = dirY;
        boss.lungeDamageScale = boss.attackType === 'flameDash' ? 1.3 : boss.attackType === 'waterDash' ? 1.2 : boss.attackType === 'frostDash' ? 1.25 : 1.1;
        boss.lungeHitRange = 65;
        boss.lungeEffectColor = effectColor;
        boss.lungeIsDash = true;
      } else if (boss.attackType === 'healingBloom') {
        boss.health = clamp(boss.health + boss.maxHealth * 0.07, 0, boss.maxHealth);
        spawnBurst(boss.x, boss.y, 42, '#86efac', 155);
        state.shake = 5;
      } else if (boss.attackType === 'thornRing' || boss.attackType === 'eruption' || boss.attackType === 'tidalWave' || boss.attackType === 'blizzard' || boss.attackType === 'nova') {
        const attackRadius = boss.attackType === 'thornRing' ? 165 : boss.attackType === 'eruption' ? 285 : boss.attackType === 'tidalWave' ? 250 : boss.attackType === 'blizzard' ? 265 : 210 + boss.tier * 8;
        const damageScale = boss.attackType === 'thornRing' ? 0.65 : boss.attackType === 'eruption' ? 1.05 : boss.attackType === 'tidalWave' ? 0.9 : boss.attackType === 'blizzard' ? 0.95 : 0.75;
        for (const victim of [player, ...player.protectors, ...player.openers]) {
          if (distance(boss, victim) <= attackRadius) applyCombatDamage(victim, boss.damage * damageScale, boss);
        }
        spawnBurst(boss.x, boss.y, 38, effectColor, 230);
        state.shake = 14;
      } else {
        const lungeDistance = Math.min(58, Math.max(0, len - boss.radius - attackTarget.radius + 18));
        boss.lungeDuration = 0.2;
        boss.lungeTimer = boss.lungeDuration;
        boss.lungeRemaining = lungeDistance;
        boss.lungeDirX = dirX;
        boss.lungeDirY = dirY;
        boss.lungeDamageScale = boss.attackType === 'hammerSlam' ? 1.55 : boss.attackType === 'rootSlam' ? 1.05 : boss.attackType === 'tideSlam' ? 1.35 : boss.attackType === 'iceSlam' ? 1.4 : boss.attackType === 'boneSlam' ? 1.5 : boss.attackType === 'sandSlam' ? 1.48 : boss.attackType === 'woodSlam' ? 1.45 : 1.25;
        boss.lungeHitRange = 75;
        boss.lungeEffectColor = effectColor;
        boss.lungeIsDash = false;
      }

      const defeatedProtectors = player.protectors.filter((protector) => protector.health <= 0);
      if (defeatedProtectors.length > 0) setMessage(`${defeatedProtectors.length} protector${defeatedProtectors.length === 1 ? '' : 's'} defeated by the boss.`);
      player.protectors = player.protectors.filter((protector) => protector.health > 0);
      const defeatedOpeners = player.openers.filter((opener) => opener.health <= 0);
      if (defeatedOpeners.length > 0) setMessage(`${defeatedOpeners.length} Scout${defeatedOpeners.length === 1 ? '' : 's'} defeated after three hits.`);
      player.openers = player.openers.filter((opener) => opener.health > 0);
      if (attackTarget.health <= 0) boss.attackTarget = null;
    }
  } else {
    const recovering = boss.retreatTimer > 0;
    const retreating = recovering && boss.retreatDelay <= 0 && boss.retreatFromX != null;
    const retreatDx = retreating ? boss.x - boss.retreatFromX : 0;
    const retreatDy = retreating ? boss.y - boss.retreatFromY : 0;
    const retreatLength = Math.hypot(retreatDx, retreatDy) || 1;
    const orbit = retreating ? 0 : Math.sin(boss.movePhase * 0.7) * 36;
    const speed = retreating ? 145 : boss.cooldown < 0.35 ? 125 : 72;
    const closingDistance = boss.radius + attackTarget.radius + 34;
    const movementX = retreating
      ? (retreatDx / retreatLength) * speed
      : !recovering && len > closingDistance
        ? dirX * speed - dirY * orbit
        : !recovering ? -dirY * 58 : 0;
    const movementY = retreating
      ? (retreatDy / retreatLength) * speed
      : !recovering && len > closingDistance
        ? dirY * speed + dirX * orbit
        : !recovering ? dirX * 58 : 0;
    if (Math.abs(movementX) > 3) boss.facingX = movementX;
    boss.x = clamp(boss.x + movementX * dt, state.bossArena.x + boss.radius, state.bossArena.x + state.bossArena.w - boss.radius);
    boss.y = clamp(boss.y + movementY * dt, state.bossArena.y + boss.radius, state.bossArena.y + state.bossArena.h - boss.radius);
    if (!recovering && boss.cooldown <= 0 && len < 430) {
      const attackRoll = Math.random();
      if (boss.variant === 'lushGolem') {
        boss.attackType = attackRoll < 0.5 ? 'rootSlam' : attackRoll < 0.84 ? 'thornRing' : 'healingBloom';
      } else if (boss.variant === 'lavaGolem') {
        boss.attackType = attackRoll < 0.42 ? 'hammerSlam' : attackRoll < 0.73 ? 'flameDash' : 'eruption';
      } else if (boss.variant === 'oceanBoss') {
        boss.attackType = attackRoll < 0.4 ? 'tideSlam' : attackRoll < 0.7 ? 'waterDash' : 'tidalWave';
      } else if (boss.variant === 'iceBoss') {
        boss.attackType = attackRoll < 0.4 ? 'iceSlam' : attackRoll < 0.7 ? 'frostDash' : 'blizzard';
      } else if (boss.variant === 'skeletonWarlord') {
        boss.attackType = attackRoll < 0.5 ? 'boneSlam' : attackRoll < 0.76 ? 'Dash' : 'nova';
      } else if (boss.variant === 'sandBoss') {
        boss.attackType = attackRoll < 0.48 ? 'sandSlam' : attackRoll < 0.72 ? 'Dash' : 'nova';
      } else if (boss.variant === 'woodBoss') {
        boss.attackType = attackRoll < 0.62 ? 'woodSlam' : 'thornRing';
      } else {
        boss.attackType = attackRoll < 0.36 ? 'slam' : attackRoll < 0.68 ? 'Dash' : 'nova';
      }
      const radialAttack = ['thornRing', 'healingBloom', 'eruption', 'tidalWave', 'blizzard', 'nova'].includes(boss.attackType);
      boss.attackWindupTotal = radialAttack ? 0.9 : boss.attackType.includes('Dash') ? 0.58 : 0.46;
      boss.attackWindup = boss.attackWindupTotal;
      boss.cooldown = Math.max(0.85, (radialAttack ? 2.15 : 1.55) - boss.tier * 0.07);
    }
  }
}

// Converts internal camelCase item IDs into readable labels.
function formatLootName(item) {
  if (item === 'openerShard') return 'Scout Shard';
  return item.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
}

// Summarizes a crate's rewards in the temporary loot notification.
function showLootHighlight(items) {
  const totals = new Map();
  for (const item of items) totals.set(item, (totals.get(item) || 0) + 1);
  const summary = [...totals.entries()]
    .map(([item, amount]) => `${formatLootName(item)}${amount > 1 ? ` ×${amount}` : ''}`)
    .join('<br>');
  lootHighlight.innerHTML = `<small>Crate loot</small>${summary}`;
  lootHighlight.classList.remove('hidden');
  if (lootHighlightTimer) window.clearTimeout(lootHighlightTimer);
  lootHighlightTimer = window.setTimeout(() => lootHighlight.classList.add('hidden'), 3000);
}

// Freezes or resumes active gameplay and clears held keys.
function togglePause() {
  if (!state.started || state.isGameOver) return;
  state.paused = !state.paused;
  keys.clear();
  pauseOverlay.classList.toggle('hidden', !state.paused);
}

// Finalizes the run, records its rank, and prepares the delayed death screen.
function die() {
  if (state.developerMode) {
    player.health = Math.max(1, player.health);
    return;
  }
  if (state.isGameOver) return;
  state.isGameOver = true;
  state.started = false;
  state.paused = false;
  pauseOverlay.classList.add('hidden');
  keys.clear();
  player.health = 0;
  const deathCause = state.lastDeathCause || 'wounds sustained in the dungeon';
  const leaderboardRank = recordCompletedRun(state.score, state.wave, state.bossDefeated);
  overlayTitle.textContent = 'You Died';
  deathCauseText.textContent = `by ${deathCause}`;
  deathCauseText.classList.remove('hidden');
  overlayText.textContent = `${currentHeroName} scored ${state.score.toLocaleString()} points, reached wave ${state.wave}, and defeated ${state.bossDefeated} boss${state.bossDefeated === 1 ? '' : 'es'}.${leaderboardRank ? ` Hall of Heroes rank: #${leaderboardRank}.` : ''}`;
  heroProverb.textContent = getRandomFallenHeroProverb();
  heroProverb.classList.add('death-proverb');
  overlay.querySelector('.main-menu-card').classList.add('death-menu-card');
  heroNameEditor.classList.add('hidden');
  changeHeroButton.classList.add('hidden');
  openHighScoresButton.classList.add('hidden');
  controlsGrid.style.display = 'none';
  openArmoryButton.disabled = true;
  openArmoryButton.tabIndex = -1;
  openArmoryButton.classList.add('portrait-only');
  openArmoryButton.setAttribute('aria-label', 'Fallen hero');
  startButton.style.display = '';
  startButton.textContent = 'Press any key to continue';
  startButton.classList.add('death-continue-prompt');
  overlay.classList.remove('hidden');
  messageBox.classList.add('hidden');
  deathScreenReady = false;
  window.setTimeout(() => {
    deathScreenReady = true;
  }, 1500);
}

// Restores all run-only state while preserving unlocks and leaderboard data.
function resetRun() {
  state.wave = 1;
  state.score = 0;
  state.maxRooms = 8;
  state.enemies = [];
  state.crates = [];
  state.boss = null;
  state.rooms = [];
  state.challengeRooms = [];
  state.roomCount = 0;
  state.roomCleared = false;
  state.bossDefeated = 0;
  state.isGameOver = false;
  state.started = false;
  state.paused = false;
  pauseOverlay.classList.add('hidden');
  lootHighlight.classList.add('hidden');
  if (lootHighlightTimer) window.clearTimeout(lootHighlightTimer);
  state.bossArenaOpen = false;
  state.particles = [];
  state.shake = 0;
  state.closeZoom = false;
  state.teleportTimer = 0;
  state.teleportMoved = false;
  state.teleportTarget = null;
  state.challengePromptOpen = false;
  state.pendingChallengeRoom = null;
  state.foodWarningShown = false;
  state.waterWarningShown = false;
  state.lastDeathCause = null;
  state.threatSplashOpen = false;
  state.gearChoiceOpen = false;
  state.pendingWaveSplash = false;
  challengeOverlay.classList.add('hidden');
  waveSplash.classList.add('hidden');

  player.x = 180;
  player.y = 180;
  applyEquippedArmor(true);
  player.food = 100;
  player.hydration = 100;
  player.stamina = player.maxStamina;
  player.sprintExhausted = false;
  player.damageInvulnerability = 0;
  player.attackCooldown = 0;
  player.attackDuration = 0;
  player.facing = { x: 1, y: 0 };
  player.inventory = { food: 0, water: 0, bandage: 0, protectorShard: 0, openerShard: 0, shieldShard: 0 };
  player.shieldActive = false;
  player.shieldTimer = 0;
  player.protectors = [];
  player.openers = [];
  player.weaponLevel = 1;

  createRooms();
  placePlayerInFirstRoom();
  spawnEnemiesForWave();
  messageBox.classList.add('hidden');
}

// Returns from a finished run while preserving the current hero and equipment.
function showMainMenu() {
  resetRun();
  showRandomHeroProverb();
  overlayTitle.textContent = 'Endless Dungeon';
  deathCauseText.classList.add('hidden');
  deathCauseText.textContent = '';
  overlayText.textContent = 'Explore rooms, open crates, survive waves, and defeat the boss.';
  heroProverb.classList.remove('death-proverb');
  overlay.querySelector('.main-menu-card').classList.remove('death-menu-card');
  heroNameEditor.classList.remove('hidden');
  changeHeroButton.classList.remove('hidden');
  openHighScoresButton.classList.remove('hidden');
  controlsGrid.style.display = 'grid';
  openArmoryButton.disabled = false;
  openArmoryButton.tabIndex = 0;
  openArmoryButton.classList.remove('portrait-only');
  openArmoryButton.setAttribute('aria-label', 'Customize hero');
  startButton.style.display = '';
  startButton.textContent = 'Press any key to begin';
  startButton.classList.remove('death-continue-prompt');
  overlay.classList.remove('hidden');
}

// Draws an image edge-to-edge with centered cropping and high-quality scaling.
function drawImageCover(image, x, y, width, height) {
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const targetRatio = width / height;
  let sourceX = 0;
  let sourceY = 0;
  let sourceW = image.naturalWidth;
  let sourceH = image.naturalHeight;
  if (imageRatio > targetRatio) {
    sourceW = sourceH * targetRatio;
    sourceX = (image.naturalWidth - sourceW) / 2;
  } else {
    sourceH = sourceW / targetRatio;
    sourceY = (image.naturalHeight - sourceH) / 2;
  }
  ctx.drawImage(image, sourceX, sourceY, sourceW, sourceH, x, y, width, height);
}

// Renders room artwork, walls, doorway cuts, and challenge lock borders.
function drawRoom(room) {
  const theme = room.theme;
  ctx.fillStyle = theme.room;
  ctx.fillRect(room.x, room.y, room.w, room.h);
  const roomArtwork = theme.name === 'Verdant Ruins'
    ? art.lushCave
    : theme.name === 'Sunken Shrine'
      ? art.cyanRoom
    : theme.name === 'Cinder Keep'
      ? art.lavaRoom
      : theme.name === 'Moonwood'
        ? art.waterRoom
        : theme.name === 'Bony Ruins'
          ? art.skeletonRoom
        : null;
  if (roomArtwork?.complete && roomArtwork.naturalWidth > 0) {
    const interiorX = room.x + wallThickness;
    const interiorY = room.y + wallThickness;
    const interiorW = room.w - wallThickness * 2;
    const interiorH = room.h - wallThickness * 2;
    drawImageCover(roomArtwork, interiorX, interiorY, interiorW, interiorH);
    ctx.fillStyle = theme.name === 'Cinder Keep'
      ? 'rgba(54, 12, 4, 0.12)'
      : theme.name === 'Sunken Shrine' || theme.name === 'Moonwood'
        ? 'rgba(4, 24, 54, 0.12)'
        : 'rgba(14, 40, 20, 0.18)';
    ctx.fillRect(interiorX, interiorY, interiorW, interiorH);
  }

  ctx.fillStyle = theme.wall;
  ctx.fillRect(room.x, room.y, room.w, wallThickness);
  ctx.fillRect(room.x, room.y + room.h - wallThickness, room.w, wallThickness);
  ctx.fillRect(room.x, room.y, wallThickness, room.h);
  ctx.fillRect(room.x + room.w - wallThickness, room.y, wallThickness, room.h);

  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 2;
  ctx.strokeRect(room.x + 16, room.y + 16, room.w - 32, room.h - 32);

  // Cut visible holes only where a connected room exists.
  ctx.fillStyle = theme.room;
  if (!room.locked && room.doorways.top) ctx.fillRect(room.x + room.w / 2 - doorWidth / 2, room.y, doorWidth, wallThickness);
  if (!room.locked && room.doorways.bottom) ctx.fillRect(room.x + room.w / 2 - doorWidth / 2, room.y + room.h - wallThickness, doorWidth, wallThickness);
  if (!room.locked && room.doorways.left) ctx.fillRect(room.x, room.y + room.h / 2 - doorWidth / 2, wallThickness, doorWidth);
  if (!room.locked && room.doorways.right) ctx.fillRect(room.x + room.w - wallThickness, room.y + room.h / 2 - doorWidth / 2, wallThickness, doorWidth);

  if (room.locked) {
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 5;
    ctx.strokeRect(room.x + wallThickness / 2, room.y + wallThickness / 2, room.w - wallThickness, room.h - wallThickness);
  }
}

// Renders crate state, shadow, and hold-to-open progress.
function drawCrate(crate) {
  ctx.save();
  ctx.translate(crate.x, crate.y);
  ctx.shadowColor = crate.isOpen ? '#8b5cf6' : '#f59e0b';
  ctx.shadowBlur = 12;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
  ctx.beginPath();
  ctx.ellipse(0, 18, 25, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  const crateArtwork = crate.isOpen ? art.openCrate : art.crate;
  if (crateArtwork.complete && crateArtwork.naturalWidth > 0) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(crateArtwork, -30, -30, 60, 60);
  } else {
    ctx.fillStyle = crate.isOpen ? '#7c3aed' : '#8b5e34';
    ctx.fillRect(-18, -12, 36, 26);
  }

  if (!crate.isOpen && crate.openProgress > 0) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(-24, 22, 48, 6);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(-24, 22, 48 * (crate.openProgress / 2), 6);
  }
  ctx.restore();
}

// Draws one anchored actor sprite with facing, motion, damage, and health state.
function drawActorSprite({
  x,
  y,
  health,
  maxHealth,
  variant = 'walker',
  scale = 1,
  stride = 0,
  bob = 0,
  facingX = 1,
  elite = false,
  squashX = 1,
  squashY = 1,
  hitFlash = 0,
  deathProgress = 0,
}) {
  const spriteKey = variant === 'hero' && state.retroMode && !state.boss
    ? 'retroHero'
    : variant === 'hero'
      ? 'hero'
      : variant;
  const sprite = art[spriteKey];

  if (!sprite || !sprite.complete || sprite.naturalWidth === 0) {
    return;
  }

  ctx.save();
  ctx.translate(x, y + bob);
  ctx.globalAlpha = 1 - deathProgress;
  ctx.rotate(stride * 0.004 + deathProgress * Math.PI * 1.6);
  const leftFacingEnemyArt = ['skeletonMinion', 'skeletonTank', 'skeletonSpider'];
  const enemyArtFacesLeft = leftFacingEnemyArt.includes(variant);
  const facingScale = variant === 'hero'
    ? (facingX < 0 ? 1 : -1)
    : enemyArtFacesLeft
      ? (facingX < 0 ? 1 : -1)
      : (facingX < 0 ? -1 : 1);
  const deathScale = 1 - deathProgress * 0.82;
  ctx.scale(facingScale * scale * squashX * deathScale, scale * squashY * deathScale);
  ctx.shadowColor = elite ? '#f59e0b' : 'rgba(10, 18, 30, 0.65)';
  ctx.shadowBlur = elite ? 24 : 14;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
  ctx.beginPath();
  ctx.ellipse(0, 30, 24, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  if (hitFlash > 0) {
    ctx.filter = 'brightness(2.5) saturate(0)';
  }
  ctx.drawImage(sprite, -42, -62, 84, 100);
  ctx.restore();

  if (deathProgress === 0) {
    const healthBarY = variant === 'hero' ? y - 76 : y - 48;
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(x - 18, healthBarY, 36, 4);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(x - 18, healthBarY, 36 * (health / maxHealth), 4);
  }
}

// Maps an enemy to themed artwork and animation deformation before drawing.
function drawEnemy(enemy) {
  const deathProgress = enemy.dead
    ? 1 - Math.max(0, enemy.deathTimer) / 0.55
    : 0;
  const motion = Math.sin(enemy.movePhase || 0);
  const stride = motion * (enemy.type === 'crawler' ? 15 : 9);
  const floating = enemy.type === 'wraith' || enemy.type === 'arcaneOrb' || enemy.type === 'skeletonOrb';
  const bob = Math.abs(motion) * (floating ? 8 : 3) - enemy.lunge * 5;
  const squashX = 1 + Math.abs(motion) * 0.07 - enemy.lunge * 0.14;
  const squashY = 1 - Math.abs(motion) * 0.06 + enemy.lunge * 0.18;
  const fastWeakTypes = ['runner', 'crawler', 'assassin', 'wraith', 'arcaneOrb'];
  const slowTypes = ['walker', 'brute', 'spitter', 'sentinel', 'burrower', 'reaper'];
  const themedRole = fastWeakTypes.includes(enemy.type) ? 'Minion' : slowTypes.includes(enemy.type) ? 'Tank' : null;
  let themedVariant = enemy.type;

  if (themedRole) {
    if (world.themeIndex === 2) themedVariant = `lava${themedRole}`;
    if (world.themeIndex === 0) themedVariant = `lush${themedRole}`;
    if (world.themeIndex === 1 || world.themeIndex === 3) themedVariant = `ocean${themedRole}`;
    if (world.themeIndex === 5) themedVariant = themedRole === 'Minion' ? 'skeletonMinion' : 'skeletonTank';
  }
  if (world.themeIndex === 5 && enemy.type === 'crawler') themedVariant = 'skeletonSpider';
  if (world.themeIndex === 5 && enemy.type === 'arcaneOrb') themedVariant = 'skeletonOrb';
  if (enemy.type === 'skeletonOrb') themedVariant = 'skeletonOrb';

  drawActorSprite({
    x: enemy.x,
    y: enemy.y,
    bodyColor: enemy.elite ? '#fb923c' : '#dc2626',
    accentColor: enemy.elite ? '#fef08a' : '#fca5a5',
    weaponColor: enemy.elite ? '#f59e0b' : '#f8fafc',
    glowColor: enemy.elite ? '#fdba74' : '#fb7185',
    headColor: '#e2e8f0',
    outlineColor: '#f8fafc',
    stride,
    bob,
    variant: themedVariant,
    health: enemy.health,
    maxHealth: enemy.maxHealth,
    elite: enemy.elite,
    facingX: player.x - enemy.x,
    squashX,
    squashY,
    hitFlash: enemy.hitFlash,
    deathProgress,
  });
}

// Counter-flips an embedded boss health bar so it always reads left to right.
function drawBossHealthBar(boss, x, y, width, height, startColor, endColor = startColor) {
  ctx.save();
  ctx.scale(boss.facingX < 0 ? 1 : -1, 1);
  ctx.filter = 'none';
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(2, 6, 23, 0.92)';
  ctx.fillRect(x, y, width, height);
  const healthGradient = ctx.createLinearGradient(x, 0, x + width, 0);
  healthGradient.addColorStop(0, startColor);
  healthGradient.addColorStop(1, endColor);
  ctx.fillStyle = healthGradient;
  ctx.fillRect(x, y, width * clamp(boss.health / boss.maxHealth, 0, 1), height);
  ctx.restore();
}

// Renders boss-specific art with wind-up, lunge, hit, and death animation.
function drawBoss(boss) {
  const walk = Math.sin(boss.movePhase || 0);
  const windup = boss.attackWindup > 0 ? boss.attackWindup / (boss.attackWindupTotal || 0.38) : 0;
  const charge = boss.attackWindup > 0 ? 1 - windup : 0;
  // Attack poses belong to active gameplay only; boss introductions stay neutral.
  const isOverheadPose = boss.attackWindup > 0 && !state.threatSplashOpen;
  const overheadLift = isOverheadPose ? charge * 7 : 0;
  const pulse = boss.attackPulse || 0;
  const isSlamAttack = boss.attackType.toLowerCase().includes('slam');
  const isDashAttack = boss.attackType.toLowerCase().includes('dash');
  const lungeMotion = boss.lungeTimer > 0
    ? Math.sin((1 - boss.lungeTimer / (boss.lungeDuration || 0.2)) * Math.PI)
    : 0;
  const slamCrouch = isSlamAttack ? charge : 0;
  const dashLean = isDashAttack ? Math.max(charge, lungeMotion) : lungeMotion * 0.35;
  const novaCharge = !isSlamAttack && !isDashAttack ? charge : 0;
  const deathProgress = boss.defeated
    ? 1 - Math.max(0, boss.deathTimer) / 1.8
    : 0;
  ctx.save();
  ctx.translate(boss.x, boss.y + Math.abs(walk) * 4 - pulse * 7 + slamCrouch * 9 - novaCharge * 5 - overheadLift);
  ctx.globalAlpha = 1 - deathProgress;
  ctx.rotate(walk * 0.035 + dashLean * 0.16 + deathProgress * Math.PI * 2.5);
  const deathScale = 1 - deathProgress * 0.9;
  const bossVisualScale = 1.4;
  ctx.scale(
    (boss.facingX < 0 ? 1 : -1) * deathScale * bossVisualScale,
    (1 + pulse * 0.025 + slamCrouch * 0.055 + novaCharge * 0.035) * deathScale * bossVisualScale,
  );
  ctx.shadowColor = '#f87171';
  ctx.shadowBlur = 24 + windup * 24;
  if (boss.hitFlash > 0) ctx.filter = 'brightness(2.4) saturate(0)';

  if (boss.attackWindup > 0) {
    const warningColor = boss.variant === 'lavaGolem' ? '249, 115, 22' : boss.variant === 'lushGolem' ? '74, 222, 128' : boss.variant === 'oceanBoss' ? '56, 189, 248' : boss.variant === 'iceBoss' ? '191, 219, 254' : boss.variant === 'skeletonWarlord' ? '103, 232, 249' : boss.variant === 'sandBoss' ? '251, 191, 36' : boss.variant === 'woodBoss' ? '132, 204, 22' : '251, 113, 133';
    ctx.save();
    ctx.filter = 'none';
    if (isSlamAttack) {
      ctx.strokeStyle = `rgba(${warningColor}, ${0.35 + charge * 0.65})`;
      ctx.lineWidth = 5 + charge * 5;
      ctx.beginPath();
      ctx.arc(48, 18, 24 + charge * 22, -1.2, 1.2);
      ctx.stroke();
    } else if (isDashAttack) {
      ctx.strokeStyle = `rgba(${warningColor}, ${0.3 + charge * 0.7})`;
      ctx.lineWidth = 10 + charge * 10;
      ctx.setLineDash([18, 12]);
      ctx.beginPath();
      ctx.moveTo(45, 5);
      ctx.lineTo(230, 5);
      ctx.stroke();
    } else if (boss.attackType === 'healingBloom') {
      ctx.strokeStyle = `rgba(134, 239, 172, ${0.4 + charge * 0.6})`;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(-28, 0);
      ctx.lineTo(28, 0);
      ctx.moveTo(0, -28);
      ctx.lineTo(0, 28);
      ctx.stroke();
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 42 + charge * 48, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.strokeStyle = `rgba(${warningColor}, ${0.3 + charge * 0.7})`;
      ctx.lineWidth = 5;
      if (boss.attackType === 'thornRing') ctx.setLineDash([8, 7]);
      ctx.beginPath();
      const visualRadius = boss.attackType === 'eruption' ? 65 + charge * 220 : 55 + charge * 165;
      ctx.arc(0, 12, visualRadius, 0, Math.PI * 2);
      ctx.stroke();
      if (boss.attackType === 'eruption') {
        ctx.beginPath();
        ctx.arc(0, 12, visualRadius * 0.66, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = `rgba(${warningColor}, ${0.06 + charge * 0.1})`;
      ctx.fill();
    }
    ctx.restore();
  }

  if (boss.variant === 'lushGolem' && art.lushGolem.complete && art.lushGolem.naturalWidth > 0) {
    const sprite = isOverheadPose && art.lushGolemOverhead.complete && art.lushGolemOverhead.naturalWidth > 0
      ? art.lushGolemOverhead : art.lushGolem;
    ctx.shadowColor = '#4ade80';
    ctx.shadowBlur = 22 + windup * 30;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sprite, -92, -78, 184, 148);

    drawBossHealthBar(boss, -48, -86, 96, 8, '#4ade80');

    if (windup > 0) {
      ctx.strokeStyle = `rgba(74, 222, 128, ${0.35 + windup * 0.65})`;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(42, 4, 16 + windup * 25, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  if (boss.variant === 'lavaGolem' && art.lavaGolem.complete && art.lavaGolem.naturalWidth > 0) {
    const sprite = isOverheadPose && art.lavaGolemOverhead.complete && art.lavaGolemOverhead.naturalWidth > 0
      ? art.lavaGolemOverhead : art.lavaGolem;
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 28 + windup * 38 + pulse * 18;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sprite, -94, -82, 188, 154);

    drawBossHealthBar(boss, -50, -90, 100, 8, '#dc2626', '#f97316');

    if (windup > 0) {
      ctx.strokeStyle = `rgba(249, 115, 22, ${0.4 + windup * 0.6})`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(-44, 22, 18 + windup * 30, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = `rgba(251, 146, 60, ${windup * 0.35})`;
      ctx.beginPath();
      ctx.arc(-44, 22, 10 + windup * 20, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    return;
  }

  if (boss.variant === 'oceanBoss' && art.oceanBoss.complete && art.oceanBoss.naturalWidth > 0) {
    const sprite = isOverheadPose && art.oceanBossOverhead.complete && art.oceanBossOverhead.naturalWidth > 0
      ? art.oceanBossOverhead : art.oceanBoss;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 30 + windup * 42 + pulse * 20;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sprite, -98, -86, 196, 158);

    drawBossHealthBar(boss, -52, -94, 104, 8, '#0369a1', '#67e8f9');

    if (windup > 0) {
      ctx.strokeStyle = `rgba(103, 232, 249, ${0.4 + windup * 0.6})`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 12, 28 + windup * 42, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  if (boss.variant === 'iceBoss' && art.iceBoss.complete && art.iceBoss.naturalWidth > 0) {
    const sprite = isOverheadPose && art.iceBossOverhead.complete && art.iceBossOverhead.naturalWidth > 0
      ? art.iceBossOverhead : art.iceBoss;
    ctx.shadowColor = '#bfdbfe';
    ctx.shadowBlur = 32 + windup * 44 + pulse * 20;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sprite, -100, -88, 200, 160);

    drawBossHealthBar(boss, -53, -96, 106, 8, '#2563eb', '#e0f2fe');

    if (windup > 0) {
      ctx.strokeStyle = `rgba(219, 234, 254, ${0.4 + windup * 0.6})`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 10, 30 + windup * 44, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  if (boss.variant === 'skeletonWarlord' && art.skeletonBoss.complete && art.skeletonBoss.naturalWidth > 0) {
    const sprite = isOverheadPose && art.skeletonBossOverhead.complete && art.skeletonBossOverhead.naturalWidth > 0
      ? art.skeletonBossOverhead : art.skeletonBoss;
    ctx.shadowColor = '#67e8f9';
    ctx.shadowBlur = 34 + windup * 44 + pulse * 22;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sprite, -104, -92, 208, 168);

    drawBossHealthBar(boss, -55, -100, 110, 8, '#a16207', '#67e8f9');

    if (windup > 0) {
      ctx.strokeStyle = `rgba(103, 232, 249, ${0.4 + windup * 0.6})`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 8, 31 + windup * 46, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  if (boss.variant === 'sandBoss' && art.sandBoss.complete && art.sandBoss.naturalWidth > 0) {
    const sprite = isOverheadPose && art.sandBossOverhead.complete && art.sandBossOverhead.naturalWidth > 0
      ? art.sandBossOverhead : art.sandBoss;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 34 + windup * 44 + pulse * 22;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sprite, -106, -94, 212, 172);
    drawBossHealthBar(boss, -56, -102, 112, 8, '#92400e', '#fde68a');
    ctx.restore();
    return;
  }

  if (boss.variant === 'woodBoss' && art.woodBoss.complete && art.woodBoss.naturalWidth > 0) {
    const sprite = isOverheadPose && art.woodBossOverhead.complete && art.woodBossOverhead.naturalWidth > 0
      ? art.woodBossOverhead : art.woodBoss;
    ctx.shadowColor = '#84cc16';
    ctx.shadowBlur = 32 + windup * 40 + pulse * 20;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sprite, -102, -90, 204, 164);

    drawBossHealthBar(boss, -54, -98, 108, 8, '#3f6212', '#bef264');

    if (windup > 0) {
      ctx.strokeStyle = `rgba(190, 242, 100, ${0.4 + windup * 0.6})`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 10, 30 + windup * 46, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  ctx.fillStyle = 'rgba(2, 6, 23, 0.55)';
  ctx.beginPath();
  ctx.ellipse(0, 30, 48, 15, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#7f1d1d';
  ctx.beginPath();
  ctx.ellipse(0, 4, 30, 30, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(-16, -18);
  ctx.lineTo(0, -44);
  ctx.lineTo(16, -18);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.arc(0, -10, 16, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.ellipse(0, 5, 20, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-18, 6);
  ctx.lineTo(-40 - walk * 4, 20 + Math.abs(walk) * 5);
  ctx.moveTo(18, 6);
  ctx.lineTo(40 + windup * 18 + pulse * 22, 20 - windup * 24);
  ctx.stroke();

  drawBossHealthBar(boss, -36, -54, 72, 6, '#22c55e');

  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-7, -14);
  ctx.lineTo(7, -14);
  ctx.stroke();

  if (windup > 0) {
    ctx.strokeStyle = `rgba(251, 113, 133, ${0.35 + windup * 0.6})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(38, -5, 12 + windup * 22, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

// Renders normal or Retro hero art, weapon animation, shield, and teleport fade.
function drawPlayer() {
  const isMoving = keys.has('w') || keys.has('a') || keys.has('s') || keys.has('d');
  const stride = isMoving ? Math.sin(performance.now() * 0.012) * 7 : 0;
  const bob = isMoving
    ? Math.sin(performance.now() * 0.012) * 2
    : Math.sin(performance.now() * 0.003) * 0.2;
  const teleportProgress = state.teleportTimer > 0
    ? 1 - state.teleportTimer / state.teleportDuration
    : 0;
  const teleportVisibility = state.teleportTimer > 0
    ? Math.abs(teleportProgress - 0.5) * 2
    : 1;

  ctx.save();
  ctx.globalAlpha = teleportVisibility;
  drawActorSprite({
    x: player.x,
    y: player.y,
    bodyColor: '#2563eb',
    accentColor: '#93c5fd',
    weaponColor: '#f8fafc',
    glowColor: '#60a5fa',
    headColor: '#e2e8f0',
    outlineColor: '#60a5fa',
    stride,
    bob,
    variant: 'hero',
    health: player.health,
    maxHealth: player.maxHealth,
    facingX: player.facing.x,
    scale: 0.55 + teleportVisibility * 0.45,
  });

  const equippedSwordArt = equippedWeaponId === 'diamondSword'
    ? art.diamondSword
    : equippedWeaponId === 'broadSword'
      ? art.broadSword
      : equippedWeaponId === 'emeraldSword'
        ? art.emeraldSword
        : equippedWeaponId === 'lavaBlade'
          ? art.lavaBlade
          : art.broadSword;
  if ((!state.retroMode || state.boss) && equippedSwordArt?.complete && equippedSwordArt.naturalWidth > 0) {
    // Mirror the hand anchor with the selected character artwork so the
    // equipped weapon remains gripped while facing either direction.
    const heroFacingScale = player.facing.x < 0 ? 1 : -1;
    const facingDirection = player.facing.x < 0 ? -1 : 1;
    const handOffsetX = -18 * heroFacingScale;
    ctx.save();
    ctx.translate(player.x + handOffsetX, player.y - 7 + bob);
    if (player.attackDuration > 0) {
      const attackProgress = 1 - player.attackDuration / 0.24;
      const attackAngle = Math.atan2(player.facing.y, player.facing.x);
      const swordAngle = attackAngle - 58 * Math.PI / 180 + attackProgress * 116 * Math.PI / 180;
      ctx.rotate(swordAngle - Math.PI / 2);
    } else {
      // Weapon art points down from its handle; rest the blade upward and
      // slightly toward the direction the hero is facing.
      ctx.rotate(-facingDirection * (Math.PI - 0.32));
    }
    ctx.shadowColor = equippedWeaponId === 'emeraldSword'
      ? '#34d399'
      : equippedWeaponId === 'lavaBlade'
        ? '#f97316'
      : equippedWeaponId === 'diamondSword'
        ? '#bfdbfe'
        : '#fca5a5';
    ctx.shadowBlur = 14;
    // The source handle occupies the top tenth of each weapon image.
    ctx.drawImage(equippedSwordArt, -12, -9, 24, 86);
    ctx.restore();
  }

  if (player.shieldActive) {
    const pulse = Math.sin(performance.now() * 0.012) * 2;
    ctx.save();
    ctx.translate(player.x, player.y - 5);
    ctx.fillStyle = 'rgba(34, 211, 238, 0.12)';
    ctx.strokeStyle = '#67e8f9';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#22d3ee';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(0, 0, 36 + pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

// Draws expanding energy rings around the hero during teleportation.
function drawTeleportEffect() {
  if (state.teleportTimer <= 0) return;
  const progress = 1 - state.teleportTimer / state.teleportDuration;
  const phase = progress < 0.5 ? progress * 2 : (1 - progress) * 2;
  const ringRadius = 34 + phase * 105;

  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.globalCompositeOperation = 'lighter';
  ctx.shadowColor = '#67e8f9';
  ctx.shadowBlur = 28;
  for (let ring = 0; ring < 3; ring += 1) {
    ctx.strokeStyle = `rgba(103, 232, 249, ${0.75 - ring * 0.18})`;
    ctx.lineWidth = 6 - ring;
    ctx.beginPath();
    ctx.ellipse(0, 0, ringRadius + ring * 18, 18 + phase * 22, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = `rgba(165, 243, 252, ${0.18 + phase * 0.3})`;
  ctx.beginPath();
  ctx.arc(0, 0, 28 + phase * 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Draws every Protector with neutral, paw-swipe, or bite artwork.
function drawGuardians() {
  for (const protector of player.protectors) {
    if (state.retroMode) {
      ctx.save();
      ctx.translate(protector.x, protector.y);
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.arc(0, 0, protector.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(protector.x - 22, protector.y - 30, 44, 5);
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(protector.x - 22, protector.y - 30, 44 * (protector.health / protector.maxHealth), 5);
      continue;
    }
    const attackArt = protector.attackPose === 'bite' ? art.protectorBite : art.protectorPawSwipe;
    const sprite = protector.attackPoseTimer > 0 ? attackArt : art.protector;
    ctx.save();
    ctx.translate(protector.x, protector.y);
    ctx.scale(protector.facingX < 0 ? 1 : -1, 1);
    ctx.shadowColor = '#60a5fa';
    ctx.shadowBlur = 16;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (sprite === art.protector) {
      ctx.drawImage(sprite, -39, -34, 78, 74);
    } else {
      ctx.drawImage(sprite, -42, -36, 84, 78);
    }
    ctx.restore();

    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(protector.x - 20, protector.y - 43, 40, 5);
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(protector.x - 20, protector.y - 43, 40 * (protector.health / protector.maxHealth), 5);
  }
}

// Draws crate-opening helpers and their three-hit health bars.
function drawOpeners() {
  for (const opener of player.openers) {
    const scurry = opener.isMoving ? Math.sin(opener.scurryPhase || 0) : 0;
    const bob = opener.isMoving ? -Math.abs(scurry) * 5 : 0;
    const showcaseProgress = opener.showcaseDuration
      ? 1 - (opener.showcaseTimer || 0) / opener.showcaseDuration
      : 1;
    const isShowcasing = (opener.showcaseTimer || 0) > 0;
    const showcaseScale = isShowcasing
      ? 0.55 + Math.min(1, showcaseProgress / 0.42) * 0.45
        + Math.sin(showcaseProgress * Math.PI * 3) * 0.06
      : 1;
    const danceX = isShowcasing ? Math.sin(showcaseProgress * Math.PI * 4) * 9 : 0;
    const danceY = isShowcasing ? -Math.abs(Math.sin(showcaseProgress * Math.PI * 5)) * 5 : 0;
    ctx.save();
    ctx.translate(opener.x + danceX, opener.y + bob + danceY);
    ctx.rotate(opener.isMoving ? scurry * 0.055 : 0);
    ctx.scale((opener.facingX < 0 ? 1 : -1) * showcaseScale, showcaseScale);
    ctx.shadowBlur = 0;
    if (state.retroMode) {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(0, 0, opener.radius, 0, Math.PI * 2);
      ctx.fill();
    } else if (art.opener.complete && art.opener.naturalWidth > 0) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      // Crop the source header so its AI label never enters the game.
      ctx.drawImage(art.opener, 0, 55, 1024, 950, -38, -48, 76, 86);
    }
    ctx.restore();

    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(opener.x - 20, opener.y - 55, 40, 5);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(opener.x - 20, opener.y - 55, 40 * (opener.health / opener.maxHealth), 5);
  }
}

// Draws all active particles using their remaining lifetime as opacity.
function drawParticles() {
  for (const particle of state.particles) {
    ctx.globalAlpha = 1 - particle.age / particle.life;
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
  }
  ctx.globalAlpha = 1;
}

// Composes the camera, dungeon or arena, actors, effects, and attack arc.
function drawBackground() {
  const theme = world.themes[world.themeIndex] || world.themes[0];
  const baseCameraZoom = Math.min(canvas.width / 1280, canvas.height / 720);
  const overviewZoom = clamp(
    baseCameraZoom + (state.boss ? 0.25 : 0),
    1.25,
    state.boss ? 2 : 1.75,
  );
  const cameraZoom = state.closeZoom
    ? Math.min(overviewZoom * 1.5, state.boss ? 3.1 : 2.8)
    : overviewZoom;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = state.boss ? '#000' : theme.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const shakeX = state.started ? (Math.random() - 0.5) * state.shake : 0;
  const shakeY = state.started ? (Math.random() - 0.5) * state.shake : 0;

  ctx.save();
  ctx.translate(shakeX, shakeY);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(cameraZoom, cameraZoom);
  ctx.translate(-player.x, -player.y);

  // Plain corridors make the route between neighboring rooms unmistakable.
  for (const room of state.boss ? [] : state.rooms) {
    ctx.fillStyle = room.theme.room;
    if (room.doorways.right) {
      const neighbor = state.rooms.find((candidate) => candidate.gx === room.gx + 1 && candidate.gy === room.gy);
      if (neighbor) {
        const corridorX = room.x + room.w - wallThickness;
        ctx.fillRect(
          corridorX,
          room.y + room.h / 2 - doorWidth / 2,
          neighbor.x + wallThickness - corridorX,
          doorWidth,
        );
      }
    }
    if (room.doorways.bottom) {
      const neighbor = state.rooms.find((candidate) => candidate.gx === room.gx && candidate.gy === room.gy + 1);
      if (neighbor) {
        const corridorY = room.y + room.h - wallThickness;
        ctx.fillRect(
          room.x + room.w / 2 - doorWidth / 2,
          corridorY,
          doorWidth,
          neighbor.y + wallThickness - corridorY,
        );
      }
    }
  }

  for (const room of state.boss ? [] : state.rooms) {
    drawRoom(room);
  }

  if (state.boss) {
    ctx.fillStyle = '#2f2f47';
    ctx.fillRect(state.bossArena.x, state.bossArena.y, state.bossArena.w, state.bossArena.h);
    const arenaArt = state.boss.variant === 'lushGolem'
      ? art.lushArena
      : state.boss.variant === 'lavaGolem'
        ? art.lavaArena
        : state.boss.variant === 'oceanBoss'
          ? art.waterArena
          : state.boss.variant === 'iceBoss'
            ? art.iceArena
            : state.boss.variant === 'skeletonWarlord'
              ? art.skeletonArena
              : state.boss.variant === 'sandBoss'
                ? art.sandArena
            : null;
    if (arenaArt?.complete && arenaArt.naturalWidth > 0) {
      drawImageCover(arenaArt, state.bossArena.x, state.bossArena.y, state.bossArena.w, state.bossArena.h);
      ctx.fillStyle = 'rgba(2, 6, 23, 0.16)';
      ctx.fillRect(state.bossArena.x, state.bossArena.y, state.bossArena.w, state.bossArena.h);
    }
  }

  if (state.bossArenaOpen) {
    ctx.fillStyle = '#f5d0fe';
    ctx.fillRect(world.width / 2 - 40, world.height / 2 - 60, 80, 120);
  }

  if (!state.boss) for (const crate of state.crates) drawCrate(crate);
  for (const enemy of state.enemies) {
    if (!state.boss || enemy.bossMinion) drawEnemy(enemy);
  }
  if (state.boss) drawBoss(state.boss);
  drawGuardians();
  drawOpeners();
  drawTeleportEffect();
  drawPlayer();
  drawParticles();

  if (player.attackDuration > 0) {
    const attackAngle = Math.atan2(player.facing.y, player.facing.x);
    const attackProgress = 1 - player.attackDuration / 0.24;
    const attackRadius = 68 + player.weaponLevel * 8 + getEquippedWeapon().reach;
    const sweepAngle = attackAngle - 58 * Math.PI / 180 + attackProgress * 116 * Math.PI / 180;
    ctx.save();
    ctx.shadowColor = '#67e8f9';
    ctx.shadowBlur = 22;
    ctx.fillStyle = `rgba(103, 232, 249, ${0.2 * (1 - attackProgress)})`;
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.arc(
      player.x,
      player.y,
      attackRadius,
      attackAngle - 58 * Math.PI / 180,
      sweepAngle,
    );
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 - attackProgress * 0.35})`;
    ctx.lineWidth = 10 - attackProgress * 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(
      player.x,
      player.y,
      attackRadius,
      sweepAngle - 34 * Math.PI / 180,
      sweepAngle,
    );
    ctx.stroke();

    ctx.strokeStyle = `rgba(34, 211, 238, ${0.8 - attackProgress * 0.45})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(
      player.x,
      player.y,
      attackRadius - 10,
      sweepAngle - 42 * Math.PI / 180,
      sweepAngle,
    );
    ctx.stroke();

    ctx.strokeStyle = '#fef3c7';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(
      player.x + Math.cos(sweepAngle) * 24,
      player.y + Math.sin(sweepAngle) * 24,
    );
    ctx.lineTo(
      player.x + Math.cos(sweepAngle) * attackRadius,
      player.y + Math.sin(sweepAngle) * attackRadius,
    );
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();

  if (state.teleportTimer > 0) {
    const progress = 1 - state.teleportTimer / state.teleportDuration;
    const flash = Math.max(0, 1 - Math.abs(progress - 0.5) * 7);
    if (flash > 0) {
      ctx.fillStyle = `rgba(207, 250, 254, ${flash * 0.72})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
}

// Synchronizes HUD values, developer fields, and low-resource warnings.
function drawUI() {
  hud.wave.textContent = String(state.wave);
  hud.score.textContent = state.score.toLocaleString();
  hud.health.textContent = `${Math.round(player.health)} / ${Math.round(player.maxHealth)}`;
  hud.food.textContent = Math.round(player.food);
  hud.hydration.textContent = Math.round(player.hydration);
  hud.stamina.textContent = Math.round(player.stamina);
  hud.bandage.textContent = String(player.inventory.bandage);
  hud.enemy.textContent = String(state.enemies.filter((enemy) => !enemy.dead).length + (state.boss ? 1 : 0));
  hud.protector.textContent = `${player.protectors.length} (${player.inventory.protectorShard} shards)`;
  hud.opener.textContent = `${player.openers.length} (${player.inventory.openerShard} shards)`;
  hud.shield.textContent = String(player.inventory.shieldShard);
  hud.theme.closest('.stat').classList.toggle('hidden', !state.developerMode);

  const updateResourceWarning = (element, value, lowAt, criticalAt) => {
    const card = element.closest('.stat');
    card.classList.toggle('resource-low', value <= lowAt && value > criticalAt);
    card.classList.toggle('resource-critical', value <= criticalAt);
  };
  updateResourceWarning(hud.health, player.health, player.maxHealth * 0.5, player.maxHealth * 0.25);
  updateResourceWarning(hud.food, player.food, 50, 25);
  updateResourceWarning(hud.hydration, player.hydration, 50, 25);
  updateResourceWarning(hud.stamina, player.stamina, 35, 15);
}

// Activates the legacy arena portal when that transition path is enabled.
function maybeBossPortal() {
  if (!state.bossArenaOpen) return;
  const portalX = world.width / 2 - 40;
  const portalY = world.height / 2 - 60;
  const inside = player.x > portalX && player.x < portalX + 80 && player.y > portalY && player.y < portalY + 120;
  if (inside) {
    state.bossArenaOpen = false;
    spawnBoss();
    state.shake = 12;
  }
}

// Leaves the menu and opens the first wave introduction.
function startGame() {
  state.started = true;
  state.paused = false;
  pauseOverlay.classList.add('hidden');
  overlay.classList.add('hidden');
  setMessage('Wave 1 begins. Explore the rooms, open crates, and survive.');
  showWaveSplash();
}

// Advances the appropriate game state, renders one frame, and schedules the next.
function loop(timestamp) {
  const dt = Math.min((timestamp - lastTime) / 1000, 0.03);
  lastTime = timestamp;

  if (state.started && !state.isGameOver && !state.paused && !state.challengePromptOpen && armoryOverlay.classList.contains('hidden')) {
    if (state.threatSplashOpen) {
      updateParticles(dt);
    } else if (state.teleportTimer > 0) {
      updateBossTeleport(dt);
      updateParticles(dt);
    } else {
      handleInput(dt);
      updateCrates(dt);
      maybeOpenChallengeRoom();
      updateEnemies(dt);
      updateProtectors(dt);
      updateOpeners(dt);
      updateBoss(dt);
      updateParticles(dt);
      maybeBossPortal();

      if (player.health <= 0) die();

      if (keys.has(' ')) tryAttack();
    }
  }

  if (state.shake > 0) {
    state.shake = Math.max(0, state.shake - dt * 18);
  }

  drawBackground();
  drawUI();
  requestAnimationFrame(loop);
}

acceptChallengeButton.addEventListener('click', () => resolveChallengeChoice(true));
declineChallengeButton.addEventListener('click', () => resolveChallengeChoice(false));
resumeGameButton.addEventListener('click', togglePause);
quitGameButton.addEventListener('click', () => {
  state.paused = false;
  state.started = false;
  pauseOverlay.classList.add('hidden');
  showMainMenu();
});
openArmoryButton.addEventListener('click', () => {
  renderArmory();
  armoryOverlay.classList.remove('hidden');
  unseenGear.clear();
  saveArmorCollection();
  updateGearNotification();
});
closeArmoryButton.addEventListener('click', () => armoryOverlay.classList.add('hidden'));
applyGearButton.addEventListener('click', applyPendingGearChoice);
cancelGearButton.addEventListener('click', closeGearPreview);
chooseMaleButton.addEventListener('click', () => chooseGender('male'));
chooseFemaleButton.addEventListener('click', () => chooseGender('female'));
heroNameInput.addEventListener('input', () => {
  const editedName = cleanHeroName(heroNameInput.value);
  if (editedName) {
    currentHeroName = editedName;
    saveLeaderboard();
  }
});
heroNameInput.addEventListener('blur', saveHeroName);
randomizeHeroNameButton.addEventListener('click', () => {
  currentHeroName = generateHeroName();
  heroNameInput.value = currentHeroName;
  saveLeaderboard();
});
changeHeroButton.addEventListener('click', () => {
  heroNameInput.blur();
  genderOverlay.classList.remove('hidden');
});
openHighScoresButton.addEventListener('click', () => {
  saveHeroName();
  renderHighScores();
  highScoresOverlay.classList.remove('hidden');
});
closeHighScoresButton.addEventListener('click', () => highScoresOverlay.classList.add('hidden'));

// Routes keyboard presses through overlays before active gameplay controls.
window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (event.target === heroNameInput) {
    if (key === 'enter') {
      event.preventDefault();
      heroNameInput.blur();
    }
    return;
  }
  if (!genderOverlay.classList.contains('hidden')) {
    event.preventDefault();
    return;
  }
  if (!highScoresOverlay.classList.contains('hidden')) {
    event.preventDefault();
    if (!event.repeat && (key === 'escape' || key === 'enter')) highScoresOverlay.classList.add('hidden');
    return;
  }
  if (!armoryOverlay.classList.contains('hidden')) {
    if (key === 'escape') {
      if (!gearPreview.classList.contains('hidden')) closeGearPreview();
      else armoryOverlay.classList.add('hidden');
    }
    event.preventDefault();
    return;
  }
  if (state.isGameOver && !overlay.classList.contains('hidden')) {
    event.preventDefault();
    if (deathScreenReady && !event.repeat) showMainMenu();
    return;
  }
  if (state.threatSplashOpen) {
    event.preventDefault();
    if (!event.repeat && state.gearChoiceOpen && key === 'c') {
      closeThreatSplash();
      renderArmory();
      armoryOverlay.classList.remove('hidden');
      unseenGear.clear();
      saveArmorCollection();
      updateGearNotification();
    } else if (!event.repeat) {
      closeThreatSplash();
    }
    return;
  }
  if (event.ctrlKey && event.shiftKey && key === 'd' && !event.repeat) {
    event.preventDefault();
    state.developerMode = !state.developerMode;
    if (state.developerMode) player.health = Math.max(1, player.health);
    setMessage(state.developerMode
      ? 'Developer mode activated: invincibility enabled.'
      : 'Developer mode disabled.');
    return;
  }
  if (state.challengePromptOpen) {
    if (key === 'enter' || key === 'escape') {
      event.preventDefault();
      if (!event.repeat) resolveChallengeChoice(key === 'enter');
    }
    return;
  }
  if (!state.started && !state.isGameOver && !overlay.classList.contains('hidden')) {
    event.preventDefault();
    if (!event.repeat) startGame();
    return;
  }
  if (key === 'escape') {
    event.preventDefault();
    togglePause();
    return;
  }
  if (state.paused) return;
  keys.add(key);
  if (key === 'l' && state.started && !event.repeat) {
    state.closeZoom = !state.closeZoom;
    setMessage(state.closeZoom ? 'Close-up view enabled.' : 'Overview enabled.');
  }
  if (key === 'f') {
    setMessage('Hold F for 2 seconds near a crate to open it.');
  }
  if (key === 'e' && state.started) createProtector();
  if (key === 't' && state.started && !event.repeat) createOpener();
  if (key === 'q' && state.started) useBandage();
  if (key === 'r' && state.started && !event.repeat) activateShield();
  if (event.code === 'Space') {
    event.preventDefault();
    tryAttack();
  }
});

// Releases held gameplay inputs when their keys are lifted.
window.addEventListener('keyup', (event) => {
  keys.delete(event.key.toLowerCase());
});

// Keeps the canvas backing size synchronized with the browser viewport.
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
createRooms();
placePlayerInFirstRoom();
spawnEnemiesForWave();
loadLeaderboard();
updateHighScoreDisplay();
renderHighScores();
showRandomHeroProverb();
applyEquippedArmor(true);
updateGearNotification();
requestAnimationFrame(loop);
