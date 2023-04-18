import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../Admin/types/users";

interface IAuthRecord {
  status: boolean;
}

interface ILoginApiResponse {
  token: string;
  record: IAuthRecord;
}

export interface IRegistrationApi {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  avatarSrc: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (build) => ({
    login: build.mutation<
      ILoginApiResponse,
      { email: string; password: string }
    >({
      query(data) {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
    createUser: build.mutation<void, IRegistrationApi>({
      query(data) {
        return {
          url: "/auth/registration",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useCreateUserMutation } = authApi;
