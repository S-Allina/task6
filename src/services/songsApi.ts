import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../config/api';
import { SongDto } from '../interface/SongDto';
import { RequestSongDto } from '../interface/RequestSongDto';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const songsApi = createApi({
  reducerPath: 'songsApi',
  baseQuery: baseQuery,
  tagTypes: ['Song'],
  endpoints: (builder) => ({
    getSongs: builder.query<SongDto[], RequestSongDto>({
      query: (params) => ({
        url: '/songs',
        params: {
          seed: params.seed || 'default',
          lg: params.lg || 'en',
          likes: params.likes || 0,
          page: params.page || 1,
          count: params.count || 10,
        },
      }),
      providesTags: ['Song'],
    }),
  }),
});

export const { useGetSongsQuery } = songsApi;


