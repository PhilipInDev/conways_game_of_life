import { FC, useCallback } from 'react';
import { useInterval } from 'usehooks-ts';
import { useAppDispatch, useAppSelector } from '@/redux';
import {
  clear,
  nextStep,
  setCells,
  togglePaused,
  setStepInterval,
  incGameContainerRenders
} from '@/redux/game-of-life.slice';
import { ActionCreators } from 'redux-undo';
import { ReduxCell } from './ReduxCell';
import { CellGrid, GameControls } from '@/components';
import { gameOfLifeApi } from '@/redux/game-of-life.api';
import { ReduxRenderStats } from './ReduxRenderStats';
import { useRenderTracker } from '@/shared';

type GameProps = {
  mirror?: boolean;
};

const ReduxGame: FC<GameProps> = ({ mirror }) => {
  const rowCount = useAppSelector((state) => state.game.present.rowCount);
  const colCount = useAppSelector((state) => state.game.present.colCount);
  const stepIntervalMs = useAppSelector((state) => state.game.present.stepIntervalMs);
  const paused = useAppSelector((state) => state.game.present.paused);
  const currentStep = useAppSelector((state) => state.game.present.currentStep);
  const undoAvailable = useAppSelector((state) => !!state.game.past.length);
  const redoAvailable = useAppSelector((state) => !!state.game.future.length);

  const {
    data: templates,
    isLoading: templatesLoading,
  } = gameOfLifeApi.useGetTemplatesQuery({});

  const dispatch = useAppDispatch();

  useInterval(
    () => {
      dispatch(nextStep());
    },
    paused ? null : stepIntervalMs,
  )

  useRenderTracker(useCallback((rendersCount) => {
    dispatch(incGameContainerRenders(rendersCount));
  }, []));

  return (
    <div>
      <GameControls
        onNextStep={() => dispatch(nextStep())}
        onUndo={() => dispatch(ActionCreators.undo())}
        onRedo={() => dispatch(ActionCreators.redo())}
        onClear={() => {
          dispatch(clear());
          dispatch(togglePaused(true));
        }}
        onPause={() => dispatch(togglePaused())}
        onStepIntervalChange={(stepIntervalMs) => dispatch(setStepInterval({ stepIntervalMs }))}
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
            template && dispatch(setCells(template.grid));
          }
        }}
      />

      <CellGrid
        rowCount={rowCount}
        colCount={colCount}
        mirror={mirror}
      >
        {ReduxCell}
      </CellGrid>

      <ReduxRenderStats />
    </div>
  )
}

export { ReduxGame };
