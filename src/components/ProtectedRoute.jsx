import { useSelector } from 'react-redux'
import { selectAuth } from '../features/auth/authSlice.js'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function ProtectedRoute({ children, location }) {
  const { isAuthenticated } = useSelector(selectAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
    }
  }, [isAuthenticated, location, navigate]);

  return children
}

export default ProtectedRoute
