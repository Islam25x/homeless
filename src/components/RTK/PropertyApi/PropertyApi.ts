import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { RentalDetails } from '../../../types/PropertyDetailsType';
import { Property } from '../../../types/PropertyType';

export const PropertySlice = createApi({
    reducerPath: 'Property',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getProperties: builder.query<Property[], void>({
            query: () => 'RentMate/Property',
        }),
        getPropertyPagination: builder.query<Property[], { pageNumber: number }>({
            query: ({ pageNumber }) => `RentMate/Property/Page/${pageNumber}`,
        }),
        getNumberOfPages: builder.query<number, void>({
            query: () => 'RentMate/Property/NumberOfPages',
        }),
        getPropertyLandlordPagination: builder.query<Property[], { landlordId :number ,pageNumber: number }>({
            query: ({ landlordId ,pageNumber }) => `RentMate/Property/${landlordId}/Page/${pageNumber}`,
        }),
        getNumberOfLandlordPages: builder.query<number,  {landlordId :number}>({
            query: ({ landlordId }) => `RentMate/Property/${landlordId}/NumberOfPages`,
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
                url: `RentMate/Property/Delete/${propertyId}`,
                method: 'DELETE',
            }),
        }),
        DeletePropertyImage: builder.mutation<void, { propertyImageId: number }>({
            query: ({ propertyImageId }) => ({
                url: `RentMate/Property/DeletePropertyImage/${propertyImageId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetPropertiesQuery, useGetPropertyByIdQuery, useAddPropertiesMutation, useUpdatePropertyMutation, useDeletePropertyMutation, useDeletePropertyImageMutation, useAddPropertyAlbumImageMutation , useGetPropertyPaginationQuery , useGetNumberOfPagesQuery , useGetNumberOfLandlordPagesQuery , useGetPropertyLandlordPaginationQuery } = PropertySlice
