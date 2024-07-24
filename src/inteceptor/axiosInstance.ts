import axios from 'axios'
import { toast } from 'sonner'

const axiosInstance = axios.create({})

axiosInstance.defaults.withCredentials = true

axiosInstance.interceptors.response.use(response => response,
  error => {
    switch (error.response?.status) {
      case 400:
        if (error.response?.data.message) {
          throw error.response?.data.message.split('; ').filter((message: string) => message !== '')
        }
        toast.error(error.response?.data.message)
        break
      case 401:
        window.location.href = '/login'
        break
      case 500:
        if (error.response.data.message === 'Bad credentials') {
          toast.error('Sai tài khoản hoặc mật khẩu')
          break
        }
        if (error.response.data.message.contains('HmacSHA512')) {
          break
        }

        window.location.href = '/server-error'
        break
      default:
        if (error.code === 'ERR_NETWORK') {
          window.location.href = '/not-found'
        } else {
          toast.error(error.message)
        }
        break
    }

    return Promise.reject(error)
  })

export default axiosInstance