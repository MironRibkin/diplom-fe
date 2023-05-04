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

    editReview: build.mutation<
      void,
      { reviewId: string } & Pick<
        IReview,
        "title" | "recordTitle" | "description" | "imgSrc" | "theme"
      >
    >({
      query(review) {
        return {
          url: `/reviews/${review.reviewId}`,
          method: "POST",
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

    getHighestRatingReviews: build.query<IReview[], void>({
      query() {
        return {
          url: `/reviews/highest`,
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

    getAllReviews: build.query<IReview[], string>({
      query(search) {
        return {
          url: `/reviews/all?search=${search}`,
        };
      },
      providesTags: ["Review"],
      keepUnusedDataFor: 0,
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

    addRating: build.mutation<
      void,
      { reviewId: string; value: number | null; userId: string }
    >({
      query(data) {
        return {
          url: `/reviews/rating`,
          method: "POST",
          body: {
            reviewId: data.reviewId,
            value: data.value,
            userId: data.userId,
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
  useGetHighestRatingReviewsQuery,
  useAddRatingMutation,
  useEditReviewMutation,
  useGetAllReviewsQuery,
  useLazyGetAllReviewsQuery,
} = reviewApi;
