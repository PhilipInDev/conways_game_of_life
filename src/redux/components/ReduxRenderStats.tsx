import { FC } from 'react';
import { RenderStats } from '@/components';
import { useAppSelector } from '@/redux';

const ReduxRenderStats: FC = () => {
    const individualCellRenders = useAppSelector((state) => state.game.present.individualCellRenders);
    const gameContainerRenders = useAppSelector((state) => state.game.present.gameContainerRenders);

  return (
    <RenderStats
      individualCellRenders={individualCellRenders}
      gameContainerRenders={gameContainerRenders}
    />
  )
}

export { ReduxRenderStats };
