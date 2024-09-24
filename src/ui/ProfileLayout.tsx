import CustomBreadcrumbs from '@/components/CustomBreadcrumbs'
import ROUTER_NAMES from '@/constant/routerNames'
import useAuthStore from '@/features/auth/authStore'
import { useMemberships } from '@/hooks/useMembership.ts'
import { useUserMembership } from '@/hooks/useUserMembership.ts'
import axiosInstance from '@/inteceptor/axiosInstance'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { formatPhoneNumberWithDashes } from '@/utils/formatPhoneNumber'
import {
  ClockCircleOutlined,
  CrownOutlined,
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
  Divider,
  Menu,
  MenuProps,
  Progress,
  ProgressProps,
  Row,
  Tooltip,
  Typography,
  Upload,
  UploadProps
} from 'antd'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { calculateMembershipRemainingDays } from '@/utils/formatDate.ts'

const { Text, Title } = Typography

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: ROUTER_NAMES.FAVORITE,
    label: 'Bất động sản yêu thích',
    icon: <StarOutlined />
  },
  {
    key: ROUTER_NAMES.TRANSACTION_HISTORY,
    label: 'Lịch sử giao dịch',
    icon: <ReadOutlined />
  },
  {
    type: 'divider'
  },
  {
    key: ROUTER_NAMES.PROFILE,
    label: 'Thông tin cá nhân',
    icon: <IdcardOutlined />
  },
  {
    key: ROUTER_NAMES.CHANGE_PASSWORD,
    label: 'Thay đổi mật khẩu',
    icon: <LockOutlined />
  },
  {
    type: 'divider'
  },
  {
    key: 'dangXuat',
    label: 'Đăng xuất',
    icon: <LogoutOutlined />,
    danger: true
  }
]

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
  const { data: membership } = useUserMembership(currentUser?.id)
  const { membershipData } = useMemberships()
  const logout = useAuthStore((state) => state.logout)
  const updateProfile = useAuthStore((state) => state.updateProfile)

  const location = useLocation()
  const currentPath = location.pathname

  const membershipName = membershipData ? membershipData.find((m) => m.id === membership?.id)?.name : 'Đang tải...'
  const remainingDays = calculateMembershipRemainingDays(membership)

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'dangXuat') {
      logout()
      navigate(ROUTER_NAMES.TEST)
      localStorage.removeItem('jwtToken')
      axiosInstance.post('/api/auth/logout', {}, { withCredentials: true }).then(() => {
        toast.success('Đăng xuất thành công')
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
        toast.success('Cập nhật ảnh đại diện thành công!')
      })
    }
    if (info.file.status === 'error') {
      setLoading(false)
      toast.error('Cập nhật ảnh đại diện thất bại!')
    }
  }

  const uploadButton = (
    <button className='border-0 bg-transparent' type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className='mt-2'>Upload</div>
    </button>
  )

  return (
    <Row gutter={24}>
      <Col span={24}>
        <div className='mb-4 mt-8'>
          <CustomBreadcrumbs />
        </div>
      </Col>
      <Col xs={0} md={8} lg={6} className='mb-12 p-0 shadow-md'>
        <Card className='rounded-none'>
          <div className='flex flex-col items-center'>
            <div className='flex justify-center'>
              <Tooltip title={loading ? 'Đang tải lên...' : 'Thay đổi ảnh đại diện'}>
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
                    <Text>Số dư: {formatCurrency(currentUser.balance)}</Text>
                  </div>
                  <Divider className='m-0 mb-4' />
                  {membership && (
                    <>
                      <div className='flex items-center'>
                        <CrownOutlined className='mr-2 text-lg text-yellow-500' />
                        <Text>
                          Loại tài khoản: <strong>{membershipName}</strong>
                        </Text>
                      </div>
                      <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                          <Text>
                            <ClockCircleOutlined className='mr-2' />
                            Thời hạn còn lại:
                          </Text>
                          <Text strong>{remainingDays} ngày</Text>
                        </div>
                        <Progress
                          strokeColor={twoColors}
                          percent={Math.round((remainingDays / 30) * 100)}
                          showInfo={false}
                        />
                        <div className='flex items-center justify-between'>
                          <Text>
                            <ReloadOutlined className='mr-2' />
                            Lượt làm mới:
                          </Text>
                          <Text strong>
                            {membership.totalRefreshLimit - membership.refreshesPostsUsed}/
                            {membership.totalRefreshLimit}
                          </Text>
                        </div>
                        <Progress
                          strokeColor={twoColors}
                          percent={Math.round(
                            ((membership.totalRefreshLimit - membership.refreshesPostsUsed) /
                              membership.totalRefreshLimit) *
                              100
                          )}
                          showInfo={false}
                        />
                      </div>
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
