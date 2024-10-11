import { PropertyDataSource } from '@/types/property.type'
import { WarningOutlined } from '@ant-design/icons'
import { Modal, Typography } from 'antd'
import { Trans, useTranslation } from 'react-i18next'

interface PostManagementDeleteConfirmModalProps {
  isVisible: boolean
  onConfirm: () => void
  onCancel: () => void
  property: PropertyDataSource | null
  isLoading: boolean
}

function PostManagementDeleteConfirmModal({
  isVisible,
  onConfirm,
  onCancel,
  property,
  isLoading
}: PostManagementDeleteConfirmModalProps) {
  const { t } = useTranslation('postManagement')

  return (
    <>
      {property && (
        <Modal
          centered
          title={
            <div className='flex flex-col items-center'>
              <div className='flex size-10 items-center justify-center rounded-full bg-red-50'>
                <WarningOutlined className='text-2xl text-red-400' />
              </div>
              <span className='font-semibold'>{t('deleteModal.deleteConfirmTitle')}</span>
            </div>
          }
          open={isVisible}
          onOk={onConfirm}
          onCancel={onCancel}
          okText={t('deleteModal.deletePost')}
          cancelText={t('deleteModal.goBack')}
          okButtonProps={{
            className: 'bg-red-500 hover:bg-red-400 hover:border-red-600',
            loading: isLoading
          }}
          cancelButtonProps={{ disabled: isLoading }}
        >
          <Typography.Paragraph className='mb-1 mt-10'>
            <Trans
              ns={'postManagement'}
              i18nKey='deleteModal.deleteConfirmMessage'
              values={{ title: property.title }}
              components={[<strong />]}
            />
          </Typography.Paragraph>

          <Typography.Paragraph className='mb-4 text-gray-500'>{t('deleteModal.deleteWarning')}</Typography.Paragraph>
        </Modal>
      )}
    </>
  )
}

export default PostManagementDeleteConfirmModal
