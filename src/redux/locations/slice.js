import { createSlice } from "@reduxjs/toolkit";
import { handleFulFilled, handlePending, handleRejected } from "../handlers";
import { getLocations } from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLocations.fulfilled, (state, action) => {
        state.items = action.payload.locations;
      })
      .addMatcher(({ type }) => type.endsWith("pending"), handlePending)
      .addMatcher(({ type }) => type.endsWith("rejected"), handleRejected)
      .addMatcher(({ type }) => type.endsWith("fulfilled"), handleFulFilled);
  },
});

export const locationsReducer = locationsSlice.reducer;
