import { Avatar, Button, Divider, Dropdown, Flex, MenuProps, Space, Typography } from 'antd'
import ColorButton from '../components/ColorButton.jsx'
import styled from 'styled-components'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout, selectAuth } from '../features/auth/authSlice.js'
import { toast } from 'sonner'

import './Navbar.scss'
import { useAppDispatch } from '../store.ts'
import { selectMenu } from '../features/profile/profileSlice.ts'

const CustomImg = styled.img`
    width: 100px;
    height: 31px;
`

const CustomTypography = styled(Typography.Text)`
    font-size: 16px;

    &:hover {
        color: #4096ff;
    }
`

interface NavItemProps {
  title: string
  link: string
}

const NavItem = ({ title, link }: NavItemProps) => (
  <Button type="link">
    <NavLink to={link}>
      <CustomTypography>
        {title}
      </CustomTypography>
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
        <Link to={'/profile'} onClick={() => dispatch(selectMenu(['thongTinCaNhan']))}>
          Thông tin cá nhân
        </Link>
      )
    },
    {
      key: '2',
      label: (
        <Link to={'/profile/transaction-history'} onClick={() => dispatch(selectMenu(['transaction-history']))}>
          Lịch sử giao dịch
        </Link>
      )
    },
    {
      key: '3',
      label: (
        <Link to={'/profile/favorite'} onClick={() => dispatch(selectMenu(['favorite']))}>
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
      localStorage.removeItem('jwtToken')
      dispatch(logout())
      navigate('/')
      toast.success('Đăng xuất thành công')
    }
  }


  return (
    <>
      <Link to={'/'} style={{ display: 'flex' }}>
        <CustomImg
          src={'/logo.png'}
          alt="Logo"
        />
      </Link>
      <Flex gap="small" wrap>
        <NavItem title="Tìm thuê" link="/rent-house" />

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
                    <Avatar size={'small'} src={user.avatarUrl} />
                  </Space>
                </a>
              </Dropdown>
            </Button>
          </>
        )}

        {!user && <NavItem title="Đăng nhập" link="login" />}

        <ColorButton defaultHover="#4096ff" borderColor="#4096ff" borderHoverColor="#4096ff"
                     lineWidth={1} fontWeight={'500'} type="default" style={{ marginLeft: 15 }}>
          Đăng Tin
        </ColorButton>
      </Flex>
    </>
  )
}

export default Navbar
