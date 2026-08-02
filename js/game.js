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
const startPantheonButton = document.getElementById('startPantheonButton');
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
const armoryArmorLevel = document.getElementById('armoryArmorLevel');
const armoryWeaponLevel = document.getElementById('armoryWeaponLevel');
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
const movementControlEditor = document.querySelector('.movement-control-editor');
const movementControlSelect = document.getElementById('movementControlSelect');
const activeMovementKeys = document.getElementById('activeMovementKeys');
const menuMovementKeys = document.getElementById('menuMovementKeys');
const randomizeHeroNameButton = document.getElementById('randomizeHeroNameButton');
const changeHeroButton = document.getElementById('changeHeroButton');
const openHighScoresButton = document.getElementById('openHighScoresButton');
const highScoresOverlay = document.getElementById('highScoresOverlay');
const highScoresList = document.getElementById('highScoresList');
const closeHighScoresButton = document.getElementById('closeHighScoresButton');
const openJournalButton = document.getElementById('openJournalButton');
const journalOverlay = document.getElementById('journalOverlay');
const journalGrid = document.getElementById('journalGrid');
const journalProgress = document.getElementById('journalProgress');
const closeJournalButton = document.getElementById('closeJournalButton');
const bestiaryDetail = document.getElementById('bestiaryDetail');
const bestiaryDetailImage = document.getElementById('bestiaryDetailImage');
const bestiaryDetailName = document.getElementById('bestiaryDetailName');
const bestiaryDetailKind = document.getElementById('bestiaryDetailKind');
const bestiaryDetailStats = document.getElementById('bestiaryDetailStats');
const bestiaryDetailTraits = document.getElementById('bestiaryDetailTraits');
const bestiaryDetailBackstory = document.getElementById('bestiaryDetailBackstory');
const bestiaryDetailFanArt = document.getElementById('bestiaryDetailFanArt');
const bestiaryDetailFanArtImage = document.getElementById('bestiaryDetailFanArtImage');
const closeBestiaryDetailButton = document.getElementById('closeBestiaryDetailButton');
const godModeOverlay = document.getElementById('godModeOverlay');
const godModeGrid = document.getElementById('godModeGrid');
const closeGodModeButton = document.getElementById('closeGodModeButton');

const journalCatalog = [
  { id: 'walker', name: 'Cryptbound Drifter', kind: 'Enemy', image: 'assets/themes/retro-ruins/walker.svg' },
  { id: 'runner', name: 'Bloodrush Ravager', kind: 'Enemy', image: 'assets/themes/retro-ruins/runner.svg' },
  { id: 'crawler', name: 'Gloomskitter', kind: 'Enemy', image: 'assets/themes/retro-ruins/crawler.svg' },
  { id: 'spitter', name: 'Rotspine', kind: 'Enemy', image: 'assets/themes/retro-ruins/spitter.svg' },
  { id: 'burrower', name: 'Graveburrow Stalker', kind: 'Enemy', image: 'assets/themes/retro-ruins/burrower.svg' },
  { id: 'arcaneOrb', name: 'Hexlight Oculus', kind: 'Enemy', image: 'assets/themes/retro-ruins/arcane-orb.svg' },
  { id: 'brute', name: 'Ironhide Breaker', kind: 'Enemy', image: 'assets/themes/retro-ruins/brute.svg' },
  { id: 'assassin', name: 'Veilknife', kind: 'Enemy', image: 'assets/themes/retro-ruins/assassin.svg' },
  { id: 'sentinel', name: 'Runebound Watcher', kind: 'Enemy', image: 'assets/themes/retro-ruins/sentinel.svg' },
  { id: 'wraith', name: 'Hollowveil', kind: 'Enemy', image: 'assets/themes/retro-ruins/wraith.svg' },
  { id: 'reaper', name: 'Dreadharvester', kind: 'Enemy', image: 'assets/themes/retro-ruins/reaper.svg' },
  { id: 'lushMinion', name: 'Thornling', kind: 'Enemy', image: 'assets/themes/verdant-ruins/lush-minion.png' },
  { id: 'lushTank', name: 'Mossback Behemoth', kind: 'Enemy', image: 'assets/themes/verdant-ruins/lush-tank.png' },
  { id: 'lushMossling', name: 'Mossling', kind: 'Enemy', image: 'assets/themes/verdant-ruins/lush-mossling.png' },
  { id: 'lushSporeShroom', name: 'Spore Shroom', kind: 'Enemy', image: 'assets/themes/verdant-ruins/lush-spore-shroom.png' },
  { id: 'crystalStalker', name: 'Verdant Crystal Stalker', kind: 'Enemy', image: 'assets/themes/verdant-ruins/lush-crystal-stalker.png', fanArt: 'assets/fan-art/Emerald Crystal Guardian in the Mist.png' },
  { id: 'glowBat', name: 'Viridian Glowbat', kind: 'Enemy', image: 'assets/themes/verdant-ruins/glow-bat.png' },
  { id: 'crystalMinion', name: 'Gemhide Crusher', kind: 'Enemy', image: 'assets/themes/crystal-sanctum/crystal-minion.png' },
  { id: 'crystalTank', name: 'Prismback Colossus', kind: 'Enemy', image: 'assets/themes/crystal-sanctum/crystal-tank.png' },
  { id: 'crystalLion', name: 'Crownshard Lion', kind: 'Enemy', image: 'assets/themes/crystal-sanctum/crystal-lion.png' },
  { id: 'crystalBobcat', name: 'Shardeye Bobcat', kind: 'Enemy', image: 'assets/themes/crystal-sanctum/crystal-bobcat.png' },
  { id: 'lavaMinion', name: 'Cinderfang', kind: 'Enemy', image: 'assets/themes/cinder-keep/lava-minion.png' },
  { id: 'lavaSpider', name: 'Lava Spider', kind: 'Enemy', image: 'assets/themes/cinder-keep/lava-spider.png' },
  { id: 'lavaTank', name: 'Obsidian Juggernaut', kind: 'Enemy', image: 'assets/themes/cinder-keep/lava-tank.png' },
  { id: 'magmaSerpent', name: 'Magma Dragon', kind: 'Enemy', image: 'assets/themes/cinder-keep/magma-serpent.png' },
  { id: 'lavaTiger', name: 'Cinderfang Sabre', kind: 'Enemy', image: 'assets/themes/cinder-keep/lava-tiger.png' },
  { id: 'lavaEagle', name: 'Cinderwing Eagle', kind: 'Enemy', image: 'assets/themes/cinder-keep/lava eagle.png', fanArt: 'assets/fan-art/lave eagle art.png' },
  { id: 'oceanMinion', name: 'Tideclaw', kind: 'Enemy', image: 'assets/themes/sunken-shrine/ocean-minion.png' },
  { id: 'oceanTank', name: 'Reefbound Colossus', kind: 'Enemy', image: 'assets/themes/sunken-shrine/ocean-tank.png' },
  { id: 'oceanHippo', name: 'Undertow Behemoth', kind: 'Enemy', image: 'assets/themes/sunken-shrine/ocean-hippo.png' },
  { id: 'reefclawCrab', name: 'Reefclaw Crab', kind: 'Enemy', image: 'assets/themes/sunreef-lagoon/reefclaw-crab.png' },
  { id: 'sunscaleRay', name: 'Sunscale Ray', kind: 'Enemy', image: 'assets/themes/sunreef-lagoon/sunscale-ray.png' },
  { id: 'coralbackTurtle', name: 'Coralback Turtle', kind: 'Enemy', image: 'assets/themes/sunreef-lagoon/coralback-turtle.png' },
  { id: 'tidefangEel', name: 'Tidefang Eel', kind: 'Enemy', image: 'assets/themes/sunreef-lagoon/tidefang-eel.png' },
  { id: 'abyssalRazorfin', name: 'Abyssal Razorfin', kind: 'Enemy', image: 'assets/themes/sunken-shrine/abyssal-razorfin.png' },
  { id: 'iceMinion', name: 'Frostbound Shard', kind: 'Enemy', image: 'assets/themes/frozen-depths/ice-minion.png' },
  { id: 'frostWraith', name: 'Frost Wraith', kind: 'Enemy', image: 'assets/themes/frozen-depths/frost-wraith.png' },
  { id: 'frosthornRam', name: 'Frosthorn Ram', kind: 'Enemy', image: 'assets/themes/frozen-depths/frosthorn-ram.png' },
  { id: 'icefangBear', name: 'Icefang Bear', kind: 'Enemy', image: 'assets/themes/frozen-depths/icefang-bear.png' },
  { id: 'frostwingDrake', name: 'Frostwing Drake', kind: 'Enemy', image: 'assets/themes/frozen-depths/frostwing-drake.png' },
  { id: 'skeletonMinion', name: 'Boneguard', kind: 'Enemy', image: 'assets/themes/bony-ruins/skeleton-minion.png' },
  { id: 'skeletonTank', name: 'Ossuary Bulwark', kind: 'Enemy', image: 'assets/themes/bony-ruins/skeleton-tank.png' },
  { id: 'skeletonSpider', name: 'Skeleton Spider', kind: 'Enemy', image: 'assets/themes/bony-ruins/skeleton-spider.png' },
  { id: 'skeletonOrb', name: 'Skeleton Orb', kind: 'Enemy', image: 'assets/themes/bony-ruins/skeleton-orb.png' },
  { id: 'gravewingRaven', name: 'Gravewing Raven', kind: 'Enemy', image: 'assets/themes/bony-ruins/gravewing-raven.png' },
  { id: 'boneRaven', name: 'Bone Raven', kind: 'Enemy', image: 'assets/themes/bony-ruins/bone-raven.png' },
  { id: 'woodMinion', name: 'Splinterfiend', kind: 'Enemy', image: 'assets/themes/moonwood/wood-minion.png' },
  { id: 'woodJaguar', name: 'Wood Jaguar', kind: 'Enemy', image: 'assets/themes/moonwood/wood jaguar.png' },
  { id: 'desertMummy', name: 'Desert Brute', kind: 'Enemy', image: 'assets/themes/desert-ruins/desert-mummy.png' },
  { id: 'desertScorpion', name: 'Sand Scorpion', kind: 'Enemy', image: 'assets/themes/desert-ruins/desert-scorpion.png' },
  { id: 'desertArcher', name: 'Desert Skeleton', kind: 'Enemy', image: 'assets/themes/desert-ruins/desert-archer.png' },
  { id: 'sandRoller', name: 'Sand Roller', kind: 'Enemy', image: 'assets/themes/desert-ruins/sand-roller.png' },
  { id: 'sunfeatherGriffin', name: 'Sunfeather Sentinel', kind: 'Enemy', image: 'assets/themes/desert-ruins/sunfeather-griffin.png', fanArt: 'assets/fan-art/crazy-sunfeather-chicken.png' },
  { id: 'abyssJelly', name: 'Void Jelly', kind: 'Enemy', image: 'assets/themes/abyssal-depths/abyss-jelly.png' },
  { id: 'abyssSpider', name: 'Void Spider', kind: 'Enemy', image: 'assets/themes/abyssal-depths/abyss-spider.png' },
  { id: 'abyssKnight', name: 'Abyssal Knight', kind: 'Enemy', image: 'assets/themes/abyssal-depths/abyss-knight.png' },
  { id: 'voidSerpent', name: 'Void Serpent', kind: 'Enemy', image: 'assets/themes/abyssal-depths/void-serpent.png' },
  { id: 'voidwingDrake', name: 'Riftwing Drake', kind: 'Enemy', image: 'assets/themes/abyssal-depths/voidwing-drake.png' },
  { id: 'corruptedStag', name: 'Corrupted Stag', kind: 'Enemy', image: 'assets/themes/fungal-dominion/corrupted-stag.png' },
  { id: 'fungalOozeSnail', name: 'Fungal Ooze Snail', kind: 'Enemy', image: 'assets/themes/fungal-dominion/Fungal Ooze Snail.png', fanArt: 'assets/fan-art/Bioluminescent Slug.png' },
  { id: 'fungalFairyWitch', name: 'Fungal Fairy Witch', kind: 'Enemy', image: 'assets/themes/fungal-dominion/Fungal Fairy Witch.png' },
  { id: 'mossboundFungalWarden', name: 'Mossbound Fungal Warden', kind: 'Enemy', image: 'assets/themes/fungal-dominion/Mossbound Fungal Warden.png' },
  { id: 'mossboundFungalGuardian', name: 'Mossbound Fungal Guardian', kind: 'Enemy', image: 'assets/themes/fungal-dominion/mossbound-fungal-guardian-clean.png' },
  { id: 'mechMinion', name: 'Furnace Sentinel', kind: 'Enemy', image: 'assets/themes/furnace-foundry/furnace-sentinel.png' },
  { id: 'mechBear', name: 'Brassmaw Siege Bear', kind: 'Enemy', image: 'assets/themes/furnace-foundry/mech-bear.png', fanArt: 'assets/fan-art/mech bear standing.png' },
  { id: 'shadowCat', name: 'Nightclaw Lynx', kind: 'Enemy', image: 'assets/themes/shadow-realm/shadow-cat.png', fanArt: 'assets/fan-art/Feral shadowed lynx.png' },
  { id: 'shadowGator', name: 'Dreadscale Gator', kind: 'Enemy', image: 'assets/themes/shadow-realm/shadow-gator.png' },
  { id: 'prismMoth', name: 'Prism Moth', kind: 'Enemy', image: 'assets/themes/crystal-sanctum/prism-moth.png' },
  { id: 'starlingMarauder', name: 'Starling Marauder', kind: 'Enemy', image: 'assets/themes/astral-foundry/starling-marauder.png' },
  { id: 'cometHound', name: 'Comet Hound', kind: 'Enemy', image: 'assets/themes/astral-foundry/comet-hound.png' },
  { id: 'astralSentinel', name: 'Astral Sentinel', kind: 'Enemy', image: 'assets/themes/astral-foundry/astral-sentinel.png' },
  { id: 'lushGolem', name: 'Lush Golem', kind: 'Boss', image: 'assets/themes/verdant-ruins/lush-golem.png', fanArt: 'assets/fan-art/original-lush-golem.png' },
  { id: 'lavaGolem', name: 'Lava Golem', kind: 'Boss', image: 'assets/themes/cinder-keep/lava-golem.png' },
  { id: 'oceanBoss', name: 'Tide Sovereign', kind: 'Boss', image: 'assets/themes/sunken-shrine/ocean-boss.png' },
  { id: 'iceBoss', name: 'Glacial Sovereign', kind: 'Boss', image: 'assets/themes/frozen-depths/ice-boss-clean-v3.png' },
  { id: 'skeletonWarlord', name: 'Skeleton Warlord', kind: 'Boss', image: 'assets/themes/bony-ruins/skeleton-warlord.png' },
  { id: 'sandBoss', name: 'Sand Tyrant', kind: 'Boss', image: 'assets/themes/desert-ruins/sand-tyrant.png' },
  { id: 'shadowBoss', name: 'Umbral Warden', kind: 'Boss', image: 'assets/themes/shadow-realm/shadow-boss.png', fanArt: 'assets/fan-art/shadow-room-with-boss.png' },
  { id: 'abyssBoss', name: 'Abyssal Devourer', kind: 'Boss', image: 'assets/themes/abyssal-depths/abyss-boss-phase-2.png' },
  { id: 'scorpionQueen', name: 'Scorpion Queen', kind: 'Boss', image: 'assets/themes/desert-ruins/scorpion-queen.png' },
  { id: 'woodBoss', name: 'Heartwood Horror', kind: 'Boss', image: 'assets/themes/moonwood/wood-boss.png' },
  { id: 'fungalBoss', name: 'Mycelial Sovereign', kind: 'Boss', image: 'assets/themes/fungal-dominion/mycelial-sovereign.png' },
  { id: 'mechOverlord', name: 'Furnace Overlord', kind: 'Boss', image: 'assets/themes/furnace-foundry/mech-boss.png' },
  { id: 'crystalBoss', name: 'Prismatic Guardian', kind: 'Boss', image: 'assets/themes/crystal-sanctum/crystal-guardian.png', fanArt: 'assets/fan-art/crystal guardian mech.png' },
  { id: 'sandSnake', name: 'Gilded Dune Serpent', kind: 'Boss', image: 'assets/themes/desert-ruins/sand-snake.png' },
  { id: 'dragonBoss', name: 'Frostwing Dragon Rider', kind: 'Boss', image: 'assets/themes/dragon/dragon-boss-flap-middle.png' },
  { id: 'yinYangBoss', name: 'The Balanced Duality', kind: 'Boss', image: 'assets/themes/yin-yang/yin-yang-boss-sword-ready.png' },
  { id: 'foldedShogun', name: 'The Folded Shogun', kind: 'Boss', image: 'assets/themes/folded-shogun/folded-shogun.png' },
  { id: 'stormglassLeviathan', name: 'Stormglass Leviathan', kind: 'Boss', image: 'assets/themes/stormglass-leviathan/stormglass-leviathan.png' },
  { id: 'clockworkSeraph', name: 'Clockwork Seraph', kind: 'Boss', image: 'assets/themes/clockwork-seraph/clockwork-seraph.png' },
  { id: 'gravebloomColossus', name: 'Gravebloom Colossus', kind: 'Boss', image: 'assets/themes/gravebloom-colossus/gravebloom-colossus.png' },
  { id: 'lunarKitsune', name: 'Lunar Kitsune Sovereign', kind: 'Boss', image: 'assets/themes/lunar-kitsune/lunar-kitsune.png' },
  { id: 'eternityWarden', name: 'The Eternity Warden', kind: 'Boss', image: 'assets/themes/eternity-warden/eternity-warden.png' },
  { id: 'hollowStarBoss', name: 'The Hollow Star', kind: 'Boss', image: 'assets/themes/hollow-star/hollow-star-boss.png' },
  { id: 'inkboundArchivist', name: 'The Inkbound Archivist', kind: 'Boss', image: 'assets/themes/inkbound-archive/inkbound-archivist.png' },
  { id: 'crimsonMarionette', name: 'The Crimson Marionette', kind: 'Boss', image: 'assets/themes/crimson-marionette/crimson-marionette.png' },
  { id: 'waxAcolyte', name: 'Wax Acolyte', kind: 'Enemy', image: 'assets/themes/melted-monarch/wax-acolyte.png' },
  { id: 'meltedMonarch', name: 'The Melted Monarch', kind: 'Boss', image: 'assets/themes/melted-monarch/melted-monarch.png' },
  { id: 'drownedBell', name: 'The Drowned Bell', kind: 'Boss', image: 'assets/themes/drowned-bell/drowned-bell.png' },
  { id: 'standard', name: 'Dungeon Guardian', kind: 'Boss', image: 'assets/player/shadow boss.png' },
];
const bestiaryProfiles = {
  reefclawCrab: { health: '176 + 20 per wave', damage: '18 + 2.5 per wave', speed: '62', traits: 'Reefcrusher Claw · heavy armour · hydration drain', backstory: 'Reefclaws carried the Sunreef Lagoon’s coral masonry until barnacles sealed their shells into living fortresses.' },
  sunscaleRay: { health: '82 + 12 per wave', damage: '14 + 2 per wave', speed: '168', traits: 'Sunflash Dive · hovering movement · quick retreat', backstory: 'Sunscale Rays gather warm light across their golden fins, then release it in a blinding dive above the lagoon.' },
  coralbackTurtle: { health: '230 + 25 per wave', damage: '22 + 3 per wave', speed: '52', traits: 'Reefbreaker Ram · extreme armour · stamina crush', backstory: 'Entire coral gardens grow on these ancient turtles. Every battle protects a living reef carried across their shells.' },
  tidefangEel: { health: '108 + 15 per wave', damage: '16 + 2.3 per wave', speed: '152', traits: 'Riptide Bite · curved charge · hydration drain', backstory: 'Tidefang Eels hide in warm channels beneath the lagoon floor and follow the vibration of armored footsteps.' },
  icefangBear: { health: '188 + 21 per wave', damage: '20 + 2.7 per wave', speed: '104', traits: 'Glacier Maul · stamina fracture · freezing impact', backstory: 'Icefang Bears sleep beneath moving glaciers and wake only when the dungeon’s heat reaches their crystal armor.' },
  gravewingRaven: { health: '86 + 12 per wave', damage: '14 + 2 per wave', speed: '172', traits: 'Soul Dive · wing-flap flight · rapid retreat', backstory: 'Gravewings gather bones that the Bony Ruins reject, fastening each fragment to their feathers with cold soul flame.' },
  prismMoth: { health: '104 + 14 per wave', damage: '15 + 2.1 per wave', speed: '156', traits: 'Facet Dive · wing-flap flight · stamina drain', backstory: 'Prism Moths drink light from the Sanctum walls. Their crystal wings split every stolen beam into hunting signals.' },
  starlingMarauder: { health: '62 + 10 per wave', damage: '10 + 1.6 per wave', speed: '164', traits: 'Crescent Cut · fast approach · quick rebound', backstory: 'Starling Marauders salvage fallen constellations from the foundry floor, sharpening each fragment into a crescent blade before its light can fade.' },
  cometHound: { health: '118 + 16 per wave', damage: '16 + 2.2 per wave', speed: '146', traits: 'Comet Charge · stamina fracture · long rebound', backstory: 'Comet Hounds were forged to chase sparks escaping the celestial furnaces. Their burning manes lengthen as they accelerate toward intruders.' },
  astralSentinel: { health: '210 + 23 per wave', damage: '21 + 2.8 per wave', speed: '58', traits: 'Starhammer Crush · heavy armour · massive impact', backstory: 'Astral Sentinels hold broken observatory roofs aloft until battle begins. Then their star-metal hammers measure intruders by the craters they leave.' },
  crimsonMarionette: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '88', traits: 'Scissor Lunge / String Snare / Final Curtain', backstory: 'A court dancer bound to invisible strings, it cuts applause from anyone who enters its abandoned theatre.' },
  drownedBell: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '58', traits: 'Bell Charge / Tidal Sweep / Drowning Knell', backstory: 'The shrine bell sank with its keepers still chained beneath it. Their last warning now walks the dungeon.' },
  hollowStar: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '70', traits: 'Astral Strike / Orbit Sweep / Starfall Slam', backstory: 'An astronomer looked into a dead star until the empty light learned to look back.' },
  inkboundArchivist: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '74', traits: 'Quill Strike / Living Book / Forbidden Decree', backstory: 'Every erased history survives in the Archivist’s book, angry at the world that forgot it.' },
  meltedMonarch: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '62', traits: 'Wax Cleave / Candleburst / Royal Meltdown', backstory: 'A king preserved in ceremonial wax awakened when the last candle in his palace refused to die.' },
  stormglassLeviathan: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '68', traits: 'Trident Crush / Storm Ring / Glass Tempest', backstory: 'Lightning trapped beneath the oldest sea hardened into scales and rose carrying a trident of shattered storms.' },
  clockworkSeraph: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '78', traits: 'Gear Halberd / Time Ring / Judgment Hour', backstory: 'Built to measure eternity, the Seraph concluded that mortal time was a defect requiring correction.' },
  gravebloomColossus: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '48', traits: 'Tomb Maul / Gravebloom / Cemetery Quake', backstory: 'Every root beneath the royal cemetery grew around the same forgotten guardian and taught the stones to walk.' },
  lunarKitsune: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '112', traits: 'Crescent Cut / Ninefold Mirage / Moonfall', backstory: 'Nine lifetimes of moonlit duels gathered beneath one mask, each tail remembering a different victory.' },
  eternityWarden: { health: 'Final boss scaling', damage: 'Final boss scaling', speed: '82', traits: 'Epoch Blade / Time Collapse / End of Ages', backstory: 'The final guardian stands outside the dungeon’s history. Every failed hero is already reflected in its hourglass.' },
  yinYangBoss: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '72', traits: 'Sword overhead / roundhouse sweep / Yin Yang Nova / rare arena-wide sword slam', backstory: 'Two champions reached the heart of the balance engine from opposite paths. Neither would yield, so the arena fused them into a single guardian whose light and shadow can only move together.' },
  hollowStarBoss: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '68', traits: 'Astral overhead / orbit sweep / rare celestial ground slam', backstory: 'The last astronomer of a ruined observatory stared into an impossible eclipse until the star looked back. Its armour now charts dead constellations around a living void.' },
  inkboundArchivist: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '70', traits: 'Quill strike / ink sweep / decree slam / very rare Runaway Grimoire', backstory: 'The last keeper of the drowned archive wrote forbidden names into a living ledger. The book grew hungry, bound itself to its author, and now closes around intruders before returning to the Archivist\'s back.' },
  crimsonMarionette: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '76', traits: 'Scissor Crosscut / Scissor Pirouette / String Snare / very rare arena-wide Final Curtain', backstory: 'A discarded royal performer learned to pull her own strings. Now the empty theater obeys every turn of her control cross, and her silver shears cut short anyone who interrupts the final act.' },
  meltedMonarch: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '62', traits: 'Candle Halberd Cleave / five-shot Candleburst / very rare arena-wide Royal Meltdown', backstory: 'When the candle cathedral burned, its king refused burial. The mourning candles flowed into his empty throne, shaped themselves into a monarch, and kept every flame burning long after the kingdom went dark.' },
  waxAcolyte: { health: '82 + 11 per boss tier', damage: '11 + 1.45 per boss tier', speed: '126', traits: 'Hook strike / summoned in pairs / maximum four active', backstory: 'Every Acolyte began as a funeral candle placed beneath the royal throne. The Melted Monarch gives those small flames legs, empty faces, and hooks with which to drag the living toward his light.' },
  drownedBell: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '58', traits: 'Chained Clapper Sweep / Undertow Charge / very rare arena-wide Death Knell', backstory: 'A cathedral bell sank with its city and kept tolling beneath the sea. Coral gave it legs, the drowned gave it an eye, and every chain now carries the memory of those who never reached the surface.' },
  foldedShogun: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '78', traits: 'Ink Katana Cleave / Paper Cyclone / very rare arena-wide Thousand-Fold Judgment', backstory: 'A defeated shogun ordered his last decree folded into armor. Every page remembered his rage, assembled itself around the empty throne, and now cuts down anyone who tries to read the ending.' },
  dragonBoss: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '44', traits: 'Eight-frame flight / freezing staff bolt / dragon swipe / fire breath every 20 seconds / no summons', backstory: 'The Frostwing Dragon Rider circles a stone arena suspended above the clouds. The rider binds prey in ice while the armoured dragon gathers enough breath to flood the platform with blue flame.' },
  woodBoss: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '72', traits: 'Wood Slam / Thorn Ring / Heartwood Eruption / Wood Jaguar companion / Splinterfiend Summoning', backstory: 'The Heartwood Horror was once the Moonwood’s oldest guardian. Corruption entered through an axe wound and turned protection into possession. Its Heartwood Eruption drives the forest’s buried roots upward in one furious command.' },
  woodJaguar: { health: '190 + 18 per boss tier', damage: '17 + 2.2 per boss tier', speed: '158', traits: 'Timber Pounce / stamina rend / Heartwood Horror companion', backstory: 'The Wood Jaguar grew from a hunting cat that slept beneath the Moonwood’s oldest tree. Roots replaced its bones without dulling its instincts, and it now guards the Heartwood Horror with thorn, claw, and unwavering fury.' },
  crystalBoss: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '74', traits: 'Crystal Slam / Prism Dash / Crystal Eruption', backstory: 'The Prismatic Guardian grew around the first gemstone ever cut beneath the dungeon. Every fracture teaches it a new angle of attack, while its shield preserves the reflected memory of every warrior who struck it.' },
  mechMinion: { health: '105 + 12 per boss tier', damage: '10 + 1.35 per boss tier', speed: '68', traits: 'Quad-cannon bolts / heavy armour / boss deployment', backstory: 'Furnace Sentinels were mobile boiler guards built to keep the Overlord’s assembly lines burning. Their four heated barrels fire in perfect sequence because each machine shares the same mechanical memory.' },
  fungalBoss: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '72', traits: 'Mycelium Slam / Hypha Dash / Sporeburst / Fungal Summoning', backstory: 'The Mycelial Sovereign began as a single spore feeding beneath a forgotten battlefield. It inherited every fallen creature’s instincts through their roots and now believes the entire dungeon is one body awaiting infection.' },
  crystalStalker: { health: '150 + 18 per wave', damage: '14 + 2.1 per wave', speed: '68', traits: 'Verdant crystal armour · Shard Lunge · stamina fracture', backstory: 'Verdant Crystal Stalkers slept beneath the oldest roots until green cave crystals grew through their hides. They now guard every glowing seam in the Lush Caves as if it were an egg.' },
  glowBat: { health: '58 + 9 per wave', damage: '10 + 1.5 per wave', speed: '176', traits: 'Wing-flap flight · Echo Dive · rapid retreat', backstory: 'Viridian Glowbats pollinate crystal flowers that bloom only during cave-ins. Their luminous eyes read echoes through stone, letting them dive through dust where grounded hunters are blind.' },
  lushMossling: { health: '28 + 7 per wave', damage: '7 + 1.25 per wave', speed: '152', traits: 'Crystal Pounce · stamina bite · rapid recovery', backstory: 'Mosslings collect loose cave crystals in the soft growth along their backs. When threatened, they spring head-first at the intruder and carry the stolen strength from each bite home to warm their nests.' },
  lushSporeShroom: { health: '108 + 16 per wave', damage: '11 + 1.8 per wave', speed: '58', traits: 'Poison Bloom · ranged spore cloud · rooted armour', backstory: 'Spore Shrooms learned to mimic the cave’s harmless lantern fungi. Their caps remain still until footsteps approach, then release a carefully aimed bloom grown from the last creature that breathed nearby.' },
  frosthornRam: { health: '132 + 17 per wave', damage: '16 + 2.2 per wave', speed: '118', traits: 'Frosthorn Charge · heavy impact · stamina fracture', backstory: 'Frosthorn Rams graze on mineral frost beneath the oldest glaciers. Their curling horns harden with every winter, and a charging adult can split blue ice thick enough to bury a fortress.' },
  voidwingDrake: { health: '92 + 13 per wave', damage: '15 + 2.1 per wave', speed: '158', traits: 'Wing-flap flight · Rift Dive · hydration drain', backstory: 'Riftwing Drakes nest upside down in tears between worlds. Their wings briefly fold space on every downstroke, allowing a hunting dive to begin before its shadow arrives.' },
  sunfeatherGriffin: { health: '138 + 17 per wave', damage: '18 + 2.5 per wave', speed: '128', traits: 'Wing-flap flight · Solar Talon · heavy impact', backstory: 'Sunfeather Sentinels were carved to patrol above desert temples after their mortal guards died. Dawn-charged gems in their wings keep them airborne even beneath a buried sky.' },
  crystalMinion: { health: '115 + 16 per wave', damage: '16 + 2.2 per wave', speed: '88', traits: 'Gemstone armour · crushing claws · stamina fracture', backstory: 'Gemhide Crushers form when the Crystal Sanctum seals rubble around a newborn shard. Each lumbering guardian protects the central crystal embedded in its crown as though it were the biome’s beating heart.' },
  crystalTank: { health: '220 + 24 per wave', damage: '21 + 2.8 per wave', speed: '54', traits: 'Prismatic bulwark · massive impact · heavy stamina fracture', backstory: 'Prismback Colossi grow around the oldest collapsed pillars of the Crystal Sanctum. Their violet crowns record every impact, adding the memory of each blow to an armour layer that never stops thickening.' },
  crystalLion: { health: '168 + 20 per wave', damage: '19 + 2.6 per wave', speed: '136', traits: 'Crownshard Pounce · prismatic impact · quadruped stride', backstory: 'The first Crownshard Lion was the companion of the mason who opened the Crystal Sanctum. When the mason vanished, the chamber grew a royal mane of crystal around the waiting beast. Its descendants still patrol the cut-stone paths, pouncing on anyone whose reflection the walls do not recognise.' },
  crystalBobcat: { health: '112 + 15 per wave', damage: '15 + 2.2 per wave', speed: '184', traits: 'Facet Blink · rapid ambush · quadruped stride', backstory: 'Shardeye Bobcats stalk the fractured galleries where crystal reflections overlap. The glowing stones embedded in their hides each watch a different angle, allowing the hunter to choose the one reflection in which it has already reached its prey—and leap into it.' },
  shadowCat: { health: '128 + 17 per wave', damage: '17 + 2.4 per wave', speed: '172', traits: 'Shadow Step · stamina rend · Umbral Warden summon', backstory: 'Nightclaw Lynxes are born when a hunting cat crosses the same shadow at midnight for seven nights. The Umbral Warden gathers those abandoned silhouettes into its arena, where pale eyes open moments before their owners strike.' },
  mechBear: { health: '260 + 28 per wave', damage: '23 + 3 per wave', speed: '62', traits: 'Piston Charge · reinforced plating · heavy stamina fracture', backstory: 'Brassmaw Siege Bears were designed to drag broken furnaces back onto their rails. When the foundry fell silent, their recovery orders corrupted: they now classify every living creature as loose machinery and crush it into a shape suitable for transport.' },
  shadowGator: { health: '240 + 26 per wave', damage: '22 + 2.9 per wave', speed: '78', traits: 'Voidjaw Lunge · shadow plating · hydration drain', backstory: 'Dreadscale Gators once lived in the drainage channels beneath the Shadow Arena. Centuries of drinking darkness hardened their scales into armour and taught their jaws to bite through a victim’s shadow first, leaving the body suddenly cold and desperately thirsty.' },
  oceanHippo: { health: '285 + 30 per wave', damage: '24 + 3.1 per wave', speed: '58', traits: 'Undertow Charge · tidal armour · stamina and hydration crush', backstory: 'Undertow Behemoths once hauled the Sunken Shrine’s altar stones through canals too deep for ordinary beasts. The rising sea filled their hides with living currents and rusted their ceremonial harnesses shut. They now mistake every moving figure for cargo that must be driven back beneath the tide.' },
  sandSnake: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '76', traits: 'Staff Crush · Serpent Rush · Scarab Storm', backstory: 'The Gilded Dune Serpent served as keeper of the first desert calendar, swallowing each year when its final grain fell. When the buried city stopped counting, the serpent refused to release the last season and now coils around an age that can never end.' },
  magmaSerpent: { health: '92 + 13 per wave', damage: '13 + 1.9 per wave', speed: '82', traits: 'Fire Breath · keeps its distance', backstory: 'Born where lava rivers knot beneath the keep, Magma Dragons coil around cooling stone and breathe the molten pressure trapped inside their scales.' },
  lavaTiger: { health: '176 + 21 per wave', damage: '20 + 2.7 per wave', speed: '146', traits: 'Furnace Pounce · sabre bite · stamina scorch', backstory: 'Cinderfang Sabres prowled the mountain before Cinder Keep was built. When the first eruption buried their hunting grounds, they survived by drinking molten seams until stone replaced fur and every heartbeat became a furnace bellows.' },
  lavaEagle: { health: '116 + 15 per wave', damage: '17 + 2.3 per wave', speed: '164', traits: 'Wing-flap flight · Cinder Dive · stamina scorch', backstory: 'Lava Eagles nest above Cinder Keep’s hottest vents. Molten seams glow between their volcanic feathers, and every downstroke scatters enough heat to soften armour before their talons strike.' },
  frostWraith: { health: '74 + 11 per wave', damage: '12 + 1.8 per wave', speed: '148', traits: 'Floating hunter · drains stamina', backstory: 'These spirits were explorers caught in a flash freeze. The cavern preserved their anger long after it shattered their bodies.' },
  voidSerpent: { health: '118 + 15 per wave', damage: '15 + 2.2 per wave', speed: '124', traits: 'Close-range venom bite · lingering poison · rapid retreat', backstory: 'Void Serpents swim through the cracks between rooms. Their luminous bellies are said to contain the last light stolen from drowned worlds.' },
  sandRoller: { health: '185 + 20 per wave', damage: '18 + 2.4 per wave', speed: '96', traits: 'Armoured charge · heavy impact', backstory: 'The ruin-builders shaped these guardians from temple blocks. When disturbed, each one curls into a living siege stone and crushes intruders beneath its carved shell.' },
  corruptedStag: { health: '105 + 14 per wave', damage: '17 + 2.3 per wave', speed: '172', traits: 'Antler charge · relentless pursuit', backstory: 'This stag inhaled the Mycelial Sovereign’s oldest spores while grazing above the fungal colony. The growth hollowed its instincts into a single command: charge anything that has not yet joined the bloom.' },
  fungalOozeSnail: { health: '210 + 24 per wave', damage: '16 + 2.2 per wave', speed: '48', traits: 'Ooze Bite · lingering poison · heavy shell', backstory: 'Fungal Ooze Snails spend centuries carrying entire colonies across the dungeon floor. Their glowing feelers lure hungry creatures close enough for the colony beneath the shell to feed.' },
  fungalFairyWitch: { health: '92 + 13 per wave', damage: '15 + 2.1 per wave', speed: '154', traits: 'Spore Hex · lingering poison · winged pursuit', backstory: 'Fungal Fairy Witches tend the Sovereign’s youngest mushroom groves. Their wings scatter enchanted spores through the air, turning every graceful sweep into a poisonous curse.' },
  mossboundFungalWarden: { health: '240 + 25 per boss tier', damage: '20 + 2.6 per boss tier', speed: '60', traits: 'Moss Maul · heavy stamina fracture · Mycelial Sovereign guardian', backstory: 'Mossbound Fungal Wardens were once keepers of lantern paths through the oldest fungal groves. The Sovereign rooted them in place for a century, then taught their wooden bones to walk again whenever the colony is threatened.' },
  mossboundFungalGuardian: { health: '275 + 28 per boss tier', damage: '22 + 2.8 per boss tier', speed: '52', traits: 'Sporestaff Crush · heavy stamina fracture · fungal bulwark', backstory: 'Mossbound Fungal Guardians grow around ancient grove-keepers who refused to abandon their posts. Their staffs carry miniature colonies whose lantern spores awaken whenever the Mycelial Sovereign calls for aid.' },
  scorpionQueen: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '72', traits: 'Pincer Slam · Scorpio Dash · Venom Nova · Brood Summoning', backstory: 'The Scorpion Queen was the Sand Tyrant’s most feared general. She bound herself to the desert’s oldest brood and now carries an army beneath her armour.' },
};
const bestiaryBackstories = {
  crystalBoss: 'The Prismatic Guardian grew around the first gemstone ever cut beneath the dungeon. Every fracture teaches it a new angle of attack, while its shield preserves the reflected memory of every warrior who struck it.',
  mechMinion: 'Furnace Sentinels were mobile boiler guards built to keep the Overlord’s assembly lines burning. Their four heated barrels fire in perfect sequence because each machine shares the same mechanical memory.',
  fungalBoss: 'The Mycelial Sovereign began as a single spore feeding beneath a forgotten battlefield. It inherited every fallen creature’s instincts through their roots and now believes the entire dungeon is one body awaiting infection.',
  walker: 'Cryptbound Drifters are failed pilgrims whose armour fused shut around them. Nothing remains inside the metal except the command to keep walking.',
  runner: 'Bloodrush Ravagers were bred in lightless kennels beneath the corridors. The dungeon starves them so every footstep triggers a feeding frenzy.',
  crawler: 'Gloomskitters hatch inside cracks too narrow for a sword. They follow vibrations through the floor and emerge beneath anyone standing still.',
  spitter: 'Rotspines digest rust, fungus, and old bones into corrosive bile, turning their swollen throats into weapons that dissolve armour.',
  burrower: 'Graveburrow Stalkers carve nests beneath busy passages and decorate them with stolen boots. They know heroes rarely watch the ground twice.',
  arcaneOrb: 'Hexlight Oculi form when abandoned spells knot together instead of fading. Each hunts living minds for memories of the mage who cast it.',
  brute: 'Ironhide Breakers are prisoners reshaped by generations of dungeon alchemy. Their chains are gone, but they still attack anything between them and an imagined exit.',
  assassin: 'Veilknives belong to a vanished guild that accepted the dungeon as its final patron. Their masks carry the names of every target they failed to kill.',
  sentinel: 'Runebound Watchers were built to guard doors whose keys no longer exist. With their purpose forgotten, they judge every traveller to be an intruder.',
  wraith: 'Hollowveils are the last breaths of heroes who died calling for help. They drift through walls searching for companions who can no longer answer.',
  reaper: 'Dreadharvesters collect weapons from fallen challengers and sharpen them into crescent blades, believing every severed shadow strengthens the dungeon.',
  lushMinion: 'Thornlings grew from seeds planted in battlefield graves. Their bark remembers violence, and their roots pull them toward drawn steel.',
  lushTank: 'Mossback Behemoths are ancient cave trees that folded stone around their trunks. Moss softens their armour, but every impact wakes another buried root.',
  lushMossling: 'Mosslings are curious scavengers corrupted by crystal pollen. They steal warmth with every pounce and carry it back to their nests.',
  lushSporeShroom: 'Spore Shrooms began as harmless colonies feeding on leaves. Dungeon magic taught them to aim poisonous blooms at moving prey.',
  lavaMinion: 'Cinderfangs crawl from cooling slag whenever Cinder Keep demands hunters. Their hearts harden into glass if they remain away from fire.',
  lavaSpider: 'Lava Spiders spin wire-thin strands of molten rock across volcanic vents, forcing prey toward ground that is about to erupt.',
  lavaTank: 'Obsidian Juggernauts are chunks of the keep given legs by pressure and rage. Cracks in their shells brighten whenever they prepare to strike.',
  oceanMinion: 'Tideclaws were attendants drowned when the Sunken Shrine collapsed. Saltwater still pours from their armour as they defend a ceremony that ended centuries ago.',
  oceanTank: 'Reefbound Colossi carry barnacled temple doors as natural armour. Deep currents taught them to endure every blow and answer with the sea’s weight.',
  iceMinion: 'Frostbound Shards are fragments chipped from the Ice Boss during ancient battles. Each shard grew limbs and inherited a sliver of its creator’s hunger.',
  skeletonMinion: 'Boneguards are assembled from whichever bones the Warlord can reach. Few contain parts from only one person.',
  skeletonTank: 'Ossuary Bulwarks are packed with extra bones until their armour can barely contain them. Every rattle is another dead warrior fighting for control.',
  skeletonSpider: 'Skeleton Spiders are woven from finger bones and sharpened ribs. Gravekeepers once used them to retrieve corpses from deadly tunnels.',
  skeletonOrb: 'Skeleton Orbs hold skulls that refused the Warlord’s command. Their punishment is to float beside him and fire the magic they used in rebellion.',
  woodMinion: 'Splinterfiends split from the Wood Boss whenever an axe wounds its heartwood. They fight knowing they will wither if their creator falls.',
  desertMummy: 'Desert Brutes were royal guards sealed alive beside the Sand Tyrant. Their wrappings bear oaths compelling them to serve beyond death.',
  desertScorpion: 'Sand Scorpions coat their stingers with powdered curse-stone. Their venom makes victims feel the weight of the entire desert.',
  desertArcher: 'Desert Skeletons were temple sentries buried at their posts. These weak foot soldiers still draw their bows while desert winds guide every arrow.',
  abyssJelly: 'Void Jellies drift in from lightless seas beneath the dungeon. Their soft bodies store stolen memories as pulses of cold blue light.',
  abyssSpider: 'Void Spiders stitch tiny tears in reality into invisible webs. Captured prey feels the abyss pulling from every direction.',
  abyssKnight: 'Abyssal Knights entered the depths seeking a weapon against death. They returned immortal, obedient, and empty behind their helms.',
  lushGolem: 'The Lush Golem formed around the first crystal to bloom in the cave. Every root in the Verdant Ruins bends toward it like a subject before a throne.',
  lavaGolem: 'The Lava Golem is the living pressure beneath Cinder Keep. Its hammer was forged from the gate that once contained the volcano.',
  oceanBoss: 'The Tide Sovereign was the Sunken Shrine’s high priest. When the waters rose, it offered its congregation to the tide and became the thing they worshipped.',
  iceBoss: 'The Glacial Sovereign sleeps around the frozen heart of an extinct winter god. Each awakening spreads the cavern’s cold farther into the dungeon.',
  skeletonWarlord: 'The Skeleton Warlord conquered three kingdoms but feared an unmarked grave. It built the Bony Ruins so every death would join its army.',
  sandBoss: 'The Sand Tyrant ordered its city buried rather than surrender. It now rules exactly as promised: eternal, alone, and surrounded by obedient dead.',
  shadowBoss: 'The Umbral Warden formed from every frightened silhouette cast on the dungeon walls. It knows each hero’s shape before they enter its arena.',
  abyssBoss: 'The Abyssal Devourer guards the wound leaking the depths into the world. Its second phase is the larger creature forcing its way through.',
  scorpionQueen: 'The Scorpion Queen was the Sand Tyrant’s most feared general. She bound herself to the desert’s oldest brood and now carries an army beneath her armour.',
  woodBoss: 'The Heartwood Horror was once the Moonwood’s oldest guardian. Corruption entered through an axe wound and turned protection into possession.',
  mechOverlord: 'The Furnace Overlord was assembled by a civilization that tried to mechanize the dungeon itself. Its reactor still burns with the final command they gave it: improve everything by force.',
  standard: 'The Dungeon Guardian is rebuilt after every defeat from abandoned armour, broken weapons, and fallen shadows. No two heroes face exactly the same creature.',
};
const journalStorageKey = 'endlessDungeonJournal';
let journalDiscoveries = new Set();
try {
  const savedJournal = JSON.parse(window.localStorage.getItem(journalStorageKey) || '[]');
  const validJournalIds = new Set(journalCatalog.map((entry) => entry.id));
  journalDiscoveries = new Set(savedJournal.filter((id) => validJournalIds.has(id)));
} catch (error) {
  journalDiscoveries = new Set();
}

function saveJournal() {
  try {
    window.localStorage.setItem(journalStorageKey, JSON.stringify([...journalDiscoveries]));
  } catch (error) {
    // Journal progress remains available for the current session.
  }
}

function discoverJournalEntry(id) {
  if (state.godMode) return;
  if (!id || journalDiscoveries.has(id) || !journalCatalog.some((entry) => entry.id === id)) return;
  journalDiscoveries.add(id);
  saveJournal();
}

function renderJournal() {
  journalGrid.replaceChildren();
  for (const kind of ['Enemy', 'Boss']) {
    const section = document.createElement('section');
    section.className = 'journal-section';
    const heading = document.createElement('h2');
    heading.textContent = kind === 'Enemy' ? 'Enemies' : 'Bosses';
    const entries = document.createElement('div');
    entries.className = 'journal-entry-grid';
    section.append(heading, entries);
    for (const entry of journalCatalog.filter((candidate) => candidate.kind === kind)) {
      const discovered = journalDiscoveries.has(entry.id);
      const card = document.createElement('article');
      card.className = `journal-entry${discovered ? ' discovered' : ''}`;
      card.innerHTML = `
        <img src="${entry.image}" alt="${discovered ? entry.name : `Unknown ${entry.kind}`}">
        <strong>${discovered ? entry.name : 'Unknown'}</strong>
      `;
      if (discovered) {
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Open ${entry.name} profile`);
        card.addEventListener('click', () => openBestiaryDetail(entry));
        card.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openBestiaryDetail(entry);
          }
        });
      }
      entries.appendChild(card);
    }
    journalGrid.appendChild(section);
  }
  journalProgress.textContent = `${journalDiscoveries.size} / ${journalCatalog.length}`;
}

function getBestiaryProfile(entry) {
  const combatProfile = typeof enemyMeleeProfiles !== 'undefined' ? enemyMeleeProfiles[entry.id] : null;
  return bestiaryProfiles[entry.id] || {
    health: entry.kind === 'Boss' ? 'High · scales by boss tier' : 'Scales with wave',
    damage: entry.kind === 'Boss' ? 'Heavy · scales by boss tier' : 'Scales with wave',
    speed: entry.kind === 'Boss' ? 'Boss-specific' : 'Class-specific',
    traits: entry.kind === 'Boss'
      ? 'Multiple attacks · arena encounter'
      : combatProfile
        ? `${combatProfile.attackName} · ${combatProfile.damageScale >= 1.25 ? 'heavy impact' : 'rapid strike'} · ${combatProfile.staminaDrain ? 'stamina damage' : combatProfile.hydrationDrain ? 'hydration drain' : 'special recovery'}`
        : 'Theme-adapted combat role',
    backstory: bestiaryBackstories[entry.id]
      || `${entry.name} is recorded in the dungeon's oldest field notes. Survivors learned its habits at great cost, and every confirmed defeat adds another page to its history.`,
  };
}

function openBestiaryDetail(entry) {
  if (!journalDiscoveries.has(entry.id)) return;
  const profile = getBestiaryProfile(entry);
  bestiaryDetailImage.src = entry.image;
  bestiaryDetailImage.alt = entry.name;
  bestiaryDetailName.textContent = entry.name;
  bestiaryDetailKind.textContent = entry.kind;
  const visibleStats = [
    ['Health', profile.health],
    ['Damage', profile.damage],
    ['Speed', profile.speed],
  ].filter(([, value]) => value && !/scal(?:e|ing)|class-specific|boss-specific/i.test(value));
  bestiaryDetailStats.replaceChildren();
  for (const [label, value] of visibleStats) {
    const stat = document.createElement('div');
    const statLabel = document.createElement('span');
    const statValue = document.createElement('strong');
    statLabel.textContent = label;
    statValue.textContent = value;
    stat.append(statLabel, statValue);
    bestiaryDetailStats.appendChild(stat);
  }
  bestiaryDetailStats.classList.toggle('hidden', visibleStats.length === 0);
  bestiaryDetailTraits.replaceChildren();
  profile.traits
    .split(/\s*[·/]\s*/)
    .filter(Boolean)
    .forEach((trait) => {
      const traitBadge = document.createElement('span');
      traitBadge.textContent = trait;
      bestiaryDetailTraits.appendChild(traitBadge);
    });
  bestiaryDetailBackstory.textContent = profile.backstory;
  if (entry.fanArt) {
    bestiaryDetailFanArtImage.src = entry.fanArt;
    bestiaryDetailFanArtImage.alt = `${entry.name} fan art`;
    bestiaryDetailFanArt.classList.remove('hidden');
  } else {
    bestiaryDetailFanArtImage.removeAttribute('src');
    bestiaryDetailFanArtImage.alt = '';
    bestiaryDetailFanArt.classList.add('hidden');
  }
  bestiaryDetail.classList.remove('hidden');
}

function closeBestiaryDetail() {
  bestiaryDetail.classList.add('hidden');
}

const armorSets = [
  { id: 'wayfarer', name: "Wayfarer's Resolve", boss: 0, portrait: 'assets/player/armor/male-wayfarer-portrait.png', combat: 'assets/player/armor/male-wayfarer-combat-swordless.png', femalePortrait: 'assets/player/armor/female-wayfarer-combat.png', femaleCombat: 'assets/player/armor/female-wayfarer-combat-swordless.png', defense: 0, health: 0, stamina: 0, thorns: 0 },
  { id: 'leather', name: 'Thornhide Vanguard', boss: 1, portrait: 'assets/player/armor/male-leather-portrait.png', combat: 'assets/player/armor/male-leather-combat-swordless.png', femalePortrait: 'assets/player/armor/female-leather-combat.png', femaleCombat: 'assets/player/armor/female-leather-combat-swordless.png', defense: 8, health: 10, stamina: 5, thorns: 6 },
  { id: 'lightPlate', name: 'Silverwind Harness', boss: 5, portrait: 'assets/player/armor/male-light-plate-portrait.png', combat: 'assets/player/armor/male-light-plate-combat-swordless.png', femalePortrait: 'assets/player/armor/female-light-plate-combat.png', femaleCombat: 'assets/player/armor/female-light-plate-combat-swordless.png', defense: 16, health: 20, stamina: 10, thorns: 10 },
  { id: 'heavyPlate', name: 'Iron Bastion Plate', boss: 8, portrait: 'assets/player/armor/male-heavy-plate-portrait.png', combat: 'assets/player/armor/male-heavy-plate-combat-swordless.png', femalePortrait: 'assets/player/armor/female-heavy-plate-combat.png', femaleCombat: 'assets/player/armor/female-heavy-plate-combat-swordless.png', defense: 24, health: 35, stamina: 15, thorns: 15 },
  { id: 'dragonPlate', name: 'Wyrmscale Eclipse', boss: 10, portrait: 'assets/player/armor/male-dragon-plate-portrait.png', combat: 'assets/player/armor/male-dragon-plate-combat-swordless.png', femalePortrait: 'assets/player/armor/female-dragon-plate-combat.png', femaleCombat: 'assets/player/armor/female-dragon-plate-combat-swordless.png', defense: 32, health: 50, stamina: 20, thorns: 20 },
  { id: 'runebloom', name: 'Runebloom Warden', boss: 13, portrait: 'assets/player/armor/male-runebloom-portrait.png', combat: 'assets/player/armor/male-runebloom-combat-swordless.png', femalePortrait: 'assets/player/armor/female-runebloom-portrait.png', femaleCombat: 'assets/player/armor/female-runebloom-combat-swordless.png', defense: 35, health: 58, stamina: 22, thorns: 21 },
  { id: 'threadmaster', name: 'Crimson Threadmaster', boss: 17, portrait: 'assets/player/armor/male-threadmaster-portrait.png', combat: 'assets/player/armor/male-threadmaster-combat-swordless.png', femalePortrait: 'assets/player/armor/female-threadmaster-portrait.png', femaleCombat: 'assets/player/armor/female-threadmaster-combat-swordless.png', defense: 38, health: 64, stamina: 24, thorns: 23 },
  { id: 'royalArmor', name: 'Crownward Regalia', boss: 20, portrait: 'assets/player/armor/male-royal-armor-portrait.png', combat: 'assets/player/armor/male-royal-armor-combat-swordless.png', femalePortrait: 'assets/player/armor/female-dragon-plate-combat.png', femaleCombat: 'assets/player/armor/female-dragon-plate-combat-swordless.png', defense: 40, health: 70, stamina: 25, thorns: 25 },
  { id: 'stormglass', name: 'Stormglass Vanguard', boss: 22, portrait: 'assets/player/armor/male-stormglass-portrait.png', combat: 'assets/player/armor/male-stormglass-combat-swordless.png', femalePortrait: 'assets/player/armor/female-stormglass-portrait.png', femaleCombat: 'assets/player/armor/female-stormglass-combat-swordless.png', defense: 44, health: 82, stamina: 29, thorns: 27 },
  { id: 'worldforged', name: 'Worldforged Aegis', boss: 25, portrait: 'assets/player/armor/male-worldforged-portrait.png', combat: 'assets/player/armor/male-worldforged-combat-swordless.png', femalePortrait: 'assets/player/armor/female-dragon-plate-combat.png', femaleCombat: 'assets/player/armor/female-dragon-plate-combat-swordless.png', defense: 50, health: 100, stamina: 35, thorns: 30 },
];

const weaponSets = [
  { id: 'lavaBlade', name: 'Cinderfang', kind: 'melee', boss: 2, portrait: 'assets/player/weapons/lava-blade-portrait.png', combat: 'assets/player/weapons/lava-blade-combat.png', damage: 4, reach: 2 },
  { id: 'verdantBow', name: 'Verdant Longbow', kind: 'bow', boss: 3, portrait: 'assets/player/weapons/bow-01.png', combat: 'assets/player/weapons/bow-01.png', projectileDamage: 24, projectileSpeed: 620, cooldown: 0.7 },
  { id: 'broadSword', name: 'Oathkeeper Broadblade', kind: 'melee', boss: 4, portrait: 'assets/player/weapons/broad-sword.png', combat: 'assets/player/weapons/broad-sword.png', damage: 8, reach: 4 },
  { id: 'tideBow', name: 'Tidepiercer Bow', kind: 'bow', boss: 5, portrait: 'assets/player/weapons/bow-02.png', combat: 'assets/player/weapons/bow-02.png', projectileDamage: 32, projectileSpeed: 660, cooldown: 0.64 },
  { id: 'diamondSword', name: 'Diamondheart Greatsword', kind: 'melee', boss: 6, portrait: 'assets/player/weapons/diamond-sword-portrait.png', combat: 'assets/player/weapons/diamond-sword-combat.png', damage: 15, reach: 8 },
  { id: 'cinderBow', name: 'Cinderstring Bow', kind: 'bow', boss: 7, portrait: 'assets/player/weapons/bow-03.png', combat: 'assets/player/weapons/bow-03.png', projectileDamage: 42, projectileSpeed: 700, cooldown: 0.58 },
  { id: 'emeraldSword', name: 'Emerald Sovereign', kind: 'melee', boss: 8, portrait: 'assets/player/weapons/emerald-sword-portrait.png', combat: 'assets/player/weapons/emerald-sword-combat.png', damage: 24, reach: 12 },
  { id: 'frostspire', name: 'Frostspire', kind: 'melee', boss: 9, portrait: 'assets/player/weapons/frostspire.png', combat: 'assets/player/weapons/frostspire.png', damage: 32, reach: 15 },
  { id: 'frostBow', name: 'Frostwind Bow', kind: 'bow', boss: 9, portrait: 'assets/player/weapons/bow-04.png', combat: 'assets/player/weapons/bow-04.png', projectileDamage: 54, projectileSpeed: 750, cooldown: 0.52 },
  { id: 'worldfireCleaver', name: 'Worldfire Cleaver', kind: 'melee', boss: 11, portrait: 'assets/player/weapons/worldfire-cleaver.png', combat: 'assets/player/weapons/worldfire-cleaver.png', damage: 42, reach: 18 },
  { id: 'voidBow', name: 'Voidcaller Bow', kind: 'bow', boss: 11, portrait: 'assets/player/weapons/bow-05.png', combat: 'assets/player/weapons/bow-05.png', projectileDamage: 68, projectileSpeed: 810, cooldown: 0.46 },
  { id: 'voidRequiem', name: 'Void Requiem', kind: 'melee', boss: 12, portrait: 'assets/player/weapons/void-requiem.png', combat: 'assets/player/weapons/void-requiem.png', damage: 54, reach: 22 },
  { id: 'sunforgedJudgment', name: 'Sunforged Judgment', kind: 'melee', boss: 14, portrait: 'assets/player/weapons/sunforged-judgment.png', combat: 'assets/player/weapons/sunforged-judgment.png', damage: 68, reach: 26 },
  { id: 'emberStaff', name: 'Emberheart Staff', kind: 'staff', boss: 12, sheet: 'staffs', sheetPath: 'assets/player/weapons/staff.png', sheetDirection: 'horizontal', sheetFrame: 0, sheetFrames: 3, projectileDamage: 86, projectileSpeed: 500, cooldown: 0.72, splashRadius: 54 },
  { id: 'astralStaff', name: 'Astral Bloom Staff', kind: 'staff', boss: 13, sheet: 'staffs', sheetPath: 'assets/player/weapons/staff.png', sheetDirection: 'horizontal', sheetFrame: 1, sheetFrames: 3, projectileDamage: 116, projectileSpeed: 540, cooldown: 0.64, splashRadius: 68 },
  { id: 'worldStaff', name: 'Worldroot Staff', kind: 'staff', boss: 14, sheet: 'staffs', sheetPath: 'assets/player/weapons/staff.png', sheetDirection: 'horizontal', sheetFrame: 2, sheetFrames: 3, projectileDamage: 152, projectileSpeed: 580, cooldown: 0.56, splashRadius: 82 },
  { id: 'thornsilverBlade', name: 'Thornsilver Blade', kind: 'melee', boss: 15, portrait: 'assets/player/weapons/thornsilver-blade.png', combat: 'assets/player/weapons/thornsilver-blade.png', damage: 76, reach: 29 },
  { id: 'glacierBow', name: 'Glacier Arc', kind: 'bow', boss: 16, portrait: 'assets/player/weapons/glacier-bow.png', combat: 'assets/player/weapons/glacier-bow.png', projectileDamage: 82, projectileSpeed: 850, cooldown: 0.44 },
  { id: 'clockworkSpear', name: 'Clockwork Lance', kind: 'melee', boss: 17, portrait: 'assets/player/weapons/clockwork-spear.png', combat: 'assets/player/weapons/clockwork-spear.png', damage: 84, reach: 34 },
  { id: 'crimsonShear', name: 'Crimson Shear', kind: 'melee', boss: 18, portrait: 'assets/player/weapons/crimson-shear.png', combat: 'assets/player/weapons/crimson-shear.png', damage: 92, reach: 31 },
  { id: 'stormglassBow', name: 'Stormglass Bow', kind: 'bow', boss: 21, portrait: 'assets/player/weapons/stormglass-bow.png', combat: 'assets/player/weapons/stormglass-bow.png', projectileDamage: 108, projectileSpeed: 910, cooldown: 0.39 },
  { id: 'gravebloomMaul', name: 'Gravebloom Maul', kind: 'melee', boss: 23, portrait: 'assets/player/weapons/gravebloom-maul.png', combat: 'assets/player/weapons/gravebloom-maul.png', damage: 112, reach: 36 },
  { id: 'lunarGlaive', name: 'Lunar Crescent', kind: 'melee', boss: 24, portrait: 'assets/player/weapons/lunar-glaive.png', combat: 'assets/player/weapons/lunar-glaive.png', damage: 122, reach: 40 },
  { id: 'hourglassStaff', name: 'Hourglass Scepter', kind: 'staff', boss: 25, portrait: 'assets/player/weapons/hourglass-staff.png', combat: 'assets/player/weapons/hourglass-staff.png', projectileDamage: 190, projectileSpeed: 650, cooldown: 0.46, splashRadius: 96 },
  { id: 'eternityGreatsword', name: 'Eternity Greatsword', kind: 'melee', boss: 26, portrait: 'assets/player/weapons/eternity-greatsword.png', combat: 'assets/player/weapons/eternity-greatsword.png', damage: 145, reach: 46 },
];
const starterWeapon = { id: 'starterBlade', name: 'Starter Blade', kind: 'melee', boss: 0, damage: 0, reach: 0 };

let unlockedArmor = new Set(['wayfarer']);
let equippedArmorId = 'wayfarer';
let unlockedWeapons = new Set();
let equippedMeleeWeaponId = 'starterBlade';
let equippedRangedWeaponId = null;
let activeWeaponKind = 'melee';
let pantheonPreviousLoadout = null;
let unseenGear = new Set();
let selectedGender = 'male';
let pendingGearChoice = null;
let movementControlMode = 'wasd';
try {
  movementControlMode = window.localStorage.getItem('endlessDungeonMovementControls') === 'arrows'
    ? 'arrows'
    : 'wasd';
} catch (error) {
  movementControlMode = 'wasd';
}
movementControlSelect.value = movementControlMode;

function updateMovementControlLabels() {
  const label = movementControlMode === 'arrows' ? 'Arrow Keys' : 'WASD';
  activeMovementKeys.textContent = label;
  menuMovementKeys.textContent = `${label}: Move`;
}
updateMovementControlLabels();
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
  const savedMeleeWeapon = window.localStorage.getItem('endlessDungeonEquippedMeleeWeapon');
  const savedRangedWeapon = window.localStorage.getItem('endlessDungeonEquippedRangedWeapon');
  const legacyWeapon = weaponSets.find((weapon) => weapon.id === savedWeapon);
  if (savedMeleeWeapon && unlockedWeapons.has(savedMeleeWeapon)) equippedMeleeWeaponId = savedMeleeWeapon;
  else if (legacyWeapon?.kind === 'melee' && unlockedWeapons.has(legacyWeapon.id)) equippedMeleeWeaponId = legacyWeapon.id;
  if (savedRangedWeapon && unlockedWeapons.has(savedRangedWeapon)) equippedRangedWeaponId = savedRangedWeapon;
  else if (legacyWeapon && legacyWeapon.kind !== 'melee' && unlockedWeapons.has(legacyWeapon.id)) equippedRangedWeaponId = legacyWeapon.id;
  if (window.localStorage.getItem('endlessDungeonActiveWeaponKind') === 'ranged' && equippedRangedWeaponId) {
    activeWeaponKind = 'ranged';
  }
  unseenGear = new Set(JSON.parse(window.localStorage.getItem('endlessDungeonUnseenGear') || '[]'));
  if (window.localStorage.getItem('endlessDungeonWeaponMilestones') !== 'v2') {
    unlockedWeapons.delete('broadSword');
    unlockedWeapons.delete('diamondSword');
    equippedMeleeWeaponId = 'starterBlade';
    activeWeaponKind = 'melee';
    window.localStorage.setItem('endlessDungeonWeaponMilestones', 'v2');
    window.localStorage.setItem('endlessDungeonWeapons', JSON.stringify([...unlockedWeapons]));
    window.localStorage.setItem('endlessDungeonEquippedWeapon', equippedMeleeWeaponId);
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
  const equippedId = activeWeaponKind === 'ranged' ? equippedRangedWeaponId : equippedMeleeWeaponId;
  return weaponSets.find((weapon) => weapon.id === equippedId) || starterWeapon;
}

// Switches instantly between the independently equipped melee and ranged slots.
function toggleWeaponMode() {
  if (!equippedRangedWeaponId || !unlockedWeapons.has(equippedRangedWeaponId)) {
    setMessage('No ranged weapon is equipped yet.');
    return;
  }
  activeWeaponKind = activeWeaponKind === 'melee' ? 'ranged' : 'melee';
  player.attackCooldown = Math.max(player.attackCooldown, 0.12);
  saveArmorCollection();
  setMessage(`${activeWeaponKind === 'ranged' ? 'Ranged' : 'Melee'} weapon ready: ${getEquippedWeapon().name}.`);
}

// Persists unlocked and equipped gear while keeping run-specific choices temporary.
function saveArmorCollection() {
  try {
    window.localStorage.setItem('endlessDungeonArmor', JSON.stringify([...unlockedArmor]));
    window.localStorage.setItem('endlessDungeonEquippedArmor', equippedArmorId);
    window.localStorage.setItem('endlessDungeonWeapons', JSON.stringify([...unlockedWeapons]));
    window.localStorage.setItem('endlessDungeonEquippedMeleeWeapon', equippedMeleeWeaponId);
    if (equippedRangedWeaponId) {
      window.localStorage.setItem('endlessDungeonEquippedRangedWeapon', equippedRangedWeaponId);
    }
    window.localStorage.setItem('endlessDungeonActiveWeaponKind', activeWeaponKind);
    window.localStorage.setItem('endlessDungeonEquippedWeapon', getEquippedWeapon().id);
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

// Extracts one evenly spaced vertical sprite-sheet frame for Armory previews.
function getWeaponPreviewSource(weapon) {
  if (!weapon.sheet) return weapon.portrait;
  const sheet = art[weapon.sheet];
  if (!sheet?.complete || sheet.naturalWidth === 0) {
    const label = weapon.kind === 'staff' ? 'STAFF ART PENDING' : 'BOW ART LOADING';
    return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="256"><rect width="100%" height="100%" fill="#120d1f"/><text x="50%" y="50%" fill="#c4b5fd" font-family="monospace" font-size="28" text-anchor="middle">${label}</text></svg>`)}`;
  }
  const preview = document.createElement('canvas');
  const horizontal = weapon.sheetDirection === 'horizontal';
  const frameWidth = horizontal ? sheet.naturalWidth / weapon.sheetFrames : sheet.naturalWidth;
  const frameHeight = horizontal ? sheet.naturalHeight : sheet.naturalHeight / weapon.sheetFrames;
  preview.width = frameWidth;
  preview.height = frameHeight;
  preview.getContext('2d').drawImage(
    sheet,
    horizontal ? frameWidth * weapon.sheetFrame : 0,
    horizontal ? 0 : frameHeight * weapon.sheetFrame,
    frameWidth,
    frameHeight,
    0,
    0,
    preview.width,
    preview.height,
  );
  return preview.toDataURL('image/png');
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
    : gear.kind === 'melee'
      ? `<strong>Attack damage: +${gear.damage}%</strong><strong>Attack reach: +${gear.reach}</strong>`
      : `<strong>Projectile damage: ${gear.projectileDamage}</strong><strong>Attack rate: ${(1 / gear.cooldown).toFixed(1)} per second</strong>${gear.splashRadius ? `<strong>Blast radius: ${gear.splashRadius}</strong>` : ''}`;
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
    if (gear.kind === 'melee') {
      equippedMeleeWeaponId = gear.id;
      activeWeaponKind = 'melee';
    } else {
      equippedRangedWeaponId = gear.id;
      activeWeaponKind = 'ranged';
    }
  }
  saveArmorCollection();
  closeGearPreview();
  renderArmory();
}

// Rebuilds the armour and weapon grids from the current unlock state.
function renderArmory() {
  armoryArmorLevel.textContent = String(player.armorLevel);
  armoryWeaponLevel.textContent = String(player.weaponLevel);
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
    const weaponPreview = getWeaponPreviewSource(weapon);
    const option = document.createElement('button');
    const equippedInSlot = weapon.kind === 'melee'
      ? equippedMeleeWeaponId === weapon.id
      : equippedRangedWeaponId === weapon.id;
    option.className = `armor-option${unlocked ? '' : ' locked'}${equippedInSlot ? ' selected' : ''}`;
    option.disabled = !unlocked;
    option.innerHTML = `
      ${unseenGear.has(`weapon:${weapon.id}`) ? '<em class="new-gear-label">NEW</em>' : ''}
      <img src="${weaponPreview}" alt="${weapon.name}">
      <strong>${unlocked ? weapon.name : `Defeat Boss ${weapon.boss}`}</strong>
      <span>${weapon.kind === 'melee'
        ? `Damage +${weapon.damage}% · Reach +${weapon.reach}`
        : `${weapon.kind === 'bow' ? 'Bow' : 'Magic staff'} · Damage ${weapon.projectileDamage} · ${(1 / weapon.cooldown).toFixed(1)}/sec`}</span>
    `;
    if (unlocked) option.addEventListener('click', () => showGearPreview('weapon', weapon, weaponPreview));
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
  ammo: document.getElementById('ammoValue'),
  enemy: document.getElementById('enemyValue'),
  crate: document.getElementById('crateValue'),
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
const waveArmoryButton = document.getElementById('waveArmoryButton');
const waveSplashContinuePrompt = waveSplash.querySelector('.continue-prompt');
const highScoreValue = document.getElementById('highScoreValue');
const menuHighScoreValue = document.getElementById('menuHighScoreValue');
let lootHighlightTimer = null;
let deathScreenReady = false;
let pauseKeyboardUnlockAt = 0;

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
let godModeAPresses = [];
const ATTRACT_IDLE_DELAY = 18000;
const ATTRACT_DURATION = 39;
let menuLastActivity = performance.now();
const attractMode = {
  active: false,
  elapsed: 0,
};

const art = {
  roomRuins: new Image(),
  demoRockRoom: new Image(),
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
  lavaSpider: new Image(),
  lavaTank: new Image(),
  oceanMinion: new Image(),
  oceanTank: new Image(),
  oceanHippo: new Image(),
  reefclawCrab: new Image(),
  sunscaleRay: new Image(),
  coralbackTurtle: new Image(),
  tidefangEel: new Image(),
  abyssalRazorfin: new Image(),
  demoChicken: new Image(),
  lushMinion: new Image(),
  lushTank: new Image(),
  lushMossling: new Image(),
  icefangBear: new Image(),
  gravewingRaven: new Image(),
  prismMoth: new Image(),
  lushSporeShroom: new Image(),
  crystalStalker: new Image(),
  glowBat: new Image(),
  crystalMinion: new Image(),
  crystalTank: new Image(),
  crystalLion: new Image(),
  crystalBobcat: new Image(),
  magmaSerpent: new Image(),
  lavaTiger: new Image(),
  lavaEagle: new Image(),
  lavaEagleFlapMiddle: new Image(),
  lavaEagleFlapDown: new Image(),
  dragonBossFlapUp: new Image(),
  dragonBossFlapUpperMiddle: new Image(),
  dragonBossFlapMiddle: new Image(),
  dragonBossFlapLowerMiddle: new Image(),
  dragonBossFlapDown: new Image(),
  dragonBossFire: new Image(),
  dragonRiderFreezeAttack: new Image(),
  dragonRiderIceBolt: new Image(),
  yinYangBoss: new Image(),
  yinYangAttack: new Image(),
  yinYangSword: new Image(),
  yinYangSwordReady: new Image(),
  yinYangSwordOverhead: new Image(),
  yinYangSwordRoundhouse: new Image(),
  yinYangSwordSlam: new Image(),
  crimsonMarionette: new Image(),
  drownedBell: new Image(),
  hollowStar: new Image(),
  inkboundArchivist: new Image(),
  meltedMonarch: new Image(),
  stormglassLeviathan: new Image(),
  clockworkSeraph: new Image(),
  gravebloomColossus: new Image(),
  lunarKitsune: new Image(),
  eternityWarden: new Image(),
  stormglassAttack1: new Image(), stormglassAttack2: new Image(), stormglassAttack3: new Image(),
  clockworkAttack1: new Image(), clockworkAttack2: new Image(), clockworkAttack3: new Image(),
  gravebloomAttack1: new Image(), gravebloomAttack2: new Image(), gravebloomAttack3: new Image(),
  lunarAttack1: new Image(), lunarAttack2: new Image(), lunarAttack3: new Image(),
  eternityAttack1: new Image(), eternityAttack2: new Image(), eternityAttack3: new Image(),
  stormglassArena: new Image(),
  clockworkSeraphArena: new Image(),
  gravebloomArena: new Image(),
  lunarKitsuneArena: new Image(),
  eternityWardenArena: new Image(),
  hollowStarBoss: new Image(),
  hollowStarOverhead1: new Image(),
  hollowStarOverhead2: new Image(),
  hollowStarOverhead3: new Image(),
  hollowStarRoundhouse1: new Image(),
  hollowStarRoundhouse2: new Image(),
  hollowStarRoundhouse3: new Image(),
  hollowStarGroundSlam1: new Image(),
  hollowStarGroundSlam2: new Image(),
  hollowStarGroundSlam3: new Image(),
  inkboundArchivist: new Image(),
  inkboundArchivistBookless: new Image(),
  inkboundQuill1: new Image(),
  inkboundQuill2: new Image(),
  inkboundQuill3: new Image(),
  inkboundSweep1: new Image(),
  inkboundSweep2: new Image(),
  inkboundSweep3: new Image(),
  inkboundDecree1: new Image(),
  inkboundDecree2: new Image(),
  inkboundDecree3: new Image(),
  inkboundBookOpen: new Image(),
  inkboundBookHalf: new Image(),
  inkboundBookClosed: new Image(),
  crimsonMarionette: new Image(),
  crimsonScissor1: new Image(),
  crimsonScissor2: new Image(),
  crimsonScissor3: new Image(),
  crimsonSnare1: new Image(),
  crimsonSnare2: new Image(),
  crimsonSnare3: new Image(),
  crimsonPirouette1: new Image(),
  crimsonPirouette2: new Image(),
  crimsonPirouette3: new Image(),
  crimsonCurtain1: new Image(),
  crimsonCurtain2: new Image(),
  crimsonCurtain3: new Image(),
  meltedMonarch: new Image(),
  meltedCleave1: new Image(),
  meltedCleave2: new Image(),
  meltedCleave3: new Image(),
  meltedCandleburst1: new Image(),
  meltedCandleburst2: new Image(),
  meltedCandleburst3: new Image(),
  meltedMeltdown1: new Image(),
  meltedMeltdown2: new Image(),
  meltedMeltdown3: new Image(),
  waxAcolyte: new Image(),
  drownedBell: new Image(),
  drownedSweep1: new Image(),
  drownedSweep2: new Image(),
  drownedSweep3: new Image(),
  drownedCharge1: new Image(),
  drownedCharge2: new Image(),
  drownedCharge3: new Image(),
  drownedKnell1: new Image(),
  drownedKnell2: new Image(),
  drownedKnell3: new Image(),
  foldedShogun: new Image(),
  foldedCleave1: new Image(), foldedCleave2: new Image(), foldedCleave3: new Image(),
  foldedCyclone1: new Image(), foldedCyclone2: new Image(), foldedCyclone3: new Image(),
  foldedJudgment1: new Image(), foldedJudgment2: new Image(), foldedJudgment3: new Image(),
  yinYangOverhead1: new Image(),
  yinYangOverhead2: new Image(),
  yinYangOverhead3: new Image(),
  yinYangRoundhouse1: new Image(),
  yinYangRoundhouse2: new Image(),
  yinYangRoundhouse3: new Image(),
  yinYangGroundSlam1: new Image(),
  yinYangGroundSlam2: new Image(),
  yinYangGroundSlam3: new Image(),
  frostWraith: new Image(),
  frosthornRam: new Image(),
  frostwingDrake: new Image(),
  boneRaven: new Image(),
  glowBatFlapUp: new Image(),
  glowBatFlapMiddle: new Image(),
  glowBatFlapDown: new Image(),
  voidwingDrakeFlapUp: new Image(),
  voidwingDrakeFlapMiddle: new Image(),
  voidwingDrakeFlapDown: new Image(),
  sunfeatherGriffinFlapUp: new Image(),
  sunfeatherGriffinFlapMiddle: new Image(),
  sunfeatherGriffinFlapDown: new Image(),
  fungalFairyWitchFlapUp: new Image(),
  fungalFairyWitchFlapMiddle: new Image(),
  fungalFairyWitchFlapDown: new Image(),
  frostwingDrakeFlapUp: new Image(),
  frostwingDrakeFlapMiddle: new Image(),
  frostwingDrakeFlapDown: new Image(),
  boneRavenFlapUp: new Image(),
  boneRavenFlapMiddle: new Image(),
  boneRavenFlapDown: new Image(),
  gravewingRavenFlapUp: new Image(),
  gravewingRavenFlapMiddle: new Image(),
  gravewingRavenFlapDown: new Image(),
  prismMothFlapUp: new Image(),
  prismMothFlapMiddle: new Image(),
  prismMothFlapDown: new Image(),
  sunscaleRayFlapUp: new Image(),
  sunscaleRayFlapMiddle: new Image(),
  sunscaleRayFlapDown: new Image(),
  voidSerpent: new Image(),
  voidwingDrake: new Image(),
  sandRoller: new Image(),
  sunfeatherGriffin: new Image(),
  corruptedStag: new Image(),
  fungalOozeSnail: new Image(),
  fungalFairyWitch: new Image(),
  mossboundFungalWarden: new Image(),
  mossboundFungalGuardian: new Image(),
  woodBoss: new Image(),
  woodBossOverhead: new Image(),
  woodAttack: new Image(),
  woodMinion: new Image(),
  woodJaguar: new Image(),
  skeletonBoss: new Image(),
  skeletonBossOverhead: new Image(),
  skeletonMinion: new Image(),
  skeletonTank: new Image(),
  skeletonSpider: new Image(),
  skeletonOrb: new Image(),
  sandBoss: new Image(),
  sandBossOverhead: new Image(),
  shadowBoss: new Image(),
  shadowAttack: new Image(),
  shadowCat: new Image(),
  shadowGator: new Image(),
  shadowRoom: new Image(),
  mechRoom: new Image(),
  abyssBossPhase1: new Image(),
  abyssBossPhase2: new Image(),
  scorpionQueen: new Image(),
  fungalBoss: new Image(),
  mechOverlord: new Image(),
  mechMinion: new Image(),
  mechBear: new Image(),
  crystalBoss: new Image(),
  sandSnake: new Image(),
  crystalAttack: new Image(),
  crystalRoom: new Image(),
  astralRoom: new Image(),
  sunreefRoom: new Image(),
  starlingMarauder: new Image(),
  cometHound: new Image(),
  astralSentinel: new Image(),
  lushCave: new Image(),
  oceanRoom: new Image(),
  lavaRoom: new Image(),
  iceRoom: new Image(),
  skeletonRoom: new Image(),
  sandRoom: new Image(),
  desertMummy: new Image(),
  desertScorpion: new Image(),
  desertArcher: new Image(),
  abyssRoom: new Image(),
  abyssJelly: new Image(),
  abyssSpider: new Image(),
  abyssKnight: new Image(),
  crate: new Image(),
  openCrate: new Image(),
  lushArena: new Image(),
  lavaArena: new Image(),
  oceanArena: new Image(),
  iceArena: new Image(),
  skeletonArena: new Image(),
  sandArena: new Image(),
  shadowArena: new Image(),
  abyssArena: new Image(),
  scorpioArena: new Image(),
  woodArena: new Image(),
  fungalArena: new Image(),
  mechArena: new Image(),
  crystalArena: new Image(),
  dragonArena: new Image(),
  yinYangArena: new Image(),
  crimsonMarionetteArena: new Image(),
  drownedBellArena: new Image(),
  foldedShogunArena: new Image(),
  hollowStarArena: new Image(),
  inkboundArena: new Image(),
  meltedMonarchArena: new Image(),
  hollowStarArena: new Image(),
  inkboundArena: new Image(),
  crimsonMarionetteArena: new Image(),
  meltedMonarchArena: new Image(),
  drownedBellArena: new Image(),
  diamondSword: new Image(),
  broadSword: new Image(),
  thornsilverBlade: new Image(),
  glacierBow: new Image(),
  clockworkSpear: new Image(),
  crimsonShear: new Image(),
  stormglassBow: new Image(),
  gravebloomMaul: new Image(),
  lunarGlaive: new Image(),
  hourglassStaff: new Image(),
  eternityGreatsword: new Image(),
  emeraldSword: new Image(),
  lavaBlade: new Image(),
  frostspire: new Image(),
  worldfireCleaver: new Image(),
  voidRequiem: new Image(),
  sunforgedJudgment: new Image(),
  verdantBow: new Image(),
  tideBow: new Image(),
  cinderBow: new Image(),
  frostBow: new Image(),
  voidBow: new Image(),
  staffs: new Image(),
  protector: new Image(),
  protectorPawSwipe: new Image(),
  protectorBite: new Image(),
  opener: new Image(),
};

// Starts loading every reusable image asset before the animation loop begins.
function preloadArt() {
  const sources = {
    roomRuins: 'assets/themes/retro-ruins/ruins.svg',
    demoRockRoom: 'assets/fan-art/rock-room.png',
    hero: 'assets/player/armor/male-worldforged-portrait.png',
    retroHero: 'assets/themes/retro-ruins/base-hero.svg',
    walker: 'assets/themes/retro-ruins/walker.svg',
    runner: 'assets/themes/retro-ruins/runner.svg',
    brute: 'assets/themes/retro-ruins/brute.svg',
    spitter: 'assets/themes/retro-ruins/spitter.svg',
    assassin: 'assets/themes/retro-ruins/assassin.svg',
    crawler: 'assets/themes/retro-ruins/crawler.svg',
    sentinel: 'assets/themes/retro-ruins/sentinel.svg',
    wraith: 'assets/themes/retro-ruins/wraith.svg',
    burrower: 'assets/themes/retro-ruins/burrower.svg',
    arcaneOrb: 'assets/themes/retro-ruins/arcane-orb.svg',
    reaper: 'assets/themes/retro-ruins/reaper.svg',
    lushGolem: 'assets/themes/verdant-ruins/lush-golem.png',
    lushGolemOverhead: 'assets/themes/verdant-ruins/lush-golem-overhead.png',
    lavaGolem: 'assets/themes/cinder-keep/lava-golem.png',
    lavaGolemOverhead: 'assets/themes/cinder-keep/lava-golem-overhead.png',
    oceanBoss: 'assets/themes/sunken-shrine/ocean-boss.png',
    oceanBossOverhead: 'assets/themes/sunken-shrine/ocean-boss-overhead.png',
    iceBoss: 'assets/themes/frozen-depths/ice-boss-clean-v3.png',
    iceBossOverhead: 'assets/themes/frozen-depths/ice-boss-overhead-clean-v2.png',
    iceMinion: 'assets/themes/frozen-depths/ice-minion.png',
    lavaMinion: 'assets/themes/cinder-keep/lava-minion.png',
    lavaSpider: 'assets/themes/cinder-keep/lava-spider.png',
    lavaTank: 'assets/themes/cinder-keep/lava-tank.png',
    oceanMinion: 'assets/themes/sunken-shrine/ocean-minion.png',
    oceanTank: 'assets/themes/sunken-shrine/ocean-tank.png',
    oceanHippo: 'assets/themes/sunken-shrine/ocean-hippo.png',
    reefclawCrab: 'assets/themes/sunreef-lagoon/reefclaw-crab.png',
    sunscaleRay: 'assets/themes/sunreef-lagoon/sunscale-ray.png',
    coralbackTurtle: 'assets/themes/sunreef-lagoon/coralback-turtle.png',
    tidefangEel: 'assets/themes/sunreef-lagoon/tidefang-eel.png',
    icefangBear: 'assets/themes/frozen-depths/icefang-bear.png',
    gravewingRaven: 'assets/themes/bony-ruins/gravewing-raven.png',
    prismMoth: 'assets/themes/crystal-sanctum/prism-moth.png',
    abyssalRazorfin: 'assets/themes/sunken-shrine/abyssal-razorfin.png',
    frostwingDrake: 'assets/themes/frozen-depths/frostwing-drake.png',
    boneRaven: 'assets/themes/bony-ruins/bone-raven.png',
    glowBatFlapUp: 'assets/themes/verdant-ruins/glow-bat-flap-up.png',
    glowBatFlapMiddle: 'assets/themes/verdant-ruins/glow-bat-flap-middle.png',
    glowBatFlapDown: 'assets/themes/verdant-ruins/glow-bat-flap-down.png',
    voidwingDrakeFlapUp: 'assets/themes/abyssal-depths/voidwing-drake-flap-up.png',
    voidwingDrakeFlapMiddle: 'assets/themes/abyssal-depths/voidwing-drake-flap-middle.png',
    voidwingDrakeFlapDown: 'assets/themes/abyssal-depths/voidwing-drake-flap-down.png',
    sunfeatherGriffinFlapUp: 'assets/themes/desert-ruins/sunfeather-griffin-flap-up.png',
    sunfeatherGriffinFlapMiddle: 'assets/themes/desert-ruins/sunfeather-griffin-flap-middle.png',
    sunfeatherGriffinFlapDown: 'assets/themes/desert-ruins/sunfeather-griffin-flap-down.png',
    fungalFairyWitchFlapUp: 'assets/themes/fungal-dominion/fungal-fairy-witch-flap-up.png',
    fungalFairyWitchFlapMiddle: 'assets/themes/fungal-dominion/fungal-fairy-witch-flap-middle.png',
    fungalFairyWitchFlapDown: 'assets/themes/fungal-dominion/fungal-fairy-witch-flap-down.png',
    frostwingDrakeFlapUp: 'assets/themes/frozen-depths/frostwing-drake-flap-up.png',
    frostwingDrakeFlapMiddle: 'assets/themes/frozen-depths/frostwing-drake-flap-middle.png',
    frostwingDrakeFlapDown: 'assets/themes/frozen-depths/frostwing-drake-flap-down.png',
    boneRavenFlapUp: 'assets/themes/bony-ruins/bone-raven-flap-up.png',
    boneRavenFlapMiddle: 'assets/themes/bony-ruins/bone-raven-flap-middle.png',
    boneRavenFlapDown: 'assets/themes/bony-ruins/bone-raven-flap-down.png',
    gravewingRavenFlapUp: 'assets/themes/bony-ruins/gravewing-raven-flap-up.png',
    gravewingRavenFlapMiddle: 'assets/themes/bony-ruins/gravewing-raven-flap-middle.png',
    gravewingRavenFlapDown: 'assets/themes/bony-ruins/gravewing-raven-flap-down.png',
    prismMothFlapUp: 'assets/themes/crystal-sanctum/prism-moth-flap-up.png',
    prismMothFlapMiddle: 'assets/themes/crystal-sanctum/prism-moth-flap-middle.png',
    prismMothFlapDown: 'assets/themes/crystal-sanctum/prism-moth-flap-down.png',
    sunscaleRayFlapUp: 'assets/themes/sunreef-lagoon/sunscale-ray-flap-up.png',
    sunscaleRayFlapMiddle: 'assets/themes/sunreef-lagoon/sunscale-ray-flap-middle.png',
    sunscaleRayFlapDown: 'assets/themes/sunreef-lagoon/sunscale-ray-flap-down.png',
    abyssalRazorfin: 'assets/themes/sunken-shrine/abyssal-razorfin.png',
    demoChicken: 'assets/fan-art/crazy-sunfeather-chicken.png',
    lushMinion: 'assets/themes/verdant-ruins/lush-minion.png',
    lushTank: 'assets/themes/verdant-ruins/lush-tank.png',
    lushMossling: 'assets/themes/verdant-ruins/lush-mossling.png',
    icefangBear: 'assets/themes/frozen-depths/icefang-bear.png',
    gravewingRaven: 'assets/themes/bony-ruins/gravewing-raven.png',
    prismMoth: 'assets/themes/crystal-sanctum/prism-moth.png',
    lushSporeShroom: 'assets/themes/verdant-ruins/lush-spore-shroom.png',
    crystalStalker: 'assets/themes/verdant-ruins/lush-crystal-stalker.png',
    glowBat: 'assets/themes/verdant-ruins/glow-bat.png',
    crystalMinion: 'assets/themes/crystal-sanctum/crystal-minion.png',
    crystalTank: 'assets/themes/crystal-sanctum/crystal-tank.png',
    crystalLion: 'assets/themes/crystal-sanctum/crystal-lion.png',
    crystalBobcat: 'assets/themes/crystal-sanctum/crystal-bobcat.png',
    magmaSerpent: 'assets/themes/cinder-keep/magma-serpent.png',
    lavaTiger: 'assets/themes/cinder-keep/lava-tiger.png',
    lavaEagle: 'assets/themes/cinder-keep/lava eagle.png',
    lavaEagleFlapMiddle: 'assets/themes/cinder-keep/lava-eagle-flap-middle.png',
    lavaEagleFlapDown: 'assets/themes/cinder-keep/lava-eagle-flap-down.png',
    dragonBossFlapUp: 'assets/themes/dragon/dragon-boss-flap-up.png',
    dragonBossFlapUpperMiddle: 'assets/themes/dragon/dragon-boss-flap-upper-middle.png',
    dragonBossFlapMiddle: 'assets/themes/dragon/dragon-boss-flap-middle.png',
    dragonBossFlapLowerMiddle: 'assets/themes/dragon/dragon-boss-flap-lower-middle.png',
    dragonBossFlapDown: 'assets/themes/dragon/dragon-boss-flap-down.png',
    dragonBossFire: 'assets/themes/dragon/dragon-boss-fire-attack.png',
    dragonRiderFreezeAttack: 'assets/themes/dragon/dragon-rider-freeze-attack.png',
    dragonRiderIceBolt: 'assets/themes/dragon/dragon-rider-ice-bolt.png',
    yinYangBoss: 'assets/themes/yin-yang/yin-yang-boss-angled.png',
    yinYangAttack: 'assets/themes/yin-yang/yin-yang-attack-clean.png',
    yinYangSword: 'assets/themes/yin-yang/yin-yang-sword-clean.png',
    yinYangSwordReady: 'assets/themes/yin-yang/yin-yang-boss-sword-ready.png',
    yinYangSwordOverhead: 'assets/themes/yin-yang/yin-yang-boss-sword-overhead.png',
    yinYangSwordRoundhouse: 'assets/themes/yin-yang/yin-yang-boss-sword-roundhouse.png',
    yinYangSwordSlam: 'assets/themes/yin-yang/yin-yang-boss-sword-slam.png',
    crimsonMarionette: 'assets/themes/crimson-marionette/crimson-marionette.png',
    drownedBell: 'assets/themes/drowned-bell/drowned-bell.png',
    hollowStar: 'assets/themes/hollow-star/hollow-star-boss.png',
    inkboundArchivist: 'assets/themes/inkbound-archive/inkbound-archivist.png',
    meltedMonarch: 'assets/themes/melted-monarch/melted-monarch.png',
    stormglassLeviathan: 'assets/themes/stormglass-leviathan/stormglass-leviathan.png',
    clockworkSeraph: 'assets/themes/clockwork-seraph/clockwork-seraph.png',
    gravebloomColossus: 'assets/themes/gravebloom-colossus/gravebloom-colossus.png',
    lunarKitsune: 'assets/themes/lunar-kitsune/lunar-kitsune.png',
    eternityWarden: 'assets/themes/eternity-warden/eternity-warden.png',
    stormglassAttack1: 'assets/themes/stormglass-leviathan/stormglass-attack-1.png',
    stormglassAttack2: 'assets/themes/stormglass-leviathan/stormglass-attack-2.png',
    stormglassAttack3: 'assets/themes/stormglass-leviathan/stormglass-attack-3.png',
    clockworkAttack1: 'assets/themes/clockwork-seraph/clockwork-attack-1.png',
    clockworkAttack2: 'assets/themes/clockwork-seraph/clockwork-attack-2.png',
    clockworkAttack3: 'assets/themes/clockwork-seraph/clockwork-attack-3.png',
    gravebloomAttack1: 'assets/themes/gravebloom-colossus/gravebloom-attack-1.png',
    gravebloomAttack2: 'assets/themes/gravebloom-colossus/gravebloom-attack-2.png',
    gravebloomAttack3: 'assets/themes/gravebloom-colossus/gravebloom-attack-3.png',
    lunarAttack1: 'assets/themes/lunar-kitsune/lunar-attack-1.png',
    lunarAttack2: 'assets/themes/lunar-kitsune/lunar-attack-2.png',
    lunarAttack3: 'assets/themes/lunar-kitsune/lunar-attack-3.png',
    eternityAttack1: 'assets/themes/eternity-warden/eternity-attack-1.png',
    eternityAttack2: 'assets/themes/eternity-warden/eternity-attack-2.png',
    eternityAttack3: 'assets/themes/eternity-warden/eternity-attack-3.png',
    stormglassArena: 'assets/themes/stormglass-leviathan/stormglass-arena.png',
    clockworkSeraphArena: 'assets/themes/clockwork-seraph/clockwork-arena.png',
    gravebloomArena: 'assets/themes/gravebloom-colossus/gravebloom-arena.png',
    lunarKitsuneArena: 'assets/themes/lunar-kitsune/lunar-arena.png',
    eternityWardenArena: 'assets/themes/eternity-warden/eternity-arena.png',
    hollowStarBoss: 'assets/themes/hollow-star/hollow-star-boss.png',
    hollowStarOverhead1: 'assets/themes/hollow-star/hollow-star-overhead-1.png',
    hollowStarOverhead2: 'assets/themes/hollow-star/hollow-star-overhead-2.png',
    hollowStarOverhead3: 'assets/themes/hollow-star/hollow-star-overhead-3.png',
    hollowStarRoundhouse1: 'assets/themes/hollow-star/hollow-star-roundhouse-1.png',
    hollowStarRoundhouse2: 'assets/themes/hollow-star/hollow-star-roundhouse-2.png',
    hollowStarRoundhouse3: 'assets/themes/hollow-star/hollow-star-roundhouse-3.png',
    hollowStarGroundSlam1: 'assets/themes/hollow-star/hollow-star-ground-slam-1.png',
    hollowStarGroundSlam2: 'assets/themes/hollow-star/hollow-star-ground-slam-2.png',
    hollowStarGroundSlam3: 'assets/themes/hollow-star/hollow-star-ground-slam-3.png',
    inkboundArchivist: 'assets/themes/inkbound-archive/inkbound-archivist.png',
    inkboundArchivistBookless: 'assets/themes/inkbound-archive/inkbound-archivist-bookless.png',
    inkboundQuill1: 'assets/themes/inkbound-archive/inkbound-quill-1.png',
    inkboundQuill2: 'assets/themes/inkbound-archive/inkbound-quill-2.png',
    inkboundQuill3: 'assets/themes/inkbound-archive/inkbound-quill-3.png',
    inkboundSweep1: 'assets/themes/inkbound-archive/inkbound-sweep-1.png',
    inkboundSweep2: 'assets/themes/inkbound-archive/inkbound-sweep-2.png',
    inkboundSweep3: 'assets/themes/inkbound-archive/inkbound-sweep-3.png',
    inkboundDecree1: 'assets/themes/inkbound-archive/inkbound-decree-1.png',
    inkboundDecree2: 'assets/themes/inkbound-archive/inkbound-decree-2.png',
    inkboundDecree3: 'assets/themes/inkbound-archive/inkbound-decree-3.png',
    inkboundBookOpen: 'assets/themes/inkbound-archive/inkbound-book-1.png',
    inkboundBookHalf: 'assets/themes/inkbound-archive/inkbound-book-2.png',
    inkboundBookClosed: 'assets/themes/inkbound-archive/inkbound-book-3.png',
    crimsonMarionette: 'assets/themes/crimson-marionette/crimson-marionette.png',
    crimsonScissor1: 'assets/themes/crimson-marionette/crimson-scissor-1.png',
    crimsonScissor2: 'assets/themes/crimson-marionette/crimson-scissor-2.png',
    crimsonScissor3: 'assets/themes/crimson-marionette/crimson-scissor-3.png',
    crimsonSnare1: 'assets/themes/crimson-marionette/crimson-snare-1.png',
    crimsonSnare2: 'assets/themes/crimson-marionette/crimson-snare-2.png',
    crimsonSnare3: 'assets/themes/crimson-marionette/crimson-snare-3.png',
    crimsonPirouette1: 'assets/themes/crimson-marionette/crimson-pirouette-1.png',
    crimsonPirouette2: 'assets/themes/crimson-marionette/crimson-pirouette-2.png',
    crimsonPirouette3: 'assets/themes/crimson-marionette/crimson-pirouette-3.png',
    crimsonCurtain1: 'assets/themes/crimson-marionette/crimson-curtain-1.png',
    crimsonCurtain2: 'assets/themes/crimson-marionette/crimson-curtain-2.png',
    crimsonCurtain3: 'assets/themes/crimson-marionette/crimson-curtain-3.png',
    meltedMonarch: 'assets/themes/melted-monarch/melted-monarch.png',
    meltedCleave1: 'assets/themes/melted-monarch/melted-cleave-1.png',
    meltedCleave2: 'assets/themes/melted-monarch/melted-cleave-2.png',
    meltedCleave3: 'assets/themes/melted-monarch/melted-cleave-3.png',
    meltedCandleburst1: 'assets/themes/melted-monarch/melted-candleburst-1.png',
    meltedCandleburst2: 'assets/themes/melted-monarch/melted-candleburst-2.png',
    meltedCandleburst3: 'assets/themes/melted-monarch/melted-candleburst-3.png',
    meltedMeltdown1: 'assets/themes/melted-monarch/melted-meltdown-1.png',
    meltedMeltdown2: 'assets/themes/melted-monarch/melted-meltdown-2.png',
    meltedMeltdown3: 'assets/themes/melted-monarch/melted-meltdown-3.png',
    waxAcolyte: 'assets/themes/melted-monarch/wax-acolyte.png',
    drownedBell: 'assets/themes/drowned-bell/drowned-bell.png',
    drownedSweep1: 'assets/themes/drowned-bell/drowned-sweep-1.png',
    drownedSweep2: 'assets/themes/drowned-bell/drowned-sweep-2.png',
    drownedSweep3: 'assets/themes/drowned-bell/drowned-sweep-3.png',
    drownedCharge1: 'assets/themes/drowned-bell/drowned-charge-1.png',
    drownedCharge2: 'assets/themes/drowned-bell/drowned-charge-2.png',
    drownedCharge3: 'assets/themes/drowned-bell/drowned-charge-3.png',
    drownedKnell1: 'assets/themes/drowned-bell/drowned-knell-1.png',
    drownedKnell2: 'assets/themes/drowned-bell/drowned-knell-2.png',
    drownedKnell3: 'assets/themes/drowned-bell/drowned-knell-3.png',
    foldedShogun: 'assets/themes/folded-shogun/folded-shogun.png',
    foldedCleave1: 'assets/themes/folded-shogun/folded-cleave-1.png', foldedCleave2: 'assets/themes/folded-shogun/folded-cleave-2.png', foldedCleave3: 'assets/themes/folded-shogun/folded-cleave-3.png',
    foldedCyclone1: 'assets/themes/folded-shogun/folded-cyclone-1.png', foldedCyclone2: 'assets/themes/folded-shogun/folded-cyclone-2.png', foldedCyclone3: 'assets/themes/folded-shogun/folded-cyclone-3.png',
    foldedJudgment1: 'assets/themes/folded-shogun/folded-judgment-1.png', foldedJudgment2: 'assets/themes/folded-shogun/folded-judgment-2.png', foldedJudgment3: 'assets/themes/folded-shogun/folded-judgment-3.png',
    yinYangOverhead1: 'assets/themes/yin-yang/yin-yang-overhead-1.png',
    yinYangOverhead2: 'assets/themes/yin-yang/yin-yang-overhead-2.png',
    yinYangOverhead3: 'assets/themes/yin-yang/yin-yang-overhead-3.png',
    yinYangRoundhouse1: 'assets/themes/yin-yang/yin-yang-roundhouse-1.png',
    yinYangRoundhouse2: 'assets/themes/yin-yang/yin-yang-roundhouse-2.png',
    yinYangRoundhouse3: 'assets/themes/yin-yang/yin-yang-roundhouse-3.png',
    yinYangGroundSlam1: 'assets/themes/yin-yang/yin-yang-ground-slam-1.png',
    yinYangGroundSlam2: 'assets/themes/yin-yang/yin-yang-ground-slam-2.png',
    yinYangGroundSlam3: 'assets/themes/yin-yang/yin-yang-ground-slam-3.png',
    frostWraith: 'assets/themes/frozen-depths/frost-wraith.png',
    frosthornRam: 'assets/themes/frozen-depths/frosthorn-ram.png',
    frostwingDrake: 'assets/themes/frozen-depths/frostwing-drake.png',
    boneRaven: 'assets/themes/bony-ruins/bone-raven.png',
    voidSerpent: 'assets/themes/abyssal-depths/void-serpent.png',
    voidwingDrake: 'assets/themes/abyssal-depths/voidwing-drake.png',
    sandRoller: 'assets/themes/desert-ruins/sand-roller.png',
    sunfeatherGriffin: 'assets/themes/desert-ruins/sunfeather-griffin.png',
    corruptedStag: 'assets/themes/fungal-dominion/corrupted-stag.png',
    fungalOozeSnail: 'assets/themes/fungal-dominion/Fungal Ooze Snail.png',
    fungalFairyWitch: 'assets/themes/fungal-dominion/Fungal Fairy Witch.png',
    mossboundFungalWarden: 'assets/themes/fungal-dominion/Mossbound Fungal Warden.png',
    mossboundFungalGuardian: 'assets/themes/fungal-dominion/mossbound-fungal-guardian-clean.png',
    mechMinion: 'assets/themes/furnace-foundry/furnace-sentinel.png',
    woodBoss: 'assets/themes/moonwood/wood-boss.png',
    woodBossOverhead: 'assets/themes/moonwood/wood-boss-overhead.png',
    woodAttack: 'assets/themes/moonwood/wood-attack.png?v=2',
    woodMinion: 'assets/themes/moonwood/wood-minion.png',
    woodJaguar: 'assets/themes/moonwood/wood jaguar.png',
    skeletonBoss: 'assets/themes/bony-ruins/skeleton-warlord.png',
    skeletonBossOverhead: 'assets/themes/bony-ruins/skeleton-warlord-overhead.png',
    skeletonMinion: 'assets/themes/bony-ruins/skeleton-minion.png',
    skeletonTank: 'assets/themes/bony-ruins/skeleton-tank.png',
    skeletonSpider: 'assets/themes/bony-ruins/skeleton-spider.png',
    skeletonOrb: 'assets/themes/bony-ruins/skeleton-orb.png',
    sandBoss: 'assets/themes/desert-ruins/sand-tyrant.png',
    sandBossOverhead: 'assets/themes/desert-ruins/sand-tyrant-overhead.png',
    shadowBoss: 'assets/themes/shadow-realm/shadow-boss.png',
    shadowAttack: 'assets/themes/shadow-realm/shadow-attack.png',
    shadowCat: 'assets/themes/shadow-realm/shadow-cat.png',
    shadowGator: 'assets/themes/shadow-realm/shadow-gator.png',
    shadowRoom: 'assets/themes/shadow-realm/shadow-room.png',
    mechRoom: 'assets/themes/furnace-foundry/mech-room.png',
    abyssBossPhase1: 'assets/themes/abyssal-depths/abyss-boss-phase-1.png',
    abyssBossPhase2: 'assets/themes/abyssal-depths/abyss-boss-phase-2.png',
    scorpionQueen: 'assets/themes/desert-ruins/scorpion-queen.png',
    fungalBoss: 'assets/themes/fungal-dominion/mycelial-sovereign.png',
    mechOverlord: 'assets/themes/furnace-foundry/mech-boss.png',
    mechBear: 'assets/themes/furnace-foundry/mech-bear.png',
    crystalBoss: 'assets/themes/crystal-sanctum/crystal-guardian.png',
    sandSnake: 'assets/themes/desert-ruins/sand-snake.png',
    crystalAttack: 'assets/themes/crystal-sanctum/crystal-eruption.png',
    crystalRoom: 'assets/themes/crystal-sanctum/crystal-room.png',
    astralRoom: 'assets/themes/astral-foundry/astral-room.png',
    sunreefRoom: 'assets/themes/sunreef-lagoon/sunreef-room.png',
    starlingMarauder: 'assets/themes/astral-foundry/starling-marauder.png',
    cometHound: 'assets/themes/astral-foundry/comet-hound.png',
    astralSentinel: 'assets/themes/astral-foundry/astral-sentinel.png',
    lushCave: 'assets/themes/verdant-ruins/lush-cave.png',
    oceanRoom: 'assets/themes/sunken-shrine/ocean-room.png',
    lavaRoom: 'assets/themes/cinder-keep/lava-room.png',
    iceRoom: 'assets/themes/frozen-depths/ice-room.png',
    skeletonRoom: 'assets/themes/bony-ruins/skeleton-room.png',
    sandRoom: 'assets/themes/desert-ruins/sand-room.png',
    desertMummy: 'assets/themes/desert-ruins/desert-mummy.png',
    desertScorpion: 'assets/themes/desert-ruins/desert-scorpion.png',
    desertArcher: 'assets/themes/desert-ruins/desert-archer.png',
    abyssRoom: 'assets/themes/abyssal-depths/abyss-room.png',
    abyssJelly: 'assets/themes/abyssal-depths/abyss-jelly.png',
    abyssSpider: 'assets/themes/abyssal-depths/abyss-spider.png',
    abyssKnight: 'assets/themes/abyssal-depths/abyss-knight.png',
    abyssArena: 'assets/themes/abyssal-depths/abyss-arena-clean.png',
    scorpioArena: 'assets/themes/desert-ruins/scorpio-arena.png',
    woodArena: 'assets/themes/moonwood/wood-arena.png?v=2',
    fungalArena: 'assets/themes/fungal-dominion/fungal-arena.png',
    mechArena: 'assets/themes/furnace-foundry/mech-arena.png',
    crystalArena: 'assets/themes/crystal-sanctum/crystal-arena.png',
    dragonArena: 'assets/themes/dragon/dragon-arena.png',
    yinYangArena: 'assets/themes/yin-yang/ying yang arena.png',
    crimsonMarionetteArena: 'assets/themes/crimson-marionette/crimson-marionette-arena.png',
    drownedBellArena: 'assets/themes/drowned-bell/drowned-bell-arena.png',
    foldedShogunArena: 'assets/themes/folded-shogun/folded-shogun-arena.png',
    hollowStarArena: 'assets/themes/hollow-star/hollow-star-arena.png',
    inkboundArena: 'assets/themes/inkbound-archive/inkbound-arena.png',
    meltedMonarchArena: 'assets/themes/melted-monarch/melted-monarch-arena.png',
    hollowStarArena: 'assets/themes/hollow-star/hollow-star-arena.png',
    inkboundArena: 'assets/themes/inkbound-archive/inkbound-arena.png',
    crimsonMarionetteArena: 'assets/themes/crimson-marionette/crimson-marionette-arena.png',
    meltedMonarchArena: 'assets/themes/melted-monarch/melted-monarch-arena.png',
    drownedBellArena: 'assets/themes/drowned-bell/drowned-bell-arena.png',
    crate: 'assets/props/crate-closed.png',
    openCrate: 'assets/props/crate-open.png',
    lushArena: 'assets/themes/verdant-ruins/lush-arena.png',
    lavaArena: 'assets/themes/cinder-keep/lava-arena.png',
    oceanArena: 'assets/themes/sunken-shrine/ocean-arena.png',
    iceArena: 'assets/themes/frozen-depths/ice-arena.png',
    skeletonArena: 'assets/themes/bony-ruins/skeleton-arena.png',
    shadowArena: 'assets/themes/shadow-realm/shadow-arena.png',
    sandArena: 'assets/themes/desert-ruins/sand-arena.png',
    diamondSword: 'assets/player/weapons/diamond-sword-combat.png',
    thornsilverBlade: 'assets/player/weapons/thornsilver-blade.png',
    glacierBow: 'assets/player/weapons/glacier-bow.png',
    clockworkSpear: 'assets/player/weapons/clockwork-spear.png',
    crimsonShear: 'assets/player/weapons/crimson-shear.png',
    stormglassBow: 'assets/player/weapons/stormglass-bow.png',
    gravebloomMaul: 'assets/player/weapons/gravebloom-maul.png',
    lunarGlaive: 'assets/player/weapons/lunar-glaive.png',
    hourglassStaff: 'assets/player/weapons/hourglass-staff.png',
    eternityGreatsword: 'assets/player/weapons/eternity-greatsword.png',
    broadSword: 'assets/player/weapons/broad-sword.png',
    emeraldSword: 'assets/player/weapons/emerald-sword-combat.png',
    lavaBlade: 'assets/player/weapons/lava-blade-combat.png',
    frostspire: 'assets/player/weapons/frostspire.png',
    worldfireCleaver: 'assets/player/weapons/worldfire-cleaver.png',
    voidRequiem: 'assets/player/weapons/void-requiem.png',
    sunforgedJudgment: 'assets/player/weapons/sunforged-judgment.png',
    verdantBow: 'assets/player/weapons/bow-01.png',
    tideBow: 'assets/player/weapons/bow-02.png',
    cinderBow: 'assets/player/weapons/bow-03.png',
    frostBow: 'assets/player/weapons/bow-04.png',
    voidBow: 'assets/player/weapons/bow-05.png',
    staffs: 'assets/player/weapons/staff.png',
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
  frozenTimer: 0,
  attackCooldown: 0,
  attackDuration: 0,
  poisonTimer: 0,
  poisonDps: 0,
  facing: { x: 1, y: 0 },
  visualFacingX: 1,
  inventory: {
    bandage: 0,
    ammo: 0,
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
      name: 'Frozen Depths',
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
    {
      name: 'Desert Ruins',
      bg: '#2b1908',
      room: '#a96824',
      accent: '#fde68a',
      floor: '#d79a3f',
      wall: '#5b3211',
      glow: '#fbbf24',
      shadow: '#170b03',
    },
    {
      name: 'Abyssal Depths',
      bg: '#050818',
      room: '#182b4d',
      accent: '#67e8f9',
      floor: '#1f4970',
      wall: '#080d20',
      glow: '#22d3ee',
      shadow: '#02030b',
    },
    {
      name: 'Crystal Sanctum',
      bg: '#071827',
      room: '#17435a',
      accent: '#67e8f9',
      floor: '#246987',
      wall: '#0b2638',
      glow: '#a5f3fc',
      shadow: '#030a12',
    },
    {
      name: 'Astral Foundry',
      bg: '#05071c',
      room: '#172554',
      accent: '#67e8f9',
      floor: '#263b70',
      wall: '#0b102c',
      glow: '#fde68a',
      shadow: '#02030d',
    },
    {
      name: 'Sunreef Lagoon',
      bg: '#063f46',
      room: '#39c6bd',
      accent: '#fde68a',
      floor: '#79ded0',
      wall: '#176b70',
      glow: '#fbbf24',
      shadow: '#032f35',
    },
  ],
};

const state = {
  wave: 1,
  score: 0,
  maxRooms: 8,
  enemies: [],
  crates: [],
  pendingBossCrates: 0,
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
  enemyProjectiles: [],
  playerProjectiles: [],
  started: false,
  paused: false,
  shake: 0,
  hitStopTimer: 0,
  teleportTimer: 0,
  teleportDuration: 3,
  teleportMoved: false,
  teleportTarget: null,
  transitionStyle: 'teleport',
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
  godMode: false,
  godTravelMode: null,
  forcedThemeIndex: null,
  forcedEnemyType: null,
  forcedBossVariant: null,
  pantheonMode: false,
  pantheonBosses: [],
  pantheonGroupRewarded: false,
  pantheonFinalTrial: false,
  pantheonFinalBatch: 0,
  pantheonEscapeArmedUntil: 0,
  forcedRoomArtwork: null,
};

// Displays a short gameplay notification, optionally with a critical flash.
function setMessage(text, critical = false) {
  messageBox.textContent = text;
  messageBox.classList.toggle('critical-warning', critical);
  messageBox.classList.remove('hidden');
}

// Briefly freezes simulation on strong impacts while rendering the hit frame.
function triggerHitStop(duration = 0.045) {
  state.hitStopTimer = Math.max(state.hitStopTimer, duration);
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

function getDesertEnemyVariant(type) {
  if (type === 'crawler' || type === 'burrower') return 'desertScorpion';
  if (['brute', 'sentinel', 'reaper'].includes(type)) return 'desertMummy';
  return 'desertArcher';
}

function getAbyssEnemyVariant(type) {
  if (type === 'crawler' || type === 'burrower') return 'abyssSpider';
  if (['runner', 'spitter', 'wraith', 'arcaneOrb'].includes(type)) return 'abyssJelly';
  return 'abyssKnight';
}

const baseEnemyTypes = new Set([
  'walker', 'runner', 'crawler', 'spitter', 'burrower', 'arcaneOrb',
  'brute', 'assassin', 'sentinel', 'wraith', 'reaper',
]);

// Gives each purpose-built creature a real combat signature rather than a
// cosmetic trait label. Ranged and charge-up specialists keep their dedicated
// handlers; these profiles drive contact reach, timing, impact, and recovery.
const enemyMeleeProfiles = {
  lushMinion: { attackName: 'Thorn Bite', reach: 58, cooldown: 0.72, lunge: 42, damageScale: 0.92, staminaDrain: 6, retreat: 0.34, color: '#4ade80', shake: 5 },
  lushTank: { attackName: 'Mossback Swipe', reach: 82, cooldown: 1.42, lunge: 24, damageScale: 1.32, staminaDrain: 14, retreat: 0.22, color: '#84cc16', shake: 10 },
  lushMossling: { attackName: 'Crystal Pounce', reach: 62, cooldown: 0.68, lunge: 48, lunges: true, damageScale: 0.9, staminaDrain: 10, retreat: 0.3, color: '#4ade80', shake: 5 },
  lavaMinion: { attackName: 'Cinder Bite', reach: 62, cooldown: 0.7, lunge: 46, damageScale: 1, retreat: 0.3, color: '#f97316', shake: 6 },
  lavaSpider: { attackName: 'Magma Fang Lunge', reach: 76, cooldown: 0.84, lunge: 62, lunges: true, damageScale: 1.08, staminaDrain: 8, retreat: 0.4, color: '#fb923c', shake: 7 },
  lavaTiger: { attackName: 'Furnace Pounce', reach: 116, cooldown: 0.88, lunge: 104, lunges: true, damageScale: 1.22, staminaDrain: 16, retreat: 0.44, color: '#f97316', shake: 9 },
  lavaEagle: { attackName: 'Cinder Dive', reach: 104, cooldown: 0.9, lunge: 92, lunges: true, damageScale: 1.12, staminaDrain: 12, retreat: 0.5, color: '#fb923c', shake: 8 },
  lavaTank: { attackName: 'Obsidian Swipe', reach: 86, cooldown: 1.5, lunge: 28, damageScale: 1.4, staminaDrain: 16, retreat: 0.22, color: '#ef4444', shake: 11 },
  oceanMinion: { attackName: 'Riptide Lunge', reach: 66, cooldown: 0.76, lunge: 54, damageScale: 0.95, hydrationDrain: 5, retreat: 0.38, color: '#22d3ee', shake: 5 },
  oceanTank: { attackName: 'Reefbreaker Swipe', reach: 88, cooldown: 1.48, lunge: 30, damageScale: 1.38, staminaDrain: 16, retreat: 0.22, color: '#38bdf8', shake: 11 },
  iceMinion: { attackName: 'Frostbite Lunge', reach: 68, cooldown: 0.82, lunge: 52, damageScale: 1.02, staminaDrain: 10, retreat: 0.38, color: '#dbeafe', shake: 6 },
  skeletonMinion: { attackName: 'Boneblade Swipe', reach: 64, cooldown: 0.78, lunge: 38, damageScale: 1.02, retreat: 0.3, color: '#e5e7eb', shake: 6 },
  skeletonTank: { attackName: 'Ossuary Crush', reach: 86, cooldown: 1.55, lunge: 26, damageScale: 1.42, staminaDrain: 18, retreat: 0.2, color: '#f8fafc', shake: 12 },
  skeletonSpider: { attackName: 'Marrow Bite', reach: 74, cooldown: 0.76, lunge: 58, damageScale: 1.05, staminaDrain: 7, retreat: 0.42, color: '#cbd5e1', shake: 6 },
  desertMummy: { attackName: 'Cursebound Swipe', reach: 78, cooldown: 1.18, lunge: 32, damageScale: 1.22, staminaDrain: 12, retreat: 0.25, color: '#fbbf24', shake: 8 },
  desertScorpion: { attackName: 'Stinger Lunge', reach: 84, cooldown: 0.92, lunge: 64, lunges: true, damageScale: 1.12, staminaDrain: 10, retreat: 0.44, color: '#f59e0b', shake: 7 },
  abyssJelly: { attackName: 'Void Pulse', reach: 74, cooldown: 1.05, lunge: 34, damageScale: 0.9, hydrationDrain: 8, retreat: 0.5, color: '#38bdf8', shake: 5 },
  abyssSpider: { attackName: 'Riftfang Bite', reach: 78, cooldown: 0.74, lunge: 66, lunges: true, damageScale: 1.08, hydrationDrain: 6, retreat: 0.46, color: '#6366f1', shake: 7 },
  abyssKnight: { attackName: 'Abyssal Cleave', reach: 88, cooldown: 1.28, lunge: 40, damageScale: 1.3, staminaDrain: 14, retreat: 0.26, color: '#0ea5e9', shake: 10 },
  crystalMinion: { attackName: 'Gemclaw Swipe', reach: 70, cooldown: 1.05, lunge: 34, damageScale: 1.12, staminaDrain: 10, retreat: 0.28, color: '#22d3ee', shake: 7 },
  crystalTank: { attackName: 'Prism Crush', reach: 88, cooldown: 1.55, lunge: 26, damageScale: 1.38, staminaDrain: 18, retreat: 0.24, color: '#8b5cf6', shake: 11 },
  crystalLion: { reach: 104, cooldown: 0.92, lunge: 88, lunges: true, damageScale: 1.15, staminaDrain: 14, retreat: 0.38, color: '#60a5fa', shake: 8 },
  crystalBobcat: { reach: 128, cooldown: 0.64, lunge: 116, lunges: true, damageScale: 0.92, staminaDrain: 8, retreat: 0.55, color: '#a78bfa', shake: 6 },
  shadowCat: { reach: 118, cooldown: 0.76, lunge: 108, lunges: true, damageScale: 1.05, staminaDrain: 12, retreat: 0.48, color: '#c084fc', shake: 7 },
  shadowGator: { reach: 104, cooldown: 1.32, lunge: 86, lunges: true, damageScale: 1.25, hydrationDrain: 15, retreat: 0.34, color: '#7e22ce', shake: 9 },
  mechBear: { reach: 96, cooldown: 1.48, lunge: 72, lunges: true, damageScale: 1.35, staminaDrain: 20, retreat: 0.3, color: '#f59e0b', shake: 11 },
  oceanHippo: { reach: 112, cooldown: 1.62, lunge: 94, lunges: true, damageScale: 1.4, staminaDrain: 24, hydrationDrain: 12, retreat: 0.28, color: '#22d3ee', shake: 13 },
  reefclawCrab: { attackName: 'Reefcrusher Claw', reach: 96, cooldown: 1.5, lunge: 34, damageScale: 1.35, hydrationDrain: 10, retreat: 0.24, color: '#2dd4bf', shake: 11 },
  sunscaleRay: { attackName: 'Sunflash Dive', reach: 104, cooldown: 0.82, lunge: 92, lunges: true, damageScale: 1.06, retreat: 0.52, color: '#fbbf24', shake: 7 },
  coralbackTurtle: { attackName: 'Reefbreaker Ram', reach: 108, cooldown: 1.65, lunge: 58, lunges: true, damageScale: 1.45, staminaDrain: 24, retreat: 0.26, color: '#14b8a6', shake: 13 },
  tidefangEel: { attackName: 'Riptide Bite', reach: 94, cooldown: 0.78, lunge: 82, lunges: true, damageScale: 1.12, hydrationDrain: 8, retreat: 0.48, color: '#22d3ee', shake: 8 },
  icefangBear: { attackName: 'Glacier Maul', reach: 104, cooldown: 1.28, lunge: 68, lunges: true, damageScale: 1.3, staminaDrain: 18, freezeDuration: 0.65, retreat: 0.34, color: '#bae6fd', shake: 11 },
  gravewingRaven: { attackName: 'Soul Dive', reach: 98, cooldown: 0.86, lunge: 88, lunges: true, damageScale: 1.08, retreat: 0.5, color: '#67e8f9', shake: 7 },
  prismMoth: { attackName: 'Facet Dive', reach: 94, cooldown: 0.9, lunge: 82, lunges: true, damageScale: 1.1, staminaDrain: 10, retreat: 0.48, color: '#c084fc', shake: 7 },
  frostWraith: { reach: 74, cooldown: 0.82, lunge: 58, damageScale: 0.92, staminaDrain: 15, retreat: 0.42, color: '#bfdbfe', shake: 6 },
  voidSerpent: { attackName: 'Venom Bite', reach: 82, cooldown: 0.78, lunge: 72, damageScale: 1.08, poisonDuration: 3.2, poisonDps: 3.5, retreat: 0.5, color: '#a3e635', shake: 7 },
  sandRoller: { reach: 86, cooldown: 1.35, lunge: 76, lunges: true, damageScale: 1.3, staminaDrain: 14, retreat: 0.24, color: '#fbbf24', shake: 10 },
  corruptedStag: { reach: 90, cooldown: 0.72, lunge: 64, lunges: true, damageScale: 1.18, staminaDrain: 10, retreat: 0.3, color: '#84cc16', shake: 8 },
  woodJaguar: { attackName: 'Timber Pounce', reach: 112, cooldown: 0.86, lunge: 102, lunges: true, damageScale: 1.18, staminaDrain: 16, retreat: 0.42, color: '#84cc16', shake: 9 },
  fungalOozeSnail: { attackName: 'Ooze Bite', reach: 76, cooldown: 1.25, lunge: 24, damageScale: 1, poisonDuration: 4, poisonDps: 2.75, retreat: 0.12, color: '#bef264', shake: 7 },
  fungalFairyWitch: { attackName: 'Spore Hex', reach: 132, cooldown: 0.9, lunge: 76, damageScale: 0.92, poisonDuration: 3.2, poisonDps: 3.25, retreat: 0.52, color: '#d9f99d', shake: 6 },
  mossboundFungalWarden: { attackName: 'Moss Maul', reach: 86, cooldown: 1.42, lunge: 30, damageScale: 1.35, staminaDrain: 18, retreat: 0.22, color: '#84cc16', shake: 11 },
  mossboundFungalGuardian: { attackName: 'Sporestaff Crush', reach: 104, cooldown: 1.55, lunge: 24, damageScale: 1.42, staminaDrain: 22, retreat: 0.2, color: '#a3e635', shake: 12 },
  glowBat: { reach: 76, cooldown: 0.52, lunge: 64, lunges: true, damageScale: 0.8, retreat: 0.52, color: '#4ade80', shake: 4 },
  frosthornRam: { attackName: 'Frosthorn Charge', reach: 90, cooldown: 1.18, lunge: 72, lunges: true, damageScale: 1.18, staminaDrain: 18, retreat: 0.34, color: '#dbeafe', shake: 9 },
  voidwingDrake: { reach: 102, cooldown: 0.82, lunge: 92, lunges: true, damageScale: 1.05, hydrationDrain: 8, retreat: 0.48, color: '#818cf8', shake: 7 },
  sunfeatherGriffin: { reach: 98, cooldown: 1.3, lunge: 72, lunges: true, damageScale: 1.25, staminaDrain: 12, retreat: 0.36, color: '#fbbf24', shake: 10 },
  starlingMarauder: { attackName: 'Crescent Cut', reach: 68, cooldown: 0.7, lunge: 52, damageScale: 0.96, retreat: 0.38, color: '#a78bfa', shake: 6 },
  cometHound: { attackName: 'Comet Charge', reach: 105, cooldown: 1.02, lunge: 94, lunges: true, damageScale: 1.2, staminaDrain: 14, retreat: 0.48, color: '#22d3ee', shake: 9 },
  astralSentinel: { attackName: 'Starhammer Crush', reach: 92, cooldown: 1.55, lunge: 30, damageScale: 1.42, staminaDrain: 20, retreat: 0.22, color: '#fbbf24', shake: 12 },
};

function getEnemyJournalId(enemy) {
  // Every purpose-built enemy gets its own Beastiary identity. Only the
  // original generic roster is translated into biome-specific counterparts.
  if (!baseEnemyTypes.has(enemy.type)) return enemy.type;

  const minionTypes = ['runner', 'crawler', 'assassin', 'wraith', 'arcaneOrb'];
  const role = minionTypes.includes(enemy.type) ? 'Minion' : 'Tank';
  if (world.themeIndex === 0) return `lush${role}`;
  if (world.themeIndex === 2) return enemy.type === 'crawler' ? 'lavaSpider' : `lava${role}`;
  if (world.themeIndex === 1) return `ocean${role}`;
  if (world.themeIndex === 3) return 'iceMinion';
  if (world.themeIndex === 5) {
    if (enemy.type === 'crawler') return 'skeletonSpider';
    if (enemy.type === 'arcaneOrb') return 'skeletonOrb';
    return `skeleton${role}`;
  }
  if (world.themeIndex === 6) return getDesertEnemyVariant(enemy.type);
  if (world.themeIndex === 7) return getAbyssEnemyVariant(enemy.type);
  if (world.themeIndex === 8) return `crystal${role}`;
  if (world.themeIndex === 9) {
    if (enemy.type === 'crawler' || enemy.type === 'burrower') return 'cometHound';
    return role === 'Minion' ? 'starlingMarauder' : 'astralSentinel';
  }
  if (world.themeIndex === 10) {
    if (enemy.type === 'crawler' || enemy.type === 'burrower') return 'tidefangEel';
    return role === 'Minion' ? 'sunscaleRay' : 'coralbackTurtle';
  }
  return enemy.type;
}

function getEnemyDisplayName(enemy) {
  if (enemy.type === 'lavaEagle') return 'Lava Eagle';
  const journalId = enemy === state.boss ? enemy.variant : getEnemyJournalId(enemy);
  return journalCatalog.find((entry) => entry.id === journalId)?.name
    || formatLootName(enemy.type || enemy.variant || 'enemy');
}

// Prevents newly implemented enemies from silently missing the Beastiary.
// Hand-authored entries still take precedence; this fallback registers any
// new spawnable type with its real artwork and first-seen combat statistics.
function ensureEnemyHasBestiaryEntry(enemy) {
  const id = getEnemyJournalId(enemy);
  if (!id || journalCatalog.some((entry) => entry.id === id)) return;
  const name = formatLootName(id);
  journalCatalog.push({
    id,
    name,
    kind: 'Enemy',
    image: getEnemyImageSource(enemy),
  });
  bestiaryProfiles[id] = {
    health: `${Math.round(enemy.maxHealth)} when first encountered`,
    damage: `${Math.round(enemy.damage)} per hit when first encountered`,
    speed: `${Math.round(enemy.speed)}`,
    traits: 'Newly encountered dungeon species',
    backstory: `${name} was unknown to the dungeon’s field scholars until this encounter. Its movements, attacks, and habitat are now preserved in the Beastiary for future expeditions.`,
  };
}

// Awards kill points once, regardless of who landed the finishing blow.
function awardEnemyScore(enemy) {
  if (enemy.scoreAwarded) return;
  enemy.scoreAwarded = true;
  if (!state.godMode) {
    ensureEnemyHasBestiaryEntry(enemy);
    discoverJournalEntry(getEnemyJournalId(enemy));
  }
  state.score += getEnemyScore(enemy);
}

// Awards each successive boss another thousand points.
function getBossScore(boss) {
  return boss.tier * 1000;
}

// Selects the next biome, including rare Retro Mode and fixed boss-five routing.
function getTheme() {
  if (Number.isInteger(state.forcedThemeIndex) && world.themes[state.forcedThemeIndex]) {
    world.themeIndex = state.forcedThemeIndex;
    return world.themes[world.themeIndex];
  }
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
  const standardThemes = [0, 1, 2, 3, 5, 6, 7, 8, 9, 10];
  world.themeIndex = standardThemes[Math.floor(Math.random() * standardThemes.length)];
  return world.themes[world.themeIndex];
}

// Rolls one weighted crate reward.
function randomLoot() {
  const roll = Math.random();
  if (roll < 0.248) return 'food';
  if (roll < 0.44) return 'water';
  if (roll < 0.58) return 'bandage';
  if (roll < 0.676) return 'arrowBundle';
  if (roll < 0.756) return 'protectorShard';
  if (roll < 0.9) return 'openerShard';
  return 'shieldShard';
}

// Pantheon caches contain combat supplies, but never Scout Shards.
function randomPantheonLoot() {
  let reward = randomLoot();
  while (reward === 'openerShard') reward = randomLoot();
  return reward;
}

// Converts surplus Pantheon food/water rolls into useful combat supplies.
function randomPantheonNonResourceLoot() {
  let reward = randomPantheonLoot();
  while (reward === 'food' || reward === 'water') reward = randomPantheonLoot();
  return reward;
}

// Builds a closed four-item crate at an authored room position.
function createLootCrate(x, y) {
  return {
    x,
    y,
    radius: 18,
    openProgress: 0,
    isOpen: false,
    rewards: Array.from({ length: 4 }, randomLoot),
  };
}

// Applies one crate reward directly to resources or usable inventory.
function applyLoot(item) {
  if (item === 'food') {
    player.food = clamp(player.food + 15, 0, 100);
  } else if (item === 'water') {
    player.hydration = clamp(player.hydration + 18, 0, 100);
  } else if (item === 'bandage') {
    if (player.health >= player.maxHealth) {
      player.inventory.bandage += 1;
    } else {
      player.health = clamp(player.health + 30, 0, player.maxHealth);
      setMessage('Bandage applied automatically: +30 health.');
    }
  } else if (item === 'arrowBundle') {
    player.inventory.ammo += 7;
  } else if (item === 'protectorShard') {
    player.inventory.protectorShard += 1;
  } else if (item === 'openerShard') {
    player.inventory.openerShard += 1;
  } else if (item === 'shieldShard') {
    player.inventory.shieldShard += 1;
  }
}

// Grants twenty opened crates straight to Pantheon inventory/resources.
function grantPantheonCrateCache() {
  let plannedFood = player.food;
  let plannedHydration = player.hydration;
  const rewards = Array.from({ length: 20 * 4 }, () => {
    let reward = randomPantheonLoot();
    if (reward === 'food') {
      if (plannedFood >= 100) reward = randomPantheonNonResourceLoot();
      else plannedFood = Math.min(100, plannedFood + 15);
    } else if (reward === 'water') {
      if (plannedHydration >= 100) reward = randomPantheonNonResourceLoot();
      else plannedHydration = Math.min(100, plannedHydration + 18);
    }
    return reward;
  });
  for (const item of rewards) {
    if (item === 'bandage') player.inventory.bandage += 1;
    else applyLoot(item);
  }
  showLootHighlight(rewards);
  spawnBurst(player.x, player.y, 40, '#fde68a', 175);
  return rewards;
}

// Grants six crate-table drops when a Forbidden Chamber guardian falls.
function awardChallengeRoomLoot() {
  const rewards = Array.from({ length: 6 }, randomLoot);
  rewards.forEach(applyLoot);
  showLootHighlight(rewards);
  return rewards;
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
  let deliveredBossCrates = 0;

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
        rare: Math.random() < 0.05,
      };

      room.doorways = makeDoorways(room);
      const crateCount = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < crateCount; i += 1) {
        const crate = createLootCrate(
          room.x + 120 + i * 150 + Math.random() * 45,
          room.y + 115 + Math.random() * 150,
        );
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

  const firstRoom = state.rooms[0];
  if (firstRoom && state.pendingBossCrates > 0) {
    deliveredBossCrates = state.pendingBossCrates;
    for (let index = 0; index < state.pendingBossCrates; index += 1) {
      let crateX = firstRoom.x + rand(90, firstRoom.w - 90);
      let crateY = firstRoom.y + rand(90, firstRoom.h - 90);
      for (let attempt = 0; attempt < 30; attempt += 1) {
        const clearOfHeroSpawn = Math.hypot(
          crateX - (firstRoom.x + firstRoom.w / 2),
          crateY - (firstRoom.y + firstRoom.h / 2),
        ) >= 110;
        const clearOfOtherCrates = firstRoom.crates.every((other) => (
          Math.hypot(crateX - other.x, crateY - other.y) >= 58
        ));
        if (clearOfHeroSpawn && clearOfOtherCrates) break;
        crateX = firstRoom.x + rand(90, firstRoom.w - 90);
        crateY = firstRoom.y + rand(90, firstRoom.h - 90);
      }
      const crate = createLootCrate(crateX, crateY);
      crate.bossReward = true;
      crate.dropDelay = index * 0.08;
      crate.dropDuration = 0.65;
      crate.dropTimer = crate.dropDuration;
      firstRoom.crates.push(crate);
      state.crates.push(crate);
    }
    state.pendingBossCrates = 0;
  }

  removeRandomCorridors();

  state.bossArena = {
    x: world.width / 2 - 1100,
    y: world.height / 2 - 875,
    w: 2200,
    h: 1750,
  };

  hud.theme.textContent = theme.name;
  setMessage(deliveredBossCrates > 0
    ? `Wave ${state.wave} begins. Your boss cache of ${deliveredBossCrates} crates is waiting in this room.`
    : `Wave ${state.wave} begins. Explore the rooms, open crates, and survive.`);
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
    return `assets/themes/retro-ruins/${retroFilename}.svg`;
  }
  const minionTypes = ['runner', 'crawler', 'assassin', 'wraith', 'arcaneOrb'];
  const tankTypes = ['walker', 'brute', 'spitter', 'sentinel', 'burrower', 'reaper'];
  const role = minionTypes.includes(enemy.type) ? 'minion' : tankTypes.includes(enemy.type) ? 'tank' : null;
  const addonArt = {
    crystalStalker: 'assets/themes/verdant-ruins/lush-crystal-stalker.png',
    crystalMinion: 'assets/themes/crystal-sanctum/crystal-minion.png',
    crystalTank: 'assets/themes/crystal-sanctum/crystal-tank.png',
    crystalLion: 'assets/themes/crystal-sanctum/crystal-lion.png',
    crystalBobcat: 'assets/themes/crystal-sanctum/crystal-bobcat.png',
    magmaSerpent: 'assets/themes/cinder-keep/magma-serpent.png',
    lavaTiger: 'assets/themes/cinder-keep/lava-tiger.png',
    lavaEagle: 'assets/themes/cinder-keep/lava eagle.png',
    frostWraith: 'assets/themes/frozen-depths/frost-wraith.png',
    voidSerpent: 'assets/themes/abyssal-depths/void-serpent.png',
    sandRoller: 'assets/themes/desert-ruins/sand-roller.png',
    corruptedStag: 'assets/themes/fungal-dominion/corrupted-stag.png',
    woodJaguar: 'assets/themes/moonwood/wood jaguar.png',
    fungalOozeSnail: 'assets/themes/fungal-dominion/Fungal Ooze Snail.png',
    fungalFairyWitch: 'assets/themes/fungal-dominion/Fungal Fairy Witch.png',
    mossboundFungalWarden: 'assets/themes/fungal-dominion/Mossbound Fungal Warden.png',
    mossboundFungalGuardian: 'assets/themes/fungal-dominion/mossbound-fungal-guardian-clean.png',
    desertMummy: 'assets/themes/desert-ruins/desert-mummy.png',
    desertScorpion: 'assets/themes/desert-ruins/desert-scorpion.png',
    desertArcher: 'assets/themes/desert-ruins/desert-archer.png',
    abyssJelly: 'assets/themes/abyssal-depths/abyss-jelly.png',
    abyssSpider: 'assets/themes/abyssal-depths/abyss-spider.png',
    abyssKnight: 'assets/themes/abyssal-depths/abyss-knight.png',
    shadowCat: 'assets/themes/shadow-realm/shadow-cat.png',
    shadowGator: 'assets/themes/shadow-realm/shadow-gator.png',
    mechBear: 'assets/themes/furnace-foundry/mech-bear.png',
    oceanHippo: 'assets/themes/sunken-shrine/ocean-hippo.png',
    starlingMarauder: 'assets/themes/astral-foundry/starling-marauder.png',
    cometHound: 'assets/themes/astral-foundry/comet-hound.png',
    astralSentinel: 'assets/themes/astral-foundry/astral-sentinel.png',
    reefclawCrab: 'assets/themes/sunreef-lagoon/reefclaw-crab.png',
    sunscaleRay: 'assets/themes/sunreef-lagoon/sunscale-ray.png',
    coralbackTurtle: 'assets/themes/sunreef-lagoon/coralback-turtle.png',
    tidefangEel: 'assets/themes/sunreef-lagoon/tidefang-eel.png',
  };
  if (addonArt[enemy.type]) return addonArt[enemy.type];
  if (world.themeIndex === 0) {
    if (enemy.type === 'lushMossling') return 'assets/themes/verdant-ruins/lush-mossling.png';
    if (enemy.type === 'lushSporeShroom') return 'assets/themes/verdant-ruins/lush-spore-shroom.png';
    if (role) return `assets/themes/verdant-ruins/lush-${role}.png`;
  }
  if (world.themeIndex === 2 && enemy.type === 'crawler') return 'assets/themes/cinder-keep/lava-spider.png';
  if (role && world.themeIndex === 2) return role === 'minion' ? 'assets/themes/cinder-keep/lava-minion.png' : 'assets/themes/cinder-keep/lava-tank.png';
  if (role && world.themeIndex === 1) return `assets/themes/sunken-shrine/ocean-${role}.png`;
  if (role && world.themeIndex === 3) return 'assets/themes/frozen-depths/ice-minion.png';
  if (world.themeIndex === 5) {
    if (enemy.type === 'crawler') return 'assets/themes/bony-ruins/skeleton-spider.png';
    if (enemy.type === 'arcaneOrb') return 'assets/themes/bony-ruins/skeleton-orb.png';
    if (role === 'minion') return 'assets/themes/bony-ruins/skeleton-minion.png';
    if (role === 'tank') return 'assets/themes/bony-ruins/skeleton-tank.png';
  }
  if (world.themeIndex === 6 && role) {
    const desertVariant = getDesertEnemyVariant(enemy.type);
    const desertFilename = desertVariant === 'desertMummy'
      ? 'desert-mummy'
      : desertVariant === 'desertScorpion' ? 'desert-scorpion' : 'desert-archer';
    return `assets/themes/desert-ruins/${desertFilename}.png`;
  }
  if (world.themeIndex === 7 && role) {
    const abyssVariant = getAbyssEnemyVariant(enemy.type);
    const abyssFilename = abyssVariant === 'abyssJelly'
      ? 'abyss-jelly'
      : abyssVariant === 'abyssSpider' ? 'abyss-spider' : 'abyss-knight';
    return `assets/themes/abyssal-depths/${abyssFilename}.png`;
  }
  if (world.themeIndex === 8) {
    return role === 'minion'
      ? 'assets/themes/crystal-sanctum/crystal-minion.png'
      : 'assets/themes/crystal-sanctum/crystal-tank.png';
  }
  if (world.themeIndex === 9) {
    if (enemy.type === 'crawler' || enemy.type === 'burrower') return 'assets/themes/astral-foundry/comet-hound.png';
    return role === 'minion'
      ? 'assets/themes/astral-foundry/starling-marauder.png'
      : 'assets/themes/astral-foundry/astral-sentinel.png';
  }
  if (world.themeIndex === 10) {
    if (enemy.type === 'crawler' || enemy.type === 'burrower') return 'assets/themes/sunreef-lagoon/tidefang-eel.png';
    return role === 'minion'
      ? 'assets/themes/sunreef-lagoon/sunscale-ray.png'
      : 'assets/themes/sunreef-lagoon/coralback-turtle.png';
  }
  return role === 'minion'
    ? 'assets/themes/verdant-ruins/lush-minion.png'
    : 'assets/themes/verdant-ruins/lush-tank.png';
}

// Pauses at a new wave to introduce one featured threat in a single sentence.
// Gives the hero an occasional chance to change equipment before the next wave.
// Newly unlocked gear always opens this opportunity instead of relying on luck.
function rollBetweenWaveArmoryAccess() {
  const hasNewGear = unseenGear.size > 0;
  state.gearChoiceOpen = hasNewGear || Math.random() < 0.3;
  waveArmoryButton.innerHTML = '<kbd>C</kbd> Open Armory and Apply New Gear';
  waveArmoryButton.classList.toggle('hidden', !hasNewGear);
  waveSplashContinuePrompt.textContent = state.gearChoiceOpen
    ? 'Press C to visit the Armory · Any other key to continue'
    : 'Press any key to continue';
  return state.gearChoiceOpen;
}

function showWaveSplash() {
  state.pendingWaveSplash = false;
  state.threatSplashOpen = true;
  keys.clear();
  const theme = world.themes[world.themeIndex] || world.themes[0];
  waveSplashKicker.textContent = `Wave ${state.wave}`;
  waveSplashTitle.classList.remove('ally-splash-title');
  waveSplashTitle.textContent = theme.name;
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
    waveSplashKicker.textContent = `Wave ${state.wave} · Dungeon Ally`;
    waveSplashTitle.classList.add('ally-splash-title');
    waveSplashTitle.textContent = allyDetails.name;
    const allyImage = document.createElement('img');
    allyImage.src = allyDetails.image;
    allyImage.alt = allyDetails.alt;
    allyImage.classList.add('ally-splash-image', allyDetails.imageClass);
    waveSplashEnemies.appendChild(allyImage);
    waveSplashText.textContent = allyDetails.saying;
    const armoryAvailable = rollBetweenWaveArmoryAccess();
    waveSplashWarning.textContent = armoryAvailable
      ? `${allyDetails.instruction} The Armory is open between waves.`
      : allyDetails.instruction;
    waveSplash.classList.remove('hidden');
    return;
  }
  const livingEnemies = state.enemies.filter((enemy) => !enemy.dead);
  const enemyThreats = {
    walker: 'Cryptbound Drifters claw forward without fear, tearing at anything they can drag to the floor.',
    runner: 'Bloodrush Ravagers rush exposed flesh, striking before their victims can turn.',
    crawler: 'Gloomskitters slip beneath your guard and rip at your legs until escape is impossible.',
    spitter: 'Rotspines launch corrosive bile that burns through armour and skin.',
    burrower: 'Graveburrow Stalkers wait beneath the floor, then burst upward under their prey.',
    arcaneOrb: 'Hexlight Oculi scorch living bodies with unstable dungeon magic.',
    brute: 'Ironhide Breakers crush bone with heavy blows and leave broken bodies behind.',
    assassin: 'Veilknives enter blind spots and open deep wounds before disappearing.',
    sentinel: 'Runebound Watchers march through attacks and batter trapped victims into stone.',
    wraith: 'Hollowveils pass through solid walls to drain anyone hiding nearby.',
    reaper: 'Dreadharvesters swing for the neck and do not stop when their target falls.',
    lushMossling: 'Mosslings launch crystal pounces that drain stamina before their prey can recover.',
    lushSporeShroom: 'Spore Shrooms blanket groups in poisonous spores from beyond sword reach.',
    crystalStalker: 'Verdant Crystal Stalkers brace behind green mineral armour, then launch a Shard Lunge that fractures health and stamina.',
    crystalMinion: 'Gemhide Crushers advance behind gemstone armour and crush stamina with their massive crystal-bound claws.',
    crystalTank: 'Prismback Colossi absorb punishment behind violet crystal plate before answering with a devastating body blow.',
    crystalLion: 'Crownshard Lions cross the room in one brilliant pounce, smashing stamina with the weight of their prismatic mane.',
    crystalBobcat: 'Shardeye Bobcats use Facet Blink to flash through crystal reflections and ambush prey before rapidly retreating.',
    glowBat: 'Viridian Glowbats beat their wings rapidly before plunging into an Echo Dive and darting back out of reach.',
    frosthornRam: 'Frosthorn Rams lower their crystal horns and charge hard enough to fracture both guard and stamina.',
    voidwingDrake: 'Riftwing Drakes fold the air during a sudden dive and leave their victims painfully dehydrated.',
    sunfeatherGriffin: 'Sunfeather Sentinels gather momentum overhead before delivering a crushing Solar Talon impact.',
    magmaSerpent: 'Magma Dragons appear from Wave 5 onward and rely entirely on slow, punishing fire breath.',
    lavaTiger: 'Cinderfang Sabres cross the room in a Furnace Pounce, then drive their heated sabre fangs through armour and stamina.',
    frostWraith: 'Frost Wraiths glide quickly through the fight and freeze the strength from every target they touch.',
    voidSerpent: 'Void Serpents close the distance for a venomous bite, then coil away while the poison works.',
    sandRoller: 'Sand Rollers turn ancient armour into a crushing charge that can break a careless hero.',
    corruptedStag: 'Corrupted Stags sprint down their prey and spread the Sovereign’s invasive spores with every antler strike.',
    fungalOozeSnail: 'Fungal Ooze Snails crawl slowly behind their shells, then leave a lingering toxin in anything that comes close.',
    fungalFairyWitch: 'Fungal Fairy Witches sweep through the air and cast a poisonous Spore Hex before drifting out of reach.',
    mossboundFungalGuardian: 'Mossbound Fungal Guardians advance behind living bark armour before crushing prey beneath their sporelit staffs.',
    shadowCat: 'Nightclaw Lynxes disappear into a Shadow Step, tearing across the arena before their prey can brace.',
    shadowGator: 'Dreadscale Gators launch their armoured bodies into a Voidjaw Lunge that tears away health and hydration.',
    mechBear: 'Brassmaw Siege Bears lock their pistons and launch an armoured charge capable of breaking stamina and formations.',
    oceanHippo: 'Undertow Behemoths gather the room’s current into a crushing charge that strips stamina and hydration from anything they trample.',
    starlingMarauder: 'Starling Marauders dart through the foundry with crescent blades, cutting once before rebounding into the starlight.',
    cometHound: 'Comet Hounds gather a burning trail before charging hard enough to fracture stamina and scatter a formation.',
    astralSentinel: 'Astral Sentinels advance behind star-metal plate and answer every opening with a crushing celestial hammer.',
    sunscaleRay: 'Sunscale Rays skim above the lagoon before folding their golden fins into a sudden diving strike.',
    coralbackTurtle: 'Coralback Turtles carry enormous living reefs and ram with enough force to crush a hero’s stamina.',
    tidefangEel: 'Tidefang Eels bend through shallow water in a fast curved charge that drains hydration.',
    reefclawCrab: 'Reefclaw Crabs brace behind coral shells before crushing anything caught in their oversized claws.',
    icefangBear: 'Icefang Bears drive forward beneath glacier armor and maul stamina from heroes who mistime their swings.',
    gravewingRaven: 'Gravewing Ravens fold their bone-plated wings into a fast soul-flame dive, then climb away from retaliation.',
    prismMoth: 'Prism Moths flash through crystal reflections before diving with sharp gemstone legs.',
  };
  const featuredEnemy = livingEnemies[Math.floor(Math.random() * livingEnemies.length)];
  const randomDescription = state.retroMode
    ? "The dungeon throws you back to the '90s, when heroes were pixels and every monster had sharp edges."
    : enemyThreats[featuredEnemy?.type]
      || 'Something unknown is stalking this level, hungry for anything still alive.';
  if (featuredEnemy) {
    const image = document.createElement('img');
    image.src = getEnemySplashArt(featuredEnemy);
    image.alt = `${getEnemyDisplayName(featuredEnemy)} approaching this wave`;
    waveSplashEnemies.appendChild(image);
  }
  waveSplashText.textContent = randomDescription;
  waveSplashWarning.textContent = rollBetweenWaveArmoryAccess()
    ? 'The Armory is open between waves.'
    : '';
  waveSplash.classList.remove('hidden');
}

// Presents the incoming boss at the invisible midpoint of the teleport.
function showBossSplash() {
  if (!state.boss) return;
  const bossDetails = {
    lushGolem: { name: 'Lush Golem', image: 'assets/themes/verdant-ruins/lush-golem.png', warning: 'Its roots can crush you in place, and its healing bloom can undo your hard-earned damage.' },
    lavaGolem: { name: 'Lava Golem', image: 'assets/themes/cinder-keep/lava-golem.png', warning: 'Its hammer slams break defenses, while eruptions can engulf almost the entire arena.' },
    oceanBoss: { name: 'Tide Sovereign', image: 'assets/themes/sunken-shrine/ocean-boss.png', warning: 'Its tidal attacks sweep across the arena and leave nowhere safe to stand still.' },
    iceBoss: { name: 'Glacial Sovereign', image: 'assets/themes/frozen-depths/ice-boss-clean-v3.png', warning: 'Its blizzards punish hesitation, and more Frostbound Shards arrive as the battle drags on.' },
    skeletonWarlord: { name: 'Skeleton Warlord', image: 'assets/themes/bony-ruins/skeleton-warlord.png', warning: 'This crowned butcher raises four Skeleton Orbs as its health falls, crowding the arena with hungry dead.' },
    sandBoss: { name: 'Sand Tyrant', image: 'assets/themes/desert-ruins/sand-tyrant.png', warning: 'The buried king commands three Boneguards and five Skeleton Orbs, raising another servant whenever its strength breaks.' },
    shadowBoss: { name: 'Umbral Warden', image: 'assets/themes/shadow-realm/shadow-boss.png', warning: 'The living darkness strikes with crushing slams, sudden dashes, a void nova, swift Nightclaw Lynxes, and plated Dreadscale Gators.' },
    abyssBoss: { name: 'Abyssal Devourer', image: 'assets/themes/abyssal-depths/abyss-boss-phase-1.png', warning: 'When half its strength is drained, the Devourer tears into its second phase with faster charges and a battlefield-filling abyss nova.' },
    scorpionQueen: { name: 'Scorpion Queen', image: 'assets/themes/desert-ruins/scorpion-queen.png', warning: 'Her venom nova drains the arena, her armoured charge crushes anything ahead, and she calls Desert Scorpions from beneath the sand.' },
    fungalBoss: { name: 'Mycelial Sovereign', image: 'assets/themes/fungal-dominion/mycelial-sovereign.png', warning: 'Its root-heavy slam breaks the ground, its hypha dash crosses the colony, and it enters battle protected by a Mossbound Warden and staff-bearing Fungal Guardian.' },
    mechOverlord: { name: 'Furnace Overlord', image: 'assets/themes/furnace-foundry/mech-boss.png', warning: 'Its drill crushes armour, its reactor nova punishes anyone nearby, and its assembly rail deploys ranged Furnace Sentinels and Brassmaw Siege Bears.' },
    crystalBoss: { name: 'Prismatic Guardian', image: 'assets/themes/crystal-sanctum/crystal-guardian.png', warning: 'Its crystal shield powers crushing slams, Prism Dash closes distance instantly, and Crystal Eruption fills most of the arena with deadly shards.' },
    sandSnake: { name: 'Gilded Dune Serpent', image: 'assets/themes/desert-ruins/sand-snake.png', warning: 'Its ritual staff crushes the ground, Serpent Rush crosses the Sand Arena, and Scarab Storm strips away health, stamina, and food.' },
    dragonBoss: { name: 'Frostwing Dragon Rider', image: 'assets/themes/dragon/dragon-boss-flap-middle.png', warning: 'The rider\'s ice staff can freeze you for four seconds. Watch for the dragon\'s lighter swipe and its devastating fire breath every twenty seconds.' },
    yinYangBoss: { name: 'The Balanced Duality', image: 'assets/themes/yin-yang/yin-yang-boss-sword-ready.png', warning: 'Watch its sword: the overhead chop closes distance, the roundhouse sweeps nearby heroes, and its very rare ground slam damages the entire arena after a long warning.' },
    hollowStarBoss: { name: 'The Hollow Star', image: 'assets/themes/hollow-star/hollow-star-boss.png', warning: 'Its staff chops at close range, sweeps a wide orbit, and very rarely channels a huge celestial ground slam.' },
    inkboundArchivist: { name: 'The Inkbound Archivist', image: 'assets/themes/inkbound-archive/inkbound-archivist.png', warning: 'Watch the quill and spreading ink. Very rarely its living book tears free, chases a target, snaps shut, and returns.' },
    crimsonMarionette: { name: 'The Crimson Marionette', image: 'assets/themes/crimson-marionette/crimson-marionette.png', warning: 'Crosscut at close range, evade the spinning pirouette, and leave the string web. Her extremely rare Final Curtain hits the entire stage.' },
    meltedMonarch: { name: 'The Melted Monarch', image: 'assets/themes/melted-monarch/melted-monarch.png', warning: 'Read the halberd windup, slip between Candleburst flames, and prepare to absorb or interrupt the extremely rare Royal Meltdown.' },
    drownedBell: { name: 'The Drowned Bell', image: 'assets/themes/drowned-bell/drowned-bell.png', warning: 'Clear its clapper sweep, sidestep the low Undertow Charge, and prepare for the extremely rare Death Knell across the entire platform.' },
    foldedShogun: { name: 'The Folded Shogun', image: 'assets/themes/folded-shogun/folded-shogun.png', warning: 'Read the katana, evade the Paper Cyclone, and prepare for the extremely rare Thousand-Fold Judgment across the shrine.' },
    stormglassLeviathan: { name: 'Stormglass Leviathan', image: 'assets/themes/stormglass-leviathan/stormglass-leviathan.png', warning: 'Its trident crushes at close range while storm rings force constant movement.' },
    clockworkSeraph: { name: 'Clockwork Seraph', image: 'assets/themes/clockwork-seraph/clockwork-seraph.png', warning: 'The Seraph alternates halberd lunges with expanding mechanisms of judgment.' },
    gravebloomColossus: { name: 'Gravebloom Colossus', image: 'assets/themes/gravebloom-colossus/gravebloom-colossus.png', warning: 'Stay clear of the tombstone maul and the poisonous gravebloom spreading beneath it.' },
    lunarKitsune: { name: 'Lunar Kitsune Sovereign', image: 'assets/themes/lunar-kitsune/lunar-kitsune.png', warning: 'Its crescent glaive is swift; watch the tails before a moon-powered rush.' },
    eternityWarden: { name: 'The Eternity Warden', image: 'assets/themes/eternity-warden/eternity-warden.png', warning: 'The final guardian bends time around enormous blade strikes. Spend every resource you have.' },
    woodBoss: { name: 'Heartwood Horror', image: 'assets/themes/moonwood/wood-boss.png', warning: 'It summons reinforcements as it weakens, then tears open the arena with a massive Heartwood Eruption.' },
  };
  const details = bossDetails[state.boss.variant] || {
    name: 'Dungeon Guardian',
    image: 'assets/player/shadow boss.png',
    warning: 'It grows more dangerous with every victory you have taken from the dungeon.',
  };
  state.threatSplashOpen = true;
  const pantheonArmoryAvailable = state.pantheonMode && state.bossDefeated > 0;
  state.gearChoiceOpen = pantheonArmoryAvailable;
  waveArmoryButton.classList.toggle('hidden', !pantheonArmoryAvailable);
  waveArmoryButton.innerHTML = pantheonArmoryAvailable
    ? '<kbd>C</kbd> Open Armory Before Next Boss'
    : '<kbd>C</kbd> Open Armory and Apply New Gear';
  waveSplashContinuePrompt.textContent = pantheonArmoryAvailable
    ? 'Press C to visit the Armory · Any other key to fight'
    : 'Press any key to continue';
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
  waveSplashWarning.textContent = pantheonArmoryAvailable
    ? 'The Pantheon Armory is open. Equip your loot before this fight.'
    : '';
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
  const armoryAvailable = rollBetweenWaveArmoryAccess();
  waveSplashWarning.textContent = unseenGear.size > 0
    ? `New gear recovered. Wave ${state.wave} waits beyond the darkness.`
    : armoryAvailable
      ? `The Armory is open. Wave ${state.wave} waits beyond the darkness.`
      : `Boss defeated. Wave ${state.wave} waits beyond the darkness.`;
  waveSplash.classList.remove('hidden');
}

// Resumes the paused transition after a threat screen is dismissed.
function closeThreatSplash() {
  state.threatSplashOpen = false;
  state.gearChoiceOpen = false;
  waveSplashContinuePrompt.textContent = 'Press any key to continue';
  waveArmoryButton.classList.add('hidden');
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

  // Illustrated circular arenas use their visible flat floor as the playable
  // area; machinery, shelves, walls, and the void beyond it are solid.
  if (state.boss && (entity === player || entity.bossMinion)) {
    const circularArena = state.boss.variant === 'dragonBoss'
      || state.boss.variant === 'hollowStarBoss'
      || state.boss.variant === 'inkboundArchivist'
      || state.boss.variant === 'crimsonMarionette'
      || state.boss.variant === 'meltedMonarch'
      || state.boss.variant === 'drownedBell';
    if (circularArena) {
      const centerX = state.bossArena.x + state.bossArena.w / 2;
      const centerY = state.bossArena.y + state.bossArena.h / 2;
      const inkboundArena = state.boss.variant === 'inkboundArchivist';
      const radiusX = state.bossArena.w * (inkboundArena ? 0.4 : 0.43) - entity.radius;
      const radiusY = state.bossArena.h * (inkboundArena ? 0.36 : 0.41) - entity.radius;
      const offsetX = candidate.x - centerX;
      const offsetY = candidate.y - centerY;
      const ellipseDistance = Math.hypot(offsetX / radiusX, offsetY / radiusY);
      if (ellipseDistance > 1) {
        candidate.x = centerX + offsetX / ellipseDistance;
        candidate.y = centerY + offsetY / ellipseDistance;
      }
      return candidate;
    }
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
function createEnemy(room, index, forcedType = null) {
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
  if (forcedType) type = forcedType;
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
  if (type === 'waxAcolyte') {
    base.speed = 126;
    base.health = 82 + state.wave * 11;
    base.damage = 11 + state.wave * 1.45;
    base.radius = 20;
  }
  if (type === 'lushMossling') {
    base.speed = 152;
    base.health = 28 + state.wave * 7;
    base.damage = 7 + state.wave * 1.25;
    base.radius = 15;
  }
  if (type === 'lushSporeShroom') {
    base.speed = 58;
    base.health = 108 + state.wave * 16;
    base.damage = 11 + state.wave * 1.8;
    base.radius = 24;
  }
  if (type === 'crystalStalker') {
    base.speed = 68;
    base.health = 150 + state.wave * 18;
    base.damage = 14 + state.wave * 2.1;
    base.radius = 25;
  }
  if (type === 'crystalMinion') {
    base.speed = 88;
    base.health = 115 + state.wave * 16;
    base.damage = 16 + state.wave * 2.2;
    base.radius = 24;
  }
  if (type === 'crystalTank') {
    base.speed = 54;
    base.health = 220 + state.wave * 24;
    base.damage = 21 + state.wave * 2.8;
    base.radius = 29;
  }
  if (type === 'crystalLion') {
    base.speed = 136;
    base.health = 168 + state.wave * 20;
    base.damage = 19 + state.wave * 2.6;
    base.radius = 27;
  }
  if (type === 'crystalBobcat') {
    base.speed = 184;
    base.health = 112 + state.wave * 15;
    base.damage = 15 + state.wave * 2.2;
    base.radius = 22;
  }
  if (type === 'shadowCat') {
    base.speed = 172;
    base.health = 128 + state.wave * 17;
    base.damage = 17 + state.wave * 2.4;
    base.radius = 23;
  }
  if (type === 'mechBear') {
    base.speed = 62;
    base.health = 260 + state.wave * 28;
    base.damage = 23 + state.wave * 3;
    base.radius = 31;
  }
  if (type === 'shadowGator') {
    base.speed = 78;
    base.health = 240 + state.wave * 26;
    base.damage = 22 + state.wave * 2.9;
    base.radius = 30;
  }
  if (type === 'oceanHippo') {
    base.speed = 58;
    base.health = 285 + state.wave * 30;
    base.damage = 24 + state.wave * 3.1;
    base.radius = 30;
  }
  if (type === 'abyssalRazorfin') {
    base.speed = 176;
    base.health = 104 + state.wave * 14;
    base.damage = 16 + state.wave * 2.2;
    base.radius = 23;
  }
  if (type === 'magmaSerpent') {
    base.speed = 82;
    base.health = 92 + state.wave * 13;
    base.damage = 13 + state.wave * 1.9;
    base.radius = 23;
    // Fire breath is its only attack and is ready as soon as it reaches range.
    base.attackTimer = 0;
  }
  if (type === 'lavaTiger') {
    base.speed = 146;
    base.health = 176 + state.wave * 21;
    base.damage = 20 + state.wave * 2.7;
    base.radius = 27;
  }
  if (type === 'lavaEagle') {
    base.speed = 164;
    base.health = 116 + state.wave * 15;
    base.damage = 17 + state.wave * 2.3;
    base.radius = 24;
  }
  if (type === 'frostWraith') {
    base.speed = 148;
    base.health = 74 + state.wave * 11;
    base.damage = 12 + state.wave * 1.8;
    base.radius = 19;
  }
  if (type === 'voidSerpent') {
    base.speed = 124;
    base.health = 118 + state.wave * 15;
    base.damage = 15 + state.wave * 2.2;
    base.radius = 23;
  }
  if (type === 'sandRoller') {
    base.speed = 96;
    base.health = 185 + state.wave * 20;
    base.damage = 18 + state.wave * 2.4;
    base.radius = 27;
  }
  if (type === 'corruptedStag') {
    base.speed = 172;
    base.health = 105 + state.wave * 14;
    base.damage = 17 + state.wave * 2.3;
    base.radius = 22;
  }
  if (type === 'fungalOozeSnail') {
    base.speed = 48;
    base.health = 210 + state.wave * 24;
    base.damage = 16 + state.wave * 2.2;
    base.radius = 30;
  }
  if (type === 'fungalFairyWitch') {
    base.speed = 154;
    base.health = 92 + state.wave * 13;
    base.damage = 15 + state.wave * 2.1;
    base.radius = 21;
  }
  if (type === 'glowBat') {
    base.speed = 176; base.health = 58 + state.wave * 9; base.damage = 10 + state.wave * 1.5; base.radius = 18;
  }
  if (type === 'frosthornRam') {
    base.speed = 118; base.health = 132 + state.wave * 17; base.damage = 16 + state.wave * 2.2; base.radius = 27;
  }
  if (type === 'frostwingDrake') {
    base.speed = 164; base.health = 98 + state.wave * 14; base.damage = 15 + state.wave * 2.1; base.radius = 22;
  }
  if (type === 'boneRaven') {
    base.speed = 188; base.health = 72 + state.wave * 11; base.damage = 13 + state.wave * 1.9; base.radius = 19;
  }
  if (type === 'voidwingDrake') {
    base.speed = 158; base.health = 92 + state.wave * 13; base.damage = 15 + state.wave * 2.1; base.radius = 21;
  }
  if (type === 'sunfeatherGriffin') {
    base.speed = 128; base.health = 138 + state.wave * 17; base.damage = 18 + state.wave * 2.5; base.radius = 24;
  }
  if (type === 'starlingMarauder') {
    base.speed = 164; base.health = 62 + state.wave * 10; base.damage = 10 + state.wave * 1.6; base.radius = 18;
  }
  if (type === 'cometHound') {
    base.speed = 146; base.health = 118 + state.wave * 16; base.damage = 16 + state.wave * 2.2; base.radius = 25;
  }
  if (type === 'astralSentinel') {
    base.speed = 58; base.health = 210 + state.wave * 23; base.damage = 21 + state.wave * 2.8; base.radius = 29;
  }
  if (type === 'reefclawCrab') {
    base.speed = 62; base.health = 176 + state.wave * 20; base.damage = 18 + state.wave * 2.5; base.radius = 28;
  }
  if (type === 'icefangBear') {
    base.speed = 104; base.health = 188 + state.wave * 21; base.damage = 20 + state.wave * 2.7; base.radius = 29;
  }
  if (type === 'gravewingRaven') {
    base.speed = 172; base.health = 86 + state.wave * 12; base.damage = 14 + state.wave * 2; base.radius = 21;
  }
  if (type === 'prismMoth') {
    base.speed = 156; base.health = 104 + state.wave * 14; base.damage = 15 + state.wave * 2.1; base.radius = 22;
  }
  if (type === 'sunscaleRay') {
    base.speed = 168; base.health = 82 + state.wave * 12; base.damage = 14 + state.wave * 2; base.radius = 22;
  }
  if (type === 'coralbackTurtle') {
    base.speed = 52; base.health = 230 + state.wave * 25; base.damage = 22 + state.wave * 3; base.radius = 31;
  }
  if (type === 'tidefangEel') {
    base.speed = 152; base.health = 108 + state.wave * 15; base.damage = 16 + state.wave * 2.3; base.radius = 23;
  }

  // Keep the chase manageable while preserving each class's relative speed.
  base.speed *= 0.72;
  // Early enemies should fall quickly while the player is still learning the
  // weapon rhythm. Damage catches up slightly sooner than health so the rooms
  // remain threatening without turning basic enemies into damage sponges.
  const earlyHealthScale = state.wave === 1 ? 0.5
    : state.wave === 2 ? 0.72
      : state.wave === 3 ? 0.86
        : 1;
  const earlyDamageScale = state.wave === 1 ? 0.68
    : state.wave === 2 ? 0.8
      : state.wave === 3 ? 0.9
        : 1;
  base.health *= earlyHealthScale;
  base.damage *= earlyDamageScale;
  base.maxHealth = base.health;

  if (base.elite) {
    base.health *= 1.8;
    base.maxHealth = base.health;
    base.damage *= 1.3;
    base.radius += 4;
  }
  ensureEnemyHasBestiaryEntry(base);
  return base;
}

// Room guards provide consistent local encounters. Roaming hunters are the
// authored difficulty curve; together they rise from 10 mobs to 40 by Wave 14.
const waveSecondGuardBudgets = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6];
const waveRoamingBudgets = [2, 2, 3, 3, 4, 4, 5, 6, 8, 9, 11, 11, 12, 13];

function getWaveSpecialistPool(wave) {
  const biomePools = {
    0: ['lushMossling', 'lushSporeShroom', 'crystalStalker', 'glowBat'],
    1: ['abyssalRazorfin', 'oceanHippo'],
    2: ['magmaSerpent', 'lavaTiger', 'lavaEagle'],
    3: ['frostWraith', 'frostwingDrake', 'icefangBear', 'frosthornRam'],
    5: ['boneRaven', 'gravewingRaven'],
    6: ['sandRoller', 'sunfeatherGriffin'],
    7: ['voidSerpent', 'voidwingDrake'],
    8: ['prismMoth', 'crystalLion', 'crystalBobcat'],
    9: ['starlingMarauder', 'cometHound', 'astralSentinel'],
    10: ['sunscaleRay', 'reefclawCrab', 'tidefangEel', 'coralbackTurtle'],
  };
  const fullPool = biomePools[world.themeIndex] || [];
  // Large, fast, or heavily armoured signature creatures are late-wave
  // reveals. Opening waves establish each biome with its simpler wildlife.
  const specialistMinimumWave = {
    lushSporeShroom: 3,
    glowBat: 4,
    crystalStalker: 5,
    oceanHippo: 6,
    reefclawCrab: 4,
    sunscaleRay: 1,
    tidefangEel: 4,
    coralbackTurtle: 8,
    abyssalRazorfin: 4,
    magmaSerpent: 5,
    lavaTiger: 7,
    lavaEagle: 7,
    frostWraith: 4,
    frostwingDrake: 6,
    frosthornRam: 7,
    icefangBear: 6,
    boneRaven: 5,
    gravewingRaven: 8,
    sandRoller: 7,
    sunfeatherGriffin: 9,
    voidSerpent: 7,
    voidwingDrake: 9,
    crystalBobcat: 9,
    crystalLion: 11,
    prismMoth: 5,
    starlingMarauder: 1,
    cometHound: 4,
    astralSentinel: 8,
  };
  const eligiblePool = fullPool.filter((type) => wave >= (specialistMinimumWave[type] || 1));
  // More dangerous biome species join the roster gradually rather than all
  // appearing during the opening wave.
  const unlockedSpecies = Math.min(eligiblePool.length, 1 + Math.floor((wave - 1) / 3));
  return eligiblePool.slice(0, unlockedSpecies);
}

function getSpecialistQuota(wave, population) {
  return Math.min(population, 1 + Math.floor((Math.min(wave, 14) - 1) / 2));
}

// Builds one to two dormant guards per room, then adds the roaming progression.
function spawnEnemiesForWave() {
  state.enemies = [];
  const specialistPool = getWaveSpecialistPool(state.wave);
  const authoredWave = Math.min(state.wave, 14);
  const secondGuardCount = Math.min(
    state.rooms.length,
    waveSecondGuardBudgets[authoredWave - 1],
  );
  const guardCount = state.rooms.length + secondGuardCount;
  const roamingCount = waveRoamingBudgets[authoredWave - 1];
  const specialistQuota = specialistPool.length > 0
    ? getSpecialistQuota(authoredWave, guardCount + roamingCount)
    : 0;
  let specialistsSpawned = 0;

  const chooseType = () => {
    if (specialistsSpawned >= specialistQuota) return null;
    const type = specialistPool[specialistsSpawned % specialistPool.length];
    specialistsSpawned += 1;
    return type;
  };

  // Every room starts with one sleeping guard. A second guard is added to a
  // small, increasing selection of rooms without crowding the whole dungeon.
  for (let roomIndex = 0; roomIndex < state.rooms.length; roomIndex += 1) {
    const room = state.rooms[roomIndex];
    const guard = createEnemy(room, roomIndex, chooseType());
    guard.aggro = false;
    state.enemies.push(guard);
    if (roomIndex < secondGuardCount) {
      const secondGuard = createEnemy(room, state.rooms.length + roomIndex, chooseType());
      secondGuard.aggro = false;
      state.enemies.push(secondGuard);
    }
  }

  // These hunters begin active and can pursue the hero between rooms. They are
  // the part of the population that grows deliberately from Wave 1 to Wave 14.
  for (let i = 0; i < roamingCount; i += 1) {
    const room = state.rooms[(i * 3 + 1) % state.rooms.length];
    const roamer = createEnemy(room, guardCount + i, chooseType());
    roamer.aggro = true;
    state.enemies.push(roamer);
  }
}

const pantheonFinalEnemyRoster = {
  lushGolem: ['lushMossling', 'lushSporeShroom', 'crystalStalker'],
  lavaGolem: ['lavaMinion', 'lavaSpider', 'lavaTank', 'magmaSerpent', 'lavaTiger', 'lavaEagle'],
  oceanBoss: ['oceanMinion', 'oceanSpider', 'oceanTank', 'oceanHippo'],
  iceBoss: ['iceMinion', 'iceSpider', 'iceTank', 'frostWraith', 'frosthornRam'],
  skeletonWarlord: ['skeletonMinion', 'skeletonSpider', 'skeletonTank', 'skeletonOrb'],
  sandBoss: ['desertMummy', 'desertArcher', 'desertScorpion', 'sandRoller', 'sunfeatherGriffin'],
  shadowBoss: ['shadowCat', 'shadowGator'],
  abyssBoss: ['abyssJelly', 'abyssKnight', 'abyssSpider', 'voidSerpent', 'voidwingDrake'],
  scorpionQueen: ['desertScorpion'],
  woodBoss: ['woodMinion'],
  fungalBoss: ['corruptedStag', 'fungalOozeSnail', 'fungalFairyWitch'],
  mechOverlord: ['mechMinion', 'mechBear'],
  crystalBoss: ['crystalMinion', 'crystalTank', 'crystalLion', 'crystalBobcat', 'glowBat'],
  sandSnake: ['sandRoller', 'sunfeatherGriffin'],
  dragonBoss: ['lavaEagle'],
  yinYangBoss: [],
  meltedMonarch: ['waxAcolyte', 'waxAcolyte'],
  stormglassLeviathan: ['oceanHippo', 'voidSerpent'],
  clockworkSeraph: ['mechMinion', 'mechBear'],
  gravebloomColossus: ['corruptedStag', 'fungalOozeSnail'],
  lunarKitsune: ['shadowCat', 'frostWraith'],
  eternityWarden: ['sentinel', 'reaper'],
};

// Adds one of every regular enemy associated with the active final-trial bosses.
function spawnPantheonFinalEnemies(bosses) {
  const arenaRoom = { ...state.bossArena };
  const enemyTypes = bosses.flatMap((boss) => pantheonFinalEnemyRoster[boss.variant] || []);
  enemyTypes.forEach((type, index) => {
    const enemy = createEnemy(arenaRoom, index, type);
    const angle = (index / Math.max(1, enemyTypes.length)) * Math.PI * 2;
    const ring = 245 + (index % 2) * 75;
    enemy.x = clamp(state.bossArena.x + state.bossArena.w / 2 + Math.cos(angle) * ring, state.bossArena.x + enemy.radius, state.bossArena.x + state.bossArena.w - enemy.radius);
    enemy.y = clamp(state.bossArena.y + state.bossArena.h / 2 + Math.sin(angle) * ring, state.bossArena.y + enemy.radius, state.bossArena.y + state.bossArena.h - enemy.radius);
    enemy.aggro = true;
    enemy.bossMinion = true;
    ensureEnemyHasBestiaryEntry(enemy);
    state.enemies.push(enemy);
  });
}

// Creates the next tiered boss and places the party inside its arena.
function spawnBoss(pantheonTierOverride = null) {
  if (state.pantheonMode && state.bossDefeated >= 26 && pantheonTierOverride == null) {
    state.pantheonFinalTrial = true;
    const firstTier = state.pantheonFinalBatch * 3 + 1;
    const lastTier = Math.min(26, firstTier + 2);
    const group = [];
    for (let tier = firstTier; tier <= lastTier; tier += 1) {
      spawnBoss(tier);
      group.push(state.boss);
    }
    const centerX = state.bossArena.x + state.bossArena.w / 2;
    const centerY = state.bossArena.y + state.bossArena.h / 2;
    group.forEach((boss, index) => {
      const angle = (index / group.length) * Math.PI * 2;
      const ring = group.length === 1 ? 0 : Math.min(330, 145 + group.length * 12);
      boss.x = centerX + Math.cos(angle) * ring;
      boss.y = centerY + Math.sin(angle) * ring;
    });
    state.pantheonBosses = group;
    state.pantheonGroupRewarded = false;
    state.boss = group[0];
    state.enemies = [];
    spawnPantheonFinalEnemies(group);
    setMessage(`Final Pantheon Trial: Bosses ${firstTier}-${lastTier} attack with their armies!`, true);
    return;
  }
  state.enemyProjectiles = [];
  state.playerProjectiles = [];
  const bossTier = pantheonTierOverride || state.bossDefeated + 1;
  const isFirstBoss = bossTier === 1;
  const isSecondBoss = bossTier === 2;
  const isThirdBoss = bossTier === 3;
  const isFourthBoss = bossTier === 4;
  const isFifthBoss = bossTier === 5;
  const isSixthBoss = bossTier === 6;
  const isSeventhBoss = bossTier === 7;
  const isEighthBoss = bossTier === 8;
  const isNinthBoss = bossTier === 9;
  const isTenthBoss = bossTier === 10;
  const isEleventhBoss = bossTier === 11;
  const isTwelfthBoss = bossTier === 12;
  const isThirteenthBoss = bossTier === 13;
  const isFourteenthBoss = bossTier === 14;
  const isFifteenthBoss = bossTier === 15;
  const isSixteenthBoss = bossTier === 16;
  const isSeventeenthBoss = bossTier === 17;
  const isEighteenthBoss = bossTier === 18;
  const isNineteenthBoss = bossTier === 19;
  const isTwentiethBoss = bossTier === 20;
  const isTwentyFirstBoss = bossTier === 21;
  const isTwentySecondBoss = bossTier === 22;
  const isTwentyThirdBoss = bossTier === 23;
  const isTwentyFourthBoss = bossTier === 24;
  const isTwentyFifthBoss = bossTier === 25;
  const isTwentySixthBoss = bossTier === 26;
  const bossHealth = 470 + bossTier * 230 + Math.max(0, bossTier - 2) * 90;
  const bossDamage = 14 + bossTier * 5 + Math.max(0, bossTier - 2) * 1.5;
  state.boss = {
    x: world.width / 2,
    y: world.height / 2,
    radius: isFirstBoss ? 48 : isSecondBoss ? 52 : isThirdBoss ? 54 : isFourthBoss ? 55 : isFifthBoss ? 57 : isSixthBoss ? 58 : isSeventhBoss ? 60 : isEighthBoss ? 62 : isNinthBoss ? 64 : isTenthBoss ? 58 : isEleventhBoss ? 65 : isTwelfthBoss ? 66 : isThirteenthBoss ? 67 : isFourteenthBoss ? 68 : isFifteenthBoss ? 76 : isSixteenthBoss ? 72 : isSeventeenthBoss ? 74 : isEighteenthBoss ? 72 : isNineteenthBoss ? 76 : isTwentiethBoss ? 78 : isTwentyFirstBoss ? 82 : isTwentySecondBoss ? 76 : isTwentyThirdBoss ? 74 : isTwentyFourthBoss ? 82 : isTwentyFifthBoss ? 70 : isTwentySixthBoss ? 84 : 36,
    health: bossHealth,
    maxHealth: bossHealth,
    damage: bossDamage,
    tier: bossTier,
    cooldown: 1.1,
    attackWindup: 0,
    attackWindupTotal: 0.38,
    attackType: isFirstBoss ? 'rootSlam' : isSecondBoss ? 'hammerSlam' : isThirdBoss ? 'tideSlam' : isFourthBoss ? 'iceSlam' : isFifthBoss ? 'boneSlam' : isSixthBoss ? 'sandSlam' : isSeventhBoss ? 'shadowSlam' : isEighthBoss ? 'abyssSlam' : isNinthBoss ? 'pincerSlam' : isTenthBoss ? 'woodSlam' : isEleventhBoss ? 'myceliumSlam' : isTwelfthBoss ? 'drillSlam' : isThirteenthBoss ? 'crystalSlam' : isFourteenthBoss ? 'staffCrush' : isFifteenthBoss ? 'dragonSwipe' : isSixteenthBoss ? 'yinYangOverhead' : isSeventeenthBoss ? 'hollowStarOverhead' : isEighteenthBoss ? 'inkboundQuill' : isNineteenthBoss ? 'crimsonScissor' : isTwentiethBoss ? 'meltedCleave' : isTwentyFirstBoss ? 'drownedSweep' : isTwentySecondBoss ? 'tridentCrush' : isTwentyThirdBoss ? 'gearHalberd' : isTwentyFourthBoss ? 'tombMaul' : isTwentyFifthBoss ? 'crescentCut' : isTwentySixthBoss ? 'epochBlade' : 'slam',
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
    heartwoodEruptionUsed: false,
    nextFungalStagThreshold: 0.75,
    fungalStagsSummoned: 0,
    nextSkeletonOrbThreshold: 0.8,
    skeletonOrbsSummoned: 0,
    nextSandSummonThreshold: 0.9,
    sandSummonsCompleted: 0,
    nextScorpionSummonThreshold: 0.75,
    scorpionBroodsSummoned: 0,
    nextMechSummonThreshold: 0.66,
    mechSentinelsDeployed: 0,
    phase: 1,
    fireBreathCooldown: isFifteenthBoss ? 7 : 0,
    variant: isFirstBoss ? 'lushGolem' : isSecondBoss ? 'lavaGolem' : isThirdBoss ? 'oceanBoss' : isFourthBoss ? 'iceBoss' : isFifthBoss ? 'skeletonWarlord' : isSixthBoss ? 'sandBoss' : isSeventhBoss ? 'shadowBoss' : isEighthBoss ? 'abyssBoss' : isNinthBoss ? 'scorpionQueen' : isTenthBoss ? 'woodBoss' : isEleventhBoss ? 'fungalBoss' : isTwelfthBoss ? 'mechOverlord' : isThirteenthBoss ? 'crystalBoss' : isFourteenthBoss ? 'sandSnake' : isFifteenthBoss ? 'dragonBoss' : isSixteenthBoss ? 'yinYangBoss' : isSeventeenthBoss ? 'hollowStarBoss' : isEighteenthBoss ? 'inkboundArchivist' : isNineteenthBoss ? 'crimsonMarionette' : isTwentiethBoss ? 'meltedMonarch' : isTwentyFirstBoss ? 'drownedBell' : isTwentySecondBoss ? 'stormglassLeviathan' : isTwentyThirdBoss ? 'clockworkSeraph' : isTwentyFourthBoss ? 'gravebloomColossus' : isTwentyFifthBoss ? 'lunarKitsune' : isTwentySixthBoss ? 'eternityWarden' : 'standard',
  };
  if (state.forcedBossVariant) {
    const forcedBossAttacks = {
      lushGolem: 'rootSlam', lavaGolem: 'hammerSlam', oceanBoss: 'tideSlam',
      iceBoss: 'iceSlam', skeletonWarlord: 'boneSlam', sandBoss: 'sandSlam',
      shadowBoss: 'shadowSlam', abyssBoss: 'abyssSlam', scorpionQueen: 'pincerSlam',
      woodBoss: 'woodSlam', fungalBoss: 'myceliumSlam', mechOverlord: 'drillSlam',
      crystalBoss: 'crystalSlam', sandSnake: 'staffCrush', dragonBoss: 'dragonSwipe', yinYangBoss: 'yinYangOverhead', hollowStarBoss: 'hollowStarOverhead', inkboundArchivist: 'inkboundQuill', crimsonMarionette: 'crimsonScissor', meltedMonarch: 'meltedCleave', drownedBell: 'drownedSweep', stormglassLeviathan: 'tridentCrush', clockworkSeraph: 'gearHalberd', gravebloomColossus: 'tombMaul', lunarKitsune: 'crescentCut', eternityWarden: 'epochBlade', standard: 'slam',
    };
    state.boss.variant = state.forcedBossVariant;
    state.boss.attackType = forcedBossAttacks[state.forcedBossVariant] || 'slam';
  }
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
  const arenaArrivalPhrases = {
    crystalBoss: 'Prismatic gates fracture open around the crystal battleground…',
    sandSnake: 'Ancient dunes coil aside as the Sand Arena opens beneath the serpent…',
    fungalBoss: 'Spores thicken as the fungal battleground blooms open…',
    lushGolem: 'Roots split the floor as the overgrown battleground awakens…',
    lavaGolem: 'Molten gates buckle open into the volcanic arena…',
    oceanBoss: 'Black tides pull you into the drowned arena…',
    iceBoss: 'Frozen walls crack apart around the glacial battleground…',
    skeletonWarlord: 'Ancient bones rattle as the dead arena opens…',
    sandBoss: 'Buried doors grind open beneath the desert ruins…',
    shadowBoss: 'Darkness folds aside, revealing the Shadow Arena…',
    abyssBoss: 'Tearing open the drained abyssal battleground…',
    scorpionQueen: 'Sand splits beneath your feet as the Scorpio Arena opens…',
    mechOverlord: 'Ancient pistons ignite as the Mech Arena locks into place…',
    woodBoss: 'Splintered roots drag you into the timbered arena…',
    stormglassLeviathan: 'Lightning vitrifies the flooded floor as the Stormglass Deep awakens…',
    clockworkSeraph: 'The final cog locks into place and the Judgment Engine begins to turn…',
    gravebloomColossus: 'Graves split open as ancient roots raise the cemetery arena…',
    lunarKitsune: 'Nine moonlit paths converge beneath the Sovereign’s shrine…',
    eternityWarden: 'Every clock stops as the arena at the end of time opens…',
    standard: 'The dungeon tears open its final battleground…',
  };
  setMessage(arenaArrivalPhrases[state.boss.variant] || arenaArrivalPhrases.standard);
  if (!state.pantheonFinalTrial && state.boss.variant === 'iceBoss') summonIceMinion(state.boss, 'opening');
  if (!state.pantheonFinalTrial && state.boss.variant === 'woodBoss') summonWoodJaguar(state.boss);
  if (!state.pantheonFinalTrial && state.boss.variant === 'fungalBoss') {
    summonMossboundFungalWarden(state.boss);
    summonMossboundFungalGuardian(state.boss);
  }
  if (pantheonTierOverride == null) state.pantheonBosses = [];
}

// Advances progression and prepares the next connected dungeon off-screen.
function startNextWave() {
  state.wave += 1;
  state.maxRooms += 1;
  createRooms();
  spawnEnemiesForWave();
  state.roomCleared = false;
  state.boss = null;
  state.enemyProjectiles = [];
  state.playerProjectiles = [];
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
  player.food = clamp(player.food - 4, 0, 100);
  player.hydration = clamp(player.hydration - 5, 0, 100);
  state.pendingWaveSplash = true;
}

// Awards rising boss points, queues physical loot, heals the hero, and unlocks gear.
function rewardBossLoot() {
  const defeatedBossNumber = state.bossDefeated + 1;
  discoverJournalEntry(state.boss?.variant);
  state.score += getBossScore(state.boss);
  if (state.pantheonMode) grantPantheonCrateCache();
  else state.pendingBossCrates += 10;
  player.health = clamp(player.health + 30, 0, player.maxHealth);
  spawnBurst(player.x, player.y, 24, '#4ade80', 110);
  state.bossDefeated += 1;
  const unlockedSet = armorSets.find((armor) => armor.boss === defeatedBossNumber);
  if (unlockedSet && !unlockedArmor.has(unlockedSet.id)) {
    unlockedArmor.add(unlockedSet.id);
    unseenGear.add(`armor:${unlockedSet.id}`);
    saveArmorCollection();
    updateGearNotification();
    setMessage(`${unlockedSet.name} unlocked in the Hero Armory!`);
  }
  const bossWeapons = weaponSets.filter((weapon) => weapon.boss === defeatedBossNumber);
  const newlyUnlockedWeapons = bossWeapons.filter((weapon) => !unlockedWeapons.has(weapon.id));
  for (const weapon of newlyUnlockedWeapons) {
    unlockedWeapons.add(weapon.id);
    unseenGear.add(`weapon:${weapon.id}`);
    if (weapon.kind !== 'melee' && !equippedRangedWeaponId) {
      equippedRangedWeaponId = weapon.id;
    }
  }
  if (newlyUnlockedWeapons.length > 0) {
    saveArmorCollection();
    updateGearNotification();
    setMessage(`${newlyUnlockedWeapons.map((weapon) => weapon.name).join(' and ')} unlocked in the Hero Armory!`);
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
  if (state.boss?.variant === 'dragonBoss'
    || state.boss?.variant === 'hollowStarBoss'
    || state.boss?.variant === 'inkboundArchivist'
    || state.boss?.variant === 'crimsonMarionette'
    || state.boss?.variant === 'meltedMonarch'
    || state.boss?.variant === 'drownedBell') {
    const safe = resolveRoomCollision(player, nextX, nextY);
    player.x = safe.x;
    player.y = safe.y;
  } else if (state.boss) {
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
    const attackerName = getEnemyDisplayName(attacker);
    state.lastDeathCause = `an attack from the ${attackerName}`;
  }
  const healthBeforeHit = victim.health;
  victim.health = Math.max(0, victim.health - amount * (1 - armorReduction));
  if (victim === player && attacker === state.boss) {
    triggerHitStop(0.065);
  }
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
    const bossKnockback = attacker === state.boss
      ? attacker.variant === 'lushGolem' && attacker.attackType === 'rootSlam'
        ? 72
        : attacker.variant === 'lavaGolem' && attacker.attackType === 'hammerSlam'
          ? 58
          : 28
      : 14;
    knockHeroAwayFrom(attacker, bossKnockback);
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
  player.frozenTimer = Math.max(0, (player.frozenTimer || 0) - dt);
  if (player.poisonTimer > 0) {
    player.poisonTimer = Math.max(0, player.poisonTimer - dt);
    if (!state.developerMode) {
      player.health = clamp(player.health - player.poisonDps * dt, 0, player.maxHealth);
      state.lastDeathCause = 'serpent venom';
    }
    if (player.poisonTimer === 0) player.poisonDps = 0;
  }
  const usesArrows = movementControlMode === 'arrows';
  const frozen = player.frozenTimer > 0;
  const dx = frozen ? 0 : (keys.has(usesArrows ? 'arrowright' : 'd') ? 1 : 0)
    - (keys.has(usesArrows ? 'arrowleft' : 'a') ? 1 : 0);
  const dy = frozen ? 0 : (keys.has(usesArrows ? 'arrowdown' : 's') ? 1 : 0)
    - (keys.has(usesArrows ? 'arrowup' : 'w') ? 1 : 0);
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
    if (Math.abs(moveX) > 0.1) player.visualFacingX = moveX;
  }

  if (state.godMode) {
    player.food = 100;
    player.hydration = 100;
  } else {
    player.food = clamp(player.food - 1.2 * dt, 0, 100);
    player.hydration = clamp(player.hydration - 1.8 * dt, 0, 100);
  }
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
  state.enemyProjectiles = [];
  state.playerProjectiles = [];
  state.teleportTimer = state.teleportDuration;
  state.teleportMoved = false;
  state.teleportTarget = 'boss';
  state.transitionStyle = Math.random() < 0.38 ? 'chasm' : 'teleport';
  keys.clear();
  if (state.transitionStyle === 'chasm') {
    spawnBurst(player.x, player.y, 28, '#64748b', 115);
    setMessage('The floor splits open beneath you!');
  } else {
    spawnBurst(player.x, player.y, 34, '#67e8f9', 150);
    setMessage('Wave cleared! Teleporting to the boss arena...');
  }
}

// Begins the fade-out from a defeated boss toward the next wave.
function startWaveTeleport() {
  state.enemyProjectiles = [];
  state.playerProjectiles = [];
  state.teleportTimer = state.teleportDuration;
  state.teleportMoved = false;
  state.teleportTarget = 'wave';
  state.transitionStyle = 'teleport';
  keys.clear();
  spawnBurst(player.x, player.y, 42, '#a5f3fc', 175);
  setMessage('Boss defeated! Teleporting to the next wave...');
}

// Pauses teleportation at invisibility for a splash, then completes arrival.
function updateBossTeleport(dt) {
  if (state.teleportTimer <= 0) return;

  state.teleportTimer = Math.max(0, state.teleportTimer - dt);
  const elapsed = state.teleportDuration - state.teleportTimer;
  if (state.transitionStyle === 'chasm') {
    const transitionProgress = elapsed / state.teleportDuration;
    const chasmPhase = transitionProgress < 0.5
      ? transitionProgress * 2
      : (1 - transitionProgress) * 2;
    state.shake = Math.max(state.shake, 3 + chasmPhase * 11);
  }
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
      : state.transitionStyle === 'chasm'
        ? 'You shake free of the chasm. Defeat the boss!'
        : 'Teleport complete. Defeat the boss!');
    state.teleportTarget = null;
    state.transitionStyle = 'teleport';
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

// Scores hostile entities so ranged weapons consistently prefer the greatest threat.
function getRangedTargetStrength(target) {
  return (target.maxHealth || target.health || 0)
    + (target.damage || 0) * 8
    + (target.radius || 0) * 4;
}

function getActiveBosses() {
  if (state.pantheonMode && state.pantheonBosses.length > 0) {
    return state.pantheonBosses.filter((boss) => boss.health > 0);
  }
  return state.boss?.health > 0 ? [state.boss] : [];
}

// Bosses take absolute ranged priority while reachable. Without an active
// boss, shots prefer the fastest regular enemy; if a boss exists beyond
// range, the strongest reachable regular enemy becomes the fallback.
// Bows restrict regular-enemy searches to the direction their curve faces.
function getStrongestRangedTarget(facingOnly = false) {
  const playerRoom = getContainingRoom(player);
  const possibleTargets = state.enemies.filter((enemy) => (
    !enemy.dead
    && enemy.health > 0
    && distance(player, enemy) <= 900
    && (!playerRoom || getContainingRoom(enemy) === playerRoom)
    && (!facingOnly || isInsideAttackArc(enemy, 900))
  ));
  const livingBoss = getActiveBosses().reduce((closest, boss) => (
    !closest || distance(player, boss) < distance(player, closest) ? boss : closest
  ), null);
  const bossInCurrentRoom = livingBoss
    && (!playerRoom || !getContainingRoom(livingBoss) || getContainingRoom(livingBoss) === playerRoom);
  if (bossInCurrentRoom && distance(player, livingBoss) <= 900) return livingBoss;

  const compareByStrength = Boolean(livingBoss);
  return possibleTargets.reduce((preferred, target) => {
    if (!preferred) return target;
    if (compareByStrength) {
      return getRangedTargetStrength(target) > getRangedTargetStrength(preferred) ? target : preferred;
    }
    const targetSpeed = target.speed || 0;
    const preferredSpeed = preferred.speed || 0;
    if (targetSpeed !== preferredSpeed) return targetSpeed > preferredSpeed ? target : preferred;
    return getRangedTargetStrength(target) > getRangedTargetStrength(preferred) ? target : preferred;
  }, null);
}

// Fires one ammunition-limited shot using boss/fastest/strongest priority.
function fireRangedWeapon(weapon) {
  if (player.inventory.ammo <= 0) {
    setMessage('Out of ranged shots! Open crates to find an Arrow Bundle.', true);
    player.attackCooldown = 0.35;
    return;
  }
  player.inventory.ammo -= 1;
  player.attackCooldown = weapon.cooldown;
  player.attackDuration = Math.min(0.28, weapon.cooldown * 0.55);
  const isBow = weapon.kind === 'bow';
  const target = getStrongestRangedTarget(isBow);
  const aimX = target ? target.x - player.x : player.facing.x;
  const aimY = target ? target.y - player.y : player.facing.y;
  const directionLength = Math.hypot(aimX, aimY) || 1;
  const directionX = aimX / directionLength;
  const directionY = aimY / directionLength;
  // A bow may correct the arrow toward a target inside its forward cone, but
  // it must not swivel the hero away from their movement-facing direction.
  if (target && !isBow) {
    player.facing = { x: directionX, y: directionY };
    if (Math.abs(directionX) > 0.1) player.visualFacingX = directionX;
  }
  const isStaff = weapon.kind === 'staff';
  state.playerProjectiles.push({
    x: player.x + directionX * 30,
    y: player.y + directionY * 30 - 8,
    vx: directionX * weapon.projectileSpeed,
    vy: directionY * weapon.projectileSpeed,
    angle: Math.atan2(directionY, directionX),
    damage: weapon.projectileDamage + player.weaponLevel * (isStaff ? 8 : 5),
    radius: isStaff ? 11 : 5,
    life: isStaff ? 1.8 : 1.45,
    kind: weapon.kind,
    splashRadius: weapon.splashRadius || 0,
    color: isStaff ? '#c084fc' : '#fde68a',
  });
  spawnBurst(
    player.x + directionX * 30,
    player.y + directionY * 30 - 8,
    isStaff ? 14 : 7,
    isStaff ? '#c084fc' : '#fde68a',
    isStaff ? 110 : 75,
  );
}

// Performs a ranged shot or one melee swing with a fixed shared damage pool.
function tryAttack() {
  if (player.attackCooldown > 0) return;
  const equippedWeapon = getEquippedWeapon();
  if (equippedWeapon.kind !== 'melee') {
    fireRangedWeapon(equippedWeapon);
    return;
  }
  player.attackCooldown = 0.42;
  player.attackDuration = 0.24;
  const damageMultiplier = 1 + equippedWeapon.damage / 100;
  spawnBurst(player.x + player.facing.x * 24, player.y + player.facing.y * 24, 7, '#f8fafc', 80);

  const enemyRange = 70 + player.weaponLevel * 8 + equippedWeapon.reach;
  const attackCandidates = state.enemies
    .filter((enemy) => !enemy.dead && isInsideAttackArc(enemy, enemyRange));
  for (const boss of getActiveBosses()) {
    if (isInsideAttackArc(boss, 88 + player.weaponLevel * 5 + equippedWeapon.reach)) attackCandidates.push(boss);
  }
  attackCandidates.sort((a, b) => distance(player, a) - distance(player, b));
  const primaryTarget = attackCandidates[0] || null;
  const targets = primaryTarget
    ? attackCandidates.filter((candidate) => (
      candidate === primaryTarget
      || distance(primaryTarget, candidate) <= primaryTarget.radius + candidate.radius + 8
    ))
    : [];
  const bossOnlyHit = targets.length === 1 && getActiveBosses().includes(targets[0]);
  const totalSwingDamage = (
    bossOnlyHit ? 26 + player.weaponLevel * 6 : 21 + player.weaponLevel * 5
  ) * damageMultiplier;
  const damagePerTarget = targets.length > 0 ? totalSwingDamage / targets.length : 0;

  for (const target of targets) {
    target.health -= damagePerTarget;
    const targetIsBoss = getActiveBosses().includes(target);
    target.hitFlash = targetIsBoss ? 0.2 : 0.18;
    target.x += player.facing.x * (targetIsBoss ? 10 : 18);
    target.y += player.facing.y * (targetIsBoss ? 10 : 18);
    if (targetIsBoss) {
      if (target.variant === 'lavaGolem' && target.attackWindup <= 0 && target.lungeTimer <= 0) {
        target.cooldown = Math.max(-0.1, target.cooldown - 0.08);
      }
      const bossHitColor = target.variant === 'lavaGolem' ? '#fb923c' : target.variant === 'oceanBoss' ? '#67e8f9' : target.variant === 'iceBoss' ? '#dbeafe' : target.variant === 'skeletonWarlord' ? '#a5f3fc' : target.variant === 'sandBoss' || target.variant === 'sandSnake' ? '#fbbf24' : target.variant === 'shadowBoss' ? '#c084fc' : target.variant === 'scorpionQueen' ? '#f59e0b' : target.variant === 'woodBoss' ? '#bef264' : '#fca5a5';
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
  if (bossOnlyHit || targets.some((target) => target.dead)) {
    triggerHitStop(bossOnlyHit ? 0.05 : 0.035);
  }
}

// Applies a gentle positional correction so crowds remain readable without
// making enemies bounce apart or disrupting their attack paths.
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
      const push = Math.min((minimumSeparation - separation) * 0.18, 2.5);
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

// Approximates the visible body width of rendered enemy artwork. Movement still
// uses compact physics circles, but ordinary contact attacks use this footprint
// so damage begins when the characters appear to touch on screen.
function getEnemyVisualBodyRadius(enemy) {
  const variant = getEnemyJournalId(enemy);
  const largeBodies = {
    lushTank: 30,
    lavaTank: 31,
    oceanTank: 31,
    skeletonTank: 31,
    crystalTank: 32,
    crystalLion: 34,
    lavaTiger: 37,
    lavaEagle: 36,
    woodJaguar: 38,
    oceanHippo: 40,
    shadowGator: 40,
    mechBear: 38,
    frosthornRam: 38,
    mossboundFungalWarden: 34,
    mossboundFungalGuardian: 38,
    reefclawCrab: 40,
    icefangBear: 40,
    coralbackTurtle: 42,
  };
  const smallBodies = {
    lushMossling: 21,
    glowBat: 22,
    abyssJelly: 22,
    desertArcher: 21,
  };
  return largeBodies[variant]
    || smallBodies[variant]
    || Math.max(enemy.radius, 25);
}

function getVisualContactDistance(enemy, victim) {
  const victimVisualRadius = victim === player ? 23 : Math.max(victim.radius || 0, 21);
  return getEnemyVisualBodyRadius(enemy) + victimVisualRadius;
}

// Runs enemy patrol, persistent aggro, contact strikes, special lunges, and retreats.
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
    if (enemy.retreatTimer === 0) enemy.contactRebound = false;

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
      const retreatSpeed = enemy.speed * (enemy.contactRebound ? 0.65 : 1.25);
      const retreatX = enemy.x + (retreatDx / retreatDistance) * retreatSpeed * dt;
      const retreatY = enemy.y + (retreatDy / retreatDistance) * retreatSpeed * dt;
      if (Math.abs(retreatDx) > 0.01) enemy.facingX = retreatDx;
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
    const preferredTarget = getEnemyPreferredTarget(enemy);
    const directlyApproachingTarget = navigationTarget === preferredTarget;
    const dx = navigationTarget.x - enemy.x;
    const dy = navigationTarget.y - enemy.y;
    const len = Math.hypot(dx, dy) || 1;
    const dirX = dx / len;
    const dirY = dy / len;

    // Crystal Stalkers brace briefly, then cross a large gap in one armoured
    // Shard Lunge. The bright charge gives the player time to dodge.
    if (enemy.type === 'crystalStalker') {
      const crystalTarget = getEnemyPreferredTarget(enemy);
      const crystalTargetDistance = distance(enemy, crystalTarget);
      if ((enemy.crystalLungeCharge || 0) > 0) {
        enemy.crystalLungeCharge = Math.max(0, enemy.crystalLungeCharge - dt);
        enemy.lunge = Math.max(enemy.lunge, 0.45);
        if (enemy.crystalLungeCharge === 0) {
          const target = enemy.crystalLungeTarget || navigationTarget;
          const lungeDx = target.x - enemy.x;
          const lungeDy = target.y - enemy.y;
          const lungeLength = Math.hypot(lungeDx, lungeDy) || 1;
          const travel = Math.min(175, Math.max(0, lungeLength - enemy.radius - target.radius + 20));
          const lungeX = enemy.x + (lungeDx / lungeLength) * travel;
          const lungeY = enemy.y + (lungeDy / lungeLength) * travel;
          const safeLunge = resolveRoomCollision(enemy, lungeX, lungeY);
          enemy.x = safeLunge.x;
          enemy.y = safeLunge.y;
          enemy.lunge = 1;
          enemy.retreatTimer = 0.42;
          enemy.retreatFromX = target.x;
          enemy.retreatFromY = target.y;
          if (distance(enemy, target) < enemy.radius + target.radius + 46) {
            const damageLanded = applyCombatDamage(target, enemy.damage * 1.3, enemy);
            if (target === player && damageLanded) player.stamina = Math.max(0, player.stamina - 14);
            spawnBurst(target.x, target.y, 22, damageLanded ? '#67e8f9' : '#dbeafe', 145);
            state.shake = Math.max(state.shake, 9);
          }
          spawnBurst(enemy.x, enemy.y, 18, '#22d3ee', 125);
          enemy.crystalLungeTarget = null;
        }
        continue;
      }
      if (enemy.attackTimer <= 0 && crystalTargetDistance > 85 && crystalTargetDistance <= 310) {
        enemy.attackTimer = 1.9;
        enemy.crystalLungeCharge = 0.42;
        enemy.crystalLungeTarget = crystalTarget;
        enemy.lunge = 0.4;
        spawnBurst(enemy.x, enemy.y, 16, '#a5f3fc', 90);
        continue;
      }
    }

    const meleeProfile = enemyMeleeProfiles[enemy.type]
      || enemyMeleeProfiles[getEnemyJournalId(enemy)]
      || null;
    const weave = enemy.type === 'crawler' ? 75 : enemy.type === 'arcaneOrb' ? 52 : 24;
    const sideX = -dirY * Math.sin(enemy.movePhase) * weave;
    const sideY = dirX * Math.sin(enemy.movePhase) * weave;
    const isDesertArcher = enemy.type === 'desertArcher'
      || (world.themeIndex === 6
        && baseEnemyTypes.has(enemy.type)
        && getDesertEnemyVariant(enemy.type) === 'desertArcher');
    const isMagmaSerpent = enemy.type === 'magmaSerpent';
    const isMechSentinel = enemy.type === 'mechMinion';
    const holdingRange = (enemy.type === 'lushSporeShroom' && len < 180)
      || (isDesertArcher && len < 330)
      || (isMagmaSerpent && len < 280)
      || (isMechSentinel && len < 310)
      || (
        !meleeProfile?.lunges
        && enemy.attackTimer > 0
        && directlyApproachingTarget
        && len <= getVisualContactDistance(enemy, preferredTarget)
      );
    const advance = holdingRange ? 0 : 1;
    const nextX = enemy.x + (dirX * enemy.speed + sideX) * dt * advance;
    const nextY = enemy.y + (dirY * enemy.speed + sideY) * dt * advance;
    if (advance > 0) {
      enemy.movePhase += dt * (enemy.speed / 24);
      if (Math.abs(dirX) > 0.01) enemy.facingX = dirX;
    }
    if (state.boss && enemy.bossMinion) {
      enemy.x = clamp(nextX, state.bossArena.x + enemy.radius, state.bossArena.x + state.bossArena.w - enemy.radius);
      enemy.y = clamp(nextY, state.bossArena.y + enemy.radius, state.bossArena.y + state.bossArena.h - enemy.radius);
    } else {
      const safe = resolveRoomCollision(enemy, nextX, nextY);
      enemy.x = safe.x;
      enemy.y = safe.y;
    }

    // Magma Dragons glow before releasing their single fire-breath attack.
    if (isMagmaSerpent) {
      if ((enemy.fireCharge || 0) > 0) {
        enemy.fireCharge = Math.max(0, enemy.fireCharge - dt);
        enemy.lunge = Math.max(enemy.lunge, 0.35);
        if (enemy.fireCharge === 0) {
          const fireSpeed = 285;
          state.enemyProjectiles.push({
            x: enemy.x + dirX * 22,
            y: enemy.y - 10 + dirY * 22,
            vx: dirX * fireSpeed,
            vy: dirY * fireSpeed,
            angle: Math.atan2(dirY, dirX),
            damage: enemy.damage,
            life: 1.5,
            sourceType: 'magmaSerpent',
            color: '#f97316',
          });
          spawnBurst(enemy.x + dirX * 18, enemy.y - 10 + dirY * 18, 12, '#fb923c', 80);
        }
        continue;
      }
      if (len <= 440 && enemy.attackTimer <= 0) {
        enemy.attackTimer = 2.05;
        enemy.fireCharge = 0.55;
        enemy.lunge = 0.25;
        spawnBurst(enemy.x, enemy.y - 8, 8, '#f97316', 38);
      }
      continue;
    }

    // Bone Archers and Furnace Sentinels hold range for their projectiles.
    if (isDesertArcher || isMechSentinel) {
      if (len <= 440 && enemy.attackTimer <= 0) {
        enemy.attackTimer = isMechSentinel ? 1.15 : 1.55;
        enemy.lunge = 0.45;
        const arrowSpeed = isMechSentinel ? 410 : 360;
        state.enemyProjectiles.push({
          x: enemy.x + dirX * 22,
          y: enemy.y - 10 + dirY * 22,
          vx: dirX * arrowSpeed,
          vy: dirY * arrowSpeed,
          angle: Math.atan2(dirY, dirX),
          damage: enemy.damage,
          life: 1.5,
          sourceType: isMechSentinel ? 'mechMinion' : 'desertArcher',
          color: isMechSentinel ? '#fb923c' : '#fde68a',
        });
        spawnBurst(enemy.x + dirX * 18, enemy.y - 10 + dirY * 18, 7, isMechSentinel ? '#fb923c' : '#fde68a', 65);
      }
      continue;
    }

    // Spore Shrooms stop at range and erupt a poisonous cloud around their target.
    if (enemy.type === 'lushSporeShroom') {
      if (len <= 230 && enemy.attackTimer <= 0) {
        enemy.attackTimer = 2.35;
        enemy.lunge = 0.7;
        const victims = [player, ...player.protectors, ...player.openers];
        for (const victim of victims) {
          if (Math.hypot(victim.x - navigationTarget.x, victim.y - navigationTarget.y) <= 72) {
            applyCombatDamage(victim, enemy.damage * 0.9, enemy);
          }
        }
        spawnBurst(navigationTarget.x, navigationTarget.y, 28, '#84cc16', 145);
        spawnBurst(enemy.x, enemy.y, 14, '#bef264', 85);
        state.shake = Math.max(state.shake, 7);
      }
      continue;
    }

    const lungeWaveFactor = clamp(0.35 + (state.wave - 1) * 0.09, 0.35, 1.25);
    const attackApproachReach = meleeProfile?.lunges
      ? meleeProfile.reach * lungeWaveFactor
      : 24 * lungeWaveFactor;
    const nearbyHelper = [...player.protectors, ...player.openers]
      .filter((helper) => distance(enemy, helper) <= (
        meleeProfile?.lunges
          ? enemy.radius + helper.radius + attackApproachReach
          : getVisualContactDistance(enemy, helper) + attackApproachReach
      ))
      .sort((a, b) => distance(enemy, a) - distance(enemy, b))[0] || null;
    const helperInRange = Boolean(nearbyHelper);
    const playerAttackDistance = meleeProfile?.lunges
      ? enemy.radius + player.radius + attackApproachReach
      : getVisualContactDistance(enemy, player) + attackApproachReach;
    const playerInRange = distance(enemy, player) <= playerAttackDistance;
    if (helperInRange || playerInRange) {
      if (enemy.attackTimer <= 0) {
        enemy.attackTimer = meleeProfile?.cooldown ?? (enemy.type === 'lushMossling'
          ? 0.68
          : enemy.type === 'oceanHippo' ? 1.62
          : enemy.type === 'shadowGator' ? 1.32
          : enemy.type === 'mechBear' ? 1.48
          : enemy.type === 'shadowCat' ? 0.76
          : enemy.type === 'crystalBobcat' ? 0.64
          : enemy.type === 'crystalLion' ? 0.92
          : enemy.type === 'glowBat' ? 0.52
            : enemy.type === 'frosthornRam' ? 1.08
              : enemy.type === 'voidwingDrake' ? 0.82
                : enemy.type === 'sunfeatherGriffin' ? 1.3
          : enemy.type === 'sandRoller' ? 1.35
            : enemy.type === 'corruptedStag' ? 0.72
              : enemy.type === 'voidSerpent' ? 0.78
          : enemy.type === 'runner' || enemy.type === 'crawler'
            ? 0.55
            : enemy.type === 'reaper' ? 1.15 : 0.85);
        enemy.lunge = 1;
        const victim = helperInRange ? nearbyHelper : player;
        const attackDx = victim.x - enemy.x;
        const attackDy = victim.y - enemy.y;
        const attackDistance = Math.hypot(attackDx, attackDy) || 1;
        const baseLungeDistance = meleeProfile?.lunges ? (meleeProfile.lunge ?? (enemy.type === 'oceanHippo'
          ? 94
          : enemy.type === 'sandRoller'
          ? 48
          : enemy.type === 'shadowGator' ? 86
          : enemy.type === 'mechBear' ? 72
          : enemy.type === 'shadowCat' ? 108
          : enemy.type === 'crystalBobcat' ? 116
          : enemy.type === 'crystalLion' ? 88
          : enemy.type === 'glowBat' ? 64
            : enemy.type === 'frosthornRam' ? 72
              : enemy.type === 'voidwingDrake' ? 92
                : enemy.type === 'sunfeatherGriffin' ? 72
          : enemy.type === 'corruptedStag' ? 40
            : enemy.type === 'voidSerpent' ? 34
              : enemy.type === 'lushMossling' ? 28 : 14)) : 24;
        const lungeDistance = baseLungeDistance * lungeWaveFactor;
        const lungeX = enemy.x + (attackDx / attackDistance) * Math.min(lungeDistance, attackDistance);
        const lungeY = enemy.y + (attackDy / attackDistance) * Math.min(lungeDistance, attackDistance);
        if (state.boss && enemy.bossMinion) {
          enemy.x = clamp(lungeX, state.bossArena.x + enemy.radius, state.bossArena.x + state.bossArena.w - enemy.radius);
          enemy.y = clamp(lungeY, state.bossArena.y + enemy.radius, state.bossArena.y + state.bossArena.h - enemy.radius);
        } else {
          const safeLunge = resolveRoomCollision(enemy, lungeX, lungeY);
          enemy.x = safeLunge.x;
          enemy.y = safeLunge.y;
        }
        enemy.retreatTimer = meleeProfile?.lunges ? (meleeProfile.retreat ?? 0.34) : 0;
        enemy.retreatFromX = victim.x;
        enemy.retreatFromY = victim.y;
        const flyingDamageScale = meleeProfile?.damageScale ?? (enemy.type === 'sunfeatherGriffin' ? 1.25
          : enemy.type === 'frosthornRam' ? 1.18
            : enemy.type === 'glowBat' ? 0.8
              : enemy.type === 'oceanHippo' ? 1.4
              : enemy.type === 'shadowGator' ? 1.25
              : enemy.type === 'mechBear' ? 1.35
              : enemy.type === 'crystalLion' ? 1.15 : 1);
        // Ordinary attacks connect when the rendered character footprints touch.
        // Special pounce/charge creatures keep their tighter impact collision.
        const contactDistance = meleeProfile?.lunges
          ? enemy.radius + victim.radius
          : getVisualContactDistance(enemy, victim);
        const isTouchingVictim = distance(enemy, victim) <= contactDistance + 1;
        const damageLanded = isTouchingVictim
          ? applyCombatDamage(victim, enemy.damage * flyingDamageScale, enemy)
          : false;
        if (isTouchingVictim && !meleeProfile?.lunges) {
          // Separate ordinary attackers immediately and add a very short recoil
          // so they cannot stand inside the player while their cooldown runs.
          const recoilDx = enemy.x - victim.x;
          const recoilDy = enemy.y - victim.y;
          const recoilLength = Math.hypot(recoilDx, recoilDy) || 1;
          const recoilDistance = Math.min(3, Math.max(0, contactDistance + 1 - recoilLength));
          const recoilX = enemy.x + (recoilDx / recoilLength) * recoilDistance;
          const recoilY = enemy.y + (recoilDy / recoilLength) * recoilDistance;
          if (state.boss && enemy.bossMinion) {
            enemy.x = clamp(recoilX, state.bossArena.x + enemy.radius, state.bossArena.x + state.bossArena.w - enemy.radius);
            enemy.y = clamp(recoilY, state.bossArena.y + enemy.radius, state.bossArena.y + state.bossArena.h - enemy.radius);
          } else {
            const safeRecoil = resolveRoomCollision(enemy, recoilX, recoilY);
            enemy.x = safeRecoil.x;
            enemy.y = safeRecoil.y;
          }
          // Rebound through most of the cooldown, then naturally walk back in
          // so ordinary mobs repeat clean contact attacks instead of idling on
          // top of their target.
          enemy.retreatTimer = Math.min(0.55, Math.max(0.24, enemy.attackTimer * 0.62));
          enemy.contactRebound = true;
          enemy.retreatFromX = victim.x;
          enemy.retreatFromY = victim.y;
        }
        if (victim === player && damageLanded && (meleeProfile?.damageScale >= 1.25 || meleeProfile?.shake >= 10)) {
          triggerHitStop(0.045);
        }
        if (victim === player && damageLanded && meleeProfile?.poisonDuration) {
          player.poisonTimer = Math.max(player.poisonTimer, meleeProfile.poisonDuration);
          player.poisonDps = Math.max(player.poisonDps, meleeProfile.poisonDps || 3);
          spawnBurst(player.x, player.y, 14, '#a3e635', 90);
          setMessage(`${meleeProfile.attackName || 'Venom'} leaves poison burning through your veins!`, true);
        }
        if (meleeProfile && victim === player && damageLanded) {
          player.stamina = Math.max(0, player.stamina - (meleeProfile.staminaDrain || 0));
          if (meleeProfile.freezeDuration) {
            player.frozenTimer = Math.max(player.frozenTimer, meleeProfile.freezeDuration);
          }
          if (!state.godMode) {
            player.hydration = Math.max(0, player.hydration - (meleeProfile.hydrationDrain || 0));
          }
          state.shake = Math.max(state.shake, meleeProfile.shake || 5);
        }
        if (!meleeProfile && enemy.type === 'lushMossling' && victim === player && damageLanded) {
          player.stamina = Math.max(0, player.stamina - 10);
        }
        if (!meleeProfile && (enemy.type === 'crystalStalker' || enemy.type === 'frostWraith') && victim === player && damageLanded) {
          player.stamina = Math.max(0, player.stamina - (enemy.type === 'frostWraith' ? 15 : 8));
        }
        if (!meleeProfile && enemy.type === 'frosthornRam' && victim === player && damageLanded) {
          player.stamina = Math.max(0, player.stamina - 18);
        }
        if (!meleeProfile && enemy.type === 'voidwingDrake' && victim === player && damageLanded) {
          if (!state.godMode) player.hydration = Math.max(0, player.hydration - 8);
        }
        const crystalJournalId = getEnemyJournalId(enemy);
        if (!meleeProfile && (crystalJournalId === 'crystalMinion' || crystalJournalId === 'crystalTank')
          && victim === player && damageLanded) {
          player.stamina = Math.max(0, player.stamina - (crystalJournalId === 'crystalTank' ? 16 : 10));
        }
        if (!meleeProfile && enemy.type === 'crystalLion' && victim === player && damageLanded) {
          player.stamina = Math.max(0, player.stamina - 14);
        }
        if (enemy.type === 'crystalBobcat') {
          enemy.retreatTimer = 0.55;
          spawnBurst(enemy.x, enemy.y, 18, '#a78bfa', 135);
        }
        if (enemy.type === 'shadowCat') {
          enemy.retreatTimer = 0.48;
          spawnBurst(enemy.x, enemy.y, 20, '#7e22ce', 145);
        }
        if (!meleeProfile && enemy.type === 'mechBear' && victim === player && damageLanded) {
          player.stamina = Math.max(0, player.stamina - 20);
          state.shake = Math.max(state.shake, 11);
        }
        if (!meleeProfile && enemy.type === 'shadowGator' && victim === player && damageLanded) {
          if (!state.godMode) player.hydration = Math.max(0, player.hydration - 15);
          state.shake = Math.max(state.shake, 9);
        }
        if (!meleeProfile && enemy.type === 'oceanHippo' && victim === player && damageLanded) {
          player.stamina = Math.max(0, player.stamina - 24);
          if (!state.godMode) player.hydration = Math.max(0, player.hydration - 12);
          state.shake = Math.max(state.shake, 13);
        }
        state.shake = Math.max(state.shake, 5);
        const hitColor = meleeProfile?.color || (enemy.type === 'lushMossling'
          ? '#4ade80'
          : enemy.type === 'oceanHippo' ? '#22d3ee'
          : enemy.type === 'shadowGator' ? '#7e22ce'
          : enemy.type === 'mechBear' ? '#f59e0b'
          : enemy.type === 'shadowCat' ? '#c084fc'
          : enemy.type === 'crystalBobcat' ? '#a78bfa'
          : enemy.type === 'crystalLion' ? '#60a5fa'
          : damageLanded ? '#f87171' : '#67e8f9');
        spawnBurst(victim.x, victim.y, enemy.type === 'lushMossling' ? 12 : 7, hitColor, 75);
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
      awardChallengeRoomLoot();
      setMessage('Challenge guardian defeated! Six crate drops collected and every door is open again.');
    }
  }

  state.enemies = state.enemies.filter((enemy) => !enemy.dead || enemy.deathTimer > 0);

  if (state.enemies.length === 0 && !state.boss && !state.roomCleared) {
    state.roomCleared = true;
    state.bossArenaOpen = false;
    if (state.godMode && state.godTravelMode === 'enemy') {
      state.started = false;
      state.enemyProjectiles = [];
      state.playerProjectiles = [];
      keys.clear();
      openGodModeMenu();
      return;
    }
    startBossTeleport();
  }

}

// Advances ranged enemy attacks and resolves their first hero-side collision.
function updateEnemyProjectiles(dt) {
  const victims = [player, ...player.protectors, ...player.openers];
  state.enemyProjectiles = state.enemyProjectiles.filter((projectile) => {
    projectile.life -= dt;
    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;
    if (projectile.life <= 0) return false;

    const victim = victims.find((candidate) => (
      candidate.health > 0
      && Math.hypot(candidate.x - projectile.x, candidate.y - projectile.y) <= candidate.radius + 7
    ));
    if (!victim) return true;

    const damageLanded = applyCombatDamage(victim, projectile.damage, projectile.sourceBoss || { type: projectile.sourceType || 'desertArcher' });
    if (damageLanded && victim === player && projectile.freezeChance && Math.random() < projectile.freezeChance) {
      player.frozenTimer = Math.max(player.frozenTimer || 0, projectile.freezeDuration || 4);
      setMessage('The rider\'s ice staff freezes you for 4 seconds!');
      spawnBurst(player.x, player.y, 28, '#bfdbfe', 135);
    }
    spawnBurst(projectile.x, projectile.y, 10, damageLanded ? (projectile.color || '#fbbf24') : '#67e8f9', 85);
    state.shake = Math.max(state.shake, 5);
    return false;
  });
}

// Advances hero arrows and spells, resolving single-target or staff splash hits.
function updatePlayerProjectiles(dt) {
  const damageTarget = (target, damage, projectile) => {
    const targetIsBoss = getActiveBosses().includes(target);
    target.health -= damage;
    target.hitFlash = targetIsBoss ? 0.2 : 0.18;
    if (targetIsBoss && target.variant === 'lavaGolem' && target.attackWindup <= 0 && target.lungeTimer <= 0) {
      target.cooldown = Math.max(-0.1, target.cooldown - 0.08);
    }
    if (!targetIsBoss) {
      target.aggro = true;
      if (target.health <= 0 && !target.dead) {
        awardEnemyScore(target);
        target.dead = true;
        target.deathTimer = 0.55;
      }
    }
    spawnBurst(target.x, target.y, projectile.kind === 'staff' ? 12 : 6, projectile.color, 105);
  };

  state.playerProjectiles = state.playerProjectiles.filter((projectile) => {
    projectile.life -= dt;
    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;
    if (projectile.life <= 0) return false;

    const targets = state.enemies.filter((enemy) => !enemy.dead && enemy.health > 0);
    targets.push(...getActiveBosses());
    const struckTarget = targets.find((target) => (
      Math.hypot(target.x - projectile.x, target.y - projectile.y)
      <= target.radius + projectile.radius
    ));
    if (!struckTarget) return true;

    if (projectile.kind === 'staff') {
      for (const target of targets) {
        if (Math.hypot(target.x - projectile.x, target.y - projectile.y) <= projectile.splashRadius + target.radius) {
          damageTarget(target, projectile.damage, projectile);
        }
      }
      spawnBurst(projectile.x, projectile.y, 28, projectile.color, 180);
      state.shake = Math.max(state.shake, 9);
    } else {
      damageTarget(struckTarget, projectile.damage, projectile);
    }
    return false;
  });
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
    if ((crate.dropDelay || 0) > 0) {
      crate.dropDelay = Math.max(0, crate.dropDelay - dt);
      continue;
    }
    if ((crate.dropTimer || 0) > 0) {
      crate.dropTimer = Math.max(0, crate.dropTimer - dt);
      if (crate.dropTimer === 0) {
        spawnBurst(crate.x, crate.y + 12, 13, '#fbbf24', 105);
        state.shake = Math.max(state.shake, 4);
      }
      continue;
    }
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
  if (phase === 'opening') {
    const wraithHealth = 96 + boss.tier * 13;
    state.enemies.push({
      x: clamp(boss.x + 135, state.bossArena.x + 19, state.bossArena.x + state.bossArena.w - 19),
      y: clamp(boss.y + 80, state.bossArena.y + 19, state.bossArena.y + state.bossArena.h - 19),
      radius: 19,
      speed: 148,
      health: wraithHealth,
      maxHealth: wraithHealth,
      damage: 12 + boss.tier * 1.8,
      type: 'frostWraith',
      bossMinion: true,
      attackTimer: 0.4,
      hitFlash: 0,
      lunge: 0,
      movePhase: Math.random() * Math.PI * 2,
      elite: false,
    });
  }
  spawnBurst(boss.x, boss.y, 30, '#dbeafe', 165);
  setMessage(phase === 'opening'
    ? 'The Glacial Sovereign enters with a Frostbound Shard and a Frost Wraith!'
    : 'The Glacial Sovereign reached half health and summoned another Frostbound Shard!');
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
  setMessage(`The Heartwood Horror lost ${Math.round((1 - boss.nextWoodMinionThreshold) * 100)}% health and summoned a Splinterfiend!`);
}

// Places the Wood Boss's single jaguar companion into the arena at the opening.
function summonWoodJaguar(boss) {
  const radius = 28;
  const health = 190 + boss.tier * 18;
  const jaguar = {
    x: clamp(boss.x + 145, state.bossArena.x + radius, state.bossArena.x + state.bossArena.w - radius),
    y: clamp(boss.y + 85, state.bossArena.y + radius, state.bossArena.y + state.bossArena.h - radius),
    radius,
    speed: 158,
    health,
    maxHealth: health,
    damage: 17 + boss.tier * 2.2,
    type: 'woodJaguar',
    bossMinion: true,
    cooldown: 0,
    aiTimer: 0,
    attackTimer: 0.55,
    hitFlash: 0,
    lunge: 0,
    retreatTimer: 0,
    movePhase: Math.random() * Math.PI * 2,
    elite: false,
  };
  ensureEnemyHasBestiaryEntry(jaguar);
  state.enemies.push(jaguar);
  spawnBurst(boss.x + 145, boss.y + 85, 28, '#84cc16', 165);
  setMessage('The Heartwood Horror enters the arena with its Wood Jaguar!');
}

// Places the Mycelial Sovereign's Mossbound Warden into the opening formation.
function summonMossboundFungalWarden(boss) {
  const radius = 29;
  const health = 240 + boss.tier * 25;
  const warden = {
    x: clamp(boss.x + 150, state.bossArena.x + radius, state.bossArena.x + state.bossArena.w - radius),
    y: clamp(boss.y + 90, state.bossArena.y + radius, state.bossArena.y + state.bossArena.h - radius),
    radius,
    speed: 60,
    health,
    maxHealth: health,
    damage: 20 + boss.tier * 2.6,
    type: 'mossboundFungalWarden',
    bossMinion: true,
    aggro: true,
    cooldown: 0,
    aiTimer: 0,
    attackTimer: 0.75,
    hitFlash: 0,
    lunge: 0,
    retreatTimer: 0,
    movePhase: Math.random() * Math.PI * 2,
    elite: false,
  };
  ensureEnemyHasBestiaryEntry(warden);
  state.enemies.push(warden);
  spawnBurst(warden.x, warden.y, 34, '#84cc16', 165);
  setMessage('The Mycelial Sovereign enters with a Mossbound Fungal Warden!');
}

// Adds the slower staff-bearing Guardian to the Sovereign's opening formation.
function summonMossboundFungalGuardian(boss) {
  const radius = 32;
  const health = 275 + boss.tier * 28;
  const guardian = {
    x: clamp(boss.x - 150, state.bossArena.x + radius, state.bossArena.x + state.bossArena.w - radius),
    y: clamp(boss.y + 90, state.bossArena.y + radius, state.bossArena.y + state.bossArena.h - radius),
    radius,
    speed: 52,
    health,
    maxHealth: health,
    damage: 22 + boss.tier * 2.8,
    type: 'mossboundFungalGuardian',
    bossMinion: true,
    aggro: true,
    cooldown: 0,
    aiTimer: 0,
    attackTimer: 0.9,
    hitFlash: 0,
    lunge: 0,
    retreatTimer: 0,
    movePhase: Math.random() * Math.PI * 2,
    elite: false,
  };
  ensureEnemyHasBestiaryEntry(guardian);
  state.enemies.push(guardian);
  spawnBurst(guardian.x, guardian.y, 38, '#a3e635', 155);
  setMessage('The Mycelial Sovereign is guarded by a Mossbound Warden and Guardian!');
}

// Calls a different colony defender at each major health threshold.
function summonFungalMinion(boss) {
  const angle = Math.random() * Math.PI * 2;
  const summonsSnail = boss.fungalStagsSummoned % 2 === 1;
  const summonsWitch = boss.fungalStagsSummoned === 2;
  const radius = summonsWitch ? 21 : summonsSnail ? 30 : 22;
  const health = summonsWitch ? 92 + boss.tier * 13 : summonsSnail ? 210 + boss.tier * 24 : 105 + boss.tier * 14;
  const summon = {
    x: clamp(boss.x + Math.cos(angle) * 145, state.bossArena.x + radius, state.bossArena.x + state.bossArena.w - radius),
    y: clamp(boss.y + Math.sin(angle) * 145, state.bossArena.y + radius, state.bossArena.y + state.bossArena.h - radius),
    radius,
    speed: summonsWitch ? 154 : summonsSnail ? 48 : 172,
    health,
    maxHealth: health,
    damage: summonsWitch ? 15 + boss.tier * 2.1 : summonsSnail ? 16 + boss.tier * 2.2 : 17 + boss.tier * 2.3,
    type: summonsWitch ? 'fungalFairyWitch' : summonsSnail ? 'fungalOozeSnail' : 'corruptedStag',
    bossMinion: true,
    cooldown: 0,
    aiTimer: 0,
    attackTimer: 0.45,
    hitFlash: 0,
    lunge: 0,
    retreatTimer: 0,
    movePhase: angle,
    elite: false,
  };
  ensureEnemyHasBestiaryEntry(summon);
  state.enemies.push(summon);
  spawnBurst(summon.x, summon.y, summonsSnail ? 48 : 38, '#a3e635', 185);
  setMessage(summonsWitch
    ? 'The Mycelial Sovereign calls a Fungal Fairy Witch from the spore canopy!'
    : summonsSnail
    ? 'The Mycelial Sovereign heaves a Fungal Ooze Snail from the colony!'
    : 'The Mycelial Sovereign calls a Corrupted Stag from the fungal bloom!');
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
  setMessage(`The Sand Tyrant summons ${isOrb ? 'a Skeleton Orb' : 'a Boneguard'}!`);
}

// Calls armoured Desert Scorpions into the Scorpio Arena.
function summonScorpionBrood(boss, count = 2) {
  const activeScorpions = state.enemies.filter((enemy) => !enemy.dead && enemy.type === 'desertScorpion').length;
  const summonCount = Math.min(count, Math.max(0, 6 - activeScorpions));
  if (summonCount === 0) return;
  for (let index = 0; index < summonCount; index += 1) {
    const angle = boss.movePhase + index * (Math.PI * 2 / count);
    const health = 72 + boss.tier * 10;
    state.enemies.push({
      x: clamp(boss.x + Math.cos(angle) * 165, state.bossArena.x + 22, state.bossArena.x + state.bossArena.w - 22),
      y: clamp(boss.y + Math.sin(angle) * 165, state.bossArena.y + 22, state.bossArena.y + state.bossArena.h - 22),
      radius: 21,
      speed: 126,
      health,
      maxHealth: health,
      damage: 10 + boss.tier * 1.45,
      type: 'desertScorpion',
      bossMinion: true,
      attackTimer: 0.35 + index * 0.15,
      hitFlash: 0,
      lunge: 0,
      movePhase: angle,
      elite: false,
    });
  }
  spawnBurst(boss.x, boss.y, 42, '#f59e0b', 205);
  setMessage(`The Scorpion Queen summons ${summonCount} Desert Scorpion${summonCount === 1 ? '' : 's'}!`);
}

// Deploys a ranged boiler guard from the Furnace Overlord's assembly core.
function deployFurnaceSentinel(boss) {
  const activeSentinels = state.enemies.filter((enemy) => !enemy.dead && enemy.type === 'mechMinion').length;
  if (activeSentinels >= 4) return;
  const angle = boss.movePhase + activeSentinels * 1.7;
  const health = 105 + boss.tier * 12;
  const sentinel = {
    x: clamp(boss.x + Math.cos(angle) * 170, state.bossArena.x + 24, state.bossArena.x + state.bossArena.w - 24),
    y: clamp(boss.y + Math.sin(angle) * 170, state.bossArena.y + 24, state.bossArena.y + state.bossArena.h - 24),
    radius: 23,
    speed: 68,
    health,
    maxHealth: health,
    damage: 10 + boss.tier * 1.35,
    type: 'mechMinion',
    bossMinion: true,
    attackTimer: 0.55,
    hitFlash: 0,
    lunge: 0,
    movePhase: angle,
    elite: false,
  };
  ensureEnemyHasBestiaryEntry(sentinel);
  state.enemies.push(sentinel);
  spawnBurst(sentinel.x, sentinel.y, 36, '#fb923c', 180);
  setMessage('The Furnace Overlord deploys a Furnace Sentinel!');
}

// Drops one armoured siege unit from the Furnace Overlord's heavy assembly rail.
function deployMechBear(boss) {
  const activeBears = state.enemies.filter((enemy) => !enemy.dead && enemy.type === 'mechBear').length;
  if (activeBears >= 2) return;
  const angle = boss.movePhase + activeBears * Math.PI;
  const health = 260 + boss.tier * 28;
  const bear = {
    x: clamp(boss.x + Math.cos(angle) * 185, state.bossArena.x + 31, state.bossArena.x + state.bossArena.w - 31),
    y: clamp(boss.y + Math.sin(angle) * 185, state.bossArena.y + 31, state.bossArena.y + state.bossArena.h - 31),
    radius: 31,
    speed: 62,
    health,
    maxHealth: health,
    damage: 23 + boss.tier * 3,
    type: 'mechBear',
    bossMinion: true,
    aggro: true,
    cooldown: 0,
    aiTimer: 0,
    attackTimer: 0.8,
    hitFlash: 0,
    lunge: 0,
    retreatTimer: 0,
    movePhase: angle,
    elite: false,
  };
  ensureEnemyHasBestiaryEntry(bear);
  state.enemies.push(bear);
  spawnBurst(bear.x, bear.y, 44, '#f59e0b', 190);
  setMessage('The Furnace Overlord drops a Brassmaw Siege Bear onto the assembly floor!');
}

// Pulls a Nightclaw Lynx out of the Shadow Arena's living darkness.
function summonShadowCat(boss, count = 1) {
  const activeCats = state.enemies.filter((enemy) => !enemy.dead && enemy.type === 'shadowCat').length;
  const summonCount = Math.min(count, Math.max(0, 4 - activeCats));
  for (let index = 0; index < summonCount; index += 1) {
    const angle = boss.movePhase + index * Math.PI;
    const health = 128 + boss.tier * 17;
    const cat = {
      x: clamp(boss.x + Math.cos(angle) * 155, state.bossArena.x + 23, state.bossArena.x + state.bossArena.w - 23),
      y: clamp(boss.y + Math.sin(angle) * 155, state.bossArena.y + 23, state.bossArena.y + state.bossArena.h - 23),
      radius: 23,
      speed: 172,
      health,
      maxHealth: health,
      damage: 17 + boss.tier * 2.4,
      type: 'shadowCat',
      bossMinion: true,
      aggro: true,
      cooldown: 0,
      aiTimer: 0,
      attackTimer: 0.45 + index * 0.18,
      hitFlash: 0,
      lunge: 0,
      retreatTimer: 0,
      movePhase: angle,
      elite: false,
    };
    ensureEnemyHasBestiaryEntry(cat);
    state.enemies.push(cat);
    spawnBurst(cat.x, cat.y, 32, '#a855f7', 170);
  }
  if (summonCount > 0) setMessage(`The Umbral Warden calls ${summonCount} Nightclaw Lynx${summonCount === 1 ? '' : 'es'} from the shadows!`);
}

// Raises one plated Dreadscale from beneath the Shadow Arena.
function summonShadowGator(boss) {
  const activeGators = state.enemies.filter((enemy) => !enemy.dead && enemy.type === 'shadowGator').length;
  if (activeGators >= 2) return;
  const angle = boss.movePhase + activeGators * Math.PI;
  const health = 240 + boss.tier * 26;
  const gator = {
    x: clamp(boss.x + Math.cos(angle) * 180, state.bossArena.x + 30, state.bossArena.x + state.bossArena.w - 30),
    y: clamp(boss.y + Math.sin(angle) * 180, state.bossArena.y + 30, state.bossArena.y + state.bossArena.h - 30),
    radius: 30,
    speed: 78,
    health,
    maxHealth: health,
    damage: 22 + boss.tier * 2.9,
    type: 'shadowGator',
    bossMinion: true,
    aggro: true,
    cooldown: 0,
    aiTimer: 0,
    attackTimer: 0.9,
    hitFlash: 0,
    lunge: 0,
    retreatTimer: 0,
    movePhase: angle,
    elite: false,
  };
  ensureEnemyHasBestiaryEntry(gator);
  state.enemies.push(gator);
  spawnBurst(gator.x, gator.y, 42, '#7e22ce', 185);
  setMessage('The Umbral Warden raises a Dreadscale Gator from beneath the arena!');
}

// Summoning bosses release one final five-creature reinforcement wave on
// death. These remain ordinary boss minions, so the arena cannot clear until
// the player defeats every survivor.
function spawnBossDeathSummons(boss) {
  if (state.pantheonFinalTrial) return 0;
  const summonTypes = {
    iceBoss: ['iceMinion', 'frostWraith'],
    skeletonWarlord: ['skeletonOrb'],
    sandBoss: ['skeletonMinion', 'skeletonOrb'],
    scorpionQueen: ['desertScorpion'],
    woodBoss: ['woodMinion'],
    fungalBoss: ['corruptedStag', 'fungalOozeSnail', 'fungalFairyWitch', 'mossboundFungalWarden', 'mossboundFungalGuardian'],
    mechOverlord: ['mechMinion', 'mechBear'],
    shadowBoss: ['shadowCat', 'shadowGator'],
  }[boss.variant];
  if (!summonTypes) return 0;

  const profiles = {
    iceMinion: { radius: 19, speed: 108, health: 78, healthTier: 11, damage: 9, damageTier: 1.4 },
    frostWraith: { radius: 19, speed: 148, health: 96, healthTier: 13, damage: 12, damageTier: 1.8 },
    skeletonOrb: { radius: 18, speed: 112, health: 58, healthTier: 9, damage: 9, damageTier: 1.35 },
    skeletonMinion: { radius: 18, speed: 110, health: 72, healthTier: 10, damage: 10, damageTier: 1.4 },
    desertScorpion: { radius: 21, speed: 126, health: 72, healthTier: 10, damage: 10, damageTier: 1.45 },
    woodMinion: { radius: 18, speed: 112, health: 65, healthTier: 9, damage: 8, damageTier: 1.3 },
    corruptedStag: { radius: 22, speed: 172, health: 105, healthTier: 14, damage: 17, damageTier: 2.3 },
    fungalOozeSnail: { radius: 30, speed: 48, health: 210, healthTier: 24, damage: 16, damageTier: 2.2 },
    fungalFairyWitch: { radius: 21, speed: 154, health: 92, healthTier: 13, damage: 15, damageTier: 2.1 },
    mossboundFungalWarden: { radius: 29, speed: 60, health: 240, healthTier: 25, damage: 20, damageTier: 2.6 },
    mossboundFungalGuardian: { radius: 32, speed: 52, health: 275, healthTier: 28, damage: 22, damageTier: 2.8 },
    mechMinion: { radius: 23, speed: 68, health: 105, healthTier: 12, damage: 10, damageTier: 1.35 },
    mechBear: { radius: 31, speed: 62, health: 260, healthTier: 28, damage: 23, damageTier: 3 },
    shadowCat: { radius: 23, speed: 172, health: 128, healthTier: 17, damage: 17, damageTier: 2.4 },
    shadowGator: { radius: 30, speed: 78, health: 240, healthTier: 26, damage: 22, damageTier: 2.9 },
  };

  for (let index = 0; index < 5; index += 1) {
    const type = summonTypes[index % summonTypes.length];
    const profile = profiles[type];
    const angle = -Math.PI / 2 + index * (Math.PI * 2 / 5);
    const health = profile.health + boss.tier * profile.healthTier;
    const summon = {
      x: clamp(boss.x + Math.cos(angle) * 175, state.bossArena.x + profile.radius, state.bossArena.x + state.bossArena.w - profile.radius),
      y: clamp(boss.y + Math.sin(angle) * 175, state.bossArena.y + profile.radius, state.bossArena.y + state.bossArena.h - profile.radius),
      radius: profile.radius,
      speed: profile.speed,
      health,
      maxHealth: health,
      damage: profile.damage + boss.tier * profile.damageTier,
      type,
      bossMinion: true,
      aggro: true,
      cooldown: 0,
      aiTimer: 0,
      attackTimer: 0.3 + index * 0.12,
      hitFlash: 0,
      lunge: 0,
      retreatTimer: 0,
      movePhase: angle,
      elite: false,
    };
    ensureEnemyHasBestiaryEntry(summon);
    state.enemies.push(summon);
    spawnBurst(summon.x, summon.y, 24, '#a3e635', 145);
  }
  return 5;
}

function summonWaxAcolytes(boss, count = 2) {
  const livingAcolytes = state.enemies.filter(
    (enemy) => enemy.type === 'waxAcolyte' && !enemy.dead && enemy.health > 0,
  ).length;
  const summonCount = Math.min(count, Math.max(0, 4 - livingAcolytes));
  for (let index = 0; index < summonCount; index += 1) {
    const angle = (index / Math.max(1, summonCount)) * Math.PI * 2 + Math.random() * 0.5;
    const radius = 20;
    const health = 82 + boss.tier * 11;
    const acolyte = {
      x: clamp(boss.x + Math.cos(angle) * 132, state.bossArena.x + radius, state.bossArena.x + state.bossArena.w - radius),
      y: clamp(boss.y + Math.sin(angle) * 132, state.bossArena.y + radius, state.bossArena.y + state.bossArena.h - radius),
      radius,
      speed: 126,
      health,
      maxHealth: health,
      damage: 11 + boss.tier * 1.45,
      type: 'waxAcolyte',
      bossMinion: true,
      aggro: true,
      cooldown: 0,
      aiTimer: 0,
      attackTimer: 0.42 + index * 0.16,
      hitFlash: 0,
      lunge: 0,
      retreatTimer: 0,
      movePhase: angle,
      elite: false,
    };
    ensureEnemyHasBestiaryEntry(acolyte);
    state.enemies.push(acolyte);
    spawnBurst(acolyte.x, acolyte.y, 26, '#fbbf24', 145);
  }
  if (summonCount > 0) setMessage(`The Melted Monarch kindles ${summonCount} Wax Acolyte${summonCount === 1 ? '' : 's'}!`);
  return summonCount;
}

// Runs boss phases, animated attacks, damage, retreat, summons, and death.
function updateSingleBoss(dt) {
  if (!state.boss) return;
  const boss = state.boss;
  if (player.health <= 0) {
    die();
    return;
  }
  if (boss.health <= 0) {
    if (!boss.defeated) {
      boss.health = 0;
      boss.defeated = true;
      boss.rewardsGranted = false;
      boss.deathTimer = 1.8;
      boss.deathBurstTimer = 0;
      boss.attackWindup = 0;
      boss.detachedBook = null;
      spawnBurst(boss.x, boss.y, 90, '#fef3c7', 260);
      state.shake = 18;
      const deathSummons = spawnBossDeathSummons(boss);
      const survivingSummons = state.enemies.filter(
        (enemy) => enemy.bossMinion && !enemy.dead && enemy.health > 0,
      ).length;
      setMessage(deathSummons > 0
        ? `The dying boss releases five final summons! Defeat all ${survivingSummons} remaining enemies!`
        : survivingSummons > 0
        ? `Boss defeated! Finish the ${survivingSummons} surviving summon${survivingSummons === 1 ? '' : 's'}!`
        : 'Boss defeated!');
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
                : boss.variant === 'abyssBoss' ? '#38bdf8'
                  : boss.variant === 'scorpionQueen' ? '#f59e0b'
              : '#fef3c7';
      spawnBurst(boss.x, boss.y, 12, burstColor, 210);
    }
    const survivingSummons = state.enemies.filter(
      (enemy) => enemy.bossMinion && !enemy.dead && enemy.health > 0,
    );
    if (survivingSummons.length > 0) return;
    if (state.pantheonMode && (state.pantheonFinalTrial || state.pantheonBosses.length > 1)) return;
    if (!boss.rewardsGranted) {
      boss.rewardsGranted = true;
      boss.deathTimer = Math.max(boss.deathTimer, 0.55);
      setMessage('The boss and every summon are defeated!');
      rewardBossLoot();
    }
    if (boss.deathTimer === 0) {
      if (state.pantheonMode) {
        state.enemyProjectiles = [];
        state.playerProjectiles = [];
        state.enemies = [];
        spawnBoss();
        showBossSplash();
      } else {
        startWaveTeleport();
      }
    }
    return;
  }
  if (boss.variant === 'iceBoss' && !boss.halfHealthMinionSummoned && boss.health <= boss.maxHealth * 0.5) {
    boss.halfHealthMinionSummoned = true;
    summonIceMinion(boss, 'halfHealth');
  }
  if (boss.variant === 'abyssBoss' && boss.phase === 1 && boss.health <= boss.maxHealth * 0.5) {
    boss.phase = 2;
    boss.damage *= 1.25;
    boss.cooldown = 0.35;
    boss.attackWindup = 0;
    boss.attackPulse = 1;
    spawnBurst(boss.x, boss.y, 80, '#38bdf8', 280);
    state.shake = 22;
    setMessage('The Abyssal Devourer sheds its first form. Phase Two begins!');
  }
  if (boss.variant === 'scorpionQueen') {
    while (boss.scorpionBroodsSummoned < 3 && boss.health <= boss.maxHealth * boss.nextScorpionSummonThreshold) {
      summonScorpionBrood(boss, 2);
      boss.scorpionBroodsSummoned += 1;
      boss.nextScorpionSummonThreshold -= 0.25;
    }
  }
  if (boss.variant === 'mechOverlord') {
    while (boss.mechSentinelsDeployed < 2 && boss.health <= boss.maxHealth * boss.nextMechSummonThreshold) {
      deployFurnaceSentinel(boss);
      boss.mechSentinelsDeployed += 1;
      boss.nextMechSummonThreshold -= 0.33;
    }
  }
  if (boss.variant === 'woodBoss') {
    while (boss.nextWoodMinionThreshold >= 0.1 && boss.health <= boss.maxHealth * boss.nextWoodMinionThreshold) {
      summonWoodMinion(boss);
      boss.nextWoodMinionThreshold = Math.round((boss.nextWoodMinionThreshold - 0.1) * 10) / 10;
    }
  }
  if (boss.variant === 'fungalBoss') {
    while (boss.fungalStagsSummoned < 3 && boss.health <= boss.maxHealth * boss.nextFungalStagThreshold) {
      summonFungalMinion(boss);
      boss.fungalStagsSummoned += 1;
      boss.nextFungalStagThreshold -= 0.25;
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
  if (boss.variant === 'dragonBoss') {
    boss.fireBreathCooldown = Math.max(0, (boss.fireBreathCooldown || 0) - dt);
  }

  // The Archivist's rare grimoire attack is an independent homing object. It
  // closes only after reaching the player, pauses for the bite animation, then
  // flies back and visibly reattaches to the boss.
  if (boss.detachedBook) {
    const book = boss.detachedBook;
    book.life -= dt;
    if (book.phase === 'outbound') {
      const bookDx = player.x - book.x;
      const bookDy = player.y - book.y;
      const bookDistance = Math.hypot(bookDx, bookDy) || 1;
      book.angle = Math.atan2(bookDy, bookDx);
      const step = Math.min(bookDistance, 340 * dt);
      book.x += bookDx / bookDistance * step;
      book.y += bookDy / bookDistance * step;
      if (bookDistance <= player.radius + 46) {
        book.phase = 'closing';
        book.closeTimer = 0.42;
        book.hit = true;
        applyCombatDamage(player, boss.damage * 1.35, boss);
        spawnBurst(player.x, player.y, 30, '#fb7185', 205);
        state.shake = 17;
      } else if (book.life <= 0) {
        book.phase = 'returning';
      }
    } else if (book.phase === 'closing') {
      book.closeTimer = Math.max(0, book.closeTimer - dt);
      if (book.closeTimer === 0) book.phase = 'returning';
    } else {
      const returnDx = boss.x - book.x;
      const returnDy = boss.y - 54 - book.y;
      const returnDistance = Math.hypot(returnDx, returnDy) || 1;
      book.angle = Math.atan2(returnDy, returnDx);
      const step = Math.min(returnDistance, 420 * dt);
      book.x += returnDx / returnDistance * step;
      book.y += returnDy / returnDistance * step;
      if (returnDistance <= 18) {
        boss.detachedBook = null;
        spawnBurst(boss.x, boss.y - 54, 12, '#fca5a5', 90);
      }
    }
  }

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
      const plantedGolemSlam = !boss.lungeIsDash
        && (boss.variant === 'lushGolem' || boss.variant === 'lavaGolem');
      boss.retreatTimer = plantedGolemSlam ? 0 : boss.lungeIsDash ? 0.3 : 0.36;
      boss.retreatDelay = 0.1;
      boss.retreatFromX = attackTarget.x;
      boss.retreatFromY = attackTarget.y;
    }
    return;
  } else if (boss.attackWindup > 0) {
    boss.attackWindup -= dt;
    if (boss.attackWindup <= 0) {
      boss.attackPulse = 1;
      const effectColor = boss.variant === 'stormglassLeviathan' ? '#22d3ee' : boss.variant === 'clockworkSeraph' ? '#facc15' : boss.variant === 'gravebloomColossus' ? '#c084fc' : boss.variant === 'lunarKitsune' ? '#93c5fd' : boss.variant === 'eternityWarden' ? '#fde68a' : boss.variant === 'lavaGolem' ? '#f97316' : boss.variant === 'lushGolem' ? '#4ade80' : boss.variant === 'oceanBoss' ? '#38bdf8' : boss.variant === 'iceBoss' ? '#bfdbfe' : boss.variant === 'skeletonWarlord' ? '#67e8f9' : boss.variant === 'sandBoss' || boss.variant === 'sandSnake' ? '#fbbf24' : boss.variant === 'shadowBoss' ? '#a855f7' : boss.variant === 'abyssBoss' ? '#38bdf8' : boss.variant === 'scorpionQueen' ? '#f59e0b' : boss.variant === 'fungalBoss' ? '#a3e635' : boss.variant === 'mechOverlord' ? '#fb923c' : boss.variant === 'crystalBoss' ? '#22d3ee' : boss.variant === 'woodBoss' ? '#84cc16' : boss.variant === 'yinYangBoss' ? '#e2e8f0' : boss.variant === 'inkboundArchivist' ? '#fca5a5' : boss.variant === 'crimsonMarionette' ? '#dc2626' : boss.variant === 'meltedMonarch' ? '#f59e0b' : boss.variant === 'drownedBell' ? '#22d3ee' : '#fb7185';

      if (boss.attackType === 'summonWaxAcolytes') {
        summonWaxAcolytes(boss, 2);
        state.shake = 8;
      } else if (boss.attackType === 'meltedCandleburst') {
        const baseAngle = Math.atan2(dy, dx);
        for (const offset of [-0.34, -0.17, 0, 0.17, 0.34]) {
          const angle = baseAngle + offset;
          state.enemyProjectiles.push({
            x: boss.x + Math.cos(angle) * 72,
            y: boss.y + Math.sin(angle) * 72,
            vx: Math.cos(angle) * 285,
            vy: Math.sin(angle) * 285,
            angle,
            life: 3.4,
            damage: boss.damage * 0.58,
            color: '#f59e0b',
            sourceType: 'meltedMonarch',
            sourceBoss: boss,
          });
        }
        spawnBurst(boss.x + dirX * 68, boss.y + dirY * 68, 28, '#fbbf24', 175);
      } else if (boss.attackType === 'inkboundBookLaunch') {
        boss.detachedBook = {
          x: boss.x,
          y: boss.y - 54,
          angle: Math.atan2(player.y - boss.y, player.x - boss.x),
          phase: 'outbound',
          closeTimer: 0,
          life: 2.4,
          hit: false,
        };
        spawnBurst(boss.x, boss.y - 54, 28, '#fca5a5', 175);
      } else if (boss.attackType === 'dragonIceStaff') {
        state.enemyProjectiles.push({
          x: boss.x + dirX * 70,
          y: boss.y + dirY * 70,
          vx: dirX * 310,
          vy: dirY * 310,
          angle: Math.atan2(dirY, dirX),
          life: 3.2,
          damage: boss.damage * 0.72,
          color: '#93c5fd',
          sourceType: 'dragonBoss',
          sourceBoss: boss,
          freezeChance: 0.75,
          freezeDuration: 4,
        });
        spawnBurst(boss.x + dirX * 65, boss.y + dirY * 65, 18, '#bfdbfe', 120);
      } else if (boss.attackType === 'dragonFire') {
        const fireDx = player.x - boss.x;
        const fireDy = player.y - boss.y;
        const fireLength = Math.hypot(fireDx, fireDy) || 1;
        const fireDirX = fireDx / fireLength;
        const fireDirY = fireDy / fireLength;
        boss.attackAimAngle = Math.atan2(fireDirY, fireDirX);
        for (const victim of [player, ...player.protectors, ...player.openers]) {
          const victimDx = victim.x - boss.x;
          const victimDy = victim.y - boss.y;
          const forward = victimDx * fireDirX + victimDy * fireDirY;
          const sideways = Math.abs(victimDx * fireDirY - victimDy * fireDirX);
          if (forward > 0 && forward < 720 && sideways < 75 + forward * 0.22) {
            applyCombatDamage(victim, boss.damage * 1.65, boss);
          }
        }
        boss.fireBreathCooldown = 20;
        spawnBurst(boss.x + fireDirX * 180, boss.y + fireDirY * 180, 48, '#38bdf8', 260);
        state.shake = 18;
      } else if (['lightningLance', 'stormArcVolley', 'forkedLightning', 'gearVolley', 'seraphClockburst', 'cogCrossfire', 'graveSeedVolley', 'graveThornCircle', 'corpsePetalBurst', 'lunarBolts', 'kitsuneStarfan', 'moonCrescentFan', 'hourglassVolley', 'eternityParadox', 'chronoSpiral'].includes(boss.attackType)) {
        const projectileSettings = {
          lightningLance: { count: 3, spread: 0.18, speed: 390, color: '#22d3ee', scale: 0.72 },
          stormArcVolley: { count: 8, radial: true, speed: 300, color: '#67e8f9', scale: 0.5 },
          forkedLightning: { count: 7, spread: 0.1, speed: 440, color: '#a5f3fc', scale: 0.44 },
          gearVolley: { count: 5, spread: 0.22, speed: 320, color: '#facc15', scale: 0.55 },
          seraphClockburst: { count: 12, radial: true, speed: 250, color: '#fde68a', scale: 0.42 },
          cogCrossfire: { count: 4, radial: true, speed: 460, color: '#fbbf24', scale: 0.68 },
          graveSeedVolley: { count: 4, spread: 0.24, speed: 285, color: '#c084fc', scale: 0.62 },
          graveThornCircle: { count: 10, radial: true, speed: 225, color: '#a855f7', scale: 0.48 },
          corpsePetalBurst: { count: 16, radial: true, speed: 205, color: '#e879f9', scale: 0.36 },
          lunarBolts: { count: 5, spread: 0.16, speed: 410, color: '#93c5fd', scale: 0.58 },
          kitsuneStarfan: { count: 9, spread: 0.11, speed: 370, color: '#dbeafe', scale: 0.46 },
          moonCrescentFan: { count: 11, spread: 0.085, speed: 395, color: '#bfdbfe', scale: 0.4 },
          hourglassVolley: { count: 7, spread: 0.14, speed: 360, color: '#fde68a', scale: 0.66 },
          eternityParadox: { count: 14, radial: true, speed: 285, color: '#fef3c7', scale: 0.52 },
          chronoSpiral: { count: 18, radial: true, speed: 245, color: '#fcd34d', scale: 0.38 },
        }[boss.attackType];
        const baseAngle = Math.atan2(dy, dx);
        for (let index = 0; index < projectileSettings.count; index += 1) {
          const offset = projectileSettings.radial
            ? index * Math.PI * 2 / projectileSettings.count
            : (index - (projectileSettings.count - 1) / 2) * projectileSettings.spread;
          const angle = projectileSettings.radial ? offset + boss.movePhase * 0.08 : baseAngle + offset;
          state.enemyProjectiles.push({
            x: boss.x + Math.cos(angle) * (boss.radius + 18),
            y: boss.y + Math.sin(angle) * (boss.radius + 18),
            vx: Math.cos(angle) * projectileSettings.speed,
            vy: Math.sin(angle) * projectileSettings.speed,
            angle,
            life: 3.5,
            damage: boss.damage * projectileSettings.scale,
            color: projectileSettings.color,
            sourceType: boss.variant,
            sourceBoss: boss,
          });
        }
        spawnBurst(boss.x + dirX * boss.radius, boss.y + dirY * boss.radius, 24, projectileSettings.color, 170);
      } else if (boss.attackType.includes('Dash')) {
        const dashDistance = boss.attackType === 'undertowDash' ? 370 : boss.attackType === 'crimsonPirouetteDash' ? 340 : boss.attackType === 'flameDash' ? 260 : boss.attackType === 'waterDash' ? 240 : boss.attackType === 'frostDash' ? 175 : boss.attackType === 'serpentDash' ? 285 : 190 + boss.tier * 8;
        if (Math.abs(dirX) > 0.05) boss.facingX = dirX;
        boss.lungeDuration = 0.24;
        boss.lungeTimer = boss.lungeDuration;
        boss.lungeRemaining = dashDistance;
        boss.lungeDirX = dirX;
        boss.lungeDirY = dirY;
        boss.lungeDamageScale = boss.attackType === 'undertowDash' ? 1.42 : boss.attackType === 'crimsonPirouetteDash' ? 1.35 : boss.attackType === 'flameDash' ? 1.3 : boss.attackType === 'waterDash' ? 1.2 : boss.attackType === 'frostDash' ? 1.25 : boss.attackType === 'serpentDash' ? 1.45 : 1.1;
        boss.lungeHitRange = 65;
        boss.lungeEffectColor = effectColor;
        boss.lungeIsDash = true;
      } else if (boss.attackType === 'healingBloom') {
        boss.health = clamp(boss.health + boss.maxHealth * 0.07, 0, boss.maxHealth);
        spawnBurst(boss.x, boss.y, 42, '#86efac', 155);
        state.shake = 5;
      } else if (boss.attackType === 'summonBrood') {
        summonScorpionBrood(boss, 2);
        state.shake = 8;
      } else if (boss.attackType === 'deploySentinel') {
        deployFurnaceSentinel(boss);
        state.shake = 10;
      } else if (boss.attackType === 'deployBear') {
        deployMechBear(boss);
        state.shake = 13;
      } else if (boss.attackType === 'summonNightclaw') {
        summonShadowCat(boss, 2);
        state.shake = 9;
      } else if (boss.attackType === 'summonDreadscale') {
        summonShadowGator(boss);
        state.shake = 12;
      } else if (boss.attackType === 'thornRing' || boss.attackType === 'heartwoodEruption' || boss.attackType === 'eruption' || boss.attackType === 'tidalWave' || boss.attackType === 'blizzard' || boss.attackType === 'nova' || boss.attackType === 'abyssNova' || boss.attackType === 'venomNova' || boss.attackType === 'sporeburst' || boss.attackType === 'reactorNova' || boss.attackType === 'crystalEruption' || boss.attackType === 'scarabStorm' || boss.attackType === 'yinYangNova' || boss.attackType === 'yinYangRoundhouse' || boss.attackType === 'yinYangArenaSlam' || boss.attackType === 'hollowStarRoundhouse' || boss.attackType === 'hollowStarGroundSlam' || boss.attackType === 'inkboundSweep' || boss.attackType === 'inkboundDecree' || boss.attackType === 'crimsonSnare' || boss.attackType === 'crimsonFinalCurtain' || boss.attackType === 'royalMeltdown' || boss.attackType === 'drownedSweep' || boss.attackType === 'deathKnell' || boss.attackType === 'glassTempest' || boss.attackType === 'stormSurge' || boss.attackType === 'shatteredTide' || boss.attackType === 'judgmentHour' || boss.attackType === 'timeLock' || boss.attackType === 'rewindPulse' || boss.attackType === 'gravebloom' || boss.attackType === 'rootCage' || boss.attackType === 'tombVines' || boss.attackType === 'moonfall' || boss.attackType === 'eclipseNova' || boss.attackType === 'foxfireCircle' || boss.attackType === 'timeCollapse' || boss.attackType === 'endOfAges' || boss.attackType === 'finalSecond') {
        const lateBossRadius = { glassTempest: 330, stormSurge: 260, shatteredTide: 365, judgmentHour: 380, timeLock: 300, rewindPulse: 335, gravebloom: 345, rootCage: 275, tombVines: 315, moonfall: 410, eclipseNova: 350, foxfireCircle: 290, timeCollapse: Infinity, endOfAges: Infinity, finalSecond: 390 }[boss.attackType];
        const attackRadius = lateBossRadius ?? (boss.attackType === 'yinYangArenaSlam' || boss.attackType === 'crimsonFinalCurtain' || boss.attackType === 'royalMeltdown' || boss.attackType === 'deathKnell' ? Infinity : boss.attackType === 'drownedSweep' ? 225 : boss.attackType === 'crimsonSnare' ? 285 : boss.attackType === 'inkboundDecree' ? 365 : boss.attackType === 'inkboundSweep' ? 205 : boss.attackType === 'hollowStarGroundSlam' ? 390 : boss.attackType === 'hollowStarRoundhouse' ? 195 : boss.attackType === 'yinYangRoundhouse' ? 175 : boss.attackType === 'yinYangNova' ? 345 : boss.attackType === 'thornRing' ? 165 : boss.attackType === 'heartwoodEruption' ? 305 : boss.attackType === 'eruption' ? 285 : boss.attackType === 'tidalWave' ? 250 : boss.attackType === 'blizzard' ? 265 : boss.attackType === 'abyssNova' ? (boss.phase === 2 ? 330 : 270) : boss.attackType === 'venomNova' ? 295 : boss.attackType === 'sporeburst' ? 300 : boss.attackType === 'reactorNova' ? 320 : boss.attackType === 'crystalEruption' ? 335 : boss.attackType === 'scarabStorm' ? 325 : 210 + boss.tier * 8);
        const lateBossDamage = { glassTempest: 1.12, stormSurge: 0.9, shatteredTide: 1.02, judgmentHour: 1.18, timeLock: 0.72, rewindPulse: 0.78, gravebloom: 1.08, rootCage: 0.84, tombVines: 0.76, moonfall: 1.25, eclipseNova: 1, foxfireCircle: 0.92, timeCollapse: 1.5, endOfAges: 1.35, finalSecond: 1.12 }[boss.attackType];
        const damageScale = lateBossDamage ?? (boss.attackType === 'deathKnell' ? 1.38 : boss.attackType === 'drownedSweep' ? 1.02 : boss.attackType === 'royalMeltdown' ? 1.4 : boss.attackType === 'crimsonFinalCurtain' ? 1.42 : boss.attackType === 'crimsonSnare' ? 0.82 : boss.attackType === 'yinYangArenaSlam' ? 1.3 : boss.attackType === 'inkboundDecree' ? 1.35 : boss.attackType === 'inkboundSweep' ? 1 : boss.attackType === 'hollowStarGroundSlam' ? 1.45 : boss.attackType === 'hollowStarRoundhouse' ? 0.96 : boss.attackType === 'yinYangRoundhouse' ? 0.92 : boss.attackType === 'yinYangNova' ? 1.18 : boss.attackType === 'thornRing' ? 0.65 : boss.attackType === 'heartwoodEruption' ? 1.15 : boss.attackType === 'eruption' ? 1.05 : boss.attackType === 'tidalWave' ? 0.9 : boss.attackType === 'blizzard' ? 0.95 : boss.attackType === 'abyssNova' ? (boss.phase === 2 ? 1.15 : 0.9) : boss.attackType === 'venomNova' ? 1.05 : boss.attackType === 'sporeburst' ? 1.05 : boss.attackType === 'reactorNova' ? 1.2 : boss.attackType === 'crystalEruption' ? 1.25 : boss.attackType === 'scarabStorm' ? 1.1 : 0.75);
        for (const victim of [player, ...player.protectors, ...player.openers]) {
          if (distance(boss, victim) <= attackRadius) applyCombatDamage(victim, boss.damage * damageScale, boss);
        }
        if (boss.attackType === 'timeLock' && distance(boss, player) <= attackRadius) player.frozenTimer = Math.max(player.frozenTimer, 1.3);
        if (boss.attackType === 'rewindPulse' && distance(boss, player) <= attackRadius) player.stamina = Math.max(0, player.stamina - 24);
        if (boss.attackType === 'rootCage' && distance(boss, player) <= attackRadius) player.stamina = Math.max(0, player.stamina - 18);
        if (boss.attackType === 'tombVines' && distance(boss, player) <= attackRadius) player.frozenTimer = Math.max(player.frozenTimer, 0.8);
        if (boss.attackType === 'finalSecond' && distance(boss, player) <= attackRadius) player.frozenTimer = Math.max(player.frozenTimer, 0.9);
        if (boss.attackType === 'venomNova') {
          if (!state.godMode) {
            player.food = Math.max(0, player.food - 10);
            player.hydration = Math.max(0, player.hydration - 10);
          }
        }
        if (boss.attackType === 'sporeburst') player.stamina = Math.max(0, player.stamina - 18);
        if (boss.attackType === 'crystalEruption') player.stamina = Math.max(0, player.stamina - 15);
        if (boss.attackType === 'heartwoodEruption') player.stamina = Math.max(0, player.stamina - 12);
        if (boss.attackType === 'scarabStorm') {
          player.stamina = Math.max(0, player.stamina - 20);
          if (!state.godMode) player.food = Math.max(0, player.food - 12);
        }
        if (boss.attackType === 'crimsonSnare') player.stamina = Math.max(0, player.stamina - 24);
        spawnBurst(boss.x, boss.y, 38, effectColor, 230);
        state.shake = boss.attackType === 'yinYangArenaSlam' || boss.attackType === 'crimsonFinalCurtain' || boss.attackType === 'royalMeltdown' || boss.attackType === 'deathKnell' ? 24 : 14;
      } else {
        const plantedGolemSlam = boss.variant === 'lushGolem' || boss.variant === 'lavaGolem';
        const lungeCap = plantedGolemSlam ? 24 : 58;
        const lungeDistance = Math.min(lungeCap, Math.max(0, len - boss.radius - attackTarget.radius + 18));
        boss.lungeDuration = 0.2;
        boss.lungeTimer = boss.lungeDuration;
        boss.lungeRemaining = lungeDistance;
        boss.lungeDirX = dirX;
        boss.lungeDirY = dirY;
        boss.lungeDamageScale = boss.attackType === 'epochBlade' ? 2.15 : boss.attackType === 'crescentCut' ? 1.78 : boss.attackType === 'tombMaul' ? 2.05 : boss.attackType === 'gearHalberd' ? 1.9 : boss.attackType === 'tridentCrush' ? 1.88 : boss.attackType === 'meltedCleave' ? 1.82 : boss.attackType === 'crimsonScissor' ? 1.8 : boss.attackType === 'inkboundQuill' ? 1.75 : boss.attackType === 'hollowStarOverhead' ? 1.72 : boss.attackType === 'yinYangOverhead' ? 1.6 : boss.attackType === 'dragonSwipe' ? 0.68 : boss.attackType === 'hammerSlam' ? 1.55 : boss.attackType === 'rootSlam' ? 1.05 : boss.attackType === 'tideSlam' ? 1.35 : boss.attackType === 'iceSlam' ? 1.4 : boss.attackType === 'boneSlam' ? 1.5 : boss.attackType === 'sandSlam' ? 1.48 : boss.attackType === 'staffCrush' ? 1.9 : boss.attackType === 'abyssRend' ? 1.7 : boss.attackType === 'abyssSlam' ? 1.4 : boss.attackType === 'pincerSlam' ? 1.75 : boss.attackType === 'myceliumSlam' ? 1.65 : boss.attackType === 'drillSlam' ? 1.85 : boss.attackType === 'crystalSlam' ? 1.8 : boss.attackType === 'woodSlam' ? 1.45 : 1.25;
        boss.lungeHitRange = boss.attackType === 'yinYangOverhead' ? 88 : 75;
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
    const plantedGolem = boss.variant === 'lushGolem' || boss.variant === 'lavaGolem';
    const orbit = retreating || plantedGolem ? 0 : Math.sin(boss.movePhase * 0.7) * 36;
    const speed = boss.variant === 'dragonBoss' ? (retreating ? 70 : 44) : boss.variant === 'drownedBell' ? (retreating ? 112 : 58) : boss.variant === 'meltedMonarch' ? (retreating ? 120 : 62) : retreating ? 145 : plantedGolem ? 58 : boss.cooldown < 0.35 ? 125 : 72;
    const closingDistance = boss.radius + attackTarget.radius + 34;
    const movementX = retreating
      ? (retreatDx / retreatLength) * speed
      : !recovering && len > closingDistance
        ? dirX * speed - dirY * orbit
        : !recovering && !plantedGolem ? -dirY * 58 : 0;
    const movementY = retreating
      ? (retreatDy / retreatLength) * speed
      : !recovering && len > closingDistance
        ? dirY * speed + dirX * orbit
        : !recovering && !plantedGolem ? dirX * 58 : 0;
    if (Math.abs(movementX) > 3) boss.facingX = movementX;
    boss.x = clamp(boss.x + movementX * dt, state.bossArena.x + boss.radius, state.bossArena.x + state.bossArena.w - boss.radius);
    boss.y = clamp(boss.y + movementY * dt, state.bossArena.y + boss.radius, state.bossArena.y + state.bossArena.h - boss.radius);
    if (!recovering && boss.cooldown <= 0 && len < (boss.variant === 'dragonBoss' ? 900 : 430)) {
      const attackRoll = Math.random();
      if (boss.variant === 'stormglassLeviathan') {
        boss.attackType = attackRoll < 0.19 ? 'tridentCrush' : attackRoll < 0.34 ? 'stormglassDash' : attackRoll < 0.48 ? 'lightningLance' : attackRoll < 0.61 ? 'stormArcVolley' : attackRoll < 0.72 ? 'forkedLightning' : attackRoll < 0.83 ? 'glassTempest' : attackRoll < 0.92 ? 'stormSurge' : 'shatteredTide';
      } else if (boss.variant === 'clockworkSeraph') {
        boss.attackType = attackRoll < 0.18 ? 'gearHalberd' : attackRoll < 0.33 ? 'clockworkDash' : attackRoll < 0.46 ? 'gearVolley' : attackRoll < 0.59 ? 'seraphClockburst' : attackRoll < 0.7 ? 'cogCrossfire' : attackRoll < 0.82 ? 'judgmentHour' : attackRoll < 0.92 ? 'timeLock' : 'rewindPulse';
      } else if (boss.variant === 'gravebloomColossus') {
        boss.attackType = attackRoll < 0.21 ? 'tombMaul' : attackRoll < 0.36 ? 'rootChargeDash' : attackRoll < 0.49 ? 'graveSeedVolley' : attackRoll < 0.62 ? 'graveThornCircle' : attackRoll < 0.73 ? 'corpsePetalBurst' : attackRoll < 0.84 ? 'gravebloom' : attackRoll < 0.93 ? 'rootCage' : 'tombVines';
      } else if (boss.variant === 'lunarKitsune') {
        boss.attackType = attackRoll < 0.18 ? 'crescentCut' : attackRoll < 0.34 ? 'ninefoldDash' : attackRoll < 0.48 ? 'lunarBolts' : attackRoll < 0.61 ? 'kitsuneStarfan' : attackRoll < 0.72 ? 'moonCrescentFan' : attackRoll < 0.83 ? 'moonfall' : attackRoll < 0.92 ? 'eclipseNova' : 'foxfireCircle';
      } else if (boss.variant === 'eternityWarden') {
        boss.attackType = attackRoll < 0.17 ? 'epochBlade' : attackRoll < 0.31 ? 'timeRendDash' : attackRoll < 0.44 ? 'hourglassVolley' : attackRoll < 0.57 ? 'eternityParadox' : attackRoll < 0.68 ? 'chronoSpiral' : attackRoll < 0.8 ? 'timeCollapse' : attackRoll < 0.9 ? 'endOfAges' : 'finalSecond';
      } else if (boss.variant === 'drownedBell') {
        boss.attackType = attackRoll < 0.03 ? 'deathKnell'
          : attackRoll < 0.52 ? 'drownedSweep' : 'undertowDash';
      } else if (boss.variant === 'meltedMonarch') {
        const livingAcolytes = state.enemies.filter(
          (enemy) => enemy.type === 'waxAcolyte' && !enemy.dead && enemy.health > 0,
        ).length;
        boss.attackType = attackRoll < 0.03 ? 'royalMeltdown'
          : attackRoll < 0.19 && livingAcolytes < 4 ? 'summonWaxAcolytes'
            : attackRoll < 0.58 ? 'meltedCleave' : 'meltedCandleburst';
      } else if (boss.variant === 'crimsonMarionette') {
        boss.attackType = attackRoll < 0.03 ? 'crimsonFinalCurtain'
          : attackRoll < 0.39 ? 'crimsonScissor'
            : attackRoll < 0.68 ? 'crimsonPirouetteDash' : 'crimsonSnare';
      } else if (boss.variant === 'inkboundArchivist') {
        boss.attackType = attackRoll < 0.03 ? 'inkboundBookLaunch'
          : attackRoll < 0.4 ? 'inkboundQuill'
            : attackRoll < 0.72 ? 'inkboundSweep' : 'inkboundDecree';
      } else if (boss.variant === 'hollowStarBoss') {
        boss.attackType = attackRoll < 0.04 ? 'hollowStarGroundSlam'
          : attackRoll < 0.52 ? 'hollowStarOverhead' : 'hollowStarRoundhouse';
      } else if (boss.variant === 'yinYangBoss') {
        boss.attackType = attackRoll < 0.03 ? 'yinYangArenaSlam'
          : attackRoll < 0.39 ? 'yinYangOverhead'
            : attackRoll < 0.71 ? 'yinYangRoundhouse'
              : 'yinYangNova';
      } else if (boss.variant === 'dragonBoss') {
        boss.attackType = boss.fireBreathCooldown <= 0
          ? 'dragonFire'
          : attackRoll < 0.58 ? 'dragonIceStaff' : 'dragonSwipe';
        if (boss.attackType === 'dragonFire') {
          boss.attackAimAngle = Math.atan2(player.y - boss.y, player.x - boss.x);
        }
      } else if (boss.variant === 'lushGolem') {
        boss.attackType = attackRoll < 0.5 ? 'rootSlam' : attackRoll < 0.84 ? 'thornRing' : 'healingBloom';
      } else if (boss.variant === 'lavaGolem') {
        boss.attackType = attackRoll < 0.62 ? 'hammerSlam' : 'eruption';
      } else if (boss.variant === 'oceanBoss') {
        boss.attackType = attackRoll < 0.4 ? 'tideSlam' : attackRoll < 0.7 ? 'waterDash' : 'tidalWave';
      } else if (boss.variant === 'iceBoss') {
        boss.attackType = attackRoll < 0.4 ? 'iceSlam' : attackRoll < 0.7 ? 'frostDash' : 'blizzard';
      } else if (boss.variant === 'skeletonWarlord') {
        boss.attackType = attackRoll < 0.5 ? 'boneSlam' : attackRoll < 0.76 ? 'Dash' : 'nova';
      } else if (boss.variant === 'sandBoss') {
        boss.attackType = attackRoll < 0.48 ? 'sandSlam' : attackRoll < 0.72 ? 'Dash' : 'nova';
      } else if (boss.variant === 'shadowBoss') {
        boss.attackType = attackRoll < 0.3 ? 'shadowSlam'
          : attackRoll < 0.54 ? 'shadowDash'
            : attackRoll < 0.74 ? 'nova'
              : attackRoll < 0.9 ? 'summonNightclaw' : 'summonDreadscale';
      } else if (boss.variant === 'abyssBoss') {
        boss.attackType = boss.phase === 2
          ? (attackRoll < 0.38 ? 'abyssRend' : attackRoll < 0.7 ? 'abyssDash' : 'abyssNova')
          : (attackRoll < 0.5 ? 'abyssSlam' : attackRoll < 0.78 ? 'abyssDash' : 'abyssNova');
      } else if (boss.variant === 'scorpionQueen') {
        boss.attackType = attackRoll < 0.34 ? 'pincerSlam'
          : attackRoll < 0.6 ? 'scorpioDash'
            : attackRoll < 0.84 ? 'venomNova' : 'summonBrood';
      } else if (boss.variant === 'fungalBoss') {
        boss.attackType = attackRoll < 0.42 ? 'myceliumSlam'
          : attackRoll < 0.7 ? 'hyphaDash' : 'sporeburst';
      } else if (boss.variant === 'mechOverlord') {
        boss.attackType = attackRoll < 0.3 ? 'drillSlam'
          : attackRoll < 0.54 ? 'pistonDash'
            : attackRoll < 0.74 ? 'reactorNova'
              : attackRoll < 0.89 ? 'deploySentinel' : 'deployBear';
      } else if (boss.variant === 'crystalBoss') {
        boss.attackType = attackRoll < 0.4 ? 'crystalSlam'
          : attackRoll < 0.7 ? 'prismDash' : 'crystalEruption';
      } else if (boss.variant === 'sandSnake') {
        boss.attackType = attackRoll < 0.38 ? 'staffCrush'
          : attackRoll < 0.7 ? 'serpentDash' : 'scarabStorm';
      } else if (boss.variant === 'woodBoss') {
        if (!boss.heartwoodEruptionUsed) {
          boss.attackType = 'heartwoodEruption';
          boss.heartwoodEruptionUsed = true;
        } else {
          boss.attackType = attackRoll < 0.3 ? 'woodSlam'
            : attackRoll < 0.55 ? 'thornRing' : 'heartwoodEruption';
        }
      } else {
        boss.attackType = attackRoll < 0.36 ? 'slam' : attackRoll < 0.68 ? 'Dash' : 'nova';
      }
      const radialAttack = ['thornRing', 'heartwoodEruption', 'healingBloom', 'eruption', 'tidalWave', 'blizzard', 'nova', 'abyssNova', 'venomNova', 'summonBrood', 'summonNightclaw', 'summonDreadscale', 'sporeburst', 'reactorNova', 'deploySentinel', 'deployBear', 'crystalEruption', 'scarabStorm', 'yinYangNova', 'yinYangRoundhouse', 'yinYangArenaSlam', 'hollowStarRoundhouse', 'hollowStarGroundSlam', 'inkboundSweep', 'inkboundDecree', 'crimsonSnare', 'crimsonFinalCurtain', 'royalMeltdown', 'drownedSweep', 'deathKnell', 'glassTempest', 'stormSurge', 'shatteredTide', 'judgmentHour', 'timeLock', 'rewindPulse', 'gravebloom', 'rootCage', 'tombVines', 'moonfall', 'eclipseNova', 'foxfireCircle', 'timeCollapse', 'endOfAges', 'finalSecond'].includes(boss.attackType);
      boss.attackWindupTotal = radialAttack ? 0.9 : boss.attackType.includes('Dash') ? 0.58 : 0.46;
      boss.attackWindup = boss.attackWindupTotal;
      boss.cooldown = Math.max(boss.variant === 'abyssBoss' && boss.phase === 2 ? 0.62 : 0.85, (radialAttack ? 2.15 : 1.55) - boss.tier * 0.07 - (boss.variant === 'abyssBoss' && boss.phase === 2 ? 0.25 : 0));
      if (boss.variant === 'lavaGolem') {
        boss.attackWindupTotal = boss.attackType === 'eruption' ? 0.72 : 0.38;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'eruption' ? 1.25 : 0.9;
      }
      if (boss.variant === 'dragonBoss') {
        boss.attackWindupTotal = boss.attackType === 'dragonFire' ? 1.35 : boss.attackType === 'dragonIceStaff' ? 0.72 : 0.42;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'dragonFire' ? 2.4 : 1.7;
      }
      if (boss.variant === 'yinYangBoss') {
        boss.attackWindupTotal = boss.attackType === 'yinYangArenaSlam' ? 2.1 : boss.attackType === 'yinYangOverhead' ? 1.35 : boss.attackType === 'yinYangRoundhouse' ? 1.16 : 1.18;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'yinYangArenaSlam' ? 3.8 : boss.attackType === 'yinYangNova' ? 2 : 1.25;
      }
      if (boss.variant === 'hollowStarBoss') {
        boss.attackWindupTotal = boss.attackType === 'hollowStarGroundSlam' ? 2.25 : boss.attackType === 'hollowStarOverhead' ? 1.42 : 1.22;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'hollowStarGroundSlam' ? 4.1 : 1.45;
      }
      if (boss.variant === 'inkboundArchivist') {
        boss.attackWindupTotal = boss.attackType === 'inkboundBookLaunch' ? 1.1 : boss.attackType === 'inkboundDecree' ? 2.05 : boss.attackType === 'inkboundQuill' ? 1.4 : 1.2;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'inkboundBookLaunch' ? 4.5 : boss.attackType === 'inkboundDecree' ? 2.4 : 1.5;
      }
      if (boss.variant === 'crimsonMarionette') {
        boss.attackWindupTotal = boss.attackType === 'crimsonFinalCurtain' ? 2.45 : boss.attackType === 'crimsonSnare' ? 1.65 : boss.attackType === 'crimsonPirouetteDash' ? 1.05 : 1.55;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'crimsonFinalCurtain' ? 4.6 : boss.attackType === 'crimsonSnare' ? 2.15 : 1.7;
      }
      if (boss.variant === 'meltedMonarch') {
        boss.attackWindupTotal = boss.attackType === 'royalMeltdown' ? 2.6 : boss.attackType === 'summonWaxAcolytes' ? 1.7 : boss.attackType === 'meltedCandleburst' ? 1.35 : 1.55;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'royalMeltdown' ? 4.8 : boss.attackType === 'summonWaxAcolytes' ? 3.1 : boss.attackType === 'meltedCandleburst' ? 2.05 : 1.75;
      }
      if (boss.variant === 'drownedBell') {
        boss.attackWindupTotal = boss.attackType === 'deathKnell' ? 2.65 : boss.attackType === 'undertowDash' ? 1.08 : 1.5;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'deathKnell' ? 4.9 : boss.attackType === 'undertowDash' ? 1.85 : 1.75;
      }
      if (['stormglassLeviathan', 'clockworkSeraph', 'gravebloomColossus', 'lunarKitsune', 'eternityWarden'].includes(boss.variant)) {
        const ultimateAttack = ['glassTempest', 'stormSurge', 'shatteredTide', 'judgmentHour', 'timeLock', 'rewindPulse', 'gravebloom', 'rootCage', 'tombVines', 'moonfall', 'eclipseNova', 'foxfireCircle', 'timeCollapse', 'endOfAges', 'finalSecond'].includes(boss.attackType);
        const projectileAttack = ['lightningLance', 'stormArcVolley', 'forkedLightning', 'gearVolley', 'seraphClockburst', 'cogCrossfire', 'graveSeedVolley', 'graveThornCircle', 'corpsePetalBurst', 'lunarBolts', 'kitsuneStarfan', 'moonCrescentFan', 'hourglassVolley', 'eternityParadox', 'chronoSpiral'].includes(boss.attackType);
        boss.attackWindupTotal = ultimateAttack ? (boss.attackType === 'timeCollapse' || boss.attackType === 'endOfAges' ? 2.6 : 1.8) : projectileAttack ? 0.92 : boss.attackType.includes('Dash') ? 0.72 : 0.58;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = ultimateAttack ? 3.8 : projectileAttack ? 1.9 : 1.35;
      }
    }
  }
}

// Runs every boss in a post-roster Pantheon group while preserving the
// single-boss state expected by the established boss AI and summon systems.
function updateBoss(dt) {
  const group = state.pantheonMode && state.pantheonBosses.length > 0
    ? state.pantheonBosses
    : state.boss ? [state.boss] : [];
  if (group.length <= 1 && !state.pantheonFinalTrial) {
    updateSingleBoss(dt);
    return;
  }

  for (const boss of group) {
    state.boss = boss;
    updateSingleBoss(dt);
  }
  const livingBoss = group.find((boss) => boss.health > 0);
  state.boss = livingBoss || group[0];
  const survivingSummons = state.enemies.some((enemy) => enemy.bossMinion && !enemy.dead && enemy.health > 0);
  const groupDefeated = group.every((boss) => boss.health <= 0);
  if (!groupDefeated || survivingSummons) return;

  if (!state.pantheonGroupRewarded) {
    state.pantheonGroupRewarded = true;
    if (state.pantheonFinalTrial) {
      group.forEach((boss) => {
        discoverJournalEntry(boss.variant);
        state.score += getBossScore(boss);
      });
      grantPantheonCrateCache();
      player.health = clamp(player.health + 30, 0, player.maxHealth);
      state.pantheonFinalBatch += 1;
      setMessage('Pantheon final-trial group defeated!');
    } else {
      rewardBossLoot();
      setMessage('The entire Pantheon group has fallen!');
    }
  }
  if (group.every((boss) => (boss.deathTimer || 0) === 0)) {
    state.enemyProjectiles = [];
    state.playerProjectiles = [];
    state.enemies = [];
    if (state.pantheonFinalTrial && state.pantheonFinalBatch * 3 >= 26) {
      completePantheon();
    } else {
      spawnBoss();
      showBossSplash();
    }
  }
}

// Converts internal camelCase item IDs into readable labels.
function formatLootName(item) {
  if (item === 'openerShard') return 'Scout Shard';
  if (item === 'arrowBundle') return 'Arrow Bundle (+7 shots)';
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
  pauseKeyboardUnlockAt = state.paused ? performance.now() + 350 : 0;
  keys.clear();
  pauseOverlay.classList.toggle('hidden', !state.paused);
}

// Leaves an active run from either the pause button or its Esc shortcut.
function quitPausedRun() {
  state.paused = false;
  state.started = false;
  pauseKeyboardUnlockAt = 0;
  pauseOverlay.classList.add('hidden');
  keys.clear();
  showMainMenu();
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
  movementControlEditor.classList.add('hidden');
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

// The only true game victory: every solo Pantheon boss and every final batch.
function completePantheon() {
  if (state.isGameOver) return;
  state.isGameOver = true;
  state.started = false;
  state.paused = false;
  pauseOverlay.classList.add('hidden');
  keys.clear();
  const leaderboardRank = recordCompletedRun(state.score, state.wave, 26);
  overlayTitle.textContent = 'Pantheon Conquered';
  deathCauseText.textContent = 'Every boss and its army has fallen.';
  deathCauseText.classList.remove('hidden');
  overlayText.textContent = `${currentHeroName} completed the Pantheon and won the game with ${state.score.toLocaleString()} points.${leaderboardRank ? ` Hall of Heroes rank: #${leaderboardRank}.` : ''}`;
  heroProverb.textContent = '“The final step was every battle at once—and still the hero stood.”';
  heroProverb.classList.add('death-proverb');
  overlay.querySelector('.main-menu-card').classList.add('death-menu-card');
  heroNameEditor.classList.add('hidden');
  movementControlEditor.classList.add('hidden');
  changeHeroButton.classList.add('hidden');
  openHighScoresButton.classList.add('hidden');
  controlsGrid.style.display = 'none';
  openArmoryButton.disabled = true;
  openArmoryButton.tabIndex = -1;
  openArmoryButton.classList.add('portrait-only');
  openArmoryButton.setAttribute('aria-label', 'Victorious hero');
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
  state.maxRooms = state.godMode && (state.godTravelMode === 'biome' || state.godTravelMode === 'enemy')
    ? 1
    : 8;
  state.enemies = [];
  state.crates = [];
  state.pendingBossCrates = 0;
  state.boss = null;
  state.pantheonBosses = [];
  state.pantheonGroupRewarded = false;
  state.pantheonFinalTrial = false;
  state.pantheonFinalBatch = 0;
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
  state.enemyProjectiles = [];
  state.playerProjectiles = [];
  state.shake = 0;
  state.hitStopTimer = 0;
  state.closeZoom = false;
  state.teleportTimer = 0;
  state.teleportMoved = false;
  state.teleportTarget = null;
  state.transitionStyle = 'teleport';
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
  player.frozenTimer = 0;
  player.attackCooldown = 0;
  player.attackDuration = 0;
  player.poisonTimer = 0;
  player.poisonDps = 0;
  player.facing = { x: 1, y: 0 };
  player.visualFacingX = 1;
  player.inventory = { bandage: 0, ammo: 0, protectorShard: 0, openerShard: 0, shieldShard: 0 };
  player.shieldActive = false;
  player.shieldTimer = 0;
  player.protectors = [];
  player.openers = [];
  player.weaponLevel = 1;

  createRooms();
  placePlayerInFirstRoom();
  spawnEnemiesForWave();
  if (state.godMode && state.godTravelMode === 'biome') {
    state.enemies = [];
    state.crates = [];
    state.challengeRooms = [];
    state.enemyProjectiles = [];
    state.playerProjectiles = [];
    state.particles = [];
    const room = state.rooms[0];
    room.locked = false;
    room.challenge = false;
  }
  if (state.godMode && state.godTravelMode === 'enemy' && state.forcedEnemyType) {
    const room = state.rooms[0];
    const enemy = createEnemy(room, 0, state.forcedEnemyType);
    enemy.aggro = true;
    state.enemies = [enemy];
    state.crates = [];
    state.challengeRooms = [];
    room.locked = false;
    room.challenge = false;
  }
  messageBox.classList.add('hidden');
}

// Returns from a finished run while preserving the current hero and equipment.
function showMainMenu() {
  stopAttractMode();
  if (state.pantheonMode) restorePrePantheonLoadout();
  state.pantheonMode = false;
  state.pantheonEscapeArmedUntil = 0;
  document.body.classList.remove('room-showcase');
  state.godMode = false;
  state.godTravelMode = null;
  state.forcedThemeIndex = null;
  state.forcedEnemyType = null;
  state.forcedBossVariant = null;
  state.forcedRoomArtwork = null;
  resetRun();
  showRandomHeroProverb();
  overlayTitle.textContent = 'Endless Dungeon';
  deathCauseText.classList.add('hidden');
  deathCauseText.textContent = '';
  overlayText.textContent = 'Explore rooms, open crates, survive waves, and defeat the boss.';
  heroProverb.classList.remove('death-proverb');
  overlay.querySelector('.main-menu-card').classList.remove('death-menu-card');
  heroNameEditor.classList.remove('hidden');
  movementControlEditor.classList.remove('hidden');
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

// Attract mode is a harmless arcade reel: it never starts or mutates a run.
function homeMenuIsIdleReady() {
  return !state.started
    && !state.isGameOver
    && !overlay.classList.contains('hidden')
    && armoryOverlay.classList.contains('hidden')
    && journalOverlay.classList.contains('hidden')
    && highScoresOverlay.classList.contains('hidden')
    && genderOverlay.classList.contains('hidden')
    && godModeOverlay.classList.contains('hidden');
}

function startAttractMode() {
  if (attractMode.active || !homeMenuIsIdleReady()) return;
  attractMode.active = true;
  attractMode.elapsed = 0;
  keys.clear();
  overlay.classList.add('hidden');
  document.body.classList.add('attract-mode');
}

function stopAttractMode() {
  if (!attractMode.active) {
    menuLastActivity = performance.now();
    return;
  }
  attractMode.active = false;
  attractMode.elapsed = 0;
  document.body.classList.remove('attract-mode');
  overlay.classList.remove('hidden');
  menuLastActivity = performance.now();
}

function drawAttractSprite(image, x, y, width, height, {
  flip = false,
  bob = 0,
  rotation = 0,
  shadow = '#000',
} = {}) {
  if (!image?.complete || image.naturalWidth <= 0) return;
  ctx.save();
  ctx.translate(x, y + bob);
  ctx.rotate(rotation);
  ctx.scale(flip ? -1 : 1, 1);
  ctx.shadowColor = shadow;
  ctx.shadowBlur = 18;
  ctx.drawImage(image, -width / 2, -height, width, height);
  ctx.restore();
}

// Draws a looping comedy chase over a deliberately over-serious arcade backdrop.
function drawAttractMode() {
  const t = attractMode.elapsed;
  const scene = Math.min(t, 35.999);
  const escapeProgress = clamp((t - 36) / 3, 0, 1);
  const unit = clamp(Math.min(canvas.width / 1280, canvas.height / 720), 0.65, 1.35);
  const stripY = canvas.height * 0.12;
  const stripHeight = canvas.height * 0.76;
  const groundY = stripY + stripHeight * 0.56;
  const runBob = Math.abs(Math.sin(t * (11 + escapeProgress * 9))) * 10 * unit;

  ctx.fillStyle = '#050208';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Repeat one dungeon room as an endless horizontal belt behind the chase.
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, stripY, canvas.width, stripHeight);
  ctx.clip();
  const roomTileWidth = stripHeight * 1.5;
  const roomScroll = ((t * 185 + Math.max(0, t - 36) * 420) * unit) % roomTileWidth;
  if (art.demoRockRoom.complete && art.demoRockRoom.naturalWidth > 0) {
    for (let x = -roomTileWidth - roomScroll; x < canvas.width + roomTileWidth; x += roomTileWidth) {
      drawImageCover(art.demoRockRoom, x, stripY, roomTileWidth + 2, stripHeight);
    }
  } else {
    ctx.fillStyle = '#23143b';
    ctx.fillRect(0, stripY, canvas.width, stripHeight);
  }
  ctx.fillStyle = 'rgba(4, 2, 10, 0.3)';
  ctx.fillRect(0, stripY, canvas.width, stripHeight);
  ctx.restore();

  ctx.strokeStyle = 'rgba(192, 132, 252, 0.75)';
  ctx.lineWidth = 3;
  ctx.strokeRect(0, stripY, canvas.width, stripHeight);

  const chaseAnchorX = canvas.width * 0.72 + Math.sin(t * 2.3) * 20 * unit;
  const heroX = chaseAnchorX + escapeProgress * escapeProgress * (canvas.width * 0.48 + 140 * unit);
  drawAttractSprite(art.hero, heroX, groundY + 3, 108 * unit, 160 * unit, {
    flip: true,
    bob: -runBob,
    rotation: Math.sin(t * 11) * 0.035,
    shadow: '#38bdf8',
  });

  const chickenCount = scene < 3 ? 0 : scene < 6 ? 1 : scene < 9 ? 3 : 5;
  for (let i = 0; i < chickenCount; i += 1) {
    const size = (scene > 13 && i === 0 ? 390 : 205 - i * 12) * unit;
    const chaseX = chaseAnchorX - (235 + i * 155 - Math.sin(t * 3 + i) * 32) * unit;
    drawAttractSprite(art.demoChicken, chaseX, groundY + 10, size, size * 0.88, {
      flip: true,
      bob: -Math.abs(Math.sin(t * 8 + i)) * 14 * unit,
      rotation: Math.sin(t * 7 + i) * 0.045,
      shadow: '#facc15',
    });
  }

  if (scene >= 9) {
    const violentHippo = scene >= 21;
    const hippoSize = (violentHippo ? 360 : 285) * unit;
    const hippoX = chaseAnchorX - (violentHippo ? 500 : 660) * unit + Math.sin(t * 4) * 20;
    drawAttractSprite(art.oceanHippo, hippoX, groundY + 8, hippoSize, hippoSize * 0.76, {
      flip: true,
      bob: -Math.abs(Math.sin(t * 5.5)) * 8 * unit,
      rotation: Math.sin(t * 5.5) * 0.025,
      shadow: '#22d3ee',
    });
  }

  if (scene > 10) {
    const panicOffset = Math.sin(t * 15) * 5 * unit;
    ctx.fillStyle = '#f8fafc';
    ctx.font = `900 ${Math.round(30 * unit)}px "Courier New", monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('!', heroX + panicOffset, groundY - 185 * unit);
  }

  const captions = [
    'A PERFECTLY NORMAL DUNGEON',
    'THE CHICKEN HAS NOT FORGOTTEN',
    'TACTICAL RETREAT IN PROGRESS',
    'WHY IS THIS HIPPO HERE?',
    'THIS WAS NOT IN THE BEASTIARY',
    'NEW PLAN: RUN FASTER',
    'THE CHICKENS HAVE UNIONIZED',
    'THE HIPPO HAS CHOSEN VIOLENCE',
    'DO NOT MAKE EYE CONTACT',
    'CARDIO WAS NOT AN OPTIONAL QUEST',
    'THE EXIT WAS THREE ROOMS AGO',
    'TACTICALLY STILL RETREATING',
  ];
  const caption = captions[Math.floor(scene / 3) % captions.length];
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000';
  ctx.shadowBlur = 10;
  if (escapeProgress === 0) {
    ctx.fillStyle = '#fff';
    ctx.font = `900 ${Math.round(34 * unit)}px "Courier New", monospace`;
    ctx.fillText(caption, canvas.width / 2, stripY + 48 * unit);
  }
  ctx.fillStyle = '#cbd5e1';
  ctx.font = `700 ${Math.round(15 * unit)}px "Courier New", monospace`;
  ctx.fillText('PRESS ANY KEY TO SAVE THE HERO', canvas.width / 2, canvas.height - 28 * unit);
  ctx.shadowBlur = 0;
}

const godBossOrder = [
  'lushGolem', 'lavaGolem', 'oceanBoss', 'iceBoss', 'skeletonWarlord',
  'sandBoss', 'shadowBoss', 'abyssBoss', 'scorpionQueen', 'woodBoss',
  'fungalBoss', 'mechOverlord', 'crystalBoss', 'sandSnake', 'dragonBoss', 'yinYangBoss', 'hollowStarBoss', 'inkboundArchivist', 'crimsonMarionette', 'meltedMonarch', 'drownedBell', 'stormglassLeviathan', 'clockworkSeraph', 'gravebloomColossus', 'lunarKitsune', 'eternityWarden', 'standard',
];

function getGodBiome(entry) {
  const biomeByFolder = {
    'retro-ruins': { themeIndex: 4, roomArtwork: 'roomRuins', name: 'Retro Ruins' },
    'verdant-ruins': { themeIndex: 0, roomArtwork: 'lushCave', name: 'Verdant Ruins' },
    'sunken-shrine': { themeIndex: 1, roomArtwork: 'oceanRoom', name: 'Sunken Shrine' },
    'cinder-keep': { themeIndex: 2, roomArtwork: 'lavaRoom', name: 'Cinder Keep' },
    'frozen-depths': { themeIndex: 3, roomArtwork: 'iceRoom', name: 'Frozen Depths' },
    'bony-ruins': { themeIndex: 5, roomArtwork: 'skeletonRoom', name: 'Bony Ruins' },
    'desert-ruins': { themeIndex: 6, roomArtwork: 'sandRoom', name: 'Desert Ruins' },
    'abyssal-depths': { themeIndex: 7, roomArtwork: 'abyssRoom', name: 'Abyssal Depths' },
    'crystal-sanctum': { themeIndex: 8, roomArtwork: 'crystalRoom', name: 'Crystal Sanctum' },
    'astral-foundry': { themeIndex: 9, roomArtwork: 'astralRoom', name: 'Astral Foundry' },
    'sunreef-lagoon': { themeIndex: 10, roomArtwork: 'sunreefRoom', name: 'Sunreef Lagoon' },
    'fungal-dominion': { themeIndex: 0, roomArtwork: 'fungalArena', name: 'Fungal Dominion' },
    moonwood: { themeIndex: 0, roomArtwork: 'woodArena', name: 'Moonwood' },
    'furnace-foundry': { themeIndex: 8, roomArtwork: 'mechRoom', name: 'Furnace Foundry' },
    'shadow-realm': { themeIndex: 7, roomArtwork: 'shadowRoom', name: 'Shadow Realm' },
    dragon: { themeIndex: 3, roomArtwork: 'dragonArena', name: 'Dragon Arena' },
    'yin-yang': { themeIndex: 8, roomArtwork: 'yinYangArena', name: 'Yin Yang Arena' },
    'hollow-star': { themeIndex: 7, roomArtwork: 'hollowStarArena', name: 'Hollow Observatory' },
    'inkbound-archive': { themeIndex: 7, roomArtwork: 'inkboundArena', name: 'Inkbound Archive' },
    'crimson-marionette': { themeIndex: 7, roomArtwork: 'crimsonMarionetteArena', name: 'Crimson Theatre' },
    'melted-monarch': { themeIndex: 2, roomArtwork: 'meltedMonarchArena', name: 'Candle Cathedral' },
    'drowned-bell': { themeIndex: 1, roomArtwork: 'drownedBellArena', name: 'Drowned Belfry' },
    'stormglass-leviathan': { themeIndex: 1, roomArtwork: 'stormglassArena', name: 'Stormglass Deep' },
    'clockwork-seraph': { themeIndex: 8, roomArtwork: 'clockworkSeraphArena', name: 'Clockwork Heaven' },
    'gravebloom-colossus': { themeIndex: 0, roomArtwork: 'gravebloomArena', name: 'Gravebloom Cemetery' },
    'lunar-kitsune': { themeIndex: 7, roomArtwork: 'lunarKitsuneArena', name: 'Moonlit Court' },
    'eternity-warden': { themeIndex: 7, roomArtwork: 'eternityWardenArena', name: 'End of Time' },
  };
  const folder = entry.image.match(/assets\/themes\/([^/]+)\//)?.[1];
  return biomeByFolder[folder] || biomeByFolder['retro-ruins'];
}

function getGodThemeIndex(entry) {
  return getGodBiome(entry).themeIndex;
}

function closeGodModeForTravel() {
  godModeOverlay.classList.add('hidden');
  overlay.classList.add('hidden');
}

function enterGodBiome(themeIndex) {
  document.body.classList.add('room-showcase');
  state.godMode = true;
  state.godTravelMode = 'biome';
  state.forcedThemeIndex = themeIndex;
  state.forcedEnemyType = null;
  state.forcedBossVariant = null;
  state.forcedRoomArtwork = null;
  resetRun();
  closeGodModeForTravel();
  startGame();
}

function enterGodEnemy(entry) {
  document.body.classList.remove('room-showcase');
  const biome = getGodBiome(entry);
  state.godMode = true;
  state.godTravelMode = 'enemy';
  state.forcedThemeIndex = biome.themeIndex;
  state.forcedEnemyType = entry.id;
  state.forcedBossVariant = null;
  state.forcedRoomArtwork = biome.roomArtwork;
  resetRun();
  closeGodModeForTravel();
  startGame();
  setMessage(`${entry.name} in ${biome.name}. Press Esc to return.`);
}

function enterGodBoss(entry) {
  document.body.classList.remove('room-showcase');
  state.godMode = true;
  state.godTravelMode = 'boss';
  state.forcedThemeIndex = getGodThemeIndex(entry);
  state.forcedEnemyType = null;
  state.forcedBossVariant = entry.id;
  state.forcedRoomArtwork = null;
  resetRun();
  player.inventory.ammo = 100;
  player.inventory.bandage = 20;
  player.inventory.shieldShard = 30;
  state.bossDefeated = Math.max(0, godBossOrder.indexOf(entry.id));
  state.enemies = [];
  state.started = true;
  closeGodModeForTravel();
  spawnBoss();
  showBossSplash();
}

function renderGodModeMenu() {
  godModeGrid.replaceChildren();
  const sections = [
    {
      title: 'Biomes',
      items: world.themes.map((theme, index) => ({ label: theme.name, action: () => enterGodBiome(index) })),
    },
    {
      title: 'Mobs',
      items: journalCatalog.filter((entry) => entry.kind === 'Enemy')
        .map((entry) => ({ label: entry.name, action: () => enterGodEnemy(entry) })),
    },
    {
      title: 'Bosses',
      items: journalCatalog.filter((entry) => entry.kind === 'Boss')
        .map((entry) => ({ label: entry.name, action: () => enterGodBoss(entry) })),
    },
  ];
  for (const section of sections) {
    const container = document.createElement('section');
    container.className = 'god-mode-section';
    const heading = document.createElement('h2');
    heading.textContent = section.title;
    const options = document.createElement('div');
    options.className = 'god-mode-options';
    for (const item of section.items) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = item.label;
      button.addEventListener('click', item.action);
      options.appendChild(button);
    }
    container.append(heading, options);
    godModeGrid.appendChild(container);
  }
}

function openGodModeMenu() {
  renderGodModeMenu();
  godModeOverlay.classList.remove('hidden');
}

function closeGodModeMenu() {
  godModeOverlay.classList.add('hidden');
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
  const godEnemyRoomArtwork = state.godMode
    && state.godTravelMode === 'enemy'
    && state.forcedRoomArtwork
    ? art[state.forcedRoomArtwork]
    : null;
  const roomArtwork = godEnemyRoomArtwork || (theme.name === 'Verdant Ruins'
    ? art.lushCave
    : theme.name === 'Bloomed Hollow'
      ? art.roomRuins
    : theme.name === 'Sunken Shrine'
      ? art.oceanRoom
    : theme.name === 'Cinder Keep'
      ? art.lavaRoom
      : theme.name === 'Frozen Depths'
        ? art.iceRoom
        : theme.name === 'Bony Ruins'
          ? art.skeletonRoom
          : theme.name === 'Desert Ruins'
            ? art.sandRoom
            : theme.name === 'Abyssal Depths'
              ? art.abyssRoom
            : theme.name === 'Crystal Sanctum'
              ? art.crystalRoom
            : theme.name === 'Astral Foundry'
              ? art.astralRoom
            : theme.name === 'Sunreef Lagoon'
              ? art.sunreefRoom
        : null);
  if (roomArtwork?.complete && roomArtwork.naturalWidth > 0) {
    const interiorX = room.x + wallThickness;
    const interiorY = room.y + wallThickness;
    const interiorW = room.w - wallThickness * 2;
    const interiorH = room.h - wallThickness * 2;
    drawImageCover(roomArtwork, interiorX, interiorY, interiorW, interiorH);
    ctx.fillStyle = theme.name === 'Cinder Keep'
      ? 'rgba(54, 12, 4, 0.12)'
      : theme.name === 'Desert Ruins'
        ? 'rgba(92, 48, 12, 0.1)'
      : theme.name === 'Abyssal Depths'
        ? 'rgba(3, 7, 30, 0.12)'
      : theme.name === 'Crystal Sanctum'
        ? 'rgba(8, 47, 73, 0.1)'
      : theme.name === 'Sunken Shrine' || theme.name === 'Frozen Depths'
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
  if ((crate.dropDelay || 0) > 0) {
    ctx.restore();
    return;
  }
  const dropProgress = crate.dropDuration
    ? clamp((crate.dropTimer || 0) / crate.dropDuration, 0, 1)
    : 0;
  const dropOffset = -190 * dropProgress * dropProgress;
  const shadowScale = 1 - dropProgress * 0.68;
  ctx.shadowColor = crate.isOpen ? '#8b5cf6' : '#f59e0b';
  ctx.shadowBlur = 12;

  ctx.fillStyle = `rgba(15, 23, 42, ${0.4 * (1 - dropProgress * 0.55)})`;
  ctx.beginPath();
  ctx.ellipse(0, 18, 25 * shadowScale, 8 * shadowScale, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.translate(0, dropOffset);
  ctx.rotate(Math.sin(dropProgress * Math.PI * 4) * dropProgress * 0.08);
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
  wingFlap = 0,
  hitFlash = 0,
  deathProgress = 0,
}) {
  const spriteKey = variant === 'hero' && state.retroMode && !state.boss
    ? 'retroHero'
    : variant === 'hero'
      ? 'hero'
      : variant;
  let sprite = art[spriteKey];
  if (variant === 'lavaEagle') {
    sprite = wingFlap > 0.45
      ? art.lavaEagleFlapDown
      : wingFlap > -0.45
        ? art.lavaEagleFlapMiddle
        : art.lavaEagle;
  }
  const flapFrames = {
    glowBat: [art.glowBatFlapUp, art.glowBatFlapMiddle, art.glowBatFlapDown],
    voidwingDrake: [art.voidwingDrakeFlapUp, art.voidwingDrakeFlapMiddle, art.voidwingDrakeFlapDown],
    sunfeatherGriffin: [art.sunfeatherGriffinFlapUp, art.sunfeatherGriffinFlapMiddle, art.sunfeatherGriffinFlapDown],
    fungalFairyWitch: [art.fungalFairyWitchFlapUp, art.fungalFairyWitchFlapMiddle, art.fungalFairyWitchFlapDown],
    frostwingDrake: [art.frostwingDrakeFlapUp, art.frostwingDrakeFlapMiddle, art.frostwingDrakeFlapDown],
    boneRaven: [art.boneRavenFlapUp, art.boneRavenFlapMiddle, art.boneRavenFlapDown],
    gravewingRaven: [art.gravewingRavenFlapUp, art.gravewingRavenFlapMiddle, art.gravewingRavenFlapDown],
    prismMoth: [art.prismMothFlapUp, art.prismMothFlapMiddle, art.prismMothFlapDown],
    sunscaleRay: [art.sunscaleRayFlapUp, art.sunscaleRayFlapMiddle, art.sunscaleRayFlapDown],
  }[variant];
  if (flapFrames) {
    const frameIndex = wingFlap > 0.45 ? 2 : wingFlap > -0.45 ? 1 : 0;
    const flapSprite = flapFrames[frameIndex];
    if (flapSprite?.complete && flapSprite.naturalWidth > 0) sprite = flapSprite;
  }

  if (!sprite || !sprite.complete || sprite.naturalWidth === 0) {
    return;
  }

  ctx.save();
  ctx.translate(x, y + bob);
  ctx.globalAlpha = 1 - deathProgress;
  ctx.rotate(stride * 0.004 + deathProgress * Math.PI * 1.6);
  const enemyArtOrientation = {
    // Original and clearly side-on sprites.
    walker: 'right', runner: 'right', brute: 'right', spitter: 'right',
    assassin: 'right', crawler: 'right', sentinel: 'right', wraith: 'right',
    burrower: 'right', arcaneOrb: 'front', reaper: 'right',
    skeletonMinion: 'left', desertArcher: 'left', desertScorpion: 'left',
    voidwingDrake: 'left', lavaTiger: 'left', crystalLion: 'left',
    crystalBobcat: 'left', sunfeatherGriffin: 'left', frosthornRam: 'left',
    mechBear: 'left', woodJaguar: 'left', shadowCat: 'right',
    shadowGator: 'left', oceanHippo: 'left', abyssalRazorfin: 'left',
    frostwingDrake: 'left', boneRaven: 'left',

    // Symmetrical or forward-facing artwork must not mirror while moving.
    abyssJelly: 'left', abyssKnight: 'left', abyssSpider: 'left',
    voidSerpent: 'front', skeletonTank: 'left', skeletonSpider: 'left',
    skeletonOrb: 'front', lavaMinion: 'right', lavaSpider: 'left',
    lavaTank: 'right', magmaSerpent: 'front', lavaEagle: 'front',
    crystalMinion: 'right', crystalTank: 'right', desertMummy: 'left',
    sandRoller: 'front', frostWraith: 'front', iceMinion: 'left',
    corruptedStag: 'left', fungalFairyWitch: 'front',
    fungalOozeSnail: 'front', mossboundFungalWarden: 'left',
    mossboundFungalGuardian: 'left',
    mechMinion: 'right', woodMinion: 'left', waxAcolyte: 'left',
    oceanMinion: 'left', oceanTank: 'left', glowBat: 'front',
    crystalStalker: 'front', lushMinion: 'left', lushTank: 'left',
    lushMossling: 'front', lushSporeShroom: 'front',
    starlingMarauder: 'left', cometHound: 'left', astralSentinel: 'left',
    reefclawCrab: 'left', icefangBear: 'left', gravewingRaven: 'left', prismMoth: 'front',
    sunscaleRay: 'left', coralbackTurtle: 'left', tidefangEel: 'left',
  };
  const nativeOrientation = enemyArtOrientation[variant] || 'right';
  const facingScale = variant === 'hero'
    ? (facingX < 0 ? 1 : -1)
    : nativeOrientation === 'front'
      ? 1
    : nativeOrientation === 'right'
      ? (facingX < 0 ? -1 : 1)
      : (facingX < 0 ? 1 : -1);
  const deathScale = 1 - deathProgress * 0.82;
  const deformationFlap = variant === 'lavaEagle' || flapFrames ? 0 : wingFlap;
  ctx.scale(
    facingScale * scale * squashX * (1 + Math.abs(deformationFlap) * 0.05) * deathScale,
    scale * squashY * (1 - Math.abs(deformationFlap) * 0.16) * deathScale,
  );
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
  const spriteWidth = ['magmaSerpent', 'voidSerpent', 'sandRoller'].includes(variant)
    ? 116
    : variant === 'lavaEagle' ? 150
    : ['glowBat', 'voidwingDrake', 'sunfeatherGriffin', 'frostwingDrake'].includes(variant) ? 126
    : variant === 'abyssalRazorfin' ? 132
    : variant === 'boneRaven' ? 104
    : variant === 'frosthornRam' ? 142
    : variant === 'waxAcolyte' ? 86
    : variant === 'mechMinion' ? 106
    : variant === 'mechBear' ? 138
    : variant === 'lavaTiger' ? 132
    : variant === 'woodJaguar' ? 142
    : variant === 'crystalLion' ? 110
    : variant === 'crystalBobcat' ? 98
    : variant === 'shadowCat' ? 118
    : variant === 'oceanHippo' ? 146
    : variant === 'shadowGator' ? 148
    : variant === 'fungalOozeSnail' ? 138
    : variant === 'fungalFairyWitch' ? 126
    : variant === 'mossboundFungalWarden' ? 112
    : variant === 'mossboundFungalGuardian' ? 132
    : variant === 'reefclawCrab' ? 138
    : variant === 'icefangBear' ? 142
    : variant === 'gravewingRaven' ? 126
    : variant === 'prismMoth' ? 128
    : variant === 'sunscaleRay' ? 142
    : variant === 'coralbackTurtle' ? 150
    : variant === 'tidefangEel' ? 132
    : variant === 'astralSentinel' ? 122
    : variant === 'cometHound' ? 136
    : variant === 'starlingMarauder' ? 92
    : variant === 'crystalStalker' ? 102
      : variant === 'crystalMinion' ? 90
      : variant === 'corruptedStag' ? 102
      : variant === 'crystalTank' ? 104
      : variant === 'frostWraith' ? 90
  : ['lavaSpider', 'desertScorpion', 'abyssSpider'].includes(variant)
    ? 112
    : variant === 'desertMummy' ? 94
      : variant === 'desertArcher' ? 82
        : variant === 'abyssKnight' ? 96 : variant === 'abyssJelly' ? 88 : 84;
  const spriteHeight = ['magmaSerpent', 'voidSerpent', 'sandRoller'].includes(variant)
    ? 112
    : variant === 'lavaEagle' ? 120
    : ['glowBat', 'voidwingDrake'].includes(variant) ? 88
      : variant === 'frosthornRam' ? 106
      : variant === 'sunfeatherGriffin' ? 112
    : variant === 'waxAcolyte' ? 126
    : variant === 'mechMinion' ? 128
    : variant === 'mechBear' ? 124
    : variant === 'lavaTiger' ? 126
    : variant === 'woodJaguar' ? 132
    : variant === 'crystalLion' ? 110
    : variant === 'crystalBobcat' ? 98
    : variant === 'shadowCat' ? 126
    : variant === 'oceanHippo' ? 118
    : variant === 'shadowGator' ? 116
    : variant === 'fungalOozeSnail' ? 138
    : variant === 'fungalFairyWitch' ? 148
    : variant === 'mossboundFungalWarden' ? 144
    : variant === 'mossboundFungalGuardian' ? 142
    : variant === 'reefclawCrab' ? 104
    : variant === 'icefangBear' ? 112
    : variant === 'gravewingRaven' ? 112
    : variant === 'prismMoth' ? 108
    : variant === 'sunscaleRay' ? 96
    : variant === 'coralbackTurtle' ? 112
    : variant === 'tidefangEel' ? 112
    : variant === 'astralSentinel' ? 146
    : variant === 'cometHound' ? 110
    : variant === 'starlingMarauder' ? 112
    : variant === 'crystalStalker' ? 118
      : variant === 'crystalMinion' ? 100
        : variant === 'crystalTank' ? 108
      : variant === 'corruptedStag' ? 128
        : variant === 'frostWraith' ? 124
  : ['lavaSpider', 'desertScorpion', 'abyssSpider'].includes(variant)
    ? 84
    : variant === 'desertMummy' ? 112
      : variant === 'desertArcher' ? 106
        : variant === 'abyssKnight' ? 114 : variant === 'abyssJelly' ? 104 : 100;
  ctx.drawImage(sprite, -spriteWidth / 2, 38 - spriteHeight, spriteWidth, spriteHeight);
  ctx.restore();

  if (deathProgress === 0) {
    const spriteTop = y + bob + 38 - spriteHeight * scale;
    const healthBarY = variant === 'hero'
      ? y - 76
      : spriteTop - 16;
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
  const flyingTypes = ['glowBat', 'voidwingDrake', 'sunfeatherGriffin', 'fungalFairyWitch', 'lavaEagle', 'frostwingDrake', 'boneRaven', 'gravewingRaven', 'prismMoth', 'sunscaleRay'];
  const flying = flyingTypes.includes(enemy.type);
  const wingFlap = flying ? Math.sin((enemy.movePhase || 0) * 2.8) : 0;
  const stride = motion * (enemy.type === 'crawler' || enemy.type === 'lushMossling' ? 15 : 9);
  const floating = enemy.type === 'wraith'
    || enemy.type === 'arcaneOrb'
    || enemy.type === 'skeletonOrb'
    || enemy.type === 'frostWraith'
    || enemy.type === 'abyssJelly'
    || enemy.type === 'tidefangEel'
    || enemy.type === 'abyssalRazorfin'
    || enemy.type === 'frostwingDrake'
    || enemy.type === 'boneRaven'
    || (world.themeIndex === 7
      && baseEnemyTypes.has(enemy.type)
      && getAbyssEnemyVariant(enemy.type) === 'abyssJelly');
  const walkingAnimals = [
    'crawler', 'burrower', 'lushMossling', 'crystalStalker', 'lavaSpider',
    'magmaSerpent', 'skeletonSpider', 'desertScorpion', 'sandRoller',
    'abyssSpider', 'voidSerpent', 'corruptedStag', 'fungalOozeSnail', 'crystalLion', 'crystalBobcat',
    'shadowCat', 'shadowGator', 'oceanHippo', 'lavaTiger', 'woodJaguar', 'mechBear', 'frosthornRam',
    'mossboundFungalWarden', 'mossboundFungalGuardian', 'waxAcolyte',
    'cometHound',
    'reefclawCrab', 'icefangBear',
    'coralbackTurtle',
  ];
  const walkBob = walkingAnimals.includes(enemy.type)
    ? Math.abs(motion) * 7
    : Math.abs(motion) * 3;
  const bob = flying
    ? -18 + Math.sin((enemy.movePhase || 0) * 1.4) * 4
    : floating
    ? -14 + motion * 5
    : walkBob - enemy.lunge * 5;
  const squashX = 1 + Math.abs(motion) * 0.07 - enemy.lunge * 0.14;
  const squashY = 1 - Math.abs(motion) * 0.06 + enemy.lunge * 0.18;
  const fastWeakTypes = ['runner', 'crawler', 'assassin', 'wraith', 'arcaneOrb'];
  const slowTypes = ['walker', 'brute', 'spitter', 'sentinel', 'burrower', 'reaper'];
  const themedRole = fastWeakTypes.includes(enemy.type) ? 'Minion' : slowTypes.includes(enemy.type) ? 'Tank' : null;
  let themedVariant = enemy.type;

  if (themedRole) {
    if (world.themeIndex === 2) themedVariant = `lava${themedRole}`;
    if (world.themeIndex === 0) themedVariant = `lush${themedRole}`;
    if (world.themeIndex === 1) themedVariant = `ocean${themedRole}`;
    if (world.themeIndex === 3) themedVariant = 'iceMinion';
    if (world.themeIndex === 5) themedVariant = themedRole === 'Minion' ? 'skeletonMinion' : 'skeletonTank';
    if (world.themeIndex === 6) themedVariant = getDesertEnemyVariant(enemy.type);
    if (world.themeIndex === 7) themedVariant = getAbyssEnemyVariant(enemy.type);
    if (world.themeIndex === 8) themedVariant = `crystal${themedRole}`;
    if (world.themeIndex === 9) themedVariant = themedRole === 'Minion' ? 'starlingMarauder' : 'astralSentinel';
    if (world.themeIndex === 10) themedVariant = themedRole === 'Minion' ? 'sunscaleRay' : 'coralbackTurtle';
  }
  if (enemy.type === 'lushMossling') themedVariant = 'lushMossling';
  if (enemy.type === 'lushSporeShroom') themedVariant = 'lushSporeShroom';
  if (world.themeIndex === 2 && enemy.type === 'crawler') themedVariant = 'lavaSpider';
  if (world.themeIndex === 5 && enemy.type === 'crawler') themedVariant = 'skeletonSpider';
  if (world.themeIndex === 5 && enemy.type === 'arcaneOrb') themedVariant = 'skeletonOrb';
  if (world.themeIndex === 6 && baseEnemyTypes.has(enemy.type)) {
    themedVariant = getDesertEnemyVariant(enemy.type);
  }
  if (world.themeIndex === 7 && baseEnemyTypes.has(enemy.type)) {
    themedVariant = getAbyssEnemyVariant(enemy.type);
  }
  if (world.themeIndex === 8 && baseEnemyTypes.has(enemy.type)) {
    themedVariant = `crystal${themedRole}`;
  }
  if (world.themeIndex === 9 && baseEnemyTypes.has(enemy.type)) {
    themedVariant = enemy.type === 'crawler' || enemy.type === 'burrower'
      ? 'cometHound'
      : themedRole === 'Minion' ? 'starlingMarauder' : 'astralSentinel';
  }
  if (world.themeIndex === 10 && baseEnemyTypes.has(enemy.type)) {
    themedVariant = enemy.type === 'crawler' || enemy.type === 'burrower'
      ? 'tidefangEel'
      : themedRole === 'Minion' ? 'sunscaleRay' : 'coralbackTurtle';
  }
  if (enemy.type === 'skeletonOrb') themedVariant = 'skeletonOrb';
  if (enemy.type === 'desertScorpion') themedVariant = 'desertScorpion';
  if (enemy.type === 'mechMinion') themedVariant = 'mechMinion';
  if (enemy.type === 'abyssalRazorfin') themedVariant = 'abyssalRazorfin';
  if (enemy.type === 'frostwingDrake') themedVariant = 'frostwingDrake';
  if (enemy.type === 'boneRaven') themedVariant = 'boneRaven';

  if (enemy.type === 'magmaSerpent' && (enemy.fireCharge || 0) > 0) {
    const charge = 1 - enemy.fireCharge / 0.55;
    const glow = ctx.createRadialGradient(enemy.x, enemy.y - 6, 6, enemy.x, enemy.y - 6, 64);
    glow.addColorStop(0, `rgba(254, 215, 170, ${0.7 + charge * 0.25})`);
    glow.addColorStop(0.34, `rgba(249, 115, 22, ${0.38 + charge * 0.35})`);
    glow.addColorStop(1, 'rgba(194, 65, 12, 0)');
    ctx.save();
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y - 6, 64, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(251, 146, 60, ${0.45 + charge * 0.5})`;
    ctx.lineWidth = 3 + charge * 4;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y + 7, 30 + charge * 18, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  if (enemy.type === 'crystalStalker' && (enemy.crystalLungeCharge || 0) > 0) {
    const charge = 1 - enemy.crystalLungeCharge / 0.42;
    ctx.save();
    ctx.strokeStyle = `rgba(103, 232, 249, ${0.45 + charge * 0.5})`;
    ctx.lineWidth = 4 + charge * 4;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y + 8, 31 + charge * 25, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

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
    scale: themedVariant === 'lushMossling' ? 0.78 : themedVariant === 'lushSporeShroom' ? 1.08 : 1,
    health: enemy.health,
    maxHealth: enemy.maxHealth,
    elite: enemy.elite,
    facingX: enemy.facingX ?? (player.x - enemy.x),
    squashX,
    squashY,
    wingFlap,
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

// Keeps each boss's face locked to one screen-space height while its raised
// hands extend above it. A short crossfade hides the hard sprite swap.
const bossPoseLayouts = {
  lushGolem: { idle: [-92, -78, 184, 148], raised: [-69, -108, 138, 177] },
  lavaGolem: { idle: [-94, -82, 188, 154], raised: [-49, -126, 98, 198] },
  oceanBoss: { idle: [-98, -86, 196, 158], raised: [-98, -116, 196, 158] },
  iceBoss: { idle: [-75, -120, 150, 225], raised: [-64, -154, 128, 226] },
  skeletonWarlord: { idle: [-104, -92, 208, 168], raised: [-104, -126, 208, 168] },
  sandBoss: { idle: [-106, -94, 212, 172], raised: [-106, -124, 212, 172] },
  woodBoss: { idle: [-102, -90, 204, 164], raised: [-102, -118, 204, 164] },
};

function drawHeadAnchoredBossPose(variant, idleSprite, raisedSprite, raised, poseCharge) {
  const layout = bossPoseLayouts[variant];
  if (!layout) return;
  const drawRect = (sprite, rect, alpha) => {
    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.drawImage(sprite, rect[0], rect[1], rect[2], rect[3]);
    ctx.restore();
  };
  if (!raised || !raisedSprite?.complete || raisedSprite.naturalWidth === 0) {
    drawRect(idleSprite, layout.idle, 1);
    return;
  }
  const blend = clamp(poseCharge * 3, 0, 1);
  if (blend < 1) drawRect(idleSprite, layout.idle, 1 - blend);
  drawRect(raisedSprite, layout.raised, blend);
}

// Projects the supplied shadow beam along the Shadow Boss's dash path.
function drawShadowAttack(boss) {
  if (
    boss.variant !== 'shadowBoss'
    || boss.attackType !== 'shadowDash'
    || (boss.attackWindup <= 0 && boss.lungeTimer <= 0)
    || !art.shadowAttack.complete
    || art.shadowAttack.naturalWidth <= 0
  ) return;

  const target = boss.attackTarget || player;
  const aimX = boss.lungeTimer > 0 ? boss.lungeDirX : target.x - boss.x;
  const aimY = boss.lungeTimer > 0 ? boss.lungeDirY : target.y - boss.y;
  const angle = Math.atan2(aimY, aimX);
  const charge = boss.attackWindup > 0
    ? 1 - boss.attackWindup / (boss.attackWindupTotal || 0.58)
    : 1;

  ctx.save();
  ctx.translate(boss.x, boss.y);
  ctx.rotate(angle);
  ctx.globalAlpha = 0.35 + charge * 0.65;
  ctx.globalCompositeOperation = 'lighter';
  ctx.shadowColor = '#a855f7';
  ctx.shadowBlur = 22 + charge * 28;
  ctx.drawImage(
    art.shadowAttack,
    55, 200, 1390, 520,
    18, -70 * charge, 390 * (0.35 + charge * 0.65), 140 * charge,
  );
  ctx.restore();
}

// Draws the Heartwood Horror's eruption in arena coordinates so the large
// effect remains visible behind the boss instead of being clipped by its pose.
function drawWoodBossAttack(boss) {
  if (boss.variant !== 'woodBoss'
    || boss.attackType !== 'heartwoodEruption'
    || (!boss.attackWindup && !boss.attackPulse)
    || !art.woodAttack.complete
    || art.woodAttack.naturalWidth === 0) return;

  const charge = boss.attackWindup > 0
    ? 1 - boss.attackWindup / (boss.attackWindupTotal || 0.9)
    : 1;
  const pulse = boss.attackPulse || 0;
  const width = 330 + charge * 120 + pulse * 55;
  const height = width * 1.5;
  ctx.save();
  ctx.globalAlpha = Math.min(0.96, 0.2 + charge * 0.55 + pulse * 0.55);
  ctx.shadowColor = '#a3e635';
  ctx.shadowBlur = 46 + charge * 34 + pulse * 28;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(art.woodAttack, boss.x - width / 2, boss.y - height * 0.7, width, height);
  ctx.restore();
}

// Rotates only the breath stream around the dragon so the fire follows the
// locked aim angle while the dragon itself remains upright.
function drawDragonFireAttack(boss) {
  if (boss.variant !== 'dragonBoss'
    || boss.attackType !== 'dragonFire'
    || (!boss.attackWindup && !boss.attackPulse)
    || !art.dragonBossFire.complete
    || art.dragonBossFire.naturalWidth === 0) return false;

  const charge = boss.attackWindup > 0
    ? 1 - boss.attackWindup / (boss.attackWindupTotal || 1.35)
    : 1;
  const angle = boss.attackAimAngle ?? Math.atan2(player.y - boss.y, player.x - boss.x);
  ctx.save();
  ctx.translate(boss.x, boss.y);
  ctx.rotate(angle);
  ctx.scale(-1, 1);
  ctx.globalAlpha = Math.min(1, 0.55 + charge * 0.45 + (boss.attackPulse || 0) * 0.2);
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 34 + charge * 42;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(
    art.dragonBossFire,
    0, 0, art.dragonBossFire.naturalWidth * 0.66, art.dragonBossFire.naturalHeight,
    -690, -82, 690, 164,
  );
  ctx.restore();
  return true;
}

function drawInkboundBook(boss) {
  const book = boss.detachedBook;
  if (boss.variant !== 'inkboundArchivist' || !book) return;
  let sprite = art.inkboundBookOpen;
  if (book.phase === 'closing') {
    const progress = 1 - book.closeTimer / 0.42;
    sprite = progress < 0.42 ? art.inkboundBookOpen
      : progress < 0.78 ? art.inkboundBookHalf : art.inkboundBookClosed;
  } else if (book.phase === 'returning') {
    sprite = art.inkboundBookClosed;
  }
  if (!sprite.complete || sprite.naturalWidth === 0) return;
  ctx.save();
  ctx.translate(book.x, book.y);
  ctx.rotate(book.angle + Math.PI / 2);
  ctx.shadowColor = '#fb7185';
  ctx.shadowBlur = 30;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(sprite, -55, -55, 110, 110);
  ctx.restore();
}

// Renders boss-specific art with wind-up, lunge, hit, and death animation.
function drawBoss(boss) {
  const walk = Math.sin(boss.movePhase || 0);
  const windup = boss.attackWindup > 0 ? boss.attackWindup / (boss.attackWindupTotal || 0.38) : 0;
  const charge = boss.attackWindup > 0 ? 1 - windup : 0;
  const pulse = boss.attackPulse || 0;
  const isSlamAttack = boss.attackType.toLowerCase().includes('slam') || boss.attackType === 'staffCrush';
  // Raised-arm art is reserved for actual slams. Its native proportions are
  // preserved below so the wind-up reads as a pose instead of elastic scaling.
  const isOverheadPose = boss.attackWindup > 0
    && isSlamAttack
    && !state.threatSplashOpen;
  const isDashAttack = boss.attackType.toLowerCase().includes('dash');
  const lungeMotion = boss.lungeTimer > 0
    ? Math.sin((1 - boss.lungeTimer / (boss.lungeDuration || 0.2)) * Math.PI)
    : 0;
  const dashLean = isDashAttack ? Math.max(charge, lungeMotion) : lungeMotion * 0.35;
  const novaCharge = !isSlamAttack && !isDashAttack ? charge : 0;
  const deathProgress = boss.defeated
    ? 1 - Math.max(0, boss.deathTimer) / 1.8
    : 0;
  ctx.save();
  const impactDrop = (boss.variant === 'lushGolem' || boss.variant === 'lavaGolem') ? pulse * 13 : 0;
  const walkBob = boss.variant === 'iceBoss' ? Math.abs(walk) * 1.5 : Math.abs(walk) * 4;
  const attackLift = boss.variant === 'iceBoss' ? -novaCharge * 2 : -novaCharge * 5;
  ctx.translate(boss.x, boss.y + walkBob + impactDrop + attackLift);
  ctx.globalAlpha = 1 - deathProgress;
  const movementRotation = boss.variant === 'iceBoss'
    ? walk * 0.012 + dashLean * 0.06
    : walk * 0.035 + dashLean * 0.16;
  ctx.rotate(movementRotation + deathProgress * Math.PI * 2.5);
  const deathScale = 1 - deathProgress * 0.9;
  const bossVisualScale = boss.variant === 'iceBoss' ? 1.08 : 1.4;
  const bossSourceFacesRight = boss.variant === 'crystalBoss' || boss.variant === 'yinYangBoss' || boss.variant === 'hollowStarBoss' || boss.variant === 'inkboundArchivist' || boss.variant === 'crimsonMarionette' || boss.variant === 'meltedMonarch' || boss.variant === 'drownedBell' || boss.variant === 'stormglassLeviathan' || boss.variant === 'clockworkSeraph' || boss.variant === 'gravebloomColossus' || boss.variant === 'lunarKitsune' || boss.variant === 'eternityWarden';
  ctx.scale(
    (bossSourceFacesRight
      ? (boss.facingX < 0 ? -1 : 1)
      : (boss.facingX < 0 ? 1 : -1)) * deathScale * bossVisualScale,
    deathScale * bossVisualScale,
  );
  ctx.shadowColor = '#f87171';
  ctx.shadowBlur = 24 + windup * 24;
  if (boss.hitFlash > 0) ctx.filter = 'brightness(2.4) saturate(0)';

  if (boss.attackWindup > 0) {
    const warningColor = boss.variant === 'lavaGolem' ? '249, 115, 22' : boss.variant === 'lushGolem' ? '74, 222, 128' : boss.variant === 'oceanBoss' ? '56, 189, 248' : boss.variant === 'iceBoss' ? '191, 219, 254' : boss.variant === 'skeletonWarlord' ? '103, 232, 249' : boss.variant === 'sandBoss' || boss.variant === 'sandSnake' ? '251, 191, 36' : boss.variant === 'shadowBoss' ? '192, 132, 252' : boss.variant === 'abyssBoss' ? '56, 189, 248' : boss.variant === 'scorpionQueen' ? '245, 158, 11' : boss.variant === 'fungalBoss' ? '163, 230, 53' : boss.variant === 'mechOverlord' ? '251, 146, 60' : boss.variant === 'crystalBoss' ? '34, 211, 238' : boss.variant === 'woodBoss' ? '132, 204, 22' : boss.variant === 'yinYangBoss' ? '226, 232, 240' : boss.variant === 'inkboundArchivist' ? '252, 165, 165' : boss.variant === 'crimsonMarionette' ? '220, 38, 38' : boss.variant === 'meltedMonarch' ? '245, 158, 11' : boss.variant === 'drownedBell' ? '34, 211, 238' : '251, 113, 133';
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
      const lateWarningRadius = { glassTempest: 55 + charge * 275, stormSurge: 55 + charge * 205, shatteredTide: 55 + charge * 310, judgmentHour: 55 + charge * 325, timeLock: 55 + charge * 245, rewindPulse: 55 + charge * 280, gravebloom: 55 + charge * 290, rootCage: 55 + charge * 220, tombVines: 55 + charge * 260, moonfall: 55 + charge * 355, eclipseNova: 55 + charge * 295, foxfireCircle: 55 + charge * 235, timeCollapse: 90 + charge * 430, endOfAges: 90 + charge * 430, finalSecond: 55 + charge * 335 }[boss.attackType];
      const visualRadius = lateWarningRadius ?? (boss.attackType === 'yinYangArenaSlam' || boss.attackType === 'crimsonFinalCurtain' || boss.attackType === 'royalMeltdown' || boss.attackType === 'deathKnell' ? 90 + charge * 430 : boss.attackType === 'drownedSweep' ? 55 + charge * 145 : boss.attackType === 'crimsonSnare' ? 55 + charge * 205 : boss.attackType === 'yinYangRoundhouse' ? 55 + charge * 120 : boss.attackType === 'heartwoodEruption' ? 65 + charge * 240 : boss.attackType === 'eruption' ? 65 + charge * 220 : boss.attackType === 'scarabStorm' ? 65 + charge * 260 : 55 + charge * 165);
      ctx.arc(0, 12, visualRadius, 0, Math.PI * 2);
      ctx.stroke();
      if (boss.attackType === 'eruption' || boss.attackType === 'heartwoodEruption') {
        ctx.beginPath();
        ctx.arc(0, 12, visualRadius * 0.66, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = `rgba(${warningColor}, ${0.06 + charge * 0.1})`;
      ctx.fill();
    }
    ctx.restore();
  }

  if (boss.variant === 'drownedBell' && art.drownedBell.complete && art.drownedBell.naturalWidth > 0) {
    const attacking = boss.attackWindup > 0 || boss.attackPulse > 0;
    let sprite = art.drownedBell;
    if (attacking) {
      let frames = null;
      if (boss.attackType === 'drownedSweep') frames = [art.drownedSweep1, art.drownedSweep2, art.drownedSweep3];
      if (boss.attackType === 'undertowDash') frames = [art.drownedCharge1, art.drownedCharge2, art.drownedCharge3];
      if (boss.attackType === 'deathKnell') frames = [art.drownedKnell1, art.drownedKnell2, art.drownedKnell3];
      const frameIndex = boss.attackWindup <= 0 ? 2 : charge < 0.43 ? 0 : charge < 0.8 ? 1 : 2;
      if (frames && frames[frameIndex].complete && frames[frameIndex].naturalWidth > 0) sprite = frames[frameIndex];
    }
    ctx.shadowColor = '#22d3ee';
    ctx.shadowBlur = 44 + windup * 48 + pulse * 30;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sprite, -116, -138, 232, 250);
    drawBossHealthBar(boss, -84, -148, 168, 10, '#083344', '#22d3ee');
    ctx.restore();
    return;
  }

  if (boss.variant === 'meltedMonarch' && art.meltedMonarch.complete && art.meltedMonarch.naturalWidth > 0) {
    const attacking = boss.attackWindup > 0 || boss.attackPulse > 0;
    let sprite = art.meltedMonarch;
    if (attacking) {
      let frames = null;
      if (boss.attackType === 'meltedCleave') frames = [art.meltedCleave1, art.meltedCleave2, art.meltedCleave3];
      if (boss.attackType === 'meltedCandleburst' || boss.attackType === 'summonWaxAcolytes') frames = [art.meltedCandleburst1, art.meltedCandleburst2, art.meltedCandleburst3];
      if (boss.attackType === 'royalMeltdown') frames = [art.meltedMeltdown1, art.meltedMeltdown2, art.meltedMeltdown3];
      const frameIndex = boss.attackWindup <= 0 ? 2 : charge < 0.43 ? 0 : charge < 0.8 ? 1 : 2;
      if (frames && frames[frameIndex].complete && frames[frameIndex].naturalWidth > 0) sprite = frames[frameIndex];
    }
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 44 + windup * 46 + pulse * 30;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sprite, -104, -158, 208, 300);
    drawBossHealthBar(boss, -80, -168, 160, 10, '#451a03', '#f59e0b');
    ctx.restore();
    return;
  }

  if (boss.variant === 'crimsonMarionette' && art.crimsonMarionette.complete && art.crimsonMarionette.naturalWidth > 0) {
    const attacking = boss.attackWindup > 0 || boss.attackPulse > 0;
    let sprite = art.crimsonMarionette;
    if (attacking) {
      let frames = null;
      if (boss.attackType === 'crimsonScissor') frames = [art.crimsonScissor1, art.crimsonScissor2, art.crimsonScissor3];
      if (boss.attackType === 'crimsonPirouetteDash') frames = [art.crimsonPirouette1, art.crimsonPirouette2, art.crimsonPirouette3];
      if (boss.attackType === 'crimsonSnare') frames = [art.crimsonSnare1, art.crimsonSnare2, art.crimsonSnare3];
      if (boss.attackType === 'crimsonFinalCurtain') frames = [art.crimsonCurtain1, art.crimsonCurtain2, art.crimsonCurtain3];
      const frameIndex = boss.attackWindup <= 0 ? 2 : charge < 0.43 ? 0 : charge < 0.8 ? 1 : 2;
      if (frames && frames[frameIndex].complete && frames[frameIndex].naturalWidth > 0) sprite = frames[frameIndex];
    }
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 42 + windup * 44 + pulse * 28;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sprite, -106, -154, 212, 294);
    drawBossHealthBar(boss, -78, -164, 156, 10, '#450a0a', '#dc2626');
    ctx.restore();
    return;
  }

  if (boss.variant === 'inkboundArchivist' && art.inkboundArchivist.complete && art.inkboundArchivist.naturalWidth > 0) {
    const attacking = boss.attackWindup > 0 || boss.attackPulse > 0;
    let sprite = boss.detachedBook ? art.inkboundArchivistBookless : art.inkboundArchivist;
    let frames = null;
    if (boss.attackType === 'inkboundQuill') frames = [art.inkboundQuill1, art.inkboundQuill2, art.inkboundQuill3];
    if (boss.attackType === 'inkboundSweep') frames = [art.inkboundSweep1, art.inkboundSweep2, art.inkboundSweep3];
    if (boss.attackType === 'inkboundDecree') frames = [art.inkboundDecree1, art.inkboundDecree2, art.inkboundDecree3];
    if (frames && attacking) {
      const frameIndex = boss.attackWindup <= 0 ? 2 : charge < 0.44 ? 0 : charge < 0.78 ? 1 : 2;
      if (frames[frameIndex].complete && frames[frameIndex].naturalWidth > 0) sprite = frames[frameIndex];
    }
    if (sprite.complete && sprite.naturalWidth > 0) {
      ctx.shadowColor = '#fb7185';
      ctx.shadowBlur = 40 + windup * 42 + pulse * 24;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(sprite, -96, -150, 192, 288);
    }
    drawBossHealthBar(boss, -76, -160, 152, 10, '#450a0a', '#fca5a5');
    ctx.restore();
    return;
  }

  if (boss.variant === 'hollowStarBoss' && art.hollowStarBoss.complete && art.hollowStarBoss.naturalWidth > 0) {
    const attacking = boss.attackWindup > 0 || boss.attackPulse > 0;
    let sprite = art.hollowStarBoss;
    let frames = null;
    if (boss.attackType === 'hollowStarOverhead') frames = [art.hollowStarOverhead1, art.hollowStarOverhead2, art.hollowStarOverhead3];
    if (boss.attackType === 'hollowStarRoundhouse') frames = [art.hollowStarRoundhouse1, art.hollowStarRoundhouse2, art.hollowStarRoundhouse3];
    if (boss.attackType === 'hollowStarGroundSlam') frames = [art.hollowStarGroundSlam1, art.hollowStarGroundSlam2, art.hollowStarGroundSlam3];
    if (frames && attacking) {
      const frameIndex = boss.attackWindup <= 0 ? 2 : charge < 0.46 ? 0 : charge < 0.8 ? 1 : 2;
      if (frames[frameIndex].complete && frames[frameIndex].naturalWidth > 0) sprite = frames[frameIndex];
    }
    ctx.shadowColor = '#a78bfa';
    ctx.shadowBlur = 42 + windup * 46 + pulse * 28;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sprite, -96, -150, 192, 288);
    drawBossHealthBar(boss, -76, -160, 152, 10, '#020617', '#a78bfa');
    ctx.restore();
    return;
  }

  const newBossArt = {
    stormglassLeviathan: { idle: art.stormglassLeviathan, frames: [art.stormglassAttack1, art.stormglassAttack2, art.stormglassAttack3], glow: '#22d3ee' },
    clockworkSeraph: { idle: art.clockworkSeraph, frames: [art.clockworkAttack1, art.clockworkAttack2, art.clockworkAttack3], glow: '#facc15' },
    gravebloomColossus: { idle: art.gravebloomColossus, frames: [art.gravebloomAttack1, art.gravebloomAttack2, art.gravebloomAttack3], glow: '#c084fc' },
    lunarKitsune: { idle: art.lunarKitsune, frames: [art.lunarAttack1, art.lunarAttack2, art.lunarAttack3], glow: '#93c5fd' },
    eternityWarden: { idle: art.eternityWarden, frames: [art.eternityAttack1, art.eternityAttack2, art.eternityAttack3], glow: '#fde68a' },
  }[boss.variant];
  if (newBossArt?.idle?.complete && newBossArt.idle.naturalWidth > 0) {
    const { idle, frames, glow } = newBossArt;
    const attacking = boss.attackWindup > 0 || pulse > 0;
    const requestedFrame = boss.attackWindup > 0 ? (charge < 0.58 ? frames[0] : frames[1]) : frames[2];
    const sprite = attacking && requestedFrame?.complete && requestedFrame.naturalWidth > 0 ? requestedFrame : idle;
    const strike = boss.attackWindup > 0 ? charge : pulse;
    const projectileAttack = ['lightningLance', 'stormArcVolley', 'forkedLightning', 'gearVolley', 'seraphClockburst', 'cogCrossfire', 'graveSeedVolley', 'graveThornCircle', 'corpsePetalBurst', 'lunarBolts', 'kitsuneStarfan', 'moonCrescentFan', 'hourglassVolley', 'eternityParadox', 'chronoSpiral'].includes(boss.attackType);
    const ultimateAttack = ['glassTempest', 'stormSurge', 'shatteredTide', 'judgmentHour', 'timeLock', 'rewindPulse', 'gravebloom', 'rootCage', 'tombVines', 'moonfall', 'eclipseNova', 'foxfireCircle', 'timeCollapse', 'endOfAges', 'finalSecond'].includes(boss.attackType);
    if ((projectileAttack || ultimateAttack) && (boss.attackWindup > 0 || pulse > 0)) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = glow;
      ctx.globalAlpha = 0.28 + charge * 0.5 + pulse * 0.25;
      ctx.lineWidth = ultimateAttack ? 6 : 3;
      const orbitRadius = (ultimateAttack ? 72 : 50) + charge * (ultimateAttack ? 52 : 22);
      ctx.rotate(performance.now() * (ultimateAttack ? 0.0016 : 0.0038));
      ctx.setLineDash(ultimateAttack ? [18, 11] : [8, 9]);
      ctx.beginPath();
      ctx.arc(0, -4, orbitRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.rotate(-performance.now() * 0.0055);
      ctx.beginPath();
      ctx.arc(0, -4, orbitRadius * 0.68, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    ctx.rotate(Math.sin(strike * Math.PI) * (boss.attackType.toLowerCase().includes('dash') ? 0.2 : 0.08));
    ctx.translate(0, -Math.sin(strike * Math.PI) * 10);
    ctx.shadowColor = glow;
    ctx.shadowBlur = 40 + windup * 46 + pulse * 30;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sprite, -102, -158, 204, 300);
    drawBossHealthBar(boss, -78, -168, 156, 10, '#020617', glow);
    ctx.restore();
    return;
  }

  if (boss.variant === 'yinYangBoss' && art.yinYangBoss.complete && art.yinYangBoss.naturalWidth > 0) {
    const yinYangAttacking = boss.attackWindup > 0 || boss.attackPulse > 0;
    const smoothCharge = charge * charge * (3 - 2 * charge);
    if ((boss.attackType === 'yinYangNova' || boss.attackType === 'yinYangArenaSlam') && yinYangAttacking
      && art.yinYangAttack.complete && art.yinYangAttack.naturalWidth > 0) {
      const arenaSlam = boss.attackType === 'yinYangArenaSlam';
      const effectBeat = 0.92 + Math.sin(performance.now() * 0.014) * 0.08;
      const effectScale = (arenaSlam ? 1.2 + smoothCharge * 1.15 + pulse * 0.42 : 0.55 + smoothCharge * 0.7 + pulse * 0.28) * effectBeat;
      ctx.save();
      ctx.rotate((arenaSlam ? -0.35 : 0) + performance.now() * (arenaSlam ? 0.0014 : 0.0045));
      ctx.globalAlpha = Math.min(0.94, 0.24 + smoothCharge * 0.55 + pulse * 0.35);
      ctx.globalCompositeOperation = 'lighter';
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 48 + smoothCharge * 34 + pulse * 26;
      ctx.drawImage(art.yinYangAttack, -160 * effectScale, -160 * effectScale, 320 * effectScale, 320 * effectScale);
      ctx.rotate(Math.PI);
      ctx.globalAlpha *= 0.38;
      ctx.drawImage(art.yinYangAttack, -142 * effectScale, -142 * effectScale, 284 * effectScale, 284 * effectScale);
      ctx.restore();
    }
    ctx.shadowColor = '#f8fafc';
    ctx.shadowBlur = 38 + windup * 48 + pulse * 25;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    let sprite = art.yinYangSwordReady;
    let frames = null;
    if (boss.attackType === 'yinYangOverhead') frames = [art.yinYangOverhead1, art.yinYangOverhead2, art.yinYangOverhead3];
    if (boss.attackType === 'yinYangRoundhouse') frames = [art.yinYangRoundhouse1, art.yinYangRoundhouse2, art.yinYangRoundhouse3];
    if (boss.attackType === 'yinYangArenaSlam') frames = [art.yinYangGroundSlam1, art.yinYangGroundSlam2, art.yinYangGroundSlam3];
    if (frames && yinYangAttacking) {
      const frameIndex = boss.attackWindup <= 0 ? 2 : charge < 0.46 ? 0 : charge < 0.8 ? 1 : 2;
      if (frames[frameIndex].complete && frames[frameIndex].naturalWidth > 0) sprite = frames[frameIndex];
    }
    // Every animation frame is a complete 1024x1536 boss sprite. There are
    // no composited hand crops, rotating loose swords, or opaque patch boxes.
    ctx.drawImage(sprite, -96, -150, 192, 288);
    drawBossHealthBar(boss, -72, -158, 144, 10, '#020617', '#f8fafc');
    ctx.restore();
    return;
  }

  if (boss.variant === 'dragonBoss' && art.dragonBossFlapMiddle.complete && art.dragonBossFlapMiddle.naturalWidth > 0) {
    const firePose = false;
    const flapFrames = [
      art.dragonBossFlapUp,
      art.dragonBossFlapUpperMiddle,
      art.dragonBossFlapMiddle,
      art.dragonBossFlapLowerMiddle,
      art.dragonBossFlapDown,
      art.dragonBossFlapLowerMiddle,
      art.dragonBossFlapMiddle,
      art.dragonBossFlapUpperMiddle,
    ];
    const requestedFlapFrame = flapFrames[Math.floor(performance.now() / 110) % flapFrames.length];
    const flapFrame = requestedFlapFrame?.complete && requestedFlapFrame.naturalWidth > 0
      ? requestedFlapFrame
      : art.dragonBossFlapMiddle;
    const sprite = firePose && art.dragonBossFire.complete && art.dragonBossFire.naturalWidth > 0
      ? art.dragonBossFire
      : flapFrame;
    ctx.shadowColor = firePose ? '#38bdf8' : '#60a5fa';
    ctx.shadowBlur = 42 + windup * 48 + pulse * 28;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (firePose) {
      ctx.drawImage(sprite, -355, -135, 470, 235);
    } else {
      ctx.drawImage(sprite, -175, -112, 350, 210);
    }
    drawBossHealthBar(boss, -74, -132, 148, 10, '#172554', '#93c5fd');
    ctx.restore();
    return;
  }

  if (boss.variant === 'lushGolem' && art.lushGolem.complete && art.lushGolem.naturalWidth > 0) {
    const sprite = isOverheadPose && art.lushGolemOverhead.complete && art.lushGolemOverhead.naturalWidth > 0
      ? art.lushGolemOverhead : art.lushGolem;
    ctx.shadowColor = '#4ade80';
    ctx.shadowBlur = 22 + windup * 30;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (sprite === art.lushGolemOverhead) {
      drawBossHealthBar(boss, -48, -86, 96, 8, '#4ade80');
    }
    drawHeadAnchoredBossPose('lushGolem', art.lushGolem, art.lushGolemOverhead, sprite === art.lushGolemOverhead, charge);
    if (sprite !== art.lushGolemOverhead) {
      drawBossHealthBar(boss, -48, -86, 96, 8, '#4ade80');
    }

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
    if (sprite === art.lavaGolemOverhead) {
      drawBossHealthBar(boss, -50, -90, 100, 8, '#dc2626', '#f97316');
    }
    drawHeadAnchoredBossPose('lavaGolem', art.lavaGolem, art.lavaGolemOverhead, sprite === art.lavaGolemOverhead, charge);
    if (sprite !== art.lavaGolemOverhead) {
      drawBossHealthBar(boss, -50, -90, 100, 8, '#dc2626', '#f97316');
    }

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
    if (sprite === art.oceanBossOverhead) {
      drawBossHealthBar(boss, -52, -94, 104, 8, '#0369a1', '#67e8f9');
    }
    drawHeadAnchoredBossPose('oceanBoss', art.oceanBoss, art.oceanBossOverhead, sprite === art.oceanBossOverhead, charge);
    if (sprite !== art.oceanBossOverhead) {
      drawBossHealthBar(boss, -52, -94, 104, 8, '#0369a1', '#67e8f9');
    }

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
    if (sprite === art.iceBossOverhead) {
      drawBossHealthBar(boss, -53, -96, 106, 8, '#2563eb', '#e0f2fe');
    }
    drawHeadAnchoredBossPose('iceBoss', art.iceBoss, art.iceBossOverhead, sprite === art.iceBossOverhead, charge);
    if (sprite !== art.iceBossOverhead) {
      drawBossHealthBar(boss, -53, -96, 106, 8, '#2563eb', '#e0f2fe');
    }

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
    if (sprite === art.skeletonBossOverhead) {
      drawBossHealthBar(boss, -55, -100, 110, 8, '#a16207', '#67e8f9');
    }
    drawHeadAnchoredBossPose('skeletonWarlord', art.skeletonBoss, art.skeletonBossOverhead, sprite === art.skeletonBossOverhead, charge);
    if (sprite !== art.skeletonBossOverhead) {
      drawBossHealthBar(boss, -55, -100, 110, 8, '#a16207', '#67e8f9');
    }

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
    if (sprite === art.sandBossOverhead) {
      drawBossHealthBar(boss, -56, -102, 112, 8, '#92400e', '#fde68a');
    }
    drawHeadAnchoredBossPose('sandBoss', art.sandBoss, art.sandBossOverhead, sprite === art.sandBossOverhead, charge);
    if (sprite !== art.sandBossOverhead) {
      drawBossHealthBar(boss, -56, -102, 112, 8, '#92400e', '#fde68a');
    }
    ctx.restore();
    return;
  }

  if (boss.variant === 'shadowBoss' && art.shadowBoss.complete && art.shadowBoss.naturalWidth > 0) {
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 38 + windup * 48 + pulse * 24;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art.shadowBoss, -88, -118, 176, 224);
    drawBossHealthBar(boss, -58, -132, 116, 8, '#3b0764', '#c084fc');
    ctx.restore();
    return;
  }

  if (boss.variant === 'abyssBoss' && art.abyssBossPhase1.complete && art.abyssBossPhase1.naturalWidth > 0) {
    const sprite = boss.phase === 2 && art.abyssBossPhase2.complete && art.abyssBossPhase2.naturalWidth > 0
      ? art.abyssBossPhase2
      : art.abyssBossPhase1;
    ctx.shadowColor = boss.phase === 2 ? '#0ea5e9' : '#2563eb';
    ctx.shadowBlur = (boss.phase === 2 ? 48 : 36) + windup * 50 + pulse * 25;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sprite, -94, -126, 188, 236);
    drawBossHealthBar(boss, -60, -140, 120, 9, '#172554', boss.phase === 2 ? '#38bdf8' : '#2563eb');
    ctx.restore();
    return;
  }

  if (boss.variant === 'scorpionQueen' && art.scorpionQueen.complete && art.scorpionQueen.naturalWidth > 0) {
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 42 + windup * 52 + pulse * 26;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art.scorpionQueen, -126, -126, 252, 250);
    drawBossHealthBar(boss, -62, -142, 124, 9, '#78350f', '#fbbf24');
    ctx.restore();
    return;
  }

  if (boss.variant === 'fungalBoss' && art.fungalBoss.complete && art.fungalBoss.naturalWidth > 0) {
    ctx.shadowColor = '#a3e635';
    ctx.shadowBlur = 44 + windup * 54 + pulse * 28;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art.fungalBoss, -112, -148, 224, 286);
    drawBossHealthBar(boss, -64, -162, 128, 9, '#3f6212', '#d9f99d');
    ctx.restore();
    return;
  }

  if (boss.variant === 'mechOverlord' && art.mechOverlord.complete && art.mechOverlord.naturalWidth > 0) {
    ctx.shadowColor = '#fb923c';
    ctx.shadowBlur = 46 + windup * 54 + pulse * 28;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art.mechOverlord, -108, -138, 216, 270);
    drawBossHealthBar(boss, -64, -152, 128, 9, '#431407', '#fb923c');
    ctx.restore();
    return;
  }

  if (boss.variant === 'crystalBoss' && art.crystalBoss.complete && art.crystalBoss.naturalWidth > 0) {
    if (boss.attackType === 'crystalEruption' && art.crystalAttack.complete && art.crystalAttack.naturalWidth > 0) {
      ctx.save();
      ctx.globalAlpha = Math.min(0.88, 0.2 + charge * 0.55 + pulse * 0.5);
      ctx.shadowColor = '#67e8f9';
      ctx.shadowBlur = 54;
      ctx.drawImage(art.crystalAttack, -155, -188, 310, 310);
      ctx.restore();
    }
    ctx.shadowColor = '#22d3ee';
    ctx.shadowBlur = 48 + windup * 58 + pulse * 30;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art.crystalBoss, -116, -148, 232, 286);
    drawBossHealthBar(boss, -66, -162, 132, 9, '#164e63', '#67e8f9');
    ctx.restore();
    return;
  }

  if (boss.variant === 'sandSnake' && art.sandSnake.complete && art.sandSnake.naturalWidth > 0) {
    ctx.shadowColor = boss.attackType === 'scarabStorm' ? '#a855f7' : '#f59e0b';
    ctx.shadowBlur = 48 + windup * 58 + pulse * 32;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art.sandSnake, -112, -166, 224, 296);
    drawBossHealthBar(boss, -68, -180, 136, 9, '#713f12', '#fde68a');
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
    if (sprite === art.woodBossOverhead) {
      drawBossHealthBar(boss, -54, -98, 108, 8, '#3f6212', '#bef264');
    }
    drawHeadAnchoredBossPose('woodBoss', art.woodBoss, art.woodBossOverhead, sprite === art.woodBossOverhead, charge);
    if (sprite !== art.woodBossOverhead) {
      drawBossHealthBar(boss, -54, -98, 108, 8, '#3f6212', '#bef264');
    }

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

  drawBossHealthBar(boss, -36, -62, 72, 6, '#22c55e');

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
  const isMoving = movementControlMode === 'arrows'
    ? keys.has('arrowup') || keys.has('arrowleft') || keys.has('arrowdown') || keys.has('arrowright')
    : keys.has('w') || keys.has('a') || keys.has('s') || keys.has('d');
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
  const chasmPhase = state.teleportTimer > 0 && state.transitionStyle === 'chasm'
    ? (teleportProgress < 0.5 ? teleportProgress * 2 : (1 - teleportProgress) * 2)
    : 0;
  const chasmJitter = Math.sin(performance.now() * 0.055) * chasmPhase * 7;
  const transitionX = player.x + chasmJitter;
  const transitionY = player.y + chasmPhase * 24;

  ctx.save();
  ctx.globalAlpha = teleportVisibility;
  if (player.frozenTimer > 0) {
    ctx.fillStyle = 'rgba(147, 197, 253, 0.28)';
    ctx.strokeStyle = 'rgba(219, 234, 254, 0.9)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(transitionX, transitionY, player.radius + 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  drawActorSprite({
    x: transitionX,
    y: transitionY,
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
    facingX: player.visualFacingX,
    scale: (0.55 + teleportVisibility * 0.45) * (1 - chasmPhase * 0.7),
  });

  const equippedWeapon = getEquippedWeapon();
  const equippedWeaponArt = equippedWeapon.sheet ? art[equippedWeapon.sheet] : (art[equippedWeapon.id] || art.broadSword);
  if ((!state.retroMode || state.boss) && equippedWeaponArt?.complete && equippedWeaponArt.naturalWidth > 0) {
    // Mirror the hand anchor with the selected character artwork so the
    // equipped weapon remains gripped while facing either direction.
    const heroFacingScale = player.visualFacingX < 0 ? 1 : -1;
    const facingDirection = player.visualFacingX < 0 ? -1 : 1;
    const handOffsetX = -18 * heroFacingScale;
    ctx.save();
    const bowLift = equippedWeapon.kind === 'bow' ? 11 : 0;
    ctx.translate(transitionX + handOffsetX, transitionY - 7 - bowLift + bob);
    if (equippedWeapon.kind === 'bow') {
      // During vertical movement, follow the character's remembered left/right
      // visual facing instead of defaulting the curve to one side.
      ctx.rotate(player.visualFacingX > 0 ? -Math.PI / 2 : Math.PI / 2);
    } else if (equippedWeapon.kind === 'staff') {
      ctx.rotate(Math.atan2(player.facing.y, player.facing.x));
    } else if (player.attackDuration > 0) {
      const attackProgress = 1 - player.attackDuration / 0.24;
      const attackAngle = Math.atan2(player.facing.y, player.facing.x);
      const swordAngle = attackAngle - 58 * Math.PI / 180 + attackProgress * 116 * Math.PI / 180;
      ctx.rotate(swordAngle - Math.PI / 2);
    } else {
      // Weapon art points down from its handle; rest the blade upward and
      // slightly toward the direction the hero is facing.
      ctx.rotate(-facingDirection * (Math.PI - 0.32));
    }
    const weaponGlowColors = {
      emeraldSword: '#34d399',
      lavaBlade: '#f97316',
      diamondSword: '#bfdbfe',
      frostspire: '#67e8f9',
      worldfireCleaver: '#fb923c',
      voidRequiem: '#c084fc',
      sunforgedJudgment: '#facc15',
    };
    ctx.shadowColor = equippedWeapon.kind === 'staff'
      ? '#c084fc'
      : equippedWeapon.kind === 'bow'
        ? '#fde68a'
        : weaponGlowColors[equippedWeapon.id] || '#fca5a5';
    ctx.shadowBlur = 14;
    if (equippedWeapon.sheet) {
      const horizontal = equippedWeapon.sheetDirection === 'horizontal';
      const frameWidth = horizontal
        ? equippedWeaponArt.naturalWidth / equippedWeapon.sheetFrames
        : equippedWeaponArt.naturalWidth;
      const frameHeight = horizontal
        ? equippedWeaponArt.naturalHeight
        : equippedWeaponArt.naturalHeight / equippedWeapon.sheetFrames;
      const combatWidth = equippedWeapon.kind === 'staff' ? 30 : 78;
      const combatHeight = equippedWeapon.kind === 'staff' ? 104 : 38;
      ctx.drawImage(
        equippedWeaponArt,
        horizontal ? frameWidth * equippedWeapon.sheetFrame : 0,
        horizontal ? 0 : frameHeight * equippedWeapon.sheetFrame,
        frameWidth,
        frameHeight,
        -combatWidth / 2,
        -combatHeight / 2,
        combatWidth,
        combatHeight,
      );
    } else if (equippedWeapon.kind === 'bow') {
      // The hand anchor sits on the wrapped center grip. Keep the combat bow
      // compact enough to read as held equipment rather than a body overlay.
      ctx.drawImage(equippedWeaponArt, -29, -19, 58, 28);
    } else if (equippedWeapon.kind === 'staff') {
      ctx.drawImage(equippedWeaponArt, -14, -46, 28, 92);
    } else {
      // The source handle occupies the top tenth of each melee weapon image.
      ctx.drawImage(equippedWeaponArt, -12, -9, 24, 86);
    }
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

// Draws either energy rings or a ragged floor chasm around the transitioning hero.
function drawTeleportEffect() {
  if (state.teleportTimer <= 0) return;
  const progress = 1 - state.teleportTimer / state.teleportDuration;
  const phase = progress < 0.5 ? progress * 2 : (1 - progress) * 2;

  if (state.transitionStyle === 'chasm') {
    const radiusX = 22 + phase * 108;
    const radiusY = 8 + phase * 42;
    ctx.save();
    ctx.translate(player.x, player.y + 22);
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 34 + phase * 38;
    ctx.fillStyle = `rgba(0, 0, 0, ${0.5 + phase * 0.48})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(15, 23, 42, ${0.5 + phase * 0.45})`;
    ctx.lineWidth = 3 + phase * 4;
    for (let crack = 0; crack < 11; crack += 1) {
      const angle = crack / 11 * Math.PI * 2;
      const innerX = Math.cos(angle) * radiusX * 0.72;
      const innerY = Math.sin(angle) * radiusY * 0.72;
      const length = 18 + ((crack * 17) % 24) * phase;
      ctx.beginPath();
      ctx.moveTo(innerX, innerY);
      ctx.lineTo(
        Math.cos(angle) * (radiusX + length),
        Math.sin(angle) * (radiusY + length * 0.38),
      );
      ctx.stroke();
    }

    ctx.strokeStyle = `rgba(100, 116, 139, ${0.18 + phase * 0.38})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, radiusX * 0.82, radiusY * 0.72, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    return;
  }

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

// Gives each ranged enemy its own readable projectile instead of rendering
// every shared projectile record as a Bone Archer arrow.
function drawEnemyProjectiles() {
  for (const projectile of state.enemyProjectiles) {
    ctx.save();
    ctx.translate(projectile.x, projectile.y);
    ctx.rotate(projectile.angle);
    if (projectile.sourceType === 'dragonBoss'
      && art.dragonRiderFreezeAttack.complete
      && art.dragonRiderFreezeAttack.naturalWidth > 0) {
      ctx.globalCompositeOperation = 'lighter';
      ctx.shadowColor = '#7dd3fc';
      ctx.shadowBlur = 24;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(art.dragonRiderFreezeAttack, -58, -32, 116, 64);
    } else if (projectile.sourceType === 'magmaSerpent') {
      const gradient = ctx.createRadialGradient(3, 0, 1, 0, 0, 13);
      gradient.addColorStop(0, '#fef3c7');
      gradient.addColorStop(0.3, '#fb923c');
      gradient.addColorStop(0.72, '#dc2626');
      gradient.addColorStop(1, 'rgba(127, 29, 29, 0)');
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 18;
      ctx.fillStyle = 'rgba(249, 115, 22, 0.5)';
      ctx.beginPath();
      ctx.moveTo(-25, 0);
      ctx.lineTo(-6, -7);
      ctx.lineTo(-6, 7);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, 13, 0, Math.PI * 2);
      ctx.fill();
    } else if (projectile.sourceType === 'dragonBoss'
      && art.dragonRiderIceBolt.complete
      && art.dragonRiderIceBolt.naturalWidth > 0) {
      ctx.shadowColor = '#93c5fd';
      ctx.shadowBlur = 24;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(art.dragonRiderIceBolt, -42, -18, 84, 36);
    } else if (projectile.sourceType === 'mechMinion') {
      ctx.shadowColor = '#fb923c';
      ctx.shadowBlur = 13;
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(-14, -3, 28, 6);
      ctx.fillStyle = '#f97316';
      ctx.fillRect(-18, -1, 7, 2);
    } else {
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 9;
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-13, 0);
      ctx.lineTo(10, 0);
      ctx.stroke();
      ctx.fillStyle = '#fde68a';
      ctx.beginPath();
      ctx.moveTo(14, 0);
      ctx.lineTo(7, -5);
      ctx.lineTo(7, 5);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
}

// Draws hero arrows and magical bolts with distinct readable silhouettes.
function drawPlayerProjectiles() {
  for (const projectile of state.playerProjectiles) {
    ctx.save();
    ctx.translate(projectile.x, projectile.y);
    ctx.rotate(projectile.angle);
    if (projectile.kind === 'staff') {
      ctx.shadowColor = projectile.color;
      ctx.shadowBlur = 20;
      ctx.fillStyle = '#f5d0fe';
      ctx.beginPath();
      ctx.arc(0, 0, projectile.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = projectile.color;
      ctx.beginPath();
      ctx.moveTo(-26, 0);
      ctx.lineTo(-6, -8);
      ctx.lineTo(-6, 8);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.shadowColor = '#fde68a';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = '#fef3c7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-17, 0);
      ctx.lineTo(12, 0);
      ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(17, 0);
      ctx.lineTo(8, -5);
      ctx.lineTo(8, 5);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
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

  // God Mode biome travel is a clean gallery view: only the room is rendered.
  if (state.godMode && state.godTravelMode === 'biome') {
    ctx.restore();
    return;
  }

  if (state.boss) {
    ctx.fillStyle = '#2f2f47';
    ctx.fillRect(state.bossArena.x, state.bossArena.y, state.bossArena.w, state.bossArena.h);
    const bossArenaArt = {
      lushGolem: art.lushArena,
      lavaGolem: art.lavaArena,
      oceanBoss: art.oceanArena,
      iceBoss: art.iceArena,
      skeletonWarlord: art.skeletonArena,
      sandBoss: art.sandArena,
      shadowBoss: art.shadowArena,
      abyssBoss: art.abyssArena,
      scorpionQueen: art.scorpioArena,
      woodBoss: art.woodArena,
      fungalBoss: art.fungalArena,
      mechOverlord: art.mechArena,
      crystalBoss: art.crystalArena,
      dragonBoss: art.dragonArena,
      yinYangBoss: art.yinYangArena,
      hollowStarBoss: art.hollowStarArena,
      inkboundArchivist: art.inkboundArena,
      crimsonMarionette: art.crimsonMarionetteArena,
      meltedMonarch: art.meltedMonarchArena,
      drownedBell: art.drownedBellArena,
      stormglassLeviathan: art.stormglassArena,
      clockworkSeraph: art.clockworkSeraphArena,
      gravebloomColossus: art.gravebloomArena,
      lunarKitsune: art.lunarKitsuneArena,
      eternityWarden: art.eternityWardenArena,
      sandSnake: art.sandArena,
    };
    const arenaArt = bossArenaArt[state.boss.variant] || null;
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
  drawEnemyProjectiles();
  drawPlayerProjectiles();
  if (state.boss) {
    for (const boss of getActiveBosses()) {
      drawShadowAttack(boss);
      drawWoodBossAttack(boss);
      drawBoss(boss);
      drawInkboundBook(boss);
      drawDragonFireAttack(boss);
    }
  }
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
      ctx.fillStyle = state.transitionStyle === 'chasm'
        ? `rgba(0, 0, 0, ${flash * 0.94})`
        : `rgba(207, 250, 254, ${flash * 0.72})`;
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
  hud.ammo.textContent = String(player.inventory.ammo);
  hud.enemy.textContent = String(state.enemies.filter((enemy) => !enemy.dead).length + getActiveBosses().length);
  hud.crate.textContent = String(state.crates.filter((crate) => !crate.isOpen).length);
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

// Temporarily equips the strongest gear the player has actually unlocked.
function equipBestPantheonLoadout() {
  pantheonPreviousLoadout = {
    armor: equippedArmorId,
    melee: equippedMeleeWeaponId,
    ranged: equippedRangedWeaponId,
    activeKind: activeWeaponKind,
  };
  const bestArmor = armorSets
    .filter((armor) => unlockedArmor.has(armor.id))
    .sort((a, b) => b.boss - a.boss)[0];
  const bestMelee = weaponSets
    .filter((weapon) => weapon.kind === 'melee' && unlockedWeapons.has(weapon.id))
    .sort((a, b) => b.boss - a.boss)[0];
  const bestRanged = weaponSets
    .filter((weapon) => weapon.kind !== 'melee' && unlockedWeapons.has(weapon.id))
    .sort((a, b) => b.boss - a.boss)[0];
  if (bestArmor) equippedArmorId = bestArmor.id;
  equippedMeleeWeaponId = bestMelee?.id || 'starterBlade';
  equippedRangedWeaponId = bestRanged?.id || null;
  activeWeaponKind = bestRanged ? 'ranged' : 'melee';
  applyEquippedArmor(true);
}

// Restores the loadout that was active before entering the Pantheon.
function restorePrePantheonLoadout() {
  if (!pantheonPreviousLoadout) return;
  equippedArmorId = pantheonPreviousLoadout.armor;
  equippedMeleeWeaponId = pantheonPreviousLoadout.melee;
  equippedRangedWeaponId = pantheonPreviousLoadout.ranged;
  activeWeaponKind = pantheonPreviousLoadout.activeKind;
  pantheonPreviousLoadout = null;
}

// Starts the uninterrupted boss gauntlet directly at Boss 1.
function startPantheon() {
  stopAttractMode();
  state.godMode = false;
  state.godTravelMode = null;
  state.pantheonMode = true;
  state.pantheonBosses = [];
  state.pantheonGroupRewarded = false;
  state.pantheonFinalTrial = false;
  state.pantheonFinalBatch = 0;
  state.pantheonEscapeArmedUntil = 0;
  resetRun();
  state.pantheonMode = true;
  equipBestPantheonLoadout();
  player.inventory.bandage = 20;
  player.inventory.ammo = 50;
  state.enemies = [];
  state.crates = [];
  state.challengeRooms = [];
  state.started = true;
  overlay.classList.add('hidden');
  spawnBoss();
  showBossSplash();
}

// Leaves the menu and opens the first wave introduction.
function startGame() {
  state.started = true;
  state.paused = false;
  pauseOverlay.classList.add('hidden');
  overlay.classList.add('hidden');
  if (state.godMode && state.godTravelMode === 'biome') {
    closeThreatSplash();
    messageBox.classList.add('hidden');
    return;
  }
  setMessage('Wave 1 begins. Explore the rooms, open crates, and survive.');
  showWaveSplash();
}

// Advances the appropriate game state, renders one frame, and schedules the next.
function loop(timestamp) {
  const dt = Math.min((timestamp - lastTime) / 1000, 0.03);
  lastTime = timestamp;
  if (!attractMode.active && homeMenuIsIdleReady() && timestamp - menuLastActivity >= ATTRACT_IDLE_DELAY) {
    startAttractMode();
  }
  if (attractMode.active) {
    attractMode.elapsed += dt;
    if (attractMode.elapsed >= ATTRACT_DURATION) {
      stopAttractMode();
      drawBackground();
      drawUI();
      requestAnimationFrame(loop);
      return;
    }
    drawAttractMode();
    requestAnimationFrame(loop);
    return;
  }
  const hitStopActive = state.hitStopTimer > 0;
  if (hitStopActive) {
    state.hitStopTimer = Math.max(0, state.hitStopTimer - dt);
  }

  const roomOnlyShowcase = state.godMode && state.godTravelMode === 'biome';
  if (!hitStopActive && state.started && !roomOnlyShowcase && !state.isGameOver && !state.paused && !state.challengePromptOpen && armoryOverlay.classList.contains('hidden')) {
    if (state.threatSplashOpen) {
      updateParticles(dt);
    } else if (state.teleportTimer > 0) {
      updateBossTeleport(dt);
      updateParticles(dt);
    } else {
      handleInput(dt);
      // Resolve a ready player swing before enemies advance this frame. This
      // lets a well-timed hit knock an approaching mob out of contact range.
      if (keys.has(' ')) tryAttack();
      updateCrates(dt);
      maybeOpenChallengeRoom();
      updateEnemies(dt);
      updateEnemyProjectiles(dt);
      updatePlayerProjectiles(dt);
      updateProtectors(dt);
      updateOpeners(dt);
      updateBoss(dt);
      updateParticles(dt);
      maybeBossPortal();

      if (player.health <= 0) die();
    }
  }

  if (!hitStopActive && state.shake > 0) {
    state.shake = Math.max(0, state.shake - dt * 18);
  }

  drawBackground();
  drawUI();
  requestAnimationFrame(loop);
}

acceptChallengeButton.addEventListener('click', () => resolveChallengeChoice(true));
declineChallengeButton.addEventListener('click', () => resolveChallengeChoice(false));
resumeGameButton.addEventListener('click', togglePause);
quitGameButton.addEventListener('click', quitPausedRun);
function openBetweenWaveArmory() {
  if (!state.threatSplashOpen || !state.gearChoiceOpen) return;
  closeThreatSplash();
  renderArmory();
  armoryOverlay.classList.remove('hidden');
  unseenGear.clear();
  saveArmorCollection();
  updateGearNotification();
}
waveArmoryButton.addEventListener('click', openBetweenWaveArmory);
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
movementControlSelect.addEventListener('change', () => {
  movementControlMode = movementControlSelect.value === 'arrows' ? 'arrows' : 'wasd';
  keys.clear();
  updateMovementControlLabels();
  try {
    window.localStorage.setItem('endlessDungeonMovementControls', movementControlMode);
  } catch (error) {
    // The selected control scheme still works for this browser session.
  }
});
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
openJournalButton.addEventListener('click', () => {
  saveHeroName();
  renderJournal();
  journalOverlay.classList.remove('hidden');
});
closeJournalButton.addEventListener('click', () => {
  closeBestiaryDetail();
  journalOverlay.classList.add('hidden');
});
closeBestiaryDetailButton.addEventListener('click', closeBestiaryDetail);
closeGodModeButton.addEventListener('click', closeGodModeMenu);
startPantheonButton.addEventListener('click', (event) => {
  event.stopPropagation();
  if (!state.started && !state.isGameOver) startPantheon();
});

// Routes keyboard presses through overlays before active gameplay controls.
window.addEventListener('keydown', (event) => {
  if (attractMode.active) {
    event.preventDefault();
    if (!event.repeat) stopAttractMode();
    return;
  }
  menuLastActivity = performance.now();
  const key = event.key.toLowerCase();
  if (event.target === heroNameInput) {
    if (key === 'enter') {
      event.preventDefault();
      heroNameInput.blur();
    }
    return;
  }
  if (event.target === movementControlSelect) return;
  if (key.startsWith('arrow')) event.preventDefault();
  if (!godModeOverlay.classList.contains('hidden')) {
    event.preventDefault();
    if (!event.repeat && key === 'escape') closeGodModeMenu();
    return;
  }
  if (state.godMode && key === 'escape') {
    event.preventDefault();
    godModeOverlay.classList.add('hidden');
    closeThreatSplash();
    showMainMenu();
    return;
  }
  if (state.pantheonMode && state.started && key === 'escape') {
    event.preventDefault();
    if (event.repeat) return;
    const now = performance.now();
    if (state.pantheonEscapeArmedUntil >= now) {
      closeThreatSplash();
      showMainMenu();
    } else {
      state.pantheonEscapeArmedUntil = now + 2500;
      setMessage('Press Esc again within 2.5 seconds to leave the Pantheon.');
    }
    return;
  }
  const menuReadyForGodSequence = !state.started
    && !state.isGameOver
    && !overlay.classList.contains('hidden')
    && armoryOverlay.classList.contains('hidden')
    && journalOverlay.classList.contains('hidden')
    && highScoresOverlay.classList.contains('hidden')
    && genderOverlay.classList.contains('hidden');
  if (menuReadyForGodSequence && key === 'a' && !event.repeat) {
    event.preventDefault();
    const now = performance.now();
    godModeAPresses = godModeAPresses.filter((pressedAt) => now - pressedAt <= 10000);
    godModeAPresses.push(now);
    if (godModeAPresses.length >= 4) {
      godModeAPresses = [];
      openGodModeMenu();
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
  if (!journalOverlay.classList.contains('hidden')) {
    event.preventDefault();
    if (!event.repeat && key === 'escape') {
      if (!bestiaryDetail.classList.contains('hidden')) closeBestiaryDetail();
      else journalOverlay.classList.add('hidden');
    }
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
      openBetweenWaveArmory();
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
  if (state.paused) {
    event.preventDefault();
    if (event.repeat || performance.now() < pauseKeyboardUnlockAt) return;
    if (key === 'enter') togglePause();
    else if (key === 'escape') quitPausedRun();
    return;
  }
  if (key === 'escape') {
    event.preventDefault();
    if (!event.repeat) togglePause();
    return;
  }
  keys.add(key);
  if (key === 'l' && state.started && !event.repeat) {
    state.closeZoom = !state.closeZoom;
    setMessage(state.closeZoom ? 'Close-up view enabled.' : 'Overview enabled.');
  }
  if (key === 'f') {
    setMessage('Hold F for 2 seconds near a crate to open it.');
  }
  if (key === 'c' && state.started && !event.repeat) {
    event.preventDefault();
    toggleWeaponMode();
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

// Mouse, pen, or touch activity also resets or dismisses the arcade reel.
window.addEventListener('pointerdown', (event) => {
  if (attractMode.active) {
    event.preventDefault();
    event.stopImmediatePropagation();
    stopAttractMode();
    return;
  }
  menuLastActivity = performance.now();
}, true);

window.addEventListener('pointermove', () => {
  if (attractMode.active) stopAttractMode();
  else menuLastActivity = performance.now();
}, true);

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
renderJournal();
showRandomHeroProverb();
applyEquippedArmor(true);
updateGearNotification();
requestAnimationFrame(loop);
