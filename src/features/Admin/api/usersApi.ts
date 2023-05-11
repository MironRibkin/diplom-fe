import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareAuthHeaders } from "../../../common/utils/prepareAuthHeaders";

interface IUser {
  id: string;
  userName: string;
  email: string;
  banned: boolean;
  avatarSrc: string;
  role: string;
  status: string;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/`,
    prepareHeaders: prepareAuthHeaders,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    deleteUser: builder.mutation<void, string[]>({
      invalidatesTags: ["Users"],
      query: (ids) => {
        return {
          url: "/admin/users",
          method: "DELETE",
          body: { ids },
        };
      },
    }),
    banUser: builder.mutation<void, string[]>({
      invalidatesTags: ["Users"],
      query: (ids) => {
        return {
          url: "/admin/users/ban",
          method: "POST",
          body: { ids },
        };
      },
    }),
    appointAdmin: builder.mutation<void, string>({
      invalidatesTags: ["Users"],
      query(id) {
        return {
          url: "/admin/users/appoint-admin",
          method: "POST",
          body: { id },
        };
      },
    }),
    removeAdmin: builder.mutation<void, string>({
      invalidatesTags: ["Users"],
      query(id) {
        return {
          url: "/admin/users/remove-admin",
          method: "POST",
          body: { id },
        };
      },
    }),
    unBanUser: builder.mutation<void, string[]>({
      invalidatesTags: ["Users"],
      query: (ids) => {
        return {
          url: "/admin/users/unban",
          method: "POST",
          body: { ids },
        };
      },
    }),
    getUsers: builder.query<IUser[], void>({
      providesTags: ["Users"],
      query: () => {
        return {
          url: "/admin/users",
        };
      },
    }),
    getUser: builder.query<IUser, void>({
      keepUnusedDataFor: 0,
      providesTags: ["Users"],
      query: () => {
        return {
          url: "/auth/user",
        };
      },
    }),
    getUserById: builder.query<IUser, string>({
      providesTags: ["Users"],
      query: (id) => {
        return {
          url: `/auth/user/${id}`,
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useBanUserMutation,
  useAppointAdminMutation,
  useRemoveAdminMutation,
  useUnBanUserMutation,
  useGetUserByIdQuery,
} = usersApi;
