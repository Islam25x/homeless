import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQueryWithAuth ';

export const SaveApi = createApi({
    reducerPath: 'SaveApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getSavedPosts: builder.query<any, { tenantId: number }>({
            query: ({ tenantId }) => `RentMate/Save/Posts/${tenantId}`,
        }),
        savePost: builder.mutation<any, { tenantId: number; propertyId: number }>({
            query: ({ tenantId, propertyId }) => ({
                url: `RentMate/Save?tenantId=${tenantId}&propertyId=${propertyId}`,
                method: 'POST',
                body: { tenantId, propertyId },
            }),
        }),
    }),
});

export const { useGetSavedPostsQuery, useSavePostMutation } = SaveApi;
