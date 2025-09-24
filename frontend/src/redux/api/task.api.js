import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base URL for the backend API
const BASE_URL = import.meta.env.VITE_API_URL;

export const taskApi = createApi({
  reducerPath: "taskApi",
  tagTypes: ["Task"],

  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/tasks`,
    credentials: "include",
  }),

  endpoints: (build) => ({
    getAllTasks: build.query({
      query: () => ({
        url: "",
      }),

      transformResponse: (response) => {
        return response.data || response;
      },

      providesTags: ["Task"],
    }),

    addTask: build.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body: body,
      }),

      invalidatesTags: ["Task"],
    }),

    editTask : build.mutation({
        query: ({id, body}) => ({
            url: `/${id}`,
            method: "PUT",
            body : body,
        }),
        invalidatesTags: ["Task"],
    }),

    deleteTask: build.mutation({
        query: (id) => ({
            url: `/${id}`,
            method: "DELETE",
        }), 
        invalidatesTags: ["Task"],
    }),

  }),
});

export const { useGetAllTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useEditTaskMutation } = taskApi;
