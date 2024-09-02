import ColorButton from '@/components/ColorButton.jsx'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import { logout, selectAuth } from '@/features/auth/authSlice.js'
import { selectMenu } from '@/features/profile/profileSlice.ts'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { useAppDispatch } from '@/store.ts'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Divider, Dropdown, Flex, MenuProps, Space, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import styled from 'styled-components'

const CustomImg = styled.img`
  width: 100px;
  height: 31px;
`

interface NavItemProps {
  title: string
  link: string
}

const NavItem = ({ title, link }: NavItemProps) => (
  <Button type='link'>
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? 'text-base font-bold text-gray-700 hover:text-blue-500'
          : 'text-base text-gray-700 hover:text-blue-500'
      }
    >
      {title}
    </NavLink>
  </Button>
)

function Navbar() {
  const { user } = useSelector(selectAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to={ROUTER_NAMES.PROFILE} onClick={() => dispatch(selectMenu(['thongTinCaNhan']))}>
          Thông tin cá nhân
        </Link>
      )
    },
    {
      key: '2',
      label: (
        <Link
          to={ROUTER_NAMES.TRANSACTION_HISTORY}
          onClick={() => dispatch(selectMenu([ROUTER_NAMES.TRANSACTION_HISTORY]))}
        >
          Lịch sử giao dịch
        </Link>
      )
    },
    {
      key: '3',
      label: (
        <Link to={ROUTER_NAMES.FAVORITE} onClick={() => dispatch(selectMenu([ROUTER_NAMES.FAVORITE]))}>
          Bất động sản yêu thích
        </Link>
      )
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

  const onClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      dispatch(logout())
      navigate(ROUTER_NAMES.HOME)
      localStorage.removeItem('jwtToken')
      axiosInstance.post('/api/auth/logout', {}, { withCredentials: true }).then(() => {
        toast.success('Đăng xuất thành công')
      })
    }
  }

  return (
    <>
      <Link to={ROUTER_NAMES.HOME} className='flex'>
        <CustomImg src='/logo.webp' alt='Logo' />
      </Link>
      <Flex gap='small' wrap>
        <NavItem title='Tìm thuê' link={ROUTER_NAMES.RENT_HOUSE} />

        <NavItem title='Phí thành viên' link={ROUTER_NAMES.MEMBERSHIP_FEE} />

        {user && (
          <>
            <NavItem title='Nạp tiền' link={ROUTER_NAMES.TOP_UP} />

            <NavItem title='Mã thưởng' link={ROUTER_NAMES.PROMOTION} />

            <NavItem title='Tin nhắn' link={ROUTER_NAMES.MESSAGE} />

            <Divider type='vertical' style={{ height: '2rem' }} />

            <Button type='link'>
              <Dropdown menu={{ items, onClick }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Typography.Text className='text-base font-semibold'>{user.username}</Typography.Text>

                    {user.avatarUrl && <Avatar size={'small'} src={user.avatarUrl} />}
                    {!user.avatarUrl && <Avatar size={'small'} icon={<UserOutlined />} />}
                  </Space>
                </a>
              </Dropdown>
            </Button>
          </>
        )}

        {!user && <NavItem title='Đăng nhập' link={ROUTER_NAMES.LOGIN} />}

        <ColorButton
          defaultHover='#4096ff'
          borderColor='#4096ff'
          borderHoverColor='#4096ff'
          lineWidth={1}
          fontWeight={'500'}
          type='default'
          className='ml-4'
        >
          Đăng Tin
        </ColorButton>
      </Flex>
    </>
  )
}

export default Navbar
