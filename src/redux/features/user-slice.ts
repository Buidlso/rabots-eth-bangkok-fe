import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUserState = {
  user: any;
};

// states
const initialState: TUserState = {
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
