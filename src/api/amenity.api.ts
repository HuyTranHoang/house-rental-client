import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { Amenity } from '@/types/amenity.type.ts'
import { toast } from 'sonner'

export const fetchAllAmenities = async () => {
  try {
    const response = await axiosInstance.get<Amenity[]>('/api/amenity/all')
    return response.data
  } catch (error) {
    toast.error('Không thể lấy dữ liệu tiện nghi')
  }
}
