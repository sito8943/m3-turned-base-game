**Current Version**

- 1.0.0

**Mechanics**

- **Choose Class:** Pick Warrior, Mage, or Hunter in `src/views/Home.tsx`.
- **Turn Order:** Compares `player agility` vs `enemy speed`. Higher acts first; tie favors the player.
- **Actions:**
  - **Attack:** Deals class-based damage; if the foe survives, it attacks back.
  - **Run:** Succeeds when `agility >= enemy.speed`; otherwise it is impossible and the enemy attacks.
- **Leveling:** Gain EXP from wins; at `100` EXP you level up and select an attribute in `src/sections/LevelUp.tsx`.
- **On Defeat:** Shows a summary screen in `src/sections/GameOver.tsx`.

**Stats And Enemies**

- **Player Stats:** See `src/lib/types.ts`
  - `strength`: Physical damage source; +8 life per point when chosen on level up.
  - `intelligence`: Magical damage source; +8 mana per point when chosen on level up.
  - `agility`: Turn order (player speed).
  - `life`: Hit points.
  - `mana`: Resource for spells (future use).
- **Damage Model:** `Mage => intelligence - enemy.magicResistant`, others => `strength - enemy.physicalResistant`.
- **Enemies:** Defined in `src/data/enemies.ts`. Key fields:
  - `attack`, `life`, `speed`, optional `magicResistant`, `physicalResistant`, `givenExp`.
  - Enemies are tiered and selected with level-aware weights via `getRandomEnemy(playerLevel)`; higher levels see stronger enemies more often.

**How To Run**

- **Install:** `npm install`
- **Play (build + run):** `npm run play`
- **Dev (fast rebuilds):** `npm run dev`
- **Build:** `npm run build`
- **Start (after build):** `npm start`

Requires Node 18+.

**Project Structure**

- `src/main.tsx`: App entry; renders the Ink app.
- `src/App.tsx`: Handles class selection vs fight screen.
- `src/views/Home.tsx`: Class selection UI.
- `src/views/Fight.tsx`: HUD, leveling, and combat orchestration.
- `src/sections/Combat.tsx`: Turn logic, actions (Attack/Run) and messaging.
- `src/sections/LevelUp.tsx`: Attribute choice at level up.
- `src/sections/GameOver.tsx`: Defeat summary.
- `src/data/enemies.ts`: Enemy definitions and level-aware selection.
- `src/data/stats.ts`: Base stats per class (balanced presets).
- `src/data/attributes.ts`: Attribute options for level up.
- `src/lib/types.ts`: Shared types: `Class`, `Stats`, `Enemy`, `UserAction`.
