import { FC } from 'react';

type RenderStatsProps = {
  individualCellRenders: number;
  gameContainerRenders: number;
};

const RenderStats: FC<RenderStatsProps> = ({ individualCellRenders, gameContainerRenders }) => {
  return (
    <section className="flex gap-2">
      <div className="flex gap-2">
        <span>Individual Cell re-renders: </span>
        <span>{individualCellRenders}</span>
      </div>

      <div className="flex gap-2">
        <span>Game Container re-renders: </span>
        <span>{gameContainerRenders}</span>
      </div>
    </section>
  )
}

export { RenderStats };
