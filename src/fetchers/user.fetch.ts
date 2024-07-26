import axiosInstance from '../inteceptor/axiosInstance.ts'
import { toast } from 'sonner'

type updateProfileType = {
  lastName: string
  firstName: string
  phoneNumber: string
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