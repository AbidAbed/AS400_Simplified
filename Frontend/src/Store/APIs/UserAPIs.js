import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ------------- API CONNECTER , /user
const UserAPI = createApi({
  reducerPath: "/user",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
  endpoints(builder) {
    return {
      // ------------- LOGIN API /user/login
      postLogin: builder.mutation({
        query: (loginData) => {
          return {
            method: "POST",
            url: "/login",
            body: { ...loginData },
          };
        },
      }),
    };
  },
});

// ------------- Extracting login api
const { usePostLoginMutation } = UserAPI;

export { UserAPI, usePostLoginMutation };
