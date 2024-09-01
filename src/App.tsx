import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import './App.css'
import { loginFailure, loginSuccess } from './features/auth/authSlice.ts'
import axiosInstance from './inteceptor/axiosInstance.ts'
import { useAppDispatch } from './store.ts'

import CustomIndicator from '@/components/CustomIndicator.tsx'
import { Spin } from 'antd'
import router from './router.tsx'

import { User } from '@/models/user.type.ts'

function App() {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const refresh = async () => {
      try {
        const response = await axiosInstance.post<User>('/api/auth/refresh-token', {}, { withCredentials: true })
        const user = response.data
        const newJwtToken = response.headers['jwt-token']

        localStorage.setItem('jwtToken', newJwtToken)
        dispatch(loginSuccess({ user, token: newJwtToken }))
      } catch (error) {
        console.error('Refresh token failed:', error)
        dispatch(loginFailure())
        localStorage.removeItem('jwtToken')
      } finally {
        setIsLoading(false)
      }
    }

    refresh().then(() => console.log('>>>APP.JSX', 'App is mounted'))
  }, [dispatch])

  if (isLoading) {
    return <Spin indicator={<CustomIndicator />} tip={'Đang tải dữ liệu...Vui lòng đợi trong giây lát!!!'} fullscreen />
  }

  return (
    <>
      <Toaster richColors={true} position='bottom-center' />
      <RouterProvider router={router} />
    </>
  )
}

export default App
