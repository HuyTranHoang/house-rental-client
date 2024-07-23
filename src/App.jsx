import AppLayout from './ui/AppLayout.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import Login from './features/auth/Login.jsx'
import Register from './features/auth/Register.jsx'
import { Toaster } from 'sonner'
import NotFound from './error/NotFound.jsx'
import Profile from './features/profile/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axiosInstance from './interceptor/axiosInstance.js'
import { loginFailure, loginSuccess } from './features/auth/authSlice.js'
import ServerError from './error/ServerError.jsx'
import { Spin } from 'antd'
import Spinner from './components/Spinner.jsx'
import ProfileLayout from './ui/ProfileLayout.jsx'
import ChangePassword from './features/profile/ChangePassword.jsx'
import TransactionHistory from './features/profile/TransactionHistory.jsx'
import Favorite from './features/profile/Favorite.jsx'


function App() {
  const dispatch = useDispatch()
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
      <Toaster richColors={true} />
      <Routes>
        <Route element={<AppLayout withSidebar={false} />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<ProtectedRoute location="/profile"><Profile /></ProtectedRoute>} />
            <Route path="change-password"
                   element={<ProtectedRoute location="/profile/change-password"><ChangePassword /></ProtectedRoute>} />
            <Route path="transaction-history"
                   element={<ProtectedRoute location="/profile/transaction-history"><TransactionHistory /></ProtectedRoute>} />
            <Route path="favorite"
                   element={<ProtectedRoute location="/profile/favorite"><Favorite /></ProtectedRoute>} />
          </Route>
        </Route>

        <Route element={<AppLayout withSidebar={true} />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<div>About</div>} />
          <Route path="server-error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
