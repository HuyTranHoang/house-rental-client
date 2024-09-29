import { useHiddenProperty, usePrioritizeProperty, useRefreshProperty } from '@/hooks/useProperty'
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
  FireOutlined,
  MoreOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons'
import type { MenuProps, TableProps } from 'antd'
import { Badge, Button, Dropdown, Table, Tooltip } from 'antd'
import { useState } from 'react'
import { toast } from 'sonner'
import PriorityConfirmationModal from './PriorityConfirmationModal'
import RefreshConfirmationModal from './RefreshConfirmationModal'

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
  const { prioritizeProperty, prioritizePropertyIsPending } = usePrioritizeProperty()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalPriorityVisible, setIsModalPriorityVisible] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<PropertyDataSource | null>(null)

  const showConfirm = (record: PropertyDataSource, isRefreshModal: boolean) => {
    setSelectedProperty(record)
    if (isRefreshModal) {
      setIsModalVisible(true)
    } else {
      setIsModalPriorityVisible(true)
    }
  }

  const handleConfirm = (isRefreshModal: boolean) => {
    if (selectedProperty) {
      if (isRefreshModal) {
        refreshProperty(selectedProperty.id)
          .then(() => {
            toast.success('Làm mới bài đăng thành công')
            setIsModalVisible(false)
          })
          .catch((error) => toast.error(error.response.data.message || 'Lỗi khi làm mới bài đăng'))
      } else {
        prioritizeProperty(selectedProperty.id)
          .then(() => {
            toast.success('Ưu tiên bài đăng thành công')
            setIsModalPriorityVisible(false)
          })
          .catch((error) => toast.error(error.response.data.message || 'Lỗi khi ưu tiên bài đăng'))
      }
    }
  }

  const handleCancel = (isRefreshModal: boolean) => {
    if (isRefreshModal) setIsModalVisible(false)
    else setIsModalPriorityVisible(false)
    setSelectedProperty(null)
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
                    <QuestionCircleOutlined className='ml-2 cursor-help text-xs text-gray-500' />
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
            <span className='font-medium'>{formatDateWithTime(record.refreshedAt)}</span>
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
            <>
              <Tooltip title='Làm mới bài đăng'>
                <Button
                  icon={<ArrowUpOutlined className='text-white' />}
                  size='small'
                  shape='circle'
                  className='border-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 hover:from-purple-600 hover:to-blue-700'
                  onClick={() => showConfirm(record, true)}
                  loading={refreshPropertyIsPending}
                />
              </Tooltip>
              <Tooltip title='Ưu tiên bài đăng'>
                <Button
                  icon={<FireOutlined className='text-white' />}
                  size='small'
                  shape='circle'
                  className='border-0 bg-gradient-to-r from-yellow-500 to-red-500 transition-all duration-300 hover:from-red-600 hover:to-yellow-600'
                  onClick={() => showConfirm(record, false)}
                  loading={prioritizePropertyIsPending}
                />
              </Tooltip>
              <Dropdown menu={{ items: getDropDownItems(record) }} trigger={['click']}>
                <Button icon={<MoreOutlined />} size='small' />
              </Dropdown>
            </>
          )}
        </div>
      )
    }
  ]

  return (
    <>
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

      <RefreshConfirmationModal
        isVisible={isModalVisible}
        onConfirm={() => handleConfirm(true)}
        onCancel={() => handleCancel(true)}
        property={selectedProperty}
        isLoading={refreshPropertyIsPending}
      />

      <PriorityConfirmationModal
        isVisible={isModalPriorityVisible}
        onConfirm={() => handleConfirm(false)}
        onCancel={() => handleCancel(false)}
        property={selectedProperty}
        isLoading={refreshPropertyIsPending}
      />
    </>
  )
}
