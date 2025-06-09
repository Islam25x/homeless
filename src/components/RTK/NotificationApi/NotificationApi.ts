import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

interface notificationType {
    id: number
    actionDate: string
    description: string
    notificationType: string
    notificationTypeId: number
    isSeen: boolean
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
        getNumberOfUnSeen: builder.query<any, { userId: number }>({
            query: ({ userId }) => `RentMate/Notification/NumberOfUnSeen?userId=${userId}`,
        }),
        notificationMarkAsSeen: builder.mutation<any, { notificationId: number }>({
            query: ({ notificationId }) => ({
                url: `RentMate/Notification/MarkAsSeen?notificationId=${notificationId}`,
                method: 'POST',
            }),
        }),
    }),
});

export const { useGetNotificationQuery, useDeleteNotificationMutation, useGetNumberOfUnSeenQuery, useNotificationMarkAsSeenMutation } = NotificationApi