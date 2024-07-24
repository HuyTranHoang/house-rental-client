import { Avatar, Breadcrumb, Card, Col, Menu, MenuProps, Row, Space } from 'antd'
import {
  HomeOutlined,
  IdcardOutlined,
  LockOutlined,
  LogoutOutlined,
  ReadOutlined,
  StarOutlined, UserOutlined
} from '@ant-design/icons'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectAuth } from '../features/auth/authSlice.js'
import { toast } from 'sonner'
import { selectMenu, selectProfile } from '../features/profile/profileSlice.ts'


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
              title: <Link to="/profile" onClick={() => dispatch(selectMenu(['thongTinCaNhan']))}>
                Thông tin cá nhân</Link>
            }
          ]}
        />
      </Col>
      <Col span={6}>
        <Card style={{ width: 256, borderRadius: 0, borderLeft: 'none' }}>
          <Space wrap size={16}>
            <Avatar size={64} icon={<UserOutlined />} />
            <Space direction="vertical">
              <div>{user!.lastName} {user!.firstName}</div>
              <div>
                <a href="/profile">Xem trang cá nhân</a>
              </div>
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
