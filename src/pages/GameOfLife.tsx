import { FC } from 'react';
import { ReduxGame } from '@/redux/components';
import { ZustandGame } from '@/zustand/components';
import { SharedGameControls } from '@/pages/SharedGameControls.tsx';

type GameOfLifeProps = {};

const GameOfLife: FC<GameOfLifeProps> = () => {
  return (
   <div>
     <div className="flex justify-between flex-nowrap gap-2 overflow-y-auto">
       <div className="flex-shrink-0 overflow-y-auto">
         <h2 className="text-2xl font-bold">Redux Toolkit</h2>
         <ReduxGame />
       </div>
       <div className="flex-shrink-0 overflow-y-auto">
         <h2 className="text-2xl font-bold">Zustand</h2>
         <ZustandGame mirror />
       </div>
     </div>

    <div className="flex justify-center items-center my-5 border-t-2">
      <SharedGameControls />
    </div>
   </div>
  )
}

export { GameOfLife };
