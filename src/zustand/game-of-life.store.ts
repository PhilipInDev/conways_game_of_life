import { create } from 'zustand';
import { CellGrid, CellPosition, CellState, GameState, initialState } from '@/shared';
import { getGridKey } from '@/helpers/serialize-grid-key.helper.ts';
import { calculateNextStep } from '@/helpers/calculate-next-step.helper.ts';
import { isBoolean } from 'lodash';
import { persist } from 'zustand/middleware';
import { temporal } from 'zundo';
import { shared } from 'use-broadcast-ts';

type GameStore = {
  setCellState (cell: { state: CellState, position: CellPosition }): void;
  setCells (grid: CellGrid): void;
  nextStep (): void;
  setStepInterval (config: { stepIntervalMs: number }): void;
  togglePaused (paused?: boolean): void;
  clear(): void;
  incCellRenders(): void;
  incGameContainerRenders(): void;
} & GameState;

const useGameStore = create<GameStore>()(
  persist(
    temporal(
      shared(
        (set, get) => ({
          ...initialState,

          setCellState: ({ position, state }) => set({
            cells: {
              ...get().cells,
              [getGridKey(position.x, position.y)]: {
                state,
                visited: state === CellState.LIVE,
              }
            }
          }),

          setCells: (grid) => set({ cells: grid }),

          nextStep: () => set({
            cells: calculateNextStep(
              get().cells,
              { rowCount: get().rowCount, colCount: get().colCount }
            ),
            currentStep: get().currentStep + 1,
          }),

          setStepInterval: ({ stepIntervalMs }) => set({ stepIntervalMs }),

          togglePaused: (paused) => set({ paused: isBoolean(paused) ? paused : !get().paused }),

          clear: () => set({ cells: {}, currentStep: 0 }),

          incCellRenders: () => set({ individualCellRenders: get().individualCellRenders + 1 }),

          incGameContainerRenders: () => set({ gameContainerRenders: get().gameContainerRenders + 1 }),
        }),
        // shared-options
        {
          name: "zustand-game-channel"
        }
      ),
    ),
    // persist-options
    {
      name: 'zustand-game',
    }
  )
)

const useGameStoreHistory = create(useGameStore.temporal)

export { useGameStore, useGameStoreHistory };
