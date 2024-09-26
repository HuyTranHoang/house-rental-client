import { Transaction, TransactionDataSource, TransactionStatus, TransactionType } from '@/types/transaction.type'
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

const statusMap = {
  [TransactionStatus.SUCCESS]: ['green', 'Thành công'],
  [TransactionStatus.PENDING]: ['blue', 'Đang xử lý'],
  [TransactionStatus.FAILED]: ['red', 'Thất bại']
}

function TransactionHistoryTable({
  dataSource,
  loading,
  paginationProps,
  handleTableChange
}: TransactionHistoryTableProps) {
  const columns = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'transactionId',
      key: 'transactionId'
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
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
        const [color, text] = statusMap[value as TransactionStatus]
        return <Tag color={color}>{text}</Tag>
      }
    }
  ]

  return (
    <Table
      className='overflow-x-scroll'
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={paginationProps}
      onChange={handleTableChange}
      expandable={{
        expandedRowRender: (record) => <>
          <p><strong>Loại giao dịch:</strong> {record.transactionType === TransactionType.DEPOSIT ? 'Nạp tiền' : 'Rút tiền'}</p>
          <p><strong>Phương thức:</strong> VNPAY</p>
          <p><strong>Nội dung:</strong> {record.description}</p>
        </>
      }}
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
