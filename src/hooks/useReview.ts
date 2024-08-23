import { getAllReviewsWithParams } from '@/api/review.api'
import { useQuery } from '@tanstack/react-query'

export const useReview = (propertyId: number, pageNumber: number, pageSize: number) => {
  const { data: reviewData, isLoading: reviewIsLoading } = useQuery({
    queryKey: ['reviews', propertyId, pageNumber, pageSize],
    queryFn: async () => getAllReviewsWithParams(propertyId, pageNumber, pageSize),
    enabled: propertyId !== undefined
  })
  return { reviewData, reviewIsLoading }
}
