import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

interface NewUserDto {
    name: string;
    email: string;
    password: string;
}

interface AuthModelDto {
    email: string;
    password: string;
    token: string;
    refreshToken?: string;
    id?: string;
    role?: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth ,
    endpoints: (builder) => ({
        getLandlordPending: builder.query<any, void>({
            query: () => 'RentMate/Auth/LandlordsRequests',
        }),
        login: builder.mutation<AuthModelDto, { name: string; password: string }>({
            query: ({ name, password }) => ({
                url: 'RentMate/Auth/Login',
                method: 'POST',
                body: {name , password}
            }),
        }),
        register: builder.mutation<AuthModelDto | { message: string }, { userDto: NewUserDto; role: string }>({
            query: ({ userDto, role }) => ({
                url: `RentMate/Auth/Register?role=${role}`,
                method: 'POST',
                body: userDto,
            }),
        }),
        Logout: builder.mutation<any, void>({
            query: () => ({
                url: 'RentMate/Auth/logout',
                method: 'POST',
            }),
        }),
        refresh: builder.mutation<AuthModelDto, { refreshToken: string; userId: number }>({
            query: ({ refreshToken, userId }) => ({
                url: 'RentMate/Auth/refresh',
                method: 'POST',
                body: { refreshToken, userId },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetLandlordPendingQuery,
    useLogoutMutation,
    useRefreshMutation,
} = authApi;
