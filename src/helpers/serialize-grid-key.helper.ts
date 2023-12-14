import { CellGridKey } from '@/shared/game-of-life.types';

const getGridKey = (x: number, y: number) => `${x}:${y}` as CellGridKey;
const parseGridKey = (gridKey: CellGridKey) => gridKey.split(':').map(Number) as [number, number];

export { getGridKey, parseGridKey };
