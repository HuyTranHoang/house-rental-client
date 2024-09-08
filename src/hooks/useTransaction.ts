import { useQuery } from '@tanstack/react-query'
import { fetchUserTransactionHistory } from '@/api/transaction.api'

export const useUserTransactionHistory = (userId: number | undefined, transactionId: string, sortBy: string, pageNumber: number, pageSize: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['transactions', userId, transactionId, sortBy, pageNumber, pageSize],
    queryFn: () => fetchUserTransactionHistory(userId!, transactionId!, sortBy, pageNumber, pageSize),
    enabled: !!userId
  })

  return { data, isLoading, isError, error }
}
