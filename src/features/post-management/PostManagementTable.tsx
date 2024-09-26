import { useHiddenProperty } from '@/hooks/useProperty.ts'
import { PropertyDataSource } from '@/types/property.type.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { formatDate } from '@/utils/formatDate.ts'
import { DeleteOutlined, EditOutlined, ExportOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Badge, Dropdown, MenuProps, Table, TableProps } from 'antd'
import { toast } from 'sonner'

interface PropertyTableProps {
  dataSource: PropertyDataSource[]
  isLoading: boolean
  paginationProps: false | TableProps<PropertyDataSource>['pagination']
  handleTableChange: TableProps<PropertyDataSource>['onChange']
}

function PostManagementTable({ dataSource, isLoading, paginationProps, handleTableChange }: PropertyTableProps) {
  const { hiddenProperty, hiddenPropertyIsPending } = useHiddenProperty()

  const getDropDownItems = (record: PropertyDataSource): MenuProps['items'] => [
    {
      key: 'Xem chi tiết',
      label: 'Xem chi tiết',
      icon: <ExportOutlined />
    },
    {
      key: 'Sửa bài đăng',
      label: 'Sửa bài đăng',
      icon: <EditOutlined />
    },
    {
      key: record.hidden ? 'Hiện bài đăng' : 'Ẩn bài đăng',
      label: record.hidden ? 'Hiện bài đăng' : 'Ẩn bài đăng',
      icon: record.hidden ? <EyeOutlined /> : <EyeInvisibleOutlined />,
      onClick: () =>
        hiddenProperty(record.id).then(() =>
          toast.success(record.hidden ? 'Hiện bài đăng thành công' : 'Ẩn bài đăng thành công')
        )
    },
    {
      type: 'divider'
    },
    {
      key: 'Xóa bài đăng',
      danger: true,
      label: 'Xóa bài đăng',
      icon: <DeleteOutlined />
    }
  ]

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
      title: 'Trạng thái',
      dataIndex: 'blocked',
      key: 'blocked',
      width: 150,
      render: (value: boolean, record: PropertyDataSource) => {
        const status = value ? 'Đã khóa' : 'Hoạt động'
        const color = value ? 'error' : 'success'

        const hidden = record.hidden

        return (
          <>
            <Badge status={color} text={status} />
            {hidden && <Badge status='warning' text='Đã ẩn' />}
          </>
        )
      }
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
      width: 125,
      render: (_: string, record: PropertyDataSource) => {
        return (
          <Dropdown menu={{ items: getDropDownItems(record) }}>
            <a className='text-xl' onClick={(e) => e.preventDefault()}>
              ...
            </a>
          </Dropdown>
        )
      }
    }
  ]

  return (
    <Table
      loading={isLoading || hiddenPropertyIsPending}
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
