import { FC, useCallback } from 'react';
import { Cell } from '@/components';
import { CellPosition, CellState } from '@/shared/game-of-life.types.ts';
import { useAppDispatch, useAppSelector } from '@/redux';
import {
  incCellRenders,
  setCellState
} from '@/redux/game-of-life.slice.ts';
import { getGridKey } from '@/helpers/serialize-grid-key.helper.ts';
import { isEqual } from 'lodash';
import { useRenderTracker } from '@/shared';

type ReduxCellProps = CellPosition;

const ReduxCell: FC<ReduxCellProps> = ({ x, y }) => {
  const dispatch = useAppDispatch();

  const cell = useAppSelector((state) => state.game.present.cells[getGridKey(x, y)], isEqual);

  const onSelect = useCallback(() => {
    dispatch(
      setCellState({
        state: cell?.state === CellState.LIVE ? CellState.DEAD : CellState.LIVE,
        position: { x, y },
      })
    )
  }, [cell?.state, x, y])

  useRenderTracker((rendersCount) => {
    dispatch(incCellRenders(rendersCount));
  });

  return (
    <Cell
      state={cell?.state || CellState.DEAD}
      onClick={onSelect}
      visited={!!cell?.visited}
      beingLiveSteps={cell?.beingLiveSteps}
    />
  )
}

export { ReduxCell };
