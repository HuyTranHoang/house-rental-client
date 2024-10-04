import axiosInstance from '@/inteceptor/axiosInstance'
import { Comment, CommentFieldType } from '@/types/comment.type.ts'
import { PageInfo } from '@/types/pageInfo.type'
import { toast } from 'sonner'

interface CommentWithPagination {
  data: Comment[]
  pageInfo: PageInfo
}

export const getAllCommentWithParams = async (propertyId: number, pageNumber: number, pageSize: number) => {
  pageNumber = pageNumber - 1

  const isBlocked = 'false'

  const params = {
    propertyId,
    isBlocked,
    pageNumber,
    pageSize
  }
  try {
    const response = await axiosInstance.get<CommentWithPagination>('/api/comment', { params })
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.error('Failed to fetch comment', error)
    toast.error('Không thể lấy dữ liệu bình luận!')
  }
}

export const createComment = async (comment: CommentFieldType) => {
  try {
    return await axiosInstance.post<Comment>('/api/comment', comment)
  } catch (error) {
    console.error('Failed to create comment', error)
    toast.error('Không thể gửi bình luận, vui lòng thử lại sau!')
  }
}

export const deleteReview = async (commentId: number) => {
  try {
    return await axiosInstance.delete<Comment>(`/api/comment/${commentId}`)
  } catch (error) {
    console.error('Failed to delete comment', error)
    toast.error('Không thể xóa bình luận, vui lòng thử lại sau!')
  }
}
