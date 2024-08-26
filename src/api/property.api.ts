import { toast } from 'sonner'
import { Property } from '@/models/property.type.ts'
import { PageInfo } from '@/models/pageInfo.type.ts'
import axiosInstance from '@/inteceptor/axiosInstance.ts'

interface PropertyResponse {
  data: Property[]
  pageInfo: PageInfo
}

export const fetchAllProperties = async (
  search: string,
  cityId: number,
  districtId: number,
  roomTypeId: number,
  minPrice: number,
  maxPrice: number,
  minArea: number,
  maxArea: number,
  numOfDays: number,
  sortBy: string,
  pageNumber: number,
  pageSize: number
) => {
  pageNumber = pageNumber - 1

  try {
    const params = {
      search,
      cityId,
      districtId,
      roomTypeId,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      numOfDays,
      sortBy,
      pageNumber,
      pageSize
    }

    const response = await axiosInstance.get<PropertyResponse>('/api/properties', { params })
    return response.data
  } catch (error) {
    toast.error('Lỗi khi tải dữ liệu bài đăng')
    throw error
  }
}

export const getPropertyById = async (id: number) => {
  try {
    const response = await axiosInstance.get<Property>(`/api/properties/${id}`);
    return response.data;
  } catch (error) {
    toast.error('Lỗi khi tải dữ liệu bài đăng');
    throw error;
  }
};