import { FC } from 'react';
import { ReduxGame } from '@/redux/components';
import { ZustandGame } from '@/zustand/components';

type GameOfLifeProps = {};

const GameOfLife: FC<GameOfLifeProps> = () => {
  return (
   <div className="flex justify-between">
     <ReduxGame />
     <ZustandGame mirror />
   </div>
  )
}

export { GameOfLife };
