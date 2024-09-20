import ROUTER_NAMES from '@/constant/routerNames.ts'
import useAuthStore from '@/features/auth/authStore.ts'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.user !== null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTER_NAMES.LOGIN, { state: { from: location.pathname } })
    }
  }, [isAuthenticated, navigate, location.pathname])

  return isAuthenticated ? <Outlet /> : null
}

export default ProtectedRoute
