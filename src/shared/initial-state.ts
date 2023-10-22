import { CellState, GameState, GameTemplates } from '@/shared/game-of-life.types.ts';

const initialState: GameState = {
  cells: {},
  rowCount: 40,
  colCount: 40,
  stepIntervalMs: 100,
  paused: true,
  currentStep: 0,

  individualCellRenders: 0,
  gameContainerRenders: 0,
  gameControlsRenders: 0,
};

const templates: GameTemplates = [
  {
    id: 1,
    name: '1-2-3',
    grid: {
      '5:4': {
        'state': CellState.LIVE,
        'visited': true
      },
      '6:4': {
        'state': CellState.LIVE,
        'visited': true
      },
      '6:5': {
        'state': CellState.LIVE,
        'visited': true
      },
      '6:6': {
        'state': CellState.LIVE,
        'visited': true
      },
      '3:5': {
        'state': CellState.LIVE,
        'visited': true
      },
      '3:6': {
        'state': CellState.LIVE,
        'visited': true
      },
      '4:6': {
        'state': CellState.LIVE,
        'visited': true
      },
      '4:7': {
        'state': CellState.LIVE,
        'visited': true
      },
      '4:8': {
        'state': CellState.LIVE,
        'visited': true
      },
      '5:9': {
        'state': CellState.LIVE,
        'visited': true
      },
      '6:9': {
        'state': CellState.LIVE,
        'visited': true
      },
      '7:9': {
        'state': CellState.LIVE,
        'visited': true
      },
      '6:7': {
        'state': CellState.LIVE,
        'visited': true
      },
      '8:6': {
        'state': CellState.LIVE,
        'visited': true
      },
      '9:6': {
        'state': CellState.LIVE,
        'visited': true
      },
      '9:7': {
        'state': CellState.LIVE,
        'visited': true
      },
      '9:8': {
        'state': CellState.LIVE,
        'visited': true
      },
      '9:9': {
        'state': CellState.LIVE,
        'visited': true
      },
      '8:10': {
        'state': CellState.LIVE,
        'visited': true
      },
      '7:11': {
        'state': CellState.LIVE,
        'visited': true
      },
      '7:12': {
        'state': CellState.LIVE,
        'visited': true
      },
      '8:12': {
        'state': CellState.LIVE,
        'visited': true
      },
      '11:8': {
        'state': CellState.LIVE,
        'visited': true
      },
      '11:9': {
        'state': CellState.LIVE,
        'visited': true
      },
      '12:9': {
        'state': CellState.LIVE,
        'visited': true
      },
      '12:8': {
        'state': CellState.LIVE,
        'visited': true
      }
    }
  },

  {
    id: 2,
    name: 'Gosper Glider gun',
    grid: {
      "10:13": {
        "state": CellState.LIVE,
        "visited": true
      },
      "10:14": {
        "state": CellState.LIVE,
        "visited": true
      },
      "10:15": {
        "state": CellState.LIVE,
        "visited": true
      },
      "11:16": {
        "state": CellState.LIVE,
        "visited": true
      },
      "11:12": {
        "state": CellState.LIVE,
        "visited": true
      },
      "12:11": {
        "state": CellState.LIVE,
        "visited": true
      },
      "13:11": {
        "state": CellState.LIVE,
        "visited": true
      },
      "12:17": {
        "state": CellState.LIVE,
        "visited": true
      },
      "13:17": {
        "state": CellState.LIVE,
        "visited": true
      },
      "14:14": {
        "state": CellState.LIVE,
        "visited": true
      },
      "15:16": {
        "state": CellState.LIVE,
        "visited": true
      },
      "15:12": {
        "state": CellState.LIVE,
        "visited": true
      },
      "16:13": {
        "state": CellState.LIVE,
        "visited": true
      },
      "16:14": {
        "state": CellState.LIVE,
        "visited": true
      },
      "16:15": {
        "state": CellState.LIVE,
        "visited": true
      },
      "17:14": {
        "state": CellState.LIVE,
        "visited": true
      },
      "20:13": {
        "state": CellState.LIVE,
        "visited": true
      },
      "21:13": {
        "state": CellState.LIVE,
        "visited": true
      },
      "20:12": {
        "state": CellState.LIVE,
        "visited": true
      },
      "21:12": {
        "state": CellState.LIVE,
        "visited": true
      },
      "21:11": {
        "state": CellState.LIVE,
        "visited": true
      },
      "20:11": {
        "state": CellState.LIVE,
        "visited": true
      },
      "22:14": {
        "state": CellState.LIVE,
        "visited": true
      },
      "22:10": {
        "state": CellState.LIVE,
        "visited": true
      },
      "24:10": {
        "state": CellState.LIVE,
        "visited": true
      },
      "24:9": {
        "state": CellState.LIVE,
        "visited": true
      },
      "24:14": {
        "state": CellState.LIVE,
        "visited": true
      },
      "24:15": {
        "state": CellState.LIVE,
        "visited": true
      },
      "34:11": {
        "state": CellState.LIVE,
        "visited": true
      },
      "34:12": {
        "state": CellState.LIVE,
        "visited": true
      },
      "35:12": {
        "state": CellState.LIVE,
        "visited": true
      },
      "35:11": {
        "state": CellState.LIVE,
        "visited": true
      },
      "1:14": {
        "state": CellState.LIVE,
        "visited": true
      },
      "0:14": {
        "state": CellState.LIVE,
        "visited": true
      },
      "0:13": {
        "state": CellState.LIVE,
        "visited": true
      },
      "1:13": {
        "state": CellState.LIVE,
        "visited": true
      }
    }
  }
]

export { initialState, templates };
