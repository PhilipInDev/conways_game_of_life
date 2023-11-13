enum CellState {
  LIVE = 'live',
  DEAD = 'dead',
}

type Cell = {
  state: CellState;
  visited: boolean;
  beingLiveSteps?: number;
}

type XCoord = number;
type YCoord = number;

type CellPosition = {
  x: XCoord;
  y: YCoord;
}

type CellGridKey = `${XCoord}:${YCoord}`;

type CellGrid = {
  [key: CellGridKey]: Cell | undefined;
};

type RenderState = {
  individualCellRenders: number;
  gameContainerRenders: number;
}

type GameState = {
  cells: CellGrid;
  rowCount: number;
  colCount: number;
  stepIntervalMs: number;
  currentStep: number;
  paused: boolean;
} & RenderState;

type GameTemplates = { id: number; name: string; grid: CellGrid }[];

// type CellGridMap = Map<GridKey, Cell>;

export type { Cell, CellPosition, CellGrid, CellGridKey, XCoord, YCoord, GameState, GameTemplates };
export { CellState };
