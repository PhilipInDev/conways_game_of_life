import { GameTemplates } from '@/shared/game-of-life.types';
import { templates } from '@/shared/initial-state';

export const fetchTemplates = async () => new Promise<GameTemplates>(
  (resolve) => {
    setTimeout(() => resolve(templates), 1000);
  }
)
