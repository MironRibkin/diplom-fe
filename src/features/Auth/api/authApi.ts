import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../Admin/types/users";
import { ILoginForm } from "../components/Login";
// import { IRegistrationForm } from "../components/Registration";
//
// interface ICreateUserApiResponse {
//   items: IUser[];
// }
//
// interface ILoginApiResponse {
//   token: string;
//   record: IUser;
// }
//
// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${import.meta.env.VITE_BACKEND_URL}/`,
//   }),
//   endpoints: (builder) => ({
//     login: builder.mutation<ILoginApiResponse, ILoginForm>({
//       query: (payload) => {
//         return {
//           url: "login",
//           method: "POST",
//           body: payload,
//         };
//       },
//     }),
//     createUser: builder.mutation<ICreateUserApiResponse, IRegistrationForm>({
//       query: (payload: IRegistrationForm) => {
//         return {
//           url: "registration",
//           method: "POST",
//           body: {
//             ...payload,
//             passwordConfirm: payload.password,
//           },
//         };
//       },
//     }),
//   }),
// });

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
