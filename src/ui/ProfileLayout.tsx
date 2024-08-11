import { Avatar, Breadcrumb, Card, Col, GetProp, Menu, MenuProps, Row, Space, Tooltip, Upload, UploadProps } from 'antd'
import {
  HomeOutlined,
  IdcardOutlined, LoadingOutlined,
  LockOutlined,
  LogoutOutlined, PlusOutlined,
  ReadOutlined,
  StarOutlined
} from '@ant-design/icons'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectAuth, updateProfile } from '../features/auth/authSlice.js'
import { toast } from 'sonner'
import { selectMenu, selectProfile } from '../features/profile/profileSlice.ts'
import { useState } from 'react'
import styled from 'styled-components'

const CustomUpload = styled(Upload)`
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'favorite',
    label: 'Bất động sản yêu thích',
    icon: <StarOutlined />
  },
  {
    key: 'transaction-history',
    label: 'Lịch sử giao dịch',
    icon: <ReadOutlined />
  },
  {
    type: 'divider'
  },
  {
    key: 'thongTinCaNhan',
    label: 'Thông tin cá nhân',
    icon: <IdcardOutlined />
  },
  {
    key: 'change-password',
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

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

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
  const { currentSelectMenu } = useSelector(selectProfile)

  const onClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'dangXuat':
        localStorage.removeItem('jwtToken')
        dispatch(logout())
        navigate('/')
        toast.success('Đăng xuất thành công')
        break
      case 'thongTinCaNhan':
        dispatch(selectMenu(['thongTinCaNhan']))
        navigate('/profile')
        break
      default:
        dispatch(selectMenu([key]))
        navigate(`/profile/${key}`)
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
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )


  return (
    <Row>
      <Col span={24}>
        <Breadcrumb
          style={{ marginTop: '2rem', marginBottom: '1rem' }}
          separator=">"
          items={[
            {
              title: <Link to="/"><HomeOutlined /> Mogu</Link>
            },
            {
              title: <Link to="/profile">Thông tin cá nhân</Link>
            }
          ]}
        />
      </Col>
      <Col span={6}>
        <Card style={{ width: 256, borderRadius: 0, borderLeft: 'none' }}>
          <Space wrap size={16}>

            <Tooltip title={loading ? 'Đang tải lên...' : 'Thay đổi ảnh đại diện'}>
              <CustomUpload
                name="avatar"
                action="/api/user/update-avatar"
                method="PUT"
                headers={{ 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }}
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {!loading && user && user.avatarUrl ?
                  <Avatar size={64} src={user.avatarUrl} style={{ cursor: 'pointer' }} /> : uploadButton}
              </CustomUpload>
            </Tooltip>

            <Space direction="vertical">
              {user && (
                <>
                  <div>{user.lastName} {user.firstName}</div>
                  <div>
                    {user.phoneNumber}
                  </div>
                </>
              )}
            </Space>
          </Space>
        </Card>
        <Menu
          onClick={onClick}
          style={{ width: 256, marginBottom: '3rem' }}
          selectedKeys={currentSelectMenu}
          mode="inline"
          items={items}
        />
      </Col>
      <Col span={18}>
        <Outlet />
      </Col>
    </Row>
  )
}

export default ProfileLayout
