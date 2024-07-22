import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
    },
    loginFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
    }
  }
})

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer

export const selectAuth = (state) => state.auth