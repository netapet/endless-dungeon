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
const protectorGrid = document.getElementById('protectorGrid');
const armoryArmorLevel = document.getElementById('armoryArmorLevel');
const armoryWeaponLevel = document.getElementById('armoryWeaponLevel');
const armoryShardCount = document.getElementById('armoryShardCount');
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
const repairArmorButton = document.getElementById('repairArmorButton');
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
const relicTitleStat = document.getElementById('relicTitleStat');
const relicTitleBadge = document.getElementById('relicTitleBadge');
const hardWaveActions = document.getElementById('hardWaveActions');
const normalWaveButton = document.getElementById('normalWaveButton');
const hardWaveButton = document.getElementById('hardWaveButton');
const merchantOverlay = document.getElementById('merchantOverlay');
const merchantResources = document.getElementById('merchantResources');
const closeMerchantButton = document.getElementById('closeMerchantButton');
const merchantTradeButtons = [...merchantOverlay.querySelectorAll('[data-trade]')];

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
  { id: 'riftHound', name: 'Rift Hound', kind: 'Enemy', image: 'assets/enemies/new/rift-hound.png' },
  { id: 'chainHexer', name: 'Chain Hexer', kind: 'Enemy', image: 'assets/enemies/new/chain-hexer.png' },
  { id: 'bellmawJuggernaut', name: 'Bellmaw Juggernaut', kind: 'Enemy', image: 'assets/enemies/new/bellmaw-juggernaut.png' },
  { id: 'boneShieldbearer', name: 'Ossuary Shieldbearer', kind: 'Enemy', image: 'assets/enemies/sheet-additions/bone-shieldbearer.png' },
  { id: 'frostDirewolf', name: 'Frost Direwolf', kind: 'Enemy', image: 'assets/enemies/sheet-additions/frost-direwolf.png' },
  { id: 'cinderImp', name: 'Cinder Imp', kind: 'Enemy', image: 'assets/enemies/sheet-additions/cinder-imp-1.png' },
  { id: 'amethystColossus', name: 'Amethyst Colossus', kind: 'Enemy', image: 'assets/enemies/sheet-additions/amethyst-colossus.png' },
  { id: 'abyssJellyNew', name: 'Abyssal Medusa', kind: 'Enemy', image: 'assets/enemies/sheet-additions/abyss-jelly.png' },
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
  { id: 'boneRaven', name: 'Bone Raven', kind: 'Enemy', image: 'assets/themes/bony-ruins/bone-raven-clean-v2.png' },
  { id: 'ghost1', name: 'Soulfire Reaper', kind: 'Enemy', image: 'assets/themes/haunted-reliquary/ghost 1.png' },
  { id: 'ghost2', name: 'Spectral Duelist', kind: 'Enemy', image: 'assets/themes/haunted-reliquary/ghost 2.png' },
  { id: 'ghost3', name: 'Gravewind Archer', kind: 'Enemy', image: 'assets/themes/haunted-reliquary/ghost 3.png' },
  { id: 'ghost4', name: 'Dread Cavalier', kind: 'Enemy', image: 'assets/themes/haunted-reliquary/ghost 4.png' },
  { id: 'ghost5', name: 'Phantom Greatblade', kind: 'Enemy', image: 'assets/themes/haunted-reliquary/ghost 5.png' },
  { id: 'skell1', name: 'Grave Scimitar', kind: 'Enemy', image: 'assets/themes/bony-ruins/skell 1.png' },
  { id: 'skell2', name: 'Crypt Archer', kind: 'Enemy', image: 'assets/themes/bony-ruins/skell 2.png' },
  { id: 'skell3', name: 'Ossuary Duelist', kind: 'Enemy', image: 'assets/themes/bony-ruins/skell 3.png' },
  { id: 'skell4', name: 'Emberbone Magus', kind: 'Enemy', image: 'assets/themes/bony-ruins/skell 4.png' },
  { id: 'skell5', name: 'Marrow Stalker', kind: 'Enemy', image: 'assets/themes/bony-ruins/skell 5.png' },
  { id: 'skell6', name: 'Horned Bonecleaver', kind: 'Enemy', image: 'assets/themes/bony-ruins/skell 6.png' },
  { id: 'skell7', name: 'Royal Tombguard', kind: 'Enemy', image: 'assets/themes/bony-ruins/skell 7.png' },
  { id: 'skell8', name: 'Pharaoh Revenant', kind: 'Enemy', image: 'assets/themes/bony-ruins/skell 8.png' },
  { id: 'skell9', name: 'Sepulchral Lancer', kind: 'Enemy', image: 'assets/themes/bony-ruins/skell 9.png' },
  { id: 'skell10', name: 'Shroud Wraith', kind: 'Enemy', image: 'assets/themes/bony-ruins/skell 10.png' },
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
  { id: 'clockworkOrb', name: 'Clockwork Orb', kind: 'Enemy', image: 'assets/themes/clockwork-citadel/clockwork-orb.png' },
  { id: 'mechBear', name: 'Brassmaw Siege Bear', kind: 'Enemy', image: 'assets/themes/furnace-foundry/mech-bear.png', fanArt: 'assets/fan-art/mech bear standing.png' },
  { id: 'shadowCat', name: 'Nightclaw Lynx', kind: 'Enemy', image: 'assets/themes/shadow-realm/shadow-cat.png', fanArt: 'assets/fan-art/Feral shadowed lynx.png' },
  { id: 'shadowGator', name: 'Dreadscale Gator', kind: 'Enemy', image: 'assets/themes/shadow-realm/shadow-gator.png' },
  { id: 'prismMoth', name: 'Prism Moth', kind: 'Enemy', image: 'assets/themes/crystal-sanctum/prism-moth.png' },
  { id: 'starlingMarauder', name: 'Starling Marauder', kind: 'Enemy', image: 'assets/themes/astral-foundry/starling-marauder-complete.png' },
  { id: 'cometHound', name: 'Comet Hound', kind: 'Enemy', image: 'assets/themes/astral-foundry/comet-hound.png' },
  { id: 'astralSentinel', name: 'Astral Sentinel', kind: 'Enemy', image: 'assets/themes/astral-foundry/astral-sentinel-complete.png' },
  { id: 'astralrootSpriggan', name: 'Astralroot Spriggan', kind: 'Enemy', image: 'assets/themes/astralroot-colossus/astralroot-spriggan.png' },
  { id: 'leyshardWisp', name: 'Leyshard Wisp', kind: 'Enemy', image: 'assets/themes/astralroot-colossus/leyshard-wisp.png' },
  { id: 'starbranchStag', name: 'Starbranch Stag', kind: 'Enemy', image: 'assets/themes/astralroot-colossus/starbranch-stag.png' },
  { id: 'prismhideBeast', name: 'Prismhide Beast', kind: 'Enemy', image: 'assets/themes/astralroot-colossus/prismhide-beast.png' },
  { id: 'veilbornShade', name: 'Veilborn Shade', kind: 'Enemy', image: 'assets/themes/umbral-expanse/veilborn-shade.png' },
  { id: 'eclipseShrike', name: 'Eclipse Shrike', kind: 'Enemy', image: 'assets/themes/umbral-expanse/eclipse-shrike.png' },
  { id: 'singularityEye', name: 'Singularity Eye', kind: 'Enemy', image: 'assets/themes/umbral-expanse/singularity-eye.png' },
  { id: 'nightcoilDrake', name: 'Nightcoil Drake', kind: 'Enemy', image: 'assets/themes/umbral-expanse/nightcoil-drake.png' },
  { id: 'duskweaver', name: 'Duskweaver Oracle', kind: 'Enemy', image: 'assets/themes/umbral-expanse/duskweaver.png' },
  { id: 'voidPanther', name: 'Void Panther', kind: 'Enemy', image: 'assets/themes/umbral-expanse/void-panther.png' },
  { id: 'eclipseReaper', name: 'Eclipse Reaper', kind: 'Enemy', image: 'assets/themes/umbral-expanse/eclipse-reaper.png' },
  { id: 'gloomfinSerpent', name: 'Gloomfin Serpent', kind: 'Enemy', image: 'assets/themes/umbral-expanse/gloomfin-serpent.png' },
  { id: 'starlessCourser', name: 'Starless Courser', kind: 'Enemy', image: 'assets/themes/umbral-expanse/starless-courser.png' },
  { id: 'eclipseSpider', name: 'Eclipse Spider', kind: 'Enemy', image: 'assets/themes/umbral-expanse/eclipse-spider.png' },
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
  { id: 'octopusBoss', name: 'The Abyssal Leviathan', kind: 'Boss', image: 'assets/themes/abyssal-leviathan/octopus-boss.png' },
  { id: 'foldedShogun', name: 'The Folded Shogun', kind: 'Boss', image: 'assets/themes/folded-shogun/folded-shogun.png' },
  { id: 'stormglassLeviathan', name: 'Stormglass Leviathan', kind: 'Boss', image: 'assets/themes/stormglass-leviathan/stormglass-leviathan.png' },
  { id: 'clockworkArchon', name: 'Clockwork Archon', kind: 'Boss', image: 'assets/themes/clockwork-citadel/clockwork-archon.png' },
  { id: 'clockworkSeraph', name: 'Aurelius, the Clockwork Seraph', kind: 'Boss', image: 'assets/themes/clockwork-seraph/clockwork-seraph.png' },
  { id: 'gravebloomColossus', name: 'Gravebloom Colossus', kind: 'Boss', image: 'assets/themes/gravebloom-colossus/gravebloom-colossus.png' },
  { id: 'lunarKitsune', name: 'Lunar Kitsune Sovereign', kind: 'Boss', image: 'assets/themes/lunar-kitsune/lunar-kitsune.png' },
  { id: 'eternityWarden', name: 'The Eternity Warden', kind: 'Boss', image: 'assets/themes/eternity-warden/eternity-warden.png' },
  { id: 'hollowStarBoss', name: 'The Hollow Star', kind: 'Boss', image: 'assets/themes/hollow-star/hollow-star-boss.png' },
  { id: 'inkboundArchivist', name: 'The Inkbound Archivist', kind: 'Boss', image: 'assets/themes/inkbound-archive/inkbound-archivist.png' },
  { id: 'crimsonMarionette', name: 'The Crimson Marionette', kind: 'Boss', image: 'assets/themes/crimson-marionette/crimson-marionette.png' },
  { id: 'waxAcolyte', name: 'Wax Acolyte', kind: 'Enemy', image: 'assets/themes/melted-monarch/wax-acolyte.png' },
  { id: 'octopusMinion', name: 'Abyssal Tentacle', kind: 'Enemy', image: 'assets/themes/abyssal-leviathan/octopus-minion.png' },
  { id: 'meltedMonarch', name: 'The Melted Monarch', kind: 'Boss', image: 'assets/themes/melted-monarch/melted-monarch.png' },
  { id: 'drownedBell', name: 'The Drowned Bell', kind: 'Boss', image: 'assets/themes/drowned-bell/drowned-bell.png' },
  { id: 'darkMagicSovereign', name: 'The Dark Magic Sovereign', kind: 'Boss', image: 'assets/themes/umbral-expanse/boss dark.png' },
  { id: 'astralrootColossus', name: 'The Astralroot Colossus', kind: 'Boss', image: 'assets/themes/astralroot-colossus/astralroot-colossus.png' },
  { id: 'mysticalWarden', name: 'The Mystical Warden', kind: 'Boss', image: 'assets/themes/sunken-shrine/mystical-boss-clean.png' },
  { id: 'standard', name: 'Dungeon Guardian', kind: 'Boss', image: 'assets/themes/shadow-realm/shadow-boss.png' },
];
const biomeRelics = [
  ['verdantSeedheart', 'Seedheart Reliquary', 'Verdant Ruins', '#86efac'],
  ['drownedPrayerCoin', 'Drowned Prayer Coin', 'Sunken Shrine', '#5eead4'],
  ['emberCrownFragment', 'Ember Crown Fragment', 'Cinder Keep', '#fb923c'],
  ['everfrostTear', 'Everfrost Tear', 'Frozen Depths', '#bae6fd'],
  ['bloomglassSpore', 'Bloomglass Spore', 'Bloomed Hollow', '#f0abfc'],
  ['ossuarySignet', 'Ossuary Signet', 'Bony Ruins', '#a5f3fc'],
  ['sunscarScarab', 'Sunscar Scarab', 'Desert Ruins', '#fbbf24'],
  ['abyssalPearl', 'Abyssal Pearl', 'Abyssal Depths', '#22d3ee'],
  ['prismaticShard', 'Prismatic Memory Shard', 'Crystal Sanctum', '#67e8f9'],
  ['fallenStarCog', 'Fallen-Star Cog', 'Astral Foundry', '#fde68a'],
  ['sunreefIdol', 'Sunreef Idol', 'Sunreef Lagoon', '#facc15'],
  ['leyrootPrism', 'Leyroot Prism', 'Astralroot Grove', '#c084fc'],
  ['eclipseSeal', 'Eclipse Seal', 'Umbral Expanse', '#a855f7'],
  ['wraithboundLocket', 'Wraithbound Locket', 'Haunted Reliquary', '#60a5fa'],
].map(([id, name, biome, color], themeIndex) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><defs><radialGradient id="g"><stop stop-color="#fff"/><stop offset=".32" stop-color="${color}"/><stop offset="1" stop-color="#0f172a"/></radialGradient></defs><rect width="512" height="512" rx="72" fill="#080b14"/><circle cx="256" cy="256" r="178" fill="none" stroke="${color}" stroke-width="14" opacity=".42"/><path d="M256 70 414 222 256 442 98 222Z" fill="url(#g)" stroke="${color}" stroke-width="18"/><path d="m98 222 158 54 158-54M256 70v372" fill="none" stroke="#fff" stroke-width="9" opacity=".55"/></svg>`;
  return {
    id: `relic:${id}`,
    name,
    biome,
    themeIndex,
    kind: 'Relic',
    color,
    image: `data:image/svg+xml,${encodeURIComponent(svg)}`,
    traits: `Biome relic - earned by clearing a 2x Hard Wave in ${biome}`,
    backstory: `${name} carries a permanent memory of ${biome}. It appears only for heroes who accept the biome's Hard Wave and defeat every enemy within it.`,
  };
});
journalCatalog.push(...biomeRelics);
const championJournalStorageKey = 'endlessDungeonChampionJournal';
const championJournalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="72" fill="#120b05"/><circle cx="256" cy="256" r="178" fill="#451a03" stroke="#fbbf24" stroke-width="18"/><path d="m256 78 46 98 108 14-79 75 21 107-96-52-96 52 21-107-79-75 108-14Z" fill="#f59e0b" stroke="#fef3c7" stroke-width="12"/><path d="M178 255h156M256 176v160" stroke="#fff7ed" stroke-width="14" opacity=".7"/></svg>`;
const championJournalImage = `data:image/svg+xml,${encodeURIComponent(championJournalSvg)}`;
let championJournalRecords = [];
try {
  const savedChampionRecords = JSON.parse(window.localStorage.getItem(championJournalStorageKey) || '[]');
  championJournalRecords = Array.isArray(savedChampionRecords) ? savedChampionRecords.slice(-50) : [];
} catch (error) {
  championJournalRecords = [];
}

function championRecordToJournalEntry(record) {
  return {
    ...record,
    kind: 'Champion',
    image: championJournalImage,
    traits: `Named champion / 5x health and damage / defeated on Wave ${record.wave}`,
    backstory: `${record.name}, once a ${record.enemyName}, rose as the named champion of ${record.biome}. The hero defeated this champion on Wave ${record.wave} and recovered its reinforced cache.`,
  };
}
journalCatalog.push(...championJournalRecords.map(championRecordToJournalEntry));
const bestiaryProfiles = {
  riftHound: { health: '58 + 10 per wave', damage: '13 + 1.9 per wave', speed: '176', traits: 'Rift Pounce / rapid pursuit / long retreat', backstory: 'Rift Hounds form where failed portals bite into dungeon stone. Every violet crack is a doorway too small for anything except hunger.' },
  chainHexer: { health: '64 + 11 per wave', damage: '12 + 1.8 per wave', speed: '92', traits: 'Hooked Chain / ranged root / control caster', backstory: 'Chain Hexers once bound dangerous spirits. Their masks survived the ritual, but the chains learned to pull the hands that held them.' },
  bellmawJuggernaut: { health: '142 + 18 per wave', damage: '18 + 2.7 per wave', speed: '54', traits: 'Doom Bell / circular shockwave / heavy knockback', backstory: 'Bellmaws were condemned wardens sealed around warning bells. Each step tolls for a disaster that has already arrived.' },
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
  astralrootSpriggan: { health: '68 + 10 per wave', damage: '11 + 1.7 per wave', speed: '166', traits: 'Rootclaw Flurry · quick retreat · crystal camouflage', backstory: 'Astralroot Spriggans bud wherever fallen starlight reaches the grove floor. Their bright eyes open before their roots have finished learning how to walk.' },
  leyshardWisp: { health: '88 + 12 per wave', damage: '14 + 2 per wave', speed: '142', traits: 'Leybolt · floating movement · ranged crystal magic', backstory: 'Leyshard Wisps are splinters shed by the grove’s buried crystal heart. Each fragment floats along the ley lines and fires their gathered light at intruders.' },
  starbranchStag: { health: '142 + 18 per wave', damage: '18 + 2.5 per wave', speed: '154', traits: 'Starbranch Charge · stamina fracture · long rebound', backstory: 'The grove crowns its oldest stags with antlers grown from living constellations. When they charge, every branch points toward the same doomed path.' },
  prismhideBeast: { health: '238 + 26 per wave', damage: '23 + 3 per wave', speed: '64', traits: 'Prismhide Crush · heavy armour · massive impact', backstory: 'Prismhide Beasts sleep beneath the crystal roots until the grove is threatened. Centuries of mineral growth have turned their hides into moving fortress walls.' },
  crimsonMarionette: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '88', traits: 'Scissor Lunge / String Snare / Final Curtain', backstory: 'A court dancer bound to invisible strings, it cuts applause from anyone who enters its abandoned theatre.' },
  drownedBell: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '58', traits: 'Bell Charge / Tidal Sweep / Drowning Knell', backstory: 'The shrine bell sank with its keepers still chained beneath it. Their last warning now walks the dungeon.' },
  hollowStar: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '70', traits: 'Astral Strike / Orbit Sweep / Starfall Slam', backstory: 'An astronomer looked into a dead star until the empty light learned to look back.' },
  inkboundArchivist: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '74', traits: 'Quill Strike / Living Book / Forbidden Decree', backstory: 'Every erased history survives in the Archivist’s book, angry at the world that forgot it.' },
  meltedMonarch: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '62', traits: 'Wax Cleave / Candleburst / Royal Meltdown', backstory: 'A king preserved in ceremonial wax awakened when the last candle in his palace refused to die.' },
  stormglassLeviathan: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '68', traits: 'Trident Crush / Storm Ring / Glass Tempest', backstory: 'Lightning trapped beneath the oldest sea hardened into scales and rose carrying a trident of shattered storms.' },
  clockworkArchon: { traits: 'Chronoblade / Gear Volley / Clockburst / Time Lock / Orb Summoning', backstory: 'Built to guard the master clock beneath the citadel, the Archon concluded that mortal time was a defect requiring correction.' },
  clockworkSeraph: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '86', traits: 'Chrono Halberd / Portal Lance / Feather Barrage / Clockfall', backstory: 'Aurelius was built as the celestial clock\'s last herald. Every wingbeat advances the arena toward an appointed ending.' },
  clockworkOrb: { traits: 'Cog Bolt / hovering movement / Archon summon', backstory: 'Clockwork Orbs are discarded seconds given armour and a burning core. They circle the Archon until released to hunt anything moving out of rhythm.' },
  gravebloomColossus: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '48', traits: 'Tomb Maul / Gravebloom / Cemetery Quake', backstory: 'Every root beneath the royal cemetery grew around the same forgotten guardian and taught the stones to walk.' },
  lunarKitsune: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '112', traits: 'Crescent Cut / Ninefold Mirage / Moonfall', backstory: 'Nine lifetimes of moonlit duels gathered beneath one mask, each tail remembering a different victory.' },
  eternityWarden: { health: 'Final boss scaling', damage: 'Final boss scaling', speed: '82', traits: 'Epoch Blade / Time Collapse / End of Ages', backstory: 'The final guardian stands outside the dungeon’s history. Every failed hero is already reflected in its hourglass.' },
  yinYangBoss: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '72', traits: 'Sword overhead / roundhouse sweep / Yin Yang Nova / rare arena-wide sword slam', backstory: 'Two champions reached the heart of the balance engine from opposite paths. Neither would yield, so the arena fused them into a single guardian whose light and shadow can only move together.' },
  octopusBoss: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '66', traits: 'Tentacle Slam / Constriction Vortex / Ink Cloud / deep-sea sovereignty', backstory: 'An ancient leviathan of the darkest trenches learned to walk on stone as if it were sediment. Its many arms remember every creature it consumed, and its hunger recognizes in the hero a meal that might finally sate an appetite ten thousand years old.' },
  hollowStarBoss: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '68', traits: 'Astral overhead / orbit sweep / rare celestial ground slam', backstory: 'The last astronomer of a ruined observatory stared into an impossible eclipse until the star looked back. Its armour now charts dead constellations around a living void.' },
  inkboundArchivist: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '70', traits: 'Quill strike / ink sweep / decree slam / very rare Runaway Grimoire', backstory: 'The last keeper of the drowned archive wrote forbidden names into a living ledger. The book grew hungry, bound itself to its author, and now closes around intruders before returning to the Archivist\'s back.' },
  crimsonMarionette: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '76', traits: 'Scissor Crosscut / Scissor Pirouette / String Snare / very rare arena-wide Final Curtain', backstory: 'A discarded royal performer learned to pull her own strings. Now the empty theater obeys every turn of her control cross, and her silver shears cut short anyone who interrupts the final act.' },
  meltedMonarch: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '62', traits: 'Candle Halberd Cleave / five-shot Candleburst / very rare arena-wide Royal Meltdown', backstory: 'When the candle cathedral burned, its king refused burial. The mourning candles flowed into his empty throne, shaped themselves into a monarch, and kept every flame burning long after the kingdom went dark.' },
  waxAcolyte: { health: '82 + 11 per boss tier', damage: '11 + 1.45 per boss tier', speed: '126', traits: 'Hook strike / summoned in pairs / maximum four active', backstory: 'Every Acolyte began as a funeral candle placed beneath the royal throne. The Melted Monarch gives those small flames legs, empty faces, and hooks with which to drag the living toward his light.' },
  octopusMinion: { health: '76 + 10 per wave', damage: '11 + 1.6 per wave', speed: '88', traits: 'Tentacle Lash / grapple pull / aquatic grace', backstory: 'Abyssal Tentacles are severed limbs of deep-sea creatures that learned to hunt independently. Each one carries the hunger of its absent body and the strength to drag prey into the depths.' },
  drownedBell: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '58', traits: 'Chained Clapper Sweep / Undertow Charge / very rare arena-wide Death Knell', backstory: 'A cathedral bell sank with its city and kept tolling beneath the sea. Coral gave it legs, the drowned gave it an eye, and every chain now carries the memory of those who never reached the surface.' },
  foldedShogun: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '78', traits: 'Ink Katana Cleave / Paper Cyclone / very rare arena-wide Thousand-Fold Judgment', backstory: 'A defeated shogun ordered his last decree folded into armor. Every page remembered his rage, assembled itself around the empty throne, and now cuts down anyone who tries to read the ending.' },
  dragonBoss: { health: 'Boss-tier scaling', damage: 'Boss-tier scaling', speed: '96', traits: 'Fast circling flight / freezing staff bolt / dragon swipe / fire breath every 20 seconds / no summons', backstory: 'The Frostwing Dragon Rider circles a stone arena suspended above the clouds. The rider binds prey in ice while the armoured dragon gathers enough breath to flood the platform with blue flame.' },
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
  riftHound: 'Rift Hounds form where failed portals bite into dungeon stone. Every violet crack is a doorway too small for anything except hunger.',
  chainHexer: 'Chain Hexers once bound dangerous spirits. Their masks survived the ritual, but the chains learned to pull the hands that held them.',
  bellmawJuggernaut: 'Bellmaws were condemned wardens sealed around warning bells. Each step tolls for a disaster that has already arrived.',
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

const relicCompletionTitle = 'Relicwarden of the Thirteen';

function hasRelicCompletionTitle() {
  return biomeRelics.every((relic) => journalDiscoveries.has(relic.id));
}

function refreshRelicCompletionTitle() {
  const unlocked = hasRelicCompletionTitle();
  relicTitleStat.classList.toggle('hidden', !unlocked);
  relicTitleBadge.classList.toggle('hidden', !unlocked);
  relicTitleStat.querySelector('strong').textContent = relicCompletionTitle;
  relicTitleBadge.textContent = relicCompletionTitle;
  return unlocked;
}

function discoverJournalEntry(id) {
  if (state.godMode) return;
  if (!id || journalDiscoveries.has(id) || !journalCatalog.some((entry) => entry.id === id)) return;
  journalDiscoveries.add(id);
  saveJournal();
  refreshRelicCompletionTitle();
}

function renderJournal() {
  journalGrid.replaceChildren();
  for (const kind of ['Enemy', 'Boss', 'Champion', 'Relic']) {
    const section = document.createElement('section');
    section.className = 'journal-section';
    const heading = document.createElement('h2');
    heading.textContent = kind === 'Enemy'
      ? 'Enemies'
      : kind === 'Boss' ? 'Bosses'
        : kind === 'Champion' ? 'Defeated Champions' : 'Biome Relics';
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
        ${discovered && entry.kind === 'Champion' ? `<small>${entry.enemyName} - ${entry.biome} - Wave ${entry.wave}</small>` : ''}
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
  if (entry.kind === 'Champion') {
    return {
      health: '5x champion',
      damage: `Defeated on Wave ${entry.wave}`,
      speed: entry.biome,
      traits: entry.traits,
      backstory: entry.backstory,
    };
  }
  if (entry.kind === 'Relic') {
    return {
      health: 'Permanent collectible',
      damage: 'Hard Wave reward',
      speed: entry.biome,
      traits: entry.traits,
      backstory: entry.backstory,
    };
  }
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
  const visibleStats = (entry.kind === 'Relic'
    ? [
        ['Status', profile.health],
        ['Earned from', profile.damage],
        ['Biome', profile.speed],
      ]
    : entry.kind === 'Champion'
      ? [
          ['Strength', profile.health],
          ['Victory', profile.damage],
          ['Biome', profile.speed],
        ]
      : [
        ['Health', profile.health],
        ['Damage', profile.damage],
        ['Speed', profile.speed],
      ]).filter(([, value]) => value && !/scal(?:e|ing)|class-specific|boss-specific/i.test(value));
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
  { id: 'runebloom', name: 'Runebloom Warden', boss: 13, portrait: 'assets/player/armor/male-runebloom-portrait.png', combat: 'assets/player/armor/male-runebloom-combat-head-corrected.png', femalePortrait: 'assets/player/armor/female-runebloom-portrait.png', femaleCombat: 'assets/player/armor/female-runebloom-combat-swordless.png', nativeFacing: 'left', combatOffsetX: -1.5, combatOffsetY: 0.5, weaponAnchorX: -36, weaponAnchorY: 3, defense: 35, health: 58, stamina: 22, thorns: 21 },
  { id: 'threadmaster', name: 'Crimson Threadmaster', boss: 17, portrait: 'assets/player/armor/male-threadmaster-portrait-clean-v2.png', combat: 'assets/player/armor/male-threadmaster-combat-swordless-clean-v2.png', femalePortrait: 'assets/player/armor/female-threadmaster-portrait-clean-v2.png', femaleCombat: 'assets/player/armor/female-threadmaster-combat-swordless-clean-v2.png', defense: 38, health: 64, stamina: 24, thorns: 23 },
  { id: 'royalArmor', name: 'Crownward Regalia', boss: 20, portrait: 'assets/player/armor/male-royal-armor-portrait.png', combat: 'assets/player/armor/male-royal-armor-combat-swordless.png', femalePortrait: 'assets/player/armor/female-dragon-plate-combat.png', femaleCombat: 'assets/player/armor/female-dragon-plate-combat-swordless.png', defense: 40, health: 70, stamina: 25, thorns: 25 },
  { id: 'voidstar', name: 'Voidstar Regalia', boss: 21, portrait: 'assets/player/armor/male-voidstar-clean-v4.png', combat: 'assets/player/armor/male-voidstar-clean-v4.png', femalePortrait: 'assets/player/armor/female-voidstar-clean-v2.png', femaleCombat: 'assets/player/armor/female-voidstar-clean-v2.png', nativeFacing: 'front', defense: 42, health: 76, stamina: 27, thorns: 26 },
  { id: 'stormglass', name: 'Stormglass Vanguard', boss: 22, portrait: 'assets/player/armor/male-stormglass-portrait.png', combat: 'assets/player/armor/male-stormglass-combat-swordless.png', femalePortrait: 'assets/player/armor/female-stormglass-portrait.png', femaleCombat: 'assets/player/armor/female-stormglass-combat-swordless.png', nativeFacing: 'right', defense: 44, health: 82, stamina: 29, thorns: 27 },
  { id: 'emeraldAegis', name: 'Emeraldwing Aegis', boss: 23, portrait: 'assets/player/armor/male-emerald-aegis-menu-cutout-v3.png?v=2', combat: 'assets/player/armor/male-emerald-aegis-masculine-v2.png?v=2', femalePortrait: 'assets/player/armor/new armour 3 f.png', femaleCombat: 'assets/player/armor/new armour 3 f.png', nativeFacing: 'front', defense: 46, health: 88, stamina: 31, thorns: 28 },
  { id: 'sunspire', name: 'Sunspire Regalia', boss: 24, portrait: 'assets/player/armor/sheet-sets/male-sunspire.png', combat: 'assets/player/armor/sheet-sets/male-sunspire.png', femalePortrait: 'assets/player/armor/sheet-sets/female-sunspire.png', femaleCombat: 'assets/player/armor/sheet-sets/female-sunspire.png', nativeFacing: 'front', defense: 48, health: 94, stamina: 33, thorns: 29 },
  { id: 'worldforged', name: 'Worldforged Aegis', boss: 25, portrait: 'assets/player/armor/male-worldforged-portrait.png', combat: 'assets/player/armor/male-worldforged-combat-swordless.png', femalePortrait: 'assets/player/armor/female-dragon-plate-combat.png', femaleCombat: 'assets/player/armor/female-dragon-plate-combat-swordless.png', defense: 50, health: 100, stamina: 35, thorns: 30 },
  { id: 'frostveil', name: 'Frostveil Mantle', boss: 26, portrait: 'assets/player/armor/sheet-sets/male-frostveil.png', combat: 'assets/player/armor/sheet-sets/male-frostveil.png', femalePortrait: 'assets/player/armor/sheet-sets/female-frostveil.png', femaleCombat: 'assets/player/armor/sheet-sets/female-frostveil.png', nativeFacing: 'front', defense: 51, health: 103, stamina: 35, thorns: 30 },
  { id: 'bloodthorn', name: 'Bloodthorn Dreadplate', boss: 27, portrait: 'assets/player/armor/sheet-sets/male-bloodthorn.png', combat: 'assets/player/armor/sheet-sets/male-bloodthorn.png', femalePortrait: 'assets/player/armor/sheet-sets/female-bloodthorn.png', femaleCombat: 'assets/player/armor/sheet-sets/female-bloodthorn.png', nativeFacing: 'front', defense: 52, health: 106, stamina: 36, thorns: 31 },
  { id: 'wildcrown', name: 'Wildcrown Carapace', boss: 28, portrait: 'assets/player/armor/sheet-sets/male-wildcrown.png', combat: 'assets/player/armor/sheet-sets/male-wildcrown.png', femalePortrait: 'assets/player/armor/sheet-sets/female-wildcrown.png', femaleCombat: 'assets/player/armor/sheet-sets/female-wildcrown.png', nativeFacing: 'front', defense: 52, health: 108, stamina: 36, thorns: 31 },
  { id: 'emberwrought', name: 'Emberwrought Dreadplate', boss: 29, portrait: 'assets/player/armor/male-emberwrought-forward-clean.png', combat: 'assets/player/armor/male-emberwrought-forward-clean.png', femalePortrait: 'assets/player/armor/female-emberwrought-forward-clean.png', femaleCombat: 'assets/player/armor/female-emberwrought-forward-clean.png', nativeFacing: 'right', defense: 53, health: 110, stamina: 37, thorns: 32 },
  { id: 'starweave', name: 'Starweave Harness', boss: 30, portrait: 'assets/player/armor/sheet-sets/male-starweave.png', combat: 'assets/player/armor/sheet-sets/male-starweave.png', femalePortrait: 'assets/player/armor/sheet-sets/female-starweave.png', femaleCombat: 'assets/player/armor/sheet-sets/female-starweave.png', nativeFacing: 'front', defense: 54, health: 115, stamina: 39, thorns: 33 },
  { id: 'mysticgrove', name: 'Mysticgrove Regalia', boss: 31, portrait: 'assets/player/armor/male-mysticgrove-padded-v2.png', combat: 'assets/player/armor/male-mysticgrove-padded-v2.png', femalePortrait: 'assets/player/armor/female-mysticgrove-combat-swordless.png', femaleCombat: 'assets/player/armor/female-mysticgrove-combat-swordless.png', defense: 55, health: 120, stamina: 40, thorns: 34 },
  { id: 'hellfire', name: 'Hellfire Sovereign', boss: 32, portrait: 'assets/player/armor/sheet-sets/male-hellfire.png', combat: 'assets/player/armor/sheet-sets/male-hellfire.png', femalePortrait: 'assets/player/armor/sheet-sets/female-hellfire.png', femaleCombat: 'assets/player/armor/sheet-sets/female-hellfire.png', nativeFacing: 'front', defense: 57, health: 126, stamina: 42, thorns: 35 },
  { id: 'trialforged', name: 'Trialforged Aegis', boss: -1, trialOnly: true, portrait: 'assets/player/armor/trialforged/trialforged.png', combat: 'assets/player/armor/trialforged/trialforged.png', femalePortrait: 'assets/player/armor/trialforged/trialforged.png', femaleCombat: 'assets/player/armor/trialforged/trialforged.png', defense: 48, health: 90, stamina: 32, thorns: 29 },
  { id: 'arenaConqueror', name: 'Arena Conqueror Plate', boss: 0, arenaOnly: true, portrait: 'assets/player/armor/arena-conqueror-male.png', combat: 'assets/player/armor/arena-conqueror-male.png', femalePortrait: 'assets/player/armor/arena-conqueror-female.png', femaleCombat: 'assets/player/armor/arena-conqueror-female.png', nativeFacing: 'front', defense: 50, health: 105, stamina: 38, thorns: 30 },
  { id: 'eternalConqueror', name: 'Eternal Conqueror Plate', boss: 0, battlegroundWave: 60, portrait: 'assets/player/armor/arena-conqueror-male.png', combat: 'assets/player/armor/arena-conqueror-male.png', femalePortrait: 'assets/player/armor/arena-conqueror-female.png', femaleCombat: 'assets/player/armor/arena-conqueror-female.png', nativeFacing: 'front', defense: 62, health: 155, stamina: 52, thorns: 40 },
];

const weaponSets = [
  { id: 'lavaBlade', name: 'Cinderfang', kind: 'melee', boss: 2, portrait: 'assets/player/weapons/lava-blade-portrait.png', combat: 'assets/player/weapons/lava-blade-combat.png', combatCrop: [277, 106, 469, 1274], combatWidth: 18, combatHeight: 80, gripY: 0.18, damage: 4, reach: 2 },
  { id: 'verdantBow', name: 'Verdant Longbow', kind: 'bow', boss: 3, portrait: 'assets/player/weapons/bow-01.png', combat: 'assets/player/weapons/bow-01.png', projectileDamage: 24, projectileSpeed: 620, cooldown: 0.7 },
  { id: 'broadSword', name: 'Oathkeeper Broadblade', kind: 'melee', boss: 4, portrait: 'assets/player/weapons/broad-sword.png', combat: 'assets/player/weapons/broad-sword.png', combatCrop: [318, 54, 387, 1420], combatWidth: 18, combatHeight: 80, gripY: 0.16, damage: 8, reach: 4 },
  { id: 'tideBow', name: 'Tidepiercer Bow', kind: 'bow', boss: 5, portrait: 'assets/player/weapons/bow-02.png', combat: 'assets/player/weapons/bow-02.png', projectileDamage: 32, projectileSpeed: 660, cooldown: 0.64 },
  { id: 'diamondSword', name: 'Diamondheart Greatsword', kind: 'melee', boss: 6, portrait: 'assets/player/weapons/diamond-sword-portrait.png', combat: 'assets/player/weapons/diamond-sword-combat.png', combatCrop: [334, 36, 352, 1453], combatWidth: 18, combatHeight: 82, gripY: 0.16, damage: 15, reach: 8 },
  { id: 'cinderBow', name: 'Cinderstring Bow', kind: 'bow', boss: 7, portrait: 'assets/player/weapons/bow-03.png', combat: 'assets/player/weapons/bow-03.png', projectileDamage: 42, projectileSpeed: 700, cooldown: 0.58 },
  { id: 'emeraldSword', name: 'Emerald Sovereign', kind: 'melee', boss: 8, portrait: 'assets/player/weapons/emerald-sword-portrait.png', combat: 'assets/player/weapons/emerald-sword-combat.png', combatCrop: [317, 33, 392, 1469], combatWidth: 19, combatHeight: 82, gripY: 0.16, damage: 24, reach: 12 },
  { id: 'frostspire', name: 'Frostspire', kind: 'melee', boss: 9, portrait: 'assets/player/weapons/frostspire.png', combat: 'assets/player/weapons/frostspire.png', combatCrop: [450, 230, 493, 1777], combatWidth: 19, combatHeight: 82, gripY: 0.18, damage: 32, reach: 15 },
  { id: 'frostBow', name: 'Frostwind Bow', kind: 'bow', boss: 9, portrait: 'assets/player/weapons/bow-04.png', combat: 'assets/player/weapons/bow-04.png', projectileDamage: 54, projectileSpeed: 750, cooldown: 0.52 },
  { id: 'worldfireCleaver', name: 'Worldfire Cleaver', kind: 'melee', boss: 11, portrait: 'assets/player/weapons/worldfire-cleaver.png', combat: 'assets/player/weapons/worldfire-cleaver.png', combatCrop: [500, 82, 395, 1879], combatWidth: 20, combatHeight: 84, gripY: 0.18, damage: 42, reach: 18 },
  { id: 'voidBow', name: 'Voidcaller Bow', kind: 'bow', boss: 11, portrait: 'assets/player/weapons/bow-05.png', combat: 'assets/player/weapons/bow-05.png', projectileDamage: 68, projectileSpeed: 810, cooldown: 0.46 },
  { id: 'voidRequiem', name: 'Void Requiem', kind: 'melee', boss: 12, portrait: 'assets/player/weapons/void-requiem.png', combat: 'assets/player/weapons/void-requiem.png', combatCrop: [430, 106, 513, 1947], combatWidth: 20, combatHeight: 86, gripY: 0.17, damage: 54, reach: 22 },
  { id: 'sunforgedJudgment', name: 'Sunforged Judgment', kind: 'melee', boss: 14, portrait: 'assets/player/weapons/sunforged-judgment.png', combat: 'assets/player/weapons/sunforged-judgment.png', combatCrop: [468, 188, 441, 1813], combatWidth: 20, combatHeight: 84, gripY: 0.17, damage: 68, reach: 26 },
  { id: 'emberStaff', name: 'Emberheart Staff', kind: 'staff', boss: 12, sheet: 'staffs', sheetPath: 'assets/player/weapons/staff.png', sheetDirection: 'horizontal', sheetFrame: 0, sheetFrames: 3, projectileDamage: 86, projectileSpeed: 500, cooldown: 0.72, splashRadius: 54 },
  { id: 'astralStaff', name: 'Astral Bloom Staff', kind: 'staff', boss: 13, sheet: 'staffs', sheetPath: 'assets/player/weapons/staff.png', sheetDirection: 'horizontal', sheetFrame: 1, sheetFrames: 3, projectileDamage: 116, projectileSpeed: 540, cooldown: 0.64, splashRadius: 68 },
  { id: 'worldStaff', name: 'Worldroot Staff', kind: 'staff', boss: 14, sheet: 'staffs', sheetPath: 'assets/player/weapons/staff.png', sheetDirection: 'horizontal', sheetFrame: 2, sheetFrames: 3, projectileDamage: 152, projectileSpeed: 580, cooldown: 0.56, splashRadius: 82 },
  { id: 'thornsilverBlade', name: 'Thornsilver Blade', kind: 'melee', boss: 15, portrait: 'assets/player/weapons/thornsilver-blade.png', combat: 'assets/player/weapons/thornsilver-blade.png', combatCrop: [122, 1, 204, 417], combatWidth: 21, combatHeight: 80, gripX: 0.72, gripY: 0.12, combatArtRotation: -0.35, damage: 76, reach: 29 },
  { id: 'glacierBow', name: 'Glacier Arc', kind: 'bow', boss: 16, portrait: 'assets/player/weapons/glacier-bow.png', combat: 'assets/player/weapons/glacier-bow.png', projectileDamage: 82, projectileSpeed: 850, cooldown: 0.44 },
  { id: 'clockworkSpear', name: 'Clockwork Lance', kind: 'melee', boss: 17, portrait: 'assets/player/weapons/clockwork-spear.png', combat: 'assets/player/weapons/clockwork-spear.png', combatCrop: [69, 4, 230, 414], combatWidth: 24, combatHeight: 80, gripX: 0.12, gripY: 0.86, combatArtRotation: 2.45, damage: 84, reach: 34 },
  { id: 'crimsonShear', name: 'Crimson Shear', kind: 'melee', boss: 18, portrait: 'assets/player/weapons/crimson-shear.png', combat: 'assets/player/weapons/crimson-shear.png', combatCrop: [98, 4, 215, 414], combatWidth: 22, combatHeight: 80, gripX: 0.15, gripY: 0.80, combatArtRotation: 2.50, damage: 92, reach: 31 },
  { id: 'stormglassBow', name: 'Stormglass Bow', kind: 'bow', boss: 21, portrait: 'assets/player/weapons/stormglass-bow.png', combat: 'assets/player/weapons/stormglass-bow.png', verticalBowArt: true, bowArtRotation: -Math.PI / 2, bowGripX: 0.31, bowGripY: 0.42, projectileDamage: 108, projectileSpeed: 910, cooldown: 0.39 },
  { id: 'gravebloomMaul', name: 'Gravebloom Maul', kind: 'melee', boss: 23, portrait: 'assets/player/weapons/gravebloom-maul-clean-v2.png', combat: 'assets/player/weapons/gravebloom-maul-clean-v2.png', combatCrop: [200, 20, 783, 1191], combatWidth: 53, combatHeight: 80, gripX: 0.28, gripY: 0.72, combatArtRotation: 2.62, damage: 112, reach: 36 },
  { id: 'lunarGlaive', name: 'Lunar Crescent', kind: 'melee', boss: 24, portrait: 'assets/player/weapons/lunar-glaive.png', combat: 'assets/player/weapons/lunar-glaive.png', combatCrop: [90, 0, 216, 409], combatWidth: 22, combatHeight: 80, gripX: 0.18, gripY: 0.86, combatArtRotation: 2.77, damage: 122, reach: 40 },
  { id: 'hourglassStaff', name: 'Hourglass Scepter', kind: 'staff', boss: 25, portrait: 'assets/player/weapons/hourglass-staff.png', combat: 'assets/player/weapons/hourglass-staff.png', projectileDamage: 190, projectileSpeed: 650, cooldown: 0.46, splashRadius: 96 },
  { id: 'eternityGreatsword', name: 'Eternity Greatsword', kind: 'melee', boss: 26, portrait: 'assets/player/weapons/eternity-greatsword.png', combat: 'assets/player/weapons/eternity-greatsword.png', combatCrop: [70, 0, 244, 408], combatWidth: 26, combatHeight: 82, gripX: 0.82, gripY: 0.08, combatArtRotation: -0.63, damage: 145, reach: 46 },
];

const starterWeapon = {
  id: 'starterBlade',
  name: 'Starter Blade',
  kind: 'melee',
  boss: 0,
  combatCrop: [318, 54, 387, 1420],
  combatWidth: 18,
  combatHeight: 80,
  gripX: 0.5,
  gripY: 0.16,
  damage: 0,
  reach: 0,
};

const protectorStyles = [
  { id: 'guardian', name: 'Guardian Protector', boss: 0, preview: 'assets/protectors/guardian-wolf.png', description: 'Summons one loyal Guardian with the player\'s maximum health.' },
  { id: 'romanLegion', name: 'Roman Legion', boss: 20, preview: 'assets/protectors/roman-legion.png', description: 'Legionaries merge into shield-wall ranks of up to ten, hold formation while jabbing, and block 45% damage before armour. Costs 15 shards.' },
  { id: 'romanSpearCohort', name: 'Roman Spear Cohort', boss: 23, preview: 'assets/protectors/roman-spear-clean.png', description: 'Four spear Legionaries with Roman health, damage, armour, and shield block, but twice the attack reach. Costs 18 shards.' },
  { id: 'romanArcherCohort', name: 'Roman Legion with Bowman', boss: 25, preview: 'assets/protectors/roman bow.png', description: 'Four sword Legionaries plus one rear-line bowman whose arrows deal half the damage of the player\'s equipped bow. Costs 21 shards.' },
];

let unlockedArmor = new Set(['wayfarer']);
let equippedArmorId = 'wayfarer';
let unlockedWeapons = new Set();
let unlockedProtectors = new Set(['guardian']);
let equippedProtectorId = 'guardian';
let equippedMeleeWeaponId = 'starterBlade';
let equippedRangedWeaponId = null;
let activeWeaponKind = 'melee';
let pantheonPreviousLoadout = null;
let unseenGear = new Set();
let selectedGender = 'male';
let pendingGearChoice = null;
let movementControlMode = 'wasd';
let armorDurability = {};
const ARMOR_DURABILITY_BALANCE_VERSION = 'v2';
let persistentArmorShards = 0;
const arenaLegacyStorageKey = 'endlessDungeonArenaLegacy';
let arenaLegacy = { milestones: [], potions: 0, veteranSupplies: false, bestWave: 0 };
const accountSpecialLootStorageKey = 'endlessDungeonAccountSpecialLoot';
let accountSpecialLoot = { armorShards: 0, luckyCoins: 0, arenaKeys: 0, arenaPotions: 0, fieldMedicPotions: 0 };
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
  const savedProtectors = JSON.parse(window.localStorage.getItem('endlessDungeonProtectors') || '[]');
  unlockedProtectors = new Set(['guardian', ...savedProtectors]);
  if (unlockedArmor.has('royalArmor')) unlockedProtectors.add('romanLegion');
  if (unlockedArmor.has('emeraldAegis')) unlockedProtectors.add('romanSpearCohort');
  if (unlockedArmor.has('worldforged')) unlockedProtectors.add('romanArcherCohort');
  const savedProtector = window.localStorage.getItem('endlessDungeonEquippedProtector');
  if (savedProtector && unlockedProtectors.has(savedProtector)) equippedProtectorId = savedProtector;
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
  armorDurability = JSON.parse(window.localStorage.getItem('endlessDungeonArmorDurability') || '{}');
  if (!armorDurability || typeof armorDurability !== 'object' || Array.isArray(armorDurability)) armorDurability = {};
  if (window.localStorage.getItem('endlessDungeonArmorDurabilityBalance') !== ARMOR_DURABILITY_BALANCE_VERSION) {
    // The original durability values were far too small. Fully restore existing
    // sets once so previously accumulated wear does not carry into the rebalance.
    for (const armor of armorSets) {
      if (armor.boss !== 0 && Object.hasOwn(armorDurability, armor.id)) {
        armorDurability[armor.id] = getArmorMaxDurability(armor);
      }
    }
    window.localStorage.setItem('endlessDungeonArmorDurabilityBalance', ARMOR_DURABILITY_BALANCE_VERSION);
    window.localStorage.setItem('endlessDungeonArmorDurability', JSON.stringify(armorDurability));
  }
  persistentArmorShards = Math.max(0, Math.floor(Number(window.localStorage.getItem('endlessDungeonArmorShards')) || 0));
  const savedArenaLegacy = JSON.parse(window.localStorage.getItem(arenaLegacyStorageKey) || '{}');
  arenaLegacy = {
    milestones: Array.isArray(savedArenaLegacy.milestones) ? savedArenaLegacy.milestones.map(Number) : [],
    potions: Math.max(0, Math.floor(Number(savedArenaLegacy.potions) || 0)),
    veteranSupplies: Boolean(savedArenaLegacy.veteranSupplies),
    bestWave: Math.max(0, Math.floor(Number(savedArenaLegacy.bestWave) || 0)),
  };
  if (arenaLegacy.milestones.includes(30)) unlockedArmor.add('arenaConqueror');
  const savedAccountLoot = JSON.parse(window.localStorage.getItem(accountSpecialLootStorageKey) || 'null');
  if (savedAccountLoot && typeof savedAccountLoot === 'object') {
    accountSpecialLoot = {
      armorShards: Math.max(0, Math.floor(Number(savedAccountLoot.armorShards) || 0)),
      luckyCoins: Math.max(0, Math.floor(Number(savedAccountLoot.luckyCoins) || 0)),
      arenaKeys: Math.max(0, Math.floor(Number(savedAccountLoot.arenaKeys) || 0)),
      arenaPotions: Math.max(0, Math.floor(Number(savedAccountLoot.arenaPotions) || 0)),
      fieldMedicPotions: Math.max(0, Math.floor(Number(savedAccountLoot.fieldMedicPotions) || 0)),
    };
  } else {
    // One-time migration: combine keys previously separated by hero name and
    // retain the already-global armour shards and Arena Elixirs.
    const legacyKeyProfiles = JSON.parse(window.localStorage.getItem('endlessDungeonArenaKeyProfiles') || '{}');
    const migratedKeys = legacyKeyProfiles && typeof legacyKeyProfiles === 'object'
      ? Object.values(legacyKeyProfiles).reduce((total, record) => (
        total + Math.max(0, Math.floor(Number(record?.keys) || 0))
      ), 0)
      : 0;
    accountSpecialLoot = {
      armorShards: persistentArmorShards,
      luckyCoins: 0,
      arenaKeys: migratedKeys,
      arenaPotions: arenaLegacy.potions,
      fieldMedicPotions: 0,
    };
    window.localStorage.setItem(accountSpecialLootStorageKey, JSON.stringify(accountSpecialLoot));
  }
  persistentArmorShards = accountSpecialLoot.armorShards;
  arenaLegacy.potions = accountSpecialLoot.arenaPotions;
  if (window.localStorage.getItem('endlessDungeonWeaponMilestones') !== 'v2') {
    unlockedWeapons.delete('broadSword');
    unlockedWeapons.delete('diamondSword');
    equippedMeleeWeaponId = 'starterBlade';
    activeWeaponKind = 'melee';
    window.localStorage.setItem('endlessDungeonWeaponMilestones', 'v2');
    window.localStorage.setItem('endlessDungeonWeapons', JSON.stringify([...unlockedWeapons]));
    window.localStorage.setItem('endlessDungeonProtectors', JSON.stringify([...unlockedProtectors]));
    window.localStorage.setItem('endlessDungeonEquippedProtector', equippedProtectorId);
    window.localStorage.setItem('endlessDungeonEquippedWeapon', equippedMeleeWeaponId);
  }
} catch (error) {
  unlockedArmor = new Set(['wayfarer']);
}

function saveArenaLegacy() {
  try {
    window.localStorage.setItem(arenaLegacyStorageKey, JSON.stringify(arenaLegacy));
  } catch (error) {
    // Arena rewards still remain available for the current browser session.
  }
}

function saveAccountSpecialLoot() {
  accountSpecialLoot.armorShards = Math.max(0, Math.floor(persistentArmorShards));
  accountSpecialLoot.arenaPotions = Math.max(0, Math.floor(arenaLegacy.potions));
  try {
    window.localStorage.setItem(accountSpecialLootStorageKey, JSON.stringify(accountSpecialLoot));
  } catch (error) {
    // Account loot remains available for this browser session.
  }
}

// Resolves the currently equipped armour, falling back to the starter set.
function getEquippedArmor() {
  return armorSets.find((armor) => armor.id === equippedArmorId) || armorSets[0];
}

function getArmorRepairBoss(armor) {
  return armor.trialOnly ? armor.trialTier || 0 : armor.boss;
}

function getArmorMaxDurability(armor) {
  if (armor.boss === 0) return Infinity;
  const sourceBoss = Math.max(1, getArmorRepairBoss(armor));
  // Later armor gains sharply more staying power, rather than merely a small
  // flat increase. Early sets last about twenty times longer than before in
  // normal combat, while the strongest sets can last several times longer again.
  return Math.round(600 + sourceBoss * sourceBoss * 2.5 + armor.defense * 12);
}

function getArmorShardRepairCost(armor) {
  const sourceBoss = Math.max(0, getArmorRepairBoss(armor));
  return clamp(1 + Math.floor(sourceBoss / 10), 1, 4);
}

function getArmorDurability(armor) {
  const maximum = getArmorMaxDurability(armor);
  if (!Number.isFinite(maximum)) return maximum;
  const saved = Number(armorDurability[armor.id]);
  if (!Number.isFinite(saved)) {
    armorDurability[armor.id] = maximum;
    return maximum;
  }
  return clamp(saved, 0, maximum);
}

function getArmorDurabilityRatio(armor) {
  const maximum = getArmorMaxDurability(armor);
  return Number.isFinite(maximum) ? getArmorDurability(armor) / maximum : 1;
}

function isArmorBroken(armor) {
  return getArmorDurabilityRatio(armor) <= 0;
}

function wearEquippedArmor(damageTaken) {
  const armor = getEquippedArmor();
  if (armor.boss === 0 || damageTaken <= 0 || isArmorBroken(armor)) return;
  const maximum = getArmorMaxDurability(armor);
  const previous = getArmorDurability(armor);
  const sourceBoss = Math.max(1, getArmorRepairBoss(armor));
  const strongArmorWearMultiplier = clamp(1 - sourceBoss * 0.018, 0.45, 0.98);
  const wear = Math.min(4, Math.max(0.12, damageTaken * 0.08)) * strongArmorWearMultiplier;
  armorDurability[armor.id] = clamp(previous - wear, 0, maximum);
  const previousRatio = previous / maximum;
  const currentRatio = armorDurability[armor.id] / maximum;
  if (previous > 0 && armorDurability[armor.id] === 0) {
    applyEquippedArmor(false);
    setMessage(`${armor.name} broke! Defeat Boss ${getArmorRepairBoss(armor)} to reforge it.`, true);
  } else if (previousRatio > 0.2 && currentRatio <= 0.2) {
    setMessage(`${armor.name} durability is critical (${Math.ceil(currentRatio * 100)}%).`, true);
  } else if (previousRatio > 0.5 && currentRatio <= 0.5) {
    setMessage(`${armor.name} is visibly worn (${Math.ceil(currentRatio * 100)}%).`);
  }
  saveArmorCollection();
}

// Mirrors each hero from the direction in which that armor was originally
// painted. Front-facing sets remain fixed while directional sets mirror.
function getHeroFacingScale(facingX) {
  const nativeFacing = getEquippedArmor().nativeFacing || 'left';
  if (nativeFacing === 'front') return 1;
  if (nativeFacing === 'right') return facingX < 0 ? -1 : 1;
  return facingX < 0 ? 1 : -1;
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
    window.localStorage.setItem('endlessDungeonProtectors', JSON.stringify([...unlockedProtectors]));
    window.localStorage.setItem('endlessDungeonEquippedProtector', equippedProtectorId);
    window.localStorage.setItem('endlessDungeonEquippedMeleeWeapon', equippedMeleeWeaponId);
    if (equippedRangedWeaponId) {
      window.localStorage.setItem('endlessDungeonEquippedRangedWeapon', equippedRangedWeaponId);
    }
    window.localStorage.setItem('endlessDungeonActiveWeaponKind', activeWeaponKind);
    window.localStorage.setItem('endlessDungeonEquippedWeapon', getEquippedWeapon().id);
    window.localStorage.setItem('endlessDungeonUnseenGear', JSON.stringify([...unseenGear]));
    window.localStorage.setItem('endlessDungeonArmorDurability', JSON.stringify(armorDurability));
    window.localStorage.setItem('endlessDungeonArmorShards', String(persistentArmorShards));
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

// Extracts one sprite-sheet frame for Armory previews. Irregular crops and
// shaped clips keep leaning weapons from leaking into neighboring previews.
function getWeaponPreviewSource(weapon) {
  if (!weapon.sheet) return weapon.portrait;
  const sheet = art[weapon.sheet];
  if (!sheet?.complete || sheet.naturalWidth === 0) {
    const label = weapon.kind === 'staff' ? 'STAFF ART PENDING' : 'BOW ART LOADING';
    return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="256"><rect width="100%" height="100%" fill="#120d1f"/><text x="50%" y="50%" fill="#c4b5fd" font-family="monospace" font-size="28" text-anchor="middle">${label}</text></svg>`)}`;
  }
  const preview = document.createElement('canvas');
  const horizontal = weapon.sheetDirection === 'horizontal';
  const defaultFrameWidth = horizontal ? sheet.naturalWidth / weapon.sheetFrames : sheet.naturalWidth;
  const defaultFrameHeight = horizontal ? sheet.naturalHeight : sheet.naturalHeight / weapon.sheetFrames;
  const [sourceX, sourceY, frameWidth, frameHeight] = weapon.previewCrop || [
    horizontal ? defaultFrameWidth * weapon.sheetFrame : 0,
    horizontal ? 0 : defaultFrameHeight * weapon.sheetFrame,
    defaultFrameWidth,
    defaultFrameHeight,
  ];
  preview.width = Math.ceil(frameWidth);
  preview.height = Math.ceil(frameHeight);
  const previewContext = preview.getContext('2d');
  if (weapon.previewClip) {
    previewContext.beginPath();
    weapon.previewClip.forEach(([x, y], index) => {
      if (index === 0) previewContext.moveTo(x, y);
      else previewContext.lineTo(x, y);
    });
    previewContext.closePath();
    previewContext.clip();
  }
  previewContext.drawImage(
    sheet,
    sourceX,
    sourceY,
    frameWidth,
    frameHeight,
    0,
    0,
    preview.width,
    preview.height,
  );
  return preview.toDataURL('image/png');
}

// Returns the full-quality Armory portrait made for each Protector style.
function getProtectorPreviewSource(protector) {
  return protector.preview;
}

// Opens a comparison card before the player equips a selected item.
function showGearPreview(type, gear, image) {
  pendingGearChoice = { type, gear };
  gearPreviewType.textContent = type === 'armor'
    ? 'Armor Selection'
    : type === 'protector' ? 'Protector Selection' : 'Weapon Selection';
  gearPreviewImage.src = image;
  gearPreviewImage.alt = gear.name;
  gearPreviewName.textContent = gear.name;
  gearPreviewUnlock.textContent = gear.arenaOnly
    ? 'Exclusive permanent reward for clearing Arena Wave 30.'
    : gear.battlegroundWave
    ? `Permanent reward for reaching Battleground Wave ${gear.battlegroundWave}.`
    : gear.trialOnly
    ? gear.trialTier
      ? `Permanently forged by defeating Boss ${gear.trialTier} in an empowered Arena Key Trial.`
      : 'Exclusive reward from an empowered Arena Key Trial. Its permanent stats depend on the chosen boss.'
    : gear.boss === 0
    ? 'The equipment your journey began with.'
    : `Reward for defeating Boss ${gear.boss}.`;
  const armorMaximum = type === 'armor' ? getArmorMaxDurability(gear) : 0;
  const armorCurrent = type === 'armor' ? getArmorDurability(gear) : 0;
  const armorRatio = type === 'armor' ? getArmorDurabilityRatio(gear) : 1;
  const durabilityLabel = !Number.isFinite(armorMaximum)
    ? gear.arenaOnly ? 'Unbreakable Arena reward' : gear.battlegroundWave ? 'Unbreakable Battleground reward' : 'Unbreakable starter armour'
    : armorRatio <= 0
      ? `BROKEN - defeat Boss ${getArmorRepairBoss(gear)} to reforge`
      : `${Math.ceil(armorCurrent)} / ${armorMaximum} (${Math.ceil(armorRatio * 100)}%)`;
  gearPreviewStats.innerHTML = type === 'protector'
    ? `<strong>${gear.description}</strong><strong>Each summoned soldier has the player’s maximum health.</strong>`
    : type === 'armor'
    ? `<strong>Durability: ${durabilityLabel}</strong><strong>Damage reduction: ${gear.defense}%</strong><strong>Thorns reflection: ${gear.thorns}%</strong><strong>Maximum health: +${gear.health}</strong><strong>Maximum stamina: +${gear.stamina}</strong>`
    : gear.kind === 'melee' && gear.trialOnly && !gear.trialTier
      ? '<strong>Damage and reach will be forged from the boss defeated in the Arena Key Trial.</strong>'
    : gear.kind === 'melee'
      ? `<strong>Attack damage: +${gear.damage}%</strong><strong>Attack reach: +${gear.reach}</strong>${gear.meleeCooldown ? `<strong>Fast attack rate: ${(1 / gear.meleeCooldown).toFixed(1)} per second</strong>` : ''}${gear.championBossDamage ? `<strong>Champion and boss damage: +${Math.round((gear.championBossDamage - 1) * 100)}%</strong>` : ''}${gear.id === 'eternalConquerorSpatha' ? '<strong>Wave 100 mastery: equip with Eternal Conqueror Plate for +25% damage and +5% defense.</strong>' : ''}`
      : `<strong>Projectile damage: ${gear.projectileDamage}</strong><strong>Attack rate: ${(1 / gear.cooldown).toFixed(1)} per second</strong>${gear.splashRadius ? `<strong>Blast radius: ${gear.splashRadius}</strong>` : ''}`;
  applyGearButton.disabled = type === 'armor' && isArmorBroken(gear);
  applyGearButton.textContent = type === 'armor' && isArmorBroken(gear) ? 'Broken' : 'Apply';
  repairArmorButton.classList.toggle('hidden', type !== 'armor' || !Number.isFinite(armorMaximum));
  const repairCost = type === 'armor' ? getArmorShardRepairCost(gear) : 1;
  repairArmorButton.disabled = type !== 'armor' || armorRatio <= 0 || armorRatio >= 1 || persistentArmorShards < repairCost;
  repairArmorButton.textContent = armorRatio <= 0
    ? 'Defeat its boss to reforge'
    : `Repair 20% - costs ${repairCost} shard${repairCost === 1 ? '' : 's'} (${persistentArmorShards} owned)`;
  gearPreview.classList.remove('hidden');
}

function repairPendingArmorWithShard() {
  if (pendingGearChoice?.type !== 'armor') return;
  const armor = pendingGearChoice.gear;
  const repairCost = getArmorShardRepairCost(armor);
  if (persistentArmorShards < repairCost) return;
  const maximum = getArmorMaxDurability(armor);
  const current = getArmorDurability(armor);
  if (!Number.isFinite(maximum) || current <= 0 || current >= maximum) return;
  persistentArmorShards -= repairCost;
  accountSpecialLoot.armorShards = persistentArmorShards;
  player.inventory.armorShard = persistentArmorShards;
  armorDurability[armor.id] = Math.min(maximum, current + maximum * 0.2);
  saveArmorCollection();
  saveAccountSpecialLoot();
  renderArmory();
  showGearPreview('armor', armor, selectedGender === 'female' ? armor.femalePortrait : armor.portrait);
  setMessage(`${armor.name} restored to ${Math.ceil(getArmorDurabilityRatio(armor) * 100)}% durability.`);
}

// Equips the item currently displayed in the comparison card.
function applyPendingGearChoice() {
  if (!pendingGearChoice) return;
  const { type, gear } = pendingGearChoice;
  if (type === 'armor') {
    if (isArmorBroken(gear)) {
      setMessage(`Defeat Boss ${getArmorRepairBoss(gear)} to reforge ${gear.name}.`);
      return;
    }
    equippedArmorId = gear.id;
    applyEquippedArmor(false);
  } else if (type === 'protector') {
    equippedProtectorId = gear.id;
    unseenGear.delete(`protector:${gear.id}`);
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
  armoryShardCount.textContent = String(persistentArmorShards);
  armorGrid.replaceChildren();
  for (const armor of armorSets) {
    const unlocked = unlockedArmor.has(armor.id);
    const armorPortrait = selectedGender === 'female' ? armor.femalePortrait : armor.portrait;
    const durabilityRatio = unlocked ? getArmorDurabilityRatio(armor) : 1;
    const broken = unlocked && durabilityRatio <= 0;
    const durabilityText = Number.isFinite(getArmorMaxDurability(armor))
      ? `${Math.ceil(durabilityRatio * 100)}% durability`
      : 'Unbreakable';
    const option = document.createElement('button');
    option.className = `armor-option${unlocked ? '' : ' locked'}${equippedArmorId === armor.id ? ' selected' : ''}${broken ? ' armor-broken' : durabilityRatio < 0.5 ? ' armor-worn' : ''}`;
    option.disabled = !unlocked;
    option.innerHTML = `
      ${unseenGear.has(`armor:${armor.id}`) ? '<em class="new-gear-label">NEW</em>' : ''}
      <img src="${armorPortrait}" alt="${armor.name}">
      <strong>${unlocked ? armor.name : armor.battlegroundWave ? `Reach Battleground Wave ${armor.battlegroundWave}` : armor.arenaOnly ? 'Clear Arena Wave 30' : armor.trialOnly ? 'Win an Arena Key Trial' : `Defeat Boss ${armor.boss}`}</strong>
      <span>Defense ${armor.defense}% · Thorns ${armor.thorns}% · Health +${armor.health} · Stamina +${armor.stamina}</span>
      ${unlocked ? `<span>${broken ? `BROKEN - defeat Boss ${getArmorRepairBoss(armor)}` : durabilityText}</span><div class="armor-durability"><i style="width:${durabilityRatio * 100}%"></i></div>` : ''}
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
      <strong>${unlocked ? weapon.name : weapon.battlegroundWave ? `Reach Battleground Wave ${weapon.battlegroundWave}` : weapon.trialOnly ? 'Win an Arena Key Trial' : `Defeat Boss ${weapon.boss}`}</strong>
      <span>${weapon.kind === 'melee' && weapon.trialOnly && !weapon.trialTier
        ? 'Damage and reach determined by the defeated trial boss'
        : weapon.kind === 'melee'
        ? `Damage +${weapon.damage}% · Reach +${weapon.reach}${weapon.meleeCooldown ? ` · ${(1 / weapon.meleeCooldown).toFixed(1)}/sec` : ''}${weapon.championBossDamage ? ` · +${Math.round((weapon.championBossDamage - 1) * 100)}% vs champions/bosses` : ''}`
        : `${weapon.kind === 'bow' ? 'Bow' : 'Magic staff'} · Damage ${weapon.projectileDamage} · ${(1 / weapon.cooldown).toFixed(1)}/sec`}</span>
    `;
    if (weapon.kind === 'melee' && weapon.boss > 0) {
      const weakness = document.createElement('small');
      weakness.textContent = `Boss ${weapon.boss} weakness: +50% damage`;
      option.appendChild(weakness);
    }
    if (unlocked) option.addEventListener('click', () => showGearPreview('weapon', weapon, weaponPreview));
    weaponGrid.appendChild(option);
  }
  protectorGrid.replaceChildren();
  for (const protector of protectorStyles) {
    const unlocked = unlockedProtectors.has(protector.id);
    const preview = getProtectorPreviewSource(protector);
    const option = document.createElement('button');
    option.className = `armor-option${unlocked ? '' : ' locked'}${equippedProtectorId === protector.id ? ' selected' : ''}`;
    option.disabled = !unlocked;
    option.innerHTML = `
      ${unseenGear.has(`protector:${protector.id}`) ? '<em class="new-gear-label">NEW</em>' : ''}
      <img src="${preview}" alt="${protector.name}">
      <strong>${unlocked ? protector.name : `Defeat Boss ${protector.boss}`}</strong>
      <span>${protector.description}</span>
    `;
    if (unlocked) option.addEventListener('click', () => showGearPreview('protector', protector, preview));
    protectorGrid.appendChild(option);
  }
}

// Applies armour stats and artwork, optionally restoring health and stamina.
function applyEquippedArmor(refill = true) {
  const armor = getEquippedArmor();
  const functioning = !isArmorBroken(armor);
  player.maxHealth = 100 + (functioning ? armor.health : 0);
  player.maxStamina = 100 + (functioning ? armor.stamina : 0);
  player.armorLevel = functioning ? 1 + armor.defense / 8 : 0;
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

function hasEternalConquerorMastery() {
  return Boolean(
    battlegroundLegacy?.eternalMastery
    && equippedArmorId === 'eternalConqueror'
    && equippedMeleeWeaponId === 'eternalConquerorSpatha'
  );
}

// Starts each run with a fresh gender choice and name while preserving armour.
function chooseGender(gender) {
  selectedGender = gender;
  currentHeroName = hasCustomHeroName ? customHeroName : generateHeroName();
  heroNameInput.value = currentHeroName;
  try {
    window.localStorage.setItem('endlessDungeonGender', selectedGender);
  } catch (error) {
    // The current session still retains the selection.
  }
  applyEquippedArmor(true);
  restorePersistentArenaKeys();
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
  arenaPotion: document.getElementById('arenaPotionValue'),
  ammo: document.getElementById('ammoValue'),
  enemy: document.getElementById('enemyValue'),
  crate: document.getElementById('crateValue'),
  protector: document.getElementById('protectorValue'),
  opener: document.getElementById('openerValue'),
  shield: document.getElementById('shieldValue'),
  luckyCoin: document.getElementById('luckyCoinValue'),
  arenaKey: document.getElementById('arenaKeyValue'),
  theme: document.getElementById('themeValue'),
};
const messageBox = document.getElementById('messageBox');
const lootHighlight = document.getElementById('lootHighlight');
const inventoryPanel = document.getElementById('inventoryPanel');
const closeInventoryButton = document.getElementById('closeInventoryButton');
const inventoryPotionValue = document.getElementById('inventoryPotionValue');
const inventoryMedicPotionValue = document.getElementById('inventoryMedicPotionValue');
const inventoryCoinValue = document.getElementById('inventoryCoinValue');
const inventoryShardValue = document.getElementById('inventoryShardValue');
const inventoryKeyValue = document.getElementById('inventoryKeyValue');
const pauseOverlay = document.getElementById('pauseOverlay');
const pauseWaveValue = document.getElementById('pauseWaveValue');
const pauseBossValue = document.getElementById('pauseBossValue');
const pauseRelicValue = document.getElementById('pauseRelicValue');
const pauseBonusList = document.getElementById('pauseBonusList');
const resumeGameButton = document.getElementById('resumeGameButton');
const quitGameButton = document.getElementById('quitGameButton');
const challengeOverlay = document.getElementById('challengeOverlay');
const arenaTrialOverlay = document.getElementById('arenaTrialOverlay');
const arenaTrialGrid = document.getElementById('arenaTrialGrid');
const closeArenaTrialButton = document.getElementById('closeArenaTrialButton');
const survivalArenaOverlay = document.getElementById('survivalArenaOverlay');
const survivalArenaTutorialOverlay = document.getElementById('survivalArenaTutorialOverlay');
const survivalArenaTutorialTitle = document.getElementById('survivalArenaTutorialTitle');
const survivalArenaTutorialIcon = document.getElementById('survivalArenaTutorialIcon');
const survivalArenaTutorialText = document.getElementById('survivalArenaTutorialText');
const survivalArenaTutorialProgress = document.getElementById('survivalArenaTutorialProgress');
const survivalArenaTutorialCounter = document.getElementById('survivalArenaTutorialCounter');
const startSurvivalArenaNowButton = document.getElementById('startSurvivalArenaNowButton');
const cancelSurvivalArenaTutorialButton = document.getElementById('cancelSurvivalArenaTutorialButton');
const survivalArenaEnemyGrid = document.getElementById('survivalArenaEnemyGrid');
const survivalArenaSelectionCount = document.getElementById('survivalArenaSelectionCount');
const openSurvivalArenaButton = document.getElementById('openSurvivalArenaButton');
const beginSurvivalArenaButton = document.getElementById('beginSurvivalArenaButton');
const closeSurvivalArenaButton = document.getElementById('closeSurvivalArenaButton');
const openBattlegroundButton = document.getElementById('openBattlegroundButton');
const battlegroundPanel = document.getElementById('battlegroundPanel');
const battlegroundThemeValue = document.getElementById('battlegroundThemeValue');
const battleShardValue = document.getElementById('battleShardValue');
const battlegroundStatus = document.getElementById('battlegroundStatus');
const battlegroundShopButtons = [...document.querySelectorAll('[data-battle-unit]')];
const exitBattlegroundButton = document.getElementById('exitBattlegroundButton');
const battleZoomOutButton = document.getElementById('battleZoomOutButton');
const battleZoomInButton = document.getElementById('battleZoomInButton');
const battleZoomValue = document.getElementById('battleZoomValue');
let survivalArenaTutorialTimer = null;
let survivalArenaTutorialStartedAt = 0;
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
    'Aldric the Lionhearted',
    'Arden the Unafraid',
    'Baldwin the Bastion',
    'Brennan the Battleborn',
    'Caius the Courageous',
    'Darian the Dauntless',
    'Emeric the Ever-Vigilant',
    'Evander the Dragonsworn',
    'Garrick the Fearless',
    'Hadrian the Iron-Willed',
    'Ivor the Oathkeeper',
    'Kaelen the Resolute',
    'Leoric the Lionguard',
    'Magnus the Unbowed',
    'Osric the Stalwart',
    'Roderic the Righteous',
    'Theron the Undaunted',
    'Valen the Vanguard',
    'Wulfric the Wall',
    'Zephyr the Storm-Blessed',
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
    'Adelaide the Lionhearted',
    'Aeliana the Unafraid',
    'Brielle the Boldhearted',
    'Cassia the Courageous',
    'Elara the Ever-Vigilant',
    'Eowyn the Unbowed',
    'Fiora the Flame-Bearer',
    'Helena the Steadfast',
    'Isolde the Iron-Willed',
    'Kaida the Dragonsworn',
    'Leona the Lionguard',
    'Maeve the Dauntless',
    'Octavia the Oathkeeper',
    'Rhiannon the Resolute',
    'Rowena the Righteous',
    'Sabine the Stalwart',
    'Seraphina the Shield-Bearer',
    'Thalia the Undaunted',
    'Valeria the Vanguard',
    'Ysabel the Fearless',
  ],
};
const highScoresStorageKey = 'endlessDungeonHighScores';
const customHeroNameStorageKey = 'endlessDungeonCustomHeroName';
const arenaKeyProfilesStorageKey = 'endlessDungeonArenaKeyProfiles';
const trialArmorStatsStorageKey = 'endlessDungeonTrialArmorStats';
const trialWeaponStatsStorageKey = 'endlessDungeonTrialWeaponStats';
const leaderboardLimit = 10;
let highScores = [];
let currentHeroName = '';
let customHeroName = '';
let hasCustomHeroName = false;
let latestRunId = null;

function getHeroStorageId(name = currentHeroName) {
  return cleanHeroName(name).toLocaleLowerCase();
}

function loadArenaKeyProfiles() {
  try {
    const profiles = JSON.parse(window.localStorage.getItem(arenaKeyProfilesStorageKey) || '{}');
    return profiles && typeof profiles === 'object' && !Array.isArray(profiles) ? profiles : {};
  } catch (error) {
    return {};
  }
}

function savePersistentArenaKeys() {
  const keyCount = Math.max(0, Math.floor(player.inventory.arenaKey || 0));
  accountSpecialLoot.arenaKeys = keyCount;
  saveAccountSpecialLoot();
  // Every Hall entry now reports the same account-wide unused-key total.
  let hallChanged = false;
  highScores.forEach((entry) => {
    if (entry.unusedKeys === keyCount) return;
    entry.unusedKeys = keyCount;
    hallChanged = true;
  });
  if (hallChanged) saveLeaderboard();
}

function restorePersistentArenaKeys() {
  if (!player?.inventory) return;
  player.inventory.arenaKey = Math.max(0, Math.floor(accountSpecialLoot.arenaKeys || 0));
}

function applySavedTrialArmorStats() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(trialArmorStatsStorageKey) || 'null');
    const armor = armorSets.find((set) => set.id === 'trialforged');
    if (!armor || !saved || !Number.isFinite(Number(saved.tier))) return;
    armor.defense = Math.max(0, Number(saved.defense) || armor.defense);
    armor.health = Math.max(0, Number(saved.health) || armor.health);
    armor.stamina = Math.max(0, Number(saved.stamina) || armor.stamina);
    armor.thorns = Math.max(0, Number(saved.thorns) || armor.thorns);
    armor.trialTier = Math.max(1, Math.floor(Number(saved.tier)));
  } catch (error) {
    // The default Trialforged statistics remain usable.
  }
}
applySavedTrialArmorStats();

function applySavedTrialWeaponStats() {
  try {
    const weapon = weaponSets.find((set) => set.id === 'trialbreaker');
    if (!weapon) return;
    const saved = JSON.parse(window.localStorage.getItem(trialWeaponStatsStorageKey) || 'null');
    if (saved && Number.isFinite(Number(saved.tier))) {
      Object.assign(weapon, getTrialWeaponStats(Math.max(1, Math.floor(Number(saved.tier)))));
      return;
    }
    // Migrate a sword earned before its forging stats became boss-dependent.
    const armor = armorSets.find((set) => set.id === 'trialforged');
    if (unlockedWeapons.has('trialbreaker') && armor?.trialTier) {
      const forgedStats = getTrialWeaponStats(armor.trialTier);
      Object.assign(weapon, forgedStats);
      window.localStorage.setItem(trialWeaponStatsStorageKey, JSON.stringify(forgedStats));
    }
  } catch (error) {
    // An unforged Trialbreaker keeps its statistics concealed.
  }
}
applySavedTrialWeaponStats();

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

// Remembers player-written names without freezing randomly suggested names.
function persistCustomHeroName() {
  try {
    if (hasCustomHeroName && customHeroName) {
      window.localStorage.setItem(customHeroNameStorageKey, customHeroName);
    } else {
      window.localStorage.removeItem(customHeroNameStorageKey);
    }
  } catch (error) {
    // The custom name still persists for the current browser session.
  }
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
    customHeroName = cleanHeroName(window.localStorage.getItem(customHeroNameStorageKey));
    hasCustomHeroName = Boolean(customHeroName);
    if (hasCustomHeroName) currentHeroName = customHeroName;
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
          unusedKeys: Math.max(0, Math.floor(Number(entry.unusedKeys) || 0)),
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
    const keyRecord = entry.unusedKeys > 0
      ? ` · ${entry.unusedKeys} unused Arena Key${entry.unusedKeys === 1 ? '' : 's'} — reuse this name to retrieve`
      : '';
    details.textContent = `Wave ${entry.wave} · ${entry.bosses} boss${entry.bosses === 1 ? '' : 'es'}${keyRecord} · ${date}`;
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
  savePersistentArenaKeys();
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: currentHeroName,
    score: Math.max(0, Math.floor(Number(score) || 0)),
    wave: Math.max(1, Math.floor(Number(wave) || 1)),
    bosses: Math.max(0, Math.floor(Number(bosses) || 0)),
    unusedKeys: Math.max(0, Math.floor(player.inventory.arenaKey || 0)),
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

// Commits a custom name or replaces an empty value with a fresh suggestion.
function saveHeroName() {
  const editedName = cleanHeroName(heroNameInput.value);
  if (editedName) {
    currentHeroName = editedName;
    if (hasCustomHeroName) customHeroName = editedName;
  } else {
    hasCustomHeroName = false;
    customHeroName = '';
    currentHeroName = generateHeroName();
  }
  heroNameInput.value = currentHeroName;
  persistCustomHeroName();
  restorePersistentArenaKeys();
  saveLeaderboard();
}

const wallThickness = 20;
const doorWidth = 96;
let lastTime = 0;
const keys = new Set();
let godModeAPresses = [];
// Keep the title screen still for a full minute before showing the idle reel.
// Any keyboard, pointer, touch, or wheel input restarts this entire delay.
const ATTRACT_IDLE_DELAY = 60000;
const ATTRACT_DURATION = 39;
let menuLastActivity = performance.now();
const attractMode = {
  active: false,
  elapsed: 0,
  overlayWasHidden: null,
};

function resetAttractIdleTimer() {
  menuLastActivity = performance.now();
}

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
  riftHound: new Image(),
  chainHexer: new Image(),
  bellmawJuggernaut: new Image(),
  boneShieldbearer: new Image(),
  skell1: new Image(),
  skell2: new Image(),
  skell3: new Image(),
  skell4: new Image(),
  skell5: new Image(),
  skell6: new Image(),
  skell7: new Image(),
  skell8: new Image(),
  skell9: new Image(),
  skell10: new Image(),
  frostDirewolf: new Image(),
  cinderImp1: new Image(),
  cinderImp2: new Image(),
  amethystColossus: new Image(),
  abyssJellyNew: new Image(),
  forgottenShrine: new Image(),
  abandonedCamp: new Image(),
  rescuedScout: new Image(),
  travelingMerchant: new Image(),
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
  oceanHippoWalk: new Image(),
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
  clockworkArchon: new Image(),
  clockworkSeraph: new Image(),
  seraphHalberdSeparated: new Image(),
  seraphPortalSeparated: new Image(),
  seraphFeatherSeparated: new Image(),
  seraphClockfallSeparated: new Image(),
  clockworkOrb: new Image(),
  gravebloomColossus: new Image(),
  lunarKitsune: new Image(),
  lunarCrescentSeparated: new Image(),
  lunarOrbSeparated: new Image(),
  lunarFoxfireSeparated: new Image(),
  lunarMoonfallSeparated: new Image(),
  eternityWarden: new Image(),
  octopusBoss: new Image(),
  octopusMinion: new Image(),
  octopusAttackSheet: new Image(),
  stormglassAttack1: new Image(), stormglassAttack2: new Image(), stormglassAttack3: new Image(),
  gravebloomAttack1: new Image(), gravebloomAttack2: new Image(), gravebloomAttack3: new Image(),
  lunarAttack1: new Image(), lunarAttack2: new Image(), lunarAttack3: new Image(),
  eternityAttack1: new Image(), eternityAttack2: new Image(), eternityAttack3: new Image(),
  stormglassArena: new Image(),
  clockworkArchonArena: new Image(),
  clockworkSeraphArena: new Image(),
  darkMagicArena: new Image(),
  astralrootArena: new Image(),
  mysticalArena: new Image(),
  gravebloomArena: new Image(),
  lunarKitsuneArena: new Image(),
  eternityWardenArena: new Image(),
  octopusArena: new Image(),
  hollowStarBoss: new Image(),
  hollowStarRoundhouseSeparated: new Image(),
  hollowStarGroundSlamSeparated: new Image(),
  hollowStarOrbVortexSeparated: new Image(),
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
  lateBossProjectiles: new Image(),
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
  astralrootSpriggan: new Image(),
  leyshardWisp: new Image(),
  starbranchStag: new Image(),
  prismhideBeast: new Image(),
  astralrootRoom: new Image(),
  veilbornShade: new Image(),
  eclipseShrike: new Image(),
  singularityEye: new Image(),
  nightcoilDrake: new Image(),
  duskweaver: new Image(),
  voidPanther: new Image(),
  eclipseReaper: new Image(),
  gloomfinSerpent: new Image(),
  starlessCourser: new Image(),
  eclipseSpider: new Image(),
  umbralRoom: new Image(),
  ghost1: new Image(),
  ghost2: new Image(),
  ghost3: new Image(),
  ghost4: new Image(),
  ghost5: new Image(),
  hauntedRoom: new Image(),
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
  romanLegionary: new Image(),
  romanSpearLegionary: new Image(),
  romanBowman: new Image(),
  romanBowmanReady: new Image(),
  romanArrow: new Image(),
  arrowVerdant: new Image(),
  arrowFrost: new Image(),
  arrowCinder: new Image(),
  arrowVoid: new Image(),
  romanHorse1: new Image(),
  romanHorse2: new Image(),
  romanHorseAttack: new Image(),
  romanOxen: new Image(),
  romanTenLegion: new Image(),
  romanElephant: new Image(),
  romanDog: new Image(),
  battleground: new Image(),
  roman1Guard: new Image(), roman1Half: new Image(), roman1Thrust: new Image(),
  roman2Guard: new Image(), roman2Half: new Image(), roman2Thrust: new Image(),
  roman3Guard: new Image(), roman3Half: new Image(), roman3Thrust: new Image(),
  roman4Guard: new Image(), roman4Half: new Image(), roman4Thrust: new Image(),
  opener: new Image(),
  survivalArena: new Image(),
  arenaBarricade: new Image(),
  arenaPillar: new Image(),
  arenaSpikeRack: new Image(),
};
const romanSwordWalkFrames = Array.from({ length: 42 }, () => new Image());
// The authored sheet snakes across its rows: the middle row continues from
// right to left. Keeping this playback map avoids a reset after frame seven.
const romanSwordWalkSheetOrder = [0, 1, 2, 3, 4, 5, 6, 13, 12, 11, 10, 9, 8, 7, 14, 15, 16, 17, 18, 19, 20];
const romanSwordWalkOrder = [...romanSwordWalkSheetOrder, ...romanSwordWalkSheetOrder.map((index) => index + 21)];
const elephantWalkFrames = Array.from({ length: 20 }, () => new Image());
const oxenWalkFrames = Array.from({ length: 45 }, () => new Image());
const horseWalkFrames = Array.from({ length: 30 }, () => new Image());
const bowWalkFrames = Array.from({ length: 45 }, () => new Image());
const dogWalkFrames = Array.from({ length: 30 }, () => new Image());
const blueBattleFrameCounts = { blueElephant: 20, blueBow: 40, blueDog: 30, blueSword: 28, blueOxen: 25, blueHorse: 20 };
const blueBattleFrames = Object.fromEntries(Object.entries(blueBattleFrameCounts).map(([type, count]) => [type, Array.from({ length: count }, () => new Image())]));

function getBlueBattleFrame(type, walkPhase = 0) {
  const frames = blueBattleFrames[type];
  if (!frames?.length) return null;
  const wrappedPhase = ((walkPhase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  return frames[Math.floor(wrappedPhase / (Math.PI * 2) * frames.length)];
}

function getBlueBattleEntityFrame(entity) {
  const frames = blueBattleFrames[entity.type];
  if (!frames?.length) return null;
  if (entity.type === 'blueSword' && entity.attackTimer > 0) {
    const progress = clamp(1 - entity.attackTimer / 0.34, 0, 0.999);
    const attackStart = entity.attackStyle === 'jab' ? 14 : 7;
    return frames[attackStart + Math.floor(progress * 7)];
  }
  return getBlueBattleFrame(entity.type, entity.walkPhase || 0);
}

function getRomanSwordWalkFrame(walkPhase = 0) {
  const wrappedPhase = ((walkPhase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const playbackIndex = Math.floor(wrappedPhase / (Math.PI * 2) * romanSwordWalkOrder.length);
  return romanSwordWalkFrames[romanSwordWalkOrder[playbackIndex]];
}

function getElephantWalkFrameIndex(walkPhase = 0) {
  const wrappedPhase = ((walkPhase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  return Math.floor(wrappedPhase / (Math.PI * 2) * elephantWalkFrames.length);
}

function getElephantWalkFrame(walkPhase = 0) {
  return elephantWalkFrames[getElephantWalkFrameIndex(walkPhase)];
}

function getOxenWalkFrameIndex(walkPhase = 0) {
  const wrappedPhase = ((walkPhase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  return Math.floor(wrappedPhase / (Math.PI * 2) * oxenWalkFrames.length);
}

function getOxenWalkFrame(walkPhase = 0) {
  return oxenWalkFrames[getOxenWalkFrameIndex(walkPhase)];
}

function getHorseWalkFrame(walkPhase = 0) {
  const wrappedPhase = ((walkPhase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  return horseWalkFrames[Math.floor(wrappedPhase / (Math.PI * 2) * horseWalkFrames.length)];
}

function getBowWalkFrameIndex(walkPhase = 0) {
  const wrappedPhase = ((walkPhase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  return Math.floor(wrappedPhase / (Math.PI * 2) * bowWalkFrames.length);
}

function getBowWalkFrame(walkPhase = 0) {
  return bowWalkFrames[getBowWalkFrameIndex(walkPhase)];
}

function getBowMovementFrame(walkPhase = 0) {
  const wrappedPhase = ((walkPhase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  return bowWalkFrames[Math.floor(wrappedPhase / (Math.PI * 2) * 18)];
}

function getDogWalkFrame(walkPhase = 0) {
  const wrappedPhase = ((walkPhase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  return dogWalkFrames[Math.floor(wrappedPhase / (Math.PI * 2) * dogWalkFrames.length)];
}

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
    riftHound: 'assets/enemies/new/rift-hound.png',
    chainHexer: 'assets/enemies/new/chain-hexer.png',
    bellmawJuggernaut: 'assets/enemies/new/bellmaw-juggernaut.png',
    boneShieldbearer: 'assets/enemies/sheet-additions/bone-shieldbearer.png',
    frostDirewolf: 'assets/enemies/sheet-additions/frost-direwolf.png',
    cinderImp1: 'assets/enemies/sheet-additions/cinder-imp-1.png',
    cinderImp2: 'assets/enemies/sheet-additions/cinder-imp-2.png',
    amethystColossus: 'assets/enemies/sheet-additions/amethyst-colossus.png',
    abyssJellyNew: 'assets/enemies/sheet-additions/abyss-jelly.png',
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
    oceanHippoWalk: 'assets/themes/sunken-shrine/ocean-hippo-walk-opaque.png',
    reefclawCrab: 'assets/themes/sunreef-lagoon/reefclaw-crab.png',
    sunscaleRay: 'assets/themes/sunreef-lagoon/sunscale-ray.png',
    coralbackTurtle: 'assets/themes/sunreef-lagoon/coralback-turtle.png',
    tidefangEel: 'assets/themes/sunreef-lagoon/tidefang-eel.png',
    icefangBear: 'assets/themes/frozen-depths/icefang-bear.png',
    gravewingRaven: 'assets/themes/bony-ruins/gravewing-raven.png',
    prismMoth: 'assets/themes/crystal-sanctum/prism-moth.png',
    abyssalRazorfin: 'assets/themes/sunken-shrine/abyssal-razorfin.png',
    frostwingDrake: 'assets/themes/frozen-depths/frostwing-drake.png',
    boneRaven: 'assets/themes/bony-ruins/bone-raven-clean-v2.png',
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
    boneRavenFlapUp: 'assets/themes/bony-ruins/bone-raven-clean-v2.png',
    boneRavenFlapMiddle: 'assets/themes/bony-ruins/bone-raven-clean-v2.png',
    boneRavenFlapDown: 'assets/themes/bony-ruins/bone-raven-clean-v2.png',
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
    clockworkArchon: 'assets/themes/clockwork-citadel/clockwork-archon.png',
    clockworkSeraph: 'assets/themes/clockwork-seraph/clockwork-seraph.png',
    seraphHalberdSeparated: 'assets/themes/clockwork-seraph/seraph-halberd-sweep-separated.png',
    seraphPortalSeparated: 'assets/themes/clockwork-seraph/seraph-portal-lance-separated.png',
    seraphFeatherSeparated: 'assets/themes/clockwork-seraph/seraph-feather-barrage-separated.png',
    seraphClockfallSeparated: 'assets/themes/clockwork-seraph/seraph-clockfall-separated.png',
    clockworkOrb: 'assets/themes/clockwork-citadel/clockwork-orb.png',
    gravebloomColossus: 'assets/themes/gravebloom-colossus/gravebloom-colossus.png',
    lunarKitsune: 'assets/themes/lunar-kitsune/lunar-kitsune.png',
    lunarCrescentSeparated: 'assets/themes/lunar-kitsune/lunar-crescent-cut-separated.png',
    lunarOrbSeparated: 'assets/themes/lunar-kitsune/lunar-orb-cast-separated.png',
    lunarFoxfireSeparated: 'assets/themes/lunar-kitsune/lunar-foxfire-rush-separated.png',
    lunarMoonfallSeparated: 'assets/themes/lunar-kitsune/lunar-moonfall-separated.png',
    eternityWarden: 'assets/themes/eternity-warden/eternity-warden.png',
    octopusBoss: 'assets/themes/abyssal-leviathan/octopus-boss.png',
    octopusMinion: 'assets/themes/abyssal-leviathan/octopus-minion.png',
    octopusAttackSheet: 'assets/themes/abyssal-leviathan/octopus-attacks.png',
    stormglassAttack1: 'assets/themes/stormglass-leviathan/stormglass-attack-1.png',
    stormglassAttack2: 'assets/themes/stormglass-leviathan/stormglass-attack-2.png',
    stormglassAttack3: 'assets/themes/stormglass-leviathan/stormglass-attack-3.png',
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
    clockworkArchonArena: 'assets/themes/clockwork-citadel/clock-arena.png',
    clockworkSeraphArena: 'assets/themes/clockwork-seraph/clockwork-arena.png',
    darkMagicArena: 'assets/themes/dark-magic-sovereign/dark-magic-arena.png',
    astralrootArena: 'assets/themes/astralroot-colossus/astralroot-arena.png',
    mysticalArena: 'assets/themes/sunken-shrine/mystical arena.png',
    gravebloomArena: 'assets/themes/gravebloom-colossus/gravebloom-arena.png',
    lunarKitsuneArena: 'assets/themes/lunar-kitsune/lunar-arena.png',
    eternityWardenArena: 'assets/themes/eternity-warden/eternity-arena.png',
    octopusArena: 'assets/themes/abyssal-leviathan/octopus-arena.png',
    hollowStarBoss: 'assets/themes/hollow-star/hollow-star-boss.png',
    hollowStarRoundhouseSeparated: 'assets/themes/hollow-star/hollow-star-roundhouse-separated.png',
    hollowStarGroundSlamSeparated: 'assets/themes/hollow-star/hollow-star-ground-slam-separated.png',
    hollowStarOrbVortexSeparated: 'assets/themes/hollow-star/hollow-star-orb-vortex-separated.png',
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
    lateBossProjectiles: 'assets/effects/late-boss-projectiles.png',
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
    boneRaven: 'assets/themes/bony-ruins/bone-raven-clean-v2.png',
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
    skell1: 'assets/themes/bony-ruins/skell 1.png',
    skell2: 'assets/themes/bony-ruins/skell 2.png',
    skell3: 'assets/themes/bony-ruins/skell 3.png',
    skell4: 'assets/themes/bony-ruins/skell 4.png',
    skell5: 'assets/themes/bony-ruins/skell 5.png',
    skell6: 'assets/themes/bony-ruins/skell 6.png',
    skell7: 'assets/themes/bony-ruins/skell 7.png',
    skell8: 'assets/themes/bony-ruins/skell 8.png',
    skell9: 'assets/themes/bony-ruins/skell 9.png',
    skell10: 'assets/themes/bony-ruins/skell 10.png',
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
    starlingMarauder: 'assets/themes/astral-foundry/starling-marauder-complete.png',
    cometHound: 'assets/themes/astral-foundry/comet-hound.png',
    astralSentinel: 'assets/themes/astral-foundry/astral-sentinel-complete.png',
    astralrootSpriggan: 'assets/themes/astralroot-colossus/astralroot-spriggan.png',
    leyshardWisp: 'assets/themes/astralroot-colossus/leyshard-wisp.png',
    starbranchStag: 'assets/themes/astralroot-colossus/starbranch-stag.png',
    prismhideBeast: 'assets/themes/astralroot-colossus/prismhide-beast.png',
    astralrootRoom: 'assets/themes/astralroot-colossus/astralroot room.png',
    veilbornShade: 'assets/themes/umbral-expanse/veilborn-shade.png',
    eclipseShrike: 'assets/themes/umbral-expanse/eclipse-shrike.png',
    singularityEye: 'assets/themes/umbral-expanse/singularity-eye.png',
    nightcoilDrake: 'assets/themes/umbral-expanse/nightcoil-drake.png',
    duskweaver: 'assets/themes/umbral-expanse/duskweaver.png',
    voidPanther: 'assets/themes/umbral-expanse/void-panther.png',
    eclipseReaper: 'assets/themes/umbral-expanse/eclipse-reaper.png',
    gloomfinSerpent: 'assets/themes/umbral-expanse/gloomfin-serpent.png',
    starlessCourser: 'assets/themes/umbral-expanse/starless-courser.png',
    eclipseSpider: 'assets/themes/umbral-expanse/eclipse-spider.png',
    umbralRoom: 'assets/themes/umbral-expanse/umbral-room.png',
    ghost1: 'assets/themes/haunted-reliquary/ghost 1.png',
    ghost2: 'assets/themes/haunted-reliquary/ghost 2.png',
    ghost3: 'assets/themes/haunted-reliquary/ghost 3.png',
    ghost4: 'assets/themes/haunted-reliquary/ghost 4.png',
    ghost5: 'assets/themes/haunted-reliquary/ghost 5.png',
    hauntedRoom: 'assets/themes/haunted-reliquary/haunted-room.png',
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
    gravebloomMaul: 'assets/player/weapons/gravebloom-maul-clean-v2.png',
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
    romanLegionary: 'assets/protectors/roman-legionary-combat.png',
    romanSpearLegionary: 'assets/protectors/roman-spear-clean.png',
    romanBowman: 'assets/protectors/roman bow.png',
    romanBowmanReady: 'assets/protectors/roman bow not drawn.png',
    romanArrow: 'assets/protectors/roman-arrow.png',
    arrowVerdant: 'assets/player/projectiles/arrow-verdant.png',
    arrowFrost: 'assets/player/projectiles/arrow-frost.png',
    arrowCinder: 'assets/player/projectiles/arrow-cinder.png',
    arrowVoid: 'assets/player/projectiles/arrow-void.png',
    romanHorse1: 'assets/protectors/roman horse 1.png',
    romanHorse2: 'assets/protectors/roman horse 2.png',
    romanHorseAttack: 'assets/protectors/roman horse 1 and 2 attack.png',
    romanOxen: 'assets/protectors/romn oxen.png',
    romanTenLegion: 'assets/protectors/10 rpmans.png',
    romanElephant: 'assets/protectors/roman elaphant.png',
    romanDog: 'assets/protectors/roman-dog-clean.png',
    battleground: 'assets/protectors/battle grounds.png',
    roman1Guard: 'assets/protectors/roman-1-guard.png',
    roman1Half: 'assets/protectors/roman-1-half.png',
    roman1Thrust: 'assets/protectors/roman-1-thrust.png',
    roman2Guard: 'assets/protectors/roman-2-guard.png',
    roman2Half: 'assets/protectors/roman-2-half.png',
    roman2Thrust: 'assets/protectors/roman-2-thrust.png',
    roman3Guard: 'assets/protectors/roman-3-guard.png',
    roman3Half: 'assets/protectors/roman-3-half.png',
    roman3Thrust: 'assets/protectors/roman-3-thrust.png',
    roman4Guard: 'assets/protectors/roman-4-guard.png',
    roman4Half: 'assets/protectors/roman-4-half.png',
    roman4Thrust: 'assets/protectors/roman-4-thrust.png',
    opener: 'assets/helpers/scout.png',
    survivalArena: 'assets/arena/endless-arena.png',
    arenaBarricade: 'assets/arena/broken-barricade.png',
    arenaPillar: 'assets/arena/ruined-pillar.png',
    arenaSpikeRack: 'assets/arena/spike-rack.png',
    forgottenShrine: 'assets/events/forgotten-shrine.png',
    abandonedCamp: 'assets/events/abandoned-camp.png',
    rescuedScout: 'assets/events/rescued-scout.png',
    travelingMerchant: 'assets/events/traveling-merchant.png',
  };

  Object.entries(sources).forEach(([key, src]) => {
    art[key].src = src;
  });
  romanSwordWalkFrames.forEach((image, index) => {
    const directory = index < 21 ? 'roman-sword-walk' : 'roman-sword-walk-2';
    const frame = index < 21 ? index + 1 : index - 20;
    image.src = `assets/protectors/${directory}/walk-${String(frame).padStart(2, '0')}.png`;
  });
  elephantWalkFrames.forEach((image, index) => {
    image.src = `assets/protectors/elephant-walk/walk-${String(index + 1).padStart(2, '0')}.png`;
  });
  oxenWalkFrames.forEach((image, index) => {
    const directory = index < 20 ? 'oxen-walk' : 'oxen-walk-2';
    const frame = index < 20 ? index + 1 : index - 19;
    image.src = `assets/protectors/${directory}/walk-${String(frame).padStart(2, '0')}.png?v=2`;
  });
  horseWalkFrames.forEach((image, index) => {
    image.src = `assets/protectors/horse-walk/walk-${String(index + 1).padStart(2, '0')}.png`;
  });
  bowWalkFrames.forEach((image, index) => {
    image.src = `assets/protectors/bow-walk/walk-${String(index + 1).padStart(2, '0')}.png`;
  });
  dogWalkFrames.forEach((image, index) => {
    image.src = `assets/protectors/dog-walk/walk-${String(index + 1).padStart(2, '0')}.png?v=1`;
  });
  Object.entries(blueBattleFrames).forEach(([type, frames]) => {
    const directory = type.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    frames.forEach((image, index) => {
      image.src = `assets/enemies/blue-legion/${directory}/frame-${String(index + 1).padStart(2, '0')}.png?v=2`;
    });
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
  walkPhase: 0,
  walkBlend: 0,
  walkAnimationTime: performance.now(),
  inventory: {
    bandage: 0,
    arenaPotion: accountSpecialLoot.arenaPotions,
    fieldMedicPotion: accountSpecialLoot.fieldMedicPotions,
    ammo: 0,
    protectorShard: 0,
    openerShard: 0,
    shieldShard: 0,
    armorShard: accountSpecialLoot.armorShards,
    luckyCoin: accountSpecialLoot.luckyCoins,
    arenaKey: accountSpecialLoot.arenaKeys,
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
    {
      name: 'Astralroot Grove',
      bg: '#070515',
      room: '#241747',
      accent: '#c084fc',
      floor: '#39245f',
      wall: '#100922',
      glow: '#67e8f9',
      shadow: '#020108',
    },
    {
      name: 'Umbral Expanse',
      bg: '#020107',
      room: '#160b2b',
      accent: '#d8b4fe',
      floor: '#271448',
      wall: '#090311',
      glow: '#a855f7',
      shadow: '#000000',
    },
    {
      name: 'Haunted Reliquary',
      bg: '#030712',
      room: '#101b31',
      accent: '#60a5fa',
      floor: '#172b46',
      wall: '#060b16',
      glow: '#38bdf8',
      shadow: '#01030a',
    },
  ],
};

const state = {
  wave: 1,
  score: 0,
  maxRooms: 8,
  enemies: [],
  crates: [],
  dungeonEvents: [],
  biomeHazards: [],
  pendingBossCrates: 0,
  pendingReinforcedCrates: 0,
  crateStreak: 0,
  perfectWaveEligible: true,
  luckyCoinActive: false,
  luckyCoinBurstTimer: 0,
  luckyCoinBurstTargets: [],
  arenaTrial: false,
  arenaTrialTier: 0,
  boss: null,
  rooms: [],
  challengeRooms: [],
  roomCount: 0,
  roomCleared: false,
  bossDefeated: 0,
  isGameOver: false,
  bossArenaOpen: false,
  bossIntroTimer: 0,
  bossIntroDuration: 1.25,
  bossFightTimer: 0,
  lastBossDefeatTime: null,
  victoryPoseTimer: 0,
  victoryPoseDuration: 2.4,
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
  hardWaveActive: false,
  hardWaveRewarded: false,
  relics: [],
  merchantDamageBoost: 1,
  godMode: false,
  godTravelMode: null,
  forcedThemeIndex: null,
  forcedEnemyType: null,
  forcedBossVariant: null,
  pantheonMode: false,
  pantheonSessionGuard: false,
  pantheonBosses: [],
  pantheonGroupRewarded: false,
  pantheonFinalTrial: false,
  pantheonFinalBatch: 0,
  pantheonEscapeArmedUntil: 0,
  forcedRoomArtwork: null,
  survivalArenaMode: false,
  battlegroundMode: false,
  battlegroundSessionGuard: false,
  battlegroundWave: 1,
  battleShards: 20,
  battleUnits: [],
  battleEnemies: [],
  battleEnemyQueue: [],
  battlegroundSpawnTimer: 0,
  battlegroundIncomeTimer: 1,
  battlegroundRetreatTimer: 0,
  battlegroundExitArmedUntil: 0,
  battleProjectiles: [],
  battleStompEffects: [],
  battlegroundTransitionTimer: 0,
  battlegroundResult: null,
  battlegroundZoom: 1,
  battlegroundCameraX: 6300,
  battlegroundCameraY: 2850,
  survivalArenaEnemyTypes: [],
  survivalArenaObstacles: [],
  survivalArenaNextWaveTimer: 0,
  survivalArenaDisasterTimer: 0,
  survivalArenaDisaster: null,
  survivalArenaDisasterFlash: 0,
  romanEmergencyGuardActive: false,
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

function getMobAttackSheetChance(wave = state.wave, bossMinion = false) {
  const fiveWaveSteps = Math.floor(Math.max(0, wave - 1) / 5);
  const startingChance = bossMinion ? 0.2 : 0.1;
  const stepIncrease = bossMinion ? 0.2 : 0.1;
  return clamp(startingChance + fiveWaveSteps * stepIncrease, 0, 1);
}

function shouldEnemyUseAttackSheet(enemy) {
  if (typeof enemy.attackSheetEnabled === 'boolean') return enemy.attackSheetEnabled;
  enemy.attackSheetEnabled = Math.random() < getMobAttackSheetChance(state.wave, Boolean(enemy.bossMinion));
  return enemy.attackSheetEnabled;
}

// Measures straight-line distance between two positioned objects.
function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Converts enemy combat stats into a rounded arcade point value.
function getEnemyScore(enemy) {
  const maxHealth = Number.isFinite(Number(enemy?.maxHealth)) ? Number(enemy.maxHealth) : 0;
  const damage = Number.isFinite(Number(enemy?.damage)) ? Number(enemy.damage) : 0;
  const speed = Number.isFinite(Number(enemy?.speed)) ? Number(enemy.speed) : 0;
  const radius = Number.isFinite(Number(enemy?.radius)) ? Number(enemy.radius) : 0;
  const baseScore = maxHealth * 0.65
    + damage * 5
    + speed * 0.35
    + radius * 1.5;
  const eliteMultiplier = enemy.elite ? 1.75 : 1;
  const minionMultiplier = enemy.bossMinion ? 1.25 : 1;
  return Math.max(10, Math.round(baseScore * eliteMultiplier * minionMultiplier / 5) * 5);
}

// Keeps one incomplete enemy or boss record from poisoning the run total.
function addScore(points) {
  const currentScore = Number.isFinite(Number(state.score)) ? Number(state.score) : 0;
  const earnedPoints = Number.isFinite(Number(points)) ? Number(points) : 0;
  state.score = Math.max(0, Math.round(currentScore + earnedPoints));
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

function getAstralrootEnemyVariant(type) {
  if (['runner', 'crawler', 'assassin'].includes(type)) return 'astralrootSpriggan';
  if (['spitter', 'wraith', 'arcaneOrb'].includes(type)) return 'leyshardWisp';
  if (type === 'walker' || type === 'burrower') return 'starbranchStag';
  return 'prismhideBeast';
}

function getUmbralEnemyVariant(type) {
  const variants = {
    walker: 'veilbornShade', runner: 'eclipseShrike', crawler: 'eclipseSpider',
    spitter: 'duskweaver', burrower: 'gloomfinSerpent', arcaneOrb: 'singularityEye',
    brute: 'voidPanther', assassin: 'starlessCourser', sentinel: 'nightcoilDrake',
    wraith: 'veilbornShade', reaper: 'eclipseReaper',
  };
  return variants[type] || 'veilbornShade';
}

const baseEnemyTypes = new Set([
  'walker', 'runner', 'crawler', 'spitter', 'burrower', 'arcaneOrb',
  'brute', 'assassin', 'sentinel', 'wraith', 'reaper',
]);

// Gives each purpose-built creature a real combat signature rather than a
// cosmetic trait label. Ranged and charge-up specialists keep their dedicated
// handlers; these profiles drive contact reach, timing, impact, and recovery.
const enemyMeleeProfiles = {
  riftHound: { attackName: 'Rift Pounce', reach: 124, cooldown: 0.92, lunge: 112, lunges: true, damageScale: 1.2, staminaDrain: 15, retreat: 0.5, color: '#a855f7', shake: 9 },
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
  ghost2: { attackName: 'Spectral Twin Cut', reach: 92, cooldown: 0.78, lunge: 76, lunges: true, damageScale: 1.12, staminaDrain: 12, retreat: 0.5, color: '#60a5fa', shake: 8 },
  ghost4: { attackName: 'Deathrider Charge', reach: 136, cooldown: 1.24, lunge: 126, lunges: true, damageScale: 1.4, staminaDrain: 22, retreat: 0.4, color: '#38bdf8', shake: 13 },
  ghost5: { attackName: 'Phantom Greatblade', reach: 116, cooldown: 1.42, lunge: 54, damageScale: 1.48, staminaDrain: 24, retreat: 0.28, color: '#3b82f6', shake: 14 },
  skell1: { attackName: 'Grave Scimitar', reach: 78, cooldown: 0.92, lunge: 46, damageScale: 1.04, retreat: 0.34, color: '#d6d3d1', shake: 6 },
  skell3: { attackName: 'Tombguard Cut', reach: 82, cooldown: 1.02, lunge: 48, damageScale: 1.12, staminaDrain: 8, retreat: 0.3, color: '#e7e5e4', shake: 7 },
  skell5: { attackName: 'Marrow Pounce', reach: 112, cooldown: 0.88, lunge: 102, lunges: true, damageScale: 1.16, staminaDrain: 12, retreat: 0.48, color: '#f87171', shake: 9 },
  skell6: { attackName: 'Bonecleaver Smash', reach: 104, cooldown: 1.58, lunge: 34, damageScale: 1.48, staminaDrain: 22, retreat: 0.22, color: '#f59e0b', shake: 13 },
  skell7: { attackName: 'Royal Guard Cleave', reach: 88, cooldown: 1.3, lunge: 36, damageScale: 1.3, staminaDrain: 16, retreat: 0.24, color: '#fbbf24', shake: 10 },
  skell8: { attackName: 'Pharaoh Grasp', reach: 92, cooldown: 1.08, lunge: 62, damageScale: 1.22, staminaDrain: 14, retreat: 0.36, color: '#38bdf8', shake: 9 },
  skell9: { attackName: 'Sepulchral Thrust', reach: 116, cooldown: 1.12, lunge: 78, lunges: true, damageScale: 1.28, staminaDrain: 16, retreat: 0.38, color: '#ef4444', shake: 10 },
  skell10: { attackName: 'Shroud Rush', reach: 108, cooldown: 0.9, lunge: 96, lunges: true, damageScale: 1.2, staminaDrain: 15, retreat: 0.52, color: '#e5e7eb', shake: 9 },
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
  octopusMinion: { attackName: 'Tentacle Lash', reach: 104, cooldown: 1.15, lunge: 42, lunges: true, damageScale: 1.18, staminaDrain: 12, retreat: 0.3, color: '#67e8f9', shake: 9 },
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
  astralrootSpriggan: { attackName: 'Rootclaw Flurry', reach: 66, cooldown: 0.68, lunge: 54, damageScale: 0.94, retreat: 0.4, color: '#a78bfa', shake: 6 },
  leyshardWisp: { attackName: 'Leybolt', reach: 78, cooldown: 0.95, lunge: 18, damageScale: 1.04, retreat: 0.5, color: '#67e8f9', shake: 7 },
  starbranchStag: { attackName: 'Starbranch Charge', reach: 108, cooldown: 1.08, lunge: 98, lunges: true, damageScale: 1.24, staminaDrain: 16, retreat: 0.5, color: '#c084fc', shake: 10 },
  prismhideBeast: { attackName: 'Prismhide Crush', reach: 96, cooldown: 1.62, lunge: 28, damageScale: 1.48, staminaDrain: 22, retreat: 0.2, color: '#818cf8', shake: 13 },
  veilbornShade: { attackName: 'Umbral Grasp', reach: 82, cooldown: 1.05, lunge: 46, damageScale: 1.02, freezeDuration: 0.4, retreat: 0.46, color: '#c084fc', shake: 7 },
  eclipseShrike: { attackName: 'Nightfall Dive', reach: 112, cooldown: 0.78, lunge: 104, lunges: true, damageScale: 1.08, retreat: 0.58, color: '#e9d5ff', shake: 7 },
  singularityEye: { attackName: 'Event Horizon', reach: 86, cooldown: 1.2, lunge: 28, damageScale: 1.12, staminaDrain: 16, retreat: 0.52, color: '#7c3aed', shake: 8 },
  nightcoilDrake: { attackName: 'Crescent Coil', reach: 116, cooldown: 1.02, lunge: 102, lunges: true, damageScale: 1.22, staminaDrain: 16, retreat: 0.5, color: '#a78bfa', shake: 10 },
  duskweaver: { attackName: 'Veil Hex', reach: 96, cooldown: 1.08, lunge: 30, damageScale: 1, freezeDuration: 0.35, retreat: 0.56, color: '#d8b4fe', shake: 6 },
  voidPanther: { attackName: 'Rift Pounce', reach: 126, cooldown: 0.84, lunge: 116, lunges: true, damageScale: 1.28, staminaDrain: 18, retreat: 0.5, color: '#8b5cf6', shake: 10 },
  eclipseReaper: { attackName: 'Black Moon Harvest', reach: 118, cooldown: 1.58, lunge: 42, damageScale: 1.5, staminaDrain: 24, retreat: 0.25, color: '#6d28d9', shake: 14 },
  gloomfinSerpent: { attackName: 'Abyssal Corkscrew', reach: 108, cooldown: 0.82, lunge: 98, lunges: true, damageScale: 1.16, poisonDuration: 3.5, poisonDps: 4, retreat: 0.54, color: '#a855f7', shake: 8 },
  starlessCourser: { attackName: 'Midnight Stampede', reach: 136, cooldown: 1.12, lunge: 128, lunges: true, damageScale: 1.34, staminaDrain: 22, retreat: 0.44, color: '#ddd6fe', shake: 12 },
  eclipseSpider: { attackName: 'Eventide Web', reach: 92, cooldown: 1.34, lunge: 34, damageScale: 1.18, freezeDuration: 0.65, retreat: 0.3, color: '#9333ea', shake: 9 },
};

const enemySpecialAbilityTypes = new Set([
  'brute', 'spitter', 'burrower', 'arcaneOrb', 'assassin', 'sentinel', 'wraith',
  'reaper', 'riftHound', 'chainHexer', 'bellmawJuggernaut', 'magmaSerpent',
  'mechMinion', 'clockworkOrb', 'lushSporeShroom', 'fungalFairyWitch',
]);

// Classifies a mob's signature mechanic so its in-world marker matches the
// ability instead of using one detached icon for every creature.
function getEnemyAbilityMarker(enemy) {
  const journalId = getEnemyJournalId(enemy);
  const profile = enemyMeleeProfiles[enemy.type] || enemyMeleeProfiles[journalId];
  if (!profile && !enemySpecialAbilityTypes.has(enemy.type)) return null;

  const name = `${profile?.attackName || ''} ${bestiaryProfiles[journalId]?.traits || ''}`.toLowerCase();
  if (enemy.type === 'assassin' || enemy.type === 'wraith' || enemy.type === 'burrower' || enemy.type === 'chainHexer') {
    return { kind: 'control', color: '#c084fc' };
  }
  if (enemy.type === 'spitter' || enemy.type === 'arcaneOrb' || enemy.type === 'mechMinion'
    || enemy.type === 'clockworkOrb' || enemy.type === 'lushSporeShroom'
    || enemy.type === 'fungalFairyWitch' || enemy.type === 'magmaSerpent' || enemy.type === 'leyshardWisp') {
    return { kind: 'ranged', color: '#60a5fa' };
  }
  if (name.includes('poison') || name.includes('venom') || name.includes('hydration') || name.includes('drain')) {
    return { kind: 'drain', color: '#a3e635' };
  }
  if (name.includes('armour') || name.includes('armor') || name.includes('bulwark') || enemy.type === 'sentinel') {
    return { kind: 'defence', color: '#67e8f9' };
  }
  if (profile?.lunges || name.includes('charge') || name.includes('pounce') || name.includes('dive')) {
    return { kind: 'charge', color: '#fb923c' };
  }
  return { kind: 'impact', color: '#fbbf24' };
}

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
  if (world.themeIndex === 11) return getAstralrootEnemyVariant(enemy.type);
  if (world.themeIndex === 12) return getUmbralEnemyVariant(enemy.type);
  return enemy.type;
}

function getEnemyDisplayName(enemy) {
  if (enemy.championName) return enemy.championName;
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
  const name = id === 'mimic' ? 'Crate Mimic' : formatLootName(id);
  journalCatalog.push({
    id,
    name,
    kind: 'Enemy',
    image: enemy.type === 'mimic' ? 'assets/props/crate-closed.png' : getEnemySplashArt(enemy),
  });
  bestiaryProfiles[id] = {
    health: `${Math.round(enemy.maxHealth)} when first encountered`,
    damage: `${Math.round(enemy.damage)} per hit when first encountered`,
    speed: `${Math.round(enemy.speed)}`,
    traits: 'Newly encountered dungeon species',
    backstory: `${name} was unknown to the dungeon’s field scholars until this encounter. Its movements, attacks, and habitat are now preserved in the Beastiary for future expeditions.`,
  };
}

function recordChampionVictory(enemy) {
  if (state.godMode || !enemy.champion || enemy.championJournalRecorded) return;
  enemy.championJournalRecorded = true;
  const enemyJournalId = getEnemyJournalId(enemy);
  const enemyName = journalCatalog.find((entry) => entry.id === enemyJournalId)?.name
    || formatLootName(enemy.type || 'enemy');
  const record = {
    id: `champion:${Date.now()}:${state.wave}`,
    name: enemy.championName,
    enemyName,
    biome: world.themes[world.themeIndex]?.name || 'Unknown Biome',
    wave: state.wave,
  };
  championJournalRecords.push(record);
  const entry = championRecordToJournalEntry(record);
  journalCatalog.push(entry);
  journalDiscoveries.add(entry.id);
  if (championJournalRecords.length > 50) {
    const removed = championJournalRecords.shift();
    const removedIndex = journalCatalog.findIndex((candidate) => candidate.id === removed.id);
    if (removedIndex >= 0) journalCatalog.splice(removedIndex, 1);
    journalDiscoveries.delete(removed.id);
  }
  try {
    window.localStorage.setItem(championJournalStorageKey, JSON.stringify(championJournalRecords));
  } catch (error) {
    // The victory remains visible for the current session.
  }
  saveJournal();
}

// Awards kill points once, regardless of who landed the finishing blow.
function awardEnemyScore(enemy) {
  if (enemy.scoreAwarded) return;
  enemy.scoreAwarded = true;
  if (!state.godMode) {
    ensureEnemyHasBestiaryEntry(enemy);
    discoverJournalEntry(getEnemyJournalId(enemy));
  }
  addScore(getEnemyScore(enemy));
  if (enemy.mimicEnemy && !enemy.mimicLootDropped) {
    enemy.mimicLootDropped = true;
    const crate = createReinforcedCrate(enemy.x, enemy.y);
    crate.rewards = enemy.mimicRewards;
    crate.mimicReward = true;
    crate.dropDuration = 0.45;
    crate.dropTimer = crate.dropDuration;
    state.crates.push(crate);
    const room = getContainingRoom(enemy) || enemy.spawnRoom;
    if (room && !room.crates.includes(crate)) room.crates.push(crate);
    spawnBurst(enemy.x, enemy.y, 30, '#f97316', 165);
    setMessage('Crate Mimic defeated! Its reinforced eight-item cache dropped.', true);
  }
  if (enemy.champion && !enemy.championLootDropped) {
    recordChampionVictory(enemy);
    enemy.championLootDropped = true;
    const crate = createReinforcedCrate(enemy.x, enemy.y);
    crate.championReward = true;
    crate.dropDuration = 0.45;
    crate.dropTimer = crate.dropDuration;
    state.crates.push(crate);
    const room = getContainingRoom(enemy) || enemy.spawnRoom;
    if (room && !room.crates.includes(crate)) room.crates.push(crate);
    spawnBurst(enemy.x, enemy.y, 34, '#fbbf24', 175);
    setMessage(`${enemy.championName} defeated! A reinforced champion crate dropped.`, true);
  }
}

// Awards each successive boss another thousand points.
function getBossScore(boss) {
  const tier = Number.isFinite(Number(boss?.tier)) ? Number(boss.tier) : 0;
  return Math.max(0, Math.round(tier * 1000));
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
  // Newer biomes join the expedition pool gradually. Their mobs therefore
  // remain genuinely difficult Beastiary discoveries instead of appearing in
  // the opening rooms. Forced God Mode travel deliberately bypasses this gate.
  const biomeUnlockWave = {
    0: 1, // Verdant Ruins
    1: 1, // Sunken Shrine
    2: 1, // Cinder Keep
    3: 1, // Frozen Depths
    5: 3, // Bony Ruins
    6: 3, // Desert Ruins
    7: 4, // Abyssal Depths
    8: 5, // Crystal Sanctum
    9: 6, // Astral Foundry
    10: 8, // Sunreef Lagoon
    11: 10, // Astralroot Grove
    12: 12, // Umbral Expanse
    13: 8, // Haunted Reliquary
  };
  const eligibleThemes = Object.entries(biomeUnlockWave)
    .filter(([, unlockWave]) => state.wave >= unlockWave)
    .map(([themeIndex]) => Number(themeIndex));
  world.themeIndex = eligibleThemes[Math.floor(Math.random() * eligibleThemes.length)];
  return world.themes[world.themeIndex];
}

// Rolls one weighted crate reward.
function randomLoot() {
  if (Math.random() < 1 / 2500) return 'armorShard';
  if (Math.random() < 1 / 1500) return 'arenaKey';
  if (Math.random() < 1 / 1000) return 'luckyCoin';
  const roll = Math.random();
  if (roll < 0.248) return 'food';
  if (roll < 0.44) return 'water';
  if (roll < 0.58) return 'bandage';
  if (roll < 0.676) return 'arrowBundle';
  if (roll < 0.756) return 'protectorShard';
  if (roll < 0.9) return 'openerShard';
  return 'shieldShard';
}

// Produces upgraded Lucky Coin loot. At full health and hydration, the first
// seven rewards cover every ordinary loot type before any category repeats.
function createCrateRewards(count = 4) {
  if (count !== 10 || player.health < player.maxHealth || player.hydration < 100) {
    return Array.from({ length: count }, randomLoot);
  }
  const variedPool = [
    'food', 'water', 'bandage', 'arrowBundle',
    'protectorShard', 'openerShard', 'shieldShard',
  ];
  const rewards = [];
  let varied = [];
  while (rewards.length < count) {
    if (Math.random() < 1 / 2500) {
      rewards.push('armorShard');
      continue;
    }
    if (Math.random() < 1 / 1500) {
      rewards.push('arenaKey');
      continue;
    }
    if (Math.random() < 1 / 1000) {
      rewards.push('luckyCoin');
      continue;
    }
    if (varied.length === 0) {
      varied = [...variedPool];
      for (let index = varied.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [varied[index], varied[swapIndex]] = [varied[swapIndex], varied[index]];
      }
    }
    rewards.push(varied.pop());
  }
  return rewards;
}

// Pantheon caches contain combat supplies, but never Scout Shards. Arrow
// Bundles are exactly three percentage points rarer here than their previous
// Pantheon rate; that removed chance moves to Shield Shards. Normal dungeon
// crate odds remain entirely unchanged in randomLoot().
function randomPantheonLoot() {
  if (Math.random() < 1 / 2500) return 'armorShard';
  const roll = Math.random();
  if (roll < 0.28972) return 'food';
  if (roll < 0.514019) return 'water';
  if (roll < 0.67757) return 'bandage';
  if (roll < 0.75972) return 'arrowBundle';
  if (roll < 0.853178) return 'protectorShard';
  return 'shieldShard';
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
    rewards: createCrateRewards(state.luckyCoinActive ? 10 : 4),
  };
}

function createReinforcedCrate(x, y) {
  return {
    ...createLootCrate(x, y),
    reinforced: true,
    rewards: createCrateRewards(8),
  };
}

function createSecretRoom(room) {
  const secret = {
    x: room.x + room.w - 250,
    y: room.y + wallThickness,
    w: 220,
    h: 190,
    opened: false,
    claimed: false,
    rewardType: Math.random() < 0.34 ? 'lore' : Math.random() < 0.48 ? 'reinforced' : 'supplies',
  };
  room.secret = secret;
  if (secret.rewardType !== 'lore') {
    const crate = secret.rewardType === 'reinforced'
      ? createReinforcedCrate(secret.x + secret.w / 2, secret.y + secret.h / 2)
      : createLootCrate(secret.x + secret.w / 2, secret.y + secret.h / 2);
    if (secret.rewardType === 'supplies') crate.rewards = createCrateRewards(6);
    crate.secretRoom = secret;
    secret.crate = crate;
    room.crates.push(crate);
    state.crates.push(crate);
  }
  return secret;
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
  } else if (item === 'armorShard') {
    persistentArmorShards += 1;
    accountSpecialLoot.armorShards = persistentArmorShards;
    player.inventory.armorShard = persistentArmorShards;
    saveArmorCollection();
    saveAccountSpecialLoot();
  } else if (item === 'luckyCoin') {
    player.inventory.luckyCoin += 1;
    accountSpecialLoot.luckyCoins = player.inventory.luckyCoin;
    saveAccountSpecialLoot();
  } else if (item === 'arenaKey') {
    player.inventory.arenaKey += 1;
    savePersistentArenaKeys();
  }
}

// Grants 70% of the original twenty-crate Pantheon cache (56 loot drops).
function grantPantheonCrateCache() {
  let plannedFood = player.food;
  let plannedHydration = player.hydration;
  const rewards = Array.from({ length: Math.round(20 * 4 * 0.7) }, () => {
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
  state.dungeonEvents = [];
  state.biomeHazards = [];

  const theme = getTheme();
  state.retroMode = world.themeIndex === 4;
  const roomWidth = 900;
  const roomHeight = 580;
  const columns = 4;
  const rows = Math.ceil(state.maxRooms / columns);
  const gap = 50;
  // Grow the collision world with the generated grid. Without this, the fifth
  // row begins below the old 2600px boundary and looks reachable while the
  // player is clamped above its corridor (first encountered around Wave 11).
  world.width = Math.max(4200, 140 + columns * roomWidth + (columns - 1) * gap + 140);
  world.height = Math.max(2600, 110 + rows * roomHeight + (rows - 1) * gap + 110);
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

  // At most one ordinary crate per wave is secretly a mimic. Reward caches
  // are created later and therefore can never be selected here.
  if (state.wave >= 2 && state.crates.length > 0 && Math.random() < 0.06) {
    state.crates[Math.floor(Math.random() * state.crates.length)].mimic = true;
  }

  // A restrained chance for one optional discovery per wave. The first room
  // and combat challenge rooms stay clear so events never obstruct progression.
  if (state.wave >= 2 && Math.random() < 0.22) {
    const eventRooms = state.rooms.filter((room, index) => index > 0 && !room.challenge);
    if (eventRooms.length > 0) {
      const room = eventRooms[Math.floor(Math.random() * eventRooms.length)];
      const types = ['shrine', 'camp', 'scout'];
      state.dungeonEvents.push({
        type: types[Math.floor(Math.random() * types.length)],
        x: room.x + room.w / 2 + rand(-110, 110),
        y: room.y + room.h - 145,
        radius: 52,
        used: false,
        room,
      });
    }
  }

  // Merchants are deliberately rarer than the ordinary discoveries and never
  // occupy the first room or a sealed challenge chamber.
  if (state.wave >= 2 && Math.random() < 0.07) {
    const occupiedRooms = new Set(state.dungeonEvents.map((event) => event.room));
    const merchantRooms = state.rooms.filter((room, index) => index > 0 && !room.challenge && !occupiedRooms.has(room));
    if (merchantRooms.length > 0) {
      const room = merchantRooms[Math.floor(Math.random() * merchantRooms.length)];
      state.dungeonEvents.push({
        type: 'merchant',
        x: room.x + room.w / 2,
        y: room.y + room.h - 150,
        radius: 52,
        used: false,
        room,
      });
    }
  }

  // One concealed alcove can appear in a later room. It occupies an authored
  // corner so it never blocks a corridor, ordinary crate, event, or spawn.
  if (state.wave >= 2 && Math.random() < 0.1) {
    const secretCandidates = state.rooms.filter((room, index) => index > 0 && !room.challenge);
    if (secretCandidates.length > 0) {
      createSecretRoom(secretCandidates[Math.floor(Math.random() * secretCandidates.length)]);
    }
  }

  const hazardType = theme.name === 'Cinder Keep' ? 'lavaVent'
    : theme.name === 'Frozen Depths' ? 'icePatch'
      : theme.name === 'Umbral Expanse' ? 'shadowRift' : null;
  if (hazardType) {
    const hazardRooms = state.rooms.filter((room, index) => index > 0 && !room.challenge && !room.secret);
    const hazardCount = Math.min(3, Math.max(1, Math.floor(state.rooms.length / 4)));
    hazardRooms.sort(() => Math.random() - 0.5).slice(0, hazardCount).forEach((room) => {
      state.biomeHazards.push({
        type: hazardType,
        x: room.x + rand(170, room.w - 170),
        y: room.y + rand(170, room.h - 130),
        radius: hazardType === 'lavaVent' ? 58 : 72,
        cycle: Math.random() * 3,
        hitCooldown: 0,
      });
    });
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

  const deliveredReinforcedCrates = state.pendingReinforcedCrates;
  if (firstRoom && deliveredReinforcedCrates > 0) {
    for (let index = 0; index < deliveredReinforcedCrates; index += 1) {
      let crateX = firstRoom.x + rand(110, firstRoom.w - 110);
      let crateY = firstRoom.y + rand(110, firstRoom.h - 110);
      for (let attempt = 0; attempt < 30; attempt += 1) {
        if (firstRoom.crates.every((other) => Math.hypot(crateX - other.x, crateY - other.y) >= 64)) break;
        crateX = firstRoom.x + rand(110, firstRoom.w - 110);
        crateY = firstRoom.y + rand(110, firstRoom.h - 110);
      }
      const crate = createReinforcedCrate(crateX, crateY);
      crate.dropDuration = 0.75;
      crate.dropTimer = crate.dropDuration;
      firstRoom.crates.push(crate);
      state.crates.push(crate);
    }
    state.pendingReinforcedCrates = 0;
  }

  removeRandomCorridors();

  state.bossArena = {
    x: world.width / 2 - 1100,
    y: world.height / 2 - 875,
    w: 2200,
    h: 1750,
  };

  hud.theme.textContent = theme.name;
  setMessage(deliveredReinforcedCrates > 0
    ? `Perfect Wave reward delivered: a reinforced eight-item crate waits in this room!`
    : deliveredBossCrates > 0
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
  const newEnemyArt = {
    riftHound: 'assets/enemies/new/rift-hound.png',
    chainHexer: 'assets/enemies/new/chain-hexer.png',
    bellmawJuggernaut: 'assets/enemies/new/bellmaw-juggernaut.png',
    boneShieldbearer: 'assets/enemies/sheet-additions/bone-shieldbearer.png',
    frostDirewolf: 'assets/enemies/sheet-additions/frost-direwolf.png',
    cinderImp: 'assets/enemies/sheet-additions/cinder-imp-1.png',
    amethystColossus: 'assets/enemies/sheet-additions/amethyst-colossus.png',
    abyssJellyNew: 'assets/enemies/sheet-additions/abyss-jelly.png',
    skell1: 'assets/themes/bony-ruins/skell 1.png', skell2: 'assets/themes/bony-ruins/skell 2.png',
    skell3: 'assets/themes/bony-ruins/skell 3.png', skell4: 'assets/themes/bony-ruins/skell 4.png',
    skell5: 'assets/themes/bony-ruins/skell 5.png', skell6: 'assets/themes/bony-ruins/skell 6.png',
    skell7: 'assets/themes/bony-ruins/skell 7.png', skell8: 'assets/themes/bony-ruins/skell 8.png',
    skell9: 'assets/themes/bony-ruins/skell 9.png', skell10: 'assets/themes/bony-ruins/skell 10.png',
    ghost1: 'assets/themes/haunted-reliquary/ghost 1.png', ghost2: 'assets/themes/haunted-reliquary/ghost 2.png',
    ghost3: 'assets/themes/haunted-reliquary/ghost 3.png', ghost4: 'assets/themes/haunted-reliquary/ghost 4.png',
    ghost5: 'assets/themes/haunted-reliquary/ghost 5.png',
  }[enemy.type];
  if (newEnemyArt) return newEnemyArt;
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
    starlingMarauder: 'assets/themes/astral-foundry/starling-marauder-complete.png',
    cometHound: 'assets/themes/astral-foundry/comet-hound.png',
    astralSentinel: 'assets/themes/astral-foundry/astral-sentinel-complete.png',
    astralrootSpriggan: 'assets/themes/astralroot-colossus/astralroot-spriggan.png',
    leyshardWisp: 'assets/themes/astralroot-colossus/leyshard-wisp.png',
    starbranchStag: 'assets/themes/astralroot-colossus/starbranch-stag.png',
    prismhideBeast: 'assets/themes/astralroot-colossus/prismhide-beast.png',
    veilbornShade: 'assets/themes/umbral-expanse/veilborn-shade.png',
    eclipseShrike: 'assets/themes/umbral-expanse/eclipse-shrike.png',
    singularityEye: 'assets/themes/umbral-expanse/singularity-eye.png',
    nightcoilDrake: 'assets/themes/umbral-expanse/nightcoil-drake.png',
    duskweaver: 'assets/themes/umbral-expanse/duskweaver.png',
    voidPanther: 'assets/themes/umbral-expanse/void-panther.png',
    eclipseReaper: 'assets/themes/umbral-expanse/eclipse-reaper.png',
    gloomfinSerpent: 'assets/themes/umbral-expanse/gloomfin-serpent.png',
    starlessCourser: 'assets/themes/umbral-expanse/starless-courser.png',
    eclipseSpider: 'assets/themes/umbral-expanse/eclipse-spider.png',
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
      ? 'assets/themes/astral-foundry/starling-marauder-complete.png'
      : 'assets/themes/astral-foundry/astral-sentinel-complete.png';
  }
  if (world.themeIndex === 10) {
    if (enemy.type === 'crawler' || enemy.type === 'burrower') return 'assets/themes/sunreef-lagoon/tidefang-eel.png';
    return role === 'minion'
      ? 'assets/themes/sunreef-lagoon/sunscale-ray.png'
      : 'assets/themes/sunreef-lagoon/coralback-turtle.png';
  }
  if (world.themeIndex === 11) {
    const astralrootVariant = getAstralrootEnemyVariant(enemy.type);
    const astralrootFilename = {
      astralrootSpriggan: 'astralroot-spriggan',
      leyshardWisp: 'leyshard-wisp',
      starbranchStag: 'starbranch-stag',
      prismhideBeast: 'prismhide-beast',
    }[astralrootVariant];
    return `assets/themes/astralroot-colossus/${astralrootFilename}.png`;
  }
  if (world.themeIndex === 12) {
    const variant = getUmbralEnemyVariant(enemy.type);
    const filename = variant.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    return `assets/themes/umbral-expanse/${filename}.png`;
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

function formatBossFightTime(seconds) {
  const totalTenths = Math.max(0, Math.round((seconds || 0) * 10));
  const minutes = Math.floor(totalTenths / 600);
  const remainingSeconds = ((totalTenths % 600) / 10).toFixed(1);
  return minutes > 0 ? `${minutes}:${remainingSeconds.padStart(4, '0')}` : `${remainingSeconds}s`;
}

function showWaveSplash() {
  state.pendingWaveSplash = false;
  state.threatSplashOpen = true;
  keys.clear();
  const theme = world.themes[world.themeIndex] || world.themes[0];
  waveSplashKicker.textContent = `Wave ${state.wave}`;
  hardWaveActions.classList.remove('hidden');
  waveSplashContinuePrompt.textContent = 'Choose Normal or Hard - Press H for Hard';
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
    if (state.lastBossDefeatTime != null) {
      waveSplashWarning.textContent += ` Boss defeated in ${formatBossFightTime(state.lastBossDefeatTime)}.`;
    }
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
    riftHound: 'Rift Hounds cross the room in a violet pounce, then tear away before retaliation.',
    chainHexer: 'Chain Hexers launch hooked runes that bind the hero in place for approaching monsters.',
    bellmawJuggernaut: 'Bellmaw Juggernauts toll their iron torsos, releasing crushing shockwaves in every direction.',
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
    astralrootSpriggan: 'Astralroot Spriggans dart between crystal roots, carving once with both claws before springing away.',
    leyshardWisp: 'Leyshard Wisps hover above the grove floor and hurl condensed ley light from their orbiting crystal fragments.',
    starbranchStag: 'Starbranch Stags lower their constellation antlers before a charge that fractures stamina and scatters formations.',
    prismhideBeast: 'Prismhide Beasts advance like living fortress walls and crush anything trapped beneath their crystal armour.',
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
  if (state.lastBossDefeatTime != null) {
    waveSplashWarning.textContent += `${waveSplashWarning.textContent ? ' ' : ''}Boss defeated in ${formatBossFightTime(state.lastBossDefeatTime)}.`;
  }
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
    clockworkArchon: { name: 'Clockwork Archon', image: 'assets/themes/clockwork-citadel/clockwork-archon.png', warning: 'The Archon alternates Chronoblade rushes, radial clockbursts, freezing Time Locks, and Clockwork Orb summons.' },
    clockworkSeraph: { name: 'Aurelius, the Clockwork Seraph', image: 'assets/themes/clockwork-seraph/clockwork-seraph.png', warning: 'Aurelius sweeps with a chrono-halberd, opens lance portals, launches feather barrages, and calls down Clockfall.' },
    gravebloomColossus: { name: 'Gravebloom Colossus', image: 'assets/themes/gravebloom-colossus/gravebloom-colossus.png', warning: 'Stay clear of the tombstone maul and the poisonous gravebloom spreading beneath it.' },
    lunarKitsune: { name: 'Lunar Kitsune Sovereign', image: 'assets/themes/lunar-kitsune/lunar-kitsune.png', warning: 'Its crescent glaive is swift; watch the tails before a moon-powered rush.' },
    eternityWarden: { name: 'The Eternity Warden', image: 'assets/themes/eternity-warden/eternity-warden.png', warning: 'The final guardian bends time around enormous blade strikes. Spend every resource you have.' },
    octopusBoss: { name: 'The Abyssal Leviathan', image: 'assets/themes/abyssal-leviathan/octopus-boss.png', warning: 'Dodge its crushing tentacles, escape the constriction rings, and destroy summoned Abyssal Tentacles before they surround you.' },
    woodBoss: { name: 'Heartwood Horror', image: 'assets/themes/moonwood/wood-boss.png', warning: 'It summons reinforcements as it weakens, then tears open the arena with a massive Heartwood Eruption.' },
  };
  const details = bossDetails[state.boss.variant] || {
    name: 'Dungeon Guardian',
    image: 'assets/themes/shadow-realm/shadow-boss.png',
    warning: 'It grows more dangerous with every victory you have taken from the dungeon.',
  };
  state.threatSplashOpen = true;
  hardWaveActions.classList.add('hidden');
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
  if (state.boss.spawnBlast && !state.pantheonFinalTrial) {
    waveSplashWarning.textContent += `${waveSplashWarning.textContent ? ' ' : ''}SPAWN BLAST: move outside the marked circle while the boss materializes.`;
  }
  if (state.pantheonMode && state.lastBossDefeatTime != null) {
    waveSplashWarning.textContent += `${waveSplashWarning.textContent ? ' ' : ''}Previous boss time: ${formatBossFightTime(state.lastBossDefeatTime)}.`;
  }
  waveSplash.classList.remove('hidden');
}

// Shows a fallen-hero proverb and any newly unlocked gear after a boss victory.
function showHeroVictorySplash() {
  state.pendingWaveSplash = false;
  state.threatSplashOpen = true;
  hardWaveActions.classList.remove('hidden');
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
  if (state.lastBossDefeatTime != null) {
    waveSplashWarning.textContent += ` Fight time: ${formatBossFightTime(state.lastBossDefeatTime)}.`;
  }
  waveSplash.classList.remove('hidden');
}

// Converts the already-built dungeon population into an optional double-stat
// challenge. Boss encounters remain separate from the selected wave difficulty.
function beginHardWave() {
  if (!state.threatSplashOpen || state.boss || state.hardWaveActive) return;
  state.hardWaveActive = true;
  state.hardWaveRewarded = false;
  for (const enemy of state.enemies) {
    enemy.maxHealth *= 2;
    enemy.health *= 2;
    enemy.damage *= 2;
    enemy.hardWaveEnemy = true;
  }
  const championCandidates = state.enemies.filter((enemy) => !enemy.specialEnemy && !enemy.bossMinion);
  const champion = championCandidates.length > 0
    ? championCandidates[Math.floor(Math.random() * championCandidates.length)]
    : null;
  if (champion) {
    const championNames = ['Aurek', 'Veyra', 'Morgrin', 'Sable', 'Tharos', 'Nyxar', 'Kaelis', 'Drevan'];
    const championTitles = ['Unbroken', 'Relic-Bound', 'Last Oath', 'Dungeon-Crowned', 'Iron Vow', 'Wave-Eater'];
    champion.championSpeciesName = getEnemyDisplayName(champion);
    champion.championOriginalHealth = champion.maxHealth / 2;
    champion.championOriginalDamage = champion.damage / 2;
    champion.champion = true;
    champion.elite = true;
    champion.championName = `${championNames[Math.floor(Math.random() * championNames.length)]}, the ${championTitles[Math.floor(Math.random() * championTitles.length)]}`;
    // The whole Hard Wave is already 2x. Multiplying the chosen champion by
    // another 2.5 makes it exactly 5x its original stats overall.
    champion.maxHealth *= 2.5;
    champion.health *= 2.5;
    champion.damage *= 2.5;
    champion.radius += 5;
  }
  if (!champion) {
    closeThreatSplash();
    setMessage(`Hard Wave ${state.wave}: enemy health and damage doubled. Clear it to claim a relic!`, true);
    return;
  }
  state.gearChoiceOpen = false;
  waveArmoryButton.classList.add('hidden');
  hardWaveActions.classList.add('hidden');
  waveSplashKicker.textContent = `Hard Wave ${state.wave} - Named Champion`;
  waveSplashTitle.classList.remove('ally-splash-title');
  waveSplashTitle.textContent = champion.championName;
  waveSplashEnemies.replaceChildren();
  const championImage = document.createElement('img');
  championImage.src = getEnemySplashArt(champion);
  championImage.alt = `${champion.championName}, ${champion.championSpeciesName} champion`;
  waveSplashEnemies.appendChild(championImage);
  waveSplashText.classList.remove('hero-splash-proverb');
  waveSplashText.textContent = `${champion.championSpeciesName} promoted to a named champion. Defeat it to claim its guaranteed reinforced crate.`;
  waveSplashWarning.textContent = `Original: ${Math.round(champion.championOriginalHealth).toLocaleString()} health / ${champion.championOriginalDamage.toFixed(1)} damage - Champion: ${Math.round(champion.maxHealth).toLocaleString()} health / ${champion.damage.toFixed(1)} damage / ${Math.round(champion.speed)} speed`;
  waveSplashContinuePrompt.textContent = 'Press any key to begin the Hard Wave';
  keys.clear();
}

function awardHardWaveRelic() {
  if (!state.hardWaveActive || state.hardWaveRewarded) return;
  state.hardWaveRewarded = true;
  const relic = biomeRelics[world.themeIndex] || biomeRelics[0];
  const newlyDiscovered = !journalDiscoveries.has(relic.id);
  const completedCollectionBefore = hasRelicCompletionTitle();
  const firstThisRun = !state.relics.some((collected) => collected.id === relic.id);
  if (firstThisRun) {
    state.relics.push({ id: relic.id, name: relic.name, wave: state.wave });
    player.maxHealth += 5;
  }
  discoverJournalEntry(relic.id);
  const titleJustUnlocked = !completedCollectionBefore && hasRelicCompletionTitle();
  player.health = clamp(player.health + 20, 0, player.maxHealth);
  addScore(500 * state.wave);
  spawnBurst(player.x, player.y, 42, relic.color, 170);
  setMessage(titleJustUnlocked
    ? `${relic.name} completes the collection! Title unlocked: ${relicCompletionTitle}.`
    : newlyDiscovered
    ? `${relic.name} discovered and permanently added to the Journal!`
    : `${relic.name} recovered again. +20 health and bonus score.`, true);
}

// Resumes the paused transition after a threat screen is dismissed.
function closeThreatSplash() {
  state.threatSplashOpen = false;
  state.gearChoiceOpen = false;
  waveSplashContinuePrompt.textContent = 'Press any key to continue';
  waveArmoryButton.classList.add('hidden');
  hardWaveActions.classList.add('hidden');
  keys.clear();
  waveSplash.classList.add('hidden');
  if (state.boss && state.boss.health > 0) {
    state.bossIntroDuration = state.boss.spawnBlast && !state.pantheonFinalTrial ? 1.8 : 1.5;
    state.bossIntroTimer = state.bossIntroDuration;
    for (const boss of getActiveBosses()) boss.cooldown = Math.max(boss.cooldown, state.bossIntroDuration + 0.35);
    setMessage(state.boss.spawnBlast && !state.pantheonFinalTrial
      ? 'SPAWN BLAST! Run outside the marked circle before the boss finishes materializing!'
      : 'The boss is materializing. Move now and choose your opening position!', true);
  }
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

// Keeps legionaries on a valid room route while narrowing the shield wall to
// a two-abreast marching column through doors. Rear ranks queue behind instead
// of forcing the outer soldiers into the doorway edges.
function getLegionNavigationTarget(protector, target) {
  const waypoint = getProtectorNavigationTarget(protector, target);
  const protectorRoom = getContainingRoom(protector);
  const targetRoom = getContainingRoom(target);
  if (protectorRoom && protectorRoom === targetRoom) return waypoint;

  const dx = waypoint.x - protector.x;
  const dy = waypoint.y - protector.y;
  const length = Math.hypot(dx, dy) || 1;
  const laneSide = protector.formationIndex % 2 === 0 ? -1 : 1;
  const lane = laneSide * Math.min(11, Math.max(7, (doorWidth - protector.radius * 4) / 4));
  const rank = Math.floor(protector.formationIndex / 2) + (protector.legionCohort || 0) * 2;
  const queueSpacing = rank * (protector.radius * 2 + 8);
  return {
    x: waypoint.x + (-dy / length) * lane - (dx / length) * queueSpacing,
    y: waypoint.y + (dx / length) * lane - (dy / length) * queueSpacing,
  };
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

function pushCircleOutsideRect(entity, candidate, rect) {
  const closestX = clamp(candidate.x, rect.x, rect.x + rect.w);
  const closestY = clamp(candidate.y, rect.y, rect.y + rect.h);
  let dx = candidate.x - closestX;
  let dy = candidate.y - closestY;
  const radius = entity.radius || 0;
  const overlapDistance = Math.hypot(dx, dy);
  if (overlapDistance >= radius) return;
  if (overlapDistance > 0.001) {
    candidate.x += dx / overlapDistance * (radius - overlapDistance);
    candidate.y += dy / overlapDistance * (radius - overlapDistance);
    return;
  }
  const exits = [
    { distance: Math.abs(candidate.x - rect.x), x: rect.x - radius, y: candidate.y },
    { distance: Math.abs(rect.x + rect.w - candidate.x), x: rect.x + rect.w + radius, y: candidate.y },
    { distance: Math.abs(candidate.y - rect.y), x: candidate.x, y: rect.y - radius },
    { distance: Math.abs(rect.y + rect.h - candidate.y), x: candidate.x, y: rect.y + rect.h + radius },
  ].sort((a, b) => a.distance - b.distance);
  candidate.x = exits[0].x;
  candidate.y = exits[0].y;
}

function resolveSecretRoomCollision(room, entity, candidate) {
  const secret = room.secret;
  if (!secret) return;
  const partitionThickness = 18;
  const doorHalf = 44;
  const doorCenter = secret.y + secret.h / 2;
  const walls = [
    { x: secret.x, y: secret.y + secret.h - partitionThickness, w: secret.w, h: partitionThickness },
  ];
  if (secret.opened) {
    walls.push(
      { x: secret.x, y: secret.y, w: partitionThickness, h: doorCenter - doorHalf - secret.y },
      { x: secret.x, y: doorCenter + doorHalf, w: partitionThickness, h: secret.y + secret.h - doorCenter - doorHalf },
    );
  } else {
    walls.push({ x: secret.x, y: secret.y, w: partitionThickness, h: secret.h });
  }
  walls.forEach((wall) => pushCircleOutsideRect(entity, candidate, wall));
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
      || state.boss.variant === 'drownedBell'
      || state.boss.variant === 'mysticalWarden';
    if (circularArena) {
      const centerX = state.bossArena.x + state.bossArena.w / 2;
      const centerY = state.bossArena.y + state.bossArena.h / 2;
      const inkboundArena = state.boss.variant === 'inkboundArchivist';
      const mysticalArena = state.boss.variant === 'mysticalWarden';
      const radiusX = state.bossArena.w * (inkboundArena ? 0.4 : 0.43) - entity.radius;
      const radiusY = state.bossArena.h * (inkboundArena ? 0.36 : mysticalArena ? 0.37 : 0.41) - entity.radius;
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

  resolveSecretRoomCollision(room, entity, candidate);

  candidate.x = clamp(candidate.x, 0, world.width);
  candidate.y = clamp(candidate.y, 0, world.height);
  if (state.survivalArenaMode) {
    const arena = getSurvivalArenaRoom();
    const floorInsetX = 430;
    const floorInsetY = 320;
    candidate.x = clamp(candidate.x, arena.x + floorInsetX + entity.radius, arena.x + arena.w - floorInsetX - entity.radius);
    candidate.y = clamp(candidate.y, arena.y + floorInsetY + entity.radius, arena.y + arena.h - floorInsetY - entity.radius);
    for (const obstacle of state.survivalArenaObstacles) {
      const dx = candidate.x - obstacle.x;
      const dy = candidate.y - obstacle.y;
      const minimumDistance = obstacle.radius + entity.radius;
      const obstacleDistance = Math.hypot(dx, dy);
      if (obstacleDistance >= minimumDistance) continue;
      const safeDistance = obstacleDistance || 1;
      candidate.x = obstacle.x + dx / safeDistance * minimumDistance;
      candidate.y = obstacle.y + dy / safeDistance * minimumDistance;
    }
  }
  return candidate;
}

// Builds one wave-scaled enemy with a weighted type and combat profile.
function createEnemy(room, index, forcedType = null) {
  const easyTypes = ['walker', 'runner'];
  const mediumTypes = ['crawler', 'spitter', 'burrower', 'arcaneOrb'];
  const hardTypes = ['brute', 'assassin', 'sentinel', 'reaper', 'riftHound', 'chainHexer', 'bellmawJuggernaut'];
  const hardChance = Math.min(0.38, 0.01 + (state.wave - 1) * 0.022);
  const mediumChance = Math.min(0.34, 0.1 + (state.wave - 1) * 0.025);
  const wraithChance = Math.min(0.06, (state.wave - 3) * 0.008); // Wraiths are now rare, starting wave 4
  const typeRoll = Math.random();
  let type;
  // Check for rare wraith spawn first
  if (typeRoll < wraithChance) {
    type = 'wraith';
  } else if (typeRoll < wraithChance + hardChance) {
    type = hardTypes[Math.floor(Math.random() * hardTypes.length)];
  } else if (typeRoll < wraithChance + hardChance + mediumChance) {
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
    attackSheetEnabled: Math.random() < getMobAttackSheetChance(state.wave, false),
  };

  if (room.secret && base.x > room.secret.x - 40 && base.y < room.secret.y + room.secret.h + 35) {
    base.x = room.secret.x - 70;
    base.y = room.secret.y + room.secret.h + 70;
  }

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
  if (type === 'riftHound') {
    base.speed = 176;
    base.health = 58 + state.wave * 10;
    base.damage = 13 + state.wave * 1.9;
    base.radius = 20;
  }
  if (type === 'chainHexer') {
    base.speed = 92;
    base.health = 64 + state.wave * 11;
    base.damage = 12 + state.wave * 1.8;
    base.radius = 19;
  }
  if (type === 'bellmawJuggernaut') {
    base.speed = 54;
    base.health = 142 + state.wave * 18;
    base.damage = 18 + state.wave * 2.7;
    base.radius = 28;
  }
  if (type === 'waxAcolyte') {
    base.speed = 126;
    base.health = 82 + state.wave * 11;
    base.damage = 11 + state.wave * 1.45;
    base.radius = 20;
  }
  if (type === 'octopusMinion') {
    base.speed = 88;
    base.health = 76 + state.wave * 10;
    base.damage = 11 + state.wave * 1.6;
    base.radius = 22;
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
    base.speed = 145; base.health = 138 + state.wave * 17; base.damage = 18 + state.wave * 2.5; base.radius = 24;
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
  if (type === 'astralrootSpriggan') {
    base.speed = 166; base.health = 68 + state.wave * 10; base.damage = 11 + state.wave * 1.7; base.radius = 18;
  }
  if (type === 'leyshardWisp') {
    base.speed = 142; base.health = 88 + state.wave * 12; base.damage = 14 + state.wave * 2; base.radius = 20;
  }
  if (type === 'starbranchStag') {
    base.speed = 154; base.health = 142 + state.wave * 18; base.damage = 18 + state.wave * 2.5; base.radius = 25;
  }
  if (type === 'prismhideBeast') {
    base.speed = 64; base.health = 238 + state.wave * 26; base.damage = 23 + state.wave * 3; base.radius = 31;
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
  if (type === 'cinderImp') {
    base.speed = 158; base.health = 72 + state.wave * 11; base.damage = 13 + state.wave * 1.9; base.radius = 18;
  }
  if (type === 'abyssJellyNew') {
    base.speed = 112; base.health = 118 + state.wave * 16; base.damage = 16 + state.wave * 2.2; base.radius = 24;
  }
  if (type === 'frostDirewolf') {
    base.speed = 168; base.health = 205 + state.wave * 24; base.damage = 23 + state.wave * 3; base.radius = 29;
  }
  if (type === 'boneShieldbearer') {
    base.speed = 78; base.health = 235 + state.wave * 26; base.damage = 21 + state.wave * 2.8; base.radius = 28;
  }
  const bonySkeletonStats = {
    skell1: [94, 92, 13, 13, 1.9, 22],
    skell2: [88, 76, 11, 12, 1.8, 20],
    skell3: [102, 108, 15, 15, 2.1, 23],
    skell4: [82, 142, 18, 18, 2.4, 25],
    skell5: [142, 176, 22, 20, 2.7, 29],
    skell6: [74, 238, 27, 24, 3.1, 31],
    skell7: [80, 205, 24, 21, 2.8, 29],
    skell8: [106, 168, 21, 19, 2.6, 27],
    skell9: [116, 188, 23, 22, 2.9, 28],
    skell10: [148, 154, 20, 21, 2.8, 25],
  }[type];
  if (bonySkeletonStats) {
    const [speed, healthBase, healthWave, damageBase, damageWave, radius] = bonySkeletonStats;
    base.speed = speed;
    base.health = healthBase + state.wave * healthWave;
    base.damage = damageBase + state.wave * damageWave;
    base.radius = radius;
  }
  if (type === 'amethystColossus') {
    base.speed = 52; base.health = 310 + state.wave * 32; base.damage = 27 + state.wave * 3.4; base.radius = 33;
  }

  const umbralStats = {
    veilbornShade: [132, 74, 11, 12, 1.8, 20],
    eclipseShrike: [184, 66, 10, 13, 1.9, 20],
    singularityEye: [108, 102, 14, 15, 2.1, 24],
    nightcoilDrake: [154, 138, 17, 18, 2.5, 27],
    duskweaver: [116, 94, 13, 14, 2, 22],
    voidPanther: [176, 156, 19, 20, 2.7, 27],
    eclipseReaper: [78, 224, 24, 24, 3, 31],
    gloomfinSerpent: [164, 118, 16, 17, 2.3, 24],
    starlessCourser: [192, 172, 20, 21, 2.8, 29],
    eclipseSpider: [86, 196, 22, 18, 2.5, 30],
  }[type];
  if (umbralStats) {
    const [speed, healthBase, healthWave, damageBase, damageWave, radius] = umbralStats;
    base.speed = speed; base.health = healthBase + state.wave * healthWave;
    base.damage = damageBase + state.wave * damageWave; base.radius = radius;
  }

  const hauntedStats = {
    ghost1: [92, 176, 20, 20, 2.7, 26],
    ghost2: [154, 132, 17, 18, 2.4, 23],
    ghost3: [118, 148, 18, 19, 2.5, 24],
    ghost4: [172, 248, 27, 25, 3.2, 31],
    ghost5: [108, 218, 24, 24, 3, 29],
  }[type];
  if (hauntedStats) {
    const [speed, healthBase, healthWave, damageBase, damageWave, radius] = hauntedStats;
    base.speed = speed;
    base.health = healthBase + state.wave * healthWave;
    base.damage = damageBase + state.wave * damageWave;
    base.radius = radius;
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
    1: ['abyssalRazorfin', 'abyssJellyNew', 'oceanHippo'],
    2: ['cinderImp', 'magmaSerpent', 'lavaTiger', 'lavaEagle'],
    3: ['frostWraith', 'frostwingDrake', 'icefangBear', 'frosthornRam', 'frostDirewolf'],
    5: ['skell1', 'skell2', 'skell3', 'skell5', 'boneRaven', 'skell4', 'skell7', 'gravewingRaven', 'skell8', 'skell9', 'boneShieldbearer', 'skell6', 'skell10'],
    6: ['sandRoller', 'sunfeatherGriffin'],
    7: ['voidSerpent', 'voidwingDrake'],
    8: ['prismMoth', 'crystalLion', 'crystalBobcat', 'amethystColossus'],
    9: ['starlingMarauder', 'cometHound', 'astralSentinel'],
    10: ['sunscaleRay', 'reefclawCrab', 'tidefangEel', 'coralbackTurtle'],
    11: ['astralrootSpriggan', 'leyshardWisp', 'starbranchStag', 'prismhideBeast'],
    12: ['veilbornShade', 'eclipseShrike', 'duskweaver', 'gloomfinSerpent', 'singularityEye', 'voidPanther', 'nightcoilDrake', 'eclipseSpider', 'starlessCourser', 'eclipseReaper'],
    13: ['ghost1', 'ghost2', 'ghost3', 'ghost4', 'ghost5'],
  };
  const fullPool = biomePools[world.themeIndex] || [];
  // Large, fast, or heavily armoured signature creatures are late-wave
  // reveals. Opening waves establish each biome with its simpler wildlife.
  const specialistMinimumWave = {
    lushSporeShroom: 3,
    glowBat: 4,
    crystalStalker: 5,
    oceanHippo: 6,
    abyssJellyNew: 5,
    reefclawCrab: 4,
    sunscaleRay: 1,
    tidefangEel: 4,
    coralbackTurtle: 8,
    abyssalRazorfin: 4,
    magmaSerpent: 5,
    lavaTiger: 7,
    lavaEagle: 7,
    cinderImp: 4,
    frostWraith: 4,
    frostwingDrake: 6,
    frosthornRam: 7,
    icefangBear: 6,
    frostDirewolf: 10,
    boneRaven: 5,
    gravewingRaven: 8,
    boneShieldbearer: 9,
    skell1: 1,
    skell2: 1,
    skell3: 2,
    skell5: 4,
    skell4: 5,
    skell7: 6,
    skell8: 7,
    skell9: 8,
    skell6: 10,
    skell10: 11,
    sandRoller: 7,
    sunfeatherGriffin: 9,
    voidSerpent: 7,
    voidwingDrake: 9,
    crystalBobcat: 9,
    crystalLion: 11,
    prismMoth: 5,
    amethystColossus: 11,
    starlingMarauder: 1,
    cometHound: 4,
    astralSentinel: 8,
    astralrootSpriggan: 1,
    leyshardWisp: 3,
    starbranchStag: 5,
    prismhideBeast: 8,
    veilbornShade: 1,
    eclipseShrike: 1,
    duskweaver: 2,
    gloomfinSerpent: 3,
    singularityEye: 4,
    voidPanther: 5,
    nightcoilDrake: 6,
    eclipseSpider: 7,
    starlessCourser: 9,
    eclipseReaper: 11,
    ghost1: 8,
    ghost2: 8,
    ghost3: 9,
    ghost4: 11,
    ghost5: 10,
  };
  const eligiblePool = fullPool.filter((type) => wave >= (specialistMinimumWave[type] || 1));
  // More dangerous biome species join the roster gradually rather than all
  // appearing during the opening wave.
  const unlockedSpecies = world.themeIndex === 13
    ? eligiblePool.length
    : world.themeIndex === 5
      ? Math.min(eligiblePool.length, 2 + Math.floor((wave - 1) * 0.85))
      : Math.min(eligiblePool.length, 1 + Math.floor((wave - 1) / 3));
  return eligiblePool.slice(0, unlockedSpecies);
}

function getSpecialistQuota(wave, population) {
  return Math.min(population, 1 + Math.floor((Math.min(wave, 14) - 1) / 2));
}

const formationHumanoidTypes = new Set([
  'walker', 'runner', 'assassin', 'sentinel', 'reaper', 'chainHexer',
  'desertMummy', 'desertArcher', 'abyssKnight', 'skeletonMinion',
  'boneShieldbearer', 'skell1', 'skell2', 'skell3', 'skell4', 'skell6',
  'skell7', 'skell8', 'skell9',
  'lavaMinion', 'iceMinion', 'woodMinion', 'mechMinion', 'waxAcolyte',
  'starlingMarauder', 'astralSentinel', 'duskweaver', 'eclipseReaper',
  'ghost1', 'ghost2', 'ghost3', 'ghost5',
]);
const formationRangedTypes = new Set(['chainHexer', 'desertArcher', 'waxAcolyte', 'duskweaver', 'skell2', 'skell4', 'ghost1', 'ghost3']);
const formationShieldTypes = new Set(['sentinel', 'abyssKnight', 'skeletonMinion', 'boneShieldbearer', 'skell1', 'skell3', 'skell7', 'mechMinion', 'astralSentinel']);

// Adds a small number of authored tactical groups in later waves. Every member
// uses a humanoid body type so beasts and abstract creatures still hunt alone.
function formLateWaveEnemyGroups() {
  if (state.wave < 8) return;
  const candidates = state.enemies.filter((enemy) => (
    !enemy.aggro
    && formationHumanoidTypes.has(enemy.type)
    && enemy.spawnRoom !== state.rooms[0]
  ));
  candidates.sort(() => Math.random() - 0.5);
  const groupLimit = state.wave >= 13 ? 2 : 1;
  const usedRooms = new Set();

  for (let groupIndex = 0; groupIndex < groupLimit; groupIndex += 1) {
    const anchor = candidates.find((enemy) => !usedRooms.has(enemy.spawnRoom));
    if (!anchor || Math.random() >= 0.48) break;
    const room = anchor.spawnRoom;
    usedRooms.add(room);
    const formationTypes = ['huntingPack', 'protectiveCircle'];
    if (formationShieldTypes.has(anchor.type)) formationTypes.push('shieldWall');
    if (formationRangedTypes.has(anchor.type)) formationTypes.push('rangedLine');
    const formation = formationTypes[Math.floor(Math.random() * formationTypes.length)];
    const memberCount = formation === 'protectiveCircle' ? 4 : 3;
    const members = [anchor];
    for (let memberIndex = 1; memberIndex < memberCount; memberIndex += 1) {
      const member = createEnemy(room, state.enemies.length + memberIndex, anchor.type);
      member.aggro = false;
      state.enemies.push(member);
      members.push(member);
    }
    const centerX = room.x + room.w / 2;
    const centerY = room.y + room.h / 2;
    const leader = formation === 'protectiveCircle' ? members[0] : members[Math.floor(members.length / 2)];
    members.forEach((member, memberIndex) => {
      const lineOffset = (memberIndex - (members.length - 1) / 2) * 54;
      const angle = memberIndex / members.length * Math.PI * 2;
      member.x = formation === 'protectiveCircle' ? centerX + Math.cos(angle) * 72 : centerX + lineOffset;
      member.y = formation === 'huntingPack'
        ? centerY + Math.abs(lineOffset) * 0.55
        : formation === 'rangedLine' ? centerY + 85 : centerY;
      member.formationType = formation;
      member.formationIndex = memberIndex;
      member.formationLeader = leader;
      member.formationSize = members.length;
      member.idleTargetX = member.x;
      member.idleTargetY = member.y;
      member.idleMoveTimer = 999;
    });
  }
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
    ? world.themeIndex === 13
      ? guardCount + roamingCount
      : getSpecialistQuota(authoredWave, guardCount + roamingCount)
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
  formLateWaveEnemyGroups();
}

const pantheonFinalEnemyRoster = {
  lushGolem: ['lushMossling', 'lushSporeShroom', 'crystalStalker'],
  lavaGolem: ['lavaMinion', 'lavaSpider', 'lavaTank', 'magmaSerpent', 'lavaTiger', 'lavaEagle'],
  oceanBoss: ['oceanMinion', 'oceanTank', 'oceanHippo'],
  iceBoss: ['iceMinion', 'icefangBear', 'frostWraith', 'frosthornRam'],
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
  clockworkArchon: ['clockworkOrb', 'mechMinion'],
  clockworkSeraph: ['clockworkOrb', 'sentinel'],
  gravebloomColossus: ['corruptedStag', 'fungalOozeSnail'],
  lunarKitsune: ['shadowCat', 'frostWraith'],
  eternityWarden: ['sentinel', 'reaper'],
  octopusBoss: ['octopusMinion', 'abyssalRazorfin'],
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
    enemy.attackSheetEnabled = Math.random() < getMobAttackSheetChance(state.wave, true);
    ensureEnemyHasBestiaryEntry(enemy);
    state.enemies.push(enemy);
  });
}

// Adds one restrained, biome-matched sheet enemy to a boss encounter.
function summonMatchedBossMinion(boss, type, angle = 0) {
  const enemy = createEnemy({ ...state.bossArena }, state.enemies.length, type);
  const distanceFromBoss = (boss.radius || 45) + enemy.radius + 82;
  enemy.x = clamp(
    boss.x + Math.cos(angle) * distanceFromBoss,
    state.bossArena.x + enemy.radius,
    state.bossArena.x + state.bossArena.w - enemy.radius,
  );
  enemy.y = clamp(
    boss.y + Math.sin(angle) * distanceFromBoss,
    state.bossArena.y + enemy.radius,
    state.bossArena.y + state.bossArena.h - enemy.radius,
  );
  enemy.health = Math.round(enemy.health * 0.82);
  enemy.maxHealth = enemy.health;
  enemy.damage *= 0.85;
  enemy.aggro = true;
  enemy.bossMinion = true;
  enemy.attackSheetEnabled = Math.random() < getMobAttackSheetChance(state.wave, true);
  ensureEnemyHasBestiaryEntry(enemy);
  state.enemies.push(enemy);
  spawnBurst(enemy.x, enemy.y, 18, '#a78bfa', 125);
  return enemy;
}

// Creates the next tiered boss and places the party inside its arena.
function spawnBoss(pantheonTierOverride = null) {
  if (state.pantheonMode && state.bossDefeated >= 28 && pantheonTierOverride == null) {
    state.pantheonFinalTrial = true;
    const firstTier = state.pantheonFinalBatch * 3 + 1;
    const lastTier = Math.min(28, firstTier + 2);
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
  const isTwentySeventhBoss = bossTier === 27;
  const isTwentyEighthBoss = bossTier === 28;
  // Bosses 16-26 form the late-game gauntlet. Their old linear scaling was
  // overtaken too easily by upgraded armour, weapons, and companions, so this
  // ramp makes every step through the final eleven encounters more dangerous.
  const lateBossProgress = clamp((bossTier - 15) / 11, 0, 1);
  const lateBossHealthMultiplier = 1 + lateBossProgress * 1.85;
  const lateBossDamageMultiplier = 1 + lateBossProgress * 0.8;
  const lateBossAttackSpeedMultiplier = 1 + lateBossProgress * 0.55;
  const bossHealth = Math.round((470 + bossTier * 230 + Math.max(0, bossTier - 2) * 90) * lateBossHealthMultiplier);
  const bossDamage = (14 + bossTier * 5 + Math.max(0, bossTier - 2) * 1.5) * lateBossDamageMultiplier;
  state.boss = {
    x: world.width / 2,
    y: world.height / 2,
    radius: isFirstBoss ? 48 : isSecondBoss ? 52 : isThirdBoss ? 54 : isFourthBoss ? 55 : isFifthBoss ? 57 : isSixthBoss ? 58 : isSeventhBoss ? 60 : isEighthBoss ? 62 : isNinthBoss ? 64 : isTenthBoss ? 58 : isEleventhBoss ? 65 : isTwelfthBoss ? 66 : isThirteenthBoss ? 67 : isFourteenthBoss ? 68 : isFifteenthBoss ? 76 : isSixteenthBoss ? 72 : isSeventeenthBoss ? 74 : isEighteenthBoss ? 72 : isNineteenthBoss ? 76 : isTwentiethBoss ? 78 : isTwentyFirstBoss ? 82 : isTwentySecondBoss ? 76 : isTwentyThirdBoss ? 74 : isTwentyFourthBoss ? 82 : isTwentyFifthBoss ? 70 : isTwentySixthBoss ? 84 : isTwentySeventhBoss ? 88 : isTwentyEighthBoss ? 82 : 36,
    health: bossHealth,
    maxHealth: bossHealth,
    damage: bossDamage,
    tier: bossTier,
    attackSpeedMultiplier: lateBossAttackSpeedMultiplier,
    cooldown: 1.1,
    attackWindup: 0,
    attackWindupTotal: 0.38,
    attackType: isFirstBoss ? 'rootSlam' : isSecondBoss ? 'hammerSlam' : isThirdBoss ? 'tideSlam' : isFourthBoss ? 'iceSlam' : isFifthBoss ? 'boneSlam' : isSixthBoss ? 'sandSlam' : isSeventhBoss ? 'shadowSlam' : isEighthBoss ? 'abyssSlam' : isNinthBoss ? 'pincerSlam' : isTenthBoss ? 'woodSlam' : isEleventhBoss ? 'myceliumSlam' : isTwelfthBoss ? 'drillSlam' : isThirteenthBoss ? 'crystalSlam' : isFourteenthBoss ? 'staffCrush' : isFifteenthBoss ? 'dragonSwipe' : isSixteenthBoss ? 'yinYangOverhead' : isSeventeenthBoss ? 'hollowStarOverhead' : isEighteenthBoss ? 'inkboundQuill' : isNineteenthBoss ? 'crimsonScissor' : isTwentiethBoss ? 'meltedCleave' : isTwentyFirstBoss ? 'drownedSweep' : isTwentySecondBoss ? 'tridentCrush' : isTwentyThirdBoss ? 'gearHalberd' : isTwentyFourthBoss ? 'tombMaul' : isTwentyFifthBoss ? 'crescentCut' : isTwentySixthBoss ? 'epochBlade' : isTwentySeventhBoss ? 'tentacleSlam' : isTwentyEighthBoss ? 'seraphHalberd' : 'slam',
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
    yinYangSequenceIndex: 0,
    fireBreathCooldown: isFifteenthBoss ? 7 : 0,
    variant: isFirstBoss ? 'lushGolem' : isSecondBoss ? 'lavaGolem' : isThirdBoss ? 'oceanBoss' : isFourthBoss ? 'iceBoss' : isFifthBoss ? 'skeletonWarlord' : isSixthBoss ? 'sandBoss' : isSeventhBoss ? 'shadowBoss' : isEighthBoss ? 'abyssBoss' : isNinthBoss ? 'scorpionQueen' : isTenthBoss ? 'woodBoss' : isEleventhBoss ? 'fungalBoss' : isTwelfthBoss ? 'mechOverlord' : isThirteenthBoss ? 'crystalBoss' : isFourteenthBoss ? 'sandSnake' : isFifteenthBoss ? 'dragonBoss' : isSixteenthBoss ? 'yinYangBoss' : isSeventeenthBoss ? 'hollowStarBoss' : isEighteenthBoss ? 'inkboundArchivist' : isNineteenthBoss ? 'crimsonMarionette' : isTwentiethBoss ? 'meltedMonarch' : isTwentyFirstBoss ? 'drownedBell' : isTwentySecondBoss ? 'stormglassLeviathan' : isTwentyThirdBoss ? 'clockworkArchon' : isTwentyFourthBoss ? 'gravebloomColossus' : isTwentyFifthBoss ? 'lunarKitsune' : isTwentySixthBoss ? 'eternityWarden' : isTwentySeventhBoss ? 'octopusBoss' : isTwentyEighthBoss ? 'clockworkSeraph' : 'standard',
  };
  if (state.forcedBossVariant) {
    const forcedBossAttacks = {
      lushGolem: 'rootSlam', lavaGolem: 'hammerSlam', oceanBoss: 'tideSlam',
      iceBoss: 'iceSlam', skeletonWarlord: 'boneSlam', sandBoss: 'sandSlam',
      shadowBoss: 'shadowSlam', abyssBoss: 'abyssSlam', scorpionQueen: 'pincerSlam',
      woodBoss: 'woodSlam', fungalBoss: 'myceliumSlam', mechOverlord: 'drillSlam',
      crystalBoss: 'crystalSlam', sandSnake: 'staffCrush', dragonBoss: 'dragonSwipe', yinYangBoss: 'yinYangOverhead', hollowStarBoss: 'hollowStarOverhead', inkboundArchivist: 'inkboundQuill', crimsonMarionette: 'crimsonScissor', meltedMonarch: 'meltedCleave', drownedBell: 'drownedSweep', stormglassLeviathan: 'tridentCrush', clockworkArchon: 'gearHalberd', gravebloomColossus: 'tombMaul', lunarKitsune: 'crescentCut', eternityWarden: 'epochBlade', octopusBoss: 'tentacleSlam', clockworkSeraph: 'seraphHalberd', standard: 'slam',
    };
    state.boss.variant = state.forcedBossVariant;
    state.boss.attackType = forcedBossAttacks[state.forcedBossVariant] || 'slam';
  }
  const bossSpawnBlastProfiles = {
    meltedMonarch: { radius: 250, damageFraction: 0.38, color: '#f59e0b' },
    clockworkArchon: { radius: 265, damageFraction: 0.42, color: '#38bdf8' },
    darkMagicSovereign: { radius: 285, damageFraction: 0.48, color: '#8b5cf6' },
    mysticalWarden: { radius: 300, damageFraction: 0.52, color: '#22d3ee' },
  };
  state.boss.spawnBlast = bossSpawnBlastProfiles[state.boss.variant] || null;
  state.boss.spawnBlastTriggered = false;
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
    clockworkSeraph: 'Celestial gears ignite as Aurelius descends into the Clockwork Heaven...',
    octopusBoss: 'The floor floods as the Abyssal Leviathan rises from the black tide...',
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
    clockworkArchon: 'The final cog locks into place and the Judgment Engine begins to turn…',
    gravebloomColossus: 'Graves split open as ancient roots raise the cemetery arena…',
    lunarKitsune: 'Nine moonlit paths converge beneath the Sovereign’s shrine…',
    eternityWarden: 'Every clock stops as the arena at the end of time opens…',
    standard: 'The dungeon tears open its final battleground…',
  };
  setMessage(arenaArrivalPhrases[state.boss.variant] || arenaArrivalPhrases.standard);
  if (!state.pantheonFinalTrial && state.boss.variant === 'lavaGolem') summonMatchedBossMinion(state.boss, 'cinderImp', 2.5);
  if (!state.pantheonFinalTrial && state.boss.variant === 'skeletonWarlord') summonMatchedBossMinion(state.boss, 'boneShieldbearer', 2.7);
  if (!state.pantheonFinalTrial && state.boss.variant === 'abyssBoss') summonMatchedBossMinion(state.boss, 'abyssJellyNew', -2.4);
  if (!state.pantheonFinalTrial && state.boss.variant === 'crystalBoss') summonMatchedBossMinion(state.boss, 'amethystColossus', 2.8);
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
  state.perfectWaveEligible = true;
  state.merchantDamageBoost = 1;
  state.hardWaveActive = false;
  state.hardWaveRewarded = false;
  state.luckyCoinActive = false;
  state.luckyCoinBurstTimer = 0;
  state.luckyCoinBurstTargets = [];
  state.maxRooms += 1;
  createRooms();
  spawnEnemiesForWave();
  state.roomCleared = false;
  state.boss = null;
  state.enemyProjectiles = [];
  state.playerProjectiles = [];
  state.bossArenaOpen = false;
  state.bossIntroTimer = 0;
  state.bossFightTimer = 0;
  state.victoryPoseTimer = 0;
  state.victoryPoseTarget = null;
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

function reforgeBrokenArmorForBoss(bossNumber) {
  const reforgedArmor = armorSets.filter((armor) => (
    unlockedArmor.has(armor.id)
    && getArmorRepairBoss(armor) === bossNumber
    && isArmorBroken(armor)
  ));
  for (const armor of reforgedArmor) armorDurability[armor.id] = getArmorMaxDurability(armor);
  if (reforgedArmor.length > 0) {
    if (reforgedArmor.some((armor) => armor.id === equippedArmorId)) applyEquippedArmor(false);
    saveArmorCollection();
    setMessage(`${reforgedArmor.map((armor) => armor.name).join(' and ')} reforged by defeating Boss ${bossNumber}!`, true);
  }
  return reforgedArmor;
}

// Awards rising boss points, queues physical loot, heals the hero, and unlocks gear.
function rewardBossLoot() {
  state.lastBossDefeatTime = state.bossFightTimer;
  const defeatedBossNumber = state.bossDefeated + 1;
  if (state.perfectWaveEligible && !state.godMode && !state.pantheonMode && !state.arenaTrial) {
    state.pendingReinforcedCrates += 1;
    state.perfectWaveEligible = false;
    addScore(750 * state.wave);
    spawnBurst(player.x, player.y, 36, '#facc15', 155);
    setMessage('Perfect Wave! A reinforced crate will arrive with the next wave.', true);
  }
  discoverJournalEntry(state.boss?.variant);
  addScore(getBossScore(state.boss));
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
  if (defeatedBossNumber === 20 && !unlockedProtectors.has('romanLegion')) {
    unlockedProtectors.add('romanLegion');
    unseenGear.add('protector:romanLegion');
    saveArmorCollection();
    updateGearNotification();
    setMessage('Roman Legion unlocked! Select it as your Protector in the Hero Armory.');
  }
  if (defeatedBossNumber === 23 && !unlockedProtectors.has('romanSpearCohort')) {
    unlockedProtectors.add('romanSpearCohort');
    unseenGear.add('protector:romanSpearCohort');
    saveArmorCollection();
    updateGearNotification();
    setMessage('Roman Spear Cohort unlocked! Select it as your Protector in the Hero Armory.');
  }
  if (defeatedBossNumber === 25 && !unlockedProtectors.has('romanArcherCohort')) {
    unlockedProtectors.add('romanArcherCohort');
    unseenGear.add('protector:romanArcherCohort');
    saveArmorCollection();
    updateGearNotification();
    setMessage('Roman Bowman unlocked! Manually select Roman Legion with Bowman in the Hero Armory.');
  }
  reforgeBrokenArmorForBoss(defeatedBossNumber);
}

function beginVictoryPose() {
  state.victoryPoseTimer = state.victoryPoseDuration;
  const centerX = state.bossArena.x + state.bossArena.w / 2;
  const centerY = state.bossArena.y + state.bossArena.h * 0.68;
  state.victoryPoseTarget = { x: centerX, y: centerY };
  player.attackDuration = 0;
  player.walkBlend = 0;
  player.visualFacingX = 1;
  player.facing = { x: 1, y: 0 };
  const survivors = player.protectors.filter((protector) => protector.health > 0);
  survivors.forEach((protector, index) => {
    const centeredIndex = index - (survivors.length - 1) / 2;
    const legionary = protector.kind === 'legionary';
    protector.victoryTarget = {
      x: centerX + centeredIndex * (legionary ? 54 : 68),
      y: centerY + (legionary ? 72 : 62) + Math.abs(centeredIndex) * 8,
    };
    protector.isMoving = false;
    protector.facingX = centeredIndex < 0 ? 1 : -1;
    protector.attackPose = legionary ? 'jab' : index % 2 === 0 ? 'paw' : 'bite';
    protector.attackPoseTimer = state.victoryPoseDuration;
  });
  spawnBurst(centerX, centerY - 25, 52, '#fde68a', 150);
}

function updateVictoryPose(dt) {
  state.victoryPoseTimer = Math.max(0, state.victoryPoseTimer - dt);
  const target = state.victoryPoseTarget;
  if (!target) return;
  const easing = 1 - Math.exp(-dt * 6.5);
  player.x += (target.x - player.x) * easing;
  player.y += (target.y - player.y) * easing;
  player.protectors.forEach((protector) => {
    if (!protector.victoryTarget || protector.health <= 0) return;
    protector.x += (protector.victoryTarget.x - protector.x) * easing;
    protector.y += (protector.victoryTarget.y - protector.y) * easing;
    protector.isMoving = false;
    protector.attackPoseTimer = Math.max(protector.attackPoseTimer || 0, state.victoryPoseTimer);
  });
}

// Creates the four-man formation when the Roman Legion Protector is summoned.
function summonRomanLegion(spearCohort = false, includeBowman = false) {
  const legionCohort = player.protectors.reduce((highest, protector) => (
    protector.kind === 'legionary' ? Math.max(highest, protector.legionCohort || 0) : highest
  ), -1) + 1;
  for (let formationIndex = 0; formationIndex < 4; formationIndex += 1) {
    player.protectors.push({
      kind: 'legionary',
      legionCohort,
      formationIndex,
      x: player.x - 54,
      y: player.y + (formationIndex - 1.5) * 38,
      radius: 17,
      health: player.maxHealth,
      maxHealth: player.maxHealth,
      energy: 100,
      maxEnergy: 100,
      attackCooldown: formationIndex * 0.08,
      attackPoseTimer: 0,
      attackPose: 'jab',
      facingX: 1,
      retreatTimer: 0,
      retreatFromX: null,
      retreatFromY: null,
      target: null,
      walkPhase: formationIndex * Math.PI,
      level: 1,
      experience: 0,
      experienceToNext: 3,
      healthBonus: 0,
      damageBonus: 0,
      armorDefense: 40,
      shieldBlock: 0.45,
      shieldFlash: 0,
      shieldWallReformed: true,
      shieldWallLocked: true,
      romanWeapon: spearCohort ? 'spear' : 'sword',
      meleeReachMultiplier: spearCohort ? 2 : 1,
    });
  }
  if (includeBowman) {
    player.protectors.push({
      kind: 'romanArcher',
      legionCohort,
      formationIndex: 4,
      x: player.x - 115,
      y: player.y,
      radius: 17,
      health: player.maxHealth,
      maxHealth: player.maxHealth,
      energy: 100,
      maxEnergy: 100,
      attackCooldown: 0.45,
      attackPoseTimer: 0,
      facingX: 1,
      target: null,
      walkPhase: Math.PI / 2,
      level: 1,
      experience: 0,
      experienceToNext: 3,
      healthBonus: 0,
      damageBonus: 0,
    });
  }
  setMessage(`${includeBowman ? 'Roman Legion and Bowman' : spearCohort ? 'Roman Spear Cohort' : 'Roman Legion'} summoned! Four shields lock into formation.`);
}

// Converts five shards into a wolf, fifteen into sword Romans, or eighteen into spearmen.
function createProtector() {
  const romanCohortSelected = equippedProtectorId === 'romanLegion'
    || equippedProtectorId === 'romanSpearCohort'
    || equippedProtectorId === 'romanArcherCohort';
  const protectorShardCost = equippedProtectorId === 'romanSpearCohort'
    ? 18
    : equippedProtectorId === 'romanArcherCohort' ? 21
    : equippedProtectorId === 'romanLegion' ? 15 : 5;
  if (player.inventory.protectorShard < protectorShardCost) {
    const protectorName = equippedProtectorId === 'romanSpearCohort'
      ? 'the Roman Spear Cohort'
      : equippedProtectorId === 'romanArcherCohort' ? 'the Roman Legion with Bowman'
      : equippedProtectorId === 'romanLegion' ? 'the Roman Legion' : 'a protector';
    setMessage(`Need ${protectorShardCost} protector shards to summon ${protectorName}.`);
    return;
  }
  player.inventory.protectorShard -= protectorShardCost;
  if (romanCohortSelected) {
    summonRomanLegion(
      equippedProtectorId === 'romanSpearCohort',
      equippedProtectorId === 'romanArcherCohort',
    );
    return;
  }
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
    level: 1,
    experience: 0,
    experienceToNext: 3,
    healthBonus: 0,
    damageBonus: 0,
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

// Spends one rare coin to upgrade every unopened crate for this wave.
function activateLuckyCoin() {
  if (state.luckyCoinActive) {
    setMessage('Lucky Coin fortune is already active for this wave.');
    return;
  }
  if (player.inventory.luckyCoin < 1) {
    setMessage('You do not have a Lucky Coin. They are now a 1 in 1,000 loot drop.');
    return;
  }
  player.inventory.luckyCoin -= 1;
  accountSpecialLoot.luckyCoins = player.inventory.luckyCoin;
  saveAccountSpecialLoot();
  state.luckyCoinActive = true;
  const closedCrates = state.crates.filter((crate) => !crate.isOpen);
  state.luckyCoinBurstTimer = 1.15;
  state.luckyCoinBurstTargets = closedCrates.map((crate) => ({ x: crate.x, y: crate.y }));
  closedCrates.forEach((crate) => {
    crate.rewards = createCrateRewards(10);
  });
  setMessage(`Lucky Coin activated! ${closedCrates.length} unopened crate${closedCrates.length === 1 ? '' : 's'} will drop 10 items this wave.`);
}

function getArenaTrialStats(tier) {
  const lateProgress = clamp((tier - 15) / 17, 0, 1);
  const healthMultiplier = tier >= 15 ? 1.35 + lateProgress * 2.15 : 1;
  const damageMultiplier = tier >= 15 ? 1.22 + lateProgress * 1.15 : 1;
  const health = Math.round((470 + tier * 230 + Math.max(0, tier - 2) * 90) * healthMultiplier);
  const damage = (14 + tier * 5 + Math.max(0, tier - 2) * 1.5) * damageMultiplier;
  return { health, damage };
}

function getTrialArmorStats(tier) {
  return {
    tier,
    defense: Math.min(62, Math.round(24 + tier * 1.25)),
    health: Math.round(35 + tier * 5.5),
    stamina: Math.round(14 + tier * 1.15),
    thorns: Math.min(40, Math.round(12 + tier * 0.85)),
  };
}

function getTrialWeaponStats(tier) {
  return {
    tier,
    trialTier: tier,
    damage: Math.round(7 + tier * 5.1),
    reach: Math.round(5 + tier * 1.5),
  };
}

function closeArenaTrialMenu() {
  arenaTrialOverlay.classList.add('hidden');
  keys.clear();
}

function getHighestArenaTrialBossTier() {
  const armorTier = armorSets.reduce((highest, armor) => (
    armor.boss > 0 && unlockedArmor.has(armor.id) ? Math.max(highest, armor.boss) : highest
  ), 0);
  const weaponTier = weaponSets.reduce((highest, weapon) => (
    weapon.boss > 0 && unlockedWeapons.has(weapon.id) ? Math.max(highest, weapon.boss) : highest
  ), 0);
  return Math.min(godBossOrder.length, Math.max(state.bossDefeated, armorTier, weaponTier));
}

function openArenaTrialMenu() {
  const pantheonBossSplash = state.pantheonMode && state.threatSplashOpen
    && state.boss && !state.pantheonFinalTrial;
  if ((state.boss && !pantheonBossSplash) || state.arenaTrial) return;
  const highestTrialTier = getHighestArenaTrialBossTier();
  if (highestTrialTier < 1) { setMessage('Defeat at least one boss before using an Arena Key.'); return; }
  if (player.inventory.arenaKey < 1) { setMessage('You do not have an Arena Key.'); return; }
  arenaTrialGrid.replaceChildren();
  godBossOrder.slice(0, highestTrialTier).forEach((bossId, index) => {
    const tier = index + 1;
    const details = bestiaryEntries.find((entry) => entry.id === bossId);
    const stats = getArenaTrialStats(tier);
    const armorStats = getTrialArmorStats(tier);
    const armorAlreadyForged = unlockedArmor.has('trialforged');
    const lootCrates = Math.min(40, 8 + tier);
    const button = document.createElement('button');
    button.className = 'arena-trial-boss';
    button.innerHTML = `<img src="${details?.image || ''}" alt=""><div><strong>${details?.name || `Boss ${tier}`}</strong><span>Original: ${stats.health.toLocaleString()} health · ${stats.damage.toFixed(1)} damage</span><span class="trial-improved">Trial: ${(stats.health * 3).toLocaleString()} health · ${(stats.damage * 3).toFixed(1)} damage</span><span>${armorAlreadyForged
      ? `Loot victory: ${lootCrates} crates / ${lootCrates * 4} drops`
      : `Permanent armor: ${armorStats.defense}% defense · +${armorStats.health} health · +${armorStats.stamina} stamina · ${armorStats.thorns}% thorns`}</span></div>`;
    button.addEventListener('click', () => startArenaKeyTrial(tier));
    arenaTrialGrid.appendChild(button);
  });
  arenaTrialOverlay.classList.remove('hidden');
  keys.clear();
}

function startArenaKeyTrial(tier) {
  const pantheonBossSplash = state.pantheonMode && state.threatSplashOpen
    && state.boss && !state.pantheonFinalTrial;
  if (player.inventory.arenaKey < 1 || (state.boss && !pantheonBossSplash) || state.arenaTrial) return;
  player.inventory.arenaKey -= 1;
  savePersistentArenaKeys();
  closeArenaTrialMenu();
  state.arenaTrial = true;
  state.arenaTrialTier = tier;
  state.boss = null;
  state.pantheonBosses = [];
  state.enemies = []; state.crates = []; state.dungeonEvents = [];
  state.enemyProjectiles = []; state.playerProjectiles = [];
  spawnBoss(tier);
  state.boss.health *= 3; state.boss.maxHealth = state.boss.health; state.boss.damage *= 3;
  showBossSplash();
  setMessage('Arena Key consumed. The three-times-harder trial begins!');
}

function rewardArenaTrial() {
  state.lastBossDefeatTime = state.bossFightTimer;
  const tier = Math.max(1, state.arenaTrialTier || 1);
  state.arenaTrial = false;
  state.arenaTrialTier = 0;
  addScore(5000 + state.wave * 250);
  if (!unlockedArmor.has('trialforged')) {
    const forgedStats = getTrialArmorStats(tier);
    const trialArmor = armorSets.find((armor) => armor.id === 'trialforged');
    Object.assign(trialArmor, forgedStats, { trialTier: tier });
    const trialWeapon = weaponSets.find((weapon) => weapon.id === 'trialbreaker');
    const forgedWeaponStats = getTrialWeaponStats(tier);
    Object.assign(trialWeapon, forgedWeaponStats);
    try {
      window.localStorage.setItem(trialArmorStatsStorageKey, JSON.stringify(forgedStats));
      window.localStorage.setItem(trialWeaponStatsStorageKey, JSON.stringify(forgedWeaponStats));
    } catch (error) {
      // The forged values remain fixed for the current session.
    }
    unlockedArmor.add('trialforged'); unseenGear.add('armor:trialforged');
    unlockedWeapons.add('trialbreaker'); unseenGear.add('weapon:trialbreaker');
    setMessage(`Arena Trial won: Tier ${tier} Trialforged Aegis and Trialbreaker permanently unlocked!`);
  } else {
    const lootCrates = Math.min(40, 8 + tier);
    state.pendingBossCrates += lootCrates;
    setMessage(`Loot Trial won: ${lootCrates} reward crates (${lootCrates * 4} loot drops) will arrive next wave!`);
  }
  reforgeBrokenArmorForBoss(tier);
  saveArmorCollection(); updateGearNotification();
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
    || state.boss?.variant === 'drownedBell'
    || state.boss?.variant === 'mysticalWarden') {
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

function segmentCrossesArenaBarrier(x1, y1, x2, y2, padding = 0) {
  if (!state.survivalArenaMode) return false;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSquared = dx * dx + dy * dy;
  return state.survivalArenaObstacles.some((obstacle) => {
    const progress = lengthSquared > 0
      ? clamp(((obstacle.x - x1) * dx + (obstacle.y - y1) * dy) / lengthSquared, 0, 1)
      : 0;
    const nearestX = x1 + dx * progress;
    const nearestY = y1 + dy * progress;
    return Math.hypot(obstacle.x - nearestX, obstacle.y - nearestY) <= obstacle.radius + padding;
  });
}

function burstAttackOnArenaBarrier(x1, y1, x2, y2, color = '#fbbf24') {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) || 1;
  const hitX = x1 + dx / length * Math.min(length, 34);
  const hitY = y1 + dy / length * Math.min(length, 34);
  spawnBurst(hitX, hitY, 8, color, 65);
}

// Applies invulnerability, shields, armour reduction, damage, and hero knockback.
function applyCombatDamage(victim, amount, attacker = null) {
  if (attacker && Number.isFinite(attacker.x) && Number.isFinite(attacker.y)
    && segmentCrossesArenaBarrier(attacker.x, attacker.y, victim.x, victim.y, 3)) {
    burstAttackOnArenaBarrier(attacker.x, attacker.y, victim.x, victim.y);
    return false;
  }
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
  const equippedArmor = getEquippedArmor();
  const armorReduction = victim === player && !isArmorBroken(equippedArmor)
    ? Math.min(0.8, (equippedArmor.defense + (hasEternalConquerorMastery() ? 5 : 0)) / 100)
    : victim.kind === 'legionary'
      ? clamp((victim.armorDefense || 0) / 100, 0, 0.8)
      : 0;
  const shieldReduction = victim.kind === 'legionary'
    ? clamp(victim.shieldBlock ?? 0.45, 0, 0.8)
    : 0;
  if (shieldReduction > 0) {
    victim.shieldFlash = 0.18;
    spawnBurst(victim.x + (victim.facingX < 0 ? -13 : 13), victim.y, 5, '#fbbf24', 55);
  }
  if (victim === player && attacker) {
    const attackerName = getEnemyDisplayName(attacker);
    state.lastDeathCause = `an attack from the ${attackerName}`;
  }
  const healthBeforeHit = victim.health;
  // Legion shields remove 45% first; their armour then reduces the remainder.
  victim.health = Math.max(0, victim.health - amount * (1 - shieldReduction) * (1 - armorReduction));
  const damageTaken = healthBeforeHit - victim.health;
  if (victim === player && victim.health < healthBeforeHit) {
    state.perfectWaveEligible = false;
    state.crateStreak = 0;
    wearEquippedArmor(damageTaken);
  }
  if (victim === player && attacker === state.boss) {
    triggerHitStop(0.065);
  }
  if (victim === player && attacker && typeof attacker.health === 'number') {
    const thornsPercent = isArmorBroken(equippedArmor) ? 0 : equippedArmor.thorns || 0;
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
      state.perfectWaveEligible = false;
      state.crateStreak = 0;
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
  if (!state.boss && state.biomeHazards.some((hazard) => hazard.type === 'icePatch' && distance(player, hazard) < hazard.radius)) {
    speed *= 0.65;
  }
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

  if (state.godMode || state.survivalArenaMode) {
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
    state.perfectWaveEligible = false;
    state.crateStreak = 0;
    player.health = clamp(player.health - 1 * dt, 0, player.maxHealth);
  }
  if (!state.developerMode && player.hydration <= 0) {
    state.lastDeathCause = 'dehydration';
    state.perfectWaveEligible = false;
    state.crateStreak = 0;
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

function useArenaPotion() {
  if (player.inventory.arenaPotion <= 0) {
    setMessage('No Arena Elixirs remain. Reach Arena Wave 12 or 40 to earn more.');
    return;
  }
  const needsRecovery = player.health < player.maxHealth || player.food < 100 || player.hydration < 100 || player.stamina < player.maxStamina;
  if (!needsRecovery) {
    setMessage('You are already fully restored.');
    return;
  }
  player.inventory.arenaPotion -= 1;
  arenaLegacy.potions = player.inventory.arenaPotion;
  accountSpecialLoot.arenaPotions = arenaLegacy.potions;
  saveArenaLegacy();
  saveAccountSpecialLoot();
  player.health = clamp(player.health + 45, 0, player.maxHealth);
  player.food = clamp(player.food + 35, 0, 100);
  player.hydration = clamp(player.hydration + 35, 0, 100);
  player.stamina = player.maxStamina;
  spawnBurst(player.x, player.y, 24, '#fbbf24', 90);
  setMessage('Arena Elixir used: health, food, hydration, and stamina restored.');
}

function useFieldMedicPotion() {
  if ((player.inventory.fieldMedicPotion || 0) <= 0) {
    setMessage('No Field Medic Potions remain. They are rare Endless Battleground rewards.');
    return;
  }
  const survivors = player.protectors.filter((protector) => protector.health > 0);
  const needsHealing = player.health < player.maxHealth
    || survivors.some((protector) => protector.health < protector.maxHealth);
  if (!needsHealing) {
    setMessage('The hero and every surviving protector are already at full health.');
    return;
  }
  player.inventory.fieldMedicPotion -= 1;
  accountSpecialLoot.fieldMedicPotions = player.inventory.fieldMedicPotion;
  saveAccountSpecialLoot();
  player.health = clamp(player.health + player.maxHealth * 0.5, 0, player.maxHealth);
  spawnBurst(player.x, player.y, 28, '#86efac', 105);
  for (const protector of survivors) {
    protector.health = clamp(protector.health + protector.maxHealth * 0.5, 0, protector.maxHealth);
    spawnBurst(protector.x, protector.y, 18, '#86efac', 80);
  }
  setMessage(`Field Medic Potion used: healed the hero and ${survivors.length} surviving protector${survivors.length === 1 ? '' : 's'} by 50%.`, true);
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
    setMessage(state.hardWaveRewarded
      ? `${(biomeRelics[world.themeIndex] || biomeRelics[0]).name} claimed! The floor splits open beneath you!`
      : 'The floor splits open beneath you!');
  } else {
    spawnBurst(player.x, player.y, 34, '#67e8f9', 150);
    setMessage(state.hardWaveRewarded
      ? `${(biomeRelics[world.themeIndex] || biomeRelics[0]).name} claimed! Teleporting to the boss arena...`
      : 'Wave cleared! Teleporting to the boss arena...');
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

function getBowArrowTheme(weapon) {
  if (!weapon) return 'verdant';
  if (weapon.id === 'cinderBow') return 'cinder';
  if (weapon.id === 'voidBow') return 'void';
  if (weapon.id === 'tideBow' || weapon.id === 'frostBow' || weapon.id === 'glacierBow' || weapon.id === 'stormglassBow') return 'frost';
  return 'verdant';
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
    damage: (weapon.projectileDamage + player.weaponLevel * (isStaff ? 8 : 5)) * state.merchantDamageBoost,
    radius: isStaff ? 11 : 5,
    life: isStaff ? 1.8 : 1.45,
    kind: weapon.kind,
    arrowTheme: isBow ? getBowArrowTheme(weapon) : null,
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

// Sentinels reduce attacks that arrive through the shield side. Keeping this
// check shared makes melee, arrows, and staff blasts obey the same facing rule.
function applySentinelBlock(target, damage, attackX, attackY) {
  if (target.type !== 'sentinel' || target.dead) return damage;
  const incomingX = attackX - target.x;
  const incomingY = attackY - target.y;
  const incomingLength = Math.hypot(incomingX, incomingY) || 1;
  const shieldX = target.sentinelShieldDirX ?? Math.sign(target.facingX || 1);
  const shieldY = target.sentinelShieldDirY ?? 0;
  const frontalDot = incomingX / incomingLength * shieldX + incomingY / incomingLength * shieldY;
  if (frontalDot < 0.35) return damage;
  target.sentinelBlockFlash = 0.22;
  spawnBurst(target.x + shieldX * 24, target.y + shieldY * 24, 14, '#60a5fa', 115);
  triggerHitStop(0.025);
  return damage * 0.22;
}

// Performs a ranged shot or one melee swing with a fixed shared damage pool.
function tryAttack() {
  if (player.attackCooldown > 0) return;
  const equippedWeapon = getEquippedWeapon();
  if (equippedWeapon.kind !== 'melee') {
    fireRangedWeapon(equippedWeapon);
    return;
  }
  player.attackCooldown = equippedWeapon.meleeCooldown || 0.42;
  player.attackDuration = equippedWeapon.meleeCooldown
    ? Math.min(0.24, equippedWeapon.meleeCooldown * 0.58)
    : 0.24;
  const damageMultiplier = (1 + equippedWeapon.damage / 100)
    * (hasEternalConquerorMastery() ? 1.25 : 1);
  spawnBurst(player.x + player.facing.x * 24, player.y + player.facing.y * 24, 7, '#f8fafc', 80);

  const enemyRange = 70 + player.weaponLevel * 8 + equippedWeapon.reach;
  const attackCandidates = state.enemies
    .filter((enemy) => !enemy.dead
      && isInsideAttackArc(enemy, enemyRange)
      && !segmentCrossesArenaBarrier(player.x, player.y, enemy.x, enemy.y, 4));
  for (const boss of getActiveBosses()) {
    if (isInsideAttackArc(boss, 88 + player.weaponLevel * 5 + equippedWeapon.reach)
      && !segmentCrossesArenaBarrier(player.x, player.y, boss.x, boss.y, 4)) attackCandidates.push(boss);
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
  ) * damageMultiplier * state.merchantDamageBoost;
  const damagePerTarget = targets.length > 0 ? totalSwingDamage / targets.length : 0;

  for (const target of targets) {
    const targetIsBoss = getActiveBosses().includes(target);
    const championBossMultiplier = equippedWeapon.championBossDamage && (targetIsBoss || target.champion)
      ? equippedWeapon.championBossDamage
      : 1;
    const ownWeaponWeakness = targetIsBoss && equippedWeapon.boss > 0 && equippedWeapon.boss === target.tier ? 1.5 : 1;
    const appliedDamage = applySentinelBlock(target, damagePerTarget * championBossMultiplier * ownWeaponWeakness, player.x, player.y);
    target.health -= appliedDamage;
    target.hitFlash = targetIsBoss ? 0.2 : 0.18;
    target.x += player.facing.x * (targetIsBoss ? 10 : 18);
    target.y += player.facing.y * (targetIsBoss ? 10 : 18);
    if (targetIsBoss) {
      if (ownWeaponWeakness > 1 && !target.ownWeaponWeaknessRevealed) {
        target.ownWeaponWeaknessRevealed = true;
        setMessage(`${target.name || 'The boss'} is vulnerable to ${equippedWeapon.name}: +50% damage!`);
      }
      if (target.variant === 'lavaGolem' && target.attackWindup <= 0 && target.lungeTimer <= 0) {
        target.cooldown = Math.max(-0.1, target.cooldown - 0.08);
      }
      const bossHitColor = ownWeaponWeakness > 1 ? '#fde047' : target.variant === 'lavaGolem' ? '#fb923c' : target.variant === 'oceanBoss' ? '#67e8f9' : target.variant === 'iceBoss' ? '#dbeafe' : target.variant === 'skeletonWarlord' ? '#a5f3fc' : target.variant === 'sandBoss' || target.variant === 'sandSnake' ? '#fbbf24' : target.variant === 'shadowBoss' ? '#c084fc' : target.variant === 'scorpionQueen' ? '#f59e0b' : target.variant === 'woodBoss' ? '#bef264' : '#fca5a5';
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

function getFormationNavigationTarget(enemy, normalTarget, preferredTarget) {
  const leader = enemy.formationLeader;
  if (!leader || leader === enemy || leader.dead || distance(enemy, preferredTarget) < 185) return normalTarget;
  const dx = preferredTarget.x - leader.x;
  const dy = preferredTarget.y - leader.y;
  const length = Math.hypot(dx, dy) || 1;
  const forwardX = dx / length;
  const forwardY = dy / length;
  const sideX = -forwardY;
  const sideY = forwardX;
  const centeredIndex = enemy.formationIndex - (enemy.formationSize - 1) / 2;

  if (enemy.formationType === 'protectiveCircle') {
    const angle = enemy.formationIndex / enemy.formationSize * Math.PI * 2;
    return { x: leader.x + Math.cos(angle) * 68, y: leader.y + Math.sin(angle) * 68 };
  }
  if (enemy.formationType === 'huntingPack') {
    return {
      x: leader.x - forwardX * Math.abs(centeredIndex) * 42 + sideX * centeredIndex * 46,
      y: leader.y - forwardY * Math.abs(centeredIndex) * 42 + sideY * centeredIndex * 46,
    };
  }
  const spacing = enemy.formationType === 'shieldWall' ? 48 : 62;
  const rearOffset = enemy.formationType === 'rangedLine' ? -35 : 0;
  return {
    x: leader.x + sideX * centeredIndex * spacing + forwardX * rearOffset,
    y: leader.y + sideY * centeredIndex * spacing + forwardY * rearOffset,
  };
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
    enemy.reaperSweepFlash = Math.max(0, (enemy.reaperSweepFlash || 0) - dt);
    enemy.retreatTimer = Math.max(0, (enemy.retreatTimer || 0) - dt);
    if (enemy.retreatTimer === 0) enemy.contactRebound = false;

    if (!enemy.aggro) {
      enemy.idleMoveTimer = Math.max(0, (enemy.idleMoveTimer || 0) - dt);
      const idleTargetDistance = enemy.idleTargetX == null
        ? 0
        : Math.hypot(enemy.idleTargetX - enemy.x, enemy.idleTargetY - enemy.y);
      if (enemyRoom && !enemy.formationType && (enemy.idleMoveTimer <= 0 || idleTargetDistance < 10)) {
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
      } else if (enemy.type === 'wraith') {
        enemy.x = clamp(retreatX, enemy.radius, world.width - enemy.radius);
        enemy.y = clamp(retreatY, enemy.radius, world.height - enemy.radius);
      } else {
        const safeRetreat = resolveRoomCollision(enemy, retreatX, retreatY);
        enemy.x = safeRetreat.x;
        enemy.y = safeRetreat.y;
      }
      enemy.movePhase += dt * (enemy.speed / 18);
      continue;
    }

    const sentinelWard = enemy.type === 'sentinel'
      ? state.enemies
        .filter((candidate) => (
          candidate !== enemy
          && !candidate.dead
          && candidate.health > 0
          && distance(enemy, candidate) <= 220
          && (candidate.type === 'arcaneOrb'
            || candidate.type === 'spitter'
            || candidate.health / candidate.maxHealth < 0.5)
        ))
        .sort((a, b) => (
          a.health / a.maxHealth - b.health / b.maxHealth
          || distance(enemy, a) - distance(enemy, b)
        ))[0] || null
      : null;
    let navigationTarget = sentinelWard
      ? (() => {
          const threatDx = player.x - sentinelWard.x;
          const threatDy = player.y - sentinelWard.y;
          const threatLength = Math.hypot(threatDx, threatDy) || 1;
          return {
            x: sentinelWard.x + threatDx / threatLength * 54,
            y: sentinelWard.y + threatDy / threatLength * 54,
          };
        })()
      : enemy.type === 'wraith'
        ? getEnemyPreferredTarget(enemy)
        : getEnemyNavigationTarget(enemy);
    const preferredTarget = getEnemyPreferredTarget(enemy);
    navigationTarget = getFormationNavigationTarget(enemy, navigationTarget, preferredTarget);
    const directlyApproachingTarget = navigationTarget === preferredTarget;
    const dx = navigationTarget.x - enemy.x;
    const dy = navigationTarget.y - enemy.y;
    const len = Math.hypot(dx, dy) || 1;
    const dirX = dx / len;
    const dirY = dy / len;

    if (enemy.type === 'sentinel') {
      const shieldDx = player.x - enemy.x;
      const shieldDy = player.y - enemy.y;
      const shieldLength = Math.hypot(shieldDx, shieldDy) || 1;
      enemy.sentinelShieldDirX = shieldDx / shieldLength;
      enemy.sentinelShieldDirY = shieldDy / shieldLength;
      enemy.sentinelWard = sentinelWard;
      enemy.sentinelBlockFlash = Math.max(0, (enemy.sentinelBlockFlash || 0) - dt);
    }

    if (enemy.type === 'bellmawJuggernaut') {
      const bellTarget = getEnemyPreferredTarget(enemy);
      if ((enemy.bellmawCharge || 0) > 0) {
        enemy.bellmawCharge = Math.max(0, enemy.bellmawCharge - dt);
        enemy.lunge = Math.max(enemy.lunge, 0.4);
        if (enemy.bellmawCharge === 0) {
          for (const victim of [player, ...player.protectors, ...player.openers]) {
            if (victim.health > 0 && distance(enemy, victim) <= 225 + victim.radius) {
              const landed = applyCombatDamage(victim, enemy.damage * 1.18, enemy);
              if (victim === player && landed) {
                player.stamina = Math.max(0, player.stamina - 24);
                knockHeroAwayFrom(enemy, 64);
              }
            }
          }
          enemy.bellmawFlash = 0.3;
          spawnBurst(enemy.x, enemy.y, 40, '#fbbf24', 220);
          triggerHitStop(0.055);
          state.shake = Math.max(state.shake, 15);
        }
        continue;
      }
      enemy.bellmawFlash = Math.max(0, (enemy.bellmawFlash || 0) - dt);
      if (enemy.attackTimer <= 0 && distance(enemy, bellTarget) <= 260) {
        enemy.attackTimer = 3.2;
        enemy.bellmawCharge = 1.05;
        spawnBurst(enemy.x, enemy.y, 15, '#fde68a', 70);
        continue;
      }
    }

    // Reapers lock a broad scythe arc during a long wind-up. The committed
    // facing makes the sweep sidesteppable, while its recovery rewards a dodge.
    if (enemy.type === 'reaper') {
      const reaperTarget = enemy.reaperTarget || getEnemyPreferredTarget(enemy);
      if ((enemy.reaperSweepWindup || 0) > 0) {
        enemy.reaperSweepWindup = Math.max(0, enemy.reaperSweepWindup - dt);
        enemy.lunge = Math.max(enemy.lunge, 0.45);
        if (enemy.reaperSweepWindup === 0) {
          const sweepDirX = enemy.reaperSweepDirX || Math.sign(enemy.facingX || 1);
          const sweepDirY = enemy.reaperSweepDirY || 0;
          for (const victim of [player, ...player.protectors, ...player.openers]) {
            if (victim.health <= 0) continue;
            const victimDx = victim.x - enemy.x;
            const victimDy = victim.y - enemy.y;
            const victimDistance = Math.hypot(victimDx, victimDy) || 1;
            const forwardDot = victimDx / victimDistance * sweepDirX
              + victimDy / victimDistance * sweepDirY;
            if (victimDistance <= enemy.radius + victim.radius + 112 && forwardDot >= Math.cos(82 * Math.PI / 180)) {
              const damageLanded = applyCombatDamage(victim, enemy.damage * 1.72, enemy);
              if (victim === player && damageLanded) {
                player.stamina = Math.max(0, player.stamina - 20);
                knockHeroAwayFrom(enemy, 52);
                triggerHitStop(0.065);
              }
              spawnBurst(victim.x, victim.y, 20, '#e879f9', 165);
            }
          }
          enemy.reaperSweepFlash = 0.22;
          enemy.reaperTarget = null;
          enemy.retreatTimer = 0.72;
          enemy.retreatFromX = reaperTarget.x;
          enemy.retreatFromY = reaperTarget.y;
          spawnBurst(
            enemy.x + sweepDirX * 58,
            enemy.y + sweepDirY * 58,
            28,
            '#d946ef',
            185,
          );
          state.shake = Math.max(state.shake, 12);
        }
        continue;
      }
      const reaperDistance = distance(enemy, reaperTarget);
      if (enemy.attackTimer <= 0 && reaperDistance <= enemy.radius + reaperTarget.radius + 125) {
        const sweepDx = reaperTarget.x - enemy.x;
        const sweepDy = reaperTarget.y - enemy.y;
        const sweepLength = Math.hypot(sweepDx, sweepDy) || 1;
        enemy.attackTimer = 2.75;
        enemy.reaperTarget = reaperTarget;
        enemy.reaperSweepDirX = sweepDx / sweepLength;
        enemy.reaperSweepDirY = sweepDy / sweepLength;
        enemy.facingX = enemy.reaperSweepDirX;
        enemy.reaperSweepWindup = 0.88;
        enemy.lunge = 0.3;
        spawnBurst(enemy.x, enemy.y - 4, 12, '#a855f7', 65);
        continue;
      }
    }

    // Assassins briefly dissolve, cross the target's blind side, then reveal
    // before striking. The reveal pause keeps the backstab dangerous without
    // making its bonus damage unavoidable.
    if (enemy.type === 'assassin') {
      const assassinTarget = enemy.assassinTarget || getEnemyPreferredTarget(enemy);
      if ((enemy.assassinVanishWindup || 0) > 0) {
        enemy.assassinVanishWindup = Math.max(0, enemy.assassinVanishWindup - dt);
        enemy.lunge = Math.max(enemy.lunge, 0.25);
        if (enemy.assassinVanishWindup === 0) {
          enemy.assassinVanishTimer = 0.48;
          spawnBurst(enemy.x, enemy.y - 5, 18, '#a78bfa', 95);
        }
        continue;
      }
      if ((enemy.assassinVanishTimer || 0) > 0) {
        enemy.assassinVanishTimer = Math.max(0, enemy.assassinVanishTimer - dt);
        if (enemy.assassinVanishTimer === 0) {
          const targetDx = assassinTarget.x - enemy.x;
          const targetDy = assassinTarget.y - enemy.y;
          const targetLength = Math.hypot(targetDx, targetDy) || 1;
          const behindDistance = assassinTarget.radius + enemy.radius + 34;
          const repositionX = assassinTarget.x + (targetDx / targetLength) * behindDistance;
          const repositionY = assassinTarget.y + (targetDy / targetLength) * behindDistance;
          const safeReposition = resolveRoomCollision(enemy, repositionX, repositionY);
          enemy.x = safeReposition.x;
          enemy.y = safeReposition.y;
          enemy.facingX = assassinTarget.x - enemy.x;
          enemy.assassinStrikeWindup = 0.34;
          spawnBurst(enemy.x, enemy.y - 5, 22, '#c4b5fd', 115);
        }
        continue;
      }
      if ((enemy.assassinStrikeWindup || 0) > 0) {
        enemy.assassinStrikeWindup = Math.max(0, enemy.assassinStrikeWindup - dt);
        enemy.lunge = Math.max(enemy.lunge, 0.55);
        if (enemy.assassinStrikeWindup === 0) {
          const strikeDistance = distance(enemy, assassinTarget);
          if (strikeDistance <= enemy.radius + assassinTarget.radius + 48) {
            const damageLanded = applyCombatDamage(assassinTarget, enemy.damage * 1.65, enemy);
            spawnBurst(assassinTarget.x, assassinTarget.y, 22, damageLanded ? '#f472b6' : '#ddd6fe', 155);
            if (damageLanded) {
              triggerHitStop(0.05);
              state.shake = Math.max(state.shake, 9);
            }
          }
          enemy.assassinTarget = null;
          enemy.retreatTimer = 0.5;
          enemy.retreatFromX = assassinTarget.x;
          enemy.retreatFromY = assassinTarget.y;
        }
        continue;
      }
      const assassinDistance = distance(enemy, assassinTarget);
      if (enemy.attackTimer <= 0 && assassinDistance > 105 && assassinDistance <= 390) {
        enemy.attackTimer = 2.65;
        enemy.assassinTarget = assassinTarget;
        enemy.assassinVanishWindup = 0.3;
        spawnBurst(enemy.x, enemy.y - 5, 12, '#7c3aed', 60);
        continue;
      }
    }

    // Burrowers sink into the floor, track their chosen target underground,
    // and surface beside it after a warning marker has had time to expand.
    if (enemy.type === 'burrower') {
      const burrowTarget = enemy.burrowTarget || getEnemyPreferredTarget(enemy);
      if ((enemy.burrowSinkTimer || 0) > 0) {
        enemy.burrowSinkTimer = Math.max(0, enemy.burrowSinkTimer - dt);
        enemy.lunge = Math.max(enemy.lunge, 0.35);
        if (enemy.burrowSinkTimer === 0) {
          enemy.burrowTravelTimer = 0.62;
          spawnBurst(enemy.x, enemy.y + 16, 20, '#a16207', 105);
        }
        continue;
      }
      if ((enemy.burrowTravelTimer || 0) > 0) {
        enemy.burrowTravelTimer = Math.max(0, enemy.burrowTravelTimer - dt);
        enemy.burrowMarkerX = burrowTarget.x;
        enemy.burrowMarkerY = burrowTarget.y;
        if (enemy.burrowTravelTimer === 0) {
          const approachAngle = Math.atan2(enemy.y - burrowTarget.y, enemy.x - burrowTarget.x);
          const emergeDistance = burrowTarget.radius + enemy.radius + 26;
          const emergeX = burrowTarget.x + Math.cos(approachAngle) * emergeDistance;
          const emergeY = burrowTarget.y + Math.sin(approachAngle) * emergeDistance;
          const safeEmerge = resolveRoomCollision(enemy, emergeX, emergeY);
          enemy.x = safeEmerge.x;
          enemy.y = safeEmerge.y;
          enemy.burrowMarkerX = safeEmerge.x;
          enemy.burrowMarkerY = safeEmerge.y;
          enemy.burrowEmergeTimer = 0.52;
          enemy.facingX = burrowTarget.x - enemy.x;
        }
        continue;
      }
      if ((enemy.burrowEmergeTimer || 0) > 0) {
        enemy.burrowEmergeTimer = Math.max(0, enemy.burrowEmergeTimer - dt);
        enemy.lunge = Math.max(enemy.lunge, 0.75);
        if (enemy.burrowEmergeTimer === 0) {
          const eruptionRadius = enemy.radius + burrowTarget.radius + 52;
          if (distance(enemy, burrowTarget) <= eruptionRadius) {
            const damageLanded = applyCombatDamage(burrowTarget, enemy.damage * 1.35, enemy);
            if (burrowTarget === player && damageLanded) {
              player.stamina = Math.max(0, player.stamina - 12);
              knockHeroAwayFrom(enemy, 42);
              triggerHitStop(0.045);
            }
          }
          spawnBurst(enemy.x, enemy.y + 4, 30, '#d97706', 175);
          state.shake = Math.max(state.shake, 10);
          enemy.burrowTarget = null;
          enemy.burrowMarkerX = null;
          enemy.burrowMarkerY = null;
          enemy.retreatTimer = 0.4;
          enemy.retreatFromX = burrowTarget.x;
          enemy.retreatFromY = burrowTarget.y;
        }
        continue;
      }
      const burrowDistance = distance(enemy, burrowTarget);
      if (enemy.attackTimer <= 0 && burrowDistance > 115 && burrowDistance <= 410) {
        enemy.attackTimer = 2.9;
        enemy.burrowTarget = burrowTarget;
        enemy.burrowMarkerX = burrowTarget.x;
        enemy.burrowMarkerY = burrowTarget.y;
        enemy.burrowSinkTimer = 0.42;
        spawnBurst(enemy.x, enemy.y + 15, 14, '#92400e', 70);
        continue;
      }
    }

    // Brutes plant their feet, telegraph a straight-line rush, then commit to
    // a locked charge. Missing leaves them exposed instead of letting them
    // rotate through the player during the attack.
    if (enemy.type === 'brute') {
      if ((enemy.bruteChargeWindup || 0) > 0) {
        enemy.bruteChargeWindup = Math.max(0, enemy.bruteChargeWindup - dt);
        enemy.lunge = Math.max(enemy.lunge, 0.35);
        if (enemy.bruteChargeWindup === 0) {
          const chargeTarget = enemy.bruteChargeTarget || getEnemyPreferredTarget(enemy);
          const chargeDx = chargeTarget.x - enemy.x;
          const chargeDy = chargeTarget.y - enemy.y;
          const chargeLength = Math.hypot(chargeDx, chargeDy) || 1;
          enemy.bruteChargeDirX = chargeDx / chargeLength;
          enemy.bruteChargeDirY = chargeDy / chargeLength;
          enemy.bruteChargeRemaining = Math.min(185, chargeLength + 28);
          enemy.bruteChargeTimer = 0.52;
          enemy.facingX = enemy.bruteChargeDirX;
        }
        continue;
      }
      if ((enemy.bruteChargeTimer || 0) > 0) {
        const previousTimer = enemy.bruteChargeTimer;
        enemy.bruteChargeTimer = Math.max(0, previousTimer - dt);
        enemy.lunge = 1;
        const step = Math.min(
          enemy.bruteChargeRemaining,
          enemy.bruteChargeRemaining * Math.min(1, dt / previousTimer),
        );
        const safeCharge = resolveRoomCollision(
          enemy,
          enemy.x + enemy.bruteChargeDirX * step,
          enemy.y + enemy.bruteChargeDirY * step,
        );
        enemy.x = safeCharge.x;
        enemy.y = safeCharge.y;
        enemy.bruteChargeRemaining = Math.max(0, enemy.bruteChargeRemaining - step);
        const chargeTarget = enemy.bruteChargeTarget || getEnemyPreferredTarget(enemy);
        const hitTarget = distance(enemy, chargeTarget) <= enemy.radius + chargeTarget.radius + 5;
        if (hitTarget || enemy.bruteChargeTimer === 0 || enemy.bruteChargeRemaining === 0) {
          if (hitTarget) {
            const damageLanded = applyCombatDamage(chargeTarget, enemy.damage * 1.5, enemy);
            if (chargeTarget === player && damageLanded) {
              player.stamina = Math.max(0, player.stamina - 18);
              knockHeroAwayFrom(enemy, 68);
              triggerHitStop(0.06);
            }
            spawnBurst(chargeTarget.x, chargeTarget.y, 24, '#fb923c', 165);
            state.shake = Math.max(state.shake, 13);
          }
          enemy.bruteChargeTimer = 0;
          enemy.bruteChargeRemaining = 0;
          enemy.bruteChargeTarget = null;
          enemy.retreatTimer = 0.48;
          enemy.retreatFromX = chargeTarget.x;
          enemy.retreatFromY = chargeTarget.y;
        }
        continue;
      }
      const bruteTarget = getEnemyPreferredTarget(enemy);
      const bruteDistance = distance(enemy, bruteTarget);
      if (enemy.attackTimer <= 0 && bruteDistance > 90 && bruteDistance <= 330) {
        enemy.attackTimer = 2.4;
        enemy.bruteChargeWindup = 0.68;
        enemy.bruteChargeTarget = bruteTarget;
        enemy.lunge = 0.3;
        spawnBurst(enemy.x, enemy.y, 18, '#f97316', 90);
        continue;
      }
    }

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

    // The Sunfeather Griffin used to apply its entire lunge displacement in a
    // single frame, which read as teleportation. Its Solar Talon now travels
    // over a visible, dodgeable interval while keeping the target direction
    // locked at take-off.
    if (enemy.type === 'sunfeatherGriffin') {
      const griffinTarget = getEnemyPreferredTarget(enemy);
      if ((enemy.griffinLungeTimer || 0) > 0) {
        const previousTimer = enemy.griffinLungeTimer;
        enemy.griffinLungeTimer = Math.max(0, previousTimer - dt);
        enemy.lunge = Math.max(enemy.lunge, 0.75);
        const step = Math.min(
          enemy.griffinLungeRemaining,
          enemy.griffinLungeRemaining * Math.min(1, dt / previousTimer),
        );
        const lungeX = enemy.x + enemy.griffinLungeDirX * step;
        const lungeY = enemy.y + enemy.griffinLungeDirY * step;
        const safeLunge = state.boss && enemy.bossMinion
          ? {
              x: clamp(lungeX, state.bossArena.x + enemy.radius, state.bossArena.x + state.bossArena.w - enemy.radius),
              y: clamp(lungeY, state.bossArena.y + enemy.radius, state.bossArena.y + state.bossArena.h - enemy.radius),
            }
          : resolveRoomCollision(enemy, lungeX, lungeY);
        enemy.x = safeLunge.x;
        enemy.y = safeLunge.y;
        enemy.griffinLungeRemaining = Math.max(0, enemy.griffinLungeRemaining - step);
        if (enemy.griffinLungeTimer === 0 || enemy.griffinLungeRemaining === 0) {
          if (distance(enemy, griffinTarget) <= enemy.radius + griffinTarget.radius + 4) {
            const damageLanded = applyCombatDamage(griffinTarget, enemy.damage * 1.25, enemy);
            if (griffinTarget === player && damageLanded) {
              player.stamina = Math.max(0, player.stamina - 12);
              triggerHitStop(0.045);
            }
            spawnBurst(griffinTarget.x, griffinTarget.y, 20, '#fbbf24', 145);
            state.shake = Math.max(state.shake, 10);
          }
          enemy.griffinLungeTimer = 0;
          enemy.griffinLungeRemaining = 0;
          enemy.retreatTimer = 0.36;
          enemy.retreatFromX = griffinTarget.x;
          enemy.retreatFromY = griffinTarget.y;
        }
        continue;
      }

      const griffinDistance = distance(enemy, griffinTarget);
      const griffinWaveFactor = clamp(0.35 + (state.wave - 1) * 0.09, 0.35, 1.25);
      const griffinAttackRange = enemy.radius + griffinTarget.radius + 98 * griffinWaveFactor;
      if (enemy.attackTimer <= 0 && griffinDistance <= griffinAttackRange) {
        const griffinDx = griffinTarget.x - enemy.x;
        const griffinDy = griffinTarget.y - enemy.y;
        const griffinLength = Math.hypot(griffinDx, griffinDy) || 1;
        enemy.attackTimer = 1.3;
        enemy.griffinLungeTimer = 0.38;
        enemy.griffinLungeDirX = griffinDx / griffinLength;
        enemy.griffinLungeDirY = griffinDy / griffinLength;
        enemy.griffinLungeRemaining = Math.min(72 * griffinWaveFactor, griffinDistance);
        enemy.facingX = enemy.griffinLungeDirX;
        enemy.lunge = 1;
        spawnBurst(enemy.x, enemy.y, 12, '#fde68a', 75);
        continue;
      }
    }

    const meleeProfile = enemyMeleeProfiles[enemy.type]
      || enemyMeleeProfiles[getEnemyJournalId(enemy)]
      || null;
    const weave = enemy.type === 'crawler' ? 75 : enemy.type === 'arcaneOrb' ? 52 : 24;
    const sideX = -dirY * Math.sin(enemy.movePhase) * weave;
    const sideY = dirX * Math.sin(enemy.movePhase) * weave;
    const isSkeletonArcher = enemy.type === 'skell2';
    const isGhostArcher = enemy.type === 'ghost3';
    const isDesertArcher = enemy.type === 'desertArcher' || isSkeletonArcher || isGhostArcher
      || (world.themeIndex === 6
        && baseEnemyTypes.has(enemy.type)
        && getDesertEnemyVariant(enemy.type) === 'desertArcher');
    const isMagmaSerpent = enemy.type === 'magmaSerpent';
    const isMechSentinel = enemy.type === 'mechMinion';
    const isClockworkOrb = enemy.type === 'clockworkOrb';
    const isMechanicalShooter = isMechSentinel || isClockworkOrb;
    const isArcaneOrb = enemy.type === 'arcaneOrb';
    const isChainHexer = enemy.type === 'chainHexer';
    const isUmbralCaster = ['singularityEye', 'duskweaver', 'eclipseSpider'].includes(enemy.type);
    const holdingRange = (enemy.type === 'lushSporeShroom' && len < 180)
      || (isDesertArcher && len < 330)
      || (isMagmaSerpent && len < 280)
      || (isMechanicalShooter && len < (isClockworkOrb ? 340 : 310))
      || (isArcaneOrb && len < 350)
      || (isChainHexer && len < 370)
      || (isUmbralCaster && len < 390)
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
    } else if (enemy.type === 'wraith') {
      // Wraiths ignore room and corridor collision while pursuing prey. World
      // bounds still apply so they cannot disappear outside the generated map.
      enemy.x = clamp(nextX, enemy.radius, world.width - enemy.radius);
      enemy.y = clamp(nextY, enemy.radius, world.height - enemy.radius);
      enemy.wraithPhasing = !getContainingRoom(enemy);
      enemy.wraithTrailTimer = Math.max(0, (enemy.wraithTrailTimer || 0) - dt);
      if (enemy.wraithPhasing && enemy.wraithTrailTimer === 0) {
        enemy.wraithTrailTimer = 0.12;
        spawnBurst(enemy.x, enemy.y - 8, 4, '#a78bfa', 28);
      }
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
            useAttackSheet: shouldEnemyUseAttackSheet(enemy),
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

    // Arcane Orbs hold casting range and release a readable three-bolt hex
    // burst instead of behaving like contact-damage melee enemies.
    if (isArcaneOrb) {
      if (len <= 470 && enemy.attackTimer <= 0) {
        enemy.attackTimer = 1.75;
        enemy.lunge = 0.65;
        const baseAngle = Math.atan2(dirY, dirX);
        const boltColor = enemy.type === 'skell4' ? '#f59e0b' : enemy.type === 'ghost1' ? '#38bdf8' : world.themeIndex === 5 ? '#67e8f9' : '#c084fc';
        for (const offset of [-0.14, 0, 0.14]) {
          const angle = baseAngle + offset;
          state.enemyProjectiles.push({
            x: enemy.x + Math.cos(angle) * 24,
            y: enemy.y + Math.sin(angle) * 24 - 6,
            vx: Math.cos(angle) * 295,
            vy: Math.sin(angle) * 295,
            angle,
            damage: enemy.damage * 0.62,
            life: 2.1,
            sourceType: enemy.type,
            color: boltColor,
            useAttackSheet: shouldEnemyUseAttackSheet(enemy),
          });
        }
        spawnBurst(enemy.x + dirX * 20, enemy.y + dirY * 20 - 6, 16, boltColor, 95);
      }
      continue;
    }

    // Chain Hexers hold range and fire a hooked rune that briefly roots the
    // player, making them a control threat rather than another damage turret.
    if (isChainHexer) {
      if (len <= 500 && enemy.attackTimer <= 0) {
        enemy.attackTimer = 2.15;
        enemy.lunge = 0.55;
        state.enemyProjectiles.push({
          x: enemy.x + dirX * 26,
          y: enemy.y + dirY * 26 - 7,
          vx: dirX * 330,
          vy: dirY * 330,
          angle: Math.atan2(dirY, dirX),
          damage: enemy.damage * 0.82,
          life: 1.8,
          sourceType: 'chainHexer',
          color: '#60a5fa',
          rootDuration: 0.8,
          useAttackSheet: shouldEnemyUseAttackSheet(enemy),
        });
        spawnBurst(enemy.x + dirX * 22, enemy.y + dirY * 22 - 7, 14, '#60a5fa', 90);
      }
      continue;
    }

    // Bone Archers and clockwork enemies hold range for their projectiles.
    if (isDesertArcher || isMechanicalShooter) {
      if (len <= 440 && enemy.attackTimer <= 0) {
        enemy.attackTimer = isClockworkOrb ? 1.35 : isMechSentinel ? 1.15 : 1.55;
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
          sourceType: isClockworkOrb ? 'clockworkOrb' : isMechSentinel ? 'mechMinion' : 'desertArcher',
          color: isClockworkOrb ? '#facc15' : isMechSentinel ? '#fb923c' : '#fde68a',
        });
        spawnBurst(enemy.x + dirX * 18, enemy.y - 10 + dirY * 18, 7, isClockworkOrb ? '#facc15' : isMechSentinel ? '#fb923c' : '#fde68a', 65);
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

  const unopenedGuaranteedCrate = state.crates.some((crate) => (
    (crate.championReward || crate.mimicReward) && !crate.isOpen
  ));
  if (state.enemies.length === 0 && !unopenedGuaranteedCrate && !state.boss && !state.roomCleared) {
    state.roomCleared = true;
    state.bossArenaOpen = false;
    if (state.survivalArenaMode) {
      addScore(100 * state.wave);
      player.health = clamp(player.health + 8, 0, player.maxHealth);
      state.survivalArenaNextWaveTimer = 1.5;
      setMessage(`Arena Wave ${state.wave} cleared! The arena shifts before the next assault.`);
      awardSurvivalArenaMilestone(state.wave);
      return;
    }
    awardHardWaveRelic();
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
    const previousX = projectile.x;
    const previousY = projectile.y;
    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;
    if (projectile.life <= 0) return false;
    if (segmentCrossesArenaBarrier(previousX, previousY, projectile.x, projectile.y, 7)) {
      spawnBurst(projectile.x, projectile.y, 9, projectile.color || '#fbbf24', 70);
      return false;
    }

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
    if (damageLanded && victim === player && projectile.rootDuration) {
      player.frozenTimer = Math.max(player.frozenTimer || 0, projectile.rootDuration);
      setMessage('Hooked chains bind your feet!');
      spawnBurst(player.x, player.y, 20, '#60a5fa', 120);
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
    const appliedDamage = applySentinelBlock(
      target,
      damage,
      projectile.x - projectile.vx * 0.08,
      projectile.y - projectile.vy * 0.08,
    );
    target.health -= appliedDamage;
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
    const previousX = projectile.x;
    const previousY = projectile.y;
    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;
    if (projectile.life <= 0) return false;
    if (segmentCrossesArenaBarrier(previousX, previousY, projectile.x, projectile.y, projectile.radius || 6)) {
      spawnBurst(projectile.x, projectile.y, 10, projectile.color || '#67e8f9', 75);
      return false;
    }

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

function grantProtectorExperience(protector, amount = 1) {
  protector.level = protector.level || 1;
  protector.experience = (protector.experience || 0) + amount;
  protector.experienceToNext = protector.experienceToNext || 3;
  while (protector.experience >= protector.experienceToNext) {
    protector.experience -= protector.experienceToNext;
    protector.level += 1;
    protector.experienceToNext = 2 + protector.level;
    if (protector.level % 2 === 0) {
      protector.healthBonus = (protector.healthBonus || 0) + 20;
      protector.maxHealth = player.maxHealth + protector.healthBonus;
      protector.health = Math.min(protector.maxHealth, protector.health + 20);
      setMessage(`${protector.kind === 'legionary' ? 'Legionary' : 'Protector'} reached level ${protector.level}: +20 health!`);
    } else {
      protector.damageBonus = (protector.damageBonus || 0) + 5;
      setMessage(`${protector.kind === 'legionary' ? 'Legionary' : 'Protector'} reached level ${protector.level}: +5 damage!`);
    }
    spawnBurst(protector.x, protector.y, 18, '#60a5fa', 105);
  }
}

function updateRomanBowman(protector, dt, activeEnemies) {
  const targets = [...activeEnemies, ...getActiveBosses()].filter((target) => target.health > 0);
  const target = targets.reduce((closest, candidate) => (
    !closest || distance(protector, candidate) < distance(protector, closest) ? candidate : closest
  ), null);
  protector.target = target;
  let destination;
  if (target) {
    const fromTargetX = protector.x - target.x;
    const fromTargetY = protector.y - target.y;
    const targetDistance = Math.hypot(fromTargetX, fromTargetY) || 1;
    const desiredRange = 335;
    destination = {
      x: target.x + fromTargetX / targetDistance * desiredRange,
      y: target.y + fromTargetY / targetDistance * desiredRange,
    };
    protector.facingX = target.x - protector.x;
  } else {
    const facing = player.visualFacingX < 0 ? -1 : 1;
    destination = { x: player.x - facing * 115, y: player.y + 76 };
    protector.facingX = facing;
  }

  const moveX = destination.x - protector.x;
  const moveY = destination.y - protector.y;
  const moveDistance = Math.hypot(moveX, moveY) || 1;
  if (moveDistance > 22) {
    protector.isMoving = true;
    protector.walkPhase = (protector.walkPhase || 0) + dt * 7;
    const step = Math.min(moveDistance, player.speed * 1.08 * dt);
    const nextX = protector.x + moveX / moveDistance * step;
    const nextY = protector.y + moveY / moveDistance * step;
    if (state.boss) {
      protector.x = clamp(nextX, state.bossArena.x + protector.radius, state.bossArena.x + state.bossArena.w - protector.radius);
      protector.y = clamp(nextY, state.bossArena.y + protector.radius, state.bossArena.y + state.bossArena.h - protector.radius);
    } else {
      const safe = resolveRoomCollision(protector, nextX, nextY);
      protector.x = safe.x;
      protector.y = safe.y;
    }
  }

  protector.bowDrawTimer = Math.max(0, (protector.bowDrawTimer || 0) - dt);
  if (!target || distance(protector, target) > 620
    || segmentCrossesArenaBarrier(protector.x, protector.y, target.x, target.y, 5)) {
    protector.bowDrawing = false;
    return;
  }
  if (!protector.bowDrawing) {
    if (protector.attackCooldown > 0) return;
    protector.bowDrawing = true;
    protector.bowDrawTimer = 0.18;
    return;
  }
  if (protector.bowDrawTimer > 0) return;
  protector.bowDrawing = false;
  const equippedBow = weaponSets.find((weapon) => (
    weapon.id === equippedRangedWeaponId && weapon.kind === 'bow'
  ));
  const bowDamage = equippedBow
    ? (equippedBow.projectileDamage + player.weaponLevel * 5) * state.merchantDamageBoost
    : 24 + player.weaponLevel * 5;
  const aimX = target.x - protector.x;
  const aimY = target.y - protector.y;
  const aimLength = Math.hypot(aimX, aimY) || 1;
  const directionX = aimX / aimLength;
  const directionY = aimY / aimLength;
  protector.attackCooldown = equippedBow ? Math.max(0.58, equippedBow.cooldown * 1.15) : 0.78;
  protector.attackPoseTimer = 0.2;
  state.playerProjectiles.push({
    x: protector.x + directionX * 30,
    y: protector.y + directionY * 30 - 8,
    vx: directionX * (equippedBow?.projectileSpeed || 620),
    vy: directionY * (equippedBow?.projectileSpeed || 620),
    angle: Math.atan2(directionY, directionX),
    damage: bowDamage * 0.5,
    radius: 5,
    life: 1.6,
    kind: 'bow',
    arrowTheme: getBowArrowTheme(equippedBow),
    splashRadius: 0,
    color: '#fbbf24',
  });
  spawnBurst(protector.x + directionX * 28, protector.y + directionY * 28 - 8, 6, '#fde68a', 65);
}

// Assigns protector priorities and drives interception or boss attack runs.
function updateProtectors(dt) {
  if (player.protectors.length === 0) return;
  const activeEnemies = state.enemies.filter((enemy) => !enemy.dead);
  const romanEmergencyGuard = player.health < player.maxHealth * 0.1;
  const legionaries = player.protectors
    .filter((protector) => protector.kind === 'legionary' && protector.health > 0)
    .sort((a, b) => (a.legionCohort || 0) - (b.legionCohort || 0)
      || a.formationIndex - b.formationIndex);
  if (legionaries.length > 0 && romanEmergencyGuard !== state.romanEmergencyGuardActive) {
    state.romanEmergencyGuardActive = romanEmergencyGuard;
    setMessage(romanEmergencyGuard
      ? 'Emergency shield wall! The Romans surround the critically wounded hero.'
      : 'Hero stabilized! The Romans immediately return to the attack.', romanEmergencyGuard);
  } else if (legionaries.length === 0) state.romanEmergencyGuardActive = false;
  // Every summoned cohort joins the same shield wall. Ten soldiers fill one
  // rank; further Romans form supporting ranks instead of scattering.
  const legionWallTarget = !romanEmergencyGuard
    ? state.boss && state.boss.health > 0
      ? state.boss
      : activeEnemies.reduce((strongest, enemy) => {
        if (!strongest) return enemy;
        return enemy.maxHealth + enemy.damage * 6 > strongest.maxHealth + strongest.damage * 6
          ? enemy
          : strongest;
      }, null)
    : null;
  const legionWallDestinations = new Map();
  if (legionWallTarget) {
    const nearbyFrontFighters = player.protectors.filter((protector) => (
      protector.health > 0
      && protector.kind !== 'legionary'
      && protector.kind !== 'romanArcher'
      && distance(protector, legionWallTarget) < 155
    )).length;
    const shouldFlank = nearbyFrontFighters >= 3;
    let approachX = legionWallTarget.x - player.x;
    let approachY = legionWallTarget.y - player.y;
    let approachLength = Math.hypot(approachX, approachY) || 1;
    approachX /= approachLength;
    approachY /= approachLength;
    if (shouldFlank) {
      const flankSide = legionWallTarget.romanFlankSide
        || ((Math.floor(legionWallTarget.x + legionWallTarget.y) & 1) ? 1 : -1);
      legionWallTarget.romanFlankSide = flankSide;
      const oldX = approachX;
      approachX = -approachY * flankSide;
      approachY = oldX * flankSide;
    }
    const lineX = -approachY;
    const lineY = approachX;
    legionaries.forEach((legionary, index) => {
      const rank = Math.floor(index / 10);
      const rankStart = rank * 10;
      const rankSize = Math.min(10, legionaries.length - rankStart);
      const slot = index - rankStart - (rankSize - 1) / 2;
      const standOff = (legionWallTarget.radius || 16) + 52 + rank * 38;
      legionWallDestinations.set(legionary, {
        x: legionWallTarget.x - approachX * standOff + lineX * slot * 38,
        y: legionWallTarget.y - approachY * standOff + lineY * slot * 38,
      });
      legionary.wallRank = rank;
      legionary.wallSlot = slot;
      legionary.wallFlanking = shouldFlank;
    });
  }

  // Enemy lunges can cross the wall between updates. Resolve that penetration
  // as one rigid formation movement so no Roman remains inside an enemy and
  // no individual soldier gets peeled away from the shield line.
  const hostileBodies = [...activeEnemies, ...getActiveBosses()]
    .filter((hostile) => hostile.health > 0);
  let wallStepBack = null;
  if (!romanEmergencyGuard && legionaries.length > 0) {
    for (const legionary of legionaries) {
      for (const hostile of hostileBodies) {
        const separationX = legionary.x - hostile.x;
        const separationY = legionary.y - hostile.y;
        const separation = Math.hypot(separationX, separationY);
        const shieldClearance = legionary.radius + (hostile.radius || 16) + 18;
        if (separation >= shieldClearance) continue;
        const fallbackX = legionWallTarget ? player.x - legionWallTarget.x : player.x - hostile.x;
        const fallbackY = legionWallTarget ? player.y - legionWallTarget.y : player.y - hostile.y;
        const fallbackLength = Math.hypot(fallbackX, fallbackY) || 1;
        const awayX = separation > 0 ? separationX / separation : fallbackX / fallbackLength;
        const awayY = separation > 0 ? separationY / separation : fallbackY / fallbackLength;
        const requiredStep = shieldClearance - separation + 4;
        if (!wallStepBack || requiredStep > wallStepBack.distance) {
          wallStepBack = { x: awayX * requiredStep, y: awayY * requiredStep, distance: requiredStep };
        }
      }
    }
  }
  if (wallStepBack) {
    legionaries.forEach((legionary) => {
      const nextX = legionary.x + wallStepBack.x;
      const nextY = legionary.y + wallStepBack.y;
      if (state.boss) {
        legionary.x = clamp(nextX, state.bossArena.x + legionary.radius, state.bossArena.x + state.bossArena.w - legionary.radius);
        legionary.y = clamp(nextY, state.bossArena.y + legionary.radius, state.bossArena.y + state.bossArena.h - legionary.radius);
      } else {
        const safe = resolveRoomCollision(legionary, nextX, nextY);
        legionary.x = safe.x;
        legionary.y = safe.y;
      }
      const wallSlot = legionWallDestinations.get(legionary);
      if (wallSlot) {
        wallSlot.x += wallStepBack.x;
        wallSlot.y += wallStepBack.y;
      }
      legionary.isMoving = true;
      legionary.walkPhase = (legionary.walkPhase || 0) + dt * 8;
    });
  }
  const bossOnlyTarget = state.boss && state.boss.health > 0 && activeEnemies.length === 0;
  const legionRegroupDestinations = new Map();
  if (bossOnlyTarget && !romanEmergencyGuard) {
    const cohorts = new Map();
    legionaries.forEach((legionary) => {
      const cohort = legionary.legionCohort || 0;
      if (!cohorts.has(cohort)) cohorts.set(cohort, []);
      cohorts.get(cohort).push(legionary);
    });
    cohorts.forEach((cohortMembers, cohort) => {
      if (cohortMembers.every((legionary) => legionary.shieldWallReformed !== false)) return;
      const awayX = player.x - state.boss.x;
      const awayY = player.y - state.boss.y;
      const awayLength = Math.hypot(awayX, awayY) || 1;
      const normalX = -awayY / awayLength;
      const normalY = awayX / awayLength;
      const stepBackDistance = (state.boss.radius || 30) + 92 + cohort * 28;
      const anchorX = state.boss.x + (awayX / awayLength) * stepBackDistance;
      const anchorY = state.boss.y + (awayY / awayLength) * stepBackDistance;
      cohortMembers.forEach((legionary, index) => {
        const centeredIndex = index - (cohortMembers.length - 1) / 2;
        legionRegroupDestinations.set(legionary, {
          x: clamp(
            anchorX + normalX * centeredIndex * 38,
            state.bossArena.x + legionary.radius,
            state.bossArena.x + state.bossArena.w - legionary.radius,
          ),
          y: clamp(
            anchorY + normalY * centeredIndex * 38,
            state.bossArena.y + legionary.radius,
            state.bossArena.y + state.bossArena.h - legionary.radius,
          ),
        });
      });
      const wallReady = cohortMembers.every((legionary) => {
        const slot = legionRegroupDestinations.get(legionary);
        return Math.hypot(legionary.x - slot.x, legionary.y - slot.y) <= 16;
      });
      if (wallReady) {
        cohortMembers.forEach((legionary) => {
          legionary.shieldWallReformed = true;
          legionary.shieldWallLocked = true;
          legionRegroupDestinations.delete(legionary);
        });
      }
    });
  }
  for (let protectorIndex = 0; protectorIndex < player.protectors.length; protectorIndex += 1) {
  const protector = player.protectors[protectorIndex];

  protector.level = protector.level || 1;
  protector.experience = protector.experience || 0;
  protector.experienceToNext = protector.experienceToNext || 3;
  protector.healthBonus = protector.healthBonus || 0;
  protector.damageBonus = protector.damageBonus || 0;
  protector.maxHealth = player.maxHealth + protector.healthBonus;
  protector.health = Math.min(protector.health, protector.maxHealth);
  protector.maxEnergy = protector.maxEnergy || 100;
  protector.energy = clamp((protector.energy ?? protector.maxEnergy) + 12 * dt, 0, protector.maxEnergy);
  protector.attackCooldown = Math.max(0, protector.attackCooldown - dt);
  protector.attackPoseTimer = Math.max(0, (protector.attackPoseTimer || 0) - dt);
  protector.shieldFlash = Math.max(0, (protector.shieldFlash || 0) - dt);
  protector.retreatTimer = Math.max(0, (protector.retreatTimer || 0) - dt);
  protector.isMoving = false;

  if (protector.kind === 'romanArcher') {
    updateRomanBowman(protector, dt, activeEnemies);
    continue;
  }

  const livingEnemies = activeEnemies;
  const possibleTargets = livingEnemies.filter((enemy) => (
    protector.kind === 'legionary' || distance(protector, enemy) <= 850
  ));

  const mustProtectPlayer = player.health < player.maxHealth * 0.5;
  let target = null;
  protector.legionSplit = false;
  if (romanEmergencyGuard && protector.kind === 'legionary') {
    target = null;
    protector.retreatTimer = 0;
    protector.retreatFromX = null;
    protector.retreatFromY = null;
    protector.shieldWallReformed = true;
    protector.shieldWallLocked = true;
  } else if (protector.kind === 'legionary' && legionWallTarget) {
    target = legionWallTarget;
    protector.shieldWallReformed = true;
    protector.shieldWallLocked = true;
  } else {
    target = state.boss && state.boss.health > 0 ? state.boss : null;
  }
  const freeToAttack = !(romanEmergencyGuard && protector.kind === 'legionary');
  if (freeToAttack && !target && mustProtectPlayer && livingEnemies.length > 0) {
    target = livingEnemies.reduce((closest, enemy) => (
      distance(player, enemy) < distance(player, closest) ? enemy : closest
    ), livingEnemies[0]);
  } else if (freeToAttack && !target && possibleTargets.length > 0) {
    target = possibleTargets.reduce((strongest, enemy) => {
      const strength = enemy.maxHealth + enemy.damage * 6;
      const strongestScore = strongest.maxHealth + strongest.damage * 6;
      return strength > strongestScore ? enemy : strongest;
    });
  }
  protector.target = target;
  protector.formingShieldWall = protector.kind === 'legionary'
    && (romanEmergencyGuard || legionRegroupDestinations.has(protector));
  if (target && Math.abs(target.x - protector.x) > 2) {
    protector.facingX = target.x - protector.x;
  }

  if (protector.retreatTimer > 0 && protector.retreatFromX != null) {
    protector.isMoving = true;
    protector.walkPhase = (protector.walkPhase || 0) + dt * 8;
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

  let destination = state.boss && target === state.boss
      ? target
    : target
      ? getProtectorNavigationTarget(protector, target)
      : {
      x: player.x + Math.cos(protectorIndex * 1.9) * 46,
      y: player.y + Math.sin(protectorIndex * 1.9) * 46,
    };
  if (protector.kind === 'legionary') {
    const formationOffset = (protector.formationIndex - 1.5) * 38;
    const protectorRoom = getContainingRoom(protector);
    const navigationTarget = target || player;
    const targetRoom = getContainingRoom(navigationTarget);
    const marchingThroughDoor = Boolean(!protectorRoom || protectorRoom !== targetRoom);
    const canLockFormation = state.boss || (protectorRoom && protectorRoom === targetRoom);
    if (romanEmergencyGuard) {
      const guardAngle = protector.formationIndex / 4 * Math.PI * 2
        + (protector.legionCohort || 0) * 0.34;
      const guardRadius = 58 + (protector.legionCohort || 0) * 38;
      destination = {
        x: player.x + Math.cos(guardAngle) * guardRadius,
        y: player.y + Math.sin(guardAngle) * guardRadius,
      };
      // The shield faces away from the surrounded hero toward incoming danger.
      protector.facingX = Math.cos(guardAngle) || 1;
    } else if (legionRegroupDestinations.has(protector)) {
      destination = legionRegroupDestinations.get(protector);
      protector.shieldWallLocked = false;
      protector.facingX = target.x - protector.x;
    } else if (target && legionWallDestinations.has(protector) && canLockFormation) {
      destination = legionWallDestinations.get(protector);
      protector.shieldWallLocked = true;
      protector.facingX = target.x - protector.x;
    } else if (target) {
      // Across rooms every soldier keeps the graph waypoint. Small doorway
      // lanes stop the line from trying to occupy one exact point.
      destination = getLegionNavigationTarget(protector, target);
    } else if (marchingThroughDoor) {
      destination = getLegionNavigationTarget(protector, player);
      protector.facingX = destination.x - protector.x;
    } else {
      const facing = player.visualFacingX < 0 ? -1 : 1;
      destination = {
        x: player.x - facing * 58,
        y: player.y + formationOffset,
      };
      protector.facingX = facing;
    }

    // Local separation prevents shield overlap without breaking the route.
    for (const other of marchingThroughDoor ? [] : legionaries) {
      if (other === protector || other.health <= 0) continue;
      const separationX = protector.x - other.x;
      const separationY = protector.y - other.y;
      const separationDistance = Math.hypot(separationX, separationY);
      if (separationDistance > 0 && separationDistance < 31) {
        const strength = (31 - separationDistance) * 0.42;
        destination.x += (separationX / separationDistance) * strength;
        destination.y += (separationY / separationDistance) * strength;
      }
    }
  }
  const dx = destination.x - protector.x;
  const dy = destination.y - protector.y;
  const targetDistance = Math.hypot(dx, dy) || 1;
  const baseContactDistance = target ? protector.radius + (target.radius || 16) : 12;
  const romanWeaponReach = protector.kind === 'legionary'
    ? 32 * (protector.meleeReachMultiplier || 1)
    : 0;
  const attackReach = baseContactDistance + romanWeaponReach;
  const actualTargetDistance = target ? distance(protector, target) : Infinity;
  // Romans correct toward their assigned wall slot as a unit; they never make
  // individual backward corrections that bend or scatter the shield line.
  const holdingShieldSpacing = false;
  const stopDistance = legionRegroupDestinations.has(protector)
    ? 5
    : target
      ? attackReach
      : 12;

  if (holdingShieldSpacing) {
    // Enemies and bosses must remain beyond the shield face. If they advance
    // into the line, step backward while keeping the shield aimed at them.
    protector.isMoving = true;
    protector.walkPhase = (protector.walkPhase || 0) + dt * 8;
    const awayX = protector.x - target.x;
    const awayY = protector.y - target.y;
    const awayLength = Math.hypot(awayX, awayY) || 1;
    const correctionDistance = Math.min(attackReach - actualTargetDistance, player.speed * 1.3 * dt);
    const nextX = protector.x + awayX / awayLength * correctionDistance;
    const nextY = protector.y + awayY / awayLength * correctionDistance;
    if (state.boss) {
      protector.x = clamp(nextX, state.bossArena.x + protector.radius, state.bossArena.x + state.bossArena.w - protector.radius);
      protector.y = clamp(nextY, state.bossArena.y + protector.radius, state.bossArena.y + state.bossArena.h - protector.radius);
    } else {
      const safe = resolveRoomCollision(protector, nextX, nextY);
      protector.x = safe.x;
      protector.y = safe.y;
    }
  } else if (targetDistance > stopDistance) {
    protector.isMoving = true;
    protector.walkPhase = (protector.walkPhase || 0) + dt * (target ? 7.5 : 9);
    const speed = player.speed * (target ? 1.15 : 1.35);
    const nextX = protector.x + (dx / targetDistance) * speed * dt;
    const nextY = protector.y + (dy / targetDistance) * speed * dt;
    const movementStartX = protector.x;
    const movementStartY = protector.y;
    if (state.boss) {
      protector.x = clamp(nextX, state.bossArena.x + protector.radius, state.bossArena.x + state.bossArena.w - protector.radius);
      protector.y = clamp(nextY, state.bossArena.y + protector.radius, state.bossArena.y + state.bossArena.h - protector.radius);
    } else {
      const safe = resolveRoomCollision(protector, nextX, nextY);
      protector.x = safe.x;
      protector.y = safe.y;
    }
    if (protector.kind === 'legionary') {
      const moved = Math.hypot(protector.x - movementStartX, protector.y - movementStartY);
      protector.stuckTimer = moved < 0.18 ? (protector.stuckTimer || 0) + dt : 0;
      if (protector.stuckTimer > 0.45 && !state.boss) {
        // Recalculate the route and sidestep in alternating directions when a
        // doorway crowd or obstacle has held this soldier in place.
        protector.navigationRoom = null;
        const side = (protector.formationIndex + (protector.legionCohort || 0)) % 2 === 0 ? -1 : 1;
        const sidestep = resolveRoomCollision(
          protector,
          protector.x - (dy / targetDistance) * side * 20,
          protector.y + (dx / targetDistance) * side * 20,
        );
        protector.x = sidestep.x;
        protector.y = sidestep.y;
        protector.stuckTimer = -0.35;
      }
    }
  }

  const attackTarget = protector.kind === 'legionary'
    ? [...livingEnemies, ...getActiveBosses()]
      .filter((candidate) => candidate.health > 0 && distance(protector, candidate) <= attackReach)
      .reduce((nearest, candidate) => (
        !nearest || distance(protector, candidate) < distance(protector, nearest) ? candidate : nearest
      ), null)
    : target;
  const touchingTarget = attackTarget
    && !legionRegroupDestinations.has(protector)
    && distance(protector, attackTarget) <= attackReach
    && !segmentCrossesArenaBarrier(protector.x, protector.y, attackTarget.x, attackTarget.y, 3);
  const attackEnergyCost = 18;
  if (touchingTarget && protector.attackCooldown <= 0 && protector.energy >= attackEnergyCost) {
    protector.attackCooldown = 0.62;
    protector.energy -= attackEnergyCost;
    protector.attackPose = protector.kind === 'legionary'
      ? 'jab'
      : Math.random() < 0.5 ? 'paw' : 'bite';
    protector.attackPoseTimer = protector.kind === 'legionary' ? 0.42 : 0.3;
    const lungeDx = attackTarget.x - protector.x;
    const lungeDy = attackTarget.y - protector.y;
    const lungeDistance = Math.hypot(lungeDx, lungeDy) || 1;
    // The weapon moves in the artwork; a legionary's feet remain planted in
    // his wall slot throughout the jab.
    const attackStep = protector.kind === 'legionary' ? 0 : 12;
    protector.x += (lungeDx / lungeDistance) * attackStep;
    protector.y += (lungeDy / lungeDistance) * attackStep;
    protector.retreatTimer = protector.kind === 'legionary' ? 0 : 0.3;
    protector.retreatFromX = protector.kind === 'legionary' ? null : attackTarget.x;
    protector.retreatFromY = protector.kind === 'legionary' ? null : attackTarget.y;
    const damage = (protector.kind === 'legionary' ? 22 : 18) + player.weaponLevel * 4 + protector.damageBonus;
    const targetHealthBeforeHit = attackTarget.health;
    attackTarget.health -= damage;
    if (attackTarget !== state.boss) attackTarget.aggro = true;
    if ('hitFlash' in attackTarget) attackTarget.hitFlash = 0.18;
    spawnBurst(attackTarget.x, attackTarget.y, 7, '#60a5fa', 85);
    if (attackTarget.health <= 0 && attackTarget !== state.boss) {
      awardEnemyScore(attackTarget);
      attackTarget.dead = true;
      attackTarget.deathTimer = 0.55;
      spawnBurst(attackTarget.x, attackTarget.y, 14, '#60a5fa', 120);
      grantProtectorExperience(protector, 1);
    } else if (attackTarget === state.boss && targetHealthBeforeHit > 0 && attackTarget.health <= 0) {
      grantProtectorExperience(protector, 3);
    }
  }
  }
}

function awakenCrateMimic(crate) {
  crate.isOpen = true;
  crate.openProgress = 2;
  crate.mimicRevealed = true;
  const room = getContainingRoom(crate) || getNearestRoom(crate);
  const mimic = createEnemy(room, state.enemies.length, 'mimic');
  const hardMultiplier = state.hardWaveActive ? 2 : 1;
  mimic.x = crate.x;
  mimic.y = crate.y;
  mimic.radius = 25;
  mimic.speed = Math.min(150, 88 + state.wave * 3);
  mimic.maxHealth = (95 + state.wave * 34) * hardMultiplier;
  mimic.health = mimic.maxHealth;
  mimic.damage = (14 + state.wave * 3.2) * hardMultiplier;
  mimic.aggro = true;
  mimic.elite = true;
  mimic.mimicEnemy = true;
  mimic.mimicRewards = createCrateRewards(8);
  mimic.spawnRoom = room;
  state.enemies.push(mimic);
  spawnBurst(crate.x, crate.y, 28, '#ef4444', 145);
  state.shake = Math.max(state.shake, 10);
  setMessage(`Crate Mimic awakened! ${Math.round(mimic.maxHealth)} health and ${mimic.damage.toFixed(1)} damage.`, true);
}

// Opens one crate and grants all of its stored rewards.
function openCrate(crate, countsForStreak = true) {
  if (crate.isOpen) return false;
  if (crate.mimic && !crate.mimicRevealed) {
    awakenCrateMimic(crate);
    return false;
  }
  crate.openProgress = 2;
  crate.isOpen = true;
  if (countsForStreak) state.crateStreak += 1;
  crate.streakUpgrade = false;
  // Every third damage-free opening improves one ordinary roll without
  // increasing the crate's item count or disturbing rare-key/coin odds.
  if (countsForStreak && state.crateStreak % 3 === 0) {
    const upgradeIndex = crate.rewards.findIndex((reward) => reward === 'food' || reward === 'water' || reward === 'arrowBundle');
    if (upgradeIndex >= 0) {
      const improvedPool = ['bandage', 'protectorShard', 'openerShard', 'shieldShard'];
      crate.rewards[upgradeIndex] = improvedPool[Math.floor(Math.random() * improvedPool.length)];
      crate.streakUpgrade = true;
    }
  }
  crate.rewards.forEach(applyLoot);
  showLootHighlight(crate.rewards);
  return true;
}

// Sends each Opener scurrying to the nearest closed crate until it has opened four.
function updateOpeners(dt) {
  for (const opener of player.openers) {
    opener.openCooldown = Math.max(0, opener.openCooldown - dt);
    opener.scurryPhase = (opener.scurryPhase || 0) + dt * (opener.isMoving ? 11 : 3);
    if ((opener.showcaseTimer || 0) > 0) {
      opener.showcaseTimer = Math.max(0, opener.showcaseTimer - dt);
      opener.isMoving = false;
      opener.target = null;
      continue;
    }
    const closedCrates = state.crates.filter((crate) => (
      !crate.isOpen && (!crate.secretRoom || crate.secretRoom.opened) && !getContainingRoom(crate)?.locked
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
        const opened = openCrate(target, false);
        if (opened) opener.cratesOpened += 1;
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
    if (crate.secretRoom && !crate.secretRoom.opened) continue;
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
          const opened = openCrate(crate);
          if (opened) {
            const streakNote = crate.streakUpgrade ? ` Crate streak ${state.crateStreak}: one loot roll improved.` : '';
            setMessage(`${crate.reinforced
              ? 'Reinforced crate opened! Eight items collected.'
              : `Crate opened! ${crate.rewards.length} items collected.`}${streakNote}`);
          }
        }
      } else {
        crate.openProgress = Math.max(0, crate.openProgress - dt * 0.8);
      }
    } else {
      crate.openProgress = Math.max(0, crate.openProgress - dt * 0.8);
    }
  }
}

function updateSecretRooms() {
  if (state.boss || !keys.has('f')) return;
  const loreLines = [
    'A mason\'s final note: "The dungeon grows around every secret we keep."',
    'A faded expedition record names a safe road that no longer exists.',
    'The wall bears a warning: "Crates remember the hands that sealed them."',
    'An old map marks this chamber as a refuge for the dungeon\'s first scouts.',
  ];
  for (const room of state.rooms) {
    const secret = room.secret;
    if (!secret) continue;
    const entrance = { x: secret.x - 8, y: secret.y + secret.h / 2 };
    if (!secret.opened && distance(player, entrance) <= 82) {
      secret.opened = true;
      keys.delete('f');
      state.shake = Math.max(state.shake, 7);
      spawnBurst(entrance.x, entrance.y, 24, '#a8a29e', 120);
      setMessage(`Secret room opened! ${secret.rewardType === 'lore' ? 'Something is written inside.' : 'A hidden cache waits within.'}`);
      return;
    }
    if (secret.opened && secret.rewardType === 'lore' && !secret.claimed) {
      const lore = { x: secret.x + secret.w / 2, y: secret.y + secret.h / 2 };
      if (distance(player, lore) <= 70) {
        secret.claimed = true;
        keys.delete('f');
        addScore(300);
        setMessage(`${loreLines[Math.floor(Math.random() * loreLines.length)]} +300 points.`, true);
        spawnBurst(lore.x, lore.y, 18, '#fbbf24', 95);
        return;
      }
    }
  }
}

// Resolves the single-use reward from a rare environmental discovery.
function updateDungeonEvents() {
  for (const event of state.dungeonEvents) {
    if (event.used || distance(player, event) > 88 || !keys.has('f')) continue;
    if (event.type === 'merchant') {
      keys.delete('f');
      openMerchant();
      continue;
    }
    event.used = true;
    if (event.type === 'shrine') {
      const healthBefore = player.health;
      const staminaBefore = player.stamina;
      player.health = clamp(player.health + 40, 0, player.maxHealth);
      player.stamina = player.maxStamina;
      const healthRestored = Math.round(player.health - healthBefore);
      const staminaRestored = Math.round(player.stamina - staminaBefore);
      setMessage(
        `Shrine blessing received: Health ${healthRestored > 0 ? `+${healthRestored}` : 'already full'} `
        + `(${Math.round(player.health)}/${Math.round(player.maxHealth)}), stamina ${staminaRestored > 0 ? `+${staminaRestored}` : 'already full'} `
        + `(${Math.round(player.stamina)}/${Math.round(player.maxStamina)}).`,
        true,
      );
      spawnBurst(event.x, event.y - 20, 20, event.room?.theme?.accent || '#67e8f9', 105);
    } else if (event.type === 'camp') {
      player.food = clamp(player.food + 30, 0, 100);
      player.hydration = clamp(player.hydration + 30, 0, 100);
      player.inventory.bandage += 1;
      setMessage('Abandoned Camp searched: food and hydration restored, plus one bandage.');
      spawnBurst(event.x, event.y, 18, '#fb923c', 90);
    } else {
      player.inventory.protectorShard += 1;
      player.inventory.openerShard += 1;
      addScore(250);
      setMessage('Dungeon Scout rescued: +1 Protector Shard, +1 Scout Shard, and 250 points.');
      spawnBurst(event.x, event.y, 20, '#fbbf24', 105);
    }
  }
}

function renderMerchant() {
  merchantResources.textContent = `Arrows ${player.inventory.ammo}  |  Bandages ${player.inventory.bandage}  |  Protector ${player.inventory.protectorShard}  |  Scout ${player.inventory.openerShard}  |  Shield ${player.inventory.shieldShard}`;
  const affordable = {
    medicine: player.inventory.ammo >= 14,
    supplies: player.inventory.bandage >= 1,
    shards: player.inventory.openerShard >= 2,
    edge: state.merchantDamageBoost === 1
      && player.inventory.protectorShard >= 1
      && player.inventory.shieldShard >= 1,
  };
  for (const button of merchantTradeButtons) button.disabled = !affordable[button.dataset.trade];
}

function openMerchant() {
  keys.clear();
  renderMerchant();
  merchantOverlay.classList.remove('hidden');
}

function closeMerchant() {
  keys.clear();
  merchantOverlay.classList.add('hidden');
}

function tradeWithMerchant(trade) {
  if (trade === 'medicine' && player.inventory.ammo >= 14) {
    player.inventory.ammo -= 14;
    player.inventory.bandage += 1;
    setMessage('Merchant trade complete: field medicine acquired.');
  } else if (trade === 'supplies' && player.inventory.bandage >= 1) {
    player.inventory.bandage -= 1;
    player.food = clamp(player.food + 35, 0, 100);
    player.hydration = clamp(player.hydration + 35, 0, 100);
    setMessage('Merchant trade complete: food and hydration restored.');
  } else if (trade === 'shards' && player.inventory.openerShard >= 2) {
    player.inventory.openerShard -= 2;
    player.inventory.protectorShard += 1;
    player.inventory.shieldShard += 1;
    setMessage('Merchant trade complete: Defender Bundle acquired.');
  } else if (trade === 'edge' && state.merchantDamageBoost === 1
    && player.inventory.protectorShard >= 1 && player.inventory.shieldShard >= 1) {
    player.inventory.protectorShard -= 1;
    player.inventory.shieldShard -= 1;
    state.merchantDamageBoost = 1.25;
    setMessage('Honed Edge active: +25% damage until this wave ends.', true);
  }
  renderMerchant();
}

// Applies sparse biome hazards while keeping their effects readable and mild.
function updateBiomeHazards(dt) {
  if (state.boss) return;
  for (const hazard of state.biomeHazards) {
    hazard.cycle = (hazard.cycle + dt) % 3;
    hazard.hitCooldown = Math.max(0, hazard.hitCooldown - dt);
    if (distance(player, hazard) >= hazard.radius) continue;
    if (hazard.type === 'lavaVent' && hazard.cycle > 2.25 && hazard.hitCooldown === 0) {
      hazard.hitCooldown = 1;
      if (!state.developerMode && !player.shieldActive) {
        player.health = clamp(player.health - 12, 0, player.maxHealth);
        state.perfectWaveEligible = false;
        state.crateStreak = 0;
        wearEquippedArmor(12);
      }
      state.lastDeathCause = 'a Cinder Keep lava vent';
      spawnBurst(hazard.x, hazard.y, 15, '#fb923c', 100);
      state.shake = Math.max(state.shake, 5);
    } else if (hazard.type === 'shadowRift') {
      player.stamina = clamp(player.stamina - 24 * dt, 0, player.maxStamina);
      if (player.stamina === 0) player.sprintExhausted = true;
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

// Winds small ranged sentries into the Clockwork Archon's arena.
function summonClockworkOrbs(boss, count = 2) {
  const activeOrbs = state.enemies.filter(
    (enemy) => !enemy.dead && enemy.health > 0 && enemy.type === 'clockworkOrb',
  ).length;
  const summonCount = Math.min(count, Math.max(0, 4 - activeOrbs));
  for (let index = 0; index < summonCount; index += 1) {
    const angle = boss.movePhase + (index + activeOrbs) * Math.PI;
    const health = 108 + boss.tier * 13;
    const orb = {
      x: clamp(boss.x + Math.cos(angle) * 165, state.bossArena.x + 22, state.bossArena.x + state.bossArena.w - 22),
      y: clamp(boss.y + Math.sin(angle) * 165, state.bossArena.y + 22, state.bossArena.y + state.bossArena.h - 22),
      radius: 22,
      speed: 82,
      health,
      maxHealth: health,
      damage: 11 + boss.tier * 1.5,
      type: 'clockworkOrb',
      bossMinion: true,
      aggro: true,
      cooldown: 0,
      aiTimer: 0,
      attackTimer: 0.65 + index * 0.3,
      hitFlash: 0,
      lunge: 0,
      retreatTimer: 0,
      movePhase: angle,
      elite: false,
    };
    ensureEnemyHasBestiaryEntry(orb);
    state.enemies.push(orb);
    spawnBurst(orb.x, orb.y, 34, '#facc15', 175);
  }
  if (summonCount > 0) setMessage(`The Clockwork Archon winds up ${summonCount} Clockwork Orb${summonCount === 1 ? '' : 's'}!`);
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

// Summons the Leviathan's independent tentacles around the arena perimeter.
function summonOctopusMinions(boss, requestedCount = 2) {
  const living = state.enemies.filter(
    (enemy) => enemy.type === 'octopusMinion' && !enemy.dead && enemy.health > 0,
  ).length;
  const summonCount = Math.min(requestedCount, Math.max(0, 4 - living));
  for (let index = 0; index < summonCount; index += 1) {
    const minion = createEnemy(state.bossArena, index, 'octopusMinion');
    const angle = (index / Math.max(1, summonCount)) * Math.PI * 2 + boss.movePhase;
    minion.x = clamp(boss.x + Math.cos(angle) * 190, state.bossArena.x + 42, state.bossArena.x + state.bossArena.w - 42);
    minion.y = clamp(boss.y + Math.sin(angle) * 150, state.bossArena.y + 42, state.bossArena.y + state.bossArena.h - 42);
    minion.bossMinion = true;
    minion.aggro = true;
    minion.elite = false;
    minion.health = 76 + boss.tier * 10;
    minion.maxHealth = minion.health;
    minion.damage = 11 + boss.tier * 1.6;
    ensureEnemyHasBestiaryEntry(minion);
    state.enemies.push(minion);
    spawnBurst(minion.x, minion.y, 26, '#67e8f9', 150);
  }
  if (summonCount > 0) setMessage(`The Abyssal Leviathan tears ${summonCount} living tentacle${summonCount === 1 ? '' : 's'} from the deep!`);
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
      if (state.arenaTrial) rewardArenaTrial();
      else rewardBossLoot();
      beginVictoryPose();
      boss.deathTimer = Math.max(boss.deathTimer, state.victoryPoseDuration);
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
    summonMatchedBossMinion(boss, 'frostDirewolf', 2.4);
    spawnBurst(boss.x, boss.y, 30, '#dbeafe', 165);
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
  const laterPhase = {
    stormglassLeviathan: { threshold: 0.5, attack: 'glassTempest', color: '#22d3ee', message: 'The sea turns to glass. Stormglass Leviathan enters Phase Two!' },
    lunarKitsune: { threshold: 0.5, attack: 'moonfall', color: '#c4b5fd', message: 'Nine moonlit echoes split from the Kitsune. Phase Two begins!' },
    eternityWarden: { threshold: 0.4, attack: 'endOfAges', color: '#fde68a', message: 'The final hour breaks. Eternity Warden enters Phase Two!' },
  }[boss.variant];
  if (laterPhase && boss.phase === 1 && boss.health <= boss.maxHealth * laterPhase.threshold) {
    boss.phase = 2;
    boss.phaseAttack = laterPhase.attack;
    boss.damage *= 1.12;
    boss.cooldown = 0.25;
    boss.attackWindup = 0;
    boss.attackPulse = 1;
    spawnBurst(boss.x, boss.y, 56, laterPhase.color, 220);
    state.shake = Math.max(state.shake, 16);
    setMessage(laterPhase.message);
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

  // The dragon pressures the hero first, but immediately attacks a protector
  // inside its combat radius instead of idling when the hero escapes it.
  const dragonCombatRange = 900;
  const dragonProtectorTarget = boss.variant === 'dragonBoss' && distance(boss, player) > dragonCombatRange
    ? player.protectors
      .filter((protector) => protector.health > 0 && distance(boss, protector) <= dragonCombatRange)
      .reduce((nearest, protector) => (
        !nearest || distance(boss, protector) < distance(boss, nearest) ? protector : nearest
      ), null)
    : null;
  const attackTarget = boss.variant === 'dragonBoss'
    ? dragonProtectorTarget || player
    : getEnemyPreferredTarget(boss);
  boss.attackTarget = attackTarget;
  const dx = attackTarget.x - boss.x;
  const dy = attackTarget.y - boss.y;
  const len = Math.hypot(dx, dy) || 1;
  const dirX = dx / len;
  const dirY = dy / len;
  boss.movePhase += dt * 3.5;
  boss.hitFlash = Math.max(0, boss.hitFlash - dt);
  boss.attackPulse = Math.max(0, boss.attackPulse - dt * 4);
  boss.retreatTimer = Math.max(0, (boss.retreatTimer || 0) - dt);
  boss.retreatDelay = Math.max(0, (boss.retreatDelay || 0) - dt);
  boss.cooldown -= dt * (boss.attackSpeedMultiplier || 1);
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
      const effectColor = boss.variant === 'stormglassLeviathan' ? '#22d3ee' : boss.variant === 'clockworkArchon' ? '#facc15' : boss.variant === 'gravebloomColossus' ? '#c084fc' : boss.variant === 'lunarKitsune' ? '#93c5fd' : boss.variant === 'eternityWarden' ? '#fde68a' : boss.variant === 'lavaGolem' ? '#f97316' : boss.variant === 'lushGolem' ? '#4ade80' : boss.variant === 'oceanBoss' ? '#38bdf8' : boss.variant === 'iceBoss' ? '#bfdbfe' : boss.variant === 'skeletonWarlord' ? '#67e8f9' : boss.variant === 'sandBoss' || boss.variant === 'sandSnake' ? '#fbbf24' : boss.variant === 'shadowBoss' ? '#a855f7' : boss.variant === 'abyssBoss' ? '#38bdf8' : boss.variant === 'scorpionQueen' ? '#f59e0b' : boss.variant === 'fungalBoss' ? '#a3e635' : boss.variant === 'mechOverlord' ? '#fb923c' : boss.variant === 'crystalBoss' ? '#22d3ee' : boss.variant === 'woodBoss' ? '#84cc16' : boss.variant === 'yinYangBoss' ? '#e2e8f0' : boss.variant === 'inkboundArchivist' ? '#fca5a5' : boss.variant === 'crimsonMarionette' ? '#dc2626' : boss.variant === 'meltedMonarch' ? '#f59e0b' : boss.variant === 'drownedBell' ? '#22d3ee' : '#fb7185';

      if (boss.attackType === 'summonWaxAcolytes') {
        summonWaxAcolytes(boss, 2);
        state.shake = 8;
      } else if (boss.attackType === 'summonClockworkOrbs') {
        summonClockworkOrbs(boss, 2);
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
        const fireDx = attackTarget.x - boss.x;
        const fireDy = attackTarget.y - boss.y;
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
      } else if (['drownedBellWave', 'lightningLance', 'stormArcVolley', 'forkedLightning', 'gearVolley', 'archonClockburst', 'cogCrossfire', 'graveSeedVolley', 'graveThornCircle', 'corpsePetalBurst', 'lunarBolts', 'kitsuneStarfan', 'moonCrescentFan', 'hourglassVolley', 'eternityParadox', 'chronoSpiral', 'seraphPortalLance', 'seraphFeatherBarrage'].includes(boss.attackType)) {
        const projectileSettings = {
          drownedBellWave: { count: 7, spread: 0.13, speed: 345, color: '#22d3ee', scale: 0.62 },
          lightningLance: { count: 3, spread: 0.18, speed: 390, color: '#22d3ee', scale: 0.72 },
          stormArcVolley: { count: 8, radial: true, speed: 300, color: '#67e8f9', scale: 0.5 },
          forkedLightning: { count: 7, spread: 0.1, speed: 440, color: '#a5f3fc', scale: 0.44 },
          gearVolley: { count: 5, spread: 0.22, speed: 320, color: '#facc15', scale: 0.55 },
          archonClockburst: { count: 12, radial: true, speed: 250, color: '#fde68a', scale: 0.42 },
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
          seraphPortalLance: { count: 5, spread: 0.105, speed: 455, color: '#38bdf8', scale: 0.62 },
          seraphFeatherBarrage: { count: 15, spread: 0.065, speed: 405, color: '#fbbf24', scale: 0.38 },
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
        boss.lungeDamageScale = boss.attackType === 'darkRiftDash' ? 1.55 : boss.attackType === 'undertowDash' ? 1.42 : boss.attackType === 'crimsonPirouetteDash' ? 1.35 : boss.attackType === 'flameDash' ? 1.3 : boss.attackType === 'waterDash' ? 1.2 : boss.attackType === 'frostDash' ? 1.25 : boss.attackType === 'serpentDash' ? 1.45 : 1.1;
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
      } else if (boss.attackType === 'summonTentacles') {
        summonOctopusMinions(boss, 2);
        state.shake = 11;
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
      } else if (boss.attackType === 'constrictionVortex' || boss.attackType === 'inkCloud') {
        const attackRadius = boss.attackType === 'constrictionVortex' ? 260 : 330;
        const damageScale = boss.attackType === 'constrictionVortex' ? 1.08 : 0.82;
        for (const victim of [player, ...player.protectors, ...player.openers]) {
          if (distance(boss, victim) <= attackRadius) applyCombatDamage(victim, boss.damage * damageScale, boss);
        }
        if (boss.attackType === 'inkCloud' && distance(boss, player) <= attackRadius) {
          player.stamina = Math.max(0, player.stamina - 28);
          player.frozenTimer = Math.max(player.frozenTimer, 0.55);
        }
        spawnBurst(boss.x, boss.y, 52, boss.attackType === 'inkCloud' ? '#312e81' : '#67e8f9', 250);
        state.shake = boss.attackType === 'inkCloud' ? 16 : 13;
      } else if (boss.attackType === 'thornRing' || boss.attackType === 'heartwoodEruption' || boss.attackType === 'eruption' || boss.attackType === 'tidalWave' || boss.attackType === 'blizzard' || boss.attackType === 'nova' || boss.attackType === 'abyssNova' || boss.attackType === 'venomNova' || boss.attackType === 'sporeburst' || boss.attackType === 'reactorNova' || boss.attackType === 'crystalEruption' || boss.attackType === 'scarabStorm' || boss.attackType === 'yinYangNova' || boss.attackType === 'yinYangRoundhouse' || boss.attackType === 'yinYangArenaSlam' || boss.attackType === 'hollowStarRoundhouse' || boss.attackType === 'hollowStarGroundSlam' || boss.attackType === 'inkboundSweep' || boss.attackType === 'inkboundDecree' || boss.attackType === 'crimsonSnare' || boss.attackType === 'crimsonFinalCurtain' || boss.attackType === 'royalMeltdown' || boss.attackType === 'drownedSweep' || boss.attackType === 'deathKnell' || boss.attackType === 'glassTempest' || boss.attackType === 'stormSurge' || boss.attackType === 'shatteredTide' || boss.attackType === 'judgmentHour' || boss.attackType === 'timeLock' || boss.attackType === 'rewindPulse' || boss.attackType === 'gravebloom' || boss.attackType === 'rootCage' || boss.attackType === 'tombVines' || boss.attackType === 'moonfall' || boss.attackType === 'eclipseNova' || boss.attackType === 'foxfireCircle' || boss.attackType === 'timeCollapse' || boss.attackType === 'endOfAges' || boss.attackType === 'finalSecond' || boss.attackType === 'seraphClockfall') {
        const lateBossRadius = { glassTempest: 330, stormSurge: 260, shatteredTide: 365, judgmentHour: 380, timeLock: 300, rewindPulse: 335, gravebloom: 345, rootCage: 275, tombVines: 315, moonfall: 410, eclipseNova: 350, foxfireCircle: 290, timeCollapse: Infinity, endOfAges: Infinity, finalSecond: 390, seraphClockfall: 420 }[boss.attackType];
        const attackRadius = lateBossRadius ?? (boss.attackType === 'yinYangArenaSlam' || boss.attackType === 'crimsonFinalCurtain' || boss.attackType === 'royalMeltdown' || boss.attackType === 'deathKnell' ? Infinity : boss.attackType === 'drownedSweep' ? 225 : boss.attackType === 'crimsonSnare' ? 285 : boss.attackType === 'inkboundDecree' ? 365 : boss.attackType === 'inkboundSweep' ? 205 : boss.attackType === 'hollowStarGroundSlam' ? 390 : boss.attackType === 'hollowStarRoundhouse' ? 195 : boss.attackType === 'yinYangRoundhouse' ? 175 : boss.attackType === 'yinYangNova' ? 345 : boss.attackType === 'thornRing' ? 165 : boss.attackType === 'heartwoodEruption' ? 305 : boss.attackType === 'eruption' ? 285 : boss.attackType === 'tidalWave' ? 250 : boss.attackType === 'blizzard' ? 265 : boss.attackType === 'abyssNova' ? (boss.phase === 2 ? 330 : 270) : boss.attackType === 'venomNova' ? 295 : boss.attackType === 'sporeburst' ? 300 : boss.attackType === 'reactorNova' ? 320 : boss.attackType === 'crystalEruption' ? 335 : boss.attackType === 'scarabStorm' ? 325 : 210 + boss.tier * 8);
        const lateBossDamage = { glassTempest: 1.12, stormSurge: 0.9, shatteredTide: 1.02, judgmentHour: 1.18, timeLock: 0.72, rewindPulse: 0.78, gravebloom: 1.08, rootCage: 0.84, tombVines: 0.76, moonfall: 1.25, eclipseNova: 1, foxfireCircle: 0.92, timeCollapse: 1.5, endOfAges: 1.35, finalSecond: 1.12, seraphClockfall: 1.32 }[boss.attackType];
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
        const advancingTentacleSlam = boss.variant === 'octopusBoss' && boss.attackType === 'tentacleSlam';
        const lungeCap = plantedGolemSlam ? 24 : advancingTentacleSlam ? 210 : 58;
        const lungeDistance = Math.min(lungeCap, Math.max(0, len - boss.radius - attackTarget.radius + 18));
        boss.lungeDuration = advancingTentacleSlam ? 0.34 : 0.2;
        boss.lungeTimer = boss.lungeDuration;
        boss.lungeRemaining = lungeDistance;
        boss.lungeDirX = dirX;
        boss.lungeDirY = dirY;
        boss.lungeDamageScale = boss.attackType === 'seraphHalberd' ? 2.05 : boss.attackType === 'epochBlade' ? 2.15 : boss.attackType === 'crescentCut' ? 1.78 : boss.attackType === 'tombMaul' ? 2.05 : boss.attackType === 'gearHalberd' ? 1.9 : boss.attackType === 'tridentCrush' ? 1.88 : boss.attackType === 'meltedCleave' ? 1.82 : boss.attackType === 'crimsonScissor' ? 1.8 : boss.attackType === 'inkboundQuill' ? 1.75 : boss.attackType === 'hollowStarOverhead' ? 1.72 : boss.attackType === 'yinYangOverhead' ? 1.6 : boss.attackType === 'dragonSwipe' ? 0.68 : boss.attackType === 'hammerSlam' ? 1.55 : boss.attackType === 'rootSlam' ? 1.05 : boss.attackType === 'tideSlam' ? 1.35 : boss.attackType === 'iceSlam' ? 1.4 : boss.attackType === 'boneSlam' ? 1.5 : boss.attackType === 'sandSlam' ? 1.48 : boss.attackType === 'staffCrush' ? 1.9 : boss.attackType === 'abyssRend' ? 1.7 : boss.attackType === 'abyssSlam' ? 1.4 : boss.attackType === 'pincerSlam' ? 1.75 : boss.attackType === 'myceliumSlam' ? 1.65 : boss.attackType === 'drillSlam' ? 1.85 : boss.attackType === 'crystalSlam' ? 1.8 : boss.attackType === 'woodSlam' ? 1.45 : 1.25;
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
    const orbitStrength = boss.variant === 'dragonBoss' ? 58 : 36;
    const orbit = retreating || plantedGolem ? 0 : Math.sin(boss.movePhase * 0.7) * orbitStrength;
    const baseSpeed = boss.variant === 'dragonBoss' ? (retreating ? 140 : 96) : boss.variant === 'drownedBell' ? (retreating ? 112 : 58) : boss.variant === 'meltedMonarch' ? (retreating ? 120 : 62) : retreating ? 145 : plantedGolem ? 58 : boss.cooldown < 0.35 ? 125 : 72;
    const speed = baseSpeed * (boss.phase === 2 && ['stormglassLeviathan', 'lunarKitsune', 'eternityWarden'].includes(boss.variant) ? 1.12 : 1);
    const closingDistance = boss.radius + attackTarget.radius + 34;
    const movementX = retreating
      ? (retreatDx / retreatLength) * speed
      : !recovering && len > closingDistance
        ? dirX * speed - dirY * orbit
        : !recovering && !plantedGolem ? -dirY * (boss.variant === 'dragonBoss' ? 105 : 58) : 0;
    const movementY = retreating
      ? (retreatDy / retreatLength) * speed
      : !recovering && len > closingDistance
        ? dirY * speed + dirX * orbit
        : !recovering && !plantedGolem ? dirX * (boss.variant === 'dragonBoss' ? 105 : 58) : 0;
    if (Math.abs(movementX) > 3) boss.facingX = movementX;
    boss.x = clamp(boss.x + movementX * dt, state.bossArena.x + boss.radius, state.bossArena.x + state.bossArena.w - boss.radius);
    boss.y = clamp(boss.y + movementY * dt, state.bossArena.y + boss.radius, state.bossArena.y + state.bossArena.h - boss.radius);
    const bossAttackRange = boss.tier >= 20 ? 760 : boss.variant === 'dragonBoss' ? 900 : 430;
    if (!recovering && boss.cooldown <= 0 && len < bossAttackRange) {
      const attackRoll = Math.random();
      const forcedLateRangedAttack = len > 320 ? {
        meltedMonarch: 'meltedCandleburst',
        drownedBell: 'drownedBellWave',
        stormglassLeviathan: 'lightningLance',
        clockworkArchon: 'gearVolley',
        gravebloomColossus: 'graveSeedVolley',
        lunarKitsune: 'lunarBolts',
        eternityWarden: 'hourglassVolley',
        octopusBoss: 'inkCloud',
        clockworkSeraph: 'seraphPortalLance',
      }[boss.variant] : null;
      if (boss.phaseAttack) {
        boss.attackType = boss.phaseAttack;
        boss.phaseAttack = null;
      } else if (forcedLateRangedAttack) {
        boss.attackType = forcedLateRangedAttack;
      } else if (boss.variant === 'stormglassLeviathan') {
        boss.attackType = attackRoll < 0.19 ? 'tridentCrush' : attackRoll < 0.34 ? 'stormglassDash' : attackRoll < 0.48 ? 'lightningLance' : attackRoll < 0.61 ? 'stormArcVolley' : attackRoll < 0.72 ? 'forkedLightning' : attackRoll < 0.83 ? 'glassTempest' : attackRoll < 0.92 ? 'stormSurge' : 'shatteredTide';
      } else if (boss.variant === 'clockworkArchon') {
        const activeClockworkOrbs = state.enemies.filter(
          (enemy) => !enemy.dead && enemy.health > 0 && enemy.type === 'clockworkOrb',
        ).length;
        boss.attackType = attackRoll < 0.12 && activeClockworkOrbs < 4 ? 'summonClockworkOrbs' : attackRoll < 0.26 ? 'gearHalberd' : attackRoll < 0.4 ? 'clockworkDash' : attackRoll < 0.52 ? 'gearVolley' : attackRoll < 0.64 ? 'archonClockburst' : attackRoll < 0.74 ? 'cogCrossfire' : attackRoll < 0.84 ? 'judgmentHour' : attackRoll < 0.93 ? 'timeLock' : 'rewindPulse';
      } else if (boss.variant === 'gravebloomColossus') {
        boss.attackType = attackRoll < 0.21 ? 'tombMaul' : attackRoll < 0.36 ? 'rootChargeDash' : attackRoll < 0.49 ? 'graveSeedVolley' : attackRoll < 0.62 ? 'graveThornCircle' : attackRoll < 0.73 ? 'corpsePetalBurst' : attackRoll < 0.84 ? 'gravebloom' : attackRoll < 0.93 ? 'rootCage' : 'tombVines';
      } else if (boss.variant === 'lunarKitsune') {
        boss.attackType = attackRoll < 0.18 ? 'crescentCut' : attackRoll < 0.34 ? 'ninefoldDash' : attackRoll < 0.48 ? 'lunarBolts' : attackRoll < 0.61 ? 'kitsuneStarfan' : attackRoll < 0.72 ? 'moonCrescentFan' : attackRoll < 0.83 ? 'moonfall' : attackRoll < 0.92 ? 'eclipseNova' : 'foxfireCircle';
      } else if (boss.variant === 'eternityWarden') {
        boss.attackType = attackRoll < 0.17 ? 'epochBlade' : attackRoll < 0.31 ? 'timeRendDash' : attackRoll < 0.44 ? 'hourglassVolley' : attackRoll < 0.57 ? 'eternityParadox' : attackRoll < 0.68 ? 'chronoSpiral' : attackRoll < 0.8 ? 'timeCollapse' : attackRoll < 0.9 ? 'endOfAges' : 'finalSecond';
      } else if (boss.variant === 'octopusBoss') {
        const livingTentacles = state.enemies.filter(
          (enemy) => enemy.type === 'octopusMinion' && !enemy.dead && enemy.health > 0,
        ).length;
        boss.attackType = attackRoll < 0.2 && livingTentacles < 4 ? 'summonTentacles'
          : attackRoll < 0.58 ? 'tentacleSlam'
            : attackRoll < 0.82 ? 'constrictionVortex' : 'inkCloud';
      } else if (boss.variant === 'clockworkSeraph') {
        boss.attackType = attackRoll < 0.32 ? 'seraphHalberd'
          : attackRoll < 0.61 ? 'seraphPortalLance'
            : attackRoll < 0.86 ? 'seraphFeatherBarrage' : 'seraphClockfall';
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
        // A readable martial sequence replaces random animation jumps:
        // committed strike -> sweep -> energy release, then a stronger repeat
        // that finishes with the full-arena slam.
        const yinYangAttackSequence = [
          'yinYangOverhead',
          'yinYangRoundhouse',
          'yinYangNova',
          'yinYangOverhead',
          'yinYangRoundhouse',
          'yinYangArenaSlam',
        ];
        const sequenceIndex = boss.yinYangSequenceIndex % yinYangAttackSequence.length;
        boss.attackType = yinYangAttackSequence[sequenceIndex];
        boss.yinYangSequenceIndex = (sequenceIndex + 1) % yinYangAttackSequence.length;
      } else if (boss.variant === 'dragonBoss') {
        boss.attackType = boss.fireBreathCooldown <= 0
          ? 'dragonFire'
          : attackRoll < 0.58 ? 'dragonIceStaff' : 'dragonSwipe';
        if (boss.attackType === 'dragonFire') {
          boss.attackAimAngle = Math.atan2(attackTarget.y - boss.y, attackTarget.x - boss.x);
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
      const radialAttack = ['thornRing', 'heartwoodEruption', 'healingBloom', 'eruption', 'tidalWave', 'blizzard', 'nova', 'abyssNova', 'venomNova', 'summonBrood', 'summonNightclaw', 'summonDreadscale', 'sporeburst', 'reactorNova', 'deploySentinel', 'deployBear', 'crystalEruption', 'scarabStorm', 'yinYangNova', 'yinYangRoundhouse', 'yinYangArenaSlam', 'hollowStarRoundhouse', 'hollowStarGroundSlam', 'inkboundSweep', 'inkboundDecree', 'crimsonSnare', 'crimsonFinalCurtain', 'royalMeltdown', 'drownedSweep', 'deathKnell', 'glassTempest', 'stormSurge', 'shatteredTide', 'summonClockworkOrbs', 'judgmentHour', 'timeLock', 'rewindPulse', 'gravebloom', 'rootCage', 'tombVines', 'moonfall', 'eclipseNova', 'foxfireCircle', 'timeCollapse', 'endOfAges', 'finalSecond'].includes(boss.attackType);
      boss.attackWindupTotal = radialAttack ? 0.9 : boss.attackType.includes('Dash') ? 0.58 : 0.46;
      boss.attackWindup = boss.attackWindupTotal;
      boss.cooldown = Math.max(boss.variant === 'abyssBoss' && boss.phase === 2 ? 0.62 : 0.85, (radialAttack ? 2.15 : 1.55) - boss.tier * 0.07 - (boss.variant === 'abyssBoss' && boss.phase === 2 ? 0.25 : 0));
      if (boss.attackType === 'summonClockworkOrbs') {
        boss.attackWindupTotal = 1.25;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = 2.8;
      }
      if (boss.variant === 'lavaGolem') {
        boss.attackWindupTotal = boss.attackType === 'eruption' ? 0.72 : 0.38;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'eruption' ? 1.25 : 0.9;
      }
      if (boss.variant === 'dragonBoss') {
        boss.attackWindupTotal = boss.attackType === 'dragonFire' ? 1.05 : boss.attackType === 'dragonIceStaff' ? 0.55 : 0.34;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'dragonFire' ? 1.8 : 1.15;
      }
      if (boss.variant === 'yinYangBoss') {
        boss.attackWindupTotal = boss.attackType === 'yinYangArenaSlam' ? 2.1 : boss.attackType === 'yinYangOverhead' ? 1.35 : boss.attackType === 'yinYangRoundhouse' ? 1.16 : 1.18;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'yinYangArenaSlam' ? 3.8 : boss.attackType === 'yinYangNova' ? 2 : 1.25;
      }
      if (boss.variant === 'hollowStarBoss') {
        boss.attackWindupTotal = boss.attackType === 'hollowStarGroundSlam' ? 3.05 : boss.attackType === 'hollowStarOverhead' ? 2.05 : 1.82;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'hollowStarGroundSlam' ? 4.7 : 1.9;
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
        boss.attackWindupTotal = boss.attackType === 'deathKnell' ? 2.65 : boss.attackType === 'drownedBellWave' ? 0.95 : boss.attackType === 'undertowDash' ? 1.08 : 1.5;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'deathKnell' ? 4.9 : boss.attackType === 'drownedBellWave' ? 1.9 : boss.attackType === 'undertowDash' ? 1.85 : 1.75;
      }
      if (['stormglassLeviathan', 'clockworkArchon', 'gravebloomColossus', 'lunarKitsune', 'eternityWarden'].includes(boss.variant)) {
        const ultimateAttack = ['glassTempest', 'stormSurge', 'shatteredTide', 'judgmentHour', 'timeLock', 'rewindPulse', 'gravebloom', 'rootCage', 'tombVines', 'moonfall', 'eclipseNova', 'foxfireCircle', 'timeCollapse', 'endOfAges', 'finalSecond'].includes(boss.attackType);
        const projectileAttack = ['lightningLance', 'stormArcVolley', 'forkedLightning', 'gearVolley', 'archonClockburst', 'cogCrossfire', 'graveSeedVolley', 'graveThornCircle', 'corpsePetalBurst', 'lunarBolts', 'kitsuneStarfan', 'moonCrescentFan', 'hourglassVolley', 'eternityParadox', 'chronoSpiral'].includes(boss.attackType);
        const summonAttack = boss.attackType === 'summonClockworkOrbs';
        boss.attackWindupTotal = summonAttack ? 1.25 : ultimateAttack ? (boss.attackType === 'timeCollapse' || boss.attackType === 'endOfAges' ? 2.6 : 1.8) : projectileAttack ? 0.92 : boss.attackType.includes('Dash') ? 0.72 : 0.58;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = summonAttack ? 2.8 : ultimateAttack ? 3.8 : projectileAttack ? 1.9 : 1.35;
      }
      if (boss.variant === 'octopusBoss') {
        const areaAttack = boss.attackType === 'constrictionVortex' || boss.attackType === 'inkCloud';
        boss.attackWindupTotal = boss.attackType === 'summonTentacles' ? 1.45
          : boss.attackType === 'inkCloud' ? 1.7
            : boss.attackType === 'constrictionVortex' ? 1.35 : 0.82;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'summonTentacles' ? 3.2 : areaAttack ? 2.5 : 1.45;
      }
      if (boss.variant === 'clockworkSeraph') {
        boss.attackWindupTotal = boss.attackType === 'seraphClockfall' ? 2.05
          : boss.attackType === 'seraphFeatherBarrage' ? 1.15
            : boss.attackType === 'seraphPortalLance' ? 1.05 : 0.78;
        boss.attackWindup = boss.attackWindupTotal;
        boss.cooldown = boss.attackType === 'seraphClockfall' ? 3.6 : 1.75;
      }
      // Give illustrated boss poses enough screen time to read. Later bosses
      // retain their aggressive cooldowns, but their wind-up frames no longer
      // flick past in roughly half a second.
      if (boss.tier >= 10) {
        const animationScale = boss.tier >= 20 ? 1.45 : 1.3;
        const separatedFrameCount = boss.variant === 'clockworkSeraph'
          ? (boss.attackType === 'seraphHalberd' || boss.attackType === 'seraphPortalLance' ? 3 : 4)
          : boss.variant === 'lunarKitsune' ? 4
            : boss.variant === 'hollowStarBoss' ? 3 : 0;
        const minimumReadableWindup = separatedFrameCount > 0
          ? separatedFrameCount * 0.42
          : 1.05;
        const slowedWindup = Math.max(minimumReadableWindup, Math.min(
          boss.attackWindupTotal * animationScale,
          boss.attackWindupTotal + 0.7,
        ));
        boss.attackWindupTotal = slowedWindup;
        boss.attackWindup = slowedWindup;
        boss.cooldown = Math.max(boss.cooldown, boss.tier >= 20 ? 1.7 : 1.45);
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
    state.lastBossDefeatTime = state.bossFightTimer;
    if (state.pantheonFinalTrial) {
      group.forEach((boss) => {
        discoverJournalEntry(boss.variant);
        addScore(getBossScore(boss));
      });
      grantPantheonCrateCache();
      player.health = clamp(player.health + 30, 0, player.maxHealth);
      state.pantheonFinalBatch += 1;
      setMessage('Pantheon final-trial group defeated!');
    } else {
      rewardBossLoot();
      setMessage('The entire Pantheon group has fallen!');
    }
    beginVictoryPose();
    group.forEach((boss) => { boss.deathTimer = Math.max(boss.deathTimer || 0, state.victoryPoseDuration); });
  }
  if (group.every((boss) => (boss.deathTimer || 0) === 0)) {
    state.enemyProjectiles = [];
    state.playerProjectiles = [];
    state.enemies = [];
    if (state.pantheonFinalTrial && state.pantheonFinalBatch * 3 >= 28) {
      completePantheon();
    } else {
      spawnBoss();
      showBossSplash();
    }
  }
}

// Converts internal camelCase item IDs into readable labels.
function formatLootName(item) {
  if (item === 'armorShard') return 'Armour Shard (+20% durability)';
  if (item === 'openerShard') return 'Scout Shard';
  if (item === 'arrowBundle') return 'Arrow Bundle (+7 shots)';
  if (item === 'luckyCoin') return 'Lucky Coin';
  if (item === 'arenaKey') return 'Arena Key';
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
function renderPauseRunSummary() {
  pauseWaveValue.textContent = String(state.wave);
  pauseBossValue.textContent = String(state.bossDefeated);
  const runRelicCount = new Set(state.relics.map((relic) => relic.id)).size;
  const permanentRelicCount = biomeRelics.filter((relic) => journalDiscoveries.has(relic.id)).length;
  pauseRelicValue.textContent = `${runRelicCount} run / ${permanentRelicCount} total`;

  const bonuses = [];
  const champion = state.enemies.find((enemy) => enemy.champion && !enemy.dead);
  if (state.hardWaveActive && !state.hardWaveRewarded) bonuses.push('Hard Wave: regular enemies have 2x health and damage');
  if (champion) bonuses.push(`Named Champion: ${champion.championName} has 5x stats`);
  if (state.arenaTrial) bonuses.push('Arena Key Trial: boss has 3x health and damage');
  if (state.luckyCoinActive) bonuses.push('Lucky Coin: unopened crates contain 10 items');
  if (state.merchantDamageBoost > 1) bonuses.push('Honed Edge: +25% weapon damage this wave');
  if (player.shieldActive) bonuses.push(`Active shield: ${Math.max(0, player.shieldTimer).toFixed(1)}s remaining`);
  if (state.perfectWaveEligible && !state.pantheonMode) bonuses.push('Perfect Wave reward still available');
  if (state.relics.length > 0) bonuses.push(`Biome relic vitality: +${runRelicCount * 5} maximum health`);
  const leveledProtectors = player.protectors.filter((protector) => (protector.level || 1) > 1);
  if (leveledProtectors.length > 0) bonuses.push(`${leveledProtectors.length} experienced Protector${leveledProtectors.length === 1 ? '' : 's'} surviving`);
  const armor = getEquippedArmor();
  if (armor.defense > 0) bonuses.push(`${armor.name}: ${armor.defense}% damage reduction`);
  if (armor.thorns > 0) bonuses.push(`${armor.name}: ${armor.thorns}% thorns reflection`);
  if (hasRelicCompletionTitle()) bonuses.push(relicCompletionTitle);

  pauseBonusList.replaceChildren();
  for (const bonus of bonuses.length > 0 ? bonuses : ['No active bonuses']) {
    const item = document.createElement('li');
    item.textContent = bonus;
    pauseBonusList.appendChild(item);
  }
}

function togglePause() {
  if (!state.started || state.isGameOver) return;
  state.paused = !state.paused;
  pauseKeyboardUnlockAt = state.paused ? performance.now() + 350 : 0;
  keys.clear();
  if (state.paused) renderPauseRunSummary();
  pauseOverlay.classList.toggle('hidden', !state.paused);
}

// Leaves an active run from either the pause button or its Esc shortcut.
function quitPausedRun() {
  state.paused = false;
  state.started = false;
  pauseKeyboardUnlockAt = 0;
  pauseOverlay.classList.add('hidden');
  keys.clear();
  showMainMenu('pause-quit');
}

// Finalizes the run, records its rank, and prepares the delayed death screen.
function die() {
  if (battlegroundRunLock || state.battlegroundSessionGuard || state.battlegroundMode) {
    state.isGameOver = false;
    state.started = true;
    return;
  }
  if (state.developerMode) {
    player.health = Math.max(1, player.health);
    return;
  }
  if (state.isGameOver) return;
  state.isGameOver = true;
  state.started = false;
  state.paused = false;
  pauseOverlay.classList.add('hidden');
  inventoryPanel.classList.add('hidden');
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
  const leaderboardRank = recordCompletedRun(state.score, state.wave, 28);
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
  if (battlegroundRunLock) {
    state.isGameOver = false;
    state.battlegroundMode = true;
    state.battlegroundSessionGuard = true;
    state.started = true;
    overlay.classList.add('hidden');
    document.body.classList.add('battleground-mode');
    battlegroundPanel.classList.remove('hidden');
    battlegroundStatus.textContent = 'Blocked an unexpected reset. The Battleground battle is still active.';
    return false;
  }
  state.wave = 1;
  state.score = 0;
  state.maxRooms = state.godMode && (state.godTravelMode === 'biome' || state.godTravelMode === 'enemy')
    ? 1
    : 8;
  state.enemies = [];
  state.crates = [];
  state.dungeonEvents = [];
  state.biomeHazards = [];
  state.arenaTrial = false;
  state.arenaTrialTier = 0;
  state.survivalArenaMode = false;
  state.survivalArenaObstacles = [];
  state.survivalArenaNextWaveTimer = 0;
  state.survivalArenaDisasterTimer = 0;
  state.survivalArenaDisaster = null;
  state.survivalArenaDisasterFlash = 0;
  state.battlegroundMode = false;
  state.battlegroundSessionGuard = false;
  state.battleUnits = [];
  state.battleEnemies = [];
  state.battleEnemyQueue = [];
  state.battleProjectiles = [];
  state.battleStompEffects = [];
  state.battlegroundSpawnTimer = 0;
  state.battlegroundIncomeTimer = 1;
  state.battlegroundRetreatTimer = 0;
  state.battlegroundExitArmedUntil = 0;
  state.battlegroundTransitionTimer = 0;
  state.battlegroundResult = '';
  state.romanEmergencyGuardActive = false;
  arenaTrialOverlay.classList.add('hidden');
  survivalArenaOverlay.classList.add('hidden');
  survivalArenaTutorialOverlay.classList.add('hidden');
  battlegroundPanel.classList.add('hidden');
  document.body.classList.remove('battleground-mode');
  if (survivalArenaTutorialTimer) window.clearInterval(survivalArenaTutorialTimer);
  survivalArenaTutorialTimer = null;
  state.pendingBossCrates = 0;
  state.pendingReinforcedCrates = 0;
  state.crateStreak = 0;
  state.perfectWaveEligible = true;
  state.luckyCoinActive = false;
  state.luckyCoinBurstTimer = 0;
  state.luckyCoinBurstTargets = [];
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
  state.bossIntroTimer = 0;
  state.bossFightTimer = 0;
  state.lastBossDefeatTime = null;
  state.victoryPoseTimer = 0;
  state.victoryPoseTarget = null;
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
  state.hardWaveActive = false;
  state.hardWaveRewarded = false;
  state.relics = [];
  state.merchantDamageBoost = 1;
  merchantOverlay.classList.add('hidden');
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
  player.walkPhase = 0;
  player.walkBlend = 0;
  player.walkAnimationTime = performance.now();
  player.inventory = { bandage: arenaLegacy.veteranSupplies ? 2 : 0, arenaPotion: accountSpecialLoot.arenaPotions, fieldMedicPotion: accountSpecialLoot.fieldMedicPotions, ammo: arenaLegacy.veteranSupplies ? 15 : 0, protectorShard: 0, openerShard: 0, shieldShard: 0, armorShard: accountSpecialLoot.armorShards, luckyCoin: accountSpecialLoot.luckyCoins, arenaKey: accountSpecialLoot.arenaKeys };
  restorePersistentArenaKeys();
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
  return true;
}

// Returns from a finished run while preserving the current hero and equipment.
// Active modes may only reach this destructive reset through a named exit path;
// this prevents delayed callbacks or stray UI events from silently ending them.
function showMainMenu(exitReason = 'menu-navigation') {
  const activeMode = battlegroundRunLock
    ? 'Battleground'
    : state.pantheonSessionGuard
      ? 'Pantheon'
    : state.battlegroundSessionGuard
      ? 'Battleground'
    : state.battlegroundMode
    ? 'Battleground'
    : state.survivalArenaMode
      ? 'Arena'
      : state.pantheonMode
        ? 'Pantheon'
        : state.godMode
          ? 'Showcase'
          : null;
  const approvedActiveExits = new Set([
    'pause-quit',
    'battleground-confirmed',
    'pantheon-confirmed',
    'showcase-exit',
    'game-over-continue',
  ]);
  // Battleground can only be left through its own confirmed two-click Exit.
  // Generic pause, death, idle, and delayed navigation must never end it.
  if (battlegroundRunLock && exitReason !== 'battleground-confirmed') {
    keys.clear();
    state.isGameOver = false;
    state.battlegroundMode = true;
    state.battlegroundSessionGuard = true;
    state.started = true;
    state.paused = false;
    pauseOverlay.classList.add('hidden');
    overlay.classList.add('hidden');
    document.body.classList.add('battleground-mode');
    battlegroundPanel.classList.remove('hidden');
    battlegroundStatus.textContent = 'Blocked an unexpected exit. The Battleground battle is still active.';
    return false;
  }
  if (activeMode && !state.isGameOver && !approvedActiveExits.has(exitReason)) {
    keys.clear();
    if (state.battlegroundMode) battlegroundStatus.textContent = `Blocked an unexpected menu reset. ${activeMode} is still active.`;
    else setMessage(`Blocked an unexpected menu reset. ${activeMode} is still active.`, true);
    overlay.classList.add('hidden');
    state.started = true;
    return false;
  }
  state.pantheonSessionGuard = false;
  state.battlegroundSessionGuard = false;
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
  if (!resetRun()) return false;
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
  return true;
}

// Attract mode is a harmless arcade reel: it never starts or mutates a run.
function homeMenuIsIdleReady() {
  return !state.started
    && !state.isGameOver
    && !state.pantheonMode
    && !state.threatSplashOpen
    && !state.pendingWaveSplash
    && !state.boss
    && !overlay.classList.contains('hidden')
    && waveSplash.classList.contains('hidden')
    && pauseOverlay.classList.contains('hidden')
    && challengeOverlay.classList.contains('hidden')
    && arenaTrialOverlay.classList.contains('hidden')
    && survivalArenaOverlay.classList.contains('hidden')
    && survivalArenaTutorialOverlay.classList.contains('hidden')
    && merchantOverlay.classList.contains('hidden')
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
  attractMode.overlayWasHidden = overlay.classList.contains('hidden');
  keys.clear();
  overlay.classList.add('hidden');
  document.body.classList.add('attract-mode');
}

function stopAttractMode() {
  if (!attractMode.active) {
    resetAttractIdleTimer();
    return;
  }
  attractMode.active = false;
  attractMode.elapsed = 0;
  document.body.classList.remove('attract-mode');
  // Restore what the reel covered instead of assuming it was the title menu.
  // If gameplay began asynchronously while the reel was up, the game overlay
  // must remain hidden so a Pantheon or wave introduction is never obscured.
  if (attractMode.overlayWasHidden || state.started || state.threatSplashOpen || state.pantheonMode) {
    overlay.classList.add('hidden');
  } else {
    overlay.classList.remove('hidden');
  }
  attractMode.overlayWasHidden = null;
  resetAttractIdleTimer();
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
  'fungalBoss', 'mechOverlord', 'crystalBoss', 'sandSnake', 'dragonBoss', 'yinYangBoss', 'hollowStarBoss', 'inkboundArchivist', 'crimsonMarionette', 'meltedMonarch', 'drownedBell', 'stormglassLeviathan', 'clockworkArchon', 'gravebloomColossus', 'lunarKitsune', 'eternityWarden', 'octopusBoss', 'clockworkSeraph', 'standard',
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
    'clockwork-citadel': { themeIndex: 8, roomArtwork: 'clockworkArchonArena', name: 'Clockwork Citadel' },
    'clockwork-seraph': { themeIndex: 8, roomArtwork: 'clockworkSeraphArena', name: 'Celestial Clockworks' },
    'gravebloom-colossus': { themeIndex: 0, roomArtwork: 'gravebloomArena', name: 'Gravebloom Cemetery' },
    'lunar-kitsune': { themeIndex: 7, roomArtwork: 'lunarKitsuneArena', name: 'Moonlit Court' },
    'eternity-warden': { themeIndex: 7, roomArtwork: 'eternityWardenArena', name: 'End of Time' },
    'abyssal-leviathan': { themeIndex: 7, roomArtwork: 'octopusArena', name: 'Leviathan Trench' },
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
  if (battlegroundRunLock) return;
  document.body.classList.add('room-showcase');
  state.godMode = true;
  state.godTravelMode = 'biome';
  state.forcedThemeIndex = themeIndex;
  state.forcedEnemyType = null;
  state.forcedBossVariant = null;
  state.forcedRoomArtwork = null;
  if (!resetRun()) return;
  closeGodModeForTravel();
  startGame();
}

function enterGodEnemy(entry) {
  if (battlegroundRunLock) return;
  document.body.classList.remove('room-showcase');
  const biome = getGodBiome(entry);
  state.godMode = true;
  state.godTravelMode = 'enemy';
  state.forcedThemeIndex = biome.themeIndex;
  state.forcedEnemyType = entry.id;
  state.forcedBossVariant = null;
  state.forcedRoomArtwork = biome.roomArtwork;
  if (!resetRun()) return;
  closeGodModeForTravel();
  startGame();
  setMessage(`${entry.name} in ${biome.name}. Press Esc to return.`);
}

function enterGodBoss(entry) {
  if (battlegroundRunLock) return;
  document.body.classList.remove('room-showcase');
  state.godMode = true;
  state.godTravelMode = 'boss';
  state.forcedThemeIndex = getGodThemeIndex(entry);
  state.forcedEnemyType = null;
  state.forcedBossVariant = entry.id;
  state.forcedRoomArtwork = null;
  if (!resetRun()) return;
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
            : theme.name === 'Astralroot Grove'
              ? art.astralrootRoom
            : theme.name === 'Umbral Expanse'
              ? art.umbralRoom
            : theme.name === 'Haunted Reliquary'
              ? art.hauntedRoom
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
      : theme.name === 'Umbral Expanse'
        ? 'rgba(2, 0, 12, 0.2)'
      : theme.name === 'Haunted Reliquary'
        ? 'rgba(2, 8, 23, 0.1)'
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

  if (room.secret) {
    const secret = room.secret;
    const entranceY = secret.y + secret.h / 2;
    ctx.fillStyle = 'rgba(3, 7, 18, 0.58)';
    ctx.fillRect(secret.x + 18, secret.y, secret.w - 18, secret.h - 18);
    ctx.fillStyle = room.theme.wall;
    ctx.fillRect(secret.x, secret.y + secret.h - 18, secret.w, 18);
    if (secret.opened) {
      ctx.fillRect(secret.x, secret.y, 18, secret.h / 2 - 44);
      ctx.fillRect(secret.x, entranceY + 44, 18, secret.h / 2 - 44);
    } else {
      ctx.fillRect(secret.x, secret.y, 18, secret.h);
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.48)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(secret.x + 5, entranceY - 38);
      ctx.lineTo(secret.x + 14, entranceY - 19);
      ctx.lineTo(secret.x + 7, entranceY - 4);
      ctx.lineTo(secret.x + 15, entranceY + 13);
      ctx.lineTo(secret.x + 6, entranceY + 36);
      ctx.moveTo(secret.x + 8, entranceY - 4);
      ctx.lineTo(secret.x + 1, entranceY + 8);
      ctx.moveTo(secret.x + 14, entranceY + 13);
      ctx.lineTo(secret.x + 18, entranceY + 24);
      ctx.stroke();
    }
    if (secret.opened && secret.rewardType === 'lore' && !secret.claimed) {
      const loreX = secret.x + secret.w / 2;
      const loreY = secret.y + secret.h / 2;
      ctx.fillStyle = '#d6b77a';
      ctx.fillRect(loreX - 18, loreY - 13, 36, 26);
      ctx.strokeStyle = '#fef3c7';
      ctx.strokeRect(loreX - 18, loreY - 13, 36, 26);
    }
    const target = !secret.opened
      ? { x: secret.x - 8, y: entranceY, label: 'Open cracked wall' }
      : secret.rewardType === 'lore' && !secret.claimed
        ? { x: secret.x + secret.w / 2, y: secret.y + secret.h / 2, label: 'Read hidden lore' }
        : null;
    if (target && distance(player, target) <= 88) {
      ctx.font = 'bold 13px system-ui';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(3,7,18,0.86)';
      ctx.fillRect(target.x - 78, target.y - 54, 156, 25);
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(`Press F - ${target.label}`, target.x, target.y - 36);
    }
  }
}

// Renders rare discoveries as detailed floor props with a restrained prompt.
function drawDungeonEvents() {
  const now = performance.now();
  const definitions = {
    shrine: { image: art.forgottenShrine, width: 112, height: 103, label: 'Commune with shrine', glow: '#67e8f9', grounded: true },
    camp: { image: art.abandonedCamp, width: 175, height: 117, label: 'Search abandoned camp', glow: '#fb923c' },
    scout: { image: art.rescuedScout, width: 88, height: 132, label: 'Free the dungeon scout', glow: '#94a3b8', groundOffset: 34, noAura: true },
    merchant: { image: art.travelingMerchant, width: 106, height: 159, label: 'Trade with merchant', glow: '#d6a85f', grounded: true, groundOffset: 39 },
  };
  for (const event of state.dungeonEvents) {
    if (event.used && event.type === 'scout') continue;
    const definition = definitions[event.type];
    const image = definition.image;
    const nearby = !event.used && distance(player, event) <= 96;
    const pulse = 0.5 + Math.sin(now * 0.004) * 0.18;
    const spriteTop = event.y + (definition.groundOffset ?? definition.height / 2) - definition.height;
    const roomTheme = event.room?.theme || world.themes[world.themeIndex];

    ctx.save();
    ctx.globalAlpha = event.used ? 0.48 : 1;
    if (definition.grounded) {
      // Seat the shrine in the current biome instead of displaying it like a
      // bright pasted-on illustration.
      ctx.fillStyle = roomTheme.shadow;
      ctx.beginPath();
      ctx.ellipse(event.x, event.y + 28, 46, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = event.used ? roomTheme.wall : roomTheme.accent;
      ctx.globalAlpha = event.used ? 0.28 : (nearby ? 0.62 : 0.36);
      ctx.lineWidth = nearby ? 2 : 1.25;
      ctx.beginPath();
      ctx.ellipse(event.x, event.y + 25, 39 + pulse * 3, 11 + pulse, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = event.used ? 0.48 : 1;
    } else if (!event.used && !definition.noAura) {
      ctx.shadowColor = definition.glow;
      ctx.shadowBlur = nearby ? 20 : 8;
      ctx.strokeStyle = `${definition.glow}${nearby ? 'aa' : '55'}`;
      ctx.lineWidth = nearby ? 3 : 2;
      ctx.beginPath();
      ctx.ellipse(event.x, event.y + 25, 48 + pulse * 8, 18 + pulse * 3, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (image?.complete && image.naturalWidth > 0) {
      if (definition.grounded) {
        ctx.filter = event.used
          ? 'grayscale(0.75) saturate(0.35) brightness(0.62)'
          : nearby
            ? 'saturate(0.82) brightness(0.9)'
            : 'saturate(0.68) brightness(0.78)';
      }
      ctx.drawImage(
        image,
        event.x - definition.width / 2,
        spriteTop,
        definition.width,
        definition.height,
      );
      ctx.filter = 'none';
    }
    ctx.restore();

    if (nearby) {
      const prompt = `F  ${definition.label}`;
      ctx.save();
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const promptWidth = ctx.measureText(prompt).width + 24;
      ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
      ctx.strokeStyle = definition.glow;
      ctx.lineWidth = 2;
      ctx.fillRect(event.x - promptWidth / 2, spriteTop - 31, promptWidth, 25);
      ctx.strokeRect(event.x - promptWidth / 2, spriteTop - 31, promptWidth, 25);
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(prompt, event.x, spriteTop - 18);
      ctx.restore();
    }
  }
}

function drawBiomeHazards() {
  const now = performance.now();
  for (const hazard of state.biomeHazards) {
    const pulse = 0.5 + Math.sin(now * 0.004 + hazard.x) * 0.15;
    ctx.save();
    ctx.translate(hazard.x, hazard.y);
    if (hazard.type === 'lavaVent') {
      const erupting = hazard.cycle > 2.25;
      ctx.fillStyle = erupting ? 'rgba(249,115,22,.55)' : 'rgba(127,29,29,.32)';
      ctx.strokeStyle = erupting ? '#fdba74' : '#ef4444';
      ctx.lineWidth = erupting ? 5 : 3;
      ctx.shadowColor = '#f97316'; ctx.shadowBlur = erupting ? 28 : 10;
      ctx.beginPath(); ctx.ellipse(0, 0, 50, 25, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      for (let crack = -1; crack <= 1; crack += 1) { ctx.beginPath(); ctx.moveTo(crack * 13, -5); ctx.lineTo(crack * 22 + 8, -22); ctx.stroke(); }
    } else if (hazard.type === 'icePatch') {
      ctx.fillStyle = 'rgba(125,211,252,.25)'; ctx.strokeStyle = 'rgba(224,242,254,.8)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(0, 0, 68, 31, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-48, 4); ctx.lineTo(45, -8); ctx.moveTo(-20, -24); ctx.lineTo(14, 23); ctx.stroke();
    } else {
      ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = `rgba(168,85,247,${pulse})`; ctx.lineWidth = 4;
      ctx.shadowColor = '#7e22ce'; ctx.shadowBlur = 20;
      ctx.beginPath(); ctx.ellipse(0, 0, 58, 24, now * 0.0005, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, 0, 32, 12, -now * 0.0007, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.restore();
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
  ctx.shadowColor = crate.reinforced ? 'rgba(217, 168, 74, 0.5)' : crate.isOpen ? '#8b5cf6' : '#f59e0b';
  ctx.shadowBlur = crate.reinforced ? 10 : 12;

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

  if (crate.reinforced) {
    // A restrained brass rim and clasp distinguish reinforced caches without
    // covering the crate artwork with a bright yellow band.
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(217, 168, 74, 0.72)';
    ctx.lineWidth = 2;
    ctx.strokeRect(-27, -25, 54, 48);
    ctx.fillStyle = '#b8873d';
    ctx.beginPath();
    ctx.moveTo(0, -4);
    ctx.lineTo(4, 0);
    ctx.lineTo(0, 4);
    ctx.lineTo(-4, 0);
    ctx.closePath();
    ctx.fill();
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
  wingFlap = 0,
  hitFlash = 0,
  deathProgress = 0,
  opacity = 1,
  spriteSheetFrame = null,
}) {
  const spriteKey = variant === 'hero' && state.retroMode && !state.boss
    ? 'retroHero'
    : variant === 'hero'
      ? 'hero'
      : variant;
  let sprite = art[spriteKey];
  if (variant === 'cinderImp') {
    sprite = Math.sin(performance.now() * 0.012 + stride * 0.08) >= 0 ? art.cinderImp1 : art.cinderImp2;
  }
  const spriteSheet = variant === 'oceanHippo'
    && spriteSheetFrame !== null
    && art.oceanHippoWalk?.complete
    && art.oceanHippoWalk.naturalWidth > 0
    ? { image: art.oceanHippoWalk, columns: 2, rows: 2, frame: spriteSheetFrame }
    : null;
  if (spriteSheet) sprite = spriteSheet.image;
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
  ctx.globalAlpha = opacity * (1 - deathProgress);
  ctx.rotate(stride * 0.004 + deathProgress * Math.PI * 1.6);
  const enemyArtOrientation = {
    // Original and clearly side-on sprites.
    walker: 'right', runner: 'right', brute: 'right', spitter: 'right',
    assassin: 'right', crawler: 'right', sentinel: 'right', wraith: 'right',
    burrower: 'right', arcaneOrb: 'front', reaper: 'right',
    riftHound: 'left', chainHexer: 'left', bellmawJuggernaut: 'left',
    skeletonMinion: 'left', desertArcher: 'right', desertScorpion: 'left',
    skell1: 'right', skell2: 'right', skell3: 'right', skell4: 'front', skell5: 'right',
    skell6: 'right', skell7: 'right', skell8: 'front', skell9: 'right', skell10: 'front',
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
    mechMinion: 'right', clockworkOrb: 'front', woodMinion: 'left', waxAcolyte: 'left',
    oceanMinion: 'left', oceanTank: 'left', glowBat: 'front',
    crystalStalker: 'front', lushMinion: 'left', lushTank: 'left',
    lushMossling: 'front', lushSporeShroom: 'front',
    starlingMarauder: 'left', cometHound: 'left', astralSentinel: 'left',
    astralrootSpriggan: 'front', leyshardWisp: 'front', starbranchStag: 'right', prismhideBeast: 'left',
    veilbornShade: 'front', eclipseShrike: 'right', singularityEye: 'front', nightcoilDrake: 'left',
    duskweaver: 'front', voidPanther: 'right', eclipseReaper: 'front', gloomfinSerpent: 'right',
    starlessCourser: 'right', eclipseSpider: 'front',
    reefclawCrab: 'left', icefangBear: 'left', gravewingRaven: 'left', prismMoth: 'front',
    sunscaleRay: 'left', coralbackTurtle: 'left', tidefangEel: 'left',
    octopusMinion: 'front',
  };
  const nativeOrientation = enemyArtOrientation[variant] || 'right';
  const facingScale = variant === 'hero'
    ? getHeroFacingScale(facingX)
    : nativeOrientation === 'front'
      ? 1
    : nativeOrientation === 'right'
      ? (facingX < 0 ? -1 : 1)
      : (facingX < 0 ? 1 : -1);
  const deathScale = 1 - deathProgress * 0.82;
  // Keep actor artwork uniformly scaled. Movement can rotate or bob a sprite,
  // but independent X/Y scaling makes wide and tall source images look
  // stretched as their animation changes.
  ctx.scale(
    facingScale * scale * deathScale,
    scale * deathScale,
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
  const spriteWidth = variant === 'bellmawJuggernaut' ? 136
    : variant === 'octopusMinion' ? 118
    : variant === 'riftHound' ? 122
    : variant === 'chainHexer' ? 108
    : ['magmaSerpent', 'voidSerpent', 'sandRoller'].includes(variant)
    ? 116
    : variant === 'lavaEagle' ? 150
    : ['glowBat', 'voidwingDrake', 'sunfeatherGriffin', 'frostwingDrake'].includes(variant) ? 126
    : variant === 'abyssalRazorfin' ? 132
    : variant === 'boneRaven' ? 104
    : variant === 'frosthornRam' ? 142
    : variant === 'waxAcolyte' ? 86
    : variant === 'mechMinion' ? 106
    : variant === 'clockworkOrb' ? 112
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
    : ['veilbornShade', 'eclipseShrike', 'singularityEye', 'duskweaver'].includes(variant) ? 124
    : ['nightcoilDrake', 'voidPanther', 'gloomfinSerpent'].includes(variant) ? 150
    : ['eclipseReaper', 'starlessCourser', 'eclipseSpider'].includes(variant) ? 158
    : variant === 'astralrootSpriggan' ? 96
    : variant === 'leyshardWisp' ? 102
    : variant === 'starbranchStag' ? 142
    : variant === 'prismhideBeast' ? 152
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
  const spriteHeight = variant === 'bellmawJuggernaut' ? 132
    : variant === 'octopusMinion' ? 126
    : variant === 'riftHound' ? 88
    : variant === 'chainHexer' ? 126
    : ['magmaSerpent', 'voidSerpent', 'sandRoller'].includes(variant)
    ? 112
    : variant === 'lavaEagle' ? 120
    : ['glowBat', 'voidwingDrake'].includes(variant) ? 88
      : variant === 'frosthornRam' ? 106
      : variant === 'sunfeatherGriffin' ? 112
    : variant === 'waxAcolyte' ? 126
    : variant === 'mechMinion' ? 128
    : variant === 'clockworkOrb' ? 108
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
    : ['veilbornShade', 'duskweaver', 'eclipseReaper'].includes(variant) ? 148
    : ['eclipseShrike', 'singularityEye', 'nightcoilDrake', 'voidPanther', 'gloomfinSerpent', 'starlessCourser', 'eclipseSpider'].includes(variant) ? 120
    : variant === 'astralrootSpriggan' ? 118
    : variant === 'leyshardWisp' ? 126
    : variant === 'starbranchStag' ? 132
    : variant === 'prismhideBeast' ? 116
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
  // Treat the configured dimensions as a bounding box and contain the source
  // image inside it. This preserves every mob's native aspect ratio instead of
  // forcing differently shaped artwork into the same rectangle.
  const sourceAspect = sprite.naturalWidth / sprite.naturalHeight;
  const boxAspect = spriteWidth / spriteHeight;
  const drawWidth = sourceAspect > boxAspect
    ? spriteWidth
    : spriteHeight * sourceAspect;
  const drawHeight = sourceAspect > boxAspect
    ? spriteWidth / sourceAspect
    : spriteHeight;
  ctx.drawImage(sprite, -drawWidth / 2, 38 - drawHeight, drawWidth, drawHeight);
  ctx.restore();

  if (deathProgress === 0) {
    const spriteTop = y + bob + 38 - drawHeight * scale;
    const healthBarY = variant === 'hero'
      ? y - 76
      : spriteTop - 16;
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(x - 18, healthBarY, 36, 4);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(x - 18, healthBarY, 36 * (health / maxHealth), 4);
  }
}

function drawArmorWearOverlay(x, y, scale = 1) {
  const armor = getEquippedArmor();
  const ratio = getArmorDurabilityRatio(armor);
  if (ratio >= 0.8 || !Number.isFinite(getArmorMaxDurability(armor))) return;
  const scratchCount = ratio <= 0 ? 8 : ratio < 0.2 ? 6 : ratio < 0.4 ? 4 : 2;
  const scratches = [
    [-11, -38, 5, -28], [10, -31, -4, -20], [-14, -10, 4, -3],
    [9, 2, -5, 12], [-12, 18, 2, 28], [11, 21, -2, 34],
    [-17, -24, -7, -18], [16, -13, 6, -5],
  ];
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.lineCap = 'round';
  ctx.lineWidth = ratio <= 0 ? 2.4 : 1.6;
  ctx.strokeStyle = ratio <= 0 ? 'rgba(20, 8, 6, 0.92)' : `rgba(15, 23, 42, ${0.3 + (1 - ratio) * 0.42})`;
  ctx.shadowColor = 'rgba(248, 250, 252, 0.36)';
  ctx.shadowBlur = 1;
  for (let index = 0; index < scratchCount; index += 1) {
    const [x1, y1, x2, y2] = scratches[index];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2 + (index % 2 ? 4 : -4), y2 + 5);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCrateMimic(enemy, deathProgress) {
  const stride = Math.sin(enemy.movePhase || 0);
  const scale = 1 - deathProgress * 0.8;
  ctx.save();
  ctx.translate(enemy.x, enemy.y + Math.abs(stride) * -3);
  ctx.scale(scale, scale);
  ctx.globalAlpha = 1 - deathProgress;
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 20;
  ctx.strokeStyle = '#7f1d1d';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-18, 18); ctx.lineTo(-27 + stride * 4, 35);
  ctx.moveTo(18, 18); ctx.lineTo(27 - stride * 4, 35);
  ctx.stroke();
  const biteCycle = (Math.sin(performance.now() * 0.011 + (enemy.movePhase || 0) * 0.35) + 1) / 2;
  const mouthGap = 2 + biteCycle * 14;
  if (art.crate.complete && art.crate.naturalWidth > 0) {
    const sourceWidth = art.crate.naturalWidth;
    const sourceHeight = art.crate.naturalHeight;
    const lidSourceHeight = Math.round(sourceHeight * 0.5);

    // The ordinary crate artwork becomes the creature: its lower half stays
    // planted while the upper half lifts and shuts like a hinged lid.
    ctx.drawImage(
      art.crate,
      0, lidSourceHeight, sourceWidth, sourceHeight - lidSourceHeight,
      -38, mouthGap / 2, 76, 38,
    );
    ctx.fillStyle = 'rgba(10, 5, 3, 0.94)';
    ctx.fillRect(-31, -mouthGap / 2 - 1, 62, mouthGap + 3);
    ctx.save();
    ctx.translate(0, -mouthGap / 2);
    ctx.transform(1, -biteCycle * 0.08, 0, 1 - biteCycle * 0.08, 0, 0);
    ctx.drawImage(
      art.crate,
      0, 0, sourceWidth, lidSourceHeight,
      -38, -38, 76, 38,
    );
    ctx.restore();
  } else {
    ctx.fillStyle = '#190505';
    ctx.fillRect(-32, -mouthGap / 2, 64, mouthGap);
    ctx.fillStyle = '#8b5e34';
    ctx.fillRect(-32, mouthGap / 2, 64, 27);
    ctx.fillRect(-32, -27 - mouthGap / 2, 64, 27);
  }
  ctx.restore();
  if (deathProgress === 0) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.fillRect(enemy.x - 34, enemy.y - 56, 68, 6);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(enemy.x - 34, enemy.y - 56, 68 * clamp(enemy.health / enemy.maxHealth, 0, 1), 6);
    ctx.font = '900 11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fecaca';
    ctx.fillText('CRATE MIMIC', enemy.x, enemy.y - 64);
  }
}

// Maps an enemy to themed artwork and animation deformation before drawing.
function drawEnemy(enemy) {
  const deathProgress = enemy.dead
    ? 1 - Math.max(0, enemy.deathTimer) / 0.55
    : 0;
  if (enemy.mimicEnemy) {
    drawCrateMimic(enemy, deathProgress);
    return;
  }
  const motion = Math.sin(enemy.movePhase || 0);
  const stride = motion * (enemy.type === 'crawler' || enemy.type === 'lushMossling' ? 15 : 9);
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
    if (world.themeIndex === 11) themedVariant = getAstralrootEnemyVariant(enemy.type);
    if (world.themeIndex === 12) themedVariant = getUmbralEnemyVariant(enemy.type);
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
  if (world.themeIndex === 11 && baseEnemyTypes.has(enemy.type)) {
    themedVariant = getAstralrootEnemyVariant(enemy.type);
  }
  if (world.themeIndex === 12 && baseEnemyTypes.has(enemy.type)) {
    themedVariant = getUmbralEnemyVariant(enemy.type);
  }
  if (enemy.type === 'skeletonOrb') themedVariant = 'skeletonOrb';
  if (enemy.type === 'desertScorpion') themedVariant = 'desertScorpion';
  if (enemy.type === 'mechMinion') themedVariant = 'mechMinion';
  if (enemy.type === 'clockworkOrb') themedVariant = 'clockworkOrb';
  if (enemy.type === 'abyssalRazorfin') themedVariant = 'abyssalRazorfin';
  if (enemy.type === 'frostwingDrake') themedVariant = 'frostwingDrake';
  if (enemy.type === 'boneRaven') themedVariant = 'boneRaven';

  // Classify movement from the artwork actually being drawn. Ground enemies
  // keep their feet planted; only winged and supernatural floaters receive a
  // vertical offset. This also handles biome reskins such as Sunscale Rays.
  const flyingTypes = ['glowBat', 'voidwingDrake', 'sunfeatherGriffin', 'fungalFairyWitch', 'lavaEagle', 'frostwingDrake', 'boneRaven', 'gravewingRaven', 'prismMoth', 'sunscaleRay'];
  const floatingTypes = ['wraith', 'arcaneOrb', 'skeletonOrb', 'frostWraith', 'abyssJelly', 'tidefangEel', 'abyssalRazorfin', 'clockworkOrb'];
  const flying = flyingTypes.includes(themedVariant);
  const floating = floatingTypes.includes(themedVariant);
  const wingFlap = flying ? Math.sin((enemy.movePhase || 0) * 2.8) : 0;
  const bob = flying
    ? -18 + Math.sin((enemy.movePhase || 0) * 1.4) * 4
    : floating ? -14 + motion * 5 : 0;

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

  if (enemy.type === 'brute' && (enemy.bruteChargeWindup || 0) > 0) {
    const charge = 1 - enemy.bruteChargeWindup / 0.68;
    const target = enemy.bruteChargeTarget || player;
    ctx.save();
    ctx.strokeStyle = `rgba(251, 146, 60, ${0.35 + charge * 0.55})`;
    ctx.lineWidth = 3 + charge * 3;
    ctx.setLineDash([12, 9]);
    ctx.beginPath();
    ctx.moveTo(enemy.x, enemy.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y + 12, 30 + charge * 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  if (enemy.type === 'assassin' && (enemy.assassinStrikeWindup || 0) > 0) {
    const charge = 1 - enemy.assassinStrikeWindup / 0.34;
    const target = enemy.assassinTarget || player;
    ctx.save();
    ctx.strokeStyle = `rgba(244, 114, 182, ${0.45 + charge * 0.5})`;
    ctx.lineWidth = 2 + charge * 3;
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.radius + 16 - charge * 7, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(enemy.x, enemy.y - 8);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();
    ctx.restore();
  }

  if (enemy.type === 'burrower' && (
    (enemy.burrowSinkTimer || 0) > 0
    || (enemy.burrowTravelTimer || 0) > 0
    || (enemy.burrowEmergeTimer || 0) > 0
  )) {
    const emerging = (enemy.burrowEmergeTimer || 0) > 0;
    const markerX = emerging ? enemy.x : (enemy.burrowMarkerX ?? enemy.x);
    const markerY = emerging ? enemy.y : (enemy.burrowMarkerY ?? enemy.y);
    const charge = emerging ? 1 - enemy.burrowEmergeTimer / 0.52 : 0.3;
    ctx.save();
    ctx.fillStyle = `rgba(120, 53, 15, ${0.18 + charge * 0.24})`;
    ctx.strokeStyle = `rgba(251, 191, 36, ${0.42 + charge * 0.5})`;
    ctx.lineWidth = 3 + charge * 3;
    ctx.setLineDash([7, 6]);
    ctx.beginPath();
    ctx.ellipse(markerX, markerY + 17, 26 + charge * 24, 11 + charge * 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);
    for (let i = 0; i < 5; i += 1) {
      const angle = i / 5 * Math.PI * 2 + charge * 2;
      ctx.fillStyle = '#b45309';
      ctx.fillRect(
        markerX + Math.cos(angle) * (18 + charge * 22) - 2,
        markerY + 14 + Math.sin(angle) * (7 + charge * 10) - 2,
        4,
        4,
      );
    }
    ctx.restore();
  }

  if (enemy.type === 'sentinel') {
    const shieldX = enemy.sentinelShieldDirX ?? Math.sign(enemy.facingX || 1);
    const shieldY = enemy.sentinelShieldDirY ?? 0;
    const shieldAngle = Math.atan2(shieldY, shieldX);
    const blocking = (enemy.sentinelBlockFlash || 0) > 0;
    ctx.save();
    ctx.translate(enemy.x, enemy.y + 2);
    ctx.rotate(shieldAngle);
    ctx.strokeStyle = blocking ? '#bfdbfe' : 'rgba(96, 165, 250, 0.72)';
    ctx.lineWidth = blocking ? 8 : 5;
    ctx.shadowColor = '#60a5fa';
    ctx.shadowBlur = blocking ? 22 : 9;
    ctx.beginPath();
    ctx.arc(0, 0, 34, -Math.PI * 0.43, Math.PI * 0.43);
    ctx.stroke();
    if (enemy.sentinelWard) {
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 6]);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(enemy.sentinelWard.x - enemy.x, enemy.sentinelWard.y - enemy.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  if (enemy.type === 'wraith') {
    const phasePulse = 0.5 + Math.sin((enemy.movePhase || 0) * 2.2) * 0.5;
    const trailX = enemy.facingX < 0 ? 1 : -1;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 3; i >= 1; i -= 1) {
      ctx.globalAlpha = (enemy.wraithPhasing ? 0.16 : 0.08) * (4 - i) / 3;
      ctx.fillStyle = i % 2 ? '#8b5cf6' : '#67e8f9';
      ctx.beginPath();
      ctx.ellipse(
        enemy.x + trailX * i * 11,
        enemy.y - 6 + Math.sin((enemy.movePhase || 0) - i) * 4,
        13 - i * 2,
        19 - i * 3,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    ctx.globalAlpha = enemy.wraithPhasing ? 0.5 + phasePulse * 0.2 : 0.24;
    ctx.strokeStyle = '#c4b5fd';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y - 5, 25 + phasePulse * 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  if (enemy.type === 'reaper' && (
    (enemy.reaperSweepWindup || 0) > 0
    || (enemy.reaperSweepFlash || 0) > 0
  )) {
    const windingUp = (enemy.reaperSweepWindup || 0) > 0;
    const charge = windingUp ? 1 - enemy.reaperSweepWindup / 0.88 : 1;
    const fade = windingUp ? 1 : enemy.reaperSweepFlash / 0.22;
    const sweepAngle = Math.atan2(
      enemy.reaperSweepDirY || 0,
      enemy.reaperSweepDirX || Math.sign(enemy.facingX || 1),
    );
    const sweepRadius = enemy.radius + 112;
    ctx.save();
    ctx.translate(enemy.x, enemy.y);
    ctx.rotate(sweepAngle);
    ctx.fillStyle = `rgba(168, 85, 247, ${0.08 + charge * 0.14 * fade})`;
    ctx.strokeStyle = windingUp
      ? `rgba(232, 121, 249, ${0.4 + charge * 0.5})`
      : `rgba(250, 232, 255, ${fade})`;
    ctx.lineWidth = windingUp ? 3 + charge * 4 : 9 * fade;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, sweepRadius, -82 * Math.PI / 180, 82 * Math.PI / 180);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 42 + charge * (sweepRadius - 42), -82 * Math.PI / 180, 82 * Math.PI / 180);
    ctx.stroke();
    ctx.restore();
  }

  if (enemy.type === 'bellmawJuggernaut' && (
    (enemy.bellmawCharge || 0) > 0
    || (enemy.bellmawFlash || 0) > 0
  )) {
    const charging = (enemy.bellmawCharge || 0) > 0;
    const charge = charging ? 1 - enemy.bellmawCharge / 1.05 : 1;
    const fade = charging ? 1 : enemy.bellmawFlash / 0.3;
    ctx.save();
    ctx.translate(enemy.x, enemy.y + 10);
    ctx.globalCompositeOperation = 'lighter';
    for (let ring = 0; ring < 3; ring += 1) {
      ctx.strokeStyle = `rgba(251, 191, 36, ${(0.32 + charge * 0.45 - ring * 0.08) * fade})`;
      ctx.lineWidth = charging ? 3 + charge * 3 : 8 * fade;
      ctx.beginPath();
      ctx.ellipse(0, 0, 42 + charge * 183 - ring * 18, 15 + charge * 64 - ring * 6, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  const assassinOpacity = enemy.type !== 'assassin'
    ? 1
    : (enemy.assassinVanishTimer || 0) > 0
      ? 0.08
      : (enemy.assassinVanishWindup || 0) > 0
        ? 0.25 + enemy.assassinVanishWindup / 0.3 * 0.75
        : 1;
  const burrowOpacity = enemy.type !== 'burrower'
    ? 1
    : (enemy.burrowTravelTimer || 0) > 0
      ? 0.03
      : (enemy.burrowSinkTimer || 0) > 0
        ? 0.2 + enemy.burrowSinkTimer / 0.42 * 0.8
        : (enemy.burrowEmergeTimer || 0) > 0
          ? 0.25 + (1 - enemy.burrowEmergeTimer / 0.52) * 0.75
          : 1;
  const wraithOpacity = enemy.type === 'wraith' && enemy.wraithPhasing ? 0.62 : 1;
  if (enemy.champion && !enemy.dead) {
    const championPulse = 0.5 + Math.sin(performance.now() * 0.006) * 0.18;
    ctx.save();
    ctx.strokeStyle = `rgba(250, 204, 21, ${championPulse})`;
    ctx.fillStyle = 'rgba(120, 53, 15, 0.12)';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 22;
    ctx.beginPath();
    ctx.ellipse(enemy.x, enemy.y + 18, enemy.radius + 22, enemy.radius * 0.62 + 9, 0, 0, Math.PI * 2);
    ctx.fill();
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
    wingFlap,
    hitFlash: enemy.hitFlash,
    deathProgress,
    opacity: assassinOpacity * burrowOpacity * wraithOpacity,
    spriteSheetFrame: themedVariant === 'oceanHippo'
      ? Math.floor((((enemy.movePhase || 0) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2) * 4)
      : null,
  });

  // A small permanent rift sigil makes enemies with unusual traversal rules
  // recognizable before they vanish, burrow, or phase through a wall.
  if (enemy.type === 'wraith' || enemy.type === 'assassin' || enemy.type === 'burrower') {
    const sigilColor = enemy.type === 'wraith' ? '#a78bfa'
      : enemy.type === 'assassin' ? '#f472b6' : '#fbbf24';
    const sigilPulse = 1 + Math.sin(performance.now() * 0.005 + enemy.x) * 0.12;
    ctx.save();
    ctx.translate(enemy.x, enemy.y - enemy.radius - 17);
    ctx.rotate(Math.PI / 4);
    ctx.globalAlpha = (1 - deathProgress) * 0.82;
    ctx.strokeStyle = sigilColor;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
    ctx.lineWidth = 2;
    ctx.shadowColor = sigilColor;
    ctx.shadowBlur = 8;
    ctx.fillRect(-5 * sigilPulse, -5 * sigilPulse, 10 * sigilPulse, 10 * sigilPulse);
    ctx.strokeRect(-5 * sigilPulse, -5 * sigilPulse, 10 * sigilPulse, 10 * sigilPulse);
    ctx.restore();
  }
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
  lushGolem: { idle: [-101, -65, 202, 135], raised: [-69, -108, 138, 177] },
  lavaGolem: { idle: [-85, -98, 170, 170], raised: [-46, -140, 92, 212] },
  oceanBoss: { idle: [-108, -72, 216, 144], raised: [-73, -170, 146, 212] },
  iceBoss: { idle: [-75, -120, 150, 225], raised: [-64, -154, 128, 226] },
  skeletonWarlord: { idle: [-77, -153, 154, 229], raised: [-63, -235, 126, 277] },
  sandBoss: { idle: [-90, -125, 180, 203], raised: [-81, -179, 162, 227] },
  woodBoss: { idle: [-75, -150, 150, 224], raised: [-72, -187, 144, 233] },
};

function drawBossSpritePreservingAspect(sprite, centerX, centerY, height) {
  const width = height * (sprite.naturalWidth / sprite.naturalHeight);
  ctx.drawImage(sprite, centerX - width / 2, centerY - height / 2, width, height);
}

function drawHeadAnchoredBossPose(variant, idleSprite, raisedSprite, raised, poseCharge) {
  const layout = bossPoseLayouts[variant];
  if (!layout) return;
  const drawRect = (sprite, rect, alpha) => {
    if (!sprite?.complete || sprite.naturalWidth <= 0 || sprite.naturalHeight <= 0) return;
    const [, , maxWidth, maxHeight] = rect;
    const scale = Math.min(maxWidth / sprite.naturalWidth, maxHeight / sprite.naturalHeight);
    const drawWidth = sprite.naturalWidth * scale;
    const drawHeight = sprite.naturalHeight * scale;
    const centerX = rect[0] + maxWidth / 2;
    // Keep the feet/base on the authored lower edge while allowing differently
    // shaped idle and raised art to use their full, undistorted proportions.
    const bottomY = rect[1] + maxHeight;
    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.drawImage(sprite, centerX - drawWidth / 2, bottomY - drawHeight, drawWidth, drawHeight);
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

// Draws one frame from an evenly divided transparent attack strip while
// preserving that frame's native proportions.
function drawSeparatedAttackFrame(image, frameCount, frameIndex, width, centerX = 0, centerY = 0) {
  if (!image?.complete || image.naturalWidth <= 0 || image.naturalHeight <= 0) return;
  const sourceWidth = image.naturalWidth / frameCount;
  const safeIndex = clamp(frameIndex, 0, frameCount - 1);
  const height = width * image.naturalHeight / sourceWidth;
  ctx.drawImage(
    image,
    sourceWidth * safeIndex, 0, sourceWidth, image.naturalHeight,
    centerX - width / 2, centerY - height / 2, width, height,
  );
}

// Renders boss-specific art with wind-up, lunge, hit, and death animation.
function drawBoss(boss) {
  const introProgress = state.bossIntroTimer > 0
    ? 1 - state.bossIntroTimer / state.bossIntroDuration
    : 1;
  const introEase = 1 - Math.pow(1 - introProgress, 3);
  const introOffsetY = (1 - introEase) * -125;
  const introAlpha = clamp(introProgress * 2.2, 0, 1);
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
  if (boss.spawnBlast && !state.pantheonFinalTrial && state.bossIntroTimer > 0) {
    const blast = boss.spawnBlast;
    const warningPulse = 0.55 + Math.sin(performance.now() * 0.016) * 0.18;
    ctx.save();
    ctx.globalAlpha = 0.1 + introProgress * 0.12;
    ctx.fillStyle = blast.color;
    ctx.beginPath();
    ctx.arc(boss.x, boss.y, blast.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = warningPulse;
    ctx.strokeStyle = blast.color;
    ctx.lineWidth = 4 + introProgress * 5;
    ctx.shadowColor = blast.color;
    ctx.shadowBlur = 18 + introProgress * 22;
    ctx.setLineDash([22 - introProgress * 10, 11]);
    ctx.lineDashOffset = -performance.now() * 0.035;
    ctx.beginPath();
    ctx.arc(boss.x, boss.y, blast.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  if (!boss.defeated && (boss.attackWindup > 0 || pulse > 0.05)) {
    const effectOpacity = clamp(0.28 + charge * 0.52 + pulse * 0.22, 0.28, 0.82);
    // Boss effects use the larger sheet cells but remain tightly capped so a
    // telegraph never hides the arena or the player.
    drawContainedEffect(getBossAttackSheetEffect(boss), boss.x, boss.y + 20, 148, 132, effectOpacity);
  }
  if (state.bossIntroTimer > 0 && introProgress > 0.45) {
    const ringProgress = (introProgress - 0.45) / 0.55;
    ctx.save();
    ctx.globalAlpha = (1 - ringProgress) * 0.75;
    ctx.strokeStyle = world.themes[world.themeIndex]?.glow || '#fbbf24';
    ctx.lineWidth = 7 - ringProgress * 4;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.shadowBlur = 22;
    ctx.beginPath();
    ctx.ellipse(boss.x, boss.y + boss.radius * 0.55, 28 + ringProgress * 150, 10 + ringProgress * 48, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  const phaseTwoGlow = boss.phase === 2 ? {
    stormglassLeviathan: '#22d3ee',
    lunarKitsune: '#c4b5fd',
    eternityWarden: '#fde68a',
  }[boss.variant] : null;
  if (phaseTwoGlow && !boss.defeated) {
    const auraPulse = 0.5 + Math.sin(performance.now() * 0.005) * 0.12;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = auraPulse;
    ctx.strokeStyle = phaseTwoGlow;
    ctx.lineWidth = 4;
    ctx.shadowColor = phaseTwoGlow;
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.ellipse(boss.x, boss.y + boss.radius * 0.45, boss.radius * 1.15, boss.radius * 0.42, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  ctx.save();
  const impactDrop = (boss.variant === 'lushGolem' || boss.variant === 'lavaGolem') ? pulse * 13 : 0;
  const walkBob = boss.variant === 'iceBoss' ? Math.abs(walk) * 1.5 : Math.abs(walk) * 4;
  const attackLift = boss.variant === 'iceBoss' ? -novaCharge * 2 : -novaCharge * 5;
  ctx.translate(boss.x, boss.y + walkBob + impactDrop + attackLift + introOffsetY);
  ctx.globalAlpha = (1 - deathProgress) * introAlpha;
  const movementRotation = boss.variant === 'iceBoss'
    ? walk * 0.012 + dashLean * 0.06
    : walk * 0.035 + dashLean * 0.16;
  ctx.rotate(movementRotation + deathProgress * Math.PI * 2.5);
  const deathScale = (1 - deathProgress * 0.9) * (0.78 + introEase * 0.22);
  const bossVisualScale = boss.variant === 'iceBoss' ? 1.08 : 1.4;
  const bossSourceFacesRight = boss.variant === 'crystalBoss' || boss.variant === 'yinYangBoss' || boss.variant === 'hollowStarBoss' || boss.variant === 'inkboundArchivist' || boss.variant === 'crimsonMarionette' || boss.variant === 'meltedMonarch' || boss.variant === 'drownedBell' || boss.variant === 'stormglassLeviathan' || boss.variant === 'clockworkArchon' || boss.variant === 'clockworkSeraph' || boss.variant === 'gravebloomColossus' || boss.variant === 'lunarKitsune' || boss.variant === 'eternityWarden';
  ctx.scale(
    (bossFacesFront ? 1 : bossSourceFacesRight
      ? (boss.facingX < 0 ? -1 : 1)
      : (boss.facingX < 0 ? 1 : -1)) * deathScale * bossVisualScale,
    deathScale * bossVisualScale,
  );
  ctx.shadowColor = phaseTwoGlow || '#f87171';
  ctx.shadowBlur = (phaseTwoGlow ? 34 : 24) + windup * 24;
  if (boss.hitFlash > 0) ctx.filter = 'brightness(2.4) saturate(0)';

  if (boss.attackWindup > 0) {
    const warningColor = boss.variant === 'mysticalWarden' ? '34, 211, 238' : boss.variant === 'astralrootColossus' ? '168, 85, 247' : boss.variant === 'darkMagicSovereign' ? '139, 92, 246' : boss.variant === 'lavaGolem' ? '249, 115, 22' : boss.variant === 'lushGolem' ? '74, 222, 128' : boss.variant === 'oceanBoss' ? '56, 189, 248' : boss.variant === 'iceBoss' ? '191, 219, 254' : boss.variant === 'skeletonWarlord' ? '103, 232, 249' : boss.variant === 'sandBoss' || boss.variant === 'sandSnake' ? '251, 191, 36' : boss.variant === 'shadowBoss' ? '192, 132, 252' : boss.variant === 'abyssBoss' ? '56, 189, 248' : boss.variant === 'scorpionQueen' ? '245, 158, 11' : boss.variant === 'fungalBoss' ? '163, 230, 53' : boss.variant === 'mechOverlord' ? '251, 146, 60' : boss.variant === 'crystalBoss' ? '34, 211, 238' : boss.variant === 'woodBoss' ? '132, 204, 22' : boss.variant === 'yinYangBoss' ? '226, 232, 240' : boss.variant === 'inkboundArchivist' ? '252, 165, 165' : boss.variant === 'crimsonMarionette' ? '220, 38, 38' : boss.variant === 'meltedMonarch' ? '245, 158, 11' : boss.variant === 'drownedBell' ? '34, 211, 238' : '251, 113, 133';
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
      const lateWarningRadius = { glassTempest: 55 + charge * 275, stormSurge: 55 + charge * 205, shatteredTide: 55 + charge * 310, judgmentHour: 55 + charge * 325, timeLock: 55 + charge * 245, rewindPulse: 55 + charge * 280, gravebloom: 55 + charge * 290, rootCage: 55 + charge * 220, tombVines: 55 + charge * 260, moonfall: 55 + charge * 355, eclipseNova: 55 + charge * 295, foxfireCircle: 55 + charge * 235, timeCollapse: 90 + charge * 430, endOfAges: 90 + charge * 430, finalSecond: 55 + charge * 335, darkEclipseNova: 55 + charge * 385, crystalGroveCataclysm: 55 + charge * 400 }[boss.attackType];
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
      if (boss.attackType === 'drownedBellWave') frames = [art.drownedKnell1, art.drownedKnell2, art.drownedKnell3];
      if (boss.attackType === 'undertowDash') frames = [art.drownedCharge1, art.drownedCharge2, art.drownedCharge3];
      if (boss.attackType === 'deathKnell') frames = [art.drownedKnell1, art.drownedKnell2, art.drownedKnell3];
      const frameIndex = boss.attackWindup <= 0 ? 2 : charge < 0.43 ? 0 : charge < 0.8 ? 1 : 2;
      if (frames && frames[frameIndex].complete && frames[frameIndex].naturalWidth > 0) sprite = frames[frameIndex];
    }
    ctx.shadowColor = '#22d3ee';
    ctx.shadowBlur = 44 + windup * 48 + pulse * 30;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    drawBossSpritePreservingAspect(sprite, 0, 0, 196);
    drawBossHealthBar(boss, -84, -120, 168, 10, '#083344', '#22d3ee');
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
    drawBossSpritePreservingAspect(sprite, 0, 0, 288);
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
    drawBossSpritePreservingAspect(sprite, 0, -6, 264);
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
      drawBossSpritePreservingAspect(sprite, 0, 0, 264);
    }
    drawBossHealthBar(boss, -76, -160, 152, 10, '#450a0a', '#fca5a5');
    ctx.restore();
    return;
  }

  if (boss.variant === 'hollowStarBoss' && art.hollowStarBoss.complete && art.hollowStarBoss.naturalWidth > 0) {
    const attacking = boss.attackWindup > 0 || boss.attackPulse > 0 || boss.lungeTimer > 0;
    let sprite = art.hollowStarBoss;
    const frames = {
      hollowStarOverhead: [art.hollowStarOverhead1, art.hollowStarOverhead2, art.hollowStarOverhead3],
      hollowStarRoundhouse: [art.hollowStarRoundhouse1, art.hollowStarRoundhouse2, art.hollowStarRoundhouse3],
      hollowStarGroundSlam: [art.hollowStarGroundSlam1, art.hollowStarGroundSlam2, art.hollowStarGroundSlam3],
    }[boss.attackType];
    let attackFrameIndex = 0;
    if (frames && attacking) {
      // Run the complete three-pose sequence during anticipation, then hold
      // the impact pose through the damage pulse and melee lunge.
      attackFrameIndex = boss.attackWindup <= 0 ? 2 : Math.min(2, Math.floor(charge * 3));
      const requestedFrame = frames[attackFrameIndex];
      const loadedFrame = requestedFrame?.complete && requestedFrame.naturalWidth > 0
        ? requestedFrame
        : frames.find((frame) => frame?.complete && frame.naturalWidth > 0);
      if (loadedFrame) sprite = loadedFrame;
    }
    ctx.shadowColor = '#a78bfa';
    ctx.shadowBlur = 42 + windup * 46 + pulse * 28;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    drawBossSpritePreservingAspect(sprite, 0, 0, 264);
    if (frames && attacking) {
      const separatedAttack = {
        hollowStarOverhead: { image: art.hollowStarOrbVortexSeparated, count: 4, width: 300 },
        hollowStarRoundhouse: { image: art.hollowStarRoundhouseSeparated, count: 3, width: 350 },
        hollowStarGroundSlam: { image: art.hollowStarGroundSlamSeparated, count: 4, width: 350 },
      }[boss.attackType];
      if (separatedAttack) {
        const effectFrame = boss.attackWindup <= 0
          ? separatedAttack.count - 1
          : Math.min(separatedAttack.count - 1, Math.floor(charge * separatedAttack.count));
        ctx.save();
        ctx.globalAlpha *= boss.attackWindup > 0 ? 0.78 : 0.96;
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 38;
        drawSeparatedAttackFrame(
          separatedAttack.image,
          separatedAttack.count,
          effectFrame,
          separatedAttack.width,
          0,
          -12,
        );
        ctx.restore();
      }
    }
    drawBossHealthBar(boss, -76, -160, 152, 10, '#020617', '#a78bfa');
    ctx.restore();
    return;
  }

  if (boss.variant === 'octopusBoss' && art.octopusBoss.complete && art.octopusBoss.naturalWidth > 0) {
    const areaAttack = boss.attackType === 'constrictionVortex' || boss.attackType === 'inkCloud';
    const octopusAttacking = boss.attackWindup > 0 || pulse > 0 || boss.lungeTimer > 0;
    if (areaAttack && (boss.attackWindup > 0 || pulse > 0)) {
      const effectRadius = (boss.attackType === 'inkCloud' ? 78 : 60) + charge * 105 + pulse * 28;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.25 + charge * 0.48 + pulse * 0.22;
      ctx.strokeStyle = boss.attackType === 'inkCloud' ? '#6366f1' : '#67e8f9';
      ctx.lineWidth = 5 + charge * 5;
      ctx.setLineDash([18, 12]);
      ctx.rotate(performance.now() * 0.0025);
      ctx.beginPath();
      ctx.ellipse(0, 4, effectRadius, effectRadius * 0.62, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.rotate(-performance.now() * 0.0045);
      ctx.beginPath();
      ctx.ellipse(0, 4, effectRadius * 0.72, effectRadius * 0.42, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    ctx.shadowColor = boss.attackType === 'inkCloud' ? '#4f46e5' : '#22d3ee';
    ctx.shadowBlur = 44 + windup * 46 + pulse * 30;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    drawBossSpritePreservingAspect(art.octopusBoss, 0, 4, 300);
    if (octopusAttacking && art.octopusAttackSheet.complete && art.octopusAttackSheet.naturalWidth > 0) {
      const sheetFrame = boss.attackWindup <= 0 ? 2 : Math.min(2, Math.floor(charge * 3));
      const attackCrops = {
        tentacleSlam: [
          [570, 350, 235, 225], [760, 350, 285, 225], [980, 340, 315, 235],
        ],
        constrictionVortex: [
          [675, 215, 170, 165], [805, 205, 220, 175], [965, 195, 285, 190],
        ],
        inkCloud: [
          [0, 530, 205, 155], [145, 520, 230, 165], [330, 515, 250, 170],
        ],
        summonTentacles: [
          [510, 730, 265, 294], [735, 720, 335, 304], [1010, 705, 526, 319],
        ],
      }[boss.attackType];
      const crop = attackCrops?.[sheetFrame];
      if (crop) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = crop;
        const effectWidth = boss.attackType === 'summonTentacles' ? 340
          : boss.attackType === 'constrictionVortex' ? 300
            : boss.attackType === 'inkCloud' ? 260 : 275;
        const effectHeight = effectWidth * sourceHeight / sourceWidth;
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(0, 0, 190, 155, 0, 0, Math.PI * 2);
        ctx.clip();
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha *= boss.attackWindup > 0 ? 0.68 : 0.9;
        ctx.filter = 'contrast(1.45) saturate(1.35)';
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 40;
        ctx.drawImage(
          art.octopusAttackSheet,
          sourceX, sourceY, sourceWidth, sourceHeight,
          -effectWidth / 2, -effectHeight / 2 + 6, effectWidth, effectHeight,
        );
        ctx.restore();
      }
    }
    drawBossHealthBar(boss, -84, -174, 168, 10, '#082f49', '#67e8f9');
    ctx.restore();
    return;
  }

  const newBossArt = {
    stormglassLeviathan: { idle: art.stormglassLeviathan, frames: [art.stormglassAttack1, art.stormglassAttack2, art.stormglassAttack3], glow: '#22d3ee' },
    clockworkArchon: { idle: art.clockworkArchon, frames: [art.clockworkArchon, art.clockworkArchon, art.clockworkArchon], glow: '#facc15' },
    clockworkSeraph: { idle: art.clockworkSeraph, frames: [art.clockworkSeraph, art.clockworkSeraph, art.clockworkSeraph], glow: '#38bdf8' },
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
    const projectileAttack = ['lightningLance', 'stormArcVolley', 'forkedLightning', 'gearVolley', 'archonClockburst', 'cogCrossfire', 'graveSeedVolley', 'graveThornCircle', 'corpsePetalBurst', 'lunarBolts', 'kitsuneStarfan', 'moonCrescentFan', 'hourglassVolley', 'eternityParadox', 'chronoSpiral'].includes(boss.attackType);
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
    drawBossSpritePreservingAspect(sprite, 0, 0, 284);
    if (boss.variant === 'lunarKitsune' && attacking) {
      const separatedAttack = ['crescentCut', 'ninefoldDash', 'moonCrescentFan'].includes(boss.attackType)
        ? { image: art.lunarCrescentSeparated, count: 3, width: 345 }
        : boss.attackType === 'lunarBolts'
          ? { image: art.lunarOrbSeparated, count: 3, width: 315 }
          : ['kitsuneStarfan', 'foxfireCircle'].includes(boss.attackType)
            ? { image: art.lunarFoxfireSeparated, count: 4, width: 350 }
            : ['moonfall', 'eclipseNova'].includes(boss.attackType)
              ? { image: art.lunarMoonfallSeparated, count: 4, width: 360 }
              : null;
      if (separatedAttack) {
        const effectFrame = boss.attackWindup <= 0
          ? separatedAttack.count - 1
          : Math.min(separatedAttack.count - 1, Math.floor(charge * separatedAttack.count));
        ctx.save();
        ctx.globalAlpha *= boss.attackWindup > 0 ? 0.8 : 0.98;
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 38;
        drawSeparatedAttackFrame(
          separatedAttack.image,
          separatedAttack.count,
          effectFrame,
          separatedAttack.width,
          12,
          -16,
        );
        ctx.restore();
      }
    }
    if (boss.variant === 'clockworkSeraph' && attacking) {
      const separatedAttack = boss.attackType === 'seraphHalberd'
        ? { image: art.seraphHalberdSeparated, count: 3, width: 370 }
        : boss.attackType === 'seraphPortalLance'
          ? { image: art.seraphPortalSeparated, count: 3, width: 390 }
          : boss.attackType === 'seraphFeatherBarrage'
            ? { image: art.seraphFeatherSeparated, count: 4, width: 400 }
            : boss.attackType === 'seraphClockfall'
              ? { image: art.seraphClockfallSeparated, count: 4, width: 410 }
              : null;
      if (separatedAttack) {
        const effectFrame = boss.attackWindup <= 0
          ? separatedAttack.count - 1
          : Math.min(separatedAttack.count - 1, Math.floor(charge * separatedAttack.count));
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha *= boss.attackWindup > 0 ? 0.84 : 1;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 42;
        drawSeparatedAttackFrame(separatedAttack.image, separatedAttack.count, effectFrame, separatedAttack.width, 18, -18);
        ctx.restore();
      }
    }
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
    let spriteBounds = [34, 44, 952, 1456];
    let frames = null;
    let frameBounds = null;
    if (boss.attackType === 'yinYangOverhead') {
      frames = [art.yinYangOverhead1, art.yinYangOverhead2, art.yinYangOverhead3];
      frameBounds = [[54, 112, 970, 1374], [0, 30, 1024, 1452], [0, 378, 970, 1128]];
    }
    if (boss.attackType === 'yinYangRoundhouse') {
      frames = [art.yinYangRoundhouse1, art.yinYangRoundhouse2, art.yinYangRoundhouse3];
      frameBounds = [[14, 170, 998, 1288], [72, 238, 952, 1220], [0, 228, 1024, 1230]];
    }
    if (boss.attackType === 'yinYangArenaSlam') {
      frames = [art.yinYangGroundSlam1, art.yinYangGroundSlam2, art.yinYangGroundSlam3];
      frameBounds = [[0, 224, 990, 1312], [142, 84, 724, 1332], [10, 528, 866, 932]];
    }
    if (frames && yinYangAttacking) {
      const frameIndex = boss.attackWindup <= 0 ? 2 : charge < 0.46 ? 0 : charge < 0.8 ? 1 : 2;
      if (frames[frameIndex].complete && frames[frameIndex].naturalWidth > 0) {
        sprite = frames[frameIndex];
        spriteBounds = frameBounds[frameIndex];
      }
    }
    // Every animation frame is a complete 1024x1536 boss sprite. There are
    // no composited hand crops, rotating loose swords, or opaque patch boxes.
    drawBossSpritePreservingAspect(sprite, 0, 0, 264);
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
      drawBossSpritePreservingAspect(sprite, 0, -7, 210);
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
      drawBossHealthBar(boss, -50, -112, 100, 8, '#dc2626', '#f97316');
    }
    drawHeadAnchoredBossPose('lavaGolem', art.lavaGolem, art.lavaGolemOverhead, sprite === art.lavaGolemOverhead, charge);
    if (sprite !== art.lavaGolemOverhead) {
      drawBossHealthBar(boss, -50, -112, 100, 8, '#dc2626', '#f97316');
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
      drawBossHealthBar(boss, -53, -134, 106, 8, '#2563eb', '#e0f2fe');
    }
    drawHeadAnchoredBossPose('iceBoss', art.iceBoss, art.iceBossOverhead, sprite === art.iceBossOverhead, charge);
    if (sprite !== art.iceBossOverhead) {
      drawBossHealthBar(boss, -53, -134, 106, 8, '#2563eb', '#e0f2fe');
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
      drawBossHealthBar(boss, -55, -170, 110, 8, '#a16207', '#67e8f9');
    }
    drawHeadAnchoredBossPose('skeletonWarlord', art.skeletonBoss, art.skeletonBossOverhead, sprite === art.skeletonBossOverhead, charge);
    if (sprite !== art.skeletonBossOverhead) {
      drawBossHealthBar(boss, -55, -170, 110, 8, '#a16207', '#67e8f9');
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
      drawBossHealthBar(boss, -56, -142, 112, 8, '#92400e', '#fde68a');
    }
    drawHeadAnchoredBossPose('sandBoss', art.sandBoss, art.sandBossOverhead, sprite === art.sandBossOverhead, charge);
    if (sprite !== art.sandBossOverhead) {
      drawBossHealthBar(boss, -56, -142, 112, 8, '#92400e', '#fde68a');
    }
    ctx.restore();
    return;
  }

  if (boss.variant === 'shadowBoss' && art.shadowBoss.complete && art.shadowBoss.naturalWidth > 0) {
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 38 + windup * 48 + pulse * 24;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    drawBossSpritePreservingAspect(art.shadowBoss, 0, 0, 208);
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
    drawBossSpritePreservingAspect(sprite, 0, 8, 224);
    drawBossHealthBar(boss, -60, -140, 120, 9, '#172554', boss.phase === 2 ? '#38bdf8' : '#2563eb');
    ctx.restore();
    return;
  }

  if (boss.variant === 'scorpionQueen' && art.scorpionQueen.complete && art.scorpionQueen.naturalWidth > 0) {
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 42 + windup * 52 + pulse * 26;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    drawBossSpritePreservingAspect(art.scorpionQueen, 0, -1, 250);
    drawBossHealthBar(boss, -62, -142, 124, 9, '#78350f', '#fbbf24');
    ctx.restore();
    return;
  }

  if (boss.variant === 'fungalBoss' && art.fungalBoss.complete && art.fungalBoss.naturalWidth > 0) {
    ctx.shadowColor = '#a3e635';
    ctx.shadowBlur = 44 + windup * 54 + pulse * 28;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    drawBossSpritePreservingAspect(art.fungalBoss, 0, 0, 274);
    drawBossHealthBar(boss, -64, -162, 128, 9, '#3f6212', '#d9f99d');
    ctx.restore();
    return;
  }

  if (boss.variant === 'mechOverlord' && art.mechOverlord.complete && art.mechOverlord.naturalWidth > 0) {
    ctx.shadowColor = '#fb923c';
    ctx.shadowBlur = 46 + windup * 54 + pulse * 28;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    drawBossSpritePreservingAspect(art.mechOverlord, 0, 0, 250);
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
    drawBossSpritePreservingAspect(art.crystalBoss, 0, 0, 266);
    drawBossHealthBar(boss, -66, -162, 132, 9, '#164e63', '#67e8f9');
    ctx.restore();
    return;
  }

  if (boss.variant === 'sandSnake' && art.sandSnake.complete && art.sandSnake.naturalWidth > 0) {
    ctx.shadowColor = boss.attackType === 'scarabStorm' ? '#a855f7' : '#f59e0b';
    ctx.shadowBlur = 48 + windup * 58 + pulse * 32;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    drawBossSpritePreservingAspect(art.sandSnake, 0, 0, 280);
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
      drawBossHealthBar(boss, -54, -168, 108, 8, '#3f6212', '#bef264');
    }
    drawHeadAnchoredBossPose('woodBoss', art.woodBoss, art.woodBossOverhead, sprite === art.woodBossOverhead, charge);
    if (sprite !== art.woodBossOverhead) {
      drawBossHealthBar(boss, -54, -168, 108, 8, '#3f6212', '#bef264');
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
  const victoryPose = state.victoryPoseTimer > 0;
  const isMoving = !victoryPose && (movementControlMode === 'arrows'
    ? keys.has('arrowup') || keys.has('arrowleft') || keys.has('arrowdown') || keys.has('arrowright')
    : keys.has('w') || keys.has('a') || keys.has('s') || keys.has('d'));
  const walkPhase = performance.now() * 0.0095;
  const walkStep = isMoving ? Math.sin(walkPhase) : 0;
  const stride = walkStep * 8;
  const bob = isMoving
    ? -Math.abs(walkStep) * 1.8
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
  drawArmorWearOverlay(
    transitionX,
    transitionY + bob,
    (0.55 + teleportVisibility * 0.45) * (1 - chasmPhase * 0.7) * (victoryPose ? 1.08 : 1),
  );

  const equippedWeapon = getEquippedWeapon();
  const equippedWeaponArt = equippedWeapon.sheet ? art[equippedWeapon.sheet] : (art[equippedWeapon.id] || art.broadSword);
  if ((!state.retroMode || state.boss) && equippedWeaponArt?.complete && equippedWeaponArt.naturalWidth > 0) {
    // Mirror the hand anchor with the selected character artwork so the
    // equipped weapon remains gripped while facing either direction.
    const equippedArmor = getEquippedArmor();
    const heroFacingScale = getHeroFacingScale(player.visualFacingX);
    const facingDirection = player.visualFacingX < 0 ? -1 : 1;
    // Bows are held in the forward hand. Sword-specific armor anchors can sit
    // much farther out (notably Runebloom), so sharing them made bows float or
    // pass through the torso on newer and front-facing armor artwork.
    const handOffsetX = equippedWeapon.kind === 'bow'
      ? facingDirection * 18
      : (equippedArmor.weaponAnchorX ?? -18) * heroFacingScale;
    const handOffsetY = equippedWeapon.kind === 'bow' ? 0 : equippedArmor.weaponAnchorY || 0;
    ctx.save();
    const bowLift = equippedWeapon.kind === 'bow' ? 11 : 0;
    ctx.translate(transitionX + handOffsetX, transitionY - (victoryPose ? 17 : 7) - bowLift + handOffsetY + bob);
    // Staffs obey one orientation in every state: head above the hand, with a
    // small lean toward the side the hero faces. They never inherit walking,
    // attack, or victory rotations that could turn them upside down.
    if (equippedWeapon.kind === 'staff') ctx.rotate(facingDirection * 0.12);
    else ctx.rotate(stride * 0.004);
    if (equippedWeapon.kind === 'staff') {
      // Staff orientation is fully resolved above.
    } else if (victoryPose) {
      ctx.rotate(equippedWeapon.kind === 'bow'
        ? -facingDirection * Math.PI / 2
        : -facingDirection * (Math.PI - 0.06));
    } else if (equippedWeapon.kind === 'bow') {
      // During vertical movement, follow the character's remembered left/right
      // visual facing instead of defaulting the curve to one side.
      ctx.rotate(player.visualFacingX > 0 ? -Math.PI / 2 : Math.PI / 2);
    } else if (equippedWeapon.kind === 'staff') {
      // Staff artwork is authored vertically with its crystal/head at the
      // top (-Y). Rotate that end—not the handle—onto the firing direction.
      ctx.rotate(player.visualFacingX > 0 ? -0.12 : 0.12);
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
    // Keep melee artwork faithful to its Armory preview. A coloured canvas
    // shadow tints the entire downscaled blade and makes several swords look
    // like different weapons in combat.
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
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (equippedWeapon.sheet) {
      const horizontal = equippedWeapon.sheetDirection === 'horizontal';
      const frameWidth = horizontal
        ? equippedWeaponArt.naturalWidth / equippedWeapon.sheetFrames
        : equippedWeaponArt.naturalWidth;
      const frameHeight = horizontal
        ? equippedWeaponArt.naturalHeight
        : equippedWeaponArt.naturalHeight / equippedWeapon.sheetFrames;
      const combatWidth = equippedWeapon.kind === 'staff' ? 22 : 78;
      const combatHeight = equippedWeapon.kind === 'staff' ? 80 : 38;
      const [sourceX, sourceY, sourceWidth, sourceHeight] = equippedWeapon.combatCrop || [
        horizontal ? frameWidth * equippedWeapon.sheetFrame : 0,
        horizontal ? 0 : frameHeight * equippedWeapon.sheetFrame,
        frameWidth,
        frameHeight,
      ];
      const combatGripX = equippedWeapon.kind === 'staff' ? equippedWeapon.combatGripX ?? 0.5 : 0.5;
      const combatGripY = equippedWeapon.kind === 'staff' ? equippedWeapon.combatGripY ?? 0.72 : 0.5;
      ctx.drawImage(
        equippedWeaponArt,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        -combatWidth * combatGripX,
        -combatHeight * combatGripY,
        combatWidth,
        combatHeight,
      );
    } else if (equippedWeapon.kind === 'bow') {
      // The hand anchor sits on the wrapped center grip. Keep the combat bow
      // compact enough to read as held equipment rather than a body overlay.
      if (equippedWeapon.verticalBowArt) {
        // Newer bows were painted vertically. Normalize them to the same local
        // horizontal orientation as the basic bows before shared facing logic.
        const combatWidth = 28;
        const combatHeight = 58;
        ctx.rotate(equippedWeapon.bowArtRotation || 0);
        ctx.drawImage(
          equippedWeaponArt,
          -combatWidth * (equippedWeapon.bowGripX ?? 0.5),
          -combatHeight * (equippedWeapon.bowGripY ?? 0.5),
          combatWidth,
          combatHeight,
        );
      } else {
        ctx.drawImage(equippedWeaponArt, -29, -19, 58, 28);
      }
    } else if (equippedWeapon.kind === 'staff') {
      const combatWidth = 22;
      const combatHeight = 78;
      const [sourceX, sourceY, sourceWidth, sourceHeight] = equippedWeapon.combatCrop || [
        0, 0, equippedWeaponArt.naturalWidth, equippedWeaponArt.naturalHeight,
      ];
      const combatGripX = equippedWeapon.combatGripX ?? 0.5;
      const combatGripY = equippedWeapon.combatGripY ?? 0.72;
      ctx.drawImage(
        equippedWeaponArt,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        -combatWidth * combatGripX,
        -combatHeight * combatGripY,
        combatWidth,
        combatHeight,
      );
    } else {
      const combatWidth = equippedWeapon.combatWidth || 24;
      const combatHeight = equippedWeapon.combatHeight || 86;
      if (equippedWeapon.combatCrop) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = equippedWeapon.combatCrop;
        const gripX = equippedWeapon.gripX ?? 0.5;
        const gripY = equippedWeapon.gripY ?? 0.5;
        // Later weapon paintings include large transparent side margins. Crop
        // those before downscaling, then pin the actual grip to the hero's hand.
        ctx.rotate(equippedWeapon.combatArtRotation || 0);
        ctx.drawImage(
          equippedWeaponArt,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          -combatWidth * gripX,
          -combatHeight * gripY,
          combatWidth,
          combatHeight,
        );
      } else {
        ctx.drawImage(equippedWeaponArt, -combatWidth / 2, -9, combatWidth, combatHeight);
      }
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

// Keeps the activated Lucky Coin hovering over the hero and sends its initial
// golden charge toward every crate upgraded by the effect.
function drawLuckyCoinEffect() {
  if (!state.luckyCoinActive) return;
  const now = performance.now();
  const coinX = player.x;
  const coinY = player.y - 58 + Math.sin(now * 0.004) * 4;

  if (state.luckyCoinBurstTimer > 0) {
    const progress = 1 - state.luckyCoinBurstTimer / 1.15;
    state.luckyCoinBurstTargets.forEach((target, index) => {
      const delay = Math.min(0.28, index * 0.025);
      const travel = clamp((progress - delay) / (1 - delay), 0, 1);
      const sparkX = coinX + (target.x - coinX) * travel;
      const sparkY = coinY + (target.y - coinY) * travel;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = `rgba(250, 204, 21, ${0.48 * (1 - travel)})`;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 10]);
      ctx.lineDashOffset = -now * 0.04;
      ctx.beginPath();
      ctx.moveTo(coinX, coinY);
      ctx.lineTo(sparkX, sparkY);
      ctx.stroke();
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 22;
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 5 + Math.sin(now * 0.02 + index) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  const spin = Math.max(0.15, Math.abs(Math.cos(now * 0.006)));
  const pulse = 1 + Math.sin(now * 0.008) * 0.08;
  ctx.save();
  ctx.translate(coinX, coinY);
  ctx.globalCompositeOperation = 'lighter';
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 30;
  ctx.fillStyle = 'rgba(250, 204, 21, 0.2)';
  ctx.beginPath();
  ctx.arc(0, 0, 25 * pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.scale(spin, 1);
  ctx.fillStyle = '#facc15';
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#92400e';
  ctx.font = 'bold 17px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('★', 0, 1);
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

function drawVictoryPoseEffect() {
  if (state.victoryPoseTimer <= 0 || !state.victoryPoseTarget) return;
  const elapsed = state.victoryPoseDuration - state.victoryPoseTimer;
  const appear = clamp(elapsed / 0.45, 0, 1);
  const fade = clamp(state.victoryPoseTimer / 0.4, 0, 1);
  const alpha = appear * fade;
  const center = state.victoryPoseTarget;
  const now = performance.now();
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(center.x, center.y);
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = 'rgba(250, 204, 21, 0.1)';
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 34;
  ctx.beginPath();
  ctx.ellipse(0, 28, 185, 58, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.68)';
  ctx.lineWidth = 3;
  ctx.setLineDash([18, 12]);
  ctx.lineDashOffset = -now * 0.025;
  ctx.beginPath();
  ctx.ellipse(0, 28, 150, 43, 0, 0, Math.PI * 2);
  ctx.stroke();
  for (let ray = 0; ray < 10; ray += 1) {
    const angle = ray / 10 * Math.PI * 2 + now * 0.00015;
    ctx.strokeStyle = `rgba(253, 224, 71, ${0.16 + (ray % 2) * 0.08})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * 62, -34 + Math.sin(angle) * 35);
    ctx.lineTo(Math.cos(angle) * 155, -34 + Math.sin(angle) * 92);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.textAlign = 'center';
  ctx.font = '900 28px Georgia, serif';
  ctx.letterSpacing = '5px';
  ctx.fillStyle = '#fef3c7';
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 20;
  ctx.fillText('VICTORY', center.x, center.y - 118);
  ctx.restore();
}

// Draws one Roman Legionary with a locked shield and an advancing sword arm.
function drawRomanLegionary(protector, walkStep) {
  const facing = protector.facingX < 0 ? -1 : 1;
  const spearCohort = protector.romanWeapon === 'spear';
  const attacking = protector.attackPoseTimer > 0;
  const jabElapsed = attacking ? clamp(0.42 - protector.attackPoseTimer, 0, 0.42) : 0;
  const frameNumber = clamp((protector.formationIndex || 0) + 1, 1, 4);
  let pose = 'Guard';
  if (state.victoryPoseTimer > 0) pose = 'Thrust';
  else if (attacking) {
    // Snap quickly through the half pose, hold the fully extended thrust long
    // enough to read, then pass through half again before returning to guard.
    if (jabElapsed < 0.055) pose = 'Guard';
    else if (jabElapsed < 0.12) pose = 'Half';
    else if (jabElapsed < 0.285) pose = 'Thrust';
    else if (jabElapsed < 0.36) pose = 'Half';
  }
  const walkingSwordFrame = !spearCohort && protector.isMoving && !attacking && state.victoryPoseTimer <= 0
    ? getRomanSwordWalkFrame(protector.walkPhase || 0)
    : null;
  const sprite = walkingSwordFrame?.complete && walkingSwordFrame.naturalWidth > 0
    ? walkingSwordFrame
    : spearCohort
      ? art.romanSpearLegionary
      : art[`roman${frameNumber}${pose}`] || art.romanLegionary;
  const thrustOffset = pose === 'Thrust' ? 5 : pose === 'Half' ? 2 : 0;
  const bob = protector.isMoving ? -Math.abs(walkStep) * 2 : 0;
  ctx.save();
  ctx.translate(protector.x + facing * thrustOffset, protector.y + bob);
  ctx.scale(facing, 1);

  ctx.fillStyle = 'rgba(15, 23, 42, 0.38)';
  ctx.beginPath();
  ctx.ellipse(0, 24 - bob, 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  if (protector.shieldFlash > 0) {
    ctx.shadowColor = '#fde68a';
    ctx.shadowBlur = 18;
  }
  const spriteWidth = walkingSwordFrame ? 73 : spearCohort ? 75 : 84;
  ctx.drawImage(sprite, -spriteWidth / 2, -86, spriteWidth, 112);
  ctx.restore();

  if (state.victoryPoseTimer <= 0) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(protector.x - 20, protector.y - 45, 40, 5);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(protector.x - 20, protector.y - 45, 40 * (protector.health / protector.maxHealth), 5);
  }
}

function drawRomanBowman(protector, walkStep) {
  const facing = protector.facingX < 0 ? -1 : 1;
  const bob = protector.isMoving ? -Math.abs(walkStep) * 2 : 0;
  ctx.save();
  ctx.translate(protector.x, protector.y + bob);
  ctx.scale(facing, 1);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.38)';
  ctx.beginPath();
  ctx.ellipse(0, 24 - bob, 25, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.rotate(protector.isMoving ? walkStep * 0.014 : 0);
  if (protector.attackPoseTimer > 0 || protector.bowDrawing) {
    ctx.shadowColor = '#fde68a';
    ctx.shadowBlur = 10;
  }
  const sprite = protector.bowDrawing ? art.romanBowmanReady : art.romanBowman;
  ctx.drawImage(sprite, -52.5, -86, 105, 112);
  ctx.restore();

  if (state.victoryPoseTimer <= 0) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(protector.x - 20, protector.y - 45, 40, 5);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(protector.x - 20, protector.y - 45, 40 * (protector.health / protector.maxHealth), 5);
  }
}

// Draws every Protector with neutral, paw-swipe, or bite artwork.
function drawGuardians() {
  for (const protector of player.protectors) {
    const walking = protector.isMoving && protector.attackPoseTimer <= 0;
    const walkStep = walking ? Math.sin(protector.walkPhase || 0) : 0;
    const pawLift = walking ? -Math.abs(walkStep) * 2.4 : 0;
    const bodySway = walking ? walkStep * 0.035 : 0;
    const strideCompression = walking ? Math.abs(walkStep) : 0;
    // Protectors always keep their full combat artwork in Pantheon/Retro arenas.
    if (protector.kind === 'romanArcher') {
      drawRomanBowman(protector, walkStep);
      continue;
    }
    if (protector.kind === 'legionary') {
      drawRomanLegionary(protector, walkStep);
      continue;
    }
    const attackArt = protector.attackPose === 'bite' ? art.protectorBite : art.protectorPawSwipe;
    const sprite = protector.attackPoseTimer > 0 ? attackArt : art.protector;
    ctx.save();
    ctx.translate(protector.x, protector.y + 25);
    ctx.fillStyle = `rgba(15, 23, 42, ${0.32 - strideCompression * 0.06})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, 27 - strideCompression * 2, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.translate(protector.x, protector.y + pawLift);
    ctx.rotate(bodySway);
    ctx.scale(
      (protector.facingX < 0 ? 1 : -1) * (1 + strideCompression * 0.018),
      1 - strideCompression * 0.014,
    );
    ctx.shadowColor = state.victoryPoseTimer > 0 ? '#facc15' : '#60a5fa';
    ctx.shadowBlur = state.victoryPoseTimer > 0 ? 24 : 16;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (sprite === art.protector) {
      ctx.drawImage(sprite, -39, -34, 78, 74);
    } else {
      ctx.drawImage(sprite, -42, -36, 84, 78);
    }
    ctx.restore();

    if (state.victoryPoseTimer <= 0) {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(protector.x - 20, protector.y - 43, 40, 5);
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(protector.x - 20, protector.y - 43, 40 * (protector.health / protector.maxHealth), 5);
    }
  }
}

// Draws crate-opening helpers and their three-hit health bars.
function drawOpeners() {
  for (const opener of player.openers) {
    const scurry = opener.isMoving ? Math.sin(opener.scurryPhase || 0) : 0;
    const stepAmount = opener.isMoving ? Math.abs(scurry) : 0;
    const bob = opener.isMoving ? -stepAmount * 2.5 : 0;
    const scurryStretchX = 1 + stepAmount * 0.035;
    const scurryStretchY = 1 - stepAmount * 0.025;
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
    ctx.translate(opener.x, opener.y + 28);
    ctx.fillStyle = `rgba(15, 23, 42, ${0.3 - stepAmount * 0.05})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, 21 - stepAmount * 2, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.translate(opener.x + danceX, opener.y + bob + danceY);
    ctx.rotate(opener.isMoving ? scurry * 0.04 : 0);
    ctx.scale(
      (opener.facingX < 0 ? 1 : -1) * showcaseScale * scurryStretchX,
      showcaseScale * scurryStretchY,
    );
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
    const sheetEffect = getMobAttackSheetEffect(projectile);
    if (sheetEffect?.complete && sheetEffect.naturalWidth > 0) {
      // Regular-mob effects are intentionally compact. Containing the crop
      // also prevents long sheet artwork from becoming a screen-wide streak.
      drawContainedEffect(sheetEffect, 0, 0, 42, 30, 0.9);
    } else if (projectile.sourceType === 'chainHexer') {
      ctx.globalCompositeOperation = 'lighter';
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 18;
      ctx.strokeStyle = '#bfdbfe';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-24, 0);
      for (let link = -18; link <= 8; link += 7) {
        ctx.ellipse(link, 0, 5, 3, 0, 0, Math.PI * 2);
      }
      ctx.stroke();
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.moveTo(8, -8);
      ctx.lineTo(20, 0);
      ctx.lineTo(8, 8);
      ctx.lineTo(12, 0);
      ctx.closePath();
      ctx.fill();
    } else if (projectile.sourceType === 'dragonBoss'
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
    } else if (projectile.sourceType === 'mechMinion' || projectile.sourceType === 'clockworkOrb') {
      const clockworkBolt = projectile.sourceType === 'clockworkOrb';
      ctx.shadowColor = clockworkBolt ? '#facc15' : '#fb923c';
      ctx.shadowBlur = 13;
      ctx.fillStyle = clockworkBolt ? '#fef08a' : '#fef3c7';
      ctx.fillRect(-14, -3, 28, 6);
      ctx.fillStyle = clockworkBolt ? '#ca8a04' : '#f97316';
      ctx.fillRect(-18, -1, 7, 2);
    } else if (projectile.sourceType === 'arcaneOrb') {
      const pulse = 1 + Math.sin(performance.now() * 0.018 + projectile.x * 0.02) * 0.12;
      ctx.globalCompositeOperation = 'lighter';
      ctx.shadowColor = projectile.color || '#c084fc';
      ctx.shadowBlur = 20;
      ctx.fillStyle = projectile.color || '#c084fc';
      ctx.globalAlpha = 0.42;
      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.lineTo(-7, -8);
      ctx.lineTo(-7, 8);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = '#f5d0fe';
      ctx.fillRect(-8 * pulse, -8 * pulse, 16 * pulse, 16 * pulse);
      ctx.strokeStyle = projectile.color || '#c084fc';
      ctx.lineWidth = 3;
      ctx.strokeRect(-12 * pulse, -12 * pulse, 24 * pulse, 24 * pulse);
    } else if (['meltedMonarch', 'drownedBell', 'stormglassLeviathan', 'clockworkArchon', 'gravebloomColossus', 'lunarKitsune', 'eternityWarden'].includes(projectile.sourceType)
      && art.lateBossProjectiles.complete && art.lateBossProjectiles.naturalWidth > 0) {
      const lateBossProjectileFrame = {
        meltedMonarch: 0,
        drownedBell: 1,
        stormglassLeviathan: 2,
        clockworkArchon: 3,
        gravebloomColossus: 4,
        lunarKitsune: 5,
        eternityWarden: 6,
      }[projectile.sourceType];
      if (lateBossProjectileFrame !== undefined) {
        const frameWidth = art.lateBossProjectiles.naturalWidth / 7;
        const sourceY = art.lateBossProjectiles.naturalHeight * 0.22;
        const sourceHeight = art.lateBossProjectiles.naturalHeight * 0.56;
        ctx.globalCompositeOperation = 'lighter';
        ctx.shadowColor = projectile.color || '#fef3c7';
        ctx.shadowBlur = 22;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(
          art.lateBossProjectiles,
          frameWidth * lateBossProjectileFrame,
          sourceY,
          frameWidth,
          sourceHeight,
          -54,
          -35,
          108,
          70,
        );
      }
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
    const themedArrow = projectile.kind === 'bow'
      ? ({ verdant: art.arrowVerdant, frost: art.arrowFrost, cinder: art.arrowCinder, void: art.arrowVoid }[projectile.arrowTheme] || art.arrowVerdant)
      : null;
    if (themedArrow?.complete && themedArrow.naturalWidth > 0) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(themedArrow, -31, -10, 62, 20);
    } else if (projectile.kind === 'staff') {
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
function drawSurvivalArenaObstacles() {
  for (const obstacle of state.survivalArenaObstacles) {
    ctx.save();
    ctx.translate(obstacle.x, obstacle.y);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.beginPath();
    ctx.ellipse(8, 15, obstacle.radius * 1.08, obstacle.radius * 0.56, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#302f2b';
    ctx.strokeStyle = '#76684d';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.ellipse(0, 0, obstacle.radius, obstacle.radius * 0.54, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(214, 173, 96, 0.22)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, -2, obstacle.radius * 0.7, obstacle.radius * 0.34, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

function drawSurvivalArenaDisaster() {
  const disaster = state.survivalArenaDisaster;
  if (!state.survivalArenaMode || !disaster) return;
  const arena = getSurvivalArenaRoom();
  if (!arena) return;
  const pulse = 0.1 + Math.abs(Math.sin(performance.now() * 0.012)) * 0.12;
  ctx.save();
  ctx.fillStyle = `${disaster.color}${Math.round(pulse * 255).toString(16).padStart(2, '0')}`;
  ctx.fillRect(arena.x + 430, arena.y + 320, arena.w - 860, arena.h - 640);
  ctx.strokeStyle = disaster.color;
  ctx.lineWidth = 8;
  ctx.setLineDash([24, 18]);
  ctx.strokeRect(arena.x + 440, arena.y + 330, arena.w - 880, arena.h - 660);
  ctx.restore();
}

function drawSurvivalArenaBossBar() {
  const arenaBoss = state.enemies.find((enemy) => enemy.arenaBoss && !enemy.dead);
  if (!state.survivalArenaMode || !arenaBoss) return;
  const width = Math.min(560, canvas.width * 0.58);
  const height = 18;
  const x = (canvas.width - width) / 2;
  const y = 24;
  ctx.save();
  ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
  ctx.fillRect(x - 5, y - 24, width + 10, height + 32);
  ctx.fillStyle = '#fef3c7';
  ctx.font = '800 14px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText(arenaBoss.championName || 'Arena Boss', canvas.width / 2, y - 7);
  ctx.fillStyle = '#450a0a';
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(x, y, width * clamp(arenaBoss.health / arenaBoss.maxHealth, 0, 1), height);
  ctx.strokeStyle = '#fbbf24';
  ctx.strokeRect(x, y, width, height);
  ctx.restore();
}

function drawBackground() {
  if (state.battlegroundMode) {
    drawBattleground();
    return;
  }
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

  if (state.survivalArenaMode) {
    const arena = getSurvivalArenaRoom();
    ctx.fillStyle = '#111827';
    ctx.fillRect(arena.x, arena.y, arena.w, arena.h);
    if (art.survivalArena.complete && art.survivalArena.naturalWidth > 0) {
      drawImageCover(art.survivalArena, arena.x, arena.y, arena.w, arena.h);
    }
    drawSurvivalArenaDisaster();
    ctx.strokeStyle = '#05070c';
    ctx.lineWidth = wallThickness * 2;
    ctx.strokeRect(arena.x, arena.y, arena.w, arena.h);
  }

  // Plain corridors make the route between neighboring rooms unmistakable.
  for (const room of state.boss || state.survivalArenaMode ? [] : state.rooms) {
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

  for (const room of state.boss || state.survivalArenaMode ? [] : state.rooms) {
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
      clockworkArchon: art.clockworkArchonArena,
      clockworkSeraph: art.clockworkSeraphArena,
      darkMagicSovereign: art.darkMagicArena,
      astralrootColossus: art.astralrootArena,
      mysticalWarden: art.mysticalArena,
      gravebloomColossus: art.gravebloomArena,
      lunarKitsune: art.lunarKitsuneArena,
      eternityWarden: art.eternityWardenArena,
      octopusBoss: art.octopusArena,
      sandSnake: art.sandArena,
    };
    const arenaArt = bossArenaArt[state.boss.variant] || null;
    if (arenaArt?.complete && arenaArt.naturalWidth > 0) {
      drawImageCover(arenaArt, state.bossArena.x, state.bossArena.y, state.bossArena.w, state.bossArena.h);
      ctx.fillStyle = 'rgba(2, 6, 23, 0.16)';
      ctx.fillRect(state.bossArena.x, state.bossArena.y, state.bossArena.w, state.bossArena.h);
    }
    if (state.boss.phase === 2) {
      const phaseArenaTint = {
        stormglassLeviathan: 'rgba(34, 211, 238, 0.08)',
        lunarKitsune: 'rgba(196, 181, 253, 0.08)',
        eternityWarden: 'rgba(253, 230, 138, 0.07)',
      }[state.boss.variant];
      if (phaseArenaTint) {
        ctx.fillStyle = phaseArenaTint;
        ctx.fillRect(state.bossArena.x, state.bossArena.y, state.bossArena.w, state.bossArena.h);
      }
    }
  }

  if (state.bossArenaOpen) {
    ctx.fillStyle = '#f5d0fe';
    ctx.fillRect(world.width / 2 - 40, world.height / 2 - 60, 80, 120);
  }

  if (!state.boss) {
    drawBiomeHazards();
    drawDungeonEvents();
  }
  if (!state.boss) for (const crate of state.crates) {
    if (!crate.secretRoom || crate.secretRoom.opened) drawCrate(crate);
  }
  if (state.survivalArenaMode) drawSurvivalArenaObstacles();
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
  drawVictoryPoseEffect();
  drawGuardians();
  drawOpeners();
  drawTeleportEffect();
  drawPlayer();
  drawLuckyCoinEffect();
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
  drawSurvivalArenaBossBar();

  if (state.survivalArenaDisasterFlash > 0) {
    ctx.fillStyle = `rgba(251, 146, 60, ${Math.min(0.42, state.survivalArenaDisasterFlash)})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

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

// Selected late bosses detonate their arrival circle when materialization
// finishes. The warning is positional rather than a cutscene, so the player
// earns safety by moving during the intro instead of waiting helplessly.
function triggerBossSpawnBlast(boss) {
  if (!boss?.spawnBlast || boss.spawnBlastTriggered || state.pantheonFinalTrial) return;
  boss.spawnBlastTriggered = true;
  const { radius, damageFraction, color } = boss.spawnBlast;
  const victims = [player, ...player.protectors, ...player.openers];
  let hitCount = 0;
  for (const victim of victims) {
    if (victim.health <= 0 || distance(boss, victim) > radius + victim.radius) continue;
    applyCombatDamage(victim, Math.max(18, victim.maxHealth * damageFraction), boss);
    hitCount += 1;
  }
  spawnBurst(boss.x, boss.y, 82, color, 315);
  state.shake = Math.max(state.shake, 22);
  setMessage(hitCount > 0
    ? `Spawn blast caught ${hitCount} target${hitCount === 1 ? '' : 's'}! Run outside the warning circle next time.`
    : 'Spawn blast escaped! The boss is vulnerable.', hitCount > 0);
}

function refreshAccountInventory() {
  if (!player?.inventory) return;
  inventoryPotionValue.textContent = String(player.inventory.arenaPotion || 0);
  inventoryMedicPotionValue.textContent = String(player.inventory.fieldMedicPotion || 0);
  inventoryCoinValue.textContent = String(player.inventory.luckyCoin || 0);
  inventoryShardValue.textContent = String(player.inventory.armorShard || 0);
  inventoryKeyValue.textContent = String(player.inventory.arenaKey || 0);
}

// This is deliberately a non-modal panel: opening it never changes state.paused.
function toggleAccountInventory(forceOpen) {
  if (!state.started || state.isGameOver) return;
  const shouldOpen = typeof forceOpen === 'boolean'
    ? forceOpen
    : inventoryPanel.classList.contains('hidden');
  if (shouldOpen) refreshAccountInventory();
  inventoryPanel.classList.toggle('hidden', !shouldOpen);
}

// Synchronizes HUD values, developer fields, and low-resource warnings.
function drawUI() {
  if (!Number.isFinite(Number(state.score))) state.score = 0;
  hud.wave.textContent = String(state.wave);
  hud.score.textContent = state.score.toLocaleString();
  hud.health.textContent = `${Math.round(player.health)} / ${Math.round(player.maxHealth)}`;
  hud.food.textContent = Math.round(player.food);
  hud.hydration.textContent = Math.round(player.hydration);
  hud.stamina.textContent = Math.round(player.stamina);
  hud.bandage.textContent = String(player.inventory.bandage);
  hud.arenaPotion.textContent = String(player.inventory.arenaPotion);
  hud.ammo.textContent = String(player.inventory.ammo);
  hud.enemy.textContent = String(state.enemies.filter((enemy) => !enemy.dead).length + getActiveBosses().length);
  hud.crate.textContent = String(state.crates.filter((crate) => !crate.isOpen && (!crate.secretRoom || crate.secretRoom.opened)).length);
  const highestProtectorLevel = player.protectors.reduce((highest, protector) => Math.max(highest, protector.level || 1), 0);
  hud.protector.textContent = `${player.protectors.length} (${player.inventory.protectorShard} shards)${highestProtectorLevel ? ` - Lv ${highestProtectorLevel}` : ''}`;
  hud.opener.textContent = `${player.openers.length} (${player.inventory.openerShard} shards)`;
  hud.shield.textContent = String(player.inventory.shieldShard);
  hud.luckyCoin.textContent = String(player.inventory.luckyCoin);
  hud.arenaKey.textContent = String(player.inventory.arenaKey);
  if (!inventoryPanel.classList.contains('hidden')) refreshAccountInventory();
  hud.theme.closest('.stat').classList.toggle('hidden', !state.developerMode);
  // Endless Arena has no crate-supply loop, so hunger and thirst are disabled
  // there rather than becoming unavoidable timers against the player.
  hud.food.closest('.stat').classList.toggle('hidden', state.survivalArenaMode);
  hud.hydration.closest('.stat').classList.toggle('hidden', state.survivalArenaMode);

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
    .filter((armor) => unlockedArmor.has(armor.id) && !isArmorBroken(armor))
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

const survivalArenaRoster = [
  'lushMinion', 'skeletonMinion', 'iceMinion', 'cinderImp',
  'riftHound', 'boneShieldbearer', 'desertArcher', 'frostDirewolf',
  'chainHexer', 'ghost2', 'cometHound', 'starlingMarauder',
  'frostWraith', 'magmaSerpent', 'astralSentinel', 'voidPanther',
  'eclipseReaper', 'amethystColossus',
];

const battlegroundWorldScale = 3;
const battlegroundWidth = 25200;
const battlegroundHeight = 11400;
// Independent from state so a stray reset cannot erase the active battle lock.
let battlegroundRunLock = false;
const battlegroundSessionStorageKey = 'endlessDungeonActiveBattleground';
let battlegroundSessionSaveTimer = 0;
const battleUnitProfiles = {
  dog: { name: 'Roman War Dog', cost: 3, health: 72, damage: 14.3, speed: 178, range: 38, power: 0.5, taunt: true },
  swordsman: { name: 'Roman Swordsman', cost: 6, health: 130, damage: 24, speed: 108, range: 62, power: 1 },
  legion: { name: 'Four-Man Legion', cost: 23, health: 520, damage: 96, speed: 78, range: 68, power: 4 },
  spearman: { name: 'Roman Spearman', cost: 10, health: 145, damage: 28, speed: 96, range: 186, power: 2 },
  archer: { name: 'Roman Bowman', cost: 12, health: 120, damage: 25, speed: 92, range: 1000, minRange: 270, power: 3, ranged: true },
  brazierArcher: { name: 'Brazier Longbowman', cost: 0, health: 150, damage: 45, speed: 0, range: 8400, minRange: 0, power: 4, ranged: true, stationary: true },
  cavalry: { name: 'Roman Cavalry', cost: 28, health: 410, damage: 72, speed: 205, range: 92, power: 5 },
  tenLegion: { name: 'Ten-Roman Shield Line', cost: 35, health: 1000, damage: 120, speed: 64, range: 72, power: 6 },
  oxen: { name: 'Roman War Oxen', cost: 45, health: 820, damage: 108, speed: 132, range: 105, power: 7, oxen: true },
  elephant: { name: 'Roman War Elephant', cost: 90, health: 3500, damage: 150, speed: 68, range: 115, power: 10, elephant: true },
};
const battleFootSoldierKinds = new Set(['swordsman', 'legion', 'tenLegion', 'spearman', 'archer', 'brazierArcher']);
const battleFootSoldierScale = 0.82;
const battlegroundThemes = [
  { name: 'Verdant Warhost', types: ['lushMinion', 'lushMossling', 'lushTank'] },
  { name: 'Bony Host', types: ['skeletonMinion', 'skeletonTank', 'boneShieldbearer'] },
  { name: 'Frozen Warband', types: ['iceMinion', 'frostWraith', 'frosthornRam'] },
  { name: 'Desert Raiders', types: ['desertMummy', 'desertArcher', 'sandRoller'] },
  { name: 'Cinder Assault', types: ['lavaMinion', 'cinderImp', 'magmaSerpent'] },
  { name: 'Umbral March', types: ['veilbornShade', 'voidPanther', 'eclipseReaper'] },
  { name: 'Astral Invasion', types: ['cometHound', 'starlingMarauder', 'astralSentinel'] },
  { name: 'Blue Legion', types: ['blueSword', 'blueBow', 'blueDog', 'blueHorse', 'blueOxen', 'blueElephant'] },
];
const battleBlueEnemyRoles = {
  blueSword: 'swordsman', blueBow: 'archer', blueDog: 'dog',
  blueHorse: 'cavalry', blueOxen: 'oxen', blueElephant: 'elephant',
};
const battleBlueEnemyNames = {
  blueSword: 'Azure Legionary', blueBow: 'Azure Longbowman', blueDog: 'Azure War Dog',
  blueHorse: 'Azure Cavalry', blueOxen: 'Azure War Oxen', blueElephant: 'Azure War Elephant',
};
const battlegroundThemeBosses = {
  'Verdant Warhost': ['lushGolem'],
  'Bony Host': ['skeletonWarlord'],
  'Frozen Warband': ['iceBoss', 'dragonBoss'],
  'Desert Raiders': ['sandBoss', 'scorpionQueen', 'sandSnake'],
  'Cinder Assault': ['lavaGolem', 'meltedMonarch'],
  'Umbral March': ['shadowBoss', 'darkMagicSovereign'],
  'Astral Invasion': ['astralrootColossus', 'hollowStarBoss'],
  'Blue Legion': ['clockworkArchon', 'clockworkSeraph'],
};
const battleRangedEnemyTypes = new Set([
  'desertArcher', 'cinderImp', 'frostWraith', 'veilbornShade',
  'eclipseReaper', 'starlingMarauder', 'astralSentinel',
]);
const battleEnemyBowTypes = new Set(['desertArcher', 'skell2', 'skell4', 'ghost1', 'ghost3']);
// These Battleground sources are already painted facing left toward Rome and
// must not receive the general enemy mirror used by right-facing bestiary art.
const battleNativeLeftEnemyTypes = new Set([
  'frosthornRam',
  'desertMummy',
  'cometHound', 'starlingMarauder', 'astralSentinel',
  // The Blue Legion sheets share the same authored battlefield orientation.
  // Treat them as a set so Wave 24 never mirrors the entire army backwards.
  'blueSword', 'blueBow', 'blueDog', 'blueHorse', 'blueOxen', 'blueElephant',
]);
const battleImageCache = new Map();
let battlegroundLegacy = { milestones: [], bestWave: 0 };
try {
  battlegroundLegacy = JSON.parse(window.localStorage.getItem('endlessDungeonBattlegroundLegacy') || 'null')
    || battlegroundLegacy;
  if (!Array.isArray(battlegroundLegacy.milestones)) battlegroundLegacy.milestones = [];
  battlegroundLegacy.bestWave = Math.max(0, Math.floor(Number(battlegroundLegacy.bestWave) || 0));
  battlegroundLegacy.eternalMastery = Boolean(battlegroundLegacy.eternalMastery);
} catch (error) {
  battlegroundLegacy = { milestones: [], bestWave: 0, eternalMastery: false };
}
// Earlier builds awarded an elixir at Wave 10. Preserve that reward while also
// granting the new permanent weapon to accounts that already cleared the wave.
if (battlegroundLegacy.milestones.includes(10) && !unlockedWeapons.has('gladiatorsGladius')) {
  unlockedWeapons.add('gladiatorsGladius');
  unseenGear.add('weapon:gladiatorsGladius');
  saveArmorCollection();
}
// Backfill late-wave equipment for accounts whose best record predates these
// milestones, without requiring them to repeat an already-cleared wave.
if (battlegroundLegacy.bestWave >= 60 && !unlockedArmor.has('eternalConqueror')) {
  unlockedArmor.add('eternalConqueror');
  unseenGear.add('armor:eternalConqueror');
  saveArmorCollection();
}
if (battlegroundLegacy.bestWave >= 80 && !unlockedWeapons.has('eternalConquerorSpatha')) {
  unlockedWeapons.add('eternalConquerorSpatha');
  unseenGear.add('weapon:eternalConquerorSpatha');
  saveArmorCollection();
}
if (battlegroundLegacy.bestWave >= 100) battlegroundLegacy.eternalMastery = true;
try { window.localStorage.setItem('endlessDungeonBattlegroundLegacy', JSON.stringify(battlegroundLegacy)); } catch (error) { /* migrated progress remains for this session */ }

function getBattleImage(type) {
  if (battleImageCache.has(type)) return battleImageCache.get(type);
  const entry = journalCatalog.find((candidate) => candidate.id === type);
  const image = new Image();
  image.src = entry?.image || 'assets/enemies/new/rift-hound.png';
  battleImageCache.set(type, image);
  return image;
}

function createBattleUnit(kind, y, free = false) {
  const profile = battleUnitProfiles[kind];
  if (!profile || (!free && state.battleShards < profile.cost)) return null;
  if (!free) state.battleShards -= profile.cost;
  const baseRadius = kind === 'elephant' ? 74 : kind === 'tenLegion' ? 82 : kind === 'oxen' ? 50 : kind === 'cavalry' ? 52 : kind === 'legion' ? 58 : kind === 'dog' ? 16 : 30;
  const unit = {
    id: `roman-${performance.now()}-${Math.random()}`,
    side: 'roman', kind, name: profile.name,
    x: 250 * battlegroundWorldScale, y: y ?? rand(330 * battlegroundWorldScale, battlegroundHeight - 330 * battlegroundWorldScale), radius: baseRadius * (battleFootSoldierKinds.has(kind) ? battleFootSoldierScale : 1) * battlegroundWorldScale,
    maxHealth: profile.health, health: profile.health, damage: profile.damage,
    speed: profile.speed * battlegroundWorldScale, range: profile.range * battlegroundWorldScale, minRange: (profile.minRange || 0) * battlegroundWorldScale,
    power: profile.power, ranged: !!profile.ranged, elephant: !!profile.elephant, oxen: !!profile.oxen, taunt: !!profile.taunt, stationary: !!profile.stationary,
    attackCooldown: rand(0, 0.35), riderCooldown: rand(0.4, 1.1), attackTimer: 0, walkPhase: Math.random() * Math.PI * 2,
    elephantFrameIndex: -1, oxenFrameIndex: -1, bowFrameIndex: -1,
    target: null, dead: false, facingDirection: 1,
  };
  state.battleUnits.push(unit);
  updateBattlegroundPanel();
  return unit;
}

function saveBattlegroundSession() {
  if (!battlegroundRunLock || !state.battlegroundMode) return;
  const units = state.battleUnits
    .filter((unit) => !unit.dead && unit.health > 0 && !unit.stationary)
    .map((unit) => ({
      kind: unit.kind,
      healthRatio: clamp(unit.health / Math.max(1, unit.maxHealth), 0.01, 1),
    }));
  try {
    window.localStorage.setItem(battlegroundSessionStorageKey, JSON.stringify({
      active: true,
      wave: Math.max(1, state.battlegroundWave),
      shards: Math.max(0, state.battleShards),
      units,
    }));
  } catch (error) {
    // The in-memory lock still protects the current session.
  }
}

function clearBattlegroundSession() {
  try { window.localStorage.removeItem(battlegroundSessionStorageKey); } catch (error) { /* cleared in memory */ }
}

function restoreBattlegroundSession() {
  let saved = null;
  try { saved = JSON.parse(window.localStorage.getItem(battlegroundSessionStorageKey) || 'null'); } catch (error) { return false; }
  if (!saved?.active || !Number.isFinite(Number(saved.wave))) return false;
  if (!resetRun()) return false;
  state.battlegroundMode = true;
  state.battlegroundSessionGuard = true;
  battlegroundRunLock = true;
  state.started = true;
  state.battlegroundWave = Math.max(1, Math.floor(Number(saved.wave)));
  state.battleShards = Math.max(0, Number(saved.shards) || 0);
  state.battleUnits = [];
  state.battleEnemies = [];
  state.battleEnemyQueue = [];
  state.battleProjectiles = [];
  state.battleStompEffects = [];
  const savedUnits = Array.isArray(saved.units) ? saved.units : [];
  for (const record of savedUnits) {
    if (!battleUnitProfiles[record?.kind] || battleUnitProfiles[record.kind].stationary) continue;
    const unit = createBattleUnit(record.kind, undefined, true);
    if (unit) unit.health = unit.maxHealth * clamp(Number(record.healthRatio) || 1, 0.01, 1);
  }
  // Old or incomplete checkpoints still receive the essential starting line.
  if (state.battleUnits.length === 0) {
    ['swordsman', 'legion', 'spearman', 'archer', 'cavalry'].forEach((kind) => createBattleUnit(kind, undefined, true));
  }
  [0.25, 0.5, 0.75].forEach((laneRatio) => {
    const sentry = createBattleUnit('brazierArcher', battlegroundHeight * laneRatio, true);
    if (sentry) sentry.x = 360 * battlegroundWorldScale;
  });
  state.battlegroundZoom = 1;
  state.battlegroundCameraX = battlegroundWidth / 2;
  state.battlegroundCameraY = battlegroundHeight / 2;
  document.body.classList.add('battleground-mode');
  overlay.classList.add('hidden');
  battlegroundPanel.classList.remove('hidden');
  setRomanAttackFormation(true);
  spawnBattlegroundWave();
  battlegroundStatus.textContent = `Battleground session recovered at Wave ${state.battlegroundWave}.`;
  return true;
}

function getBattleEnemyProfile(type, wave, typeIndex) {
  const blueRole = battleBlueEnemyRoles[type];
  if (blueRole) {
    const base = battleUnitProfiles[blueRole];
    const healthScale = 0.35 + wave * 0.035;
    const damageScale = 0.55 + wave * 0.03;
    return {
      power: base.power,
      health: base.health * healthScale,
      damage: base.damage * damageScale,
      speed: base.speed,
      shards: Math.max(1, Math.round(base.power * (1 + wave * 0.04))),
    };
  }
  const power = 1 + typeIndex * 1.45 + Math.floor(wave / 5) * 0.65;
  const openingScale = wave === 1 ? 0.58 : wave === 2 ? 0.7 : wave === 3 ? 0.82 : wave === 4 ? 0.92 : 1;
  return {
    power,
    health: (75 + power * 52) * (1 + wave * 0.16) * openingScale,
    damage: (10 + power * 8) * (1 + wave * 0.075) * openingScale,
    speed: Math.min(175, 72 + typeIndex * 15 + wave * 2.2) * (0.8 + openingScale * 0.2),
    shards: Math.max(1, Math.round(power * (1 + wave * 0.05))),
  };
}

function spawnBattlegroundWave() {
  const theme = battlegroundThemes[(state.battlegroundWave - 1) % battlegroundThemes.length];
  const earlyWaveCounts = [3, 4, 5, 6];
  const count = state.battlegroundWave <= earlyWaveCounts.length
    ? earlyWaveCounts[state.battlegroundWave - 1]
    : Math.min(28, 4 + Math.floor(state.battlegroundWave * 1.35));
  const availableTypes = theme.types.slice(0, state.battlegroundWave === 1 ? 1 : state.battlegroundWave <= 3 ? 2 : theme.types.length);
  // Build an evenly represented roster, then shuffle its arrival order so the
  // wave is a mixed army rather than one solid species block after another.
  const spawnTypes = Array.from({ length: count }, (_, index) => availableTypes[index % availableTypes.length]);
  for (let index = spawnTypes.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [spawnTypes[index], spawnTypes[swapIndex]] = [spawnTypes[swapIndex], spawnTypes[index]];
  }
  const waveEnemies = [];
  for (let index = 0; index < count; index += 1) {
    const type = spawnTypes[index];
    const typeIndex = availableTypes.indexOf(type);
    const profile = getBattleEnemyProfile(type, state.battlegroundWave, typeIndex);
    const entry = journalCatalog.find((candidate) => candidate.id === type);
    const blueRole = battleBlueEnemyRoles[type];
    const enemyBow = battleEnemyBowTypes.has(type) || blueRole === 'archer';
    const ranged = battleRangedEnemyTypes.has(type) || enemyBow;
    const baseRadius = blueRole === 'elephant' ? 74 : blueRole === 'oxen' ? 50 : blueRole === 'cavalry' ? 52 : blueRole === 'dog' ? 16 : 30;
    waveEnemies.push({
      id: `enemy-${state.battlegroundWave}-${index}-${Math.random()}`,
      side: 'enemy', type, name: entry?.name || battleBlueEnemyNames[type] || type,
      x: battlegroundWidth - (250 + (index % 3) * 34) * battlegroundWorldScale,
      y: 290 * battlegroundWorldScale + (index + 0.5) / count * (battlegroundHeight - 580 * battlegroundWorldScale),
      radius: (blueRole ? baseRadius : 28 + typeIndex * 7) * battlegroundWorldScale, maxHealth: profile.health, health: profile.health,
      damage: profile.damage, speed: profile.speed * battlegroundWorldScale,
      range: (enemyBow ? 720 : ranged ? 430 : 58 + typeIndex * 8) * battlegroundWorldScale,
      minRange: (enemyBow ? 340 : ranged ? 235 : 0) * battlegroundWorldScale, ranged, enemyBow,
      kind: blueRole, elephant: blueRole === 'elephant', oxen: blueRole === 'oxen', taunt: blueRole === 'dog',
      power: profile.power, shardReward: profile.shards, attackCooldown: rand(0, 0.55),
      attackTimer: 0, target: null, dead: false, rewardGiven: false, facingDirection: -1,
    });
    if (!blueRole) getBattleImage(type);
  }
  // A themed commander can join after Wave 20. Each further ten-wave band
  // adds one more boss: one on 21-30, two on 31-40, and so on.
  const battleBossCount = state.battlegroundWave > 20
    ? 1 + Math.floor((state.battlegroundWave - 21) / 10)
    : 0;
  const bossPool = battlegroundThemeBosses[theme.name] || [];
  for (let bossIndex = 0; bossIndex < battleBossCount && bossPool.length > 0; bossIndex += 1) {
    const type = bossPool[bossIndex % bossPool.length];
    const entry = journalCatalog.find((candidate) => candidate.id === type);
    const commanderScale = 1 + Math.max(0, state.battlegroundWave - 20) * 0.055;
    waveEnemies.push({
      id: `battle-boss-${state.battlegroundWave}-${bossIndex}-${Math.random()}`,
      side: 'enemy', type, name: entry?.name || type,
      x: battlegroundWidth - (310 + bossIndex * 95) * battlegroundWorldScale,
      y: battlegroundHeight * (bossIndex + 1) / (battleBossCount + 1),
      radius: 86 * battlegroundWorldScale,
      maxHealth: Math.round((1700 + state.battlegroundWave * 165) * commanderScale),
      health: Math.round((1700 + state.battlegroundWave * 165) * commanderScale),
      damage: Math.round((58 + state.battlegroundWave * 3.4) * commanderScale),
      speed: (58 + Math.min(28, state.battlegroundWave * 0.45)) * battlegroundWorldScale,
      range: 105 * battlegroundWorldScale, minRange: 0, ranged: false,
      power: 12 + bossIndex, shardReward: 12 + Math.floor(state.battlegroundWave / 4),
      attackCooldown: rand(0.2, 0.7), attackTimer: 0, target: null,
      dead: false, rewardGiven: false, facingDirection: -1, battleBoss: true,
    });
    getBattleImage(type);
  }
  // Mix commanders into the army instead of making them predictably arrive last.
  for (let index = waveEnemies.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [waveEnemies[index], waveEnemies[swapIndex]] = [waveEnemies[swapIndex], waveEnemies[index]];
  }
  state.battleEnemies = waveEnemies.slice(0, 1);
  state.battleEnemyQueue = waveEnemies.slice(1);
  state.battlegroundSpawnTimer = 0.75;
  state.battlegroundRetreatTimer = 0;
  state.battlegroundResult = null;
  state.battlegroundTransitionTimer = 0;
  battlegroundStatus.textContent = battleBossCount > 0
    ? `${battleBossCount} themed boss commander${battleBossCount === 1 ? '' : 's'} mixed into the enemy ranks.`
    : 'Roman attack formation set: arrowhead forward, shield walls on the flanks, ranged support behind.';
  updateBattlegroundPanel();
}

function chooseBattleTargets(attackers, defenders, defenderEndX) {
  const claimed = new Set();
  attackers.filter((actor) => !actor.dead).sort((a, b) => b.power - a.power).forEach((actor) => {
    const available = defenders.filter((candidate) => !candidate.dead && candidate.health > 0);
    if (available.length === 0) { actor.target = null; return; }
    // War dogs are deliberate bait units. Every enemy may focus the same dog,
    // overriding normal power matching and the one-attacker-per-target rule.
    const tauntingDogs = available.filter((candidate) => candidate.taunt);
    if (tauntingDogs.length > 0) {
      actor.target = tauntingDogs.sort((a, b) => Math.hypot(actor.x - a.x, actor.y - a.y) - Math.hypot(actor.x - b.x, actor.y - b.y))[0];
      return;
    }
    // Roman bow units counter enemy ranged lines before they can freely fire
    // into the formation. Spread archers across unclaimed ranged threats, then
    // concentrate fire only when every ranged enemy already has a target.
    if (actor.side === 'roman' && actor.ranged) {
      const rangedThreats = available.filter((candidate) => candidate.ranged);
      if (rangedThreats.length > 0) {
        const unclaimedRanged = rangedThreats.filter((candidate) => !claimed.has(candidate.id));
        const rangedChoices = unclaimedRanged.length > 0 ? unclaimedRanged : rangedThreats;
        rangedChoices.sort((a, b) => b.power - a.power
          || Math.hypot(actor.x - a.x, actor.y - a.y) - Math.hypot(actor.x - b.x, actor.y - b.y));
        actor.target = rangedChoices[0];
        claimed.add(actor.target.id);
        return;
      }
    }
    const urgent = available.filter((candidate) => Math.abs(candidate.x - defenderEndX) < 520 * battlegroundWorldScale);
    const pool = urgent.length > 0 ? urgent : available.filter((candidate) => !claimed.has(candidate.id));
    const choices = pool.length > 0 ? pool : available;
    choices.sort((a, b) => {
      if (urgent.length > 0) return Math.abs(a.x - defenderEndX) - Math.abs(b.x - defenderEndX);
      const desiredPower = actor.power >= 3 ? -1 : 1;
      return desiredPower * (a.power - b.power) || Math.hypot(actor.x - a.x, actor.y - a.y) - Math.hypot(actor.x - b.x, actor.y - b.y);
    });
    actor.target = choices[0];
    claimed.add(actor.target.id);
  });
}

function setRomanAttackFormation(teleport = false) {
  const living = state.battleUnits.filter((unit) => !unit.dead);
  const centerY = battlegroundHeight / 2;
  const sorted = (kinds) => living.filter((unit) => kinds.includes(unit.kind)).sort((a, b) => a.id.localeCompare(b.id));
  const symmetricOffset = (index, spacing, initial = 0) => {
    if (index === 0 && initial === 0) return 0;
    const rank = Math.floor(index / 2) + 1;
    return (index % 2 === 0 ? -1 : 1) * (initial + rank * spacing);
  };
  const place = (unit, x, y) => {
    unit.formationY = clamp(y, 260 * battlegroundWorldScale, battlegroundHeight - 260 * battlegroundWorldScale);
    if (!teleport || unit.stationary) return;
    unit.x = x;
    unit.y = unit.formationY;
    unit.target = null;
    unit.walkBlend = 0;
    unit.attackTimer = 0;
  };

  // Dogs form the point and cavalry form the widening wings of an arrowhead.
  sorted(['dog', 'cavalry']).forEach((unit, index) => {
    const rank = Math.floor((index + 1) / 2);
    const side = index === 0 ? 0 : index % 2 === 1 ? -1 : 1;
    place(unit, (1360 - rank * 150) * battlegroundWorldScale, centerY + side * rank * 185 * battlegroundWorldScale);
  });

  // The heavy centre advances as one block: elephants in the middle and oxen
  // on matching outer lanes on both sides.
  const elephants = sorted(['elephant']);
  const elephantSpacing = 125;
  elephants.forEach((unit, index) => {
    const centeredLane = (index - (elephants.length - 1) / 2) * elephantSpacing;
    place(unit, 880 * battlegroundWorldScale, centerY + centeredLane * battlegroundWorldScale);
  });
  const oxen = sorted(['oxen']);
  const elephantOuterEdge = Math.max(62, elephants.length * elephantSpacing / 2);
  oxen.forEach((unit, index) => {
    const pairRank = Math.floor(index / 2);
    const side = index % 2 === 0 ? -1 : 1;
    const oxenLane = side * (elephantOuterEdge + 120 + pairRank * 140);
    place(unit, 850 * battlegroundWorldScale, centerY + oxenLane * battlegroundWorldScale);
  });

  // Infantry and spears form two shield-wall wings protecting the heavy core.
  sorted(['swordsman', 'legion', 'tenLegion', 'spearman']).forEach((unit, index) => {
    place(unit, (unit.kind === 'spearman' ? 650 : 760) * battlegroundWorldScale, centerY + symmetricOffset(index, 145, 720) * battlegroundWorldScale);
  });

  // Mobile archers remain behind the army; brazier sentries never move.
  sorted(['archer']).forEach((unit, index) => place(unit, 470 * battlegroundWorldScale, centerY + symmetricOffset(index, 210) * battlegroundWorldScale));
  sorted(['brazierArcher']).forEach((unit) => { unit.formationY = unit.y; });
}

function arrangeRomanBattleFormation() {
  setRomanAttackFormation(false);
}

function damageBattleTarget(target, damage, attacker) {
  if (!target || target.dead) return;
  target.health -= damage;
  target.attackTimer = Math.max(target.attackTimer, 0.12);
  if (target.health > 0) return;
  target.health = 0;
  target.dead = true;
  if (target.side === 'enemy' && !target.rewardGiven) {
    target.rewardGiven = true;
    state.battleShards += target.shardReward;
  }
  if (attacker) attacker.target = null;
  updateBattlegroundPanel();
}

function fireBattleProjectile(attacker, target, damage, color = '#fde68a', kind = 'arrow') {
  const riderArrow = kind === 'elephantArrow';
  const romanBowArrow = kind === 'arrow' && attacker.side === 'roman' && (attacker.kind === 'archer' || attacker.kind === 'brazierArcher');
  const enemyBowArrow = kind === 'arrow' && attacker.side === 'enemy' && (attacker.enemyBow || battleEnemyBowTypes.has(attacker.type));
  const projectileKind = kind === 'arrow' ? (attacker.side === 'roman' ? 'romanArrow' : 'enemyArrow') : kind;
  const spawnX = attacker.x + (riderArrow ? 28 : romanBowArrow ? 18 : enemyBowArrow ? -16 : 0) * battlegroundWorldScale;
  const spawnY = attacker.y - (riderArrow ? 98 : romanBowArrow || enemyBowArrow ? 46 : 24) * battlegroundWorldScale;
  const dx = target.x - spawnX;
  const dy = target.y - spawnY;
  const length = Math.hypot(dx, dy) || 1;
  const projectileSpeed = (kind === 'spear' ? 510 : 620) * battlegroundWorldScale;
  state.battleProjectiles.push({ x: spawnX, y: spawnY, vx: dx / length * projectileSpeed, vy: dy / length * projectileSpeed, damage, targetSide: target.side, life: Math.max(4, length / projectileSpeed + 1), color, kind: projectileKind });
}

function advanceBattleWalk(actor, dt, rate) {
  actor.walkPhase += dt * rate;
  actor.walkBlend = Math.min(1, (actor.walkBlend || 0) + dt * 7);
  if (actor.side === 'roman' && (actor.kind === 'archer' || actor.kind === 'brazierArcher')) {
    const bowFrameIndex = getBowWalkFrameIndex(actor.walkPhase);
    if (bowFrameIndex !== actor.bowFrameIndex) {
      actor.bowFrameIndex = bowFrameIndex;
      // The arrow vanishes from the bow on frame 28: release the real moving
      // arrow on that exact transition, never while it is visibly nocked.
      if (bowFrameIndex === 27) {
        const target = actor.target && !actor.target.dead ? actor.target : null;
        const reach = actor.range + actor.radius + (target?.radius || 0);
        if (target && Math.hypot(target.x - actor.x, target.y - actor.y) <= reach) {
          fireBattleProjectile(actor, target, actor.damage, '#d6a85f');
          actor.attackTimer = 0.2;
        }
      }
    }
  }
  if (actor.oxen) {
    const oxenFrameIndex = actor.type === 'blueOxen'
      ? Math.floor((((actor.walkPhase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * blueBattleFrameCounts.blueOxen)
      : getOxenWalkFrameIndex(actor.walkPhase);
    if (oxenFrameIndex !== actor.oxenFrameIndex) {
      actor.oxenFrameIndex = oxenFrameIndex;
      // Frame 10 is the completed downward axe swing. Apply the attack only
      // on entry to that pose so its damage and animation cannot drift apart.
      if (oxenFrameIndex === 9 || oxenFrameIndex === (actor.type === 'blueOxen' ? 19 : 34)) {
        const opponents = actor.side === 'roman' ? state.battleEnemies : state.battleUnits;
        const axeReach = actor.radius + actor.range + 28 * battlegroundWorldScale;
        const struck = opponents
          .filter((other) => !other.dead && Math.hypot(other.x - actor.x, other.y - actor.y) <= axeReach + other.radius)
          .sort((a, b) => Math.hypot(actor.x - a.x, actor.y - a.y) - Math.hypot(actor.x - b.x, actor.y - b.y));
        struck.forEach((other, index) => damageBattleTarget(other, actor.damage * (index === 0 ? 1 : 0.3), actor));
      }
    }
  }
  if (!actor.elephant) return;
  const frameIndex = getElephantWalkFrameIndex(actor.walkPhase);
  if (frameIndex === actor.elephantFrameIndex) return;
  actor.elephantFrameIndex = frameIndex;
  const opponents = actor.side === 'roman' ? state.battleEnemies : state.battleUnits;
  // The riders visibly loose their bows on these two poses. Projectiles are
  // released here so the arrow never appears before the bow animation.
  if ((frameIndex === 4 || frameIndex === 14) && actor.riderCooldown <= 0) {
    const arrowTargets = opponents
      .filter((other) => !other.dead && Math.hypot(other.x - actor.x, other.y - actor.y) <= 900 * battlegroundWorldScale)
      .sort((a, b) => b.power - a.power || Math.hypot(actor.x - a.x, actor.y - a.y) - Math.hypot(actor.x - b.x, actor.y - b.y))
      .slice(0, 3);
    if (arrowTargets.length > 0) {
      const riderArrowDamage = battleUnitProfiles.archer.damage * 7;
      arrowTargets.forEach((other) => fireBattleProjectile(actor, other, riderArrowDamage, '#d97706', 'elephantArrow'));
      actor.riderCooldown = 1.65;
    }
  }
  // Each row ends on a planted-foot pose. The compact shock ring is mostly a
  // timing cue; the short-radius impact itself is intentionally severe.
  if (frameIndex === 4 || frameIndex === 9 || frameIndex === 14 || frameIndex === 19) {
    const radius = 112 * battlegroundWorldScale;
    state.battleStompEffects.push({ x: actor.x + 30 * battlegroundWorldScale, y: actor.y + 28 * battlegroundWorldScale, radius, life: 0.32, maxLife: 0.32 });
    opponents
      .filter((other) => !other.dead && Math.hypot(other.x - actor.x, other.y - actor.y) <= radius + other.radius)
      .forEach((other) => damageBattleTarget(other, actor.damage * 3, actor));
  }
}

function getBattleWalkRate(actor) {
  if (actor.type === 'blueElephant') return 2.05;
  if (actor.type === 'blueOxen') return 2.15;
  if (actor.type === 'blueHorse') return 3.8;
  if (actor.type === 'blueBow') return 2.25;
  if (actor.type === 'blueDog') return 3.4;
  if (actor.type === 'blueSword') return 3.1;
  if (actor.elephant) return 2.05;
  if (actor.oxen) return 2;
  if (actor.kind === 'cavalry') return 3.45;
  if (actor.side === 'roman' && (actor.kind === 'archer' || actor.kind === 'brazierArcher')) return 2.4;
  if (actor.kind === 'dog') return 3.4;
  return Math.min(6.8, actor.speed * 0.018);
}

function updateBattleArmy(army, opponents, dt, direction) {
  for (const actor of army) {
    if (actor.dead) continue;
    actor.walkBlend = Math.max(0, (actor.walkBlend || 0) - dt * 4.5);
    actor.attackCooldown = Math.max(0, actor.attackCooldown - dt);
    actor.riderCooldown = Math.max(0, (actor.riderCooldown || 0) - dt);
    actor.attackTimer = Math.max(0, actor.attackTimer - dt);
    const tacticalRetreat = actor.side === 'roman' && state.battlegroundRetreatTimer > 0 && !actor.stationary;
    if (actor.side === 'roman' && Number.isFinite(actor.formationY)) {
      const laneCorrection = clamp(actor.formationY - actor.y, -actor.speed * 0.24 * dt, actor.speed * 0.24 * dt);
      actor.y += laneCorrection;
    }
    const fallbackX = 900 * battlegroundWorldScale;
    const target = actor.target && !actor.target.dead ? actor.target : null;
    if (!target) {
      if (actor.stationary) continue;
      if (tacticalRetreat) {
        if (actor.x > fallbackX) {
          actor.x -= actor.speed * 0.72 * dt;
          actor.facingDirection = -1;
        }
      } else {
        actor.x += direction * actor.speed * dt;
        actor.facingDirection = direction;
      }
      advanceBattleWalk(actor, dt, getBattleWalkRate(actor));
      continue;
    }
    const dx = target.x - actor.x;
    const dy = target.y - actor.y;
    const distanceToTarget = Math.hypot(dx, dy) || 1;
    if (Math.abs(dx) > 1) actor.facingDirection = Math.sign(dx);
    const desiredRange = actor.range + actor.radius + target.radius;
    if (tacticalRetreat && actor.x > fallbackX) {
      actor.x -= actor.speed * 0.72 * dt;
      actor.facingDirection = -1;
      actor.y += dy / distanceToTarget * actor.speed * 0.16 * dt;
      advanceBattleWalk(actor, dt, getBattleWalkRate(actor));
    }
    if (actor.minRange && distanceToTarget < actor.minRange) {
      actor.x -= dx / distanceToTarget * actor.speed * dt;
      if (Math.abs(dx) > 1) actor.facingDirection = -Math.sign(dx);
      actor.y -= dy / distanceToTarget * actor.speed * dt;
      advanceBattleWalk(actor, dt, getBattleWalkRate(actor));
    } else if (distanceToTarget > desiredRange) {
      if (!tacticalRetreat) {
        actor.x += dx / distanceToTarget * actor.speed * dt;
        actor.y += dy / distanceToTarget * actor.speed * dt;
        advanceBattleWalk(actor, dt, getBattleWalkRate(actor));
      }
    } else if (actor.attackCooldown <= 0) {
      actor.attackCooldown = actor.elephant ? 0.82 : actor.ranged ? 1.05 : actor.kind === 'dog' ? 0.62 : actor.kind === 'cavalry' ? 0.72 : 0.88;
      actor.attackTimer = actor.oxen ? 0 : 0.34;
      actor.attackStyle = actor.kind === 'swordsman' || actor.kind === 'legion' || actor.kind === 'tenLegion'
        ? (actor.attackStyle === 'jab' ? 'slash' : 'jab')
        : actor.attackStyle;
      if (actor.ranged && !(actor.side === 'roman' && (actor.kind === 'archer' || actor.kind === 'brazierArcher'))) fireBattleProjectile(actor, target, actor.damage, actor.side === 'enemy' ? '#fb7185' : '#fde68a');
      else if (!actor.oxen) {
        damageBattleTarget(target, actor.damage, actor);
        if (actor.elephant) {
          opponents.filter((other) => !other.dead && other !== target && Math.hypot(other.x - target.x, other.y - target.y) < 125 * battlegroundWorldScale)
            .forEach((other) => damageBattleTarget(other, actor.damage * 0.45, actor));
        }
      }
    }
    if (actor.side === 'roman' && (actor.kind === 'archer' || actor.kind === 'brazierArcher') && distanceToTarget <= desiredRange) {
      advanceBattleWalk(actor, dt, getBattleWalkRate(actor));
    }
    if (actor.oxen && distanceToTarget <= desiredRange) advanceBattleWalk(actor, dt, getBattleWalkRate(actor));
    actor.x = clamp(actor.x, 90 * battlegroundWorldScale, battlegroundWidth - 90 * battlegroundWorldScale);
    actor.y = clamp(actor.y, 210 * battlegroundWorldScale, battlegroundHeight - 210 * battlegroundWorldScale);
  }
}

function updateBattleProjectiles(dt) {
  state.battleProjectiles = state.battleProjectiles.filter((projectile) => {
    if (projectile.impactTimer > 0) {
      projectile.impactTimer -= dt;
      return projectile.impactTimer > 0;
    }
    projectile.life -= dt;
    const previousX = projectile.x;
    const previousY = projectile.y;
    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;
    const targets = projectile.targetSide === 'enemy' ? state.battleEnemies : state.battleUnits;
    const visibleArrow = projectile.kind === 'romanArrow' || projectile.kind === 'enemyArrow' || projectile.kind === 'elephantArrow';
    let hit = null;
    let hitX = projectile.x;
    let hitY = projectile.y;
    if (visibleArrow) {
      const segmentX = projectile.x - previousX;
      const segmentY = projectile.y - previousY;
      const segmentLengthSquared = segmentX * segmentX + segmentY * segmentY || 1;
      let nearestProgress = Infinity;
      for (const target of targets) {
        if (target.dead) continue;
        const progress = clamp(((target.x - previousX) * segmentX + (target.y - previousY) * segmentY) / segmentLengthSquared, 0, 1);
        const closestX = previousX + segmentX * progress;
        const closestY = previousY + segmentY * progress;
        // Movement radii deliberately leave room between large sprites, so
        // using the full radius makes an arrow hurt them before touching the
        // visible body. Arrows use a tighter body radius with no proximity
        // halo; a miss or an expired projectile deals no damage.
        const visibleBodyRadius = Math.max(8 * battlegroundWorldScale, target.radius * 0.62);
        if (Math.hypot(target.x - closestX, target.y - closestY) > visibleBodyRadius) continue;
        if (progress < nearestProgress) {
          nearestProgress = progress;
          hit = target;
          hitX = closestX;
          hitY = closestY;
        }
      }
    } else {
      hit = targets.find((target) => !target.dead && Math.hypot(target.x - projectile.x, target.y - projectile.y) <= target.radius + 12 * battlegroundWorldScale);
    }
    if (hit) {
      projectile.x = hitX;
      projectile.y = hitY;
      damageBattleTarget(hit, projectile.damage, null);
      if (visibleArrow) {
        projectile.impactTimer = 0.075;
        return true;
      }
      return false;
    }
    return projectile.life > 0;
  });
}

function updateBattleStompEffects(dt) {
  state.battleStompEffects = state.battleStompEffects.filter((effect) => {
    effect.life -= dt;
    return effect.life > 0;
  });
}

function grantBattlegroundMilestone(wave) {
  const rewards = {
    10: ["Gladiator's Gladius", () => {
      unlockedWeapons.add('gladiatorsGladius');
      unseenGear.add('weapon:gladiatorsGladius');
      saveArmorCollection();
      updateGearNotification();
    }],
    20: ['two Armor Shards', () => { persistentArmorShards += 2; accountSpecialLoot.armorShards = persistentArmorShards; }],
    30: ['Victor Lucky Coin', () => { accountSpecialLoot.luckyCoins += 1; }],
    40: ['Conqueror Arena Key', () => { accountSpecialLoot.arenaKeys += 1; }],
    60: ['Eternal Conqueror Plate', () => {
      unlockedArmor.add('eternalConqueror');
      unseenGear.add('armor:eternalConqueror');
      saveArmorCollection();
      updateGearNotification();
    }],
    80: ["Eternal Conqueror's Spatha", () => {
      unlockedWeapons.add('eternalConquerorSpatha');
      unseenGear.add('weapon:eternalConquerorSpatha');
      saveArmorCollection();
      updateGearNotification();
    }],
    100: ['Eternal Conqueror Mastery', () => {
      battlegroundLegacy.eternalMastery = true;
    }],
  };
  const reward = rewards[wave];
  if (!reward || battlegroundLegacy.milestones.includes(wave)) return;
  reward[1]();
  battlegroundLegacy.milestones.push(wave);
  player.inventory.arenaPotion = accountSpecialLoot.arenaPotions;
  player.inventory.armorShard = accountSpecialLoot.armorShards;
  player.inventory.luckyCoin = accountSpecialLoot.luckyCoins;
  player.inventory.arenaKey = accountSpecialLoot.arenaKeys;
  saveArenaLegacy();
  saveAccountSpecialLoot();
  savePersistentArenaKeys();
  try { window.localStorage.setItem('endlessDungeonBattlegroundLegacy', JSON.stringify(battlegroundLegacy)); } catch (error) { /* session reward remains */ }
  battlegroundStatus.textContent = `Wave ${wave} reward: ${reward[0]} transferred to your account inventory!`;
}

function maybeAwardFieldMedicPotion(wave) {
  if (wave <= 10 || Math.random() >= 1 / 50) return false;
  accountSpecialLoot.fieldMedicPotions = Math.max(0, accountSpecialLoot.fieldMedicPotions || 0) + 1;
  player.inventory.fieldMedicPotion = accountSpecialLoot.fieldMedicPotions;
  saveAccountSpecialLoot();
  battlegroundStatus.textContent = 'RARE REWARD: Field Medic Potion transferred to your account inventory!';
  return true;
}

function updateBattleground(dt) {
  if (state.battlegroundResult) {
    state.battlegroundTransitionTimer -= dt;
    if (state.battlegroundTransitionTimer <= 0 && state.battlegroundResult === 'win') {
      state.battlegroundWave += 1;
      spawnBattlegroundWave();
    }
    return;
  }
  state.battlegroundRetreatTimer = Math.max(0, state.battlegroundRetreatTimer - dt);
  battlegroundSessionSaveTimer -= dt;
  if (battlegroundSessionSaveTimer <= 0) {
    battlegroundSessionSaveTimer = 1;
    saveBattlegroundSession();
  }
  state.battlegroundIncomeTimer -= dt;
  while (state.battlegroundIncomeTimer <= 0) {
    state.battlegroundIncomeTimer += 1;
    state.battleShards += 1;
  }
  if (state.battleEnemyQueue.length > 0) {
    state.battlegroundSpawnTimer -= dt;
    if (state.battlegroundSpawnTimer <= 0) {
      state.battleEnemies.push(state.battleEnemyQueue.shift());
      state.battlegroundSpawnTimer = Math.max(0.42, 0.9 - state.battlegroundWave * 0.012);
    }
  }
  arrangeRomanBattleFormation();
  chooseBattleTargets(state.battleUnits, state.battleEnemies, 0);
  chooseBattleTargets(state.battleEnemies, state.battleUnits, battlegroundWidth);
  updateBattleArmy(state.battleUnits, state.battleEnemies, dt, 1);
  updateBattleArmy(state.battleEnemies, state.battleUnits, dt, -1);
  updateBattleProjectiles(dt);
  updateBattleStompEffects(dt);
  if (state.battleEnemies.some((enemy) => !enemy.dead && enemy.x <= 105 * battlegroundWorldScale)) {
    state.battlegroundResult = 'loss';
    battlegroundStatus.textContent = `Defeat on Wave ${state.battlegroundWave}. An enemy broke through the Roman line.`;
    return;
  }
  const livingBattleEnemies = state.battleEnemies.some((enemy) => !enemy.dead && enemy.health > 0);
  if (state.battleEnemyQueue.length === 0
    && !livingBattleEnemies
    && state.battleUnits.some((unit) => !unit.dead && unit.x >= battlegroundWidth - 105 * battlegroundWorldScale)) {
    state.battlegroundResult = 'win';
    state.battlegroundTransitionTimer = 3;
    const completionShardReward = 3 + Math.floor(state.battlegroundWave / 5);
    state.battleShards += completionShardReward;
    setRomanAttackFormation(true);
    state.battleProjectiles = [];
    battlegroundLegacy.bestWave = Math.max(battlegroundLegacy.bestWave, state.battlegroundWave);
    try { window.localStorage.setItem('endlessDungeonBattlegroundLegacy', JSON.stringify(battlegroundLegacy)); } catch (error) { /* record remains for this session */ }
    battlegroundStatus.textContent = `Wave ${state.battlegroundWave} won! The next themed army arrives in 3 seconds.`;
    grantBattlegroundMilestone(state.battlegroundWave);
    maybeAwardFieldMedicPotion(state.battlegroundWave);
    battlegroundStatus.textContent += ` Completion bonus: +${completionShardReward} Battle Shards.`;
  }
  updateBattlegroundPanel();
}

function getBattlegroundView() {
  const width = battlegroundWidth / state.battlegroundZoom;
  const height = battlegroundHeight / state.battlegroundZoom;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  state.battlegroundCameraX = clamp(state.battlegroundCameraX, halfWidth, battlegroundWidth - halfWidth);
  state.battlegroundCameraY = clamp(state.battlegroundCameraY, halfHeight, battlegroundHeight - halfHeight);
  return {
    left: state.battlegroundCameraX - halfWidth,
    top: state.battlegroundCameraY - halfHeight,
    width,
    height,
  };
}

function changeBattlegroundZoom(amount, screenX = canvas.width / 2, screenY = canvas.height / 2) {
  if (!state.battlegroundMode) return;
  const oldView = getBattlegroundView();
  const focusX = oldView.left + clamp(screenX / canvas.width, 0, 1) * oldView.width;
  const focusY = oldView.top + clamp(screenY / canvas.height, 0, 1) * oldView.height;
  const oldZoom = state.battlegroundZoom;
  state.battlegroundZoom = clamp(oldZoom + amount, 1, 3.5);
  const newWidth = battlegroundWidth / state.battlegroundZoom;
  const newHeight = battlegroundHeight / state.battlegroundZoom;
  state.battlegroundCameraX = focusX - (screenX / canvas.width - 0.5) * newWidth;
  state.battlegroundCameraY = focusY - (screenY / canvas.height - 0.5) * newHeight;
  getBattlegroundView();
  updateBattlegroundPanel();
}

function drawBattleEntity(entity, view) {
  const x = (entity.x - view.left) / view.width * canvas.width;
  const y = (entity.y - view.top) / view.height * canvas.height;
  const scale = Math.min(canvas.width / 1500, canvas.height / 820) * state.battlegroundZoom;
  const entityFootScale = entity.side === 'roman' && battleFootSoldierKinds.has(entity.kind)
    ? battleFootSoldierScale
    : 1;
  ctx.save();
  ctx.translate(x, y);
  // Most battle sprites are authored facing right and must be mirrored as
  // Mirror from actual movement/target direction. Most sources face right;
  // native-left enemy art uses the opposite authored orientation.
  const nativeDirection = entity.side === 'enemy' && battleNativeLeftEnemyTypes.has(entity.type) ? -1 : 1;
  const facingDirection = entity.facingDirection || (entity.side === 'enemy' ? -1 : 1);
  if (facingDirection !== nativeDirection) ctx.scale(-1, 1);
  if (entity.attackTimer <= 0 && entity.walkBlend > 0 && entity.kind !== 'elephant' && entity.kind !== 'oxen' && entity.kind !== 'dog') {
    // Smooth two-foot/two-hoof cadence. The second harmonic gives alternating
    // planted steps, while the eased blend prevents snapping when stopping.
    const stride = Math.sin(entity.walkPhase);
    const footfall = (1 - Math.cos(entity.walkPhase * 2)) * 0.5;
    const heavy = entity.kind === 'elephant' || entity.kind === 'oxen' || entity.kind === 'tenLegion';
    const quick = entity.kind === 'dog' || entity.kind === 'cavalry';
    const lift = (heavy ? 1.8 : quick ? 1.25 : 1.05) * footfall * entity.walkBlend * scale;
    const weightShift = (heavy ? 0.3 : 0.65) * stride * entity.walkBlend * scale;
    ctx.translate(weightShift, -lift);
    ctx.scale(1 + footfall * entity.walkBlend * (heavy ? 0.003 : 0.005), 1 - footfall * entity.walkBlend * (heavy ? 0.002 : 0.004));
  }
  if (entity.attackTimer > 0) {
    const strikeProgress = 1 - entity.attackTimer / 0.34;
    const lunge = Math.sin(clamp(strikeProgress, 0, 1) * Math.PI);
    ctx.translate(lunge * (entity.ranged ? 3 : 11) * scale, -lunge * 2 * scale);
    if (entity.side === 'enemy' && !entity.ranged) ctx.rotate(Math.sin(strikeProgress * Math.PI * 2) * 0.035);
  }
  if (entityFootScale !== 1) ctx.scale(entityFootScale, entityFootScale);
  let image = null;
  let width = 58 * scale;
  let height = 76 * scale;
  const swordWalkFrame = entity.side === 'roman'
    && entity.attackTimer <= 0
    && entity.walkBlend > 0.05
    && (entity.kind === 'swordsman' || entity.kind === 'legion' || entity.kind === 'tenLegion')
    ? getRomanSwordWalkFrame(entity.walkPhase || 0)
    : null;
  const blueFrame = entity.side === 'enemy' ? getBlueBattleEntityFrame(entity) : null;
  if (blueFrame) {
    image = blueFrame;
    const blueSize = {
      blueSword: [68, 88], blueBow: [72, 90], blueDog: [55, 42],
      blueHorse: [140, 105], blueOxen: [180, 135], blueElephant: [200, 165],
    }[entity.type] || [76, 88];
    width = blueSize[0] * scale;
    height = blueSize[1] * scale;
  } else if (entity.side === 'enemy') {
    image = getBattleImage(entity.type);
    width = (72 + entity.power * 8) * scale;
    height = (82 + entity.power * 9) * scale;
  } else if (entity.kind === 'cavalry') {
    const walkFrame = getHorseWalkFrame(entity.walkPhase || 0);
    image = entity.attackTimer > 0
      ? art.romanHorseAttack
      : walkFrame?.complete && walkFrame.naturalWidth > 0 ? walkFrame : art.romanHorse2;
    width = 132 * scale; height = 106 * scale;
  } else if (entity.kind === 'elephant') {
    const walkFrame = getElephantWalkFrame(entity.walkPhase || 0);
    image = walkFrame?.complete && walkFrame.naturalWidth > 0 ? walkFrame : art.romanElephant;
    width = 194 * scale; height = 163 * scale;
  } else if (entity.kind === 'oxen') {
    const walkFrame = getOxenWalkFrame(entity.walkPhase || 0);
    image = walkFrame?.complete && walkFrame.naturalWidth > 0 ? walkFrame : art.romanOxen;
    width = 172 * scale; height = 134 * scale;
  } else if (entity.kind === 'dog') {
    const walkFrame = getDogWalkFrame(entity.walkPhase || 0);
    image = walkFrame?.complete && walkFrame.naturalWidth > 0 ? walkFrame : art.romanDog;
    width = 44 * scale; height = 33 * scale;
  } else if (entity.kind === 'tenLegion') {
    image = art.romanTenLegion; width = 310 * scale; height = 104 * scale;
  } else if (entity.kind === 'archer' || entity.kind === 'brazierArcher') {
    const bowTarget = entity.target && !entity.target.dead ? entity.target : null;
    const bowInRange = bowTarget && Math.hypot(bowTarget.x - entity.x, bowTarget.y - entity.y) <= entity.range + entity.radius + bowTarget.radius;
    const bowFrame = bowInRange ? getBowWalkFrame(entity.walkPhase || 0) : getBowMovementFrame(entity.walkPhase || 0);
    image = bowFrame?.complete && bowFrame.naturalWidth > 0
      ? bowFrame
      : entity.attackTimer > 0 ? art.romanBowman : art.romanBowmanReady;
    width = 78 * scale; height = 88 * scale;
  } else if (entity.kind === 'spearman') {
    image = art.romanSpearLegionary; width = 64 * scale; height = 88 * scale;
  } else {
    image = swordWalkFrame?.complete && swordWalkFrame.naturalWidth > 0
      ? swordWalkFrame
      : entity.attackTimer > 0
      ? entity.attackStyle === 'jab' ? art.roman1Thrust : art.roman1Half
      : art.roman1Guard;
  }
  if (entity.kind === 'legion') {
    const sprites = swordWalkFrame?.complete && swordWalkFrame.naturalWidth > 0
      ? [swordWalkFrame, swordWalkFrame, swordWalkFrame, swordWalkFrame]
      : entity.attackTimer > 0
      ? entity.attackStyle === 'jab'
        ? [art.roman1Thrust, art.roman2Thrust, art.roman3Thrust, art.roman4Thrust]
        : [art.roman1Half, art.roman2Half, art.roman3Half, art.roman4Half]
      : [art.roman1Guard, art.roman2Guard, art.roman3Guard, art.roman4Guard];
    sprites.forEach((sprite, index) => ctx.drawImage(sprite, (-48 + index * 26) * scale, (-68 + (index % 2) * 7) * scale, 58 * scale, 78 * scale));
  } else if (entity.kind === 'tenLegion' && swordWalkFrame?.complete && swordWalkFrame.naturalWidth > 0) {
    for (let index = 0; index < 10; index += 1) {
      ctx.drawImage(swordWalkFrame, (-135 + index * 30) * scale, (-72 + (index % 2) * 3) * scale, 56 * scale, 82 * scale);
    }
  } else if (image?.complete && image.naturalWidth > 0) {
    if (entity.kind === 'cavalry' && entity.attackTimer > 0) {
      const frame = entity.attackTimer > 0.17 ? 0 : 1;
      ctx.drawImage(image, frame * image.naturalWidth / 2, 0, image.naturalWidth / 2, image.naturalHeight, -width / 2, -height * 0.78, width, height);
    } else if (entity.kind === 'cavalry') {
      ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, -width / 2, -height * 0.8, width, height * 0.96);
    } else {
      if (entity.kind === 'spearman' && entity.attackTimer > 0) {
        const jab = Math.sin((1 - entity.attackTimer / 0.34) * Math.PI) * 13 * scale;
        ctx.translate(jab, 0);
      }
      if (entity.kind === 'oxen') ctx.filter = 'contrast(1.1) saturate(1.06)';
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(image, -width / 2, -height * 0.78, width, height);
      ctx.filter = 'none';
    }
  }
  ctx.restore();
  const barWidth = Math.max(14, Math.min(46, width * entityFootScale * 0.42));
  const barY = y - height * entityFootScale * 0.72;
  ctx.fillStyle = 'rgba(2, 6, 23, 0.72)';
  ctx.fillRect(x - barWidth / 2, barY, barWidth, 3);
  ctx.fillStyle = entity.side === 'roman' ? '#4ade80' : '#f87171';
  ctx.fillRect(x - barWidth / 2, barY, barWidth * Math.max(0, entity.health / entity.maxHealth), 3);
}

function drawBattleground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const view = getBattlegroundView();
  if (art.battleground.complete && art.battleground.naturalWidth > 0) {
    const sourceX = view.left / battlegroundWidth * art.battleground.naturalWidth;
    const sourceY = view.top / battlegroundHeight * art.battleground.naturalHeight;
    const sourceWidth = view.width / battlegroundWidth * art.battleground.naturalWidth;
    const sourceHeight = view.height / battlegroundHeight * art.battleground.naturalHeight;
    ctx.drawImage(art.battleground, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
  }
  else { ctx.fillStyle = '#8b5e34'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
  if (view.left <= 0) { ctx.fillStyle = 'rgba(34,197,94,.22)'; ctx.fillRect(0, 0, 12, canvas.height); }
  if (view.left + view.width >= battlegroundWidth) { ctx.fillStyle = 'rgba(239,68,68,.22)'; ctx.fillRect(canvas.width - 12, 0, 12, canvas.height); }
  [...state.battleEnemies, ...state.battleUnits].filter((entity) => !entity.dead).sort((a, b) => a.y - b.y).forEach((entity) => drawBattleEntity(entity, view));
  for (const effect of state.battleStompEffects) {
    const x = (effect.x - view.left) / view.width * canvas.width;
    const y = (effect.y - view.top) / view.height * canvas.height;
    const progress = 1 - effect.life / effect.maxLife;
    const radius = effect.radius / view.width * canvas.width * (0.35 + progress * 0.65);
    ctx.save();
    ctx.globalAlpha = (1 - progress) * 0.62;
    ctx.strokeStyle = '#d8b27a';
    ctx.lineWidth = Math.max(2, 4 * state.battlegroundZoom * (1 - progress));
    ctx.beginPath(); ctx.ellipse(x, y, radius, radius * 0.34, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(120, 76, 39, 0.22)';
    ctx.beginPath(); ctx.ellipse(x, y, radius * 0.72, radius * 0.22, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  for (const projectile of state.battleProjectiles) {
    const x = (projectile.x - view.left) / view.width * canvas.width;
    const y = (projectile.y - view.top) / view.height * canvas.height;
    if (projectile.kind === 'elephantArrow' || projectile.kind === 'romanArrow' || projectile.kind === 'enemyArrow') {
      const angle = Math.atan2(projectile.vy, projectile.vx);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      const arrowImage = projectile.kind === 'romanArrow' && art.romanArrow.complete && art.romanArrow.naturalWidth > 0
        ? art.romanArrow
        : projectile.kind === 'enemyArrow' ? art.arrowVoid : art.arrowCinder;
      if (arrowImage.complete && arrowImage.naturalWidth > 0) {
        const arrowLength = (projectile.kind === 'romanArrow' ? 19 : 17) * state.battlegroundZoom;
        ctx.drawImage(arrowImage, -arrowLength * 0.5, -arrowLength * 0.16, arrowLength, arrowLength * 0.32);
      } else {
        ctx.strokeStyle = '#d97706'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-6.5, 0); ctx.lineTo(6.5, 0); ctx.stroke();
      }
      ctx.restore();
    } else if (projectile.kind === 'spear') {
      const angle = Math.atan2(projectile.vy, projectile.vx);
      const length = 28 * state.battlegroundZoom;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = '#7c4a22';
      ctx.lineWidth = Math.max(2, 2.2 * state.battlegroundZoom);
      ctx.beginPath(); ctx.moveTo(-length * 0.55, 0); ctx.lineTo(length * 0.48, 0); ctx.stroke();
      ctx.fillStyle = '#e5e7eb';
      ctx.beginPath(); ctx.moveTo(length * 0.65, 0); ctx.lineTo(length * 0.43, -4 * state.battlegroundZoom); ctx.lineTo(length * 0.43, 4 * state.battlegroundZoom); ctx.closePath(); ctx.fill();
      ctx.restore();
    } else {
      ctx.fillStyle = projectile.color; ctx.beginPath(); ctx.arc(x, y, 3 * state.battlegroundZoom, 0, Math.PI * 2); ctx.fill();
    }
  }
  if (state.battlegroundResult) {
    const romanVictory = state.battlegroundResult === 'win';
    const pulse = 0.82 + Math.sin(performance.now() * 0.009) * 0.08;
    ctx.save();
    ctx.fillStyle = romanVictory ? 'rgba(20, 83, 45, 0.32)' : 'rgba(127, 29, 29, 0.38)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height * 0.34);
    ctx.scale(pulse, pulse);
    ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
    ctx.strokeStyle = romanVictory ? '#fbbf24' : '#ef4444';
    ctx.lineWidth = 4;
    ctx.fillRect(-260, -62, 520, 124);
    ctx.strokeRect(-260, -62, 520, 124);
    ctx.fillStyle = romanVictory ? '#fde68a' : '#fecaca';
    ctx.font = '900 34px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(romanVictory ? 'ROMAN LINE BREAK!' : 'THE ENEMY BROKE THROUGH', 0, -7);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '700 15px Arial, sans-serif';
    ctx.fillText(romanVictory ? 'Wave secured - the endless war continues' : 'The battlefield has fallen', 0, 27);
    ctx.restore();
  }
}

function updateBattlegroundPanel() {
  battleShardValue.textContent = String(Math.floor(state.battleShards));
  const theme = battlegroundThemes[(state.battlegroundWave - 1) % battlegroundThemes.length];
  battlegroundThemeValue.textContent = `Endless Wave ${state.battlegroundWave} · ${theme.name}`;
  battleZoomValue.textContent = `${Math.round(state.battlegroundZoom * 100)}%`;
  battlegroundShopButtons.forEach((button) => {
    const profile = battleUnitProfiles[button.dataset.battleUnit];
    button.querySelector('small').textContent = `${profile.cost} shards`;
    button.disabled = state.battleShards < profile.cost || state.battlegroundResult === 'loss';
  });
}

function startBattleground() {
  if (battlegroundRunLock) return;
  stopAttractMode();
  saveHeroName();
  if (!resetRun()) return;
  state.battlegroundMode = true;
  state.battlegroundSessionGuard = true;
  battlegroundRunLock = true;
  state.started = true;
  state.battlegroundWave = 1;
  state.battleShards = 20;
  state.battleUnits = [];
  state.battleEnemyQueue = [];
  state.battleProjectiles = [];
  state.battleStompEffects = [];
  state.battlegroundSpawnTimer = 0;
  state.battlegroundIncomeTimer = 1;
  state.battlegroundRetreatTimer = 0;
  state.battlegroundExitArmedUntil = 0;
  state.battlegroundZoom = 1;
  state.battlegroundCameraX = battlegroundWidth / 2;
  state.battlegroundCameraY = battlegroundHeight / 2;
  document.body.classList.add('battleground-mode');
  overlay.classList.add('hidden');
  battlegroundPanel.classList.remove('hidden');
  ['swordsman', 'legion', 'spearman', 'archer', 'cavalry'].forEach((kind, index) => createBattleUnit(kind, (390 + index * 235) * battlegroundWorldScale, true));
  [0.25, 0.5, 0.75].forEach((laneRatio) => {
    const sentry = createBattleUnit('brazierArcher', battlegroundHeight * laneRatio, true);
    if (sentry) sentry.x = 360 * battlegroundWorldScale;
  });
  setRomanAttackFormation(true);
  spawnBattlegroundWave();
  saveBattlegroundSession();
  battlegroundStatus.textContent = 'Enemy reinforcements arrive gradually. Gain 1 bonus Battle Shard every second.';
}

function requestBattlegroundExit() {
  if (!state.battlegroundMode && !battlegroundRunLock) return;
  const now = performance.now();
  if (state.battlegroundExitArmedUntil < now) {
    state.battlegroundExitArmedUntil = now + 3000;
    battlegroundStatus.textContent = 'Press the Exit button again within 3 seconds to leave. The battle is still running.';
    return;
  }
  state.battlegroundExitArmedUntil = 0;
  state.battlegroundSessionGuard = false;
  battlegroundRunLock = false;
  clearBattlegroundSession();
  document.body.classList.remove('battleground-mode');
  battlegroundPanel.classList.add('hidden');
  showMainMenu('battleground-confirmed');
}

function renderSurvivalArenaSelection() {
  survivalArenaSelectionCount.textContent = 'Your first enemies are revealed when the gates close.';
  beginSurvivalArenaButton.disabled = false;
}

function openSurvivalArenaMenu() {
  stopAttractMode();
  saveHeroName();
  inventoryPanel.classList.add('hidden');
  renderSurvivalArenaSelection();
  survivalArenaOverlay.classList.remove('hidden');
}

function getSurvivalArenaRoom() {
  return state.rooms[0];
}

function createSurvivalArenaObstacles() {
  const room = getSurvivalArenaRoom();
  state.survivalArenaObstacles = [];
  if (!room) return;
  const definitions = [
    { kind: 'stonePlinth', radius: 70 },
    { kind: 'stonePlinth', radius: 92 },
    { kind: 'stonePlinth', radius: 116 },
  ];
  const obstacleCount = 3 + Math.floor(Math.random() * 4);
  for (let index = 0; index < obstacleCount; index += 1) {
    const definition = definitions[Math.floor(Math.random() * definitions.length)];
    let candidate = null;
    for (let attempt = 0; attempt < 60; attempt += 1) {
      const x = rand(room.x + 550, room.x + room.w - 550);
      const y = rand(room.y + 420, room.y + room.h - 420);
      const clearCenter = Math.hypot(x - (room.x + room.w / 2), y - (room.y + room.h / 2)) > 360;
      const clearOthers = state.survivalArenaObstacles.every((other) => (
        Math.hypot(x - other.x, y - other.y) > definition.radius + other.radius + 90
      ));
      if (clearCenter && clearOthers) {
        candidate = { ...definition, x, y };
        break;
      }
    }
    if (candidate) state.survivalArenaObstacles.push(candidate);
  }
}

function chooseSurvivalArenaWaveRoster() {
  const unlockedCount = Math.min(survivalArenaRoster.length, 2 + Math.floor(state.wave / 2));
  const eligible = survivalArenaRoster.slice(0, Math.max(2, unlockedCount));
  const typeCount = state.wave >= 7 ? 3 : state.wave >= 3 ? 2 : 1;
  const previousSignature = [...state.survivalArenaEnemyTypes].sort().join('|');
  let chosen = [];
  for (let attempt = 0; attempt < 12; attempt += 1) {
    chosen = [...eligible].sort(() => Math.random() - 0.5).slice(0, typeCount);
    if ([...chosen].sort().join('|') !== previousSignature) break;
  }
  state.survivalArenaEnemyTypes = chosen;
  return chosen;
}

function spawnSurvivalArenaWave() {
  const room = getSurvivalArenaRoom();
  if (!room) return;
  const waveTypes = chooseSurvivalArenaWaveRoster();
  const enemyCount = Math.min(18, 2 + Math.floor(state.wave * 0.8));
  state.enemies = Array.from({ length: enemyCount }, (_, index) => {
    const type = waveTypes[index % waveTypes.length];
    const enemy = createEnemy(room, index, type);
    const angle = index / Math.max(1, enemyCount) * Math.PI * 2;
    const spawnRadius = 690 + (index % 3) * 75;
    enemy.x = room.x + room.w / 2 + Math.cos(angle) * spawnRadius;
    enemy.y = room.y + room.h / 2 + Math.sin(angle) * spawnRadius;
    enemy.aggro = true;
    return enemy;
  });
  const arenaBossChance = Math.min(0.9, 0.28 + Math.max(0, state.wave - 11) * 0.045);
  if (state.wave > 10 && state.enemies.length > 0 && Math.random() < arenaBossChance) {
    const promoted = state.enemies[Math.floor(Math.random() * state.enemies.length)];
    const bossStage = 1 + Math.floor((state.wave - 11) / 5);
    promoted.arenaBoss = true;
    promoted.arenaBossStage = bossStage;
    promoted.health *= 2.2 + bossStage * 0.7;
    promoted.maxHealth = promoted.health;
    promoted.damage *= 1.45 + bossStage * 0.18;
    promoted.speed *= Math.min(1.35, 1.04 + bossStage * 0.04);
    promoted.radius += Math.min(12, 4 + bossStage * 2);
    promoted.elite = true;
    promoted.championName = bossStage < 3 ? 'Arena Challenger' : bossStage < 5 ? 'Arena Warlord' : 'Grand Arena Tyrant';
    setMessage(`Wave ${state.wave}: ${promoted.championName} enters the arena!`, true);
  } else {
    const names = waveTypes.map((type) => journalCatalog.find((entry) => entry.id === type)?.name || type);
    setMessage(`Arena Wave ${state.wave}: ${names.join(', ')} enter the arena.`);
  }
}

const survivalArenaRewards = new Map([
  [12, 'Arena Elixir'],
  [20, 'Veteran Supplies'],
  [30, 'Arena Conqueror Plate'],
  [40, 'Two Arena Elixirs'],
]);

function awardSurvivalArenaMilestone(wave) {
  arenaLegacy.bestWave = Math.max(arenaLegacy.bestWave, wave);
  const reward = survivalArenaRewards.get(wave);
  if (!reward || arenaLegacy.milestones.includes(wave)) {
    saveArenaLegacy();
    return;
  }
  arenaLegacy.milestones.push(wave);
  if (wave === 12 || wave === 40) {
    const amount = wave === 40 ? 2 : 1;
    arenaLegacy.potions += amount;
    player.inventory.arenaPotion += amount;
    accountSpecialLoot.arenaPotions = arenaLegacy.potions;
  } else if (wave === 20) {
    arenaLegacy.veteranSupplies = true;
  } else if (wave === 30) {
    unlockedArmor.add('arenaConqueror');
    unseenGear.add('armor:arenaConqueror');
    armorDurability.arenaConqueror = getArmorMaxDurability(armorSets.find((armor) => armor.id === 'arenaConqueror'));
    saveArmorCollection();
    updateGearNotification();
  }
  saveArenaLegacy();
  saveAccountSpecialLoot();
  setMessage(`HARD ARENA REWARD: ${reward} permanently unlocked!`, true);
}

const survivalArenaDisasters = [
  { id: 'meteor', name: 'Meteor Barrage', color: '#fb923c', multiplier: 1.2 },
  { id: 'storm', name: 'Arena Lightning', color: '#60a5fa', multiplier: 1.05 },
  { id: 'quake', name: 'Coliseum Quake', color: '#facc15', multiplier: 0.9 },
];

function triggerSurvivalArenaDisaster() {
  const profile = survivalArenaDisasters[Math.floor(Math.random() * survivalArenaDisasters.length)];
  state.survivalArenaDisaster = { ...profile, warning: 1.55 };
  setMessage(`${profile.name} incoming! It will damage EVERYONE.`, true);
}

function strikeSurvivalArenaDisaster(profile) {
  const damage = (7 + state.wave * 0.9) * profile.multiplier;
  for (const enemy of state.enemies) {
    if (enemy.dead) continue;
    enemy.health -= damage;
    enemy.hitFlash = 0.22;
    spawnBurst(enemy.x, enemy.y, 9, profile.color, 105);
    if (enemy.health <= 0) {
      enemy.health = 0;
      enemy.dead = true;
      enemy.deathTimer = Math.max(enemy.deathTimer || 0, 0.45);
    }
  }
  for (const boss of getActiveBosses()) {
    boss.health = Math.max(0, boss.health - damage);
    boss.hitFlash = 0.22;
    spawnBurst(boss.x, boss.y, 12, profile.color, 120);
  }
  const allies = [player, ...player.protectors, ...player.openers];
  for (const ally of allies) {
    if (!ally || ally.health <= 0) continue;
    applyCombatDamage(ally, damage, { type: profile.name, x: ally.x, y: ally.y });
    spawnBurst(ally.x, ally.y, 9, profile.color, 105);
  }
  state.shake = Math.max(state.shake, 14);
  state.survivalArenaDisasterFlash = 0.34;
  state.survivalArenaDisaster = null;
  state.survivalArenaDisasterTimer = rand(7, 11);
  setMessage(`${profile.name} struck the hero, allies, and enemies!`, true);
}

function updateSurvivalArenaDisaster(dt) {
  if (!state.survivalArenaMode) return;
  state.survivalArenaDisasterFlash = Math.max(0, state.survivalArenaDisasterFlash - dt);
  if (state.wave < 5 || state.survivalArenaNextWaveTimer > 0 || state.roomCleared) return;
  if (state.survivalArenaDisaster) {
    state.survivalArenaDisaster.warning -= dt;
    if (state.survivalArenaDisaster.warning <= 0) strikeSurvivalArenaDisaster(state.survivalArenaDisaster);
    return;
  }
  state.survivalArenaDisasterTimer -= dt;
  if (state.survivalArenaDisasterTimer <= 0) triggerSurvivalArenaDisaster();
}

function configureSurvivalArenaWorld() {
  const theme = { name: 'Endless Arena', bg: '#030712', room: '#1f2937', floor: '#252b35', wall: '#080b12', accent: '#d6ad60', glow: '#fbbf24', shadow: '#000' };
  world.width = 3800;
  world.height = 2500;
  const room = {
    x: 220, y: 170, w: 3360, h: 2160, gx: 0, gy: 0, theme,
    doorways: { top: false, right: false, bottom: false, left: false },
    crates: [], rare: false,
  };
  state.rooms = [room];
  state.crates = [];
  state.dungeonEvents = [];
  state.biomeHazards = [];
  state.challengeRooms = [];
  state.bossArena = { x: room.x, y: room.y, w: room.w, h: room.h };
  state.roomCleared = false;
  state.enemyProjectiles = [];
  state.playerProjectiles = [];
  state.survivalArenaDisaster = null;
  state.survivalArenaDisasterTimer = state.wave >= 5 ? rand(6, 9) : 0;
  player.x = room.x + room.w / 2;
  player.y = room.y + room.h / 2;
  createSurvivalArenaObstacles();
  spawnSurvivalArenaWave();
  hud.theme.textContent = 'Endless Arena';
}

const survivalArenaTutorialSteps = [
  {
    icon: 'I',
    title: 'Survive Without Limit',
    text: 'The arena drafts a different formation from the Bestiary every wave. New enemy families enter the draft as the waves grow harder.',
  },
  {
    icon: 'II',
    title: 'Use the Arena',
    text: 'The arena is much larger, and its walls cannot be walked on. Low stone plinths match the floor and block movement, melee attacks, arrows, and spells.',
  },
  {
    icon: 'III',
    title: 'Expect Escalation',
    text: 'Disasters begin after Wave 5 and damage everyone after a warning. Arena Bosses begin after Wave 10 and become more dangerous over time.',
  },
  {
    icon: 'IV',
    title: 'Win Permanent Rewards',
    text: 'Waves 12, 20, 30, and 40 grant permanent rewards for the real game. Use Q for bandages, P for Arena Elixirs, and Esc to pause.',
  },
];
const SURVIVAL_ARENA_TUTORIAL_STEP_MS = 3400;

function renderSurvivalArenaTutorial() {
  const elapsed = performance.now() - survivalArenaTutorialStartedAt;
  const totalDuration = survivalArenaTutorialSteps.length * SURVIVAL_ARENA_TUTORIAL_STEP_MS;
  if (elapsed >= totalDuration) {
    finishSurvivalArenaTutorial();
    return;
  }
  const stepIndex = Math.min(
    survivalArenaTutorialSteps.length - 1,
    Math.floor(elapsed / SURVIVAL_ARENA_TUTORIAL_STEP_MS),
  );
  const step = survivalArenaTutorialSteps[stepIndex];
  survivalArenaTutorialIcon.textContent = step.icon;
  survivalArenaTutorialTitle.textContent = step.title;
  survivalArenaTutorialText.textContent = step.text;
  survivalArenaTutorialProgress.style.width = `${clamp(elapsed / totalDuration, 0, 1) * 100}%`;
  const remainingSeconds = Math.max(1, Math.ceil((totalDuration - elapsed) / 1000));
  survivalArenaTutorialCounter.textContent = `Rule ${stepIndex + 1} of ${survivalArenaTutorialSteps.length} · Arena begins automatically in ${remainingSeconds}s`;
}

function beginSurvivalArenaTutorial() {
  if (survivalArenaTutorialTimer) window.clearInterval(survivalArenaTutorialTimer);
  survivalArenaOverlay.classList.add('hidden');
  survivalArenaTutorialOverlay.classList.remove('hidden');
  survivalArenaTutorialStartedAt = performance.now();
  renderSurvivalArenaTutorial();
  survivalArenaTutorialTimer = window.setInterval(renderSurvivalArenaTutorial, 100);
}

function cancelSurvivalArenaTutorial() {
  if (survivalArenaTutorialTimer) window.clearInterval(survivalArenaTutorialTimer);
  survivalArenaTutorialTimer = null;
  survivalArenaTutorialOverlay.classList.add('hidden');
  survivalArenaOverlay.classList.remove('hidden');
}

function finishSurvivalArenaTutorial() {
  if (survivalArenaTutorialTimer) window.clearInterval(survivalArenaTutorialTimer);
  survivalArenaTutorialTimer = null;
  survivalArenaTutorialProgress.style.width = '100%';
  survivalArenaTutorialOverlay.classList.add('hidden');
  startSurvivalArena();
}

function startSurvivalArena() {
  if (battlegroundRunLock) return;
  saveHeroName();
  state.pantheonMode = false;
  if (!resetRun()) return;
  state.survivalArenaMode = true;
  state.survivalArenaEnemyTypes = [];
  state.started = true;
  player.food = 100;
  player.hydration = 100;
  survivalArenaOverlay.classList.add('hidden');
  overlay.classList.add('hidden');
  configureSurvivalArenaWorld();
}

function advanceSurvivalArenaWave(dt) {
  if (!state.survivalArenaMode || state.survivalArenaNextWaveTimer <= 0) return;
  state.survivalArenaNextWaveTimer = Math.max(0, state.survivalArenaNextWaveTimer - dt);
  if (state.survivalArenaNextWaveTimer > 0) return;
  state.wave += 1;
  state.roomCleared = false;
  state.perfectWaveEligible = true;
  state.enemyProjectiles = [];
  state.playerProjectiles = [];
  state.survivalArenaDisaster = null;
  state.survivalArenaDisasterTimer = state.wave >= 5 ? rand(5.5, 9) : 0;
  player.food = 100;
  player.hydration = 100;
  createSurvivalArenaObstacles();
  spawnSurvivalArenaWave();
}

// Starts the uninterrupted boss gauntlet directly at Boss 1.
function startPantheon() {
  if (battlegroundRunLock) return;
  stopAttractMode();
  // Commit the typed name before resetting inventory so the Pantheon restores
  // that exact hero's persistent Arena Keys.
  saveHeroName();
  state.godMode = false;
  state.godTravelMode = null;
  state.pantheonMode = true;
  state.pantheonBosses = [];
  state.pantheonGroupRewarded = false;
  state.pantheonFinalTrial = false;
  state.pantheonFinalBatch = 0;
  state.pantheonEscapeArmedUntil = 0;
  if (!resetRun()) return;
  state.pantheonMode = true;
  state.pantheonSessionGuard = true;
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
  // This lock is independent of pantheonMode so a bad boss-transition callback
  // cannot clear the flag and then bypass the main-menu guard. Only a confirmed
  // exit or genuine game completion is allowed to release the session.
  if (state.pantheonSessionGuard && !state.isGameOver) {
    state.pantheonMode = true;
    state.started = true;
    overlay.classList.add('hidden');
  }
  if (battlegroundRunLock || state.battlegroundSessionGuard) {
    state.isGameOver = false;
    state.battlegroundMode = true;
    state.started = true;
    state.paused = false;
    pauseOverlay.classList.add('hidden');
    overlay.classList.add('hidden');
    document.body.classList.add('battleground-mode');
    battlegroundPanel.classList.remove('hidden');
  }
  if (!attractMode.active && homeMenuIsIdleReady() && timestamp - menuLastActivity >= ATTRACT_IDLE_DELAY) {
    startAttractMode();
  }
  // A delayed transition must always win over the menu reel. This also guards
  // Pantheon/boss screens opened by timers or other asynchronous callbacks.
  if (attractMode.active && (state.started || state.threatSplashOpen || state.pantheonMode || !waveSplash.classList.contains('hidden'))) {
    stopAttractMode();
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
  if (!hitStopActive && state.battlegroundMode && state.started && !state.paused && !state.isGameOver) {
    updateBattleground(dt);
  } else if (!hitStopActive && state.started && !roomOnlyShowcase && !state.isGameOver && !state.paused && !state.challengePromptOpen && armoryOverlay.classList.contains('hidden') && arenaTrialOverlay.classList.contains('hidden') && merchantOverlay.classList.contains('hidden')) {
    if (state.threatSplashOpen) {
      updateParticles(dt);
    } else if (state.teleportTimer > 0) {
      updateBossTeleport(dt);
      updateParticles(dt);
    } else if (state.bossIntroTimer > 0) {
      const previousIntroTimer = state.bossIntroTimer;
      state.bossIntroTimer = Math.max(0, state.bossIntroTimer - dt);
      // The boss is still intangible, but the hero is already in the arena.
      // Allow free repositioning during this short materialization window.
      handleInput(dt);
      updateParticles(dt);
      if (previousIntroTimer > 0 && state.bossIntroTimer === 0 && state.boss) {
        for (const boss of getActiveBosses()) triggerBossSpawnBlast(boss);
        spawnBurst(state.boss.x, state.boss.y + 20, 34, world.themes[world.themeIndex]?.glow || '#fbbf24', 150);
        state.shake = Math.max(state.shake, 10);
        if (player.health <= 0) die();
      }
    } else if (state.victoryPoseTimer > 0) {
      updateVictoryPose(dt);
      updateBoss(dt);
      updateParticles(dt);
    } else {
      if (state.boss) {
        const groupFightActive = (state.pantheonFinalTrial || state.pantheonBosses.length > 1)
          && !state.pantheonGroupRewarded;
        if (groupFightActive || !state.boss.rewardsGranted) state.bossFightTimer += dt;
      }
      handleInput(dt);
      updateBiomeHazards(dt);
      // Resolve a ready player swing before enemies advance this frame. This
      // lets a well-timed hit knock an approaching mob out of contact range.
      if (keys.has(' ')) tryAttack();
      updateCrates(dt);
      updateSecretRooms();
      updateDungeonEvents();
      maybeOpenChallengeRoom();
      updateEnemies(dt);
      advanceSurvivalArenaWave(dt);
      updateSurvivalArenaDisaster(dt);
      updateEnemyProjectiles(dt);
      updatePlayerProjectiles(dt);
      updateProtectors(dt);
      updateOpeners(dt);
      updateBoss(dt);
      updateParticles(dt);
      state.luckyCoinBurstTimer = Math.max(0, state.luckyCoinBurstTimer - dt);
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
normalWaveButton.addEventListener('click', closeThreatSplash);
hardWaveButton.addEventListener('click', beginHardWave);
closeMerchantButton.addEventListener('click', closeMerchant);
merchantTradeButtons.forEach((button) => button.addEventListener('click', () => tradeWithMerchant(button.dataset.trade)));
closeArenaTrialButton.addEventListener('click', closeArenaTrialMenu);
openSurvivalArenaButton.addEventListener('click', (event) => {
  event.stopPropagation();
  if (!state.started && !state.isGameOver) openSurvivalArenaMenu();
});
openBattlegroundButton.addEventListener('click', (event) => {
  event.stopPropagation();
  if (!state.started && !state.isGameOver) startBattleground();
});
battlegroundShopButtons.forEach((button) => button.addEventListener('click', () => {
  createBattleUnit(button.dataset.battleUnit);
}));
battleZoomOutButton.addEventListener('click', () => changeBattlegroundZoom(-0.25));
battleZoomInButton.addEventListener('click', () => changeBattlegroundZoom(0.25));
exitBattlegroundButton.addEventListener('click', () => requestBattlegroundExit());
beginSurvivalArenaButton.addEventListener('click', (event) => {
  event.stopPropagation();
  beginSurvivalArenaTutorial();
});
closeSurvivalArenaButton.addEventListener('click', () => survivalArenaOverlay.classList.add('hidden'));
startSurvivalArenaNowButton.addEventListener('click', finishSurvivalArenaTutorial);
cancelSurvivalArenaTutorialButton.addEventListener('click', cancelSurvivalArenaTutorial);
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
repairArmorButton.addEventListener('click', repairPendingArmorWithShard);
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
    hasCustomHeroName = true;
    customHeroName = editedName;
    currentHeroName = editedName;
    persistCustomHeroName();
    saveLeaderboard();
  }
});
heroNameInput.addEventListener('blur', saveHeroName);
randomizeHeroNameButton.addEventListener('click', () => {
  hasCustomHeroName = false;
  customHeroName = '';
  currentHeroName = generateHeroName();
  heroNameInput.value = currentHeroName;
  restorePersistentArenaKeys();
  persistCustomHeroName();
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
closeInventoryButton.addEventListener('click', () => toggleAccountInventory(false));
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
  resetAttractIdleTimer();
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
  if (state.battlegroundMode) {
    event.preventDefault();
    if (!event.repeat && key === 'escape') battlegroundStatus.textContent = 'Battleground remains active. Use the Exit button twice if you want to leave.';
    else if (!event.repeat && (key === '+' || key === '=')) changeBattlegroundZoom(0.25);
    else if (!event.repeat && (key === '-' || key === '_')) changeBattlegroundZoom(-0.25);
    return;
  }
  if (!survivalArenaTutorialOverlay.classList.contains('hidden')) {
    event.preventDefault();
    if (!event.repeat && key === 'escape') cancelSurvivalArenaTutorial();
    else if (!event.repeat && key === 'enter') finishSurvivalArenaTutorial();
    return;
  }
  if (!survivalArenaOverlay.classList.contains('hidden')) {
    event.preventDefault();
    if (!event.repeat && key === 'escape') survivalArenaOverlay.classList.add('hidden');
    return;
  }
  if (!arenaTrialOverlay.classList.contains('hidden')) {
    event.preventDefault();
    if (!event.repeat && key === 'escape') closeArenaTrialMenu();
    return;
  }
  if (!merchantOverlay.classList.contains('hidden')) {
    event.preventDefault();
    if (!event.repeat && key === 'escape') closeMerchant();
    return;
  }
  if (!godModeOverlay.classList.contains('hidden')) {
    event.preventDefault();
    if (!event.repeat && key === 'escape') closeGodModeMenu();
    return;
  }
  if (state.godMode && key === 'escape') {
    event.preventDefault();
    godModeOverlay.classList.add('hidden');
    closeThreatSplash();
    showMainMenu('showcase-exit');
    return;
  }
  if (state.pantheonMode && state.started && key === 'escape') {
    event.preventDefault();
    if (event.repeat) return;
    const now = performance.now();
    if (state.pantheonEscapeArmedUntil >= now) {
      closeThreatSplash();
      showMainMenu('pantheon-confirmed');
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
    if (deathScreenReady && !event.repeat) showMainMenu('game-over-continue');
    return;
  }
  if (state.threatSplashOpen) {
    event.preventDefault();
    if (!event.repeat && key === 'k' && state.pantheonMode && !state.pantheonFinalTrial) {
      openArenaTrialMenu();
    } else if (!event.repeat && state.gearChoiceOpen && key === 'c') {
      openBetweenWaveArmory();
    } else if (!event.repeat && key === 'h' && !state.boss && !state.hardWaveActive) {
      beginHardWave();
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
    if (!inventoryPanel.classList.contains('hidden')) {
      event.preventDefault();
      toggleAccountInventory(false);
      return;
    }
    event.preventDefault();
    if (!event.repeat) togglePause();
    return;
  }
  keys.add(key);
  if (key === 'i' && state.started && !event.repeat) {
    event.preventDefault();
    toggleAccountInventory();
  }
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
  if (key === 'p' && state.started) useArenaPotion();
  if (key === 'm' && state.started && !event.repeat) useFieldMedicPotion();
  if (key === 'r' && state.started && !event.repeat) activateShield();
  if (key === 'v' && state.started && !event.repeat) {
    event.preventDefault();
    activateLuckyCoin();
  }
  if (key === 'k' && state.started && !event.repeat) {
    event.preventDefault();
    openArenaTrialMenu();
  }
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
  resetAttractIdleTimer();
}, true);

window.addEventListener('pointermove', () => {
  if (attractMode.active) stopAttractMode();
  else resetAttractIdleTimer();
}, true);

window.addEventListener('wheel', () => {
  if (attractMode.active) stopAttractMode();
  else resetAttractIdleTimer();
}, { capture: true, passive: true });

canvas.addEventListener('wheel', (event) => {
  if (!state.battlegroundMode) return;
  event.preventDefault();
  changeBattlegroundZoom(event.deltaY < 0 ? 0.2 : -0.2, event.clientX, event.clientY);
}, { passive: false });

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
refreshRelicCompletionTitle();
renderJournal();
showRandomHeroProverb();
applyEquippedArmor(true);
updateGearNotification();
restoreBattlegroundSession();
requestAnimationFrame(loop);
