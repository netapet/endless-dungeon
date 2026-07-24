The game has a solid visual and progression foundation, but several bosses, environments, and gameplay systems are still incomplete.

## Missing bosses

Currently implemented with unique artwork and attacks:

- Boss 1: Lush Golem
- Boss 2: Lava Golem
- Boss 3: Ocean Boss
- Boss 4: Ice Boss
- Boss 10: Wood Boss

Still missing:

- Bosses 5–9 have no unique artwork, identity, minions, arena, threat screen details, or specialized attacks.
- Bosses 11 onward return to the generic boss.
- The generic boss uses `brute.svg` on its incoming-threat screen.

Each missing boss needs:

- Boss image
- Arena background
- Name and threat-screen description
- Two or three unique attacks
- Death-effect color
- Matching minion or summon
- Balance values and loot reward

## Missing background artwork

Room backgrounds currently covered:

- Verdant Ruins → `lushcave.png`
- Sunken Shrine → `cyan room.png`
- Cinder Keep → `lavaroom.png`
- Moonwood → `water room.png`

Missing:

- Bloomed Hollow has no dedicated room image.
- There is no dedicated ice-room biome.
- There is no wood-room biome.
- Generic/future themes have no room artwork.

Boss arenas currently covered:

- Lush Golem → `lusharena.png`
- Lava Golem → `lavaarena.png`
- Ocean Boss → `water arena.png`
- Ice Boss → `icearena.png`

Missing:

- Wood Boss arena
- Arenas for bosses 5–9
- Generic boss arena

## Missing enemy artwork

Complete themed sets:

- Lush Minion and Tank
- Lava Minion and Tank
- Ocean Minion and Tank

Incomplete sets:

- Ice has a minion but no tank.
- Wood has a minion but no tank.
- Bloomed Hollow has no themed minion or tank.
- Several advanced enemies still use generic SVG artwork.

There is also an unused old `lavaminion.png` file that can eventually be removed after confirming nothing references it.

## Important gameplay gaps

### Enemy variety

Enemies have different health, speed, and damage, but most still fight by walking into the player.

The next major improvement should give enemy types real behavior:

- Spitter fires projectiles.
- Arcane Orb shoots magical bursts.
- Assassin vanishes and backstabs.
- Burrower tunnels underground.
- Sentinel blocks frontal attacks.
- Wraith phases through walls.
- Reaper performs slow, dangerous sweeps.
- Brute charges and knocks the player back.

### Loot and inventory

Food and water currently restore resources automatically when found in crates, but inventory counters also increase and are never used or displayed.

Decide between:

- Keep automatic consumption and remove stored Food/Water inventory.
- Store supplies and add buttons for eating and drinking.

Other improvements:

- Show “Crates Left” beneath “Enemies Left.”
- Add rare crate types.
- Give challenge rooms guaranteed enhanced loot.
- Add visible weapon and armour levels.
- Add loot choices instead of granting everything automatically.

### Player progression

`weaponLevel` increases damage, but `armorLevel` currently appears to have no gameplay effect.

Needed:

- Make armour reduce incoming damage.
- Show upgrade levels in the HUD.
- Offer upgrade choices after bosses.
- Add weapon types or abilities.
- Add dodge/roll movement.
- Add attack combinations or charged attacks.

### Challenge rooms

Challenge rooms work, but accepting one only adds a stronger enemy.

They still need:

- A visibly different room appearance.
- A unique guardian or enemy modifier.
- Clearly displayed reward.
- Guaranteed rare loot.
- Better entrance effects.
- Difficulty scaling.
- Different challenge types, such as survival, no-healing, timed kill, or multiple elites.

### Room gameplay

Rooms are mostly visual containers for enemies and crates.

Potential additions:

- Lava floors that cause damage.
- Water that slows movement.
- Ice that makes the player slide.
- Lush vines that temporarily hold the player.
- Traps, pressure plates, and breakable objects.
- Secret rooms.
- Locked doors requiring keys.
- Room-clearing rewards.
- Minimap and explored-room tracking.

There is also a scaling problem: the dungeon adds another room each wave, but the fixed world height eventually becomes too small. After enough waves, rooms may be generated beyond reachable world bounds.

### Boss encounters

Unique bosses have themed attacks, but they could use:

- Multiple visible phases.
- Arena hazards.
- More readable attack telegraphs.
- Boss introduction animations.
- Music changes.
- Phase-change splash or animation.
- Better victory rewards.
- A final victory condition after Boss 10, or a clear endless-mode transition.

### Protectors

Protectors currently attack and follow the player.

Possible improvements:

- Protector commands: Follow, Aggressive, Defensive.
- Visible protector health in the HUD.
- Different protector classes.
- Revival or healing.
- Better formation and collision.
- Protector upgrade choices.

## Presentation and polish

Still worth adding:

- Sound effects for attacks, crates, teleporting, warnings, and death.
- Theme music and boss music.
- Screen transitions between biomes.
- Damage numbers.
- Status-effect icons.
- Controller support.
- Volume and graphics settings.
- A proper instructions/settings menu.
- More responsive HUD behavior on small screens.
- Accessibility options for flashing effects and screen shake.
- Save progression and gameplay statistics.

## Recommended development order

1. Fix armour so upgrades matter.
2. Add stored Food/Water controls or remove their unused inventory values.
3. Add the Crates Left HUD counter.
4. Give Spitter and Arcane Orb ranged attacks.
5. Add proper challenge-room rewards.
6. Add the missing Bloomed Hollow room background.
7. Create Boss 5 with its arena, minion, attacks, and threat screen.
8. Continue bosses 6–9.
9. Add a Wood Boss arena.
10. Fix long-run dungeon world-size overflow.
11. Add sound and music.
12. Add biome hazards and more room objectives.