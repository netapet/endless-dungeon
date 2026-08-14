# Endless Dungeon — Art TODO

This file contains artwork to create outside the game project. See `TODO LIST.md` for implementation, design, audio, and technical work.

## Highest priority

- [ ] Dedicated Protector character artwork for gameplay and UI.
- [ ] Bloodied, battle-worn hero portrait for death and close-call victory screens.
- [ ] Illustrated sword-swing frames/effects to replace the temporary white attack arc.
- [ ] Sword-free male and female gameplay versions of every armour set.
  - Keep hand position, body framing, scale, anchor point, facing direction, and transparency consistent so every separate weapon sprite attaches to the same grip point.
- [ ] Make `emerald-sword-portrait` and `lava-blade-portrait` backgrounds transparent.

## Enemy artwork

- [ ] Modern transparent-background PNG replacements for advanced enemies that still use SVG artwork:
  - Assassin
  - Burrower
  - Wraith
  - Reaper
  - Arcane Orb
- [ ] Matching before-wave portraits for those advanced enemies.
- [ ] Ice Tank.
- [ ] Wood Tank.
- [ ] Bloomed Hollow Minion.
- [ ] Bloomed Hollow Tank.
- [ ] More creatures for each theme, developed from the existing small thumbnails in `themes.png`.
- [ ] Generic boss threat-screen artwork to replace `brute.svg`.

Preserve all existing SVG sprites for Retro Mode.

## Animation sets

- [ ] Give every active figure at least two compatible gameplay frames:
  - Neutral/recovery pose with hands or weapon lowered.
  - Attack/impact pose with hands, claws, staff, or weapon raised or extended.
- [ ] Give important bosses additional wind-up, rage transformation, special-attack, and death frames where practical.

For every animation set, keep framing, scale, anchor point, facing direction, lighting, and transparency consistent. Keep UI portraits separate from gameplay frames. Use filenames such as `creature-id-idle.png`, `creature-id-attack.png`, and `creature-id-windup.png`.

## Room backgrounds

- [ ] Bloomed Hollow room.
- [ ] Dark torchlit room theme where the hero and creatures are only faintly visible.
- [ ] Future biome rooms as they are designed.

Existing room art for reference:

- Verdant Ruins: `lushcave.png`
- Sunken Shrine: `cyan room.png`
- Cinder Keep: `lavaroom.png`
- Moonwood: `water room.png`
- Ice biome: `ice-room.png`
- Skeleton biome: `skeleton-room.png`
- Desert biome: `sand-room.png`
- Abyss biome: `abyss-room.png`
- Shadow biome: `shadow-room.png`
- Crystal biome: `crystal-room.png`
- Mech biome: `mech-room.png`

## Boss arenas

- [ ] Stormbound Titan tower arena.
- [ ] Generic/endless boss arena.

Existing arena art for reference:

- Lush Golem: `lusharena.png`
- Lava Golem: `lavaarena.png`
- Ocean Boss: `water arena.png`
- Ice Boss: `icearena.png`
- Skeleton Warlord: `skeleton-arena.png`
- Sand Tyrant and Gilded Dune Serpent: `sand-arena.png`
- Umbral Warden: `shadow-arena.png`
- Abyssal Devourer: `abyss-arena.png`
- Scorpion Queen: `scorpio-arena.png`
- Wood Boss: `wood-arena.png`
- Mycelial Sovereign: `fungal-arena.png`
- Furnace Overlord: `mech-arena.png`
- Prismatic Guardian: `crystal-arena.png`

## Stormbound Titan set

- [ ] Titan gameplay picture and portrait.
- [ ] Lightning Wisp gameplay picture and portrait.
- [ ] Tower arena.
- [ ] Lightning bolt and impact.
- [ ] Floor strike marker.
- [ ] Chain Lightning effect.
- [ ] Storm Grid texture.
- [ ] Electrical ground hazard.
- [ ] Thunder Dash trail.

## Future boss art package

Create these for every new boss before implementation:

- [ ] Boss portrait and gameplay sprite.
- [ ] Arena background.
- [ ] Minion or summon where appropriate.
- [ ] Dedicated attack and telegraph artwork for two or three distinctive attacks.
- [ ] Phase-change or arena-hazard artwork.
- [ ] Death animation.
- [ ] Enlarged boss and rage-effect artwork when the boss has a low-health rage phase.

Final attacks should use illustrated lightning, projectiles, shockwaves, floor marks, explosions, hazards, and impact effects rather than only basic geometric shapes. Keep source URLs, prompts, licences, and attribution records for every imported or generated asset.
