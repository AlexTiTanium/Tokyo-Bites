import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (body) => ({
        url: "/add-review",
        method: "POST",
        body,
      }),
    }),
    getReviews: builder.query({
      query: () => "/reviews",
    }),
  }),
});

export const { useAddReviewMutation, useGetReviewsQuery } = reviewsApi;
