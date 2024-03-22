import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_auth_url, api_key } from '../firebase/auth';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_auth_url }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url: `accounts:signUp?key=${api_key}`,
                method: "POST",
                body: user
            }),
        }),
        login: builder.mutation({
            query: (user) => ({
                url: `accounts:signInWithPassword?key=${api_key}`,
                method: "POST",
                body: user
            })
        }),
    }),
});


export const { useRegisterMutation, useLoginMutation } = authApi;
