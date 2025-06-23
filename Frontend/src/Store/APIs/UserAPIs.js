import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log( process.env.REACT_APP_BASE_BACKEND_URL)
// ------------- API CONNECTER , /user
const UserAPI = createApi({
  reducerPath: "/user",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_BACKEND_URL }),
  endpoints(builder) {
    return {
      // ------------- LOGIN API /user/login
      postLogin: builder.mutation({
        query: (loginData) => {
          return {
            method: "POST",
            url: "/user/login",
            body: { ...loginData },
          };
        },
      }),
      postCheckToken: builder.mutation({
        query: (token) => {
          return {
            method: "POST",
            url: "/user/checktoken",
            headers: {
              token: token,
            },
          };
        },
      }),
    };
  },
});

// ------------- Extracting login api
const { usePostLoginMutation, usePostCheckTokenMutation } = UserAPI;

export { UserAPI, usePostLoginMutation, usePostCheckTokenMutation };
