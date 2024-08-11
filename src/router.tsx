import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './ui/AppLayout.tsx'
import RentHouse from './features/rent-house/RentHouse.tsx'
import Home from './pages/Home.tsx'
import AppLayoutFluid from './ui/AppLayoutFluid.tsx'
import Contact from './pages/Contact.tsx'
import About from './pages/About.tsx'
import Login from './features/auth/Login.tsx'
import Register from './features/auth/Register.tsx'
import RequestResetPassword from './features/auth/RequestResetPassword.tsx'
import ResetPassword from './features/auth/ResetPassword.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import ProfileLayout from './ui/ProfileLayout.tsx'
import Profile from './features/profile/Profile.tsx'
import ChangePassword from './features/profile/ChangePassword.tsx'
import TransactionHistory from './features/profile/TransactionHistory.tsx'
import Favorite from './features/profile/Favorite.tsx'
import ServerError from './error/ServerError.tsx'
import NotFound from './error/NotFound.tsx'

const layoutFluid = [
  {
    element: <AppLayoutFluid />,
    children: [
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'about',
        element: <About />
      }
    ] // End of AppLayoutFluid children
  }
]

const router = createBrowserRouter([
  ...layoutFluid,
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        index: true
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: '/rent-house',
        element: <RentHouse />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'request-reset-password',
        element: <RequestResetPassword />
      },
      {
        path: 'reset-password',
        element: <ResetPassword />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'profile',
            element: <ProfileLayout />,
            children: [
              {
                element: <Profile />,
                index: true
              },
              {
                path: 'change-password',
                element: <ChangePassword />
              },
              {
                path: 'transaction-history',
                element: <TransactionHistory />
              },
              {
                path: 'favorite',
                element: <Favorite />
              }
            ]
          }
        ] // End of ProfileLayout children
      },
      {
        path: 'server-error',
        element: <ServerError />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ] // End of AppLayout withSidebar={false} withFilter={false} children
  }
])

export default router