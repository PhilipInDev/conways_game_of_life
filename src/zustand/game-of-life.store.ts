import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { CellGrid, CellPosition, CellState, GameState, initialState } from '@/shared';
import { getGridKey } from '@/helpers/serialize-grid-key.helper.ts';
import { calculateNextStep } from '@/helpers/calculate-next-step.helper.ts';
import { isBoolean, omit } from 'lodash';
import { persist } from 'zustand/middleware';
import { temporal } from 'zundo';
import { shared } from 'use-broadcast-ts';

type GameStore = {
  setCellState(cell: { state: CellState, position: CellPosition }): void;
  setCells(grid: CellGrid): void;
  nextStep(): void;
  setStepInterval(config: { stepIntervalMs: number }): void;
  togglePaused(paused?: boolean): void;
  clear(): void;
  incCellRenders(incCount?: number): void;
  incGameContainerRenders(incCount?: number): void;
} & GameState;

const useGameStore = create<GameStore>()(
  temporal(
    shared(
      persist(
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

          clear: () => set({ cells: {}, currentStep: 0,  individualCellRenders: 0, gameContainerRenders: 0 }),

          incCellRenders: (incCount = 1) => set({ individualCellRenders: get().individualCellRenders + incCount }),

          incGameContainerRenders: (incCount = 1) => set({ gameContainerRenders: get().gameContainerRenders + incCount }),
        }),
        // persist-options
        {
          name: 'zustand-game',
          partialize: (state) => omit(
            state,
            'individualCellRenders',
            'gameContainerRenders',
          ),
        }
      ),
      // shared-options
      {
        name: 'zustand-game-channel'
      }
    ),
    {
      equality: shallow,
      partialize: (state) => omit(
        state,
        'individualCellRenders',
        'gameContainerRenders',
        'paused',
      ),
      wrapTemporal: (tempStore) => persist(tempStore, { name: 'zustand-game-history' }),
      limit: 20,
    }
  ),
)

const useGameStoreHistory = create(useGameStore.temporal);

export { useGameStore, useGameStoreHistory };
