import { createBrowserRouter, RouteObject } from 'react-router-dom'
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
import { BreadcrumbsRoute } from 'use-react-router-breadcrumbs'
import { HomeOutlined } from '@ant-design/icons'
import PropertyDetail from '@/features/property-detail/PropertyDetail.tsx'

const layoutFluid: RouteObject[] & BreadcrumbsRoute[] = [
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
      },
      {
        path: 'rent-house/:id',
        element: <PropertyDetail />,
        breadcrumb: 'Chi tiết bài đăng'
      }
    ] // End of AppLayoutFluid children
  }
]

export const routerList: RouteObject[] & BreadcrumbsRoute[] = [
  ...layoutFluid,
  {
    element: <AppLayout />,
    children: [
      {
        element: <Home />,
        index: true,
        breadcrumb: () => <span><HomeOutlined /> Mogu</span>
      },
      {
        path: '/',
        element: <Home />,
        breadcrumb: 'Mogu'
      },
      {
        path: '/rent-house',
        element: <RentHouse />,
        breadcrumb: 'Tìm thuê'
      },
      {
        path: 'login',
        element: <Login />,
        breadcrumb: 'Đăng nhập'
      },
      {
        path: 'register',
        element: <Register />,
        breadcrumb: 'Đăng ký'
      },
      {
        path: 'request-reset-password',
        element: <RequestResetPassword />,
        breadcrumb: 'Quên mật khẩu'
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
        breadcrumb: 'Đặt lại mật khẩu'
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'profile',
            element: <ProfileLayout />,
            breadcrumb: 'Hồ sơ',
            children: [
              {
                element: <Profile />,
                index: true,
                breadcrumb: 'Hồ sơ'
              },
              {
                path: 'change-password',
                element: <ChangePassword />,
                breadcrumb: 'Đổi mật khẩu'
              },
              {
                path: 'transaction-history',
                element: <TransactionHistory />,
                breadcrumb: 'Lịch sử giao dịch'
              },
              {
                path: 'favorite',
                element: <Favorite />,
                breadcrumb: 'Yêu thích'
              }
            ]
          }
        ] // End of ProfileLayout children
      },
      {
        path: 'server-error',
        element: <ServerError />,
        breadcrumb: 'Lỗi server'
      },
      {
        path: '*',
        element: <NotFound />,
        breadcrumb: 'Không tìm thấy'
      }
    ] // End of AppLayout withSidebar={false} withFilter={false} children
  }
]

const router = createBrowserRouter(routerList)

export default router