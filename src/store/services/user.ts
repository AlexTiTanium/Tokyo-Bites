import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type User = {
  name: string;
  phone: string;
  address: string;
};

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getUserByID: builder.query<User, string>({
      query: (id) => `user/${id}`,
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `/users/`,
        // When performing a mutation, you typically use a method of
        // PATCH/PUT/POST/DELETE for REST endpoints
        method: "POST",
        // fetchBaseQuery automatically adds `content-type: application/json` to
        // the Headers and calls `JSON.stringify(patch)`
        body,
      }),
    }),
  }),
});

export const { useGetUserByIDQuery, useCreateUserMutation } = userApi;
