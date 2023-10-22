import { FC } from 'react';
import { RenderStats } from '@/components';
import { useGameStore } from '@/zustand/game-of-life.store.ts';

const ZustandRenderStats: FC = () => {
    const individualCellRenders = useGameStore((state) => state.individualCellRenders);
    const gameContainerRenders = useGameStore((state) => state.gameContainerRenders);

  return (
    <RenderStats
      individualCellRenders={individualCellRenders}
      gameContainerRenders={gameContainerRenders}
    />
  )
}

export { ZustandRenderStats };
