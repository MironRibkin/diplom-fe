import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginForm } from "../components/Login";
import { IRegistrationForm } from "../components/Registration";
import { IUser } from "../../Users/types/users";

interface ICreateUserApiResponse {
  items: IUser[];
}

interface ILoginApiResponse {
  token: string;
  record: IUser;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginApiResponse, ILoginForm>({
      query: (payload) => {
        return {
          url: "login",
          method: "POST",
          body: payload,
        };
      },
    }),
    createUser: builder.mutation<ICreateUserApiResponse, IRegistrationForm>({
      query: (payload: IRegistrationForm) => {
        return {
          url: "register",
          method: "POST",
          body: {
            ...payload,
            passwordConfirm: payload.password,
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation, useCreateUserMutation } = authApi;
