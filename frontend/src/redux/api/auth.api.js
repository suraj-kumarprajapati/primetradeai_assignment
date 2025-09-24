
import  { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { userApi } from "./user.api";

// Base URL for the backend API
const BASE_URL = import.meta.env.VITE_API_URL;
export const authApi = createApi({
    reducerPath : "authApi",
    tagTypes : ["User"], // Add the same tagTypes as userApi

    baseQuery : fetchBaseQuery({
        baseUrl : `${BASE_URL}/api/v1/auth`,
        credentials : "include",
    }),

    endpoints : (build) => ({

        login : build.mutation({
            query : (body) => ({
                url : "/login",
                method : "POST",
                body : body,
            }),

            async onQueryStarted (args, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;
                    
                    // console.log("started fetching profile...");

                    // Force fresh profile fetch by using forceRefetch
                    dispatch(userApi.endpoints.getProfile.initiate(null, { 
                        forceRefetch: true 
                    }));
                }
                catch(error) {
                    console.log("Login error:");
                    console.log(error);
                    
                }
            },
            
            // Invalidate User tags to force profile refetch
            invalidatesTags : ["User"]
        }),

        register : build.mutation({
            query : (body) => ({
                url : "/register",
                method : "POST",
                body : body,
            })
        }),

        logout : build.query({
            query : () => ({
                url : "/logout",
            }),

            // to update the auth state in the store
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;

                    // console.log("started logout process...");
                    
                    dispatch(userApi.endpoints.getProfile.initiate(null, { 
                        forceRefetch: true 
                    }));

                    // console.log("logout process completed.");
                   
                }
                catch(error) {
                    console.log("Logout error:");
                    console.log(error);
                }
            },
            invalidatesTags : ["User"],
        })

    })
})

export const {useLoginMutation, useRegisterMutation, useLazyLogoutQuery} = authApi;