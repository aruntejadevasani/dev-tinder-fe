import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addReequests: (state, action) => action.payload,
  },
});

export const { addReequests } = requestsSlice.actions;

export default requestsSlice.reducer;
