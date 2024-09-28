import { useHiddenProperty, useRefreshProperty } from '@/hooks/useProperty'
import { PropertyDataSource, PropertyStatus } from '@/types/property.type'
import { formatCurrency } from '@/utils/formatCurrentcy'
import { formatDate, formatDateWithTime } from '@/utils/formatDate'
import {
  ArrowUpOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  MoreOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons'
import type { MenuProps, TableProps } from 'antd'
import { Badge, Button, Dropdown, Modal, Table, Tooltip } from 'antd'
import { toast } from 'sonner'

interface PropertyTableProps {
  dataSource: PropertyDataSource[]
  isLoading: boolean
  paginationProps: false | TableProps<PropertyDataSource>['pagination']
  handleTableChange: TableProps<PropertyDataSource>['onChange']
}

export default function PostManagementTable({
  dataSource,
  isLoading,
  paginationProps,
  handleTableChange
}: PropertyTableProps) {
  const { hiddenProperty, hiddenPropertyIsPending } = useHiddenProperty()
  const { refreshProperty, refreshPropertyIsPending } = useRefreshProperty()

  const showConfirm = (record: PropertyDataSource) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn làm mới bài đăng này?',
      content: record.title,
      onOk: () => {
        refreshProperty(record.id)
          .then(() => {
            toast.success('Refresh bài đăng thành công')
          })
          .catch((error) => toast.error(error.response.data.message || 'Lỗi khi làm mới bài đăng'))
      }
    })
  }

  const getDropDownItems = (record: PropertyDataSource): MenuProps['items'] => [
    {
      key: 'view',
      label: 'Xem chi tiết',
      icon: <ExportOutlined />
    },
    {
      key: 'edit',
      label: 'Sửa bài đăng',
      icon: <EditOutlined />
    },
    {
      key: 'toggle-visibility',
      label: record.hidden ? 'Hiện bài đăng' : 'Ẩn bài đăng',
      icon: record.hidden ? <EyeOutlined /> : <EyeInvisibleOutlined />,
      onClick: () => {
        hiddenProperty(record.id).then(() => {
          toast.success(record.hidden ? 'Hiện bài đăng thành công' : 'Ẩn bài đăng thành công')
        })
      }
    },
    {
      type: 'divider'
    },
    {
      key: 'delete',
      danger: true,
      label: 'Xóa bài đăng',
      icon: <DeleteOutlined />
    }
  ]

  const columns = [
    { title: '#', dataIndex: 'index', key: 'index', width: 50 },
    {
      title: 'Thông tin bất động sản',
      dataIndex: 'propertyInfo',
      key: 'propertyInfo',
      render: (_: undefined, record: PropertyDataSource) => (
        <div className='space-y-2'>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-500'>Tựa đề:</span>
            <span className='font-medium'>{record.title}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-500'>Giá:</span>
            <span className='font-medium'>{formatCurrency(record.price)}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-500'>Địa chỉ:</span>
            <span className='font-medium'>{record.location}</span>
          </div>
        </div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'blocked',
      key: 'blocked',
      width: 150,
      render: (value: boolean, record: PropertyDataSource) => (
        <div className='space-y-1'>
          <Badge status={value ? 'error' : 'success'} text={value ? 'Đã khóa' : 'Hoạt động'} />
          {record.hidden && (
            <Badge
              status='warning'
              text={
                <>
                  Đã ẩn
                  <Tooltip title='Bài đăng này không hiển thị trên trang chủ'>
                    <QuestionCircleOutlined className='ml-2 cursor-pointer text-xs text-gray-500' />
                  </Tooltip>
                </>
              }
            />
          )}
        </div>
      )
    },
    {
      title: 'Thông tin thời gian',
      key: 'timeInfo',
      width: 200,
      render: (_: undefined, record: PropertyDataSource) => (
        <div className='space-y-2'>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-500'>Ngày đăng:</span>
            <span className='font-medium'>{formatDate(record.createdAt)}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-500'>Làm mới lần cuối:</span>
            <span className='font-medium'>
              {formatDateWithTime(record.refreshDay)}
              <Tooltip title='Bài đăng trên trang chủ được sắp xếp theo lượt làm mới'>
                <QuestionCircleOutlined className='ml-2 cursor-pointer text-xs text-gray-500' />
              </Tooltip>
            </span>
          </div>
        </div>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 120,
      render: (_: undefined, record: PropertyDataSource) => (
        <div className='flex items-center space-x-2'>
          {record.status === PropertyStatus.APPROVED && (
            <Tooltip title='Làm mới bài đăng'>
              <Button
                icon={<ArrowUpOutlined className='text-white' />}
                size='small'
                shape='circle'
                className='flex h-8 w-8 items-center justify-center border-0 bg-gradient-to-r from-blue-500 to-purple-600 p-0 shadow-md transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg'
                onClick={() => showConfirm(record)}
                loading={refreshPropertyIsPending}
              />
            </Tooltip>
          )}
          <Dropdown menu={{ items: getDropDownItems(record) }} trigger={['click']}>
            <Button icon={<MoreOutlined />} size='small' />
          </Dropdown>
        </div>
      )
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
