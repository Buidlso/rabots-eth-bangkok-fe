import { TGetBotResDto, TListBotsResDto } from "@/server/dtos/rabot.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TRabotsState = {
  rabots: TListBotsResDto;
  rabot: TGetBotResDto | undefined;
};

// states
const initialState: TRabotsState = {
  rabots: [],
  rabot: undefined,
};

const rabotsSlice = createSlice({
  name: "rabots",
  initialState,
  reducers: {
    setRabots(state, action: PayloadAction<any[]>) {
      state.rabots = action.payload;
    },
    setRabot(state, action: PayloadAction<any>) {
      state.rabot = action.payload;
    },
  },
});

export default rabotsSlice.reducer;
export const rabotsActions = rabotsSlice.actions;
