import { PropertyDataSource } from '@/types/property.type'
import { ArrowUpOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Tooltip } from 'antd'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'

interface RefreshConfirmationModalProps {
  isVisible: boolean
  onConfirm: () => void
  onCancel: () => void
  property: PropertyDataSource | null
  isLoading: boolean
}

function RefreshConfirmationModal({
  isVisible,
  onConfirm,
  onCancel,
  property,
  isLoading
}: RefreshConfirmationModalProps) {
  const { t } = useTranslation('postManagement')

  if (!property) return null

  const refreshedAtDate = new Date(property.refreshedAt)
  const isEpoch = refreshedAtDate.getTime() === new Date('1970-01-01T00:00:00Z').getTime()

  const lastRefreshTime = isEpoch
    ? t('refreshModal.unknown')
    : formatDistanceToNow(refreshedAtDate, { addSuffix: true, locale: vi })

  return (
    <Modal
      title={
        <div className='flex flex-col items-center'>
          <div className='mb-2 flex size-10 items-center justify-center rounded-full bg-blue-50'>
            <ExclamationCircleOutlined className='text-2xl text-blue-500' />
          </div>
          <span className='font-semibold'>{t('refreshModal.confirmTitle')}</span>
        </div>
      }
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      centered
      width={480}
    >
      <div className='space-y-6'>
        <h3 className='mb-2 text-base font-medium'>
          {t('refreshModal.confirmMessage')} '<span className='text-blue-500'>{property.title}</span>' ?
        </h3>

        <div className='rounded-lg bg-gray-50 p-4'>
          <div className='mb-3 flex items-center text-sm text-gray-600'>
            <ClockCircleOutlined className='mr-2' />
            {t('refreshModal.lastRefreshTime')}: {lastRefreshTime}
          </div>
          <div className='space-y-2 text-sm'>
            <div className='flex items-start'>
              <ArrowUpOutlined className='mr-2 mt-1 text-green-500' />
              <span>{t('refreshModal.highlightOnHomepage')}</span>
            </div>
            <div className='flex items-start'>
              <ArrowUpOutlined className='mr-2 mt-1 text-green-500' />
              <span>{t('refreshModal.increaseVisibility')}</span>
            </div>
          </div>
        </div>

        <div className='text-xs text-gray-500'>
          <Tooltip
            title={
              <ul className='m-0 list-inside list-disc p-0'>
                <li>{t('refreshModal.policyHighlight1')}</li>
                <li>{t('refreshModal.policyHighlight2')}</li>
                <li>{t('refreshModal.policyHighlight3')}</li>
              </ul>
            }
          >
            <span className='cursor-help underline'>{t('refreshModal.policyNote')}</span>
          </Tooltip>
        </div>

        <div className='flex justify-end space-x-4'>
          <Button disabled={isLoading} onClick={onCancel}>
            {t('refreshModal.cancel')}
          </Button>
          <Button loading={isLoading} type='primary' onClick={onConfirm} className='bg-blue-500 hover:bg-blue-600'>
            {t('refreshModal.confirm')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default RefreshConfirmationModal
