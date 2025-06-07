import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://rentmate.runasp.net/',
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);
    console.log("📦 Initial result:", result);
    console.log('result.error', result.error);

    const isUnauthenticated = result.error?.status === 401

    if (isUnauthenticated) {
        console.warn('🔒 Unauthorized. Trying to refresh token...');

        const refreshToken = localStorage.getItem('refreshToken');
        const userId = localStorage.getItem('userId');

        if (!refreshToken || !userId) {
            console.error('⛔ Missing refresh token or user ID.');
            return result;
        }

        const refreshResult = await rawBaseQuery(
            {
                url: 'RentMate/Auth/refresh',
                method: 'POST',
                body: { refreshToken, userId: Number(userId) },
            },
            api,
            extraOptions
        );

        console.log('🔁 Refresh token result:', refreshResult);

        if (refreshResult.data && typeof refreshResult.data === 'object') {
            const { token, refreshToken: newRefresh } = refreshResult.data as {
                token: string;
                refreshToken?: string;
            };

            if (token) {
                localStorage.setItem('token', token);
                if (newRefresh) localStorage.setItem('refreshToken', newRefresh);
                console.log('✅ Token refreshed successfully.');

                // إعادة إرسال الطلب الأصلي بعد التحديث
                result = await rawBaseQuery(args, api, extraOptions);
            } else {
                const Logout = await rawBaseQuery(
                    {
                        url: 'RentMate/Auth/logout',
                        method: 'POST',
                    },
                    api,
                    extraOptions
                );
                console.error('❌ Failed to refresh token. Logging out.', Logout);
                localStorage.clear()
                console.error('❌ Refresh response did not include token.');
                window.location.reload()
            }
        }
    }

    return result;
};
