# Endless Dungeon — TODO

## Rules for future development

- Keep additions readable, playable, and consistent with the existing dungeon style.
- Introduce features gradually and test each one before expanding it.
- Before implementing a boss or major attack, ask the user to create dedicated attack artwork. Final attacks should use illustrated lightning, projectiles, shockwaves, floor marks, explosions, hazards, and impact effects—not only SVG circles or basic canvas shapes.
- Temporary geometric telegraphs are acceptable only as clearly marked prototypes.
- Keep source URLs, prompts, licences, and attribution records for every imported or generated asset.

## Immediate priorities

### Art requests

1. Create a dedicated Protector character picture for gameplay and UI.
2. Create a bloodied, battle-worn hero portrait for death and close-call victory screens.
3. Create illustrated sword-swing frames/effects to replace the temporary white attack arc.
4. Replace standard SVG enemies with full picture sprites.
5. Preserve the SVG set for Retro Mode.

### Fixes and small improvements

- Add sprint exhaustion: after Stamina reaches zero, sprinting remains disabled until it recovers past a sensible threshold.
- Make `armorLevel` actually reduce incoming damage.
- Add “Crates Left” beneath the enemy counter.
- Decide how Food and Water work:
  - Keep automatic consumption and remove their unused stored inventory values; or
  - Store supplies and add explicit Eat/Drink controls.
- Remove the unused old `lavaminion.png` after confirming no code references it.

## Art still needed

### Room backgrounds

- Bloomed Hollow room.
- Ice biome room.
- Wood biome room.
- Future biome rooms.

Existing room art:

- Verdant Ruins: `lushcave.png`
- Sunken Shrine: `cyan room.png`
- Cinder Keep: `lavaroom.png`
- Moonwood: `water room.png`

### Boss arenas

- Wood Boss arena.
- Stormbound Titan arena.
- Arenas for Bosses 6–9.
- Generic/endless boss arena.

Existing arena art:

- Lush Golem: `lusharena.png`
- Lava Golem: `lavaarena.png`
- Ocean Boss: `water arena.png`
- Ice Boss: `icearena.png`

### Enemy sets

- Ice Tank.
- Wood Tank.
- Bloomed Hollow Minion and Tank.
- Full picture replacements for advanced enemies still using SVGs.

Existing complete themed sets:

- Lush Minion and Tank.
- Lava Minion and Tank.
- Ocean Minion and Tank.

## Boss roadmap

Implemented unique bosses:

1. Lush Golem
2. Lava Golem
3. Ocean Boss
4. Ice Boss
10. Wood Boss

Missing:

- Bosses 6–9 need identities, artwork, arenas, minions, attacks, threat text, death effects, balance, and rewards.
- Bosses 11 onward currently fall back to the generic boss.
- The generic boss threat screen still uses `brute.svg`.

Every new boss requires:

- Boss portrait/sprite.
- Arena background.
- Minion or summon where appropriate.
- Two or three distinctive attacks.
- Dedicated attack and telegraph artwork supplied by the user.
- Phase change or arena hazard.
- Threat-screen description.
- Sound identity and musical variation.
- Death animation.
- Reward choice.
- Balance pass.

### Boss 5 — The Stormbound Titan

- Setting: ruined tower platform surrounded by a black electrical storm.
- Appearance: cracked stone armour leaking electricity.
- Minion: Lightning Wisps that mark the floor before striking.
- Lightning Mark: a delayed strike follows a marked target.
- Chain Lightning: jumps between the hero and nearby protectors.
- Thunder Dash: the Titan transforms into a bolt and crosses the arena.
- Storm Grid: electrical lines temporarily divide the arena.
- Overcharge: below half health, attacks accelerate and leave electrical hazards.
- Sound: thunder, electrical crackling, and a distorted version of the main motif.
- Death: the Titan floats as electricity tears free, then explodes into dark fragments.
- Reward idea — Storm Step: a lightning dash or a chance for sword damage to chain.
- Environmental extension: lightning flashes reveal hidden enemies in dark rooms.
- Art request before implementation:
  - Titan picture.
  - Lightning Wisp picture.
  - Tower arena.
  - Lightning bolt and impact.
  - Floor strike marker.
  - Chain Lightning effect.
  - Storm Grid texture.
  - Electrical ground hazard.
  - Thunder Dash trail.

## Combat and player progression

- Add brief hit-stop to strong impacts.
- Improve knockback for the hero, enemies, protectors, and bosses.
- Add floating numbers for damage, critical hits, blocked damage, and healing.
- Add a proper sword-swing animation.
- Improve enemy anticipation, range indicators, impact timing, and recovery animations.
- Add dodge/roll movement.
- Add charged attacks or simple attack combinations.
- Add weapon types or active abilities.
- Display Weapon and Armour levels in an appropriate upgrade/stat screen.
- Offer a meaningful choice after every boss:
  - Weapon upgrade
  - Armour upgrade
  - Maximum Health
  - Movement ability
  - Protector upgrade
  - Rare supply bundle
  - Unique relic

## Enemy intelligence

- Spitter: real projectile attack.
- Arcane Orb: ranged magical bursts.
- Assassin: vanish, reposition, and backstab.
- Burrower: tunnel and emerge near its target.
- Sentinel: block frontal attacks and protect priority enemies.
- Wraith: phase through walls.
- Reaper: slow, dangerous sweeping attacks.
- Brute: charge and heavy knockback.
- Add formations and coordinated room entry.
- Add ambushes from doors, corners, hidden rooms, and burrow points.
- Let wounded or fragile enemies retreat.
- Let tanks protect ranged, elite, or injured enemies.
- Prevent enemies from stacking into one unreadable pile.

## Rooms, challenges, and loot

### Challenge rooms

- Give challenge rooms a distinct visual treatment.
- Add unique guardians or modifiers.
- Show the promised reward before acceptance.
- Guarantee enhanced loot.
- Scale difficulty.
- Add variants:
  - Timed kill
  - Survival
  - No healing
  - Multiple elites

### Room gameplay

- Lava floors that cause damage.
- Water that slows movement.
- Ice that creates sliding movement.
- Lush vines that temporarily hold the player.
- Traps, pressure plates, and breakable objects.
- Secret rooms.
- Keys and locked doors.
- Room-clear rewards.
- Minimap and explored-room tracking.

### Loot

- Add rare crate types.
- Give challenge and boss rewards distinct presentation.
- Add loot rarity.
- Prefer upgrade choices over silently granting every reward.

## Protectors

- Add the dedicated Protector picture.
- Show individual Protector health clearly.
- Add commands: Follow, Aggressive, and Defensive.
- Add different Protector classes.
- Add Protector upgrades.
- Improve formation, movement, and collision.
- Consider revival or healing abilities.

## Difficulty and game structure

### Difficulty

- Easy:
  - Restore some or all Health between waves and after bosses.
  - Gentler resource drain and enemy damage.
- Normal:
  - Current survival pressure with limited recovery.
- Hard:
  - Stronger enemies, scarcer supplies, harsher drain, and harder boss patterns.
- Record difficulty in high scores and run summaries.

### Modes and ending

- Give Boss 10 a proper ending, victory sequence, and credits.
- After victory, offer Endless Mode explicitly.
- Add Retro Mode:
  - SVG sprites.
  - VGA/AdLib audio.
  - Retro interface treatment.
  - “You are entering Retro Mode” splash.
- Decide whether scores and unlocks are shared between modes.

## Controls, settings, and accessibility

- Add complete key remapping.
- Detect binding conflicts.
- Add Restore Defaults.
- Save bindings locally.
- Add controller support.
- Add fullscreen mode.
- Add settings for:
  - Music volume
  - Sound volume
  - Screen shake
  - Flashing effects
  - Graphics/particle quality
  - Difficulty
- Add reduced-flashing and reduced-motion options.
- Improve HUD responsiveness on small screens.

## iPhone and mobile Safari

- Refactor keyboard and touch controls to feed one shared input state.
- Add a left-thumb movement joystick.
- Add a large right-thumb Attack button.
- Add smaller Sprint, Open Crate, Protector, Shield, and Bandage buttons.
- Use Pointer Events and clear inputs on pointer cancel/leave.
- Prevent scrolling, selection, pinch zoom, and accidental browser gestures during play.
- Support landscape orientation and changing Safari viewport height.
- Respect notch and home-indicator safe areas.
- Start/resume audio only after a user touch.
- Reduce particles and large-image work on slower phones.
- Test installation as a home-screen web app.

## Audio and music

### Stage 1 — VGA

- Generate square-wave beeps and noise bursts with the Web Audio API.
- Cover attacks, damage, crates, warnings, menus, teleporting, and death.
- Give Retro Mode a PC-speaker-style sound set.

### Stage 2 — DOS/AdLib

- Compose original MIDI/FM room loops lasting roughly 15–25 seconds.
- Aim for cheerful-but-uneasy “elevator music in a deadly dungeon.”
- Use AdLib/OPL-style instruments, bouncy bass, awkward heroic melodies, and tiny drum clicks.
- Create challenge, boss, victory, and game-over variations.
- Transform the room motif into faster, darker boss arrangements.
- Preserve pure MIDI/FM versions for Retro Mode.

### Stage 3 — Hybrid

- Keep the established motifs while adding drums, bass, ambience, orchestral sounds, and synth layers.
- Crossfade between exploration, combat, low-health, challenge, and boss stems.

### Stage 4 — Modern

- Give each biome and boss a distinct arrangement.
- Add seamless loops, stingers, phase-change cues, and a final-boss suite.

### Production and licensing

- Use ChatGPT/Codex to create original melodies, rhythms, chord progressions, MIDI plans, note tables, and JavaScript music code.
- Render VGA/retro music through the free Web Audio API.
- Export original note data to MIDI and arrange richer versions in a free tool such as LMMS.
- Alternative: import properly licensed music or effects.
  - Prefer CC0/public-domain assets.
  - Check Kenney and CC0-filtered OpenGameArt assets.
  - Pixabay can be used inside a larger game, but avoid Content ID tracks where possible.
- Never assume a whole website uses one licence; verify every asset page.
- Save the original file, creator, URL, date, licence copy, and attribution text.
- Avoid free tiers restricted to personal/non-commercial use.
- Describe musical qualities rather than requesting copies of existing artists or games.

## Run statistics and graphs

- Record lightweight timestamped events for:
  - Damage dealt and received
  - Healing
  - Attacks and kills
  - Crates and loot
  - Rooms and bosses
  - Health, Food, Hydration, and Stamina
  - Protectors
  - Movement
- Add a death recap with the final hit and largest damage sources.
- Add graphs for Health, resources, damage, enemy count, crates, and Protector health.
- Sample during play, then aggregate and render only after the run.
- Draw graphs locally with Canvas or SVG.
- Add summary cards, timelines, and individual graph views.
- Allow local JSON/CSV export.
- Do not upload run data.

## Technical work

- Fix long-run dungeon generation exceeding the fixed world height.
- Add loading/progress handling for large PNG assets.
- Compress and optimize images.
- Add performance profiles for desktop and mobile.
- Add automated checks for collision, progression, boss transitions, and save data.
- Test current versions of Chrome, Edge, Firefox, desktop Safari, and mobile Safari.
- Save settings, unlocks, high scores, and run history locally.

## Publishing and documentation

- Add an in-game credits and licence screen.
- Credit artwork, music, sound, fonts, tools, contributors, and AI-assisted work where appropriate.
- Generate credits from the stored asset records where possible.
- Add offline/PWA support.
- Add version numbers and release notes.

## Suggested development order

1. Protector artwork and integration.
2. Sprint exhaustion and Armour functionality.
3. Sword animation and improved combat feedback.
4. Crates Left and Food/Water decision.
5. Spitter and Arcane Orb ranged attacks.
6. Challenge-room rewards and visual identity.
7. Stormbound Titan artwork and attack art.
8. Implement Boss 5.
9. Bloomed Hollow room art and biome hazards.
10. Bosses 6–9 and Wood Boss arena.
11. Key remapping and settings screen.
12. Audio Stage 1, then the first MIDI room theme.
13. Mobile Safari controls and layout.
14. Run recap and first Health graph.
15. Boss 10 ending, Endless Mode, and Retro Mode.
