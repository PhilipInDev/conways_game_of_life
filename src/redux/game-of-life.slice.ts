import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, prepareAutoBatched } from '@reduxjs/toolkit';
import { isBoolean } from 'lodash';
import undoable, { includeAction } from 'redux-undo';
import { initialState } from '@/shared/initial-state.ts';
import { CellGrid, CellPosition, CellState } from '@/shared/game-of-life.types.ts';
import { calculateNextStep } from '../helpers/calculate-next-step.helper.ts';
import { getGridKey } from '../helpers/serialize-grid-key.helper.ts';

export const counterSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCellState: (state, action: PayloadAction<{ state: CellState, position: CellPosition }>) => {
      const { state: cellState, position: { x, y } } = action.payload;

      state.cells[getGridKey(x, y)] = { state: cellState, visited: cellState === CellState.LIVE };
    },

    setCells: (state, action: PayloadAction<CellGrid>) => {
      state.cells = action.payload;
    },

    nextStep: (state) => {
      state.cells = calculateNextStep(
        state.cells,
        { rowCount: state.rowCount, colCount: state.colCount }
      );
      state.currentStep++;
    },

    setStepInterval: (state, action: PayloadAction<{ stepIntervalMs: number }>) => {
      const { stepIntervalMs } = action.payload;

      state.stepIntervalMs = stepIntervalMs;
    },

    togglePaused: (state, action: PayloadAction<boolean | undefined>) => {
      const paused = action.payload;

      state.paused = isBoolean(paused) ? paused : !state.paused;
    },

    clear: (state) => {
      state.cells = {};
      state.currentStep = 0;
      state.individualCellRenders = 0;
      state.gameContainerRenders = 0;
    },

    incCellRenders: {
      reducer: (state, action: PayloadAction<number | void>) => {
        const rendersCount = action.payload || 1;

        state.individualCellRenders += rendersCount;
      },
      prepare: prepareAutoBatched<number | void>(),
    },

    incGameContainerRenders: (state, action: PayloadAction<number | undefined>) => {
      const rendersCount = action.payload || 1;

      state.gameContainerRenders += rendersCount;
    },
  },
})

export const {
  setCellState,
  nextStep,
  setStepInterval,
  togglePaused,
  clear,
  setCells,
  incCellRenders,
  incGameContainerRenders
} = counterSlice.actions;

export const gameReducer = undoable(
  counterSlice.reducer,
  {
    filter: includeAction([setCellState.type, nextStep.type, clear.type]),
    limit: 20,
  }
);
