import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../types/users";
import { prepareAuthHeaders } from "../../../common/utils/prepareAuthHeaders";

interface IGetUsersApiResponse {
  items: IUser[];
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/users`,
    prepareHeaders: prepareAuthHeaders,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    deleteUser: builder.mutation<void, string[]>({
      invalidatesTags: ["Users"],
      query: (ids) => {
        return {
          url: `/`,
          method: "DELETE",
          body: {
            ids: ids,
          },
        };
      },
    }),
    banUser: builder.mutation<void, string[]>({
      invalidatesTags: ["Users"],
      query: (ids) => {
        return {
          url: `/block`,
          method: "PUT",
          body: {
            ids: ids,
          },
        };
      },
    }),
    unBanUser: builder.mutation<void, string[]>({
      invalidatesTags: ["Users"],
      query: (ids) => {
        return {
          url: `/unblock`,
          method: "PUT",
          body: {
            ids: ids,
          },
        };
      },
    }),
    getUsers: builder.query<IGetUsersApiResponse, void>({
      providesTags: ["Users"],
      query: () => {
        return {
          url: "/all",
        };
      },
    }),
    getUser: builder.query<IUser, void>({
      providesTags: ["Users"],
      keepUnusedDataFor: 0,
      query: () => {
        return {
          url: "/",
        };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useBanUserMutation,
  useUnBanUserMutation,
  useGetUserQuery,
} = usersApi;
