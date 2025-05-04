import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQueryWithAuth ';

interface PropertyDto {
    id: number;
    landlordId: number
    landlordName: string
    landlordImage: string | null
    title: string;
    description: string;
    price: number;
    location: string;
    mainImage?: string;
    views: number
    status: string
    createAt: string
    propertyApproval: string
}

export const SearchApi = createApi({
    reducerPath: 'Search',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        searchProperties: builder.query<PropertyDto[], { location?: string; fromPrice?: number; toPrice?: number }>({
            query: ({ location, fromPrice, toPrice }) => {
                const params = new URLSearchParams();

                if (location) params.append('location', location);
                if (fromPrice !== undefined) params.append('fromPrice', fromPrice.toString());
                if (toPrice !== undefined) params.append('toPrice', toPrice.toString());

                return `RentMate/Search?${params.toString()}`;
            },
        }),
    }),
});

export const { useSearchPropertiesQuery } = SearchApi;
