import ROUTER_NAMES from '@/constant/routerNames.ts'
import axios from 'axios'
import { toast } from 'sonner'

const axiosInstance = axios.create({
  withCredentials: true
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    switch (error.response?.status) {
      case 400:
        if (error.response?.data.message) {
          throw error.response?.data.message.split('; ').filter((message: string) => message !== '')
        }
        toast.error(error.response?.data.message)
        break
      case 401:
        window.location.href = ROUTER_NAMES.LOGIN
        break
      case 403:
        if (!originalRequest._retry) {
          originalRequest._retry = true
          try {
            const response = await axios.post('/api/auth/refresh-token', {}, { withCredentials: true })
            const newToken = response.headers['jwt-token']
            localStorage.setItem('jwtToken', newToken)
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`
            return axiosInstance(originalRequest)
          } catch (refreshError) {
            toast.error('Failed to refresh token')
            window.location.href = ROUTER_NAMES.LOGIN
          }
        } else {
          window.location.href = ROUTER_NAMES.LOGIN
        }
        break
      case 500:
        if (error.response.data.message === 'Bad credentials') {
          toast.error('Sai tài khoản hoặc mật khẩu')
          break
        }

        window.location.href = ROUTER_NAMES.SERVER_ERROR
        break
      default:
        if (error.code === 'ERR_NETWORK') {
          window.location.href = '/khong-tim-thay'
        } else {
          toast.error(error.message)
        }
        break
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
