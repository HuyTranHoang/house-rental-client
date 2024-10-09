import ROUTER_NAMES from '@/constant/routerNames.ts'
import AuthGuard from '@/features/auth/AuthGuard.tsx'
import { MemberFee } from '@/features/membership/MemberFee.tsx'
import PostProperty from '@/features/post-property/PostProperty.tsx'
import PropertyDetail from '@/features/property-detail/PropertyDetail.tsx'
import PaymentFailure from '@/features/Recharge/PaymentFailed.tsx'
import { HomeOutlined } from '@ant-design/icons'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { BreadcrumbsRoute } from 'use-react-router-breadcrumbs'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import NotFound from './error/NotFound.tsx'
import ServerError from './error/ServerError.tsx'
import Login from './features/auth/Login.tsx'
import Register from './features/auth/Register.tsx'
import RequestResetPassword from './features/auth/RequestResetPassword.tsx'
import ResetPassword from './features/auth/ResetPassword.tsx'
import PostManagement from './features/post-management/PostManagement'
import ChangePassword from './features/profile/ChangePassword.tsx'
import Favorite from './features/profile/Favorite.tsx'
import Profile from './features/profile/Profile.tsx'
import TransactionHistory from './features/profile/TransactionHistory.tsx'
import RentHouse from './features/rent-house/RentHouse.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import Recharge from './features/Recharge/Recharge.tsx'
import PaymentSuccess from './features/Recharge/PaymentSuccess.tsx'
import AppLayout from './ui/AppLayout.tsx'
import AppLayoutFluid from './ui/AppLayoutFluid.tsx'
import ProfileLayout from './ui/ProfileLayout.tsx'
import { PropertyDetailBreadcrumb } from '@/utils/breadcrumbFormat.tsx'
import { SuccessUpgrade } from './features/membership/SuccessUpgrade.tsx'

const layoutFluid: RouteObject[] & BreadcrumbsRoute[] = [
  {
    element: <AppLayoutFluid />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTER_NAMES.RECHARGE,
            element: <Recharge />
          },
          {
            path: ROUTER_NAMES.PAYMENT_SUCCESS,
            element: <PaymentSuccess />
          },
          {
            path: ROUTER_NAMES.SUCCESS_UPGRADE,
            element: <SuccessUpgrade />
          },
          {
            path: ROUTER_NAMES.PAYMENT_FAILED,
            element: <PaymentFailure />
          },
          {
            path: ROUTER_NAMES.POST_PROPERTY,
            element: <PostProperty />
          },
          {
            path: ROUTER_NAMES.POST_MANAGEMENT,
            element: <PostManagement />
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
        breadcrumb: PropertyDetailBreadcrumb
      },
      {
        path: ROUTER_NAMES.LOGIN,
        element: (
          <AuthGuard>
            <Login />
          </AuthGuard>
        ),
        breadcrumb: 'Đăng nhập'
      },
      {
        path: ROUTER_NAMES.REGISTER,
        element: (
          <AuthGuard>
            <Register />
          </AuthGuard>
        ),
        breadcrumb: 'Đăng ký'
      },
      {
        path: ROUTER_NAMES.REQUEST_RESET_PASSWORD,
        element: (
          <AuthGuard>
            <RequestResetPassword />
          </AuthGuard>
        ),
        breadcrumb: 'Quên mật khẩu'
      },
      {
        path: ROUTER_NAMES.RESET_PASSWORD,
        element: (
          <AuthGuard>
            <ResetPassword />
          </AuthGuard>
        ),
        breadcrumb: 'Đặt lại mật khẩu'
      },
      {
        path: ROUTER_NAMES.MEMBERSHIP_FEE,
        element: <MemberFee />
      },
    ] // End of AppLayoutFluid children
  }
]

export const routerList: RouteObject[] & BreadcrumbsRoute[] = [
  ...layoutFluid,
  {
    element: <AppLayout />,
    children: [
      {
        element: <RentHouse />,
        index: true,
        breadcrumb: () => (
          <span>
            <HomeOutlined /> Mogu
          </span>
        )
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
