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
import ROUTER_NAMES from '@/constant/routerNames.ts'
import Deposit from './pages/Deposit.tsx'

const layoutFluid: RouteObject[] & BreadcrumbsRoute[] = [
  {
    element: <AppLayoutFluid />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTER_NAMES.TOP_UP,
            element: <Deposit />
          }
        ]
      },
      {
        path: ROUTER_NAMES.CONTACT,
        element: <Contact />
      },
      {
        path: ROUTER_NAMES.ABOUT,
        element: <About />
      },
      {
        path: ROUTER_NAMES.PROPERTY_DETAIL,
        element: <PropertyDetail />,
        breadcrumb: 'Chi tiết bài đăng'
      },
      {
        path: ROUTER_NAMES.LOGIN,
        element: <Login />,
        breadcrumb: 'Đăng nhập'
      },
      {
        path: ROUTER_NAMES.REGISTER,
        element: <Register />,
        breadcrumb: 'Đăng ký'
      },
      {
        path: ROUTER_NAMES.REQUEST_RESET_PASSWORD,
        element: <RequestResetPassword />,
        breadcrumb: 'Quên mật khẩu'
      },
      {
        path: ROUTER_NAMES.RESET_PASSWORD,
        element: <ResetPassword />,
        breadcrumb: 'Đặt lại mật khẩu'
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
        path: ROUTER_NAMES.HOME,
        element: <Home />,
        breadcrumb: 'Mogu'
      },
      {
        path: ROUTER_NAMES.RENT_HOUSE,
        element: <RentHouse />,
        breadcrumb: 'Tìm thuê'
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTER_NAMES.PROFILE,
            element: <ProfileLayout />,
            breadcrumb: 'Hồ sơ',
            children: [
              {
                element: <Profile />,
                index: true,
                breadcrumb: 'Hồ sơ'
              },
              {
                path: ROUTER_NAMES.CHANGE_PASSWORD,
                element: <ChangePassword />,
                breadcrumb: 'Đổi mật khẩu'
              },
              {
                path: ROUTER_NAMES.TRANSACTION_HISTORY,
                element: <TransactionHistory />,
                breadcrumb: 'Lịch sử giao dịch'
              },
              {
                path: ROUTER_NAMES.FAVORITE,
                element: <Favorite />,
                breadcrumb: 'Yêu thích'
              }
            ]
          }
        ] // End of ProfileLayout children
      },
      {
        path: ROUTER_NAMES.SERVER_ERROR,
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