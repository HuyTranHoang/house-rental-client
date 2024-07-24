import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import authReducer from './features/auth/authSlice.ts'
import profileReducer from './features/profile/profileSlice.ts'

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer
  }
})

export default store
export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()