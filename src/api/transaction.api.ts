import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { PageInfo } from '@/types/pageInfo.type'
import { Payment } from '@/types/payment.type.ts'
import { Transaction } from '@/types/transaction.type.ts'
import { HttpStatusCode } from 'axios'
import { toast } from 'sonner'

interface TransactionForm {
  amount: number
  type: string
  description?: string
}

interface TransactionResponse {
  data: Transaction[]
  pageInfo: PageInfo
}

export const createTransactionDeposit = async (values: TransactionForm) => {
  try {
    return await axiosInstance.post<Payment>('/api/transaction/deposit', values)
  } catch (error) {
    console.error('Failed to create transaction', error)
    toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
  }
}

export const createTransactionWithDrawal = async (values: TransactionForm) => {
  try {
    return await axiosInstance.post('/api/transaction/withdrawal', values)
  } catch (error) {
    console.error('Failed to create transaction', error)
    toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
  }
}

export const getTransaction = async (transactionId: string) => {
  try {
    const response = await axiosInstance.get<Transaction>(`/api/transaction/${transactionId}`)
    if (response.status === HttpStatusCode.Ok) {
      return response.data
    }
  } catch (error) {
    console.error('Failed to get transaction', error)
    toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
  }
}
export const fetchUserTransactionHistory = async (
  userId: number,
  transactionId: string,
  transactionType: string,
  transactionStatus: string,
  sortBy: string,
  pageNumber: number,
  pageSize: number
): Promise<TransactionResponse> => {
  pageNumber = pageNumber - 1

  try {
    const params = { userId, transactionId, transactionType, status: transactionStatus, sortBy, pageNumber, pageSize }

    const response = await axiosInstance.get<TransactionResponse>('/api/transaction', { params })
    return response.data
  } catch (error) {
    toast.error('Lỗi khi tải dữ liệu lịch sử giao dịch')
    throw error
  }
}
