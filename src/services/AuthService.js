import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://identitytoolkit.googleapis.com/v1/"}),
    endpoints:(builder) => ({
        register:builder.mutation({
            query: (user) => ({
                url:"accounts:signup?key=AIzaSyC-nnGtX-EmAqR6EIpE-BFha8woQAw8E1A",
                method:"POST",
                body:user
            })
        }),
        login:builder.mutation({
            query: (user) => ({
                url:"accounts:signInWithPassword?key=AIzaSyC-nnGtX-EmAqR6EIpE-BFha8woQAw8E1A",
                method:"POST",
                body:user
            })
        })
    })
})

export const {useRegisterMutation,useLoginMutation} = authApi