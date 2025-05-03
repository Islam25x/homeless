import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

// interface RefreshResponse {
//     token: string;
//     refreshToken?: string;
// }

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://rentmate.runasp.net/', 
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        } else {
            console.log('No token found.');
        }
        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // if (result.error?.status === 401) {
    //     const refreshToken = localStorage.getItem('refreshToken');
    //     const userId = localStorage.getItem('userId');

    //     const refreshResult = await baseQuery(
    //         {
    //             url: 'refresh',
    //             method: 'POST',
    //             body: { refreshToken, userId }, 
    //         },
    //         api,
    //         extraOptions
    //     );

    //     const refreshedData = refreshResult.data as RefreshResponse;

    //     if (refreshedData?.token) {
    //         localStorage.setItem('token', refreshedData.token);
    //         if (refreshedData.refreshToken) {
    //             localStorage.setItem('refreshToken', refreshedData.refreshToken);
    //         }

    //         // إعادة المحاولة بعد التحديث
    //         result = await baseQuery(args, api, extraOptions);
    //     } else {
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('refreshToken');
    //     }
    // }

    return result;
};

