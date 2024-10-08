import { useUser } from '@/hooks/useUser.ts'
import { formatJoinedDate } from '@/utils/formatDate.ts'
import { formatPhoneNumberWithSpaces, maskPhoneNumber } from '@/utils/formatPhoneNumber.ts'
import {
  CheckCircleFilled,
  CheckOutlined,
  CopyOutlined,
  PhoneFilled,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Button, Card, Divider, Flex, Space, Tooltip } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropertyDetailFavoriteButton from '@/features/property-detail/PropertyDetailFavoriteButton.tsx'
import { User } from '@/types/user.type.ts'

interface PropertyDetailOwnerDetailProps {
  userId: number | undefined
  propertyId: number
  currentUser: User | null
}

function PropertyDetailOwnerDetail({ userId,currentUser,propertyId }: PropertyDetailOwnerDetailProps) {
  const { userData, userIsLoading } = useUser(userId)

  const [isPhoneNumberVisible, setIsPhoneNumberVisible] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const { t } = useTranslation(['common', 'propertyDetail'])

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
            description={
              <span>
                {t('propertyDetail:ownerDetail.participated')} {formatJoinedDate(userData.createdAt)}
              </span>
            }
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
                    <Tooltip title={t('propertyDetail:ownerDetail.phoneCopy')}>
                      <CopyOutlined />
                    </Tooltip>
                  )
                ) : (
                  t('propertyDetail:ownerDetail.showNumber')
                )}
              </b>
            </Flex>
          </Button>



          <PropertyDetailFavoriteButton id={propertyId} currentUser={currentUser} />

          {/*<Button block icon={<MailOutlined />} size='large' type='primary'>*/}
          {/*  {t('propertyDetail:ownerDetail.sendMessage')}*/}
          {/*</Button>*/}
        </>
      )}
    </Card>
  )
}

export default PropertyDetailOwnerDetail
