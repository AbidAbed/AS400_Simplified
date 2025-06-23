// --------------- DEPS

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// --------------- SLICES

import { fetchUser, UserSlice } from "./Slices/UserSlice";
import { ConfigSlice, changeIsLoggedIn } from "./Slices/ConfigSlice";

// --------------- APIS
import {
  usePostCheckTokenMutation,
  usePostLoginMutation,
  UserAPI,
} from "./APIs/UserAPIs";

// --------------- STORE CONFIGURATIONS
const storeInterface = configureStore({
  reducer: {
    user: UserSlice.reducer,
    config: ConfigSlice.reducer,
    [UserAPI.reducerPath]: UserAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserAPI.middleware),
});

setupListeners(storeInterface.dispatch);

export {
  storeInterface,
  fetchUser,
  usePostLoginMutation,
  usePostCheckTokenMutation,
  changeIsLoggedIn,
};
