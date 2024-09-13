import { selectAuth } from '@/features/auth/authSlice.ts'
import { useUserTransactionHistory } from '@/hooks/useTransaction.ts'
import { TransactionDataSource, TransactionStatus, TransactionType } from '@/models/transaction.type.ts'
import { FilterOutlined } from '@ant-design/icons'
import { Badge, Button, Card, Form, Input, Modal, Select, Space, TableProps, Typography } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import TransactionHistoryTable from './TransactionHistoryTable'

const { Search } = Input

const transactionTypeOptions = [
  { value: TransactionType.DEPOSIT, label: 'Nạp tiền' },
  { value: TransactionType.WITHDRAWAL, label: 'Sử dụng' }
]

const transactionStatusOptions = [
  { value: TransactionStatus.PENDING, label: 'Đang chờ xử lý' },
  { value: TransactionStatus.SUCCESS, label: 'Thành công' },
  { value: TransactionStatus.FAILED, label: 'Thất bại' }
]

function TransactionHistory() {
  const { user } = useSelector(selectAuth)

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
    user?.id,
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
            <Typography.Title level={4}>Lịch sử giao dịch</Typography.Title>
            <Space className='mt-3 mb-2 md:mb-0' size='large' align='center'>
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
                placeholder='Tìm kiếm theo mã giao dịch'
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
            showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} giao dịch`,
            onShowSizeChange: (_, size) => setPageSize(size),
            onChange: (page) => setPageNumber(page),
            locale: { items_per_page: 'trang' }
          }}
          handleTableChange={handleTableChange}
        />
      </Card>

      <Modal
        title='Lọc theo'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={
          <div className='flex justify-end gap-2'>
            {filterCount > 0 && (
              <Button danger onClick={handleFilterModalReset}>
                Xóa bộ lọc
              </Button>
            )}
            <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button type='primary' onClick={handleFilterModalOk}>
              Áp dụng
            </Button>
          </div>
        }
      >
        <Form form={form} layout='vertical'>
          <Form.Item label={<span className='text-gray-500'>Loại giao dịch</span>} name='type'>
            <Select className='w-full' placeholder='Chọn loại giao dịch' options={transactionTypeOptions} />
          </Form.Item>

          <Form.Item label={<span className='text-gray-500'>Trạng thái giao dịch</span>} name='status'>
            <Select className='w-full' placeholder='Chọn trạng thái giao dịch' options={transactionStatusOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TransactionHistory
