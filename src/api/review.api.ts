import axiosInstance from '@/inteceptor/axiosInstance'
import { PageInfo } from '@/models/pageInfo.type'
import { Review, ReviewFieldType } from '@/models/review.type'
import { toast } from 'sonner'

interface ReviewWithPagination {
  data: Review[]
  pageInfo: PageInfo
}

export const getAllReviewsWithParams = async (propertyId: number, pageNumber: number, pageSize: number) => {
  pageNumber = pageNumber - 1

  const params = {
    propertyId,
    pageNumber,
    pageSize
  }
  try {
    const response = await axiosInstance.get<ReviewWithPagination>('/api/review', { params })
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.error('Failed to fetch reviews', error)
    toast.error('Không thể lấy dữ liệu đánh giá!')
  }
}

export const createReview = async (review: ReviewFieldType) => {
  try {
    return await axiosInstance.post<Review>('/api/review', review)
  } catch (error) {
    console.error('Failed to create review', error)
    toast.error('Không thể gửi đánh giá!')
  }
}

export const deleteReview = async (reviewId: number) => {
  try {
    return await axiosInstance.delete<Review>(`/api/review/${reviewId}`)
  } catch (error) {
    console.error('Failed to delete review', error)
    toast.error('Không thể xóa đánh giá!')
  }
}