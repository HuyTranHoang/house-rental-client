import { useMarkAllNotificationAsRead, useNotificationByUserId } from '@/hooks/useNotification.ts'
import useAuthStore from '@/store/authStore.ts'
import NotificationMenu from '@/ui/NotificationMenu.tsx'
import { BellOutlined, CheckOutlined } from '@ant-design/icons'
import { Badge, Button, Dropdown, DropdownProps, Flex, MenuProps, Typography } from 'antd'
import { useState } from 'react'

function Notification() {
  const currentUser = useAuthStore((state) => state.user)
  const [openNotification, setOpenNotification] = useState(false)
  const { notificationData } = useNotificationByUserId(currentUser?.id, 5)

  const { markAllNotificationAsRead } = useMarkAllNotificationAsRead()

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpenNotification(nextOpen)
    }
  }

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
        label: <NotificationMenu currentUser={currentUser} />,
        className: 'hover:bg-white'
      }
    ]
  }

  const countUnseen = notificationData.reduce((acc, notification) => {
    return acc + (notification.seen ? 0 : 1)
  }, 0)

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
      <Badge count={countUnseen} className='cursor-pointer' size='small'>
        <BellOutlined className='text-xl text-slate-600' />
      </Badge>
    </Dropdown>
  )
}

export default Notification
