import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const clipboardSlice = createSlice({
  name: "clipboardSlice",
  initialState: {
    editingMessage: "",
  },
  reducers: {
    setEditingMessage(state, { payload }: PayloadAction<string>) {
      state.editingMessage = payload;
    },
  },
});

export const { setEditingMessage } = clipboardSlice.actions;
export default clipboardSlice.reducer;
