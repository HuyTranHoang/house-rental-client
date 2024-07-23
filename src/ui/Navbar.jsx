import { Avatar, Button, Divider, Dropdown, Flex, message, Space, Typography } from 'antd'
import ColorButton from '../components/ColorButton.jsx'
import styled from 'styled-components'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectAuth } from '../features/auth/authSlice.js'
import { UserOutlined } from '@ant-design/icons'

import './Navbar.scss'

const CustomImg = styled.img`
    width: 100px;
    height: 31px;
`

const CustomTypography = styled(Typography.Text)`
    font-size: 16px;

    &:hover {
        color: #0499A8;
    }
`

const items = [
  {
    key: '1',
    label: (
      <Link to={'/profile'}>
        Thông tin tài khoản
      </Link>
    )
  },
  {
    key: '2',
    label: (
      <Link to={'/profile/transaction-history'}>
        Lịch sử giao dịch
      </Link>
    )
  },
  {
    key: '3',
    label: (
      <Link to={'/profile/favorite'}>
        Tìm kiếm đã lưu
      </Link>
    )
  },
  {
    type: 'divider',
  },
  {
    key: 'logout',
    danger: true,
    label: 'Đăng xuất'
  }
]


const NavItem = ({ title, link }) => (
  <Button type="link">
    <NavLink to={link} component={<Button />}>
      <CustomTypography>
        {title}
      </CustomTypography>
    </NavLink>
  </Button>
)


function Navbar() {
  const { user } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClick = ({ key }) => {
    if (key === 'logout') {
      localStorage.removeItem('jwtToken')
      dispatch(logout())
      navigate('/')
      message.success('Đăng xuất thành công')
    }
  };


  return (
    <>
      <Link to={'/'} style={{ display: 'flex' }}>
        <CustomImg
          src={'/logo.png'}
          alt="Logo"
        />
      </Link>
      <Flex gap="small" wrap>
        <NavItem title="Tìm thuê" link="/looking-to-rent" />

        <NavItem title="Phí thành viên" link="/membership-fee" />

        <NavItem title="Dự án" link="/project" />


        {user && (
          <>
            <NavItem title="Nạp tiền" link="/top-up" />

            <NavItem title="Mã thưởng" link="/promotional-code" />

            <NavItem title="Tin nhắn" link="/message" />

            <Divider type="vertical" style={{ height: '2rem' }} />

            <Button type="link">
              <Dropdown menu={{ items, onClick }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Typography.Text style={{ fontSize: 16, fontWeight: '600' }}>
                      {user.username}
                    </Typography.Text>
                  </Space>
                </a>
              </Dropdown>
              <Avatar size={'small'} icon={<UserOutlined />} />
            </Button>
          </>
        )}

        {!user && <NavItem title="Đăng nhập" link="login" />}

        <ColorButton defaultHover="#0499A8" borderColor="#0499A8" borderHoverColor="#0499A8"
                     lineWidth={1} fontWeight={500} type="default" style={{ marginLeft: 15 }}>
          Đăng Tin
        </ColorButton>
      </Flex>
    </>
  )
}

export default Navbar
