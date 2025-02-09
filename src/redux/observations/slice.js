import { createSlice } from "@reduxjs/toolkit";
import { handleFulFilled, handlePending, handleRejected } from "../handlers";
import { addObservation, getObservations } from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
};

const observationsSlice = createSlice({
  name: "observations",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getObservations.fulfilled, (state, action) => {
        state.items = action.payload.observations;
      })
      .addCase(addObservation.fulfilled, (state, action) => {
        console.log(action.payload);

        state.items.push(action.payload);
      })
      .addMatcher(({ type }) => type.endsWith("pending"), handlePending)
      .addMatcher(({ type }) => type.endsWith("rejected"), handleRejected)
      .addMatcher(({ type }) => type.endsWith("fulfilled"), handleFulFilled);
  },
});

export const observationsReducer = observationsSlice.reducer;
