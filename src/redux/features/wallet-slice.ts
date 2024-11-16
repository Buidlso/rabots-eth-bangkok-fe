import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TWalletState = {
  walletBalance: any;
  txHash: any;
  walletScreen: "BALANCE" | "FUND";
};

// states
const initialState: TWalletState = {
  walletBalance: undefined,
  txHash: undefined,
  walletScreen: "BALANCE",
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet(state, action: PayloadAction<any>) {
      state.walletBalance = action.payload;
    },
    setTransactionHash(state, action: PayloadAction<any>) {
      state.txHash = action.payload;
    },
    setWalletScreen(state, action: PayloadAction<"BALANCE" | "FUND">) {
      state.walletScreen = action.payload;
    },
  },
});
export default walletSlice.reducer;
export const walletActions = walletSlice.actions;
