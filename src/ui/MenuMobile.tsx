import ROUTER_NAMES from '@/constant/routerNames.ts'
import { User } from '@/models/user.type.ts'
import {
  CreditCardOutlined,
  DollarOutlined,
  FormOutlined,
  HeartOutlined,
  HistoryOutlined,
  HomeOutlined,
  MenuOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Button, Col, Drawer, Flex, List, Row, Typography } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

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

const loginRegister = (
  <>
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
  </>
)

const logout = (
  <Col span={24} className='mt-4'>
    <Button danger block>
      Đăng xuất
    </Button>
  </Col>
)

function MenuMobile({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <MenuOutlined onClick={() => setOpen(true)} className='mr-2 text-xl md:hidden' />
      <Drawer title='Menu' onClose={() => setOpen(false)} open={open}>
        <Row gutter={12}>
          {!user && loginRegister}

          {user && <Col span={24} className='mt-4'>
            <Flex align='center' vertical>
              <Link to={ROUTER_NAMES.PROFILE}>
                <Avatar className='size-24' src={user.avatarUrl} />
              </Link>
              <Typography.Text className='ml-2'>{user.lastName} {user.firstName}</Typography.Text>
              <Typography.Text className='ml-2 text-xs text-gray-500'>{user.email}</Typography.Text>
            </Flex>
          </Col>}

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

          {user && logout}
        </Row>
      </Drawer>
    </>
  )
}

export default MenuMobile
