import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { DashboardStats } from '../../../types/DashboardStatsType';

export const AdminApi = createApi({
    reducerPath: 'Admin',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getDashBoard: builder.query<DashboardStats, void>({
            query: () => 'RentMate/Admin/DashBoard',
        }),
        AcceptLandlord: builder.mutation<any, { requestId: number }>({
            query: ({ requestId }) => ({
                url: `RentMate/Admin/AcceptRegistration/${requestId}`, 
                method: 'POST',
            }),
        }),
        DeleteLandlord: builder.mutation<any, { requestId: number }>({
            query: ({ requestId }) => ({
                url: `RentMate/Admin/LandlordRequest/${requestId}`,
                method: 'DELETE',
            }),
        }),
        AcceptPost: builder.mutation<any, { propertyId: number }>({
            query: ({ propertyId }) => ({
                url: `RentMate/Admin/AcceptPost/${propertyId}`, 
                method: 'POST',
            }),
        }),
        DeletePost: builder.mutation<any, { propertyId: number }>({
            query: ({ propertyId }) => ({
                url: `RentMate/Admin/RejectPost/${propertyId}`,
                method: 'DELETE',
            }),
        })
    }),
});

export const { useGetDashBoardQuery, useAcceptLandlordMutation, useDeleteLandlordMutation , useAcceptPostMutation , useDeletePostMutation } = AdminApi;
