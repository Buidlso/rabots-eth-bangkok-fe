import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TRabotsState = {
  rabotsBalance: any;
};

// states
const initialState: TRabotsState = {
  rabotsBalance: undefined,
};

const rabotsSlice = createSlice({
  name: "rabots",
  initialState,
  reducers: {
    setRabots(state, action: PayloadAction<any>) {
      state.rabotsBalance = action.payload;
    },
  },
});

export default rabotsSlice.reducer;
export const rabotsActions = rabotsSlice.actions;
