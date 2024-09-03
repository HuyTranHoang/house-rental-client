import { toast } from 'sonner'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { User } from '@/models/user.type'

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
    return await axiosInstance.put<User>('/api/user/profile', values)
  } catch (error) {
    toast.error('Không thể cập nhật thông tin cá nhân')
  }
}

export const changePasswordApi = async (values: changePasswordType) => {
  return await axiosInstance.put<User>('/api/user/change-password', values)
}

export const getUserById = async (id: number) => {
  try {
    const response = await axiosInstance.get<User>(`/api/user/${id}`)
    return response.data
  } catch (error) {
    toast.error('Không thể lấy thông tin người dùng')
  }
}
