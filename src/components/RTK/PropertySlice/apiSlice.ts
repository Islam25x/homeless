import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQueryWithAuth ';
import { RentalDetails } from '../../../types/PropertyDetails';

export const PropertySlice = createApi({
    reducerPath: 'Property',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getProperties: builder.query<any, void>({
            query: () => 'RentMate/Property',
        }),
        getPropertyById: builder.query<RentalDetails, { PropertyId: number; userId: number }>({
            query: ({ PropertyId, userId }) => `RentMate/Property/${PropertyId}?userId=${userId}`,
        }),
        AddProperties: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: 'RentMate/Property/AddProperty',
                method: 'POST',
                body: formData,
            }),
        }),
        AddPropertyAlbumImage: builder.mutation<any, { propertyId: number; formData: FormData }>({
            query: ({ propertyId, formData }) => ({
                url: `RentMate/Property/AddPropertyImage?propertyId=${propertyId}`,
                method: 'POST',
                body: formData,
            }),
        }),
        UpdateProperty: builder.mutation<any, { propertyId: number, formData: FormData }>({
            query: ({ formData, propertyId }) => ({
                url: `RentMate/Property/Update/${propertyId}`,
                method: 'PUT',
                body: formData,
            }),
        }),
        DeleteProperty: builder.mutation<void, { propertyId: number | undefined }>({
            query: ({ propertyId }) => ({
                url: `/RentMate/Property/Delete/${propertyId}`,
                method: 'DELETE',
            }),
        }),
        DeletePropertyImage: builder.mutation<void, { propertyImageId: number }>({
            query: ({ propertyImageId }) => ({
                url: `/RentMate/Property/DeletePropertyImage/${propertyImageId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetPropertiesQuery, useGetPropertyByIdQuery, useAddPropertiesMutation, useUpdatePropertyMutation, useDeletePropertyMutation, useDeletePropertyImageMutation , useAddPropertyAlbumImageMutation } = PropertySlice
