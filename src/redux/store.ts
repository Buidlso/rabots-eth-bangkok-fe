import { configureStore } from "@reduxjs/toolkit";

import layoutReducer from "./features/user-slice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    layout: layoutReducer,
  },
});
