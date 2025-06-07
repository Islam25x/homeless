import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

interface notificationType {
    id:number
    actionDate: string
    description: string
    notificationType: string
    notificationTypeId: number
}

export const NotificationApi = createApi({
    reducerPath: 'notification',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getNotification: builder.query<notificationType[], { userId: number }>({
            query: ({ userId }) => `RentMate/Notification?userId=${userId}`,
        }),
        DeleteNotification: builder.mutation<void, { userId: number }>({
            query: ({ userId }) => ({
                url: `RentMate/Notification?userId=${userId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetNotificationQuery, useDeleteNotificationMutation } = NotificationApi