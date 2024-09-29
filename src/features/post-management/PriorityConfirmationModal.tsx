import { PropertyDataSource } from '@/types/property.type'
import { ArrowUpOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Tooltip } from 'antd'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

interface PriorityConfirmationModalProps {
  isVisible: boolean
  onConfirm: () => void
  onCancel: () => void
  property: PropertyDataSource | null
  isLoading: boolean
}

function PriorityConfirmationModal({
  isVisible,
  onConfirm,
  onCancel,
  property,
  isLoading
}: PriorityConfirmationModalProps) {
  if (!property) return null

  const priorityExpiration = new Date(property.priorityExpiration)
  const isEpoch = priorityExpiration.getTime() === new Date('1970-01-01T00:00:00Z').getTime()

  const lastPriorityExpiration = isEpoch
    ? 'Không xác định'
    : formatDistanceToNow(priorityExpiration, { addSuffix: true, locale: vi })

  return (
    <Modal
      title={
        <div className='flex flex-col items-center'>
          <div className='flex size-10 items-center justify-center rounded-full bg-yellow-50'>
            <ExclamationCircleOutlined className='text-2xl text-yellow-400' />
          </div>
          <span className='font-semibold'>Xác nhận ưu tiên bài đăng</span>
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
          Bạn muốn ưu tiên bài đăng '<span className='font-semibold text-blue-500'>{property.title}</span>' ?
        </h3>

        <div className='rounded-lg bg-gray-50 p-4'>
          <div className='mb-3 flex items-center text-sm text-gray-600'>
            <ClockCircleOutlined className='mr-2' />
            Lần sử dụng ưu tiên cuối cùng: {lastPriorityExpiration}
          </div>
          <div className='space-y-2 text-sm'>
            <div className='flex items-start'>
              <ArrowUpOutlined className='mr-2 mt-1 text-green-500' />
              <span>Bài đăng sẽ được hiển thị nổi bật lên đầu trang chủ</span>
            </div>
            <div className='flex items-start'>
              <ArrowUpOutlined className='mr-2 mt-1 text-green-500' />
              <span>Tăng khả năng tiếp cận cao với tất cả người dùng</span>
            </div>

            <div className='flex items-start'>
              <span className='ml-6'>Thời gian ưu tiên: 2 ngày/ lần dùng</span>
            </div>
          </div>
        </div>

        <div className='text-xs text-gray-500'>
          <Tooltip
            title={
              <ul className='m-0 list-inside list-disc p-0'>
                <li>Bài đăng sẽ được hiển thị nổi bật lên đầu trang chủ</li>
                <li>Không thể hủy bỏ sau khi xác nhận ưu tiên</li>
                <li>Ưu tiên bài đăng sẽ tốn một lượt ưu tiên, vui lòng kiểm tra trong trang 'thông tin cá nhân'</li>
              </ul>
            }
          >
            <span className='cursor-help underline'>Lưu ý về chính sách ưu tiên</span>
          </Tooltip>
        </div>

        <div className='flex justify-end space-x-4'>
          <Button disabled={isLoading} onClick={onCancel}>
            Hủy
          </Button>
          <Button loading={isLoading} type='primary' onClick={onConfirm} className='bg-blue-500 hover:bg-blue-600'>
            Xác nhận ưu tiên
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default PriorityConfirmationModal
