import { CartI } from "@/types/cart"
import { stripeResponse } from "@/types/stripe";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getSession, useSession } from "next-auth/react";
export const fakeStoreAPISlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
        prepareHeaders: async (headers) => {
            const session = await getSession();
            if (session?.accessToken) {
                headers.set("Authorization", `Bearer ${session.accessToken}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getProductById: builder.query({
            query: (productId) => `/products/${productId}`
        }),
        getProducts: builder.query({
            query: () => '/products'
        }),
        getProductsByCategory: builder.query({
            query: ({ category, page, limit }) => ({
                url: `/products/category/?category=${category}&page=${page}&limit=${limit}`,
                method: "GET",
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        addCart: builder.mutation({
            query: (cart: CartI) => ({
                url: `/orders`,
                method: "POST",
                body: cart,
            }),
        }),
        getCategories: builder.query({
            query: () => '/products/categories'
        }),
        getStripe: builder.query<stripeResponse, string | string[]>({
            query: (id) => ({
                url: "/stripe/create-payment-intent",
                method: "GET",
                params: { id },
            }),
        })
    })
})


export const { useGetProductByIdQuery, useLoginUserMutation, useAddCartMutation, useGetStripeQuery, useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery } = fakeStoreAPISlice