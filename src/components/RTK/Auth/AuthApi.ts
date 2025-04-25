import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com/users',
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<any, void>({
            query: () => ''
        }),
        login: builder.mutation<{ token: string }, { email: string; password: string }>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        signup: builder.mutation<{ token: string }, { name: string; email: string; password: string }>({
            query: (newUser) => ({
                url: '/signup',
                method: 'POST',
                body: newUser,
            }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation , useGetUsersQuery } = authApi;
