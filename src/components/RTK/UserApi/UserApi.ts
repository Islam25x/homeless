import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
interface DashboardStats {
    numberOfUsers: number;
    numberOfTenants: number;
    numberOfLandlords: number;
    numberOfProperties: number;
}

export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getUserPhoto: builder.query<any, { id: number }>({
            query: ({ id }) => `RentMate/User/${id}/image`,
        }),
        uploadUserPhoto: builder.mutation<void, { Id: number; file: File }>({
            query: ({ Id, file }) => {
                const formData = new FormData();
                formData.append('Id', String(Id));
                formData.append('Image', file); // لازم نفس اسم الخاصية في DTO

                return {
                    url: 'RentMate/User/image',
                    method: 'POST',
                    body: formData,
                    // لا تكتب Content-Type بنفسك، المتصفح يحددها تلقائياً
                };
            },
        }),
        getUserStatistics: builder.query<DashboardStats, void>({
            query: () => `RentMate/User/Statistics`,
        }),
    }),
});

export const {
    useGetUserPhotoQuery,
    useUploadUserPhotoMutation,
    useGetUserStatisticsQuery
} = UserApi;
