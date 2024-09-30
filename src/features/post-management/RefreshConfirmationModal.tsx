import { PropertyDataSource } from '@/types/property.type'
import { ArrowUpOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Tooltip } from 'antd'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

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
  if (!property) return null

  const refreshedAtDate = new Date(property.refreshedAt)
  const isEpoch = refreshedAtDate.getTime() === new Date('1970-01-01T00:00:00Z').getTime()

  const lastRefreshTime = isEpoch
    ? 'Không xác định'
    : formatDistanceToNow(refreshedAtDate, { addSuffix: true, locale: vi })

  return (
    <Modal
      title={
        <div className='flex flex-col items-center'>
          <div className='flex size-10 items-center justify-center rounded-full bg-yellow-50'>
            <ExclamationCircleOutlined className='text-2xl text-yellow-400' />
          </div>
          <span className='font-semibold'>Xác nhận làm mới bài đăng</span>
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
          Bạn muốn làm mới bài đăng '<span className='font-semibold text-blue-500'>{property.title}</span>' ?
        </h3>

        <div className='rounded-lg bg-gray-50 p-4'>
          <div className='mb-3 flex items-center text-sm text-gray-600'>
            <ClockCircleOutlined className='mr-2' />
            Lần làm mới cuối cùng: {lastRefreshTime}
          </div>
          <div className='space-y-2 text-sm'>
            <div className='flex items-start'>
              <ArrowUpOutlined className='mr-2 mt-1 text-green-500' />
              <span>Bài đăng sẽ được hiển thị lên đầu trang chủ</span>
            </div>
            <div className='flex items-start'>
              <ArrowUpOutlined className='mr-2 mt-1 text-green-500' />
              <span>Tăng khả năng tiếp cận với người dùng mới</span>
            </div>
          </div>
        </div>

        <div className='text-xs text-gray-500'>
          <Tooltip
            title={
              <ul className='m-0 list-inside list-disc p-0'>
                <li>Bài đăng sẽ được hiển thị lên đầu trang chủ</li>
                <li>Không thể hủy bỏ sau khi xác nhận làm mới</li>
                <li>Làm mới bài đăng sẽ tốn một lượt làm mới, vui lòng kiểm tra trong trang 'thông tin cá nhân'</li>
              </ul>
            }
          >
            <span className='cursor-help underline'>Lưu ý về chính sách làm mới</span>
          </Tooltip>
        </div>

        <div className='flex justify-end space-x-4'>
          <Button disabled={isLoading} onClick={onCancel}>
            Hủy
          </Button>
          <Button loading={isLoading} type='primary' onClick={onConfirm} className='bg-blue-500 hover:bg-blue-600'>
            Xác nhận làm mới
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default RefreshConfirmationModal
