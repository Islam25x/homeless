import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQueryWithAuth ';

// Define types for the response data
interface User {
    senderId: number;
    senderName: string;
    senderImage: string | null;
    time: string;
    unread: boolean;
}

interface ChatMessage {
    from: number;
    to: number;
    content: string;
    timestamp: string;
}

export const ChatApi = createApi({
    reducerPath: 'ChatApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getusersChat: builder.query<User[], { userID: number }>({
            query: ({ userID }) => `RentMate/Message/MyChats/${userID}`,
        }),
        getChatContent: builder.query<ChatMessage[], { userID: number, receiverId: number }>({
            query: ({ userID, receiverId }) => `/RentMate/Message/Chatting?userId=${userID}&recieverId=${receiverId}` ,
        }),
        SendMessage: builder.mutation<any, { userID: number, receiverId: number, message: string }>({
            query: ({ userID, receiverId, message }) => ({
                url: `/RentMate/Message/SendMessage?senderId=${userID}&recieverId=${receiverId}&message=${message}`,
                method: 'POST',
                body: { userID, receiverId, message },
            }),
        }),
    }),
});

export const { useGetusersChatQuery, useGetChatContentQuery, useSendMessageMutation } = ChatApi;
