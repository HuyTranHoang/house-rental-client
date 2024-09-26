import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { PageInfo } from '@/types/pageInfo.type.ts'
import { Property } from '@/types/property.type.ts'
import { toast } from 'sonner'

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

  // Client chỉ được xem những bài đăng đã được duyệt, không khóa và không ẩn
  const status = 'APPROVED'
  const isBlocked = 'false'
  const isHidden = 'false'

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
      isHidden,
      isBlocked,
      status,
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

export const getAllPropertyByUserId = async (
  search: string,
  status: string,
  userId: number,
  sortBy: string,
  pageNumber: number,
  pageSize: number
) => {
  pageNumber = pageNumber - 1
  try {
    const params = {
      search,
      status,
      userId,
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
    const response = await axiosInstance.get<Property>(`/api/properties/${id}`)
    return response.data
  } catch (error) {
    toast.error('Lỗi khi tải dữ liệu bài đăng')
    throw error
  }
}

export const hiddenProperty = async (id: number) => {
  try {
    const response = await axiosInstance.put<Property>(`/api/properties/hide/${id}`)
    return response.data
  } catch (error) {
    toast.error('Lỗi khi ẩn bài đăng')
    throw error
  }
}
