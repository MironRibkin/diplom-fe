import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/Auth/api/authApi";
import { usersApi } from "./features/Pages/Admin/api/usersApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, usersApi.middleware),
});
