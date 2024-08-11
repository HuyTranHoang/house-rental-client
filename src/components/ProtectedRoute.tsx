import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { selectAuth } from '@/features/auth/authSlice.ts'


function ProtectedRoute() {
  const { isAuthenticated } = useSelector(selectAuth)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } })
    }
  }, [isAuthenticated, navigate, location.pathname])

  return isAuthenticated ? <Outlet /> : null
}

export default ProtectedRoute
