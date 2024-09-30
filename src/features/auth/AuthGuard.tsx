import CustomIndicator from '@/components/CustomIndicator'
import ROUTER_NAMES from '@/constant/routerNames'
import useAuthStore from '@/store/authStore.ts'
import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

type AuthGuardProps = {
  children: ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const location = useLocation()
  const isAuthenticated = useAuthStore((state) => state.user !== null)

  const { isLoading } = useQuery({
    queryKey: ['authStatus'],
    queryFn: async () => {
      // Implement your auth check logic here
      // For example, verify the token with the server
      const token = localStorage.getItem('jwtToken')
      if (!token) return false
      // Verify token with server
      // Return true if valid, false otherwise
      return true
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
  })

  if (isLoading) {
    return <CustomIndicator />
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTER_NAMES.RENT_HOUSE} state={{ from: location }} replace />
  }

  return children
}
