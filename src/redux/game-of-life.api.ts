import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fetchTemplates } from '../shared';

export const gameOfLifeApi = createApi({
  reducerPath: 'gameOfLifeApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (build) => ({
    getTemplates: build.query({
      queryFn: async () => {
        const response = await fetchTemplates();

        return { data: response }
      }
    })
  })
})
