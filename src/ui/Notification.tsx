import { BellOutlined, ClockCircleOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Badge, Dropdown, Space } from 'antd'
import { clsx } from 'clsx/lite'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

interface NotificationItem {
  key: string
  message: string
  time: Date
  isSeen: boolean
}

const notificationItems: NotificationItem[] = [
  {
    key: '1',
    message: 'New message received from John Doe',
    time: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    isSeen: false
  },
  {
    key: '2',
    message: 'Your meeting starts in 30 minutes',
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isSeen: true
  },
  {
    key: '3',
    message: 'Project X has been marked as complete',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isSeen: false
  }
]

const NotificationMenu = () => (
  <div className='max-h-96 w-80 overflow-y-auto py-2'>
    <Space direction='vertical' className='w-full' size={0}>
      {notificationItems.map((item) => (
        <div
          key={item.key}
          className={clsx(
            'space-y-2 px-4 py-2 transition-colors duration-200',
            item.isSeen && 'hover:bg-gray-200',
            !item.isSeen && 'bg-blue-50 hover:bg-blue-100'
          )}
        >
          <div className='flex items-center justify-between'>
            <p className={clsx('my-0 text-sm', !item.isSeen && 'font-semibold')}>{item.message}</p>
            {!item.isSeen && <Badge status='processing' />}
          </div>
          <p className='my-0 text-xs text-gray-500'>
            <ClockCircleOutlined /> {formatDistanceToNow(item.time, { addSuffix: true, locale: vi })}
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
        <div className='w-full text-right'>
          <span className='text-xs text-blue-500 hover:underline'>Đánh dấu tất cả đã đọc</span>
        </div>
      ),
      className: 'hover:bg-white'
    },
    {
      key: 'notifications',
      label: <NotificationMenu />,
      className: 'hover:bg-white'
    }
  ]
}

const NotificationDropdown = () => {
  const unreadCount = notificationItems.filter((item) => !item.isSeen).length

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

export default NotificationDropdown
