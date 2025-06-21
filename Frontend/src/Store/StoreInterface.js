// --------------- DEPS

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// --------------- SLICES

import { fetchUser, UserSlice } from "./Slices/UserSlice";
import { ConfigSlice } from "./Slices/ConfigSlice";

// --------------- APIS
import { usePostLoginMutation, UserAPI } from "./APIs/UserAPIs";

// --------------- STORE CONFIGURATIONS
const storeInterface = configureStore({
  reducer: { user: UserSlice.reducer, config: ConfigSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserAPI.middleware),
});

setupListeners(storeInterface.dispatch);

export { storeInterface, fetchUser, usePostLoginMutation };
