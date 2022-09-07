import { createSlice } from "@reduxjs/toolkit";

import { v4 as uuid } from "@lukeed/uuid";

interface PersistedUA {
  uuid: string;
  userAgent: string;
}
const init = () => {
  const ua = localStorage.getItem("userAgent");
  const newUA = {
    userAgent: navigator.userAgent,
    uuid: uuid(),
  };
  if (!ua) {
    return newUA;
  }
  try {
    return JSON.parse(ua) as PersistedUA;
  } catch {
    return newUA;
  }
};
const myUserAgentSlice = createSlice({
  name: "myUserAgent",
  initialState: () => init(),
  reducers: {
    //
  },
});

export default myUserAgentSlice.reducer;
