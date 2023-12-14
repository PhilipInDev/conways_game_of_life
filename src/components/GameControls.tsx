import { ChangeEventHandler, FC, useCallback, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import * as u from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  TrackNextIcon,
  PauseIcon,
  ResumeIcon,
  PlayIcon,
  ReloadIcon,
  ResetIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { GameTemplates } from '@/shared/game-of-life.types';
import { isNumber } from 'lodash';

type GameControlsProps = {
  onNextStep: () => void;
  currentStep?: number;
  onUndo?: () => void;
  onRedo?: () => void;
  onClear: () => void;
  onPause: () => void;
  undoAvailable?: boolean;
  redoAvailable?: boolean;
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
  const [localStepIntervalMs, setLocalStepIntervalMs] = useState(stepIntervalMs);
  const onIntervalChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const res = stepIntervalSchema.safeParse(Number(e.currentTarget.value));

      setLocalStepIntervalMs(Number(e.currentTarget.value))
      if (res.success) onStepIntervalChange(res.data);
    },
    [onStepIntervalChange],
  );

  return (
    <div
      className="flex items-center gap-3 p-3 overflow-y-auto"
    >
      <label className="flex gap-2 items-center">
        <span>Step interval, ms</span>
        <Input
          className="w-20 h-9"
          value={localStepIntervalMs}
          placeholder="Step interval, ms"
          onChange={onIntervalChange}
        />
      </label>

      <Select disabled={loading} onValueChange={onSelect}>
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue
            placeholder="Select template"
          />
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

      <Button size="sm" onClick={onPause}>
        {paused
          ?  currentStep === 0 ? <PlayIcon /> : <ResumeIcon />
          : <PauseIcon />} {' '}
      </Button>

      <Button size="sm" onClick={onNextStep}>
        <TrackNextIcon />
        {isNumber(currentStep) && (
          <span className="ml-1">
            (Step: {currentStep})
          </span>
        )}
      </Button>

      {onUndo && <Button size="sm" onClick={onUndo} disabled={!undoAvailable}>
        <ResetIcon/>
      </Button>}

      {onRedo && <Button size="sm" onClick={onRedo} disabled={!redoAvailable}>
        <ReloadIcon/>
      </Button>}

      <Button size="sm" onClick={onClear}>
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
