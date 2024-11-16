import { configureStore } from "@reduxjs/toolkit";

import layoutReducer from "./features/user-slice";
import walletReducer from "./features/wallet-slice";
import userReducer from "./features/user-slice";
import rabotsReducer from "./features/rabots-slice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    layout: layoutReducer,
    wallet: walletReducer,
    user: userReducer,
    rabots: rabotsReducer,
  },
});
