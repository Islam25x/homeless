import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PropertySlice = createApi({
    reducerPath: 'Property',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/products' }),
    endpoints: (builder) => ({
        getProperties: builder.query<any, void>({
            query: () => '',
        }),
        getPropertyById: builder.query<any, number>({
            query: (id) => `/${id}`,
        }),
    }),
});

export const { useGetPropertiesQuery , useGetPropertyByIdQuery } = PropertySlice
