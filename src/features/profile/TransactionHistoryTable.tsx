import { Transaction, TransactionDataSource, TransactionStatus } from '@/models/transaction.type'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { formatDate } from '@/utils/formatDate.ts'
import { Table, TablePaginationConfig, TableProps, Tag } from 'antd'
import { clsx } from 'clsx'

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
      render: (value: Transaction['amount']) => formatCurrency(value)
    },
    {
      title: 'Ngày',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      sorter: true,
      render: (value: Transaction['transactionDate']) => formatDate(value)
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'transactionType',
      key: 'transactionType',
      width: 150,
      sorter: true,
      render: (value: Transaction['transactionType']) => {
        const transactionType = value === 'DEPOSIT' ? 'Nạp tiền' : 'Sử dụng'
        return (
          <span className={clsx('font-semibold', value === 'DEPOSIT' ? 'text-blue-500' : 'text-orange-500')}>
            {transactionType}
          </span>
        )
      }
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
