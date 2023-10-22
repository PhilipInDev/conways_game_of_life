import { FC } from 'react';
import { ReduxGame } from '../redux/components';

type GameOfLifeProps = {};

const GameOfLife: FC<GameOfLifeProps> = () => {
  return (
   <div className="flex justify-between">
     <ReduxGame />
     <ReduxGame mirror />
   </div>
  )
}

export { GameOfLife };
