import { configureStore } from "@reduxjs/toolkit";

import layoutReducer from "./features/user-slice";
import walletReducer from "./features/wallet-slice";
import userReducer from "./features/user-slice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    layout: layoutReducer,
    wallet: walletReducer,
    user: userReducer,
  },
});
