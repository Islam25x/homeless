import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQueryWithAuth ';
interface Comment {
    commentContent: string;
    createAt: string;
    image: string | null;
    name: string;
    role: string;
    userId: number;
}

export const CommentSlice = createApi({
    reducerPath: 'Comment',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getComments: builder.query<Comment[], { PropertyId: number }>({
            query: ({ PropertyId }) => `RentMate/Comment/${PropertyId}`,
        }),
        AddComment: builder.mutation<any, { userId: number, propertyId: number, content: string | undefined }>({
            query: ({ userId, propertyId, content }) => ({
                url: 'RentMate/Comment',
                method: 'POST',
                body: { userId, propertyId, content },
            }),
        }),
    }),
});

export const { useGetCommentsQuery, useAddCommentMutation } = CommentSlice
