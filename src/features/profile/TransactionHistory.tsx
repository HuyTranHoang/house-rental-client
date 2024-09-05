import { useUserTransactionHistory } from '@/hooks/useTransaction'
import { Transaction } from '@/models/transaction.type.ts'
import { Divider, Flex, TableProps, Typography } from 'antd'
import Search from 'antd/es/input/Search'
import { useState } from 'react'
import TransactionHistoryTable from './TransactionHistoryTable'
import { formatDate } from '@/utils/formatDate'

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
        amount: transaction.amount,
        transactionDate: formatDate(transaction.transactionDate),
        transactionType: transaction.transactionType,
        status: transaction.status
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
      <Flex align='center' justify='space-between' style={{ marginBottom: 12 }}>
        <Flex align='center'>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Danh sách giao dich
          </Typography.Title>
          <Divider type='vertical' style={{ height: 40, backgroundColor: '#9a9a9b', margin: '0 16px' }} />
          <Search allowClear onSearch={(value) => {}} placeholder='Tìm kiếm ' style={{ width: 250 }} />
        </Flex>
      </Flex>

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
    </>
  )
}

export default TransactionHistory
