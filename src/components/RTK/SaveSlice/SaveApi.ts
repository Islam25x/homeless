import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQueryWithAuth ';

interface Property {
    id: number;
    title: string;
    description: string;
    mainImage: string;
    price: number;
    propertyApproval: string
    location: string
    landlordImage:string
    views:number
    landlordName:string
    status:string
}

export const SaveApi = createApi({
    reducerPath: 'SaveApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getSavedPosts: builder.query<Property[], { tenantId: number }>({
            query: ({ tenantId }) => `RentMate/Save/Posts/${tenantId}`,
        }),
        savePost: builder.mutation<any, { tenantId: number; propertyId: number | undefined }>({
            query: ({ tenantId, propertyId }) => ({
                url: `RentMate/Save?tenantId=${tenantId}&propertyId=${propertyId}`,
                method: 'POST',
                body: { tenantId, propertyId },
            }),
        }),
    }),
});

export const { useGetSavedPostsQuery, useSavePostMutation } = SaveApi;
