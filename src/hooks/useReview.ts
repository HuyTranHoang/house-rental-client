import { createReview, deleteReview, getAllReviewsWithParams } from '@/api/comment.api.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useReview = (propertyId: number, pageNumber: number, pageSize: number) => {
  const { data: reviewData, isLoading: reviewIsLoading } = useQuery({
    queryKey: ['reviews', propertyId, pageNumber, pageSize],
    queryFn: async () => getAllReviewsWithParams(propertyId, pageNumber, pageSize),
    enabled: propertyId !== undefined
  })
  return { reviewData, reviewIsLoading }
}

export const useCreateReview = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      toast.success('Đánh giá của bạn đã được gửi!')
    }
  })
  return { createReview: mutate, createReviewIsPending: isPending }
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      toast.success('Đánh giá đã được xóa!')
    }
  })
  return { deleteReview: mutate, deleteReviewIsPending: isPending }
}