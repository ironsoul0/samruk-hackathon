import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    open: false,
    pickedId: null,
  },
  reducers: {
    change: (state, action) => {
      state.open = action.payload;
      state.pickedId = null;
    },
    startEditMode: (state, action) => {
      state.open = true;
      state.pickedId = action.payload;
    },
  },
});

export const { change, startEditMode } = modalSlice.actions;

export default modalSlice.reducer;
