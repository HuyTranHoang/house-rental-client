import useAuthStore from '@/store/authStore.ts'
import { useUserTransactionHistory } from '@/hooks/useTransaction.ts'
import { TransactionDataSource, TransactionStatus, TransactionType } from '@/types/transaction.type.ts'
import { FilterOutlined } from '@ant-design/icons'
import { Badge, Button, Card, Form, Input, Modal, Select, Space, TableProps, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TransactionHistoryTable from './TransactionHistoryTable'

const { Search } = Input

function TransactionHistory() {
  const { t } = useTranslation('profile')
  const currentUser = useAuthStore((state) => state.user)

  const [transactionId, setTransactionId] = useState('')
  const [transactionType, setTransactionType] = useState<string>('')
  const [transactionStatus, setTransactionStatus] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [sortBy, setSortBy] = useState<string>('transactionDateDesc')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterCount, setFilterCount] = useState(0)

  const [form] = Form.useForm()

  const { data, isLoading, isError, error } = useUserTransactionHistory(
    currentUser?.id,
    transactionId,
    transactionType,
    transactionStatus,
    sortBy,
    pageNumber,
    pageSize
  )

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

  const handleFilterModalOk = () => {
    setIsModalOpen(false)
    const { type, status } = form.getFieldsValue()
    setTransactionType(type)
    setTransactionStatus(status)
    let count = 0
    if (type) count++
    if (status) count++
    setFilterCount(count)
  }

  const handleFilterModalReset = () => {
    setIsModalOpen(false)
    form.resetFields()
    setTransactionType('')
    setTransactionStatus('')
    setFilterCount(0)
  }

  if (isError) return <p>Error: {error?.message}</p>

  return (
    <>
      <Card
        title={
          <div className='flex flex-col items-center justify-between md:flex-row'>
            <Typography.Title level={4}>{t('transactionHistory.title')}</Typography.Title>
            <Space className='mb-2 mt-3 md:mb-0' size='large' align='center'>
              <Badge count={filterCount}>
                <FilterOutlined onClick={() => setIsModalOpen(true)} className='cursor-pointer text-xl' />
              </Badge>

              <Search
                allowClear
                className='md:w-64'
                onSearch={(value: string) => {
                  setTransactionId(value)
                  setPageNumber(1)
                }}
                placeholder={t('transactionHistory.searchPlaceholder')}
              />
            </Space>
          </div>
        }
        className='mb-12 rounded-none border-l-0'
      >
        <TransactionHistoryTable
          dataSource={dataSource}
          loading={isLoading}
          paginationProps={{
            total: data?.pageInfo.totalElements || 0,
            pageSize: pageSize,
            current: pageNumber,
            showTotal: (total, range) => `${range[0]}-${range[1]} ${t('transactionHistory.of')} ${total} ${t('transactionHistory.transactions')}`,
            onShowSizeChange: (_, size) => setPageSize(size),
            onChange: (page) => setPageNumber(page),
            locale: { items_per_page: t('transactionHistory.itemsPerPage') }
          }}
          handleTableChange={handleTableChange}
        />
      </Card>

      <Modal
        title={t('transactionHistory.filterBy')}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={
          <div className='flex justify-end gap-2'>
            {filterCount > 0 && (
              <Button danger onClick={handleFilterModalReset}>
                {t('transactionHistory.clearFilters')}
              </Button>
            )}
            <Button onClick={() => setIsModalOpen(false)}>{t('transactionHistory.cancel')}</Button>
            <Button type='primary' onClick={handleFilterModalOk}>
              {t('transactionHistory.apply')}
            </Button>
          </div>
        }
      >
        <Form form={form} layout='vertical'>
          <Form.Item label={<span className='text-gray-500'>{t('transactionHistory.transactionType')}</span>} name='type'>
            <Select className='w-full' placeholder={t('transactionHistory.selectTransactionType')} options={[
              { value: TransactionType.DEPOSIT, label: t('transactionHistory.deposit') },
              { value: TransactionType.WITHDRAWAL, label: t('transactionHistory.withdrawal') }
            ]} />
          </Form.Item>

          <Form.Item label={<span className='text-gray-500'>{t('transactionHistory.transactionStatus')}</span>} name='status'>
            <Select className='w-full' placeholder={t('transactionHistory.selectTransactionStatus')} options={[
              { value: TransactionStatus.PENDING, label: t('transactionHistory.pending') },
              { value: TransactionStatus.SUCCESS, label: t('transactionHistory.success') },
              { value: TransactionStatus.FAILED, label: t('transactionHistory.failed') }
            ]} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TransactionHistory