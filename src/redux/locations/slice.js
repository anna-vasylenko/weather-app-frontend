import { createSlice } from "@reduxjs/toolkit";
import { handleFulFilled, handlePending, handleRejected } from "../handlers";
import { getLocationInfo, getLocations } from "./operations";

const initialState = {
  items: [],
  forecastLocation: null,
  isLoading: false,
  isError: null,
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    resetForecastLocation: (state) => {
      state.forecastLocation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocations.fulfilled, (state, action) => {
        state.items = action.payload.locations;
      })
      .addCase(getLocationInfo.fulfilled, (state, action) => {
        state.forecastLocation = action.payload;
      })
      .addMatcher(({ type }) => type.endsWith("pending"), handlePending)
      .addMatcher(({ type }) => type.endsWith("rejected"), handleRejected)
      .addMatcher(({ type }) => type.endsWith("fulfilled"), handleFulFilled);
  },
});

export const { resetForecastLocation } = locationsSlice.actions;
export const locationsReducer = locationsSlice.reducer;
