import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { tosterCustomStyles } from "../../helpers/tosterCustomStyles";

axios.defaults.baseURL = "https://weather-app-backend-h6em.onrender.com";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/register", credentials);
      return data;
    } catch (error) {
      const status = error.response?.status;
      switch (status) {
        case 409:
          toast.error(
            "This email is already in use. Please use another one.",
            tosterCustomStyles
          );
          break;
        case 500:
          toast.error(
            "Server error. Please try again later.",
            tosterCustomStyles
          );
          break;
        default:
          toast.error("Something went wrong!", tosterCustomStyles);
          break;
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/login", credentials);
      setAuthHeader(data.accessToken);
      return data;
    } catch (error) {
      const status = error.response?.status;
      switch (status) {
        case 401:
          toast.error(
            "Incorrect email or password. Please try again.",
            tosterCustomStyles
          );
          break;
        case 403:
          toast.error(
            "Access forbidden. Please check your account permissions.",
            tosterCustomStyles
          );
          break;
        case 404:
          toast.error(
            "User not found. Please register first.",
            tosterCustomStyles
          );
          break;
        case 500:
          toast.error(
            "Server error. Please try again later.",
            tosterCustomStyles
          );
          break;
        default:
          toast.error("Something went wrong!", tosterCustomStyles);
          break;
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const { data } = await axios.get("/auth/refresh");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.delete("/auth/logout");
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
