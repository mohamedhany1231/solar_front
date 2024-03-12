import { configureStore } from "@reduxjs/toolkit";
import panelReducer from "./features/Panel/PanelSlice";

const store = configureStore({
  reducer: {
    panel: panelReducer,
  },
});

export default store;
