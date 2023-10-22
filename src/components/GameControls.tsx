import { ChangeEventHandler, FC, useCallback } from 'react';
import { Button } from '@/components/ui/Button.tsx';
import { Input } from '@/components/ui/Input.tsx';
import * as u from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup, SelectItem,
  SelectLabel,
  // SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select.tsx';
import {
  TrackNextIcon,
  PauseIcon,
  ResumeIcon,
  PlayIcon,
  ReloadIcon,
  ResetIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { GameTemplates } from '@/shared/game-of-life.types.ts';

type GameControlsProps = {
  onNextStep: () => void;
  currentStep: number;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onPause: () => void;
  undoAvailable: boolean;
  redoAvailable: boolean;
  paused: boolean;
  stepIntervalMs: number;
  onStepIntervalChange: (intervalMs: number) => void;
  templates: {
    list: GameTemplates;
    loading: boolean;
    onSelect: (templateId: string) => void;
  }
};

const GameControls: FC<GameControlsProps> = ({
  onNextStep,
  onRedo,
  onUndo,
  onClear,
  onPause,
  onStepIntervalChange,
  stepIntervalMs,
  paused,
  currentStep,
  undoAvailable,
  redoAvailable,
  templates: { list, loading, onSelect }
}) => {
  const onIntervalChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const value = stepIntervalSchema.parse(Number(e.currentTarget.value));
      onStepIntervalChange(value);
    },
    [onStepIntervalChange],
  );

  return (
    <div className="flex items-center gap-3 p-3">
      <label className="flex gap-2 items-center">
        <span>Step interval, ms</span>
        <Input
          className="w-20"
          value={stepIntervalMs}
          placeholder="Step interval, ms"
          onChange={onIntervalChange}
        />
      </label>

      <Select disabled={loading} onValueChange={onSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select template" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Templates</SelectLabel>
            {list.map(({ id, name }) => (
              <SelectItem key={id} value={id.toString()}>{name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={onPause}>
        {paused
          ?  currentStep === 0 ? <PlayIcon /> : <ResumeIcon />
          : <PauseIcon />} {' '}
      </Button>
      <Button onClick={onNextStep}>
        <TrackNextIcon />
        <span className="ml-1">
          (Step: {currentStep})
        </span>
      </Button>
      <Button onClick={onUndo} disabled={!undoAvailable}>
        <ResetIcon />
      </Button>
      <Button onClick={onRedo} disabled={!redoAvailable}>
        <ReloadIcon />
      </Button>
      <Button onClick={onClear}>
        <TrashIcon />
      </Button>
    </div>
  )
}

const stepIntervalSchema = u
  .number()
  .min(25)
  .max(10_000)
  .positive();

export { GameControls };
