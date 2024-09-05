import { Transaction } from '@/models/transaction.type'
import { Table, TablePaginationConfig, TableProps, Tag } from 'antd'

interface TransactionHistoryTableProps {
  dataSource: Transaction[]
  loading: boolean
  paginationProps: false | TablePaginationConfig | undefined
  handleTableChange: TableProps<Transaction>['onChange']
}

function TransactionHistoryTable({
  dataSource,
  loading,
  paginationProps,
  handleTableChange
}: TransactionHistoryTableProps) {
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'id'
    },
    {
      title: 'Mã giao dịch',
      dataIndex: 'transactionId',
      key: 'transactionId'
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true
    },
    {
      title: 'Ngày',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      sorter: true
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'transactionType',
      key: 'transactionType',
      sorter: true,
      render: (_, record: Transaction) => {
        let className
        switch (record.transactionType) {
          case 'DEPOSIT':
            className = 'text-blue-500'
            break
          default:
            className = 'text-orange-500'
        }
        return <span className={`font-bold ${className}`}>{record.transactionType}</span>
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: (_, record: Transaction) => {
        let className
        switch (record.status) {
          case 'SUCCESS':
            className = 'bg-green-100 text-green-800'
            break
          case 'PENDING':
            className = 'bg-yellow-100 text-yellow-800'
            break
          default:
            className = 'bg-red-100 text-red-800'
        }
        return <Tag className={`${className}`}>{record.status}</Tag>
      }
    }
  ]

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={paginationProps}
      onChange={handleTableChange}
      rowKey='id'
    />
  )
}

export default TransactionHistoryTable
