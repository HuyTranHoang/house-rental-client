import { toast } from 'sonner'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { District } from '@/models/district.type.ts'

export const fetchAllRoomTypes = async () => {
  try {
    const response = await axiosInstance.get<District[]>('/api/room-type/all')
    return response.data
  } catch (error) {
    toast.error('Không thể lấy dữ liệu loại phòng')
  }
}