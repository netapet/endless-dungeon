# Endless Dungeon — TODO

## Rules for future development

- Keep additions readable, playable, and consistent with the existing dungeon style.
- Introduce features gradually and test each one before expanding it.
- Temporary geometric telegraphs are acceptable only as clearly marked prototypes.
- Keep source URLs, prompts, licences, and attribution records for every imported or generated asset.
- Keep artwork creation requests in `ART TODO.md`.

## Art dependency

Artwork to create separately is tracked in `ART TODO.md`.

## Boss roadmap

Implemented unique bosses (reference):

1. Lush Golem
2. Lava Golem
3. Ocean Boss
4. Ice Boss
5. Skeleton Warlord
6. Sand Tyrant
7. Umbral Warden
8. Abyssal Devourer
9. Scorpion Queen
10. Wood Boss
11. Mycelial Sovereign
12. Furnace Overlord
13. Prismatic Guardian
14. Gilded Dune Serpent

Remaining boss work:

- The Stormbound Titan remains a future boss concept.
- Existing bosses still need sound identities, richer death effects, and balance passes.

Every new boss requires:

- Two or three distinctive attacks.
- Phase change or arena hazard.
- Threat-screen description.
- Sound identity and musical variation.
- Reward choice.
- Balance pass.

### Future boss idea — The Stormbound Titan

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

## Combat and player progression

- Add a temporary Hero Growth mode:
  - Trigger it through a rare potion or another item the hero must discover.
  - Make the hero visibly grow and become stronger for only a few seconds.
  - Clearly telegraph when the effect is about to expire.
  - Decide whether growth increases damage, reach, knockback, defence, or some combination.
- Improve knockback for the hero, enemies, protectors, and bosses.
- Add floating numbers for damage, critical hits, blocked damage, and healing.
- Add a proper sword-swing animation.
- Improve enemy anticipation, range indicators, impact timing, and recovery animations.
- Add dodge/roll movement.
- Add charged attacks or simple attack combinations.
- Add weapon types or active abilities.
- Offer a meaningful choice after every boss:
  - Weapon upgrade
  - Armour upgrade
  - Maximum Health
  - Movement ability
  - Protector upgrade
  - Rare supply bundle
  - Unique relic

## Enemy intelligence

- Add formations and coordinated room entry.
- Add ambushes from doors, corners, hidden rooms, and burrow points.
- Let wounded or fragile enemies retreat.
- Let tanks protect ranged, elite, or injured enemies.

## Rooms, challenges, and loot

### Challenge rooms

- Give challenge rooms a distinct visual treatment.
- Add unique guardians or modifiers.
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

- Show individual Protector health clearly.
- Add commands: Follow, Aggressive, and Defensive.
- Add different Protector classes.
- Add Protector upgrades.
- Improve formation, movement, and collision.
- Consider revival or healing abilities.

## Difficulty and game structure

### Future combat modes

- Add a Street Fighter Mode for selected boss encounters:
  - Switch from the usual top-down arena to a dramatic side-view fight.
  - Adapt movement, attacks, collision, camera framing, health bars, and boss telegraphs to the side-view format.
  - Decide whether this is a special mode, a rare encounter, or a presentation used by particular bosses.
- Add low-health Boss Rage phases:
  - Make the boss shake, grow dramatically, and remain at its existing low health.
  - Increase its damage and possibly its speed, reach, knockback, or attack frequency.
  - Give the transformation a clear warning animation before the stronger attacks begin.

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

1. Integrate the next completed art assets from `ART TODO.md`.
2. Sword animation and improved combat feedback.
3. Challenge-room rewards and visual identity.
4. Bloomed Hollow biome hazards.
5. Key remapping and settings screen.
6. Audio Stage 1, then the first MIDI room theme.
7. Mobile Safari controls and layout.
8. Run recap and first Health graph.
9. Boss 10 ending, Endless Mode, and Retro Mode.
10. Stormbound Titan implementation after its art set is ready.
