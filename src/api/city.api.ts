import { toast } from 'sonner'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { City } from '@/models/city.type.ts'

export const fetchAllCities = async () => {
  try {
    const response = await axiosInstance.get<City[]>('/api/city/all')
    return response.data
  } catch (error) {
    toast.error('Không thể lấy dữ liệu thành phố')
  }
}