export interface Transaction {
  id: number
  transactionId: string
  transactionType: string
  userId: number
  username: string
  amount: number
  transactionDate: string
  status: string
  description: string
}

export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING'
}
