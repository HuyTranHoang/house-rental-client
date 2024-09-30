import { createTransactionWithDrawal, fetchUserTransactionHistory } from '@/api/transaction.api'
import { useMutation, useQuery } from '@tanstack/react-query'

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

export const useCreateTransactionWithDrawal = () => {
  return useMutation({
    mutationFn: createTransactionWithDrawal,
    onError: (error) => {
      console.error('Withdrawal transaction failed', error)
    }
  })
}
