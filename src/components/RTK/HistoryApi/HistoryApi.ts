import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { History } from '../../../types/History';

export const HistoryApi = createApi({
    reducerPath: 'History',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getPropertiesHistory: builder.query<History [], void>({
            query: () => 'RentMate/History/PropertiesHistory',
        }),
        DeletePropertiesHistory: builder.mutation<void, void>({
            query: () => ({
                url: `RentMate/History/PropertiesHistory`,
                method: 'DELETE',
            }),
        }),
        getRegistrationsHistory: builder.query<History [], void>({
            query: () => 'RentMate/History/RegistrationsHistory',
        }),
        DeleteRegistrationsHistory: builder.mutation<void, void>({
            query: () => ({
                url: `RentMate/History/RegistrationsHistory`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {useGetPropertiesHistoryQuery , useDeletePropertiesHistoryMutation , useGetRegistrationsHistoryQuery , useDeleteRegistrationsHistoryMutation } = HistoryApi
