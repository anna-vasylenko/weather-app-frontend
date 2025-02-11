import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { tosterCustomStyles } from "../../helpers/tosterCustomStyles";

export const getLocations = createAsyncThunk(
  "locations/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/locations");

      return data;
    } catch (error) {
      toast.error(
        "Unable to load locations at the moment. Please try again later.",
        tosterCustomStyles
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getLocation = createAsyncThunk(
  "locations/getLocation",
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await axios.get(`/locations/${id}`);
      toast.success(`Дані про локацію ${data.data.name} успішно завантажені`);
      return data.data;
    } catch (error) {
      toast.error(
        "Unable to load location at the moment. Please try again later.",
        tosterCustomStyles
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
