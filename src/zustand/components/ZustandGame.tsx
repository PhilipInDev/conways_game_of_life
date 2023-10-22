import { FC, useTransition } from 'react';
import { useInterval, useUpdateEffect } from 'usehooks-ts';
import { ZustandCell } from './ZustandCell.tsx';
import { CellGrid, GameControls } from '@/components';
import { ZustandRenderStats } from './ZustandRenderStats.tsx';
import { useGameStore, useGameStoreHistory } from '@/zustand/game-of-life.store.ts';
import { GameOfLifeApi } from '@/zustand/game-of-life.api.ts';

type GameProps = {
  mirror?: boolean;
};

const ZustandGame: FC<GameProps> = ({ mirror }) => {
  const rowCount = useGameStore((state) => state.rowCount);
  const colCount = useGameStore((state) => state.colCount);
  const stepIntervalMs = useGameStore((state) => state.stepIntervalMs);
  const paused = useGameStore((state) => state.paused);
  const currentStep = useGameStore((state) => state.currentStep);
  const undoAvailable = useGameStoreHistory((state) => !!state.pastStates);
  const redoAvailable = useGameStoreHistory((state) => !!state.futureStates);

  const nextStep = useGameStore((state) => state.nextStep);
  const incGameContainerRenders = useGameStore((state) => state.incGameContainerRenders);
  const clear = useGameStore((state) => state.clear);
  const togglePaused = useGameStore((state) => state.togglePaused);
  const setStepInterval = useGameStore((state) => state.setStepInterval);
  const setCells = useGameStore((state) => state.setCells);
  const undo = useGameStoreHistory((state) => state.undo);
  const redo = useGameStoreHistory((state) => state.redo);

  const {
    data: templates,
    isInitialLoading: templatesLoading,
  } = GameOfLifeApi.useTemplates();

  const [_, startTransition] = useTransition();

  useInterval(
    () => startTransition(nextStep),
    paused ? null : stepIntervalMs,
  )

  useUpdateEffect(incGameContainerRenders);

  return (
    <div>
      <GameControls
        onNextStep={nextStep}
        onUndo={undo}
        onRedo={redo}
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
