import CustomBreadcrumbs from '@/components/CustomBreadcrumbs.tsx'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import { logout, selectAuth, updateProfile } from '@/features/auth/authSlice.js'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { formatPhoneNumberWithDashes } from '@/utils/formatPhoneNumber.ts'
import {
  IdcardOutlined,
  LoadingOutlined,
  LockOutlined,
  LogoutOutlined,
  PhoneOutlined,
  PlusOutlined,
  ReadOutlined,
  StarOutlined
} from '@ant-design/icons'
import { Avatar, Card, Col, GetProp, Menu, MenuProps, Row, Space, Tooltip, Upload, UploadProps } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import styled from 'styled-components'

const CustomUpload = styled(Upload)`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

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

// Avatar section

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

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

function ProfileLayout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(selectAuth)

  const location = useLocation()
  const currentPath = location.pathname

  const onClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'dangXuat':
        dispatch(logout())
        navigate(ROUTER_NAMES.TEST)
        localStorage.removeItem('jwtToken')
        axiosInstance.post('/api/auth/logout', {}, { withCredentials: true }).then(() => {
          toast.success('Đăng xuất thành công')
        })
        break
      default:
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
        dispatch(updateProfile(info.file.response))
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
    <button style={{ border: 0, background: 'none' }} type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <Row gutter={12}>
      <Col span={24}>
        <div className='mb-4 mt-8'>
          <CustomBreadcrumbs />
        </div>
      </Col>
      <Col xs={0} md={6} className='mb-10'>
        <Card>
          <Space wrap size={16}>
            <Tooltip title={loading ? 'Đang tải lên...' : 'Thay đổi ảnh đại diện'}>
              <CustomUpload
                name='avatar'
                action='/api/user/update-avatar'
                method='PUT'
                headers={{ Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }}
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {!loading && user && user.avatarUrl ? (
                  <Avatar size={64} src={user.avatarUrl} style={{ cursor: 'pointer' }} />
                ) : (
                  uploadButton
                )}
              </CustomUpload>
            </Tooltip>

            <Space direction='vertical'>
              {user && (
                <>
                  <div className='font-inter font-semibold text-slate-600'>@{user.username}</div>
                  <div>
                    <PhoneOutlined /> {formatPhoneNumberWithDashes(user.phoneNumber)}
                  </div>
                </>
              )}
            </Space>
          </Space>
        </Card>
        <Menu onClick={onClick} selectedKeys={[currentPath]} mode='inline' items={items} />
      </Col>
      <Col xs={24} md={18}>
        <Outlet />
      </Col>
    </Row>
  )
}

export default ProfileLayout
