import PostManagementEditPropertyModal from '@/features/post-management/PostManagementEditPropertyModal.tsx'
import PostManagementDetailModal from '@/features/post-management/PostManagementPropertyDetail.tsx'
import {
  useHiddenProperty,
  usePrioritizeProperty,
  useRefreshProperty,
  useSelfDeleteProperty
} from '@/hooks/useProperty'
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
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import PostManagementDeleteConfirmModal from './PostManagementDeleteConfirmModal'
import PriorityConfirmationModal from './PriorityConfirmationModal'
import RefreshConfirmationModal from './RefreshConfirmationModal'

interface PropertyTableProps {
  dataSource: PropertyDataSource[]
  isLoading: boolean
  paginationProps: false | TableProps<PropertyDataSource>['pagination']
  handleTableChange: TableProps<PropertyDataSource>['onChange']
}

const ModalName = {
  REFRESH: 'refresh',
  PRIORITY: 'priority',
  DELETE: 'delete',
  DETAIL: 'detail',
  EDIT: 'edit'
}

export default function PostManagementTable({
  dataSource,
  isLoading,
  paginationProps,
  handleTableChange
}: PropertyTableProps) {
  const { t } = useTranslation('postManagement')
  const { hiddenProperty, hiddenPropertyIsPending } = useHiddenProperty()
  const { refreshProperty, refreshPropertyIsPending } = useRefreshProperty()
  const { prioritizeProperty, prioritizePropertyIsPending } = usePrioritizeProperty()
  const { selfDeleteProperty, selfDeletePropertyIsPending } = useSelfDeleteProperty()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalPriorityVisible, setIsModalPriorityVisible] = useState(false)
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false)
  const [isModalDetailVisible, setIsModalDetailVisible] = useState(false)
  const [isModalEditVisible, setIsModalEditVisible] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<PropertyDataSource | null>(null)

  const showConfirm = (record: PropertyDataSource, modalName: string) => {
    setSelectedProperty(record)
    switch (modalName) {
      case ModalName.REFRESH:
        setIsModalVisible(true)
        break
      case ModalName.PRIORITY:
        setIsModalPriorityVisible(true)
        break
      case ModalName.DELETE:
        setIsModalDeleteVisible(true)
        break
      case ModalName.DETAIL:
        setIsModalDetailVisible(true)
        break
      case ModalName.EDIT:
        setIsModalEditVisible(true)
        break
    }
  }

  const handleConfirm = (modalName: string) => {
    if (selectedProperty) {
      switch (modalName) {
        case ModalName.REFRESH:
          refreshProperty(selectedProperty.id)
            .then(() => {
              toast.success(t('table.toast.success.refreshPost'))
              setIsModalVisible(false)
            })
            .catch((error) => toast.error(error.response.data.message || t('table.toast.error.refreshPost')))
          break
        case ModalName.PRIORITY:
          prioritizeProperty(selectedProperty.id)
            .then(() => {
              toast.success(t('table.toast.success.prioritizePost'))
              setIsModalPriorityVisible(false)
            })
            .catch((error) => toast.error(error.response.data.message || t('table.toast.error.prioritizePost')))
          break
        case ModalName.DELETE:
          selfDeleteProperty(selectedProperty.id)
            .then(() => {
              toast.success(t('table.toast.success.deletePost'))
              setIsModalDeleteVisible(false)
            })
            .catch((error) => toast.error(error.response.data.message || t('table.toast.error.deletePost')))
          break
      }
    }
  }

  const handleCancel = (modalName: string) => {
    setSelectedProperty(null)
    switch (modalName) {
      case ModalName.REFRESH:
        setIsModalVisible(false)
        break
      case ModalName.PRIORITY:
        setIsModalPriorityVisible(false)
        break
      case ModalName.DELETE:
        setIsModalDeleteVisible(false)
        break
      case ModalName.DETAIL:
        setIsModalDetailVisible(false)
        break
      case ModalName.EDIT:
        setIsModalEditVisible(false)
        break
    }
  }

  const getDropDownItems = (record: PropertyDataSource): MenuProps['items'] => [
    {
      key: 'view',
      label: t('table.viewDetails'),
      icon: <ExportOutlined />,
      onClick: () => showConfirm(record, ModalName.DETAIL)
    },
    {
      key: 'edit',
      label: t('table.editPost'),
      icon: <EditOutlined />,
      onClick: () => showConfirm(record, ModalName.EDIT)
    },
    {
      key: 'toggle-visibility',
      label: record.hidden ? t('table.showPost') : t('table.hidePost'),
      icon: record.hidden ? <EyeOutlined /> : <EyeInvisibleOutlined />,
      onClick: () => {
        hiddenProperty(record.id).then(() => {
          toast.success(record.hidden ? t('table.toast.success.showPost') : t('table.toast.success.hidePost'))
        })
      }
    },
    {
      type: 'divider'
    },
    {
      key: ModalName.DELETE,
      danger: true,
      label: t('table.deletePost'),
      icon: <DeleteOutlined />,
      onClick: () => showConfirm(record, ModalName.DELETE)
    }
  ]

  const columns = [
    { title: t('table.index'), dataIndex: 'index', key: 'index', width: 60 },
    {
      title: t('table.propertyInfo'),
      dataIndex: 'propertyInfo',
      key: 'propertyInfo',
      render: (_: undefined, record: PropertyDataSource) => (
        <div className='space-y-2'>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-500'>{t('table.title')}:</span>
            <span className='font-semibold text-gray-800'>{record.title}</span>
          </div>
          <div className='flex flex-col md:flex-row md:space-x-6'>
            <div className='flex flex-col'>
              <span className='text-xs text-gray-500'>{t('table.price')}:</span>
              <span className='font-semibold text-gray-800'>{formatCurrency(record.price)}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-xs text-gray-500'>{t('table.address')}:</span>
              <span className='font-semibold text-gray-800'>
                {record.districtName}, {record.cityName}
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: t('table.status'),
      dataIndex: 'blocked',
      key: 'blocked',
      width: 150,
      render: (value: boolean, record: PropertyDataSource) => (
        <div className='space-y-1'>
          <Badge status={value ? 'error' : 'success'} text={value ? t('table.blocked') : t('table.active')} />
          {record.hidden && (
            <Badge
              status='warning'
              text={
                <>
                  {t('table.hidden')}
                  <Tooltip title={t('table.hiddenTooltip')}>
                    <QuestionCircleOutlined className='ml-2 cursor-help text-xs text-gray-500' />
                  </Tooltip>
                </>
              }
            />
          )}
          {record.priority && (
            <Badge
              status='processing'
              text={
                <>
                  {t('table.priority')}
                  <Tooltip title={t('table.priorityTooltip')}>
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
      title: t('table.timeInfo'),
      key: 'timeInfo',
      width: 200,
      render: (_: undefined, record: PropertyDataSource) => (
        <div className='space-y-2'>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-500'>{t('table.createdAt')}:</span>
            <span className='font-semibold text-gray-800'>{formatDate(record.createdAt)}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-500'>{t('table.refreshedAt')}:</span>
            <span className='font-semibold text-gray-800'>{formatDateWithTime(record.refreshedAt)}</span>
          </div>
        </div>
      )
    },
    {
      title: t('table.actions'),
      key: 'action',
      width: 120,
      render: (_: undefined, record: PropertyDataSource) => (
        <div className='space-y-2 md:flex-row md:space-x-2'>
          {record.status === PropertyStatus.APPROVED && (
            <>
              <Tooltip title={t('table.refreshPost')}>
                <Button
                  icon={<ArrowUpOutlined className='text-white' />}
                  size='small'
                  shape='circle'
                  className='border-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 hover:from-purple-600 hover:to-blue-700'
                  onClick={() => showConfirm(record, ModalName.REFRESH)}
                  loading={refreshPropertyIsPending}
                />
              </Tooltip>
              <Tooltip title={t('table.prioritizePost')}>
                <Button
                  icon={<FireOutlined className='text-white' />}
                  size='small'
                  shape='circle'
                  className='border-0 bg-gradient-to-r from-yellow-500 to-red-500 transition-all duration-300 hover:from-red-600 hover:to-yellow-600'
                  onClick={() => showConfirm(record, ModalName.PRIORITY)}
                  loading={prioritizePropertyIsPending}
                />
              </Tooltip>
            </>
          )}

          <Dropdown menu={{ items: getDropDownItems(record) }} trigger={['click']}>
            <Button icon={<MoreOutlined />} size='small' />
          </Dropdown>
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
          pageSizeOptions: ['5', '10', '20'],
          locale: { items_per_page: t('table.itemsPerPage') },
          showSizeChanger: true,
          ...paginationProps
        }}
        locale={{
          triggerDesc: t('table.triggerDesc'),
          triggerAsc: t('table.triggerAsc'),
          cancelSort: t('table.cancelSort')
        }}
      />
      <RefreshConfirmationModal
        isVisible={isModalVisible}
        onConfirm={() => handleConfirm(ModalName.REFRESH)}
        onCancel={() => handleCancel(ModalName.REFRESH)}
        property={selectedProperty}
        isLoading={refreshPropertyIsPending}
      />

      <PriorityConfirmationModal
        isVisible={isModalPriorityVisible}
        onConfirm={() => handleConfirm(ModalName.PRIORITY)}
        onCancel={() => handleCancel(ModalName.PRIORITY)}
        property={selectedProperty}
        isLoading={prioritizePropertyIsPending}
      />

      <PostManagementDeleteConfirmModal
        isVisible={isModalDeleteVisible}
        onConfirm={() => handleConfirm(ModalName.DELETE)}
        onCancel={() => handleCancel(ModalName.DELETE)}
        property={selectedProperty}
        isLoading={selfDeletePropertyIsPending}
      />

      <PostManagementDetailModal
        property={selectedProperty}
        isVisible={isModalDetailVisible}
        onCancel={() => handleCancel(ModalName.DETAIL)}
      />

      <PostManagementEditPropertyModal
        property={selectedProperty}
        isVisible={isModalEditVisible}
        onCancel={() => handleCancel(ModalName.EDIT)}
      />
    </>
  )
}
