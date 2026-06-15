import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id?: number;
  username?: string;
  email?: string;
  role?: string;
}

interface AuthState {
  otpToken: string | null;
  otpExpiredAt: number | null;
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  otpToken: null,
  otpExpiredAt: null,
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    // SIMPAN DATA SAAT LOGIN AWAL
    setOtpData: (
      state,
      action: PayloadAction<{
        otpToken: string;
        otpExpiredAt: number;
        user: User;
      }>
    ) => {
      state.otpToken = action.payload.otpToken;
      state.otpExpiredAt = action.payload.otpExpiredAt;
      state.user = action.payload.user;
    },

    // SIMPAN TOKEN SAAT OTP BERHASIL
    setAuthData: (
      state,
      action: PayloadAction<{
        token: string;
        user: User;
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.otpToken = null;
      state.otpExpiredAt = null;
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setOtpData,
  setAuthData,
  logout,
} = authSlice.actions;

export default authSlice.reducer;