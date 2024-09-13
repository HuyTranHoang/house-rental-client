import { fetchUserTransactionHistory } from '@/api/transaction.api'
import { useQuery } from '@tanstack/react-query'

export const useUserTransactionHistory = (
  userId: number | undefined,
  transactionId: string,
  transactionType: string,
  transactionStatus: string,
  sortBy: string,
  pageNumber: number,
  pageSize: number
) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['transactions', userId, transactionId, transactionType, transactionStatus, sortBy, pageNumber, pageSize],
    queryFn: () =>
      fetchUserTransactionHistory(
        userId!,
        transactionId,
        transactionType,
        transactionStatus,
        sortBy,
        pageNumber,
        pageSize
      ),
    enabled: !!userId
  })

  return { data, isLoading, isError, error }
}
