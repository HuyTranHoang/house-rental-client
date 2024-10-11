import ROUTER_NAMES from '@/constant/routerNames.ts'
import AuthGuard from '@/features/auth/AuthGuard.tsx'
import { MemberFee } from '@/features/membership/MemberFee.tsx'
import PostProperty from '@/features/post-property/PostProperty.tsx'
import PropertyDetail from '@/features/property-detail/PropertyDetail.tsx'
import PaymentFailure from '@/features/recharge/PaymentFailed.tsx'
import PaymentSuccess from '@/features/recharge/PaymentSuccess.tsx'
import Recharge from '@/features/recharge/Recharge.tsx'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { BreadcrumbsRoute } from 'use-react-router-breadcrumbs'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import NotFound from './error/NotFound.tsx'
import ServerError from './error/ServerError.tsx'
import Login from './features/auth/Login.tsx'
import Register from './features/auth/Register.tsx'
import RequestResetPassword from './features/auth/RequestResetPassword.tsx'
import ResetPassword from './features/auth/ResetPassword.tsx'
import { SuccessUpgrade } from './features/membership/SuccessUpgrade.tsx'
import PostManagement from './features/post-management/PostManagement'
import ChangePassword from './features/profile/ChangePassword.tsx'
import Favorite from './features/profile/Favorite.tsx'
import Profile from './features/profile/Profile.tsx'
import TransactionHistory from './features/profile/TransactionHistory.tsx'
import RentHouse from './features/rent-house/RentHouse.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import AppLayout from './ui/AppLayout.tsx'
import AppLayoutFluid from './ui/AppLayoutFluid.tsx'
import ProfileLayout from './ui/ProfileLayout.tsx'

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
        breadcrumb: 'propertyDetail'
      },
      {
        path: ROUTER_NAMES.LOGIN,
        element: (
          <AuthGuard>
            <Login />
          </AuthGuard>
        )
      },
      {
        path: ROUTER_NAMES.REGISTER,
        element: (
          <AuthGuard>
            <Register />
          </AuthGuard>
        )
      },
      {
        path: ROUTER_NAMES.REQUEST_RESET_PASSWORD,
        element: (
          <AuthGuard>
            <RequestResetPassword />
          </AuthGuard>
        )
      },
      {
        path: ROUTER_NAMES.RESET_PASSWORD,
        element: (
          <AuthGuard>
            <ResetPassword />
          </AuthGuard>
        )
      },
      {
        path: ROUTER_NAMES.MEMBERSHIP_FEE,
        element: <MemberFee />
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
        element: <RentHouse />,
        breadcrumb: 'rentHouse',
        index: true
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTER_NAMES.PROFILE,
            element: <ProfileLayout />,
            children: [
              {
                element: <Profile />,
                index: true,
                breadcrumb: 'profile'
              },
              {
                path: ROUTER_NAMES.CHANGE_PASSWORD,
                element: <ChangePassword />,
                breadcrumb: 'changePassword'
              },
              {
                path: ROUTER_NAMES.TRANSACTION_HISTORY,
                element: <TransactionHistory />,
                breadcrumb: 'transactionHistory'
              },
              {
                path: ROUTER_NAMES.FAVORITE,
                element: <Favorite />,
                breadcrumb: 'favorite'
              }
            ]
          }
        ] // End of ProfileLayout children
      },
      {
        path: ROUTER_NAMES.SERVER_ERROR,
        element: <ServerError />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ] // End of AppLayout withSidebar={false} withFilter={false} children
  }
]

const router = createBrowserRouter(routerList)

export default router
