import { useUserTransactionHistory } from '@/hooks/useTransaction'
import { Transaction } from '@/models/transaction.type.ts'
import { formatDate } from '@/utils/formatDate'
import { Card, TableProps, Typography } from 'antd'
import { useState } from 'react'
import TransactionHistoryTable from './TransactionHistoryTable'
import { formatCurrency } from '@/utils/formatCurrentcy'

function TransactionHistory() {
  const userId = 4
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [sortBy, setSortBy] = useState<string>('transactionDateDesc')

  const { data, isLoading, isError, error } = useUserTransactionHistory(userId, sortBy, pageNumber, pageSize)

  const dataSource: Transaction[] = data
    ? data.data.map((transaction, idx) => ({
        key: transaction.id,
        index: (pageNumber - 1) * pageSize + idx + 1,
        id: transaction.id,
        amount: formatCurrency(transaction.amount),
        transactionDate: formatDate(transaction.transactionDate),
        transactionType: transaction.transactionType,
        status: transaction.status,
        transactionId: transaction.transactionId,
        userId: transaction.userId,
        username: transaction.username
      }))
    : []

  const handleTableChange: TableProps<Transaction>['onChange'] = (_, __, sorter) => {
    if (!Array.isArray(sorter) && sorter.order) {
      const order = sorter.order === 'ascend' ? 'Asc' : 'Desc'
      setSortBy(`${sorter.field}${order}`)
    }
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {error?.message}</p>

  return (
    <>
      <Card
        title={<Typography.Title level={4}>Danh sách giao dịch</Typography.Title>}
        className='mb-12 w-[768px] rounded-none border-l-0'
      >

        <TransactionHistoryTable
          dataSource={dataSource}
          loading={isLoading}
          paginationProps={{
            total: data?.pageInfo.totalElements,
            pageSize: pageSize,
            current: pageNumber,
            showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} giao dịch`,
            onShowSizeChange: (_, size) => setPageSize(size),
            onChange: (page) => setPageNumber(page)
          }}
          handleTableChange={handleTableChange}
        />
      </Card>
    </>
  )
}

export default TransactionHistory
