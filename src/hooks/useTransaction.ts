import { useQuery } from '@tanstack/react-query'
import { fetchUserTransactionHistory } from '@/api/transaction.api'

export const useUserTransactionHistory = (userId: number | undefined, sortBy: string, pageNumber: number, pageSize: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['transactions', userId, sortBy, pageNumber, pageSize],
    queryFn: () => fetchUserTransactionHistory(userId!, sortBy, pageNumber, pageSize),
    enabled: !!userId
  })

  return { data, isLoading, isError, error }
}
