import { createSlice } from "@reduxjs/toolkit";
import { handleFulFilled, handlePending, handleRejected } from "../handlers";
import { getCurrentWeather } from "./operations";

const initialState = {
  currentWeather: {},
  isLoading: false,
  isError: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentWeather.fulfilled, (state, action) => {
        state.currentWeather = action.payload;
      })
      .addMatcher(({ type }) => type.endsWith("pending"), handlePending)
      .addMatcher(({ type }) => type.endsWith("rejected"), handleRejected)
      .addMatcher(({ type }) => type.endsWith("fulfilled"), handleFulFilled);
  },
});

export const weatherReducer = weatherSlice.reducer;
