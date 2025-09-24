
import  { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { userApi } from "./user.api";

// Base URL for the backend API
const BASE_URL = import.meta.env.VITE_API_URL;
export const authApi = createApi({
    reducerPath : "authApi",

    baseQuery : fetchBaseQuery({
        baseUrl : `${BASE_URL}/api/v1/auth`,
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
                    // console.log("initiating fetch profile");
                    const {data} = await queryFulfilled;
                    // console.log(data);
                    dispatch(userApi.endpoints.getProfile.initiate(null));
                }
                catch(error) {
                    console.log(error);
                }
            }
        }),

        register : build.mutation({
            query : (body) => ({
                url : "/register",
                method : "POST",
                body : body,
            })
        })
    })
})

export const {useLoginMutation, useRegisterMutation} = authApi;