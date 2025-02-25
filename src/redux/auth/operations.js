import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { tosterCustomStyles } from "../../helpers/tosterCustomStyles";

axios.defaults.baseURL = "https://weather-app-backend-05j6.onrender.com";

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

      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      setAuthHeader(data.data.accessToken);
      return data.data;
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

      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      setAuthHeader(data.data.accessToken);
      return data.data;
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
    const refreshToken = localStorage.getItem("refreshToken");

    if (!persistedToken || !refreshToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      const { data } = await axios.post("/auth/refresh", { refreshToken });

      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      setAuthHeader(data.data.accessToken);
      return data.data;
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
