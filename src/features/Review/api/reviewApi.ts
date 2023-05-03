import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareAuthHeaders } from "../../../common/utils/prepareAuthHeaders";

export interface IReview {
  id: string;
  author: string;
  title: string;
  recordTitle: string;
  theme: string;
  tags: { name: string }[];
  description: string;
  imgSrc: string;
  rating: { value: number; userId: string }[];
  date: string;
  messages: IMessage[];
}

export interface IMessage {
  sender: string;
  body: string;
  date: string;
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

    getReviewsAll: build.query<IReview[], void>({
      query() {
        return {
          url: `/reviews/recent`,
        };
      },
      providesTags: ["Review"],
    }),

    getReview: build.query<IReview, string>({
      query(id) {
        return {
          url: `/reviews/${id}`,
        };
      },
      providesTags: ["Review"],
    }),

    deleteReview: build.mutation<void, string>({
      query(id) {
        return {
          url: "/reviews",
          method: "DELETE",
          body: { id },
        };
      },
      invalidatesTags: ["Review"],
    }),

    addComment: build.mutation<
      void,
      { id?: string; sender?: string; body?: string }
    >({
      query(data) {
        return {
          url: `/reviews/message/${data.id}`,
          method: "POST",
          body: {
            sender: data.sender,
            body: data.body,
          },
        };
      },
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useGetReviewQuery,
  useDeleteReviewMutation,
  useAddCommentMutation,
  useGetReviewsAllQuery,
} = reviewApi;
