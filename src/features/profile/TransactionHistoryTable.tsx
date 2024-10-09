import { Transaction, TransactionDataSource, TransactionStatus, TransactionType } from '@/types/transaction.type'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { Table, TablePaginationConfig, TableProps, Tag } from 'antd'
import { clsx } from 'clsx'
import { formatDateWithTime } from '@/utils/formatDate.ts'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('profile')

  const statusMap = {
    [TransactionStatus.SUCCESS]: ['green', t('transactionHistory.success')],
    [TransactionStatus.PENDING]: ['blue', t('transactionHistory.pending')],
    [TransactionStatus.FAILED]: ['red', t('transactionHistory.failed')]
  }

  const columns = [
    {
      title: t('transactionHistory.transactionId'),
      dataIndex: 'transactionId',
      key: 'transactionId'
    },
    {
      title: t('transactionHistory.amount'),
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
      title: t('transactionHistory.transactionDate'),
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      sorter: true,
      render: (value: Transaction['transactionDate']) => formatDateWithTime(value)
    },
    {
      title: t('transactionHistory.status'),
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
          <p><strong>{t('transactionHistory.transactionType')}:</strong> {record.transactionType === TransactionType.DEPOSIT ? t('transactionHistory.deposit') : t('transactionHistory.withdrawal')}</p>
          <p><strong>{t('transactionHistory.method')}:</strong> VNPAY</p>
          <p><strong>{t('transactionHistory.description')}:</strong> {record.description}</p>
        </>
      }}
      locale={{
        emptyText: t('transactionHistory.noData'),
        triggerDesc: t('transactionHistory.triggerDesc'),
        triggerAsc: t('transactionHistory.triggerAsc'),
        cancelSort: t('transactionHistory.cancelSort')
      }}
    />
  )
}

export default TransactionHistoryTable