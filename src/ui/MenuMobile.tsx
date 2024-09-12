import ROUTER_NAMES from '@/constant/routerNames.ts'
import { logout } from '@/features/auth/authSlice.ts'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { User } from '@/models/user.type.ts'
import { useAppDispatch } from '@/store.ts'
import {
  CreditCardOutlined,
  DollarOutlined,
  FormOutlined,
  HeartOutlined,
  HistoryOutlined,
  HomeOutlined,
  LockOutlined,
  MenuOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Button, Col, Drawer, Flex, List, Row, Typography } from 'antd'
import { clsx } from 'clsx/lite'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const navData = [
  {
    key: ROUTER_NAMES.RENT_HOUSE,
    label: 'Tìm thuê',
    navigate: ROUTER_NAMES.RENT_HOUSE,
    icon: <HomeOutlined className='text-base' />
  },
  {
    key: ROUTER_NAMES.MEMBERSHIP_FEE,
    label: 'Phí thành viên',
    navigate: ROUTER_NAMES.MEMBERSHIP_FEE,
    icon: <CreditCardOutlined className='text-base' />
  },
  {
    key: ROUTER_NAMES.TOP_UP,
    label: 'Nạp tiền',
    navigate: ROUTER_NAMES.TOP_UP,
    icon: <DollarOutlined className='text-base' />
  },
  {
    key: ROUTER_NAMES.TRANSACTION_HISTORY,
    label: 'Lịch sử giao dịch',
    navigate: ROUTER_NAMES.TRANSACTION_HISTORY,
    icon: <HistoryOutlined className='text-base' />
  },
  {
    key: ROUTER_NAMES.FAVORITE,
    label: 'Bất động sản yêu thích',
    navigate: ROUTER_NAMES.FAVORITE,
    icon: <HeartOutlined className='text-base' />
  },
  {
    key: ROUTER_NAMES.FAVORITE,
    label: 'Đăng tin',
    navigate: 'not-found',
    icon: <FormOutlined className='text-base' />
  }
]

const profileData = [
  {
    key: ROUTER_NAMES.PROFILE,
    label: 'Thông tin tài khoản',
    navigate: ROUTER_NAMES.PROFILE,
    icon: <UserOutlined className='text-base' />
  },
  {
    key: ROUTER_NAMES.CHANGE_PASSWORD,
    label: 'Mật khẩu',
    navigate: ROUTER_NAMES.CHANGE_PASSWORD,
    icon: <LockOutlined className='text-base' />
  }
]

function MenuMobile({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const location = useLocation()
  const currentPath = location.pathname

  const filteredNavData = user
    ? navData
    : navData
        .filter((_item, index) => index < 2)
        .concat({
          key: ROUTER_NAMES.FAVORITE,
          label: 'Đăng tin',
          navigate: 'not-found',
          icon: <FormOutlined className='text-base' />
        })

  const loginRegister = (
    <>
      <Col span={12} className='pl-6'>
        <Button
          className='border-blue-500 text-blue-500'
          onClick={() => {
            navigate(ROUTER_NAMES.LOGIN)
            setOpen(false)
          }}
          block
        >
          Đăng nhập
        </Button>
      </Col>
      <Col span={12} className='pr-6'>
        <Button
          type='primary'
          block
          onClick={() => {
            navigate(ROUTER_NAMES.REGISTER)
            setOpen(false)
          }}
        >
          Đăng ký
        </Button>
      </Col>
    </>
  )

  const logoutHandler = () => {
    dispatch(logout())
    navigate(ROUTER_NAMES.RENT_HOUSE)
    localStorage.removeItem('jwtToken')
    axiosInstance.post('/api/auth/logout', {}, { withCredentials: true }).then(() => {
      toast.success('Đăng xuất thành công')
      setOpen(false)
    })
  }

  const logoutComponent = (
    <Col span={24} className='mt-4 px-6'>
      <Button danger block onClick={logoutHandler}>
        Đăng xuất
      </Button>
    </Col>
  )

  return (
    <>
      <MenuOutlined onClick={() => setOpen(true)} className='mr-2 text-xl md:hidden' />
      <Drawer
        title='Menu'
        onClose={() => setOpen(false)}
        open={open}
        classNames={{
          body: 'px-0'
        }}
      >
        <Row gutter={12}>
          {!user && loginRegister}

          {user && (
            <Col span={24} className='mt-4'>
              <Flex align='center' vertical>
                <Link to={ROUTER_NAMES.PROFILE}>
                  <Avatar className='size-24' src={user.avatarUrl} />
                </Link>
                <Typography.Text className='ml-2'>
                  {user.lastName} {user.firstName}
                </Typography.Text>
                <Typography.Text className='ml-2 text-xs text-gray-500'>{user.email}</Typography.Text>
              </Flex>
            </Col>
          )}

          <Col span={24} className='mt-4'>
            <Typography.Text className='px-3 text-base font-semibold text-gray-500'>Danh mục</Typography.Text>
            <List
              className='mt-2'
              itemLayout='horizontal'
              dataSource={filteredNavData}
              renderItem={(item) => (
                <List.Item
                  onClick={() => {
                    navigate(item.navigate)
                    setOpen(false)
                  }}
                  className={clsx('cursor-pointer px-6 hover:bg-gray-100', currentPath === item.key && 'bg-gray-100')}
                >
                  <List.Item.Meta
                    avatar={
                      <span className='flex items-center justify-center rounded-xl bg-gray-200 p-2'>{item.icon}</span>
                    }
                    title={<Typography.Text className='font-medium'>{item.label}</Typography.Text>}
                  />
                </List.Item>
              )}
            />
          </Col>

          {user && (
            <Col span={24} className='mt-4'>
              <Typography.Text className='px-3 text-base font-semibold text-gray-500'>
                Thông tin cá nhân
              </Typography.Text>
              <List
                className='mt-2'
                itemLayout='horizontal'
                dataSource={profileData}
                renderItem={(item) => (
                  <List.Item
                    onClick={() => {
                      navigate(item.navigate)
                      setOpen(false)
                    }}
                    className={clsx('cursor-pointer px-6 hover:bg-gray-100', currentPath === item.key && 'bg-gray-100')}
                  >
                    <List.Item.Meta
                      avatar={
                        <span className='flex items-center justify-center rounded-xl bg-gray-200 p-2'>{item.icon}</span>
                      }
                      title={<Typography.Text className='font-medium'>{item.label}</Typography.Text>}
                    />
                  </List.Item>
                )}
              />
            </Col>
          )}

          {user && logoutComponent}
        </Row>
      </Drawer>
    </>
  )
}

export default MenuMobile
