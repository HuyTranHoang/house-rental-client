import ROUTER_NAMES from '@/constant/routerNames.ts'
import { logout, selectAuth } from '@/features/auth/authSlice.js'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { useAppDispatch } from '@/store.ts'
import {
  CreditCardOutlined,
  DollarOutlined,
  FormOutlined,
  HeartOutlined,
  HistoryOutlined,
  HomeOutlined,
  MailOutlined,
  MenuOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Button, Col, Divider, Drawer, Dropdown, Flex, List, MenuProps, Row, Space, Typography } from 'antd'
import { clsx } from 'clsx/lite'
import { useState } from 'react'
import { useSelector } from 'react-redux'
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

function Navbar() {
  const { user } = useSelector(selectAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const navData = [
    {
      key: ROUTER_NAMES.RENT_HOUSE,
      label: (
        <Link to={ROUTER_NAMES.RENT_HOUSE} className='font-medium'>
          Tìm thuê
        </Link>
      ),
      icon: <HomeOutlined className='text-xl' />
    },
    {
      key: ROUTER_NAMES.MEMBERSHIP_FEE,
      label: (
        <Link to={ROUTER_NAMES.MEMBERSHIP_FEE} className='font-medium'>
          Phí thành viên
        </Link>
      ),
      icon: <CreditCardOutlined className='text-xl' />
    },
    {
      key: ROUTER_NAMES.TOP_UP,
      label: (
        <Link to={ROUTER_NAMES.TOP_UP} className='font-medium'>
          Nạp tiền
        </Link>
      ),
      icon: <DollarOutlined className='text-xl' />
    },
    {
      key: ROUTER_NAMES.PROFILE,
      label: (
        <Link to={ROUTER_NAMES.PROFILE} className='font-medium'>
          Thông tin cá nhân
        </Link>
      ),
      icon: <UserOutlined className='text-xl' />
    },
    {
      key: ROUTER_NAMES.TRANSACTION_HISTORY,
      label: (
        <Link to={ROUTER_NAMES.TRANSACTION_HISTORY} className='font-medium'>
          Lịch sử giao dịch
        </Link>
      ),
      icon: <HistoryOutlined className='text-xl' />
    },
    {
      key: ROUTER_NAMES.FAVORITE,
      label: (
        <Link to={ROUTER_NAMES.FAVORITE} className='font-medium'>
          Bất động sản yêu thích
        </Link>
      ),
      icon: <HeartOutlined className='text-xl' />
    },
    {
      key: ROUTER_NAMES.FAVORITE,
      label: (
        <Link to={ROUTER_NAMES.FAVORITE} className='font-medium'>
          Đăng tin
        </Link>
      ),
      icon: <FormOutlined className='text-xl' />
    }
  ]

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
      navigate(ROUTER_NAMES.RENT_HOUSE)
      localStorage.removeItem('jwtToken')
      axiosInstance.post('/api/auth/logout', {}, { withCredentials: true }).then(() => {
        toast.success('Đăng xuất thành công')
      })
    }
  }

  return (
    <Flex justify='space-between' align='center' className='h-16 text-[#4E4E4E]'>
      <Link to={ROUTER_NAMES.RENT_HOUSE} className='flex'>
        <img className='my-auto w-32' src='/logo.webp' alt='Logo' />
      </Link>
      {/*Mobile*/}
      <MenuOutlined onClick={() => setOpen(true)} className='mr-2 text-xl md:hidden' />
      <Drawer title='Menu' onClose={() => setOpen(false)} open={open}>
        <Row gutter={12}>
          <Col span={12}>
            <Button className='border-blue-500 text-blue-500' block>
              Đăng nhập
            </Button>
          </Col>
          <Col span={12}>
            <Button type='primary' block>
              Đăng ký
            </Button>
          </Col>
          <Col span={24} className='mt-4'>
            <List
              itemLayout='horizontal'
              dataSource={navData}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta avatar={item.icon} title={item.label} />
                </List.Item>
              )}
            />
          </Col>
          <Col span={24} className='mt-4'>
            <Button danger block>
              Đăng xuất
            </Button>
          </Col>
        </Row>
      </Drawer>
      {/*Desktop*/}
      <Flex className='hidden md:flex' gap='small' wrap>
        <NavItem title='TEST - DEV ONLY' link={ROUTER_NAMES.TEST} />

        <NavItem title='Tìm thuê' link={ROUTER_NAMES.RENT_HOUSE} />

        <NavItem title='Phí thành viên' link={ROUTER_NAMES.MEMBERSHIP_FEE} />

        {user && (
          <>
            <NavItem title='Nạp tiền' link={ROUTER_NAMES.TOP_UP} />

            <NavItem title='Mã thưởng' link={ROUTER_NAMES.PROMOTION} />

            <NavItem title='Tin nhắn' link={ROUTER_NAMES.MESSAGE} />

            <Divider type='vertical' style={{ height: '2rem' }} />

            <MailOutlined className='text-slate-600' />

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

        <Button className='border-blue-500 font-semibold'>Đăng Tin</Button>
      </Flex>
    </Flex>
  )
}

export default Navbar
