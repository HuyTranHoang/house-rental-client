import { selectAuth } from '@/features/auth/authSlice.ts'
import { useUserTransactionHistory } from '@/hooks/useTransaction.ts'
import { TransactionDataSource } from '@/models/transaction.type.ts'
import { Card, TableProps, Typography } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import TransactionHistoryTable from './TransactionHistoryTable'

function TransactionHistory() {
  const { user } = useSelector(selectAuth)

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [sortBy, setSortBy] = useState<string>('transactionDateDesc')

  const { data, isLoading, isError, error } = useUserTransactionHistory(user?.id, sortBy, pageNumber, pageSize)

  const dataSource: TransactionDataSource[] = data
    ? data.data.map((transaction, idx) => ({
        ...transaction,
        key: transaction.id,
        index: (pageNumber - 1) * pageSize + idx + 1
      }))
    : []

  const handleTableChange: TableProps<TransactionDataSource>['onChange'] = (_, __, sorter) => {
    if (!Array.isArray(sorter) && sorter.order) {
      const order = sorter.order === 'ascend' ? 'Asc' : 'Desc'
      setSortBy(`${sorter.field}${order}`)
    } else {
      setSortBy('transactionDateDesc')
    }
  }

  if (isError) return <p>Error: {error?.message}</p>

  return (
    <>
      <Card
        title={<Typography.Title level={4}>Lịch sử giao dịch</Typography.Title>}
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
            onChange: (page) => setPageNumber(page),
            locale: { items_per_page: 'trang' }
          }}
          handleTableChange={handleTableChange}
        />
      </Card>
    </>
  )
}

export default TransactionHistory
