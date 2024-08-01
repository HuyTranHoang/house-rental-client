import { useEffect, useState } from 'react'
import './App.css'
import { useAppDispatch } from './store.ts'
import axiosInstance from './inteceptor/axiosInstance.ts'
import { loginFailure, loginSuccess } from './features/auth/authSlice.ts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import AppLayout from './ui/AppLayout.tsx'
import Login from './features/auth/Login.tsx'
import Spinner from './components/Spinner.tsx'
import Register from './features/auth/Register.tsx'
import ProfileLayout from './ui/ProfileLayout.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Profile from './features/profile/Profile.tsx'
import ChangePassword from './features/profile/ChangePassword.tsx'
import TransactionHistory from './features/profile/TransactionHistory.tsx'
import Favorite from './features/profile/Favorite.tsx'
import Home from './pages/Home.tsx'
import Contact from './pages/Contact.tsx'
import ServerError from './error/ServerError.tsx'
import NotFound from './error/NotFound.tsx'
import RentHouse from './features/rent-house/RentHouse.tsx'
import RequestResetPassword from './features/auth/RequestResetPassword.tsx'
import ResetPassword from './features/auth/ResetPassword.tsx'
import AppLayoutFluid from './ui/AppLayoutFluid.tsx'

function App() {
  const dispatch = useAppDispatch()
  const [spinning, setSpinning] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      axiosInstance.get('/api/auth/refresh-token', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        console.log('>>>APP.JSX', response)
        const payload = {
          user: response.data,
          token: response.headers['jwt-token']
        }
        dispatch(loginSuccess(payload))
      }).catch(error => {
        console.log('>>>APP.JSX', error)
        dispatch(loginFailure(error))
        localStorage.removeItem('jwtToken')
      }).finally(() => {
        setTimeout(() => {
          setSpinning(false)
        }, 500)
      })
    } else {
      setTimeout(() => {
        setSpinning(false)
      }, 500)
    }

    console.log('>>>APP.JSX', 'App is mounted')
  }, [dispatch])

  if (spinning) {
    return <Spinner spinning={spinning} />
  }

  return (
    <BrowserRouter>
      <Toaster richColors={true} position="bottom-center" />
      <Routes>
        <Route element={<AppLayout withSidebar withFilter/>}>
          <Route path="rent-house" element={<RentHouse />} />
        </Route>

        <Route element={<AppLayout withSidebar withFilter={false}/>}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<div>About</div>} />
        </Route>

        <Route element={<AppLayoutFluid/>}>
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route element={<AppLayout withSidebar={false}  withFilter={false}/>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="request-reset-password" element={<RequestResetPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<ProtectedRoute location="/profile"><Profile /></ProtectedRoute>} />
            <Route path="change-password"
                   element={<ProtectedRoute location="/profile/change-password"><ChangePassword /></ProtectedRoute>} />
            <Route path="transaction-history"
                   element={<ProtectedRoute
                     location="/profile/transaction-history"><TransactionHistory /></ProtectedRoute>} />
            <Route path="favorite"
                   element={<ProtectedRoute location="/profile/favorite"><Favorite /></ProtectedRoute>} />
          </Route>
          <Route path="server-error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App

