import { FC } from 'react';
import { cn } from '@/helpers/ui.ts';
import { CellState } from '@/shared/game-of-life.types';

type CellProps = {
  state: CellState;
  visited: boolean;
  onClick: () => void;
  beingLiveSteps?: number;
};

const Cell: FC<CellProps> = ({ state, onClick, visited, beingLiveSteps }) => {
  return (
    <div
      role="checkbox"
      onClick={onClick}
      onMouseEnter={(e) => {
        if (e.buttons === 1) {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        'w-5 h-5 border inline-flex select-none',
        {
          'bg-gray-100': visited,
          'bg-white': !visited && state === CellState.DEAD,
          'bg-black': state === CellState.LIVE,
      })}
    >
      {state === CellState.DEAD && (
        <span className="text-gray-300 text-xs text-center font-semibold select-none">
          {beingLiveSteps}
        </span>
      )}
    </div>
  )
}

export { Cell };
