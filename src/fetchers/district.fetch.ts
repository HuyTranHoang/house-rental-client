import axiosInstance from '../inteceptor/axiosInstance.ts'
import { District } from '../models/district.type.ts'
import { toast } from 'sonner'

export const fetchAllDistricts = async () => {
  try {
    const response = await axiosInstance.get<District[]>('/api/district/all')
    return response.data
  } catch (error) {
    toast.error('Không thể lấy dữ liệu quận huyện')
  }
}