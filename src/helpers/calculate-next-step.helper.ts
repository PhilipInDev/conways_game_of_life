import { CellGrid, CellState } from '@/shared/game-of-life.types';
import { getGridKey } from './serialize-grid-key.helper';

const calculateNextStep = (cellGrid: CellGrid, { rowCount, colCount } : { rowCount: number; colCount: number }): CellGrid => {
  const newGrid = { ...cellGrid };

  for (let y = 0; y < rowCount; y++) {
    for (let x = 0; x < colCount; x++) {

      const key = getGridKey(x, y);

      const currentCellState = cellGrid?.[key]?.state;
      const isDead = currentCellState === CellState.DEAD || !currentCellState;

      const cellLeftSide = cellGrid?.[getGridKey(x - 1, y)];
      const cellRightSide = cellGrid?.[getGridKey(x + 1, y)];

      const cellTopSide = cellGrid?.[getGridKey(x, y + 1)];
      const cellTopLeftSide = cellGrid?.[getGridKey(x - 1, y + 1)];
      const cellTopRightSide = cellGrid?.[getGridKey(x + 1, y + 1)];

      const cellBottomSide = cellGrid?.[getGridKey(x, y - 1)];
      const cellBottomLeftSide = cellGrid?.[getGridKey(x - 1, y - 1)];
      const cellBottomRightSide = cellGrid?.[getGridKey(x + 1, y - 1)];

      const surroundCellsState = [
        cellLeftSide,
        cellRightSide,
        cellTopSide,
        cellTopLeftSide,
        cellTopRightSide,
        cellBottomSide,
        cellBottomLeftSide,
        cellBottomRightSide,
      ].reduce<{ dead: number; live: number; }>((acc, cell) => {

        if (!cell || cell?.state === CellState.DEAD) acc.dead++;
        if (cell?.state === CellState.LIVE) acc.live++;

        return acc;
      }, { dead: 0, live: 0 });

      const newGridCell = newGrid?.[key];

      // Underpopulation
      if (surroundCellsState.live < 2 && currentCellState) {
        newGrid[key] = {
          visited: false,
          ...newGridCell,
          state: CellState.DEAD,
        }
      }

      // Reproduction
      if (surroundCellsState.live === 3 && isDead) {
        newGrid[key] = {
          visited: true,
          state: CellState.LIVE,
          beingLiveSteps: newGridCell?.beingLiveSteps ? newGridCell?.beingLiveSteps + 1 : 1
        }
      }

      // Overpopulation
      if (surroundCellsState.live > 3 && currentCellState === CellState.LIVE) {
        newGrid[key] = {
          visited: false,
          ...newGridCell,
          state: CellState.DEAD,
        }
      }
    }
  }

  return newGrid;
}

export { calculateNextStep };
