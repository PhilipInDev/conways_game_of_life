import { FC, useMemo } from 'react';
import { CellPosition } from 'src/shared';

type CellGridProps = {
  rowCount: number;
  colCount: number;
  mirror?: boolean;
  children: FC<CellPosition>;
};

const CellGrid: FC<CellGridProps> = ({ rowCount, colCount, mirror, children: Cell }) => {
  const rows = useMemo(() => Array.from({ length: rowCount }), [rowCount]);

  return (
    <div className="flex flex-col">
      {rows.map((_, rowIdx) => (
        <div className="flex">
          <CellRow rowIdx={rowIdx} colCount={colCount} mirror={mirror}>
            {Cell}
          </CellRow>
        </div>
      ))}
    </div>
  )
}

type CellRowProps = {
  rowIdx: number;
} & Pick<CellGridProps, 'colCount' | 'children' | 'mirror'>;

const CellRow: FC<CellRowProps> = ({ children: Cell, colCount, rowIdx, mirror }) => {
  const cols = useMemo(() => Array.from({ length: colCount }), [colCount]);

  const cells = useMemo(() => cols.map((_, colIdx) => (
    <Cell x={colIdx} y={rowIdx}/>
  )), [cols, rowIdx]);

  if (mirror) return <>{cells.reverse()}</>;

  return <>{cells}</>;
}

export { CellGrid };
