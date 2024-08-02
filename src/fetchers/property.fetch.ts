import axiosInstance from '../inteceptor/axiosInstance.ts'
import { toast } from 'sonner'
import { Property } from '../models/property.type.ts'
import { PageInfo } from '../models/pageInfo.type.ts'


interface PropertyResponse {
  data: Property[],
  pageInfo: PageInfo
}

// Utility function to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))


export const fetchAllProperties = async (pageSize: number,
                                         pageNumber: number,
                                         cityId: number,
                                         districtId: number,
                                         roomTypeId: number,
                                         minPrice: number,
                                         maxPrice: number,
                                         search: string,
                                         minArea: number,
                                         maxArea: number,
                                         numOfDays: number
) => {

  pageNumber = pageNumber - 1

  try {
    const params = {
      pageSize,
      pageNumber,
      cityId,
      districtId,
      roomTypeId,
      minPrice,
      maxPrice,
      search,
      minArea,
      maxArea,
      numOfDays
    }

    const response = await axiosInstance.get<PropertyResponse>('/api/properties', { params })
    await delay(500)
    return response.data
  } catch (error) {
    toast.error('Lỗi khi tải dữ liệu bài đăng')
    throw error
  }
}