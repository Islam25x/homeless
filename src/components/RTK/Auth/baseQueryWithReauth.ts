import { fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface RefreshResponse {
    token: string;
    refreshToken?: string;
}

const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://rentmateregistration.runasp.net/Registration/Registration/',
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        console.log('token' ,token );
        
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        const userId = localStorage.getItem('userId');

        const refreshResult = await rawBaseQuery(
            {
                url: 'refresh',
                method: 'POST',
                body: { refreshToken, userId }, 
            },
            api,
            extraOptions
        );

        const refreshedData = refreshResult.data as RefreshResponse;

        if (refreshedData?.token) {
            localStorage.setItem('token', refreshedData.token);
            if (refreshedData.refreshToken) {
                localStorage.setItem('refreshToken', refreshedData.refreshToken);
            }

            // إعادة المحاولة بعد التحديث
            result = await rawBaseQuery(args, api, extraOptions);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        }
    }

    return result;
};
