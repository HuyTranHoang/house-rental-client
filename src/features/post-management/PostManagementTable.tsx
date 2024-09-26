import { PropertyDataSource } from '@/models/property.type.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { formatDate } from '@/utils/formatDate.ts'
import { EyeOutlined } from '@ant-design/icons'
import { Badge, Button, Table, TableProps, Tag } from 'antd'

interface PropertyTableProps {
  dataSource: PropertyDataSource[]
  isLoading: boolean
  paginationProps: false | TableProps<PropertyDataSource>['pagination']
  handleTableChange: TableProps<PropertyDataSource>['onChange']
}

const columns = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index'
  },
  {
    title: 'Tựa đề',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    width: 150,
    render: (value: number) => formatCurrency(value)
  },
  {
    title: 'Duyệt',
    dataIndex: 'status',
    key: 'status',
    width: 150,
    render: (value: string) => {
      switch (value) {
        case 'PENDING':
          return <Tag color='gold'>Chờ duyệt</Tag>
        case 'APPROVED':
          return <Tag color='success'>Đã được duyệt</Tag>
        case 'REJECTED':
          return <Tag color='error'>Bị từ chối</Tag>
        default:
          return null
      }
    }
  },
  {
    title: 'Trạng thái',
    dataIndex: 'blocked',
    key: 'blocked',
    width: 150,
    render: (value: boolean) =>
      value ? <Badge status='error' text='Khóa' /> : <Badge status='success' text='Họat động' />
  },
  {
    title: 'Ngày đăng',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    width: 150,
    render: (value: string) => formatDate(value)
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
    key: 'action',
    width: 100,
    render: () => (
      <Button type='primary' icon={<EyeOutlined />}>
        Chi tiết
      </Button>
    )
  }
]

function PostManagementTable({ dataSource, isLoading, paginationProps, handleTableChange }: PropertyTableProps) {
  return (
    <Table
      loading={isLoading}
      dataSource={dataSource}
      columns={columns}
      onChange={handleTableChange}
      pagination={{
        position: ['bottomCenter'],
        pageSizeOptions: ['5', '10', '20'],
        locale: { items_per_page: '/ trang' },
        showSizeChanger: true,
        ...paginationProps
      }}
      locale={{
        triggerDesc: 'Sắp xếp giảm dần',
        triggerAsc: 'Sắp xếp tăng dần',
        cancelSort: 'Hủy sắp xếp'
      }}
    />
  )
}

export default PostManagementTable
