import { useUser } from '@/hooks/useUser.ts'
import { formatJoinedDate } from '@/utils/formatDate.ts'
import { formatPhoneNumberWithSpaces, maskPhoneNumber } from '@/utils/formatPhoneNumber.ts'
import {
  CheckCircleFilled,
  CheckOutlined,
  CopyOutlined,
  MailOutlined,
  PhoneFilled,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Button, Card, Divider, Flex, Space, Tooltip } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useState } from 'react'

interface PropertyDetailOwnerDetailProps {
  userId: number | undefined
}

function PropertyDetailOwnerDetail({ userId }: PropertyDetailOwnerDetailProps) {
  const { userData, userIsLoading } = useUser(userId)

  const [isPhoneNumberVisible, setIsPhoneNumberVisible] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleShowPhoneNumber = () => {
    if (!isPhoneNumberVisible) {
      setIsPhoneNumberVisible(true)
    } else {
      navigator.clipboard.writeText(userData!.phoneNumber)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }

  return (
    <Card loading={userIsLoading}>
      {userData && (
        <>
          <Meta
            avatar={
              <Flex align='center' justify='center' className='mr-2 h-full'>
                {userData.avatarUrl ? (
                  <Avatar size='large' src={userData.avatarUrl} />
                ) : (
                  <Avatar size='large' icon={<UserOutlined />} />
                )}
              </Flex>
            }
            title={
              <Space>
                <span>
                  {userData.firstName} {userData.lastName}
                </span>
                <CheckCircleFilled className='text-blue-400' />
              </Space>
            }
            description={<span>Đã tham gia: {formatJoinedDate(userData.createdAt)}</span>}
          />
          <Divider className='m-3' />

          <Button block size='large' onClick={handleShowPhoneNumber} className='mb-2 border-blue-400'>
            <Flex justify='space-between' className='w-full'>
              <span>
                <PhoneFilled />{' '}
                {isPhoneNumberVisible
                  ? formatPhoneNumberWithSpaces(userData.phoneNumber)
                  : maskPhoneNumber(userData.phoneNumber)}
              </span>
              <b className='text-blue-500'>
                {isPhoneNumberVisible ? (
                  isCopied ? (
                    <CheckOutlined />
                  ) : (
                    <Tooltip title='Sao chép số điện thoại'>
                      <CopyOutlined />
                    </Tooltip>
                  )
                ) : (
                  'Bấm để hiện số'
                )}
              </b>
            </Flex>
          </Button>

          <Button block icon={<MailOutlined />} size='large' type='primary'>
            Gửi tin nhắn
          </Button>
        </>
      )}
    </Card>
  )
}

export default PropertyDetailOwnerDetail
