import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { Favorite } from '@/models/favorite.type.ts'
import { toast } from 'sonner'

export const getFavoritesByUserId = async (userId: number) => {
  try {
    const response = await axiosInstance.get<Favorite[]>(`/api/favorite/${userId}/user`)
    return response.data
  } catch (error) {
    console.error(error)
    toast.error('Lỗi khi lấy danh sách yêu thích')
  }
}

export const addFavorite = async (propertyId: number) => {
  try {
    const response = await axiosInstance.post<Favorite>('/api/favorite', { propertyId })
    return response.data
  } catch (error) {
    console.error(error)
    toast.error('Lỗi khi thêm yêu thích')
  }
}

export const removeFavorite = async ({ propertyId, userId }: { propertyId: number; userId: number }) => {
  try {
    const response = await axiosInstance.delete(`/api/favorite/${userId}/${propertyId}`)
    return response.data
  } catch (error) {
    console.error(error)
    toast.error('Lỗi khi xóa yêu thích')
  }
}
