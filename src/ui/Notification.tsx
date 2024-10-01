import ROUTER_NAMES from '@/constant/routerNames.ts'
import {
  useMarkAllNotificationAsRead,
  useNotificationByUserId,
  useUpdateNotificationSeen
} from '@/hooks/useNotification.ts'
import useAuthStore from '@/store/authStore.ts'
import {
  Notification as NotificationType,
  NotificationType as NotificationTypeEnum
} from '@/types/notification.type.ts'
import { formatDistanceToNowISO } from '@/utils/formatDate.ts'
import { generateSlug } from '@/utils/generateSlug.ts'
import { BellOutlined, CheckOutlined, ClockCircleOutlined, DownOutlined } from '@ant-design/icons'
import { Badge, Button, Dropdown, DropdownProps, Flex, MenuProps, Skeleton, Space, Typography } from 'antd'
import { clsx } from 'clsx/lite'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Notification() {
  const navigate = useNavigate()
  const currentUser = useAuthStore((state) => state.user)
  const [openNotification, setOpenNotification] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const prevScrollHeightRef = useRef<number>(0)

  const { notificationData, notificationIsLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotificationByUserId(currentUser?.id, 5)
  const { updateNotificationSeen } = useUpdateNotificationSeen()
  const { markAllNotificationAsRead } = useMarkAllNotificationAsRead()

  useEffect(() => {
    if (scrollRef.current && firstLoad && notificationData) {
      const scrollContainer = scrollRef.current
      scrollContainer.scrollTop = 0
      prevScrollHeightRef.current = scrollContainer.scrollHeight
      setFirstLoad(false)
      return
    }

    if (scrollRef.current && !isFetchingNextPage) {
      const scrollContainer = scrollRef.current
      scrollContainer.scrollTop = scrollContainer.scrollHeight - prevScrollHeightRef.current
    }
  }, [notificationData, isFetchingNextPage, firstLoad])

  const handleClickNotification = (item: NotificationType) => {
    updateNotificationSeen(item.id)

    if (item.type === NotificationTypeEnum.COMMENT) {
      const slug = generateSlug(item.propertyTitle, item.propertyId)
      navigate(ROUTER_NAMES.getRentHouseDetail(slug))
    } else {
      navigate(ROUTER_NAMES.POST_MANAGEMENT)
    }
  }

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpenNotification(nextOpen)
    }
  }

  const handleLoadMore = () => {
    if (scrollRef.current) {
      prevScrollHeightRef.current = scrollRef.current.scrollHeight
    }
    fetchNextPage()
  }

  const NotificationMenu = () => (
    <div ref={scrollRef} className='max-h-96 w-80 overflow-y-auto py-2'>
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
                {item.type === NotificationTypeEnum.COMMENT && (
                  <p className='my-0 text-wrap text-sm'>
                    <span className='text-blue-500'>@{item.senderUsername}</span> đã bình luận tin đăng{' '}
                    <span className='font-semibold'>{item.propertyTitle}</span> của bạn
                  </p>
                )}
                {item.type === NotificationTypeEnum.APPROVED && (
                  <p className='my-0 text-wrap text-sm'>
                    Tin đăng <span className='font-semibold'>{item.propertyTitle}</span> của bạn đã được duyệt
                  </p>
                )}
                {item.type === NotificationTypeEnum.REJECTED && (
                  <p className='my-0 text-wrap text-sm'>
                    Tin đăng <span className='font-semibold'>{item.propertyTitle}</span> của bạn đã bị từ chối
                  </p>
                )}
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

  const menuProps: MenuProps = {
    items: [
      {
        key: 'mark-all-as-read',
        label: (
          <Flex>
            <Typography.Title level={5} className='m-0 grow p-0'>
              Thông báo
            </Typography.Title>
            <Button
              type='link'
              icon={<CheckOutlined />}
              size='small'
              className='text-xs'
              onClick={() => (currentUser ? markAllNotificationAsRead(currentUser.id) : undefined)}
            >
              Đánh dấu tất cả đã đọc
            </Button>
          </Flex>
        ),
        className: 'hover:bg-white cursor-default'
      },
      {
        type: 'divider'
      },
      {
        key: 'notifications',
        label: notificationIsLoading ? <Skeleton /> : <NotificationMenu />,
        className: 'hover:bg-white'
      }
    ]
  }

  const unreadCount = notificationData ? notificationData.filter((item) => !item.seen).length : 0

  return (
    <Dropdown
      menu={menuProps}
      placement='bottomRight'
      arrow={{
        pointAtCenter: true
      }}
      onOpenChange={handleOpenChange}
      open={openNotification}
      trigger={['click']}
      className='mt-2'
    >
      <Badge count={unreadCount} className='cursor-pointer' size='small'>
        <BellOutlined className='text-xl text-slate-600' />
      </Badge>
    </Dropdown>
  )
}

export default Notification
