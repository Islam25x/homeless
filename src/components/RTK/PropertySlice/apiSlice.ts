import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQueryWithAuth ';

export const PropertySlice = createApi({
    reducerPath: 'Property',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getProperties: builder.query<any, void>({
            query: () => 'RentMate/Property',
        }),
        getPropertyById: builder.query<any, { PropertyId: number; userId: number }>({
            query: ({ PropertyId, userId }) => `RentMate/Property/${PropertyId}?userId=${userId}`,
        }),
        AddProperties: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: 'RentMate/Property/AddProperty',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useGetPropertiesQuery, useGetPropertyByIdQuery , useAddPropertiesMutation } = PropertySlice
