import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDeviceView } from "src/shared/types";

import parser from "ua-parser-js";
const r = parser(navigator.userAgent);

const clipboardSlice = createSlice({
  name: "clipboardSlice",
  initialState: {
    editingMessage: "",
    browserList: [] as IDeviceView[],
    currDocKey: `${r.os.name ?? "Unknown"} ${r.browser.name ?? "Unknown"}`,
    dropDown: false,
    me: `${r.os.name ?? "Unknown"} ${r.browser.name ?? "Unknown"}`,
    browserDocument: {
      docKey: `${r.os.name ?? "Unknown"} ${r.browser.name ?? "Unknown"}`,
      osName: r.os.name ?? "Unknown",
      osVersion: r.os.version ?? "0",
      browserName: r.browser.name ?? "Unknown",
      browserVersion: r.browser.version ?? "0",
    },
  },
  reducers: {
    setEditingMessage(state, { payload }: PayloadAction<string>) {
      state.editingMessage = payload;
    },
    setBrowserList(state, { payload }: PayloadAction<IDeviceView[]>) {
      state.browserList = payload;
    },
    setCurrent(state, { payload }: PayloadAction<string>) {
      state.currDocKey = payload;
      state.dropDown = false;
    },
    toggleDropDown(state) {
      state.dropDown = !state.dropDown;
    },
  },
});

export const { setEditingMessage, setBrowserList, setCurrent, toggleDropDown } =
  clipboardSlice.actions;
export default clipboardSlice.reducer;
