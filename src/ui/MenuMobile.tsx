import ROUTER_NAMES from '@/constant/routerNames.ts'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import useAuthStore from '@/store/authStore.ts'
import { User } from '@/types/user.type.ts'
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
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function MenuMobile({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  const location = useLocation()
  const currentPath = location.pathname

  const { t } = useTranslation()

  const navData = [
    {
      key: ROUTER_NAMES.RENT_HOUSE,
      label: t('navbar.forRent'),
      navigate: ROUTER_NAMES.RENT_HOUSE,
      icon: <HomeOutlined className='text-base' />
    },
    {
      key: ROUTER_NAMES.MEMBERSHIP_FEE,
      label: t('navbar.membershipPackage'),
      navigate: ROUTER_NAMES.MEMBERSHIP_FEE,
      icon: <CreditCardOutlined className='text-base' />
    },
    {
      key: ROUTER_NAMES.TOP_UP,
      label: t('navbar.recharge'),
      navigate: ROUTER_NAMES.TOP_UP,
      icon: <DollarOutlined className='text-base' />
    },
    {
      key: ROUTER_NAMES.TRANSACTION_HISTORY,
      label: t('navbar.transactionHistory'),
      navigate: ROUTER_NAMES.TRANSACTION_HISTORY,
      icon: <HistoryOutlined className='text-base' />
    },
    {
      key: ROUTER_NAMES.FAVORITE,
      label: t('navbar.favoriteProperties'),
      navigate: ROUTER_NAMES.FAVORITE,
      icon: <HeartOutlined className='text-base' />
    },
    {
      key: ROUTER_NAMES.POST_MANAGEMENT,
      label: t('navbar.propertyManagement'),
      navigate: ROUTER_NAMES.POST_MANAGEMENT,
      icon: <HeartOutlined className='text-base' />
    },
    {
      key: ROUTER_NAMES.POST_PROPERTY,
      label: t('navbar.postProperty'),
      navigate: ROUTER_NAMES.POST_PROPERTY,
      icon: <FormOutlined className='text-base' />
    }
  ]

  const profileData = [
    {
      key: ROUTER_NAMES.PROFILE,
      label: t('navbar.accountInfo'),
      navigate: ROUTER_NAMES.PROFILE,
      icon: <UserOutlined className='text-base' />
    },
    {
      key: ROUTER_NAMES.CHANGE_PASSWORD,
      label: t('navbar.password'),
      navigate: ROUTER_NAMES.CHANGE_PASSWORD,
      icon: <LockOutlined className='text-base' />
    }
  ]

  const filteredNavData = user
    ? navData
    : navData
        .filter((_item, index) => index < 2)
        .concat({
          key: ROUTER_NAMES.FAVORITE,
          label: t('navbar.postProperty'),
          navigate: ROUTER_NAMES.POST_PROPERTY,
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
          {t('navbar.login')}
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
          {t('navbar.register')}
        </Button>
      </Col>
    </>
  )

  const logoutHandler = () => {
    logout()
    navigate(ROUTER_NAMES.RENT_HOUSE)
    localStorage.removeItem('jwtToken')
    axiosInstance.post('/api/auth/logout', {}, { withCredentials: true }).then(() => {
      toast.success(t('toast.logoutSuccess'))
      setOpen(false)
    })
  }

  const logoutComponent = (
    <Col span={24} className='mt-4 px-6'>
      <Button danger block onClick={logoutHandler}>
        {t('navbar.logout')}
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
            <Typography.Text className='px-3 text-base font-semibold text-gray-500'>{t('navbar.menu')}</Typography.Text>
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
                {t('navbar.personalInfo')}
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
