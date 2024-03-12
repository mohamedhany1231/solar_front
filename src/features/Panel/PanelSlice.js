import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "#123141411313",
  panelState: "active",
  temp: 25,
  humidity: 103,
  pressure: 25,
  power: 200,
  battery: 75,
};

const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    updateTemp(state, action) {
      state.temp = action.payload;
    },
  },
});

export const { updateTemp } = panelSlice.actions;
export default panelSlice.reducer;
