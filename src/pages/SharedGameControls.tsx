import { FC, useState } from 'react';
import { GameControls } from '@/components';
import { GameOfLifeApi } from '@/zustand/game-of-life.api';
import { useGameStore as useZustandGameStore } from '@/zustand/game-of-life.store';
import { useAppDispatch } from '@/redux';
import {
  nextStep,
  togglePaused,
  setStepInterval,
  setCells, clear
} from '@/redux/game-of-life.slice';

type SharedGameControlsProps = {};

const SharedGameControls: FC<SharedGameControlsProps> = () => {
  const [paused, setPaused] = useState(true);
  const [stepIntervalMs, setStepIntervalMs] = useState(100);

  const { data: templateList, isLoading } = GameOfLifeApi.useTemplates();

  const dispatch = useAppDispatch();

  const zustandStore = useZustandGameStore()

  const onNextStep = () => {
    zustandStore.nextStep();
    dispatch(nextStep());
  }

  const onPause = () => {
    zustandStore.togglePaused(!paused);
    dispatch(togglePaused(!paused));
    setPaused(!paused);
  }

  const onClear = () => {
    zustandStore.clear();
    dispatch(clear());
  }

  const onStepIntervalChange = (interval: number) => {
    setStepIntervalMs(interval);
    zustandStore.setStepInterval({ stepIntervalMs: interval });
    dispatch(setStepInterval({ stepIntervalMs: interval }));
  }

  const onTemplateSelect = (templateId: string) => {
    const template = templateList?.find(({ id }) => id === Number(templateId));

    if (template) {
      zustandStore.setCells(template.grid);
      dispatch(setCells(template.grid));
    }
  }

  return (
    <GameControls
      onNextStep={onNextStep}
      onClear={onClear}
      onPause={onPause}
      paused={paused}
      stepIntervalMs={stepIntervalMs}
      onStepIntervalChange={onStepIntervalChange}
      templates={{ list: templateList || [], onSelect: onTemplateSelect, loading: isLoading }}
    />
  )
}

export { SharedGameControls };
