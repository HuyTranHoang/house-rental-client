import { createComment, deleteReview, getAllCommentWithParams } from '@/api/comment.api.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useComments = (propertyId: number, pageNumber: number, pageSize: number) => {
  const { data: commentData, isLoading: commentIsLoading } = useQuery({
    queryKey: ['comments', propertyId, pageNumber, pageSize],
    queryFn: async () => getAllCommentWithParams(propertyId, pageNumber, pageSize),
    enabled: propertyId !== undefined
  })
  return { reviewData: commentData, reviewIsLoading: commentIsLoading }
}

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      toast.success('Bình luận của bạn đã được gửi!')
    }
  })
  return { createComment: mutate, createCommentIsPending: isPending }
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      toast.success('Bình luận đã được xóa!')
    }
  })
  return { deleteComment: mutate, deleteCommentIsPending: isPending }
}
