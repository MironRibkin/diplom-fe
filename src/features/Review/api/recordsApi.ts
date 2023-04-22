import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareAuthHeaders } from "../../../common/utils/prepareAuthHeaders";

export interface IReview {
  id: string;
  title: string;
  recordTitle: string;
  theme: string;
  tags: { name: string }[];
  description: string;
  imgSrc: string;
  rating: { value: number; userId: string }[];
  date: string;
  messages: { sender: string; receiver: string; body: string; date: string }[];
}

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/`,
    prepareHeaders: prepareAuthHeaders,
  }),
  tagTypes: ["Review"],
  endpoints: (build) => ({
    createReview: build.mutation<
      void,
      Pick<
        IReview,
        | "title"
        | "recordTitle"
        | "description"
        | "imgSrc"
        | "theme"
        | "tags"
        | "rating"
      >
    >({
      query(review) {
        return {
          url: "/reviews",
          method: "PUT",
          body: review,
        };
      },
      invalidatesTags: ["Review"],
    }),

    getReviews: build.query<IReview[], string>({
      query(userId) {
        return {
          url: `/reviews/user/${userId}`,
        };
      },
      providesTags: ["Review"],
    }),

    // getCollection: build.query<IReview, string>({
    //   query(id) {
    //     return {
    //       url: `/reviews/one/${id}`,
    //     };
    //   },
    //   providesTags: ["Review"],
    // }),

    // deleteCollection: build.mutation<void, string>({
    //   query(id) {
    //     return {
    //       url: "/records",
    //       method: "DELETE",
    //       body: { id },
    //     };
    //   },
    //   invalidatesTags: ["Record"],
    // }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsQuery } = reviewApi;
