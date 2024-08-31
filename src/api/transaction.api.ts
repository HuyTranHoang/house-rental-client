import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { Payment } from '@/models/payment.type.ts'
import { HttpStatusCode } from 'axios'
import { toast } from 'sonner'

interface TransactionForm {
  amount: number
  type: string
  description?: string
}

export const createTransaction = async (values: TransactionForm) => {
  try {
    const response = await axiosInstance.post<Payment>('/api/transaction', values)
    if (response.status === HttpStatusCode.Ok) {
      return response.data
    }
  } catch (error) {
    console.error('Failed to create transaction', error)
    toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
  }
}

export const getTransaction = async (transactionId: string) => {
  try {
    const response = await axiosInstance.get<Payment>(`/api/transaction/${transactionId}`)
    if (response.status === HttpStatusCode.Ok) {
      return response.data
    }
  } catch (error) {
    console.error('Failed to get transaction', error)
    toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
  }
}
