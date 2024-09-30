import { useNotificationByUserId } from '@/hooks/useNotification.ts'
import useAuthStore from '@/store/authStore.ts'
import { BellOutlined, CheckOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Badge, Dropdown, MenuProps, Skeleton, Space } from 'antd'
import { clsx } from 'clsx/lite'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

function Notification() {
  const currentUser = useAuthStore((state) => state.user)

  const { notificationData, notificationIsloading } = useNotificationByUserId(currentUser?.id)

  if (notificationIsloading) {
    return <Skeleton />
  }

  const NotificationMenu = () => (
    <div className='max-h-96 w-80 overflow-y-auto py-2'>
      <Space direction='vertical' className='w-full' size={0}>
        {notificationData &&
          notificationData.map((item) => (
            <div
              key={item.id}
              className={clsx(
                'space-y-2 px-4 py-2 transition-colors duration-200',
                item.seen && 'hover:bg-gray-200',
                !item.seen && 'bg-blue-50 hover:bg-blue-100'
              )}
            >
              <div className='flex items-start justify-between'>
                <p className='my-0 text-wrap text-sm'>
                  <span className='text-blue-500'>@{item.senderUsername}</span> đã bình luận tin đăng{' '}
                  <span className='font-semibold'>{item.propertyTitle}</span> của bạn
                </p>
                {!item.seen && <Badge className='px-2' status='processing' />}
              </div>
              <p className='my-0 text-xs text-gray-500'>
                <ClockCircleOutlined /> {formatDistanceToNow(item.createdAt, { addSuffix: true, locale: vi })}
              </p>
            </div>
          ))}
      </Space>
    </div>
  )

  const menuProps: MenuProps = {
    items: [
      {
        key: 'mark-all-as-read',
        label: (
          <div className='w-full pt-1 text-right text-xs text-blue-500'>
            <CheckOutlined /> <span className='hover:underline'>Đánh dấu tất cả đã đọc</span>
          </div>
        ),
        className: 'hover:bg-white'
      },
      {
        type: 'divider'
      },
      {
        key: 'notifications',
        label: <NotificationMenu />,
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
