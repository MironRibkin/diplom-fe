import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./features/Admin/api/usersApi";
import { authApi } from "./features/Auth/api/authApi";
import { reviewApi } from "./features/Review/api/reviewApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      reviewApi.middleware
    ),
});
