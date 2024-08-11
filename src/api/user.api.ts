import { toast } from 'sonner'
import axiosInstance from '@/inteceptor/axiosInstance.ts'

type updateProfileType = {
  lastName: string
  firstName: string
  phoneNumber: string
}

type changePasswordType = {
  oldPassword: string
  newPassword: string
}

export const updateUserProfileApi = async (values: updateProfileType) => {
  try {
    return await axiosInstance.put('/api/user/profile', values, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      }
    })
  } catch (error) {
    toast.error('Không thể cập nhật thông tin cá nhân')
  }
}

export const changePasswordApi = async (values: changePasswordType) => {
  try {
    return await axiosInstance.put('/api/user/change-password', values, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      }
    })
  } catch (error) {
    toast.error('Không thể thay đổi mật khẩu')
  }
}