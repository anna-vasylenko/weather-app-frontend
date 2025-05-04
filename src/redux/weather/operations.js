import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { tosterCustomStyles } from "../../helpers/tosterCustomStyles";

// export const getLocations = createAsyncThunk(
//   "locations/getAll",
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await axios.get("/locations");

//       return data;
//     } catch (error) {
//       toast.error(
//         "Unable to load locations at the moment. Please try again later.",
//         tosterCustomStyles
//       );
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const getCurrentWeather = createAsyncThunk(
  "weather/getCurrentWeather",
  async ({ latitude, longitude }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude,
            longitude,
            current:
              "temperature_2m,relative_humidity_2m,precipitation,windspeed_10m,winddirection_10m,apparent_temperature,precipitation_probability",
          },
        }
      );

      toast.success("Дані про погоду успішно завантажені");
      return data.current;
    } catch (error) {
      toast.error(
        "Unable to load weather at the moment. Please try again later.",
        tosterCustomStyles
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
