import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { tosterCustomStyles } from "../../helpers/tosterCustomStyles";

export const getObservations = createAsyncThunk(
  "observations/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/observations");

      return data;
    } catch (error) {
      toast.error(
        "Unable to load observations at the moment. Please try again later.",
        tosterCustomStyles
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addObservation = createAsyncThunk(
  "observations/addObservation",
  async (observation, thunkAPI) => {
    try {
      const { data } = await axios.post("/observations", observation);
      return data.data;
    } catch (error) {
      toast.error(
        "Unable to load observations at the moment. Please try again later.",
        tosterCustomStyles
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
