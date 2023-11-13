import { FC, useCallback } from 'react';
import { Cell } from '@/components';
import { CellPosition, CellState } from '@/shared/game-of-life.types.ts';
import { getGridKey } from '@/helpers/serialize-grid-key.helper.ts';
import { useGameStore } from '@/zustand/game-of-life.store.ts';
import { useRenderTracker } from '@/shared';
import { isEqual } from 'lodash';

type ZustandCellProps = CellPosition;

const ZustandCell: FC<ZustandCellProps> = ({ x, y }) => {
  const cell = useGameStore((state) => state.cells[getGridKey(x, y)], isEqual);

  const onSelect = useCallback(() => {
    useGameStore.getState().setCellState({
      state: cell?.state === CellState.LIVE ? CellState.DEAD : CellState.LIVE,
      position: { x, y },
    })
  }, [cell?.state, x, y]);

  useRenderTracker(useGameStore.getState().incCellRenders);

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
