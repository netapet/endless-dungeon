const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('overlay');
const startButton = document.getElementById('startButton');
const overlayTitle = overlay.querySelector('h1');
const overlayText = overlay.querySelector('p');
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
const randomizeHeroNameButton = document.getElementById('randomizeHeroNameButton');
const openHighScoresButton = document.getElementById('openHighScoresButton');
const highScoresOverlay = document.getElementById('highScoresOverlay');
const highScoresList = document.getElementById('highScoresList');
const closeHighScoresButton = document.getElementById('closeHighScoresButton');

const armorSets = [
  { id: 'wayfarer', name: "Wayfarer's Resolve", boss: 0, portrait: 'assets/player/armor/male-wayfarer-portrait.png', combat: 'assets/player/armor/male-wayfarer-combat.png', femalePortrait: 'assets/player/armor/female-wayfarer-combat.png', femaleCombat: 'assets/player/armor/female-wayfarer-combat.png', defense: 0, health: 0, stamina: 0 },
  { id: 'leather', name: 'Thornhide Vanguard', boss: 1, portrait: 'assets/player/armor/male-leather-portrait.png', combat: 'assets/player/armor/male-leather-combat.png', femalePortrait: 'assets/player/armor/female-leather-combat.png', femaleCombat: 'assets/player/armor/female-leather-combat.png', defense: 8, health: 10, stamina: 5 },
  { id: 'lightPlate', name: 'Silverwind Harness', boss: 5, portrait: 'assets/player/armor/male-light-plate-portrait.png', combat: 'assets/player/armor/male-light-plate-combat.png', femalePortrait: 'assets/player/armor/female-light-plate-combat.png', femaleCombat: 'assets/player/armor/female-light-plate-combat.png', defense: 16, health: 20, stamina: 10 },
  { id: 'heavyPlate', name: 'Iron Bastion Plate', boss: 8, portrait: 'assets/player/armor/male-heavy-plate-portrait.png', combat: 'assets/player/armor/male-heavy-plate-combat.png', femalePortrait: 'assets/player/armor/female-heavy-plate-combat.png', femaleCombat: 'assets/player/armor/female-heavy-plate-combat.png', defense: 24, health: 35, stamina: 15 },
  { id: 'dragonPlate', name: 'Wyrmscale Eclipse', boss: 10, portrait: 'assets/player/armor/male-dragon-plate-portrait.png', combat: 'assets/player/armor/male-dragon-plate-combat.png', femalePortrait: 'assets/player/armor/female-dragon-plate-combat.png', femaleCombat: 'assets/player/armor/female-dragon-plate-combat.png', defense: 32, health: 50, stamina: 20 },
  { id: 'royalArmor', name: 'Crownward Regalia', boss: 20, portrait: 'assets/player/armor/male-royal-armor-portrait.png', combat: 'assets/player/armor/male-royal-armor-combat.png', femalePortrait: 'assets/player/armor/female-dragon-plate-combat.png', femaleCombat: 'assets/player/armor/female-dragon-plate-combat.png', defense: 40, health: 70, stamina: 25 },
  { id: 'worldforged', name: 'Worldforged Aegis', boss: 25, portrait: 'assets/player/armor/male-worldforged-portrait.png', combat: 'assets/player/armor/male-worldforged-combat.png', femalePortrait: 'assets/player/armor/female-dragon-plate-combat.png', femaleCombat: 'assets/player/armor/female-dragon-plate-combat.png', defense: 50, health: 100, stamina: 35 },
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
let selectedGender = null;
let pendingGearChoice = null;
try {
  window.localStorage.removeItem('endlessDungeonGender');
  window.localStorage.removeItem('endlessDungeonHeroName');
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

function getEquippedArmor() {
  return armorSets.find((armor) => armor.id === equippedArmorId) || armorSets[0];
}

function getEquippedWeapon() {
  return weaponSets.find((weapon) => weapon.id === equippedWeaponId) || starterWeapon;
}

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

function updateGearNotification() {
  gearNotification.classList.toggle('hidden', unseenGear.size === 0);
}

function closeGearPreview() {
  pendingGearChoice = null;
  gearPreview.classList.add('hidden');
}

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
    ? `<strong>Damage reduction: ${gear.defense}%</strong><strong>Maximum health: +${gear.health}</strong><strong>Maximum stamina: +${gear.stamina}</strong>`
    : `<strong>Attack damage: +${gear.damage}%</strong><strong>Attack reach: +${gear.reach}</strong>`;
  applyGearButton.textContent = 'Apply';
  gearPreview.classList.remove('hidden');
}

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
      <span>Defense ${armor.defense}% · Health +${armor.health} · Stamina +${armor.stamina}</span>
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
  menuHero.src = portraitArt;
  menuHero.alt = armor.name;
}

function chooseGender(gender) {
  selectedGender = gender;
  currentHeroName = generateHeroName();
  heroNameInput.value = currentHeroName;
  equippedArmorId = 'wayfarer';
  saveArmorCollection();
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

function getRandomHeroProverb() {
  return heroProverbs[Math.floor(Math.random() * heroProverbs.length)];
}

function getRandomFallenHeroProverb() {
  return fallenHeroProverbs[Math.floor(Math.random() * fallenHeroProverbs.length)];
}

function showRandomHeroProverb() {
  heroProverb.textContent = getRandomHeroProverb();
}

const hud = {
  wave: document.getElementById('waveValue'),
  health: document.getElementById('healthValue'),
  food: document.getElementById('foodValue'),
  hydration: document.getElementById('hydrationValue'),
  stamina: document.getElementById('staminaValue'),
  bandage: document.getElementById('bandageValue'),
  enemy: document.getElementById('enemyValue'),
  protector: document.getElementById('protectorValue'),
  shield: document.getElementById('shieldValue'),
  theme: document.getElementById('themeValue'),
};
const messageBox = document.getElementById('messageBox');
const lootHighlight = document.getElementById('lootHighlight');
const pauseOverlay = document.getElementById('pauseOverlay');
const challengeOverlay = document.getElementById('challengeOverlay');
const acceptChallengeButton = document.getElementById('acceptChallengeButton');
const declineChallengeButton = document.getElementById('declineChallengeButton');
const waveSplash = document.getElementById('waveSplash');
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

function generateHeroName() {
  const suggestions = selectedGender
    ? heroNameSuggestions[selectedGender]
    : [...heroNameSuggestions.male, ...heroNameSuggestions.female];
  const alternatives = suggestions.filter((name) => name !== currentHeroName);
  return alternatives[Math.floor(Math.random() * alternatives.length)] || suggestions[0];
}

function cleanHeroName(name) {
  return String(name || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 28);
}

function sortHighScores(scores) {
  return [...scores].sort((a, b) => (
    b.wave - a.wave
    || b.bosses - a.bosses
    || a.recordedAt - b.recordedAt
  ));
}

function saveLeaderboard() {
  try {
    window.localStorage.setItem(highScoresStorageKey, JSON.stringify(highScores));
  } catch (error) {
    // The leaderboard still works for this session if browser storage is unavailable.
  }
}

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

function updateHighScoreDisplay() {
  const bestWave = highScores[0]?.wave || 1;
  highScoreValue.textContent = String(bestWave);
  menuHighScoreValue.textContent = String(bestWave);
}

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
    details.textContent = `${entry.bosses} boss${entry.bosses === 1 ? '' : 'es'} defeated · ${date}`;
    hero.append(name, details);

    const wave = document.createElement('div');
    wave.className = 'high-score-wave';
    wave.textContent = `WAVE ${entry.wave}`;
    item.append(hero, wave);
    highScoresList.appendChild(item);
  });
}

function recordCompletedRun(wave, bosses) {
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: currentHeroName,
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
  lavaGolem: new Image(),
  oceanBoss: new Image(),
  iceBoss: new Image(),
  iceMinion: new Image(),
  lavaMinion: new Image(),
  lavaTank: new Image(),
  oceanMinion: new Image(),
  oceanTank: new Image(),
  lushMinion: new Image(),
  lushTank: new Image(),
  woodBoss: new Image(),
  woodMinion: new Image(),
  skeletonBoss: new Image(),
  skeletonMinion: new Image(),
  skeletonTank: new Image(),
  skeletonSpider: new Image(),
  skeletonOrb: new Image(),
  sandBoss: new Image(),
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
};

function preloadArt() {
  const sources = {
    roomRuins: 'assets/worlds/rooms/ruins.svg',
    hero: 'assets/player/armor/male-worldforged-portrait.png',
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
    lavaGolem: 'assets/enemies/bosses/lava-golem.png',
    oceanBoss: 'assets/enemies/bosses/ocean-boss.png',
    iceBoss: 'assets/enemies/bosses/ice-boss.png',
    iceMinion: 'assets/enemies/units/ice-minion.png',
    lavaMinion: 'assets/enemies/units/lava-minion.png',
    lavaTank: 'assets/enemies/units/lava-tank.png',
    oceanMinion: 'assets/enemies/units/ocean-minion.png',
    oceanTank: 'assets/enemies/units/ocean-tank.png',
    lushMinion: 'assets/enemies/units/lush-minion.png',
    lushTank: 'assets/enemies/units/lush-tank.png',
    woodBoss: 'assets/enemies/bosses/wood-boss.png',
    woodMinion: 'assets/enemies/units/wood-minion.png',
    skeletonBoss: 'assets/enemies/bosses/skeleton-warlord.png',
    skeletonMinion: 'assets/enemies/units/skeleton-minion.png',
    skeletonTank: 'assets/enemies/units/skeleton-tank.png',
    skeletonSpider: 'assets/enemies/units/skeleton-spider.png',
    skeletonOrb: 'assets/enemies/units/skeleton-orb.png',
    sandBoss: 'assets/enemies/bosses/sand-tyrant.png',
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
  attackCooldown: 0,
  attackDuration: 0,
  facing: { x: 1, y: 0 },
  inventory: {
    food: 0,
    water: 0,
    bandage: 0,
    protectorShard: 0,
    shieldShard: 0,
  },
  shieldActive: false,
  shieldTimer: 0,
  protectorActive: false,
  protector: null,
  protectors: [],
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
  foodWarningShown: false,
  waterWarningShown: false,
  threatSplashOpen: false,
  gearChoiceOpen: false,
  pendingWaveSplash: false,
};

function setMessage(text) {
  messageBox.textContent = text;
  messageBox.classList.remove('hidden');
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

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

function randomLoot() {
  const roll = Math.random();
  if (roll < 0.35) return 'food';
  if (roll < 0.55) return 'water';
  if (roll < 0.72) return 'bandage';
  if (roll < 0.86) return 'protectorShard';
  return 'shieldShard';
}

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
  } else if (item === 'shieldShard') {
    player.inventory.shieldShard += 1;
  }
}

function makeDoorways(room) {
  const roomIndex = room.gy * 4 + room.gx;
  const roomInside = { top: false, right: false, bottom: false, left: false };
  if (room.gx > 0) roomInside.left = true;
  if (room.gx < 3 && roomIndex + 1 < state.maxRooms) roomInside.right = true;
  if (room.gy > 0) roomInside.top = true;
  if (roomIndex + 4 < state.maxRooms) roomInside.bottom = true;
  return roomInside;
}

function createRooms() {
  state.rooms = [];
  state.crates = [];
  state.challengeRooms = [];

  const theme = getTheme();
  const roomWidth = 820;
  const roomHeight = 540;
  const columns = 4;
  const rows = Math.ceil(state.maxRooms / columns);
  const gap = 90;
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

  state.bossArena = {
    x: world.width / 2 - 1100,
    y: world.height / 2 - 875,
    w: 2200,
    h: 1750,
  };

  hud.theme.textContent = theme.name;
  setMessage(`Wave ${state.wave} begins. Explore the rooms, open crates, and survive.`);
}

function placePlayerInFirstRoom() {
  const firstRoom = state.rooms[0];
  if (!firstRoom) return;
  player.x = firstRoom.x + firstRoom.w / 2;
  player.y = firstRoom.y + firstRoom.h / 2;
}

function getEnemySplashArt(enemy) {
  const minionTypes = ['runner', 'crawler'];
  const tankTypes = ['walker', 'brute', 'spitter', 'sentinel'];
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
  const genericArt = {
    arcaneOrb: 'assets/enemies/generic/arcane-orb.svg',
  };
  return genericArt[enemy.type] || `assets/enemies/generic/${enemy.type}.svg`;
}

function showWaveSplash() {
  state.pendingWaveSplash = false;
  state.threatSplashOpen = true;
  keys.clear();
  waveSplashTitle.textContent = `Wave ${state.wave}`;
  waveSplashText.classList.remove('hero-splash-proverb');
  waveSplashEnemies.replaceChildren();
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
  const randomDescription = enemyThreats[featuredEnemy?.type]
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
    image: 'assets/enemies/generic/brute.svg',
    warning: 'It grows more dangerous with every victory you have taken from the dungeon.',
  };
  state.threatSplashOpen = true;
  keys.clear();
  waveSplashText.classList.remove('hero-splash-proverb');
  waveSplashTitle.textContent = details.name;
  waveSplashEnemies.replaceChildren();
  const image = document.createElement('img');
  image.src = details.image;
  image.alt = details.name;
  waveSplashEnemies.appendChild(image);
  waveSplashText.textContent = details.warning;
  waveSplashWarning.textContent = '';
  waveSplash.classList.remove('hidden');
}

function showHeroVictorySplash() {
  state.pendingWaveSplash = false;
  state.threatSplashOpen = true;
  keys.clear();
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

function closeThreatSplash() {
  state.threatSplashOpen = false;
  state.gearChoiceOpen = false;
  waveSplashContinuePrompt.textContent = 'Press any key to continue';
  keys.clear();
  waveSplash.classList.add('hidden');
}

function getContainingRoom(entity) {
  return state.rooms.find((room) => entity.x >= room.x && entity.x <= room.x + room.w && entity.y >= room.y && entity.y <= room.y + room.h) || null;
}

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

function getEnemyNavigationTarget(enemy) {
  if (enemy.bossMinion) return player;
  const containingRoom = getContainingRoom(enemy);
  const startRoom = containingRoom || getNearestRoom(enemy);
  const goalRoom = getContainingRoom(player) || getNearestRoom(player);
  if (!startRoom || !goalRoom) return player;

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
  if (path.length < 2) return player;
  const nextRoom = path[1];
  enemy.navigationRoom = nextRoom;
  const gap = 44;
  if (nextRoom.gx > startRoom.gx) return { x: startRoom.x + startRoom.w + gap, y: startRoom.y + startRoom.h / 2 };
  if (nextRoom.gx < startRoom.gx) return { x: startRoom.x - gap, y: startRoom.y + startRoom.h / 2 };
  if (nextRoom.gy > startRoom.gy) return { x: startRoom.x + startRoom.w / 2, y: startRoom.y + startRoom.h + gap };
  return { x: startRoom.x + startRoom.w / 2, y: startRoom.y - gap };
}

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
  setMessage(`Boss arena reached. Defeat the boss to gain stronger loot.`);
  if (state.boss.variant === 'iceBoss') summonIceMinion(state.boss, 'opening');
}

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
  player.health = clamp(player.health + 5, 0, player.maxHealth);
  player.food = clamp(player.food - 4, 0, 100);
  player.hydration = clamp(player.hydration - 5, 0, 100);
  state.pendingWaveSplash = true;
}

function rewardBossLoot() {
  const defeatedBossNumber = state.bossDefeated + 1;
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
    attackCooldown: 0,
    bossRetreatTimer: 0,
    target: null,
  });
  setMessage(`Protector summoned! You now have ${player.protectors.length}.`);
}

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

function applyCombatDamage(victim, amount) {
  if (victim === player && state.developerMode) {
    player.health = Math.max(1, player.health);
    return false;
  }
  if (victim === player && player.shieldActive) {
    spawnBurst(player.x, player.y, 6, '#67e8f9', 70);
    state.shake = Math.max(state.shake, 2);
    return false;
  }
  const armorReduction = victim === player ? getEquippedArmor().defense / 100 : 0;
  victim.health -= amount * (1 - armorReduction);
  return true;
}

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

function handleInput(dt) {
  const dx = (keys.has('d') ? 1 : 0) - (keys.has('a') ? 1 : 0);
  const dy = (keys.has('s') ? 1 : 0) - (keys.has('w') ? 1 : 0);
  const len = Math.hypot(dx, dy) || 1;
  const moveX = dx / len;
  const moveY = dy / len;

  let speed = player.speed;
  if (keys.has('g') && player.stamina > 0) {
    speed *= 1.55;
    player.stamina = clamp(player.stamina - 20 * dt, 0, player.maxStamina);
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
    setMessage('Food is critically low! Open crates to find food and restore it automatically.');
  } else if (player.food > 40) {
    state.foodWarningShown = false;
  }
  if (player.hydration <= 25 && !state.waterWarningShown) {
    state.waterWarningShown = true;
    setMessage('Hydration is critically low! Open crates—water loot restores hydration automatically.');
  } else if (player.hydration > 40) {
    state.waterWarningShown = false;
  }
  if (!state.developerMode && player.food <= 0) player.health = clamp(player.health - 1 * dt, 0, player.maxHealth);
  if (!state.developerMode && player.hydration <= 0) player.health = clamp(player.health - 1.5 * dt, 0, player.maxHealth);

  if (player.attackCooldown > 0) player.attackCooldown -= dt;
  if (player.attackDuration > 0) player.attackDuration -= dt;
  if (player.shieldTimer > 0) player.shieldTimer -= dt;
  if (player.shieldTimer <= 0) player.shieldActive = false;

}

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

function startBossTeleport() {
  state.teleportTimer = state.teleportDuration;
  state.teleportMoved = false;
  state.teleportTarget = 'boss';
  keys.clear();
  spawnBurst(player.x, player.y, 34, '#67e8f9', 150);
  setMessage('Wave cleared! Teleporting to the boss arena...');
}

function startWaveTeleport() {
  state.teleportTimer = state.teleportDuration;
  state.teleportMoved = false;
  state.teleportTarget = 'wave';
  keys.clear();
  spawnBurst(player.x, player.y, 42, '#a5f3fc', 175);
  setMessage('Boss defeated! Teleporting to the next wave...');
}

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

function tryAttack() {
  if (player.attackCooldown > 0) return;
  player.attackCooldown = 0.42;
  player.attackDuration = 0.24;
  const equippedWeapon = getEquippedWeapon();
  const damageMultiplier = 1 + equippedWeapon.damage / 100;
  spawnBurst(player.x + player.facing.x * 24, player.y + player.facing.y * 24, 7, '#f8fafc', 80);

  for (const enemy of state.enemies) {
    if (!enemy.dead && isInsideAttackArc(enemy, 70 + player.weaponLevel * 8 + equippedWeapon.reach)) {
      enemy.aggro = true;
      enemy.health -= (18 + player.weaponLevel * 4) * damageMultiplier;
      enemy.hitFlash = 0.18;
      enemy.x += player.facing.x * 18;
      enemy.y += player.facing.y * 18;
      spawnBurst(enemy.x, enemy.y, 4, '#fb7185', 70);
      if (enemy.health <= 0) {
        enemy.dead = true;
        enemy.deathTimer = 0.55;
        spawnBurst(enemy.x, enemy.y, 14, '#f97316', 120);
      }
    }
  }

  if (state.boss && isInsideAttackArc(state.boss, 88 + player.weaponLevel * 5 + equippedWeapon.reach)) {
    state.boss.health -= (22 + player.weaponLevel * 5) * damageMultiplier;
    state.boss.hitFlash = 0.2;
    state.boss.x += player.facing.x * 10;
    state.boss.y += player.facing.y * 10;
    const bossHitColor = state.boss.variant === 'lavaGolem' ? '#fb923c' : state.boss.variant === 'oceanBoss' ? '#67e8f9' : state.boss.variant === 'iceBoss' ? '#dbeafe' : state.boss.variant === 'skeletonWarlord' ? '#a5f3fc' : state.boss.variant === 'sandBoss' ? '#fbbf24' : state.boss.variant === 'woodBoss' ? '#bef264' : '#fca5a5';
    spawnBurst(state.boss.x, state.boss.y, 8, bossHitColor, 120);
  }
}

function updateEnemies(dt) {
  const playerRoom = getContainingRoom(player);
  for (const enemy of state.enemies) {
    if (enemy.dead) {
      enemy.deathTimer = Math.max(0, (enemy.deathTimer ?? 0.55) - dt);
      continue;
    }

    const enemyRoom = enemy.spawnRoom || getContainingRoom(enemy);
    if (
      enemy.bossMinion
      || playerRoom === enemyRoom
      || distance(enemy, player) <= 300
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

    const nearbyProtector = player.protectors
      .filter((protector) => distance(enemy, protector) < enemy.radius + protector.radius + 24)
      .sort((a, b) => distance(enemy, a) - distance(enemy, b))[0] || null;
    const protectorInRange = Boolean(nearbyProtector);
    const playerInRange = distance(enemy, player) < enemy.radius + player.radius + 24;
    if (protectorInRange || playerInRange) {
      if (enemy.attackTimer <= 0) {
        enemy.attackTimer = enemy.type === 'runner' || enemy.type === 'crawler' ? 0.55 : enemy.type === 'reaper' ? 1.15 : 0.85;
        enemy.lunge = 1;
        const victim = protectorInRange ? nearbyProtector : player;
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
        const damageLanded = applyCombatDamage(victim, enemy.damage);
        state.shake = Math.max(state.shake, 5);
        spawnBurst(victim.x, victim.y, 7, damageLanded ? '#f87171' : '#67e8f9', 75);
        if (victim !== player && victim.health <= 0) {
          spawnBurst(victim.x, victim.y, 18, '#60a5fa', 110);
          player.protectors = player.protectors.filter((protector) => protector !== victim);
          setMessage('Your protector was defeated.');
        }
      }
    }
  }

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

function updateProtectors(dt) {
  if (player.protectors.length === 0) return;
  for (let protectorIndex = 0; protectorIndex < player.protectors.length; protectorIndex += 1) {
  const protector = player.protectors[protectorIndex];

  protector.maxHealth = player.maxHealth;
  protector.health = Math.min(protector.health, protector.maxHealth);
  protector.attackCooldown = Math.max(0, protector.attackCooldown - dt);
  protector.bossRetreatTimer = Math.max(0, (protector.bossRetreatTimer || 0) - dt);

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

  const retreatingFromBoss = state.boss
    && target === state.boss
    && protector.bossRetreatTimer > 0;
  const bossSeparation = retreatingFromBoss
    ? Math.hypot(protector.x - target.x, protector.y - target.y) || 1
    : 1;
  const destination = retreatingFromBoss
    ? {
      x: target.x + ((protector.x - target.x) / bossSeparation) * 230,
      y: target.y + ((protector.y - target.y) / bossSeparation) * 230,
    }
    : state.boss && target === state.boss
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
  const stopDistance = retreatingFromBoss
    ? 14
    : target
      ? protector.radius + (target.radius || 16)
      : 12;

  if (targetDistance > stopDistance) {
    const speed = player.speed * (retreatingFromBoss ? 1.3 : target ? 1.15 : 1.35);
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
  if (!retreatingFromBoss && touchingTarget && protector.attackCooldown <= 0) {
    protector.attackCooldown = 0.42;
    const damage = 18 + player.weaponLevel * 4;
    target.health -= damage;
    if (target === state.boss) protector.bossRetreatTimer = 1.15;
    else target.aggro = true;
    if ('hitFlash' in target) target.hitFlash = 0.18;
    spawnBurst(target.x, target.y, 7, '#60a5fa', 85);
    if (target.health <= 0 && target !== state.boss) {
      target.dead = true;
      target.deathTimer = 0.55;
      spawnBurst(target.x, target.y, 14, '#60a5fa', 120);
    }
  }
  }
}

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

function updateCrates(dt) {
  for (const crate of state.crates) {
    if (crate.isOpen) continue;
    if (distance(player, crate) < 64) {
      if (keys.has('f')) {
        crate.openProgress += dt;
        if (crate.openProgress >= 2) {
          crate.openProgress = 2;
          crate.isOpen = true;
          crate.rewards.forEach(applyLoot);
          showLootHighlight(crate.rewards);
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

  // Protectors can intercept ordinary enemies, but they never pull the boss's
  // attention away from the hero.
  boss.attackTarget = player;
  const attackTarget = player;
  const dx = attackTarget.x - boss.x;
  const dy = attackTarget.y - boss.y;
  const len = Math.hypot(dx, dy) || 1;
  const dirX = dx / len;
  const dirY = dy / len;
  boss.movePhase += dt * 5;
  boss.hitFlash = Math.max(0, boss.hitFlash - dt);
  boss.attackPulse = Math.max(0, boss.attackPulse - dt * 4);
  boss.cooldown -= dt;

  if (boss.attackWindup > 0) {
    boss.attackWindup -= dt;
    if (boss.attackWindup <= 0) {
      boss.attackPulse = 1;
      const effectColor = boss.variant === 'lavaGolem' ? '#f97316' : boss.variant === 'lushGolem' ? '#4ade80' : boss.variant === 'oceanBoss' ? '#38bdf8' : boss.variant === 'iceBoss' ? '#bfdbfe' : boss.variant === 'skeletonWarlord' ? '#67e8f9' : boss.variant === 'sandBoss' ? '#fbbf24' : boss.variant === 'woodBoss' ? '#84cc16' : '#fb7185';

      if (boss.attackType.includes('Dash')) {
        const dashDistance = boss.attackType === 'flameDash' ? 260 : boss.attackType === 'waterDash' ? 240 : boss.attackType === 'frostDash' ? 225 : 190 + boss.tier * 8;
        if (Math.abs(dirX) > 0.05) boss.facingX = dirX;
        boss.x = clamp(boss.x + dirX * dashDistance, state.bossArena.x + boss.radius, state.bossArena.x + state.bossArena.w - boss.radius);
        boss.y = clamp(boss.y + dirY * dashDistance, state.bossArena.y + boss.radius, state.bossArena.y + state.bossArena.h - boss.radius);
        if (distance(boss, attackTarget) < boss.radius + attackTarget.radius + 65) {
          const dashDamage = boss.attackType === 'flameDash' ? 1.3 : boss.attackType === 'waterDash' ? 1.2 : boss.attackType === 'frostDash' ? 1.25 : 1.1;
          applyCombatDamage(attackTarget, boss.damage * dashDamage);
        }
        spawnBurst(boss.x, boss.y, 24, effectColor, 180);
        state.shake = 10;
      } else if (boss.attackType === 'healingBloom') {
        boss.health = clamp(boss.health + boss.maxHealth * 0.07, 0, boss.maxHealth);
        spawnBurst(boss.x, boss.y, 42, '#86efac', 155);
        state.shake = 5;
      } else if (boss.attackType === 'thornRing' || boss.attackType === 'eruption' || boss.attackType === 'tidalWave' || boss.attackType === 'blizzard' || boss.attackType === 'nova') {
        const attackRadius = boss.attackType === 'thornRing' ? 165 : boss.attackType === 'eruption' ? 285 : boss.attackType === 'tidalWave' ? 250 : boss.attackType === 'blizzard' ? 265 : 210 + boss.tier * 8;
        const damageScale = boss.attackType === 'thornRing' ? 0.65 : boss.attackType === 'eruption' ? 1.05 : boss.attackType === 'tidalWave' ? 0.9 : boss.attackType === 'blizzard' ? 0.95 : 0.75;
        for (const victim of [player, ...player.protectors]) {
          if (distance(boss, victim) <= attackRadius) applyCombatDamage(victim, boss.damage * damageScale);
        }
        spawnBurst(boss.x, boss.y, 38, effectColor, 230);
        state.shake = 14;
      } else if (len < boss.radius + attackTarget.radius + 75) {
        const slamScale = boss.attackType === 'hammerSlam' ? 1.55 : boss.attackType === 'rootSlam' ? 1.05 : boss.attackType === 'tideSlam' ? 1.35 : boss.attackType === 'iceSlam' ? 1.4 : boss.attackType === 'boneSlam' ? 1.5 : boss.attackType === 'sandSlam' ? 1.48 : boss.attackType === 'woodSlam' ? 1.45 : 1.25;
        applyCombatDamage(attackTarget, boss.damage * slamScale);
        spawnBurst(attackTarget.x, attackTarget.y, 20, effectColor, 145);
        state.shake = 16;
      }

      const defeatedProtectors = player.protectors.filter((protector) => protector.health <= 0);
      if (defeatedProtectors.length > 0) setMessage(`${defeatedProtectors.length} protector${defeatedProtectors.length === 1 ? '' : 's'} defeated by the boss.`);
      player.protectors = player.protectors.filter((protector) => protector.health > 0);
      if (attackTarget.health <= 0) boss.attackTarget = null;
    }
  } else {
    const orbit = Math.sin(boss.movePhase * 0.7) * 36;
    const speed = boss.cooldown < 0.35 ? 125 : 72;
    const movementX = dirX * speed - dirY * orbit;
    const movementY = dirY * speed + dirX * orbit;
    if (Math.abs(movementX) > 3) boss.facingX = movementX;
    boss.x += movementX * dt;
    boss.y += movementY * dt;
    if (boss.cooldown <= 0 && len < 430) {
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

function formatLootName(item) {
  return item.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
}

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

function togglePause() {
  if (!state.started || state.isGameOver) return;
  state.paused = !state.paused;
  keys.clear();
  pauseOverlay.classList.toggle('hidden', !state.paused);
}

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
  const leaderboardRank = recordCompletedRun(state.wave, state.bossDefeated);
  overlayTitle.textContent = 'You Died';
  overlayText.textContent = `${currentHeroName} reached wave ${state.wave} and defeated ${state.bossDefeated} boss${state.bossDefeated === 1 ? '' : 'es'}.${leaderboardRank ? ` Hall of Heroes rank: #${leaderboardRank}.` : ''}`;
  heroProverb.textContent = getRandomFallenHeroProverb();
  controlsGrid.style.display = 'none';
  openArmoryButton.disabled = true;
  openArmoryButton.tabIndex = -1;
  openArmoryButton.classList.add('portrait-only');
  openArmoryButton.setAttribute('aria-label', 'Fallen hero');
  startButton.style.display = '';
  startButton.textContent = 'Press any key to continue';
  overlay.classList.remove('hidden');
  messageBox.classList.add('hidden');
  deathScreenReady = false;
  window.setTimeout(() => {
    deathScreenReady = true;
  }, 1500);
}

function resetRun() {
  state.wave = 1;
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
  player.attackCooldown = 0;
  player.attackDuration = 0;
  player.facing = { x: 1, y: 0 };
  player.inventory = { food: 0, water: 0, bandage: 0, protectorShard: 0, shieldShard: 0 };
  player.shieldActive = false;
  player.shieldTimer = 0;
  player.protectors = [];
  player.weaponLevel = 1;

  createRooms();
  placePlayerInFirstRoom();
  spawnEnemiesForWave();
  messageBox.classList.add('hidden');
}

function showMainMenu() {
  resetRun();
  selectedGender = null;
  currentHeroName = '';
  heroNameInput.value = '';
  showRandomHeroProverb();
  overlayTitle.textContent = 'Endless Dungeon';
  overlayText.textContent = 'Explore rooms, open crates, survive waves, and defeat the boss.';
  controlsGrid.style.display = 'grid';
  openArmoryButton.disabled = false;
  openArmoryButton.tabIndex = 0;
  openArmoryButton.classList.remove('portrait-only');
  openArmoryButton.setAttribute('aria-label', 'Customize hero');
  startButton.style.display = '';
  startButton.textContent = 'Press any key to begin';
  overlay.classList.remove('hidden');
  genderOverlay.classList.remove('hidden');
}

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
  const spriteKey = variant === 'hero' ? 'hero' : variant;
  const sprite = art[spriteKey];

  if (!sprite || !sprite.complete || sprite.naturalWidth === 0) {
    return;
  }

  ctx.save();
  ctx.translate(x, y + bob);
  ctx.globalAlpha = 1 - deathProgress;
  ctx.rotate(stride * 0.004 + deathProgress * Math.PI * 1.6);
  const facingScale = variant === 'hero'
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
  const fastWeakTypes = ['runner', 'crawler'];
  const slowTypes = ['walker', 'brute', 'spitter', 'sentinel'];
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

function drawBoss(boss) {
  const walk = Math.sin(boss.movePhase || 0);
  const windup = boss.attackWindup > 0 ? boss.attackWindup / (boss.attackWindupTotal || 0.38) : 0;
  const charge = boss.attackWindup > 0 ? 1 - windup : 0;
  const pulse = boss.attackPulse || 0;
  const isSlamAttack = boss.attackType.toLowerCase().includes('slam');
  const isDashAttack = boss.attackType.toLowerCase().includes('dash');
  const slamCrouch = isSlamAttack ? charge : 0;
  const dashLean = isDashAttack ? charge : 0;
  const novaCharge = !isSlamAttack && !isDashAttack ? charge : 0;
  const deathProgress = boss.defeated
    ? 1 - Math.max(0, boss.deathTimer) / 1.8
    : 0;
  ctx.save();
  ctx.translate(boss.x, boss.y + Math.abs(walk) * 4 - pulse * 7 + slamCrouch * 9 - novaCharge * 5);
  ctx.globalAlpha = 1 - deathProgress;
  ctx.rotate(walk * 0.035 + dashLean * 0.16 + deathProgress * Math.PI * 2.5);
  const deathScale = 1 - deathProgress * 0.9;
  const bossVisualScale = 1.4;
  ctx.scale(
    (boss.facingX < 0 ? 1 : -1) * (1 + pulse * 0.18 + dashLean * 0.15 - slamCrouch * 0.08) * deathScale * bossVisualScale,
    (1 - pulse * 0.1 + slamCrouch * 0.16 + novaCharge * 0.1) * deathScale * bossVisualScale,
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
    ctx.shadowColor = '#4ade80';
    ctx.shadowBlur = 22 + windup * 30;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art.lushGolem, -92, -78, 184, 148);

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
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 28 + windup * 38 + pulse * 18;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art.lavaGolem, -94, -82, 188, 154);

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
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 30 + windup * 42 + pulse * 20;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art.oceanBoss, -98, -86, 196, 158);

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
    ctx.shadowColor = '#bfdbfe';
    ctx.shadowBlur = 32 + windup * 44 + pulse * 20;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art.iceBoss, -100, -88, 200, 160);

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
    ctx.shadowColor = '#67e8f9';
    ctx.shadowBlur = 34 + windup * 44 + pulse * 22;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art.skeletonBoss, -104, -92, 208, 168);

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
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 34 + windup * 44 + pulse * 22;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art.sandBoss, -106, -94, 212, 172);
    drawBossHealthBar(boss, -56, -102, 112, 8, '#92400e', '#fde68a');
    ctx.restore();
    return;
  }

  if (boss.variant === 'woodBoss' && art.woodBoss.complete && art.woodBoss.naturalWidth > 0) {
    ctx.shadowColor = '#84cc16';
    ctx.shadowBlur = 32 + windup * 40 + pulse * 20;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art.woodBoss, -102, -90, 204, 164);

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

function drawPlayer() {
  const stride = Math.sin(performance.now() * 0.012) * 7;
  const bob = Math.sin(performance.now() * 0.012) * 2;
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
      : null;
  if (equippedSwordArt?.complete && equippedSwordArt.naturalWidth > 0) {
    ctx.save();
    ctx.translate(player.x, player.y - 16 + bob);
    if (player.attackDuration > 0) {
      const attackProgress = 1 - player.attackDuration / 0.24;
      const attackAngle = Math.atan2(player.facing.y, player.facing.x);
      const swordAngle = attackAngle - 58 * Math.PI / 180 + attackProgress * 116 * Math.PI / 180;
      ctx.rotate(swordAngle - Math.PI / 2);
    } else {
      // Weapon art points downward; rotate it so the blade rests upright in both hands.
      ctx.rotate(Math.PI);
    }
    ctx.shadowColor = equippedWeaponId === 'emeraldSword'
      ? '#34d399'
      : equippedWeaponId === 'lavaBlade'
        ? '#f97316'
      : equippedWeaponId === 'diamondSword'
        ? '#bfdbfe'
        : '#fca5a5';
    ctx.shadowBlur = 14;
    // The guard sits at the pivot, making the blade—not the whole hero—the moving part.
    ctx.drawImage(equippedSwordArt, -13, -24, 26, 92);
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

function drawGuardians() {
  for (const protector of player.protectors) {
  ctx.save();
  ctx.translate(protector.x, protector.y);
  ctx.shadowColor = '#60a5fa';
  ctx.shadowBlur = 16;
  ctx.fillStyle = '#60a5fa';
  ctx.beginPath();
  ctx.arc(0, 0, protector.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  ctx.fillRect(-22, -30, 44, 5);
  ctx.fillStyle = '#60a5fa';
  ctx.fillRect(-22, -30, 44 * (protector.health / protector.maxHealth), 5);
  ctx.restore();
  }
}

function drawParticles() {
  for (const particle of state.particles) {
    ctx.globalAlpha = 1 - particle.age / particle.life;
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
  }
  ctx.globalAlpha = 1;
}

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

function drawUI() {
  hud.wave.textContent = String(state.wave);
  hud.health.textContent = Math.round(player.health);
  hud.food.textContent = Math.round(player.food);
  hud.hydration.textContent = Math.round(player.hydration);
  hud.stamina.textContent = Math.round(player.stamina);
  hud.bandage.textContent = String(player.inventory.bandage);
  hud.enemy.textContent = String(state.enemies.filter((enemy) => !enemy.dead).length + (state.boss ? 1 : 0));
  hud.protector.textContent = `${player.protectors.length} (${player.inventory.protectorShard} shards)`;
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

function startGame() {
  state.started = true;
  state.paused = false;
  pauseOverlay.classList.add('hidden');
  overlay.classList.add('hidden');
  setMessage('Wave 1 begins. Explore the rooms, open crates, and survive.');
  showWaveSplash();
}

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
openHighScoresButton.addEventListener('click', () => {
  saveHeroName();
  renderHighScores();
  highScoresOverlay.classList.remove('hidden');
});
closeHighScoresButton.addEventListener('click', () => highScoresOverlay.classList.add('hidden'));

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  const mainMenuOpen = !state.started
    && !state.isGameOver
    && !overlay.classList.contains('hidden')
    && highScoresOverlay.classList.contains('hidden')
    && armoryOverlay.classList.contains('hidden')
    && genderOverlay.classList.contains('hidden');
  if (mainMenuOpen && key === 'escape') {
    event.preventDefault();
    if (!event.repeat) {
      heroNameInput.blur();
      genderOverlay.classList.remove('hidden');
    }
    return;
  }
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
  if (key === 'q' && state.started) useBandage();
  if (key === 'r' && state.started && !event.repeat) activateShield();
  if (event.code === 'Space') {
    event.preventDefault();
    tryAttack();
  }
});

window.addEventListener('keyup', (event) => {
  keys.delete(event.key.toLowerCase());
});

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
genderOverlay.classList.remove('hidden');
requestAnimationFrame(loop);
