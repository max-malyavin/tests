import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UserService } from "@/api";
import {
  handleAsyncServerAppError,
  handleAsyncServerNetworkError,
} from "../../../utils/error-utils";

export const login = createAsyncThunk("user/login", async ({ email, password }, thunkAPI) => {
  try {
    const response = await UserService.login({ email, password });

    if (response.data.error) {
      return { data: { data: response.data.error } };
    } else {
      return { data: response.data };
    }
  } catch (error) {
    console.log(error);
  } finally {
    thunkAPI.dispatch(setUserLoading({ value: false }));
  }
});

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
  } catch (error) {
    console.log(error);
  } finally {
    thunkAPI.dispatch(setUserLoading({ value: false }));
  }
});

export const register = createAsyncThunk("user/register", async ({ email, password }, thunkAPI) => {
  try {
    const response = await UserService.register({ email, password });
    if (response.data.error) {
      return { data: { data: response.data.error } };
    } else {
      return { data: response.data };
    }
  } catch (error) {
    console.log(error);
  } finally {
    thunkAPI.dispatch(setUserLoading({ value: false }));
  }
});

export const asyncActions = {
  login,
  logout,
  register,
};

export const slice = createSlice({
  name: "user",
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {
    setUserLoading(state, action) {
      state.isLoading = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.data = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.data = action.payload.data;
      });
  },
});

export const UserReducer = slice.reducer;
export const { setUserLoading } = slice.actions;
