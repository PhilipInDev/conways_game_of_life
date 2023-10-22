import { FC } from 'react';
import { CellPosition } from 'src/shared';

type CellGridProps = {
  rowCount: number;
  colCount: number;
  mirror?: boolean;
  children: FC<CellPosition>;
};

const CellGrid: FC<CellGridProps> = ({ rowCount, colCount, mirror, children: Cell }) => {
  return (
    <div className="flex flex-col">
      {Array.from({ length: rowCount }).map((_, rowIdx) => (
        <div className="flex">
          {(() => {
            const cells = Array.from({ length: colCount }).map((_, colIdx) => (
              <Cell x={colIdx} y={rowIdx}/>
            ));

            if (mirror) return cells.reverse();

            return cells;
          })()}
        </div>
      ))}
    </div>
  )
}

export { CellGrid };
