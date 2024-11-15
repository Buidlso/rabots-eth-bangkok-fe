import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TWalletState = {
  walletBalance: any;
  txHash: any;
};

// states
const initialState: TWalletState = {
  walletBalance: undefined,
  txHash: undefined,
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
  },
});

export default walletSlice.reducer;
export const walletActions = walletSlice.actions;
