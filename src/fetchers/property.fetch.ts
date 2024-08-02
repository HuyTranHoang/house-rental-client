import axiosInstance from '../inteceptor/axiosInstance.ts'
import { toast } from 'sonner'
import { Property } from '../models/property.type.ts'
import { PageInfo } from '../models/pageInfo.type.ts'


interface PropertyResponse {
  data: Property[],
  pageInfo: PageInfo
}

export const fetchAllProperties = async (pageSize: number, pageNumber: number) => {
  pageNumber = pageNumber - 1

  try {
    const params = {
      pageSize,
      pageNumber
    }

    const response = await axiosInstance.get<PropertyResponse>('/api/properties', { params })
    return response.data
  } catch (error) {
    toast.error('Lỗi khi tải dữ liệu bài đăng')
    throw error
  }
}