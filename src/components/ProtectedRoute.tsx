import { useSelector } from 'react-redux'
import { selectAuth } from '../features/auth/authSlice.ts'
import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  location: string
}

function ProtectedRoute({ children, location }: ProtectedRouteProps) {
  const { isAuthenticated } = useSelector(selectAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } })
    }
  }, [isAuthenticated, location, navigate])

  return children
}

export default ProtectedRoute
