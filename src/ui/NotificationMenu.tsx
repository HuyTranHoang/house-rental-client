import ROUTER_NAMES from '@/constant/routerNames.ts'
import { useNotificationByUserId, useUpdateNotificationSeen } from '@/hooks/useNotification.ts'
import {
  Notification as NotificationType,
  NotificationType as NotificationTypeEnum
} from '@/types/notification.type.ts'
import { User } from '@/types/user.type.ts'
import { formatDistanceToNowISO } from '@/utils/formatDate.ts'
import { generateSlug } from '@/utils/generateSlug.ts'
import { ClockCircleOutlined, DownOutlined } from '@ant-design/icons'
import { Badge, Button, Skeleton, Space } from 'antd'
import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'

const getNotificationMessage = (item: NotificationType) => {
  const mapTypeToMessage = {
    [NotificationTypeEnum.COMMENT]: () => (
      <>
        <span className='text-blue-500'>@{item.senderUsername}</span> đã bình luận tin đăng{' '}
        <span className='font-semibold'>{item.propertyTitle}</span> của bạn
      </>
    ),
    [NotificationTypeEnum.APPROVED]: () => (
      <>
        Tin đăng <span className='font-semibold'>{item.propertyTitle}</span> của bạn đã được duyệt
      </>
    ),
    [NotificationTypeEnum.REJECTED]: () => (
      <>
        Tin đăng <span className='font-semibold'>{item.propertyTitle}</span> của bạn đã bị từ chối
      </>
    )
  }

  return mapTypeToMessage[item.type]()
}

function NotificationMenu({ currentUser }: { currentUser: User | null }) {
  const navigate = useNavigate()
  const { updateNotificationSeen } = useUpdateNotificationSeen()
  const { notificationData, notificationIsLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotificationByUserId(currentUser?.id, 5)

  const handleClickNotification = (item: NotificationType) => {
    if (!item.seen) updateNotificationSeen(item.id)

    if (item.type === NotificationTypeEnum.COMMENT) {
      const slug = generateSlug(item.propertyTitle, item.propertyId)
      navigate(ROUTER_NAMES.getRentHouseDetail(slug))
    } else {
      navigate(ROUTER_NAMES.POST_MANAGEMENT)
    }
  }

  const handleLoadMore = () => {
    fetchNextPage()
  }

  if (notificationIsLoading) {
    return <Skeleton />
  }

  return (
    <div className='max-h-96 w-80 overflow-y-auto py-2'>
      <Space direction='vertical' className='w-full' size={0}>
        {notificationData &&
          notificationData.map((item) => (
            <div
              key={item.id}
              className={clsx(
                'rounded px-4 py-2 transition-colors duration-200',
                item.seen && 'hover:bg-gray-200',
                !item.seen && 'bg-blue-50 hover:bg-blue-100'
              )}
              onClick={() => handleClickNotification(item)}
            >
              <div className='flex items-start justify-between'>
                <p className='my-0 text-wrap text-sm'>{getNotificationMessage(item)}</p>
                {!item.seen && <Badge className='px-2' status='processing' />}
              </div>
              <p className='mt-1 text-xs text-gray-500'>
                <ClockCircleOutlined /> {formatDistanceToNowISO(item.createdAt)}
              </p>
            </div>
          ))}

        {notificationData && notificationData.length === 0 && (
          <div className='cursor-default text-center text-gray-500'>Không có thông báo mới</div>
        )}

        {hasNextPage && (
          <div className='pt-2 text-center'>
            <Button onClick={handleLoadMore} loading={isFetchingNextPage} icon={<DownOutlined />}>
              Những tin cũ hơn
            </Button>
          </div>
        )}
      </Space>
    </div>
  )
}

export default NotificationMenu
