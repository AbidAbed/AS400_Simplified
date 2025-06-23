import { createSlice } from "@reduxjs/toolkit";

const ConfigSlice = createSlice({
  name: "config",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    changeIsLoggedIn(state, action) {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    },
  },
});

const { changeIsLoggedIn } = ConfigSlice.actions;
export { ConfigSlice, changeIsLoggedIn };
