    import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
    import { setIsAuthenticated, setIsUserLoading, setUser } from "../features/userSlice";


    // Base URL for the backend API
    const BASE_URL = import.meta.env.VITE_API_URL;

    export const userApi = createApi({
        reducerPath : "userApi",
        tagTypes : ["User"],

        baseQuery : fetchBaseQuery({
            baseUrl : `${BASE_URL}/api/v1/users`,
            credentials : "include",
        }),

        endpoints : (build) => ({
            getProfile : build.query({
                query : () => ({
                    url : "/profile",
                }),

                transformResponse : (response) => {
                    // console.log("response")
                    // console.log(response);
                    return response.data;
                },

                async onQueryStarted(args, {dispatch, queryFulfilled}) {
                    dispatch(setIsUserLoading(true));
                    try {
                        const {data} = await queryFulfilled;
                        // console.log("Profile data:", data);
                        dispatch(setUser(data));
                        dispatch(setIsAuthenticated(true));
                    }
                    catch(error) {
                        console.log("Profile fetch error:", error);
                        dispatch(setUser(null));
                        dispatch(setIsAuthenticated(false));
                    }
                    finally {
                        dispatch(setIsUserLoading(false));
                    }
                },

                provideTags : ["User"]
            }),

            updateProfile : build.mutation({
                query : (body) => ({
                    url : "/profile/update",
                    method : "PUT",
                    body : body,
                }),

                async onQueryStarted(args, {dispatch, queryFulfilled}) {
                    try {
                        const {data} = await queryFulfilled;
                        // Update the user in the Redux store immediately
                        dispatch(setUser(data.data));
                    }
                    catch(error) {
                        console.log("Profile update error:", error);
                    }
                },

                invalidatesTags : ["User"]
            }),
        })
    })


    export const {useGetProfileQuery, useUpdateProfileMutation} = userApi;

