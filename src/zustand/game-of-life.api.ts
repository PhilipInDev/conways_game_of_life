import { createQuery } from 'react-query-kit';
import { fetchTemplates } from '@/shared';

const useTemplates = createQuery({
  primaryKey: 'GET:/templates',
  queryFn: fetchTemplates
})

const GameOfLifeApi = {
  useTemplates,
}

export { GameOfLifeApi };
