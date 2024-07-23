import { Avatar, Card, Col, Menu, Row, Space } from 'antd'
import {
  IdcardOutlined,
  LockOutlined,
  LogoutOutlined,
  ReadOutlined,
  StarOutlined, UserOutlined
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice.js'
import { toast } from 'sonner'


const items = [
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

function ProfileLayout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const location = useLocation()
  const currentPath = location.pathname
  const defaultSelectedKeys = [currentPath.split('/').pop()][0] === 'profile' ? ['thongTinCaNhan'] : [currentPath.split('/').pop()]

  const onClick = ({ key }) => {
    switch (key) {
      case 'dangXuat':
        localStorage.removeItem('jwtToken')
        dispatch(logout())
        navigate('/')
        toast.success('Đăng xuất thành công')
        break
      case 'thongTinCaNhan':
        navigate('/profile')
        break
      default:
        navigate(`/profile/${key}`)
    }
  }

  return (
    <Row>
      <Col span={8}>
        <Card style={{ width: 256, marginTop: '2rem', borderRadius: 0, borderLeft: 'none' }}>
          <Space wrap size={16}>
            <Avatar size={64} icon={<UserOutlined />} />
          </Space>
        </Card>
        <Menu
          onClick={onClick}
          style={{ width: 256, marginBottom: '3rem' }}
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          items={items}
        />
      </Col>
      <Col span={16}>
        <Outlet />
      </Col>
    </Row>
  )
}

export default ProfileLayout
