import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://rentmate.runasp.net/', 
    credentials: 'include',
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


