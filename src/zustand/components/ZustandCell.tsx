import { FC, useCallback } from 'react';
// import { useUpdateEffect } from 'usehooks-ts';
import { Cell } from '@/components';
import { CellPosition, CellState } from '@/shared/game-of-life.types.ts';
import { getGridKey } from '@/helpers/serialize-grid-key.helper.ts';
import { useGameStore } from '@/zustand/game-of-life.store.ts';

type ZustandCellProps = CellPosition;

const ZustandCell: FC<ZustandCellProps> = ({ x, y }) => {
  const cell = useGameStore((state) => state.cells[getGridKey(x, y)]);
  const setCellState = useGameStore((state) => state.setCellState);

  const onSelect = useCallback(() => {
    setCellState({
      state: cell?.state === CellState.LIVE ? CellState.DEAD : CellState.LIVE,
      position: { x, y },
    })
  }, [cell?.state, x, y]);

  // useUpdateEffect(() => {
  //   dispatch(incCellRenders());
  // }, [cell]);

  return (
    <Cell
      state={cell?.state || CellState.DEAD}
      onClick={onSelect}
      visited={!!cell?.visited}
      beingLiveSteps={cell?.beingLiveSteps}
    />
  )
}

export { ZustandCell };
