import axios from 'axios'
import { toast } from 'sonner'
import ROUTER_NAMES from '@/constant/routerNames.ts'

const axiosInstance = axios.create({})

axiosInstance.defaults.withCredentials = true

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('jwtToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

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
        window.location.href = ROUTER_NAMES.LOGIN
        break
      case 403:
        if (error.response.data.message) {
          toast.error(error.response.data.message)
          break
        }
        break
      case 500:
        if (error.response.data.message === 'Bad credentials') {
          toast.error('Sai tài khoản hoặc mật khẩu')
          break
        }
        
        // if (error.response.data.message.contains('HmacSHA512')) {
        //   break
        // }

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
  })

export default axiosInstance