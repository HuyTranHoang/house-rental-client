import { createSlice } from '@reduxjs/toolkit'
import { IRootState } from '@/store.ts'
import { User } from '@/models/user.type.ts'


interface IAuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

const initialState: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false
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
    loginFailure: (state) => {
      state.isLoading = false
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
    },
    updateProfile: (state, action) => {
      state.user = action.payload
    }
  }
})

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  updateProfile
} = authSlice.actions

export default authSlice.reducer

export const selectAuth = (state: IRootState) => state.auth