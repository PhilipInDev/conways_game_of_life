import { useQuery } from '@tanstack/react-query';
import { fetchTemplates } from '@/shared';

const useTemplates = () => useQuery({
  queryKey: ['GET:/templates'],
  queryFn: fetchTemplates,
})

const GameOfLifeApi = {
  useTemplates,
}

export { GameOfLifeApi };
