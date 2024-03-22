import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url } from '../firebase/database';

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories.json', // Endpoint para obtener categorías
        }),
        getProducts: builder.query({
            query: () => 'products.json', // Endpoint para obtener todos los productos
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="categoryId"&equalTo=${category}`, // Endpoint para obtener productos por categoría
        }),
        getOrderById: builder.query({
            query: (orderId) => `orders.json?orderBy="id"&equalTo="${orderId}"`, // Endpoint para obtener una orden por su ID
        }),
        getAllOrders: builder.query({
            query: () => 'orders.json', // Endpoint para obtener todas las órdenes
        }),
        getPromotions: builder.query({
            query: () => 'products.json?orderBy="discountPercentage"&startAt=1', // Endpoint para obtener productos con descuento
        }),
        getRecentlyVisited: builder.query({
            query: () => 'products.json', // Endpoint para obtener todos los productos
        }),
        getProductRecommendations: builder.query({
            query: () => 'products.json?orderBy="salesCount"&limitToLast=3', // Endpoint para obtener productos recomendados
        }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`, // Endpoint para obtener un producto por su id
        }),
        postOrder: builder.mutation({
            query: (order) => ({
                url: '/orders.json',
                method: 'POST',
                body: order,
            }),
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
        }),
        postProfileImage: builder.mutation({
            query: (data) => ({
                url: `profileImages/${data.localId}.json`,
                method: 'PUT',
                body: { image: data.imageBase64 },
            }),
        }),
        postUserAddress: builder.mutation({
            query: (data) => ({
                url: `userAddresses/${data.localId}.json`,
                method: 'PUT',
                body: { address: data.address, lat: data.lat, lng: data.lng },
            }),
        }),
        getUserAddress: builder.query({
            query: (localId) => `userAddresses/${localId}.json`,
        }),    
    }),
});

export const { useGetCategoriesQuery, useGetProductsQuery, useGetProductsByCategoryQuery, useGetOrderByIdQuery, useGetAllOrdersQuery, useGetPromotionsQuery, useGetRecentlyVisitedQuery, useGetProductRecommendationsQuery, useGetProductByIdQuery, usePostOrderMutation, useGetProfileImageQuery, usePostProfileImageMutation, usePostUserAddressMutation, useGetUserAddressQuery } = shopApi;
