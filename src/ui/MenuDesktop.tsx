import ROUTER_NAMES from '@/constant/routerNames.ts'
import useAuthStore from '@/store/authStore.ts'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { User } from '@/types/user.type.ts'
import { BellOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Divider, Dropdown, Flex, MenuProps, Space, Typography } from 'antd'
import { clsx } from 'clsx'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface NavItemProps {
  title: string
  link: string
}

const NavItem = ({ title, link }: NavItemProps) => (
  <Button type='link'>
    <NavLink
      to={link}
      className={({ isActive }) => clsx('text-base text-gray-700 hover:text-blue-500', isActive && 'font-bold')}
    >
      {title}
    </NavLink>
  </Button>
)

const items: MenuProps['items'] = [
  {
    key: ROUTER_NAMES.PROFILE,
    label: <Link to={ROUTER_NAMES.PROFILE}>Thông tin cá nhân</Link>
  },
  {
    key: ROUTER_NAMES.TRANSACTION_HISTORY,
    label: <Link to={ROUTER_NAMES.TRANSACTION_HISTORY}>Lịch sử giao dịch</Link>
  },
  {
    key: ROUTER_NAMES.FAVORITE,
    label: <Link to={ROUTER_NAMES.FAVORITE}>Bất động sản yêu thích</Link>
  },
  {
    key: ROUTER_NAMES.POST_MANAGEMENT,
    label: <Link to={ROUTER_NAMES.POST_MANAGEMENT}>Quản lý tin đăng</Link>
  },
  {
    type: 'divider'
  },
  {
    key: 'logout',
    danger: true,
    label: 'Đăng xuất'
  }
]

function MenuDesktop({ user }: { user: User | null }) {
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const onClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      logout()
      navigate(ROUTER_NAMES.RENT_HOUSE)
      localStorage.removeItem('jwtToken')
      axiosInstance.post('/api/auth/logout', {}, { withCredentials: true }).then(() => {
        toast.success('Đăng xuất thành công')
      })
    }
  }

  return (
    <Flex className='hidden md:flex' gap='small' wrap>
      <NavItem title='Tìm thuê' link={ROUTER_NAMES.RENT_HOUSE} />

      <NavItem title='Gói thành viên' link={ROUTER_NAMES.MEMBERSHIP_FEE} />

      <NavItem title='Nạp tiền' link={ROUTER_NAMES.TOP_UP} />

      <NavItem title='Về chúng tôi' link={ROUTER_NAMES.ABOUT} />

      <NavItem title='Liên hệ' link={ROUTER_NAMES.CONTACT} />

      {user && (
        <>
          <Divider type='vertical' style={{ height: '2rem' }} />

          <BellOutlined className='text-slate-600' />

          <Button type='link'>
            <Dropdown menu={{ items, onClick }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Typography.Text className='text-base font-semibold text-slate-600'>
                    {user.lastName} {user.firstName}
                  </Typography.Text>

                  {user.avatarUrl && <Avatar size={'small'} src={user.avatarUrl} />}
                  {!user.avatarUrl && <Avatar size={'small'} icon={<UserOutlined />} />}
                </Space>
              </a>
            </Dropdown>
          </Button>
        </>
      )}

      {!user && <NavItem title='Đăng nhập' link={ROUTER_NAMES.LOGIN} />}

      <Button className='group border-blue-500 font-semibold'>
        <Link to={ROUTER_NAMES.POST_PROPERTY} className='group-hover:text-blue-500'>
          Đăng tin
        </Link>
      </Button>
    </Flex>
  )
}

export default MenuDesktop
