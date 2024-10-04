import { PropertyDataSource } from '@/types/property.type'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal, Typography } from 'antd'

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
  return (
    <>
      {property && (
        <Modal
          centered
          title={
            <div className='flex flex-col items-center'>
              <div className='flex size-10 items-center justify-center rounded-full bg-red-50'>
                <ExclamationCircleOutlined className='text-2xl text-red-400' />
              </div>
              <span className='font-semibold'>Xác nhận xóa bài đăng</span>
            </div>
          }
          open={isVisible}
          onOk={onConfirm}
          onCancel={onCancel}
          okText='Xóa bài đăng'
          cancelText='Quay lại'
          okButtonProps={{
            className: 'bg-red-500 hover:bg-red-400 hover:border-red-600',
            loading: isLoading
          }}
          cancelButtonProps={{ disabled: isLoading }}
        >
          <Typography.Paragraph className='mb-1 mt-2'>
            Bạn có chắc chắn muốn xóa bài đăng '<span className='font-semibold text-blue-500'>{property.title}</span>'?
          </Typography.Paragraph>

          <Typography.Paragraph className='mb-0 text-gray-500'>
            Lưu ý, hành động này không thể hoàn tác.
          </Typography.Paragraph>
        </Modal>
      )}
    </>
  )
}

export default PostManagementDeleteConfirmModal
