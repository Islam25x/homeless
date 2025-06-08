import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { TenantRequest } from '../../../types/TenantRequest';

export const PropertyRequestApi = createApi({
    reducerPath: 'PropertyRequestRequest',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        RentProperty: builder.mutation<any, { FormData: FormData; TenantId: number; PropertyId: number }>({
            query: ({ FormData, TenantId, PropertyId }) => ({
                url: `RentMate/RentalRequest?tenantId=${TenantId}&propertyId=${PropertyId}`,
                method: 'POST',
                body: FormData,
            }),
        }),
        DeleteRentProperty: builder.mutation<any, { TenantId: number; PropertyId: number }>({
            query: ({ TenantId, PropertyId }) => ({
                url: `RentMate/RentalRequest?tenantId=${TenantId}&propertyId=${PropertyId}`,
                method: 'DELETE',
            }),
        }),
        getTenantRequests: builder.query<TenantRequest[], { landlordId: number , propertyId :number }>({
            query: ({ landlordId , propertyId }) => `RentMate/RentalRequest/Requests/${landlordId}/${propertyId}`,
        }),
        getTenantProperty: builder.query<any, { tenantId: number }>({
            query: ({ tenantId }) => `RentMate/RentalRequest/MyRentRequests/${tenantId}`,
        }),
        AcceptRentRequest: builder.mutation<any, { rentId: number }>({
            query: ({ rentId }) => ({
                url: `RentMate/Landlord/AcceptRentRequest/${rentId}`,
                method: 'POST',
                body: FormData,
            }),
        }),
        RejectRentRequest: builder.mutation<any, { rentId: number }>({
            query: ({ rentId }) => ({
                url: `RentMate/Landlord/RejectRentRequest/${rentId}`,
                method: 'POST',
                body: FormData,
            }),
        }),
    }),
});

export const { useRentPropertyMutation, useDeleteRentPropertyMutation, useGetTenantRequestsQuery, useAcceptRentRequestMutation, useRejectRentRequestMutation, useGetTenantPropertyQuery } = PropertyRequestApi;
