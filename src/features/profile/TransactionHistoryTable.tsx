import { Transaction, TransactionDataSource, TransactionStatus, TransactionType } from '@/models/transaction.type'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { Table, TablePaginationConfig, TableProps, Tag } from 'antd'
import { clsx } from 'clsx'
import { formatDateWithTime } from '@/utils/formatDate.ts'

interface TransactionHistoryTableProps {
  dataSource: TransactionDataSource[]
  loading: boolean
  paginationProps: false | TablePaginationConfig | undefined
  handleTableChange: TableProps<TransactionDataSource>['onChange']
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
      key: 'id',
      width: 50
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
      sorter: true,
      render: (value: Transaction['amount'], record: Transaction) => {
        return (
          <span
            className={clsx('font-semibold', {
              'text-green-400': record.transactionType === TransactionType.DEPOSIT,
              'text-red-400': record.transactionType === TransactionType.WITHDRAWAL
            })}
          >
            {record.transactionType === TransactionType.WITHDRAWAL ? '-' : '+'}
            {formatCurrency(value)}
          </span>
        )
      }
    },
    {
      title: 'Thời gian',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      sorter: true,
      render: (value: Transaction['transactionDate']) => formatDateWithTime(value)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      sorter: true,
      render: (value: Transaction['status']) => {
        const color =
          value === TransactionStatus.SUCCESS ? 'green' : value === TransactionStatus.PENDING ? 'blue' : 'red'

        const status =
          value === TransactionStatus.SUCCESS
            ? 'Thành công'
            : value === TransactionStatus.PENDING
              ? 'Đang xử lý'
              : 'Thất bại'
        return <Tag color={color}>{status}</Tag>
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
      locale={{
        emptyText: 'Không có dữ liệu',
        triggerDesc: 'Sắp xếp giảm dần',
        triggerAsc: 'Sắp xếp tăng dần',
        cancelSort: 'Hủy sắp xếp'
      }}
    />
  )
}

export default TransactionHistoryTable
