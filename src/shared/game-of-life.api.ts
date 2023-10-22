import { GameTemplates } from '@/shared/game-of-life.types.ts';
import { templates } from '@/shared/initial-state.ts';

export const fetchTemplates = async () => new Promise<GameTemplates>(
  (resolve) => {
    setTimeout(() => resolve(templates), 1000);
  }
)
