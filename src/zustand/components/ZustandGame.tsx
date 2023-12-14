import { FC } from 'react';
import { useInterval } from 'usehooks-ts';
import { ZustandCell } from './ZustandCell';
import { CellGrid, GameControls } from '@/components';
import { ZustandRenderStats } from './ZustandRenderStats';
import { useGameStore, useGameStoreHistory } from '@/zustand/game-of-life.store';
import { GameOfLifeApi } from '@/zustand/game-of-life.api';
import { useRenderTracker } from '@/shared';

type GameProps = {
  mirror?: boolean;
};

const ZustandGame: FC<GameProps> = ({ mirror }) => {
  const rowCount = useGameStore((state) => state.rowCount);
  const colCount = useGameStore((state) => state.colCount);
  const stepIntervalMs = useGameStore((state) => state.stepIntervalMs);
  const paused = useGameStore((state) => state.paused);
  const currentStep = useGameStore((state) => state.currentStep);
  const undoAvailable = useGameStoreHistory((state) => !!state.pastStates.length);
  const redoAvailable = useGameStoreHistory((state) => !!state.futureStates.length);

  const nextStep = useGameStore((state) => state.nextStep);
  const incGameContainerRenders = useGameStore((state) => state.incGameContainerRenders);
  const clear = useGameStore((state) => state.clear);
  const togglePaused = useGameStore((state) => state.togglePaused);
  const setStepInterval = useGameStore((state) => state.setStepInterval);
  const setCells = useGameStore((state) => state.setCells);
  const redo = useGameStoreHistory((state) => state.redo);
  const undo = useGameStoreHistory((state) => state.undo);

  const {
    data: templates,
    isLoading: templatesLoading,
  } = GameOfLifeApi.useTemplates();

  useInterval(
    nextStep,
    paused ? null : stepIntervalMs,
  )

  useRenderTracker(incGameContainerRenders);

  return (
    <div>
      <GameControls
        onNextStep={nextStep}
        onUndo={() => undo()}
        onRedo={() => redo()}
        onClear={() => {
          clear();
          togglePaused(true);
        }}
        onPause={togglePaused}
        onStepIntervalChange={(stepIntervalMs) => setStepInterval({ stepIntervalMs })}
        currentStep={currentStep}
        paused={paused}
        stepIntervalMs={stepIntervalMs}
        undoAvailable={undoAvailable}
        redoAvailable={redoAvailable}
        templates={{
          list: templates || [],
          loading: templatesLoading,
          onSelect: (templateId) => {
            const template = templates?.find(({ id }) => String(id) === templateId);
            template && setCells(template.grid);
          }
        }}
      />

      <CellGrid
        rowCount={rowCount}
        colCount={colCount}
        mirror={mirror}
      >
        {ZustandCell}
      </CellGrid>

      <ZustandRenderStats />
    </div>
  )
}

export { ZustandGame };
