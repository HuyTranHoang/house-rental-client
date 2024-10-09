import CustomBreadcrumbs from '@/components/CustomBreadcrumbs'
import ROUTER_NAMES from '@/constant/routerNames'
import { useUserMembership } from '@/hooks/useUserMembership.ts'
import axiosInstance from '@/inteceptor/axiosInstance'
import useAuthStore from '@/store/authStore.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { calculateMembershipRemainingDays } from '@/utils/formatDate.ts'
import { formatPhoneNumberWithDashes } from '@/utils/formatPhoneNumber'
import {
  ClockCircleOutlined,
  CrownOutlined,
  FireOutlined,
  IdcardOutlined,
  LoadingOutlined,
  LockOutlined,
  LogoutOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  ReadOutlined,
  ReloadOutlined,
  StarOutlined,
  UserOutlined,
  WalletOutlined
} from '@ant-design/icons'
import {
  Avatar,
  Card,
  Col,
  Collapse,
  ConfigProvider,
  Divider,
  Menu,
  MenuProps,
  Progress,
  ProgressProps,
  Row,
  Skeleton,
  Tooltip,
  Typography,
  Upload,
  UploadProps
} from 'antd'
import { CollapseProps } from 'antd/lib'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const { Text, Title } = Typography

type MenuItem = Required<MenuProps>['items'][number]

const twoColors: ProgressProps['strokeColor'] = {
  '0%': '#108ee9',
  '100%': '#87d068'
}

type FileType = Parameters<NonNullable<UploadProps['beforeUpload']>>[0]

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    toast.error('Chỉ có thể up hình ảnh với định dạng JPG/PNG!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    toast.error('Dung lượng ảnh tối đa là 2MB!')
  }
  return isJpgOrPng && isLt2M
}

export default function ProfileLayout() {
  const navigate = useNavigate()
  const currentUser = useAuthStore((state) => state.user)
  const { data: membership, isLoading: memberShipIsLoading } = useUserMembership(currentUser?.id)
  const logout = useAuthStore((state) => state.logout)
  const updateProfile = useAuthStore((state) => state.updateProfile)
  const { t } = useTranslation()

  const location = useLocation()
  const currentPath = location.pathname

  const remainingDays = calculateMembershipRemainingDays(membership)

  const items: MenuItem[] = [
    {
      key: ROUTER_NAMES.FAVORITE,
      label: t('navbar.favoriteProperties'),
      icon: <StarOutlined />
    },
    {
      key: ROUTER_NAMES.TRANSACTION_HISTORY,
      label: t('navbar.transactionHistory'),
      icon: <ReadOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: ROUTER_NAMES.PROFILE,
      label: t('navbar.personalInfo'),
      icon: <IdcardOutlined />
    },
    {
      key: ROUTER_NAMES.CHANGE_PASSWORD,
      label: t('personalInfo.changePassword'),
      icon: <LockOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: 'dangXuat',
      label: t('navbar.logout'),
      icon: <LogoutOutlined />,
      danger: true
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'dangXuat') {
      logout()
      navigate(ROUTER_NAMES.RENT_HOUSE)
      localStorage.removeItem('jwtToken')
      axiosInstance.post('/api/auth/logout', {}, { withCredentials: true }).then(() => {
        toast.success(t('toast.logoutSuccess'))
      })
    } else {
      navigate(key)
    }
  }

  const [loading, setLoading] = useState(false)

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, () => {
        updateProfile(info.file.response)
        setLoading(false)
        toast.success(t('toast.updateAvatarSuccess'))
      })
    }
    if (info.file.status === 'error') {
      setLoading(false)
      toast.error(t('toast.updateAvatarFailed'))
    }
  }

  const uploadButton = (
    <button className='border-0 bg-transparent' type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className='mt-2'>Upload</div>
    </button>
  )

  const collapseItems: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <>
          <CrownOutlined className='mr-2 text-lg text-yellow-500' />
          <Text>
            {t('personalInfo.accountType.type')}: <strong>{membership?.membershipName}</strong>
          </Text>
        </>
      ),
      children: membership && (
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Text>
              <ClockCircleOutlined className='mr-2' />
              {t('personalInfo.accountType.remainingTerm')}:
            </Text>
            {remainingDays <= 0 && <Text className='text-xl font-semibold'>∞</Text>}
            {remainingDays > 0 && (
              <Text strong>
                {remainingDays} {t('personalInfo.accountType.days')}
              </Text>
            )}
          </div>
          {remainingDays <= 0 && <Progress strokeColor={twoColors} percent={100} showInfo={false} />}
          {remainingDays > 0 && (
            <Progress strokeColor={twoColors} percent={Math.round((remainingDays / 30) * 100)} showInfo={false} />
          )}
          <div className='flex items-center justify-between'>
            <Text>
              <ReloadOutlined className='mr-2' />
              {t('personalInfo.accountType.refeshCount')}:
            </Text>
            <Text strong>
              {membership.totalRefreshLimit - membership.refreshesPostsUsed}/{membership.totalRefreshLimit}
            </Text>
          </div>
          <Progress
            strokeColor={twoColors}
            percent={Math.round(
              ((membership.totalRefreshLimit - membership.refreshesPostsUsed) / membership.totalRefreshLimit) * 100
            )}
            showInfo={false}
          />
          <div className='flex items-center justify-between'>
            <Text>
              <FireOutlined className='mr-2' />
              {t('personalInfo.accountType.priorityCount')}:
            </Text>
            <Text strong>
              {membership.totalPriorityLimit - membership.priorityPostsUsed}/{membership.totalPriorityLimit}
            </Text>
          </div>
          <Progress
            strokeColor={twoColors}
            percent={Math.round(
              ((membership.totalPriorityLimit - membership.priorityPostsUsed) / membership.totalPriorityLimit) * 100
            )}
            showInfo={false}
          />
        </div>
      )
    }
  ]

  return (
    <Row gutter={24}>
      <Col span={24}>
        <div className='mb-4 mt-8'>
          <CustomBreadcrumbs />
        </div>
      </Col>
      <Col xs={0} md={8} lg={6} className='mb-12 bg-white p-0 shadow-md'>
        <Card className='rounded-none'>
          <div className='flex flex-col items-center'>
            <div className='flex justify-center'>
              <Tooltip title={loading ? t('personalInfo.updating') : t('personalInfo.changeAvatar')}>
                <Upload
                  name='avatar'
                  action='/api/user/update-avatar'
                  method='PUT'
                  headers={{ Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }}
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  className='cursor-pointer hover:opacity-80'
                >
                  {!loading && currentUser ? (
                    <>
                      {currentUser.avatarUrl ? (
                        <Avatar size={96} src={currentUser.avatarUrl} className='cursor-pointer' />
                      ) : (
                        <Avatar size={96} icon={<UserOutlined />} />
                      )}
                    </>
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Tooltip>
            </div>
            {currentUser && (
              <>
                <div className='my-4 text-center'>
                  <Title level={4} className='m-0'>
                    {`${currentUser.lastName} ${currentUser.firstName}`}
                  </Title>
                  <Text type='secondary'>@{currentUser.username}</Text>
                </div>
                <Divider className='m-0 mb-4' />
                <div className='w-full space-y-3'>
                  <div className='flex items-center'>
                    <PhoneOutlined className='mr-2 text-lg text-gray-500' />
                    <Text>{formatPhoneNumberWithDashes(currentUser.phoneNumber)}</Text>
                  </div>
                  <div className='flex items-center'>
                    <MailOutlined className='mr-2 text-lg text-gray-500' />
                    <Text>{currentUser.email}</Text>
                  </div>
                  <div className='flex items-center'>
                    <WalletOutlined className='mr-2 text-lg text-gray-500' />
                    <Text>
                      {t('personalInfo.accountBalance')}: {formatCurrency(currentUser.balance)}
                    </Text>
                  </div>
                  <Divider className='m-0 mb-4' />
                  {memberShipIsLoading && <Skeleton />}
                  {membership && (
                    <>
                      <ConfigProvider
                        theme={{
                          components: {
                            Collapse: {
                              headerPadding: '0',
                              contentPadding: '0'
                            }
                          }
                        }}
                      >
                        <Collapse items={collapseItems} ghost expandIconPosition='end' />
                      </ConfigProvider>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </Card>
        <Menu onClick={onClick} selectedKeys={[currentPath]} mode='inline' items={items} />
      </Col>
      <Col xs={24} md={16} lg={18}>
        <Outlet />
      </Col>
    </Row>
  )
}
