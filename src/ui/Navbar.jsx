import { Avatar, Button, Divider, Flex, Typography } from 'antd'
import ColorButton from '../components/ColorButton.jsx'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../features/auth/authSlice.js'
import { UserOutlined } from '@ant-design/icons'

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

function Navbar() {
  const { user } = useSelector(selectAuth)

  return (
    <>
      <Link to={'/'} style={{ display: 'flex' }}>
        <CustomImg
          src={'/logo.png'}
          alt="Logo"
        />
      </Link>
      <Flex gap="small" wrap>
        <Button type="link" href="#tim-thue">
          <CustomTypography>
            Tìm Thuê
          </CustomTypography>
        </Button>

        <Button type="link" href="#phi-thanh-vien">
          <CustomTypography>
            Phí Thành Viên
          </CustomTypography>
        </Button>

        <Button type="link" href="#du-an">
          <CustomTypography>
            Dự Án
          </CustomTypography>
        </Button>

        {user && (
          <>
            <Button type="link" href="#nap-tien">
              <CustomTypography>
                Nạp tiền
              </CustomTypography>
            </Button>
            <Button type="link" href="#ma-thuong">
              <CustomTypography>
                Mã thưởng
              </CustomTypography>
            </Button>
            <Button type="link" href="#tin-nhan">
              <CustomTypography>
                Tin nhắn
              </CustomTypography>
            </Button>
            <Divider type="vertical" style={{height: '2rem'}} />
            <Button type="link" href="/profile">
              <Typography.Text style={{fontSize: 16, fontWeight: '600'}}>
                {user.username}
              </Typography.Text>
              <Avatar size={'small'} icon={<UserOutlined />} />
            </Button>
          </>
        )}

        {!user && (
          <Button type="link" href="/login">
            <CustomTypography>
              Đăng Nhập
            </CustomTypography>
          </Button>
        )}

        <ColorButton defaultHover="#0499A8" borderColor="#0499A8" borderHoverColor="#0499A8"
                     lineWidth={1} fontWeight={500} type="default" style={{marginLeft: 15}}>
          Đăng Tin
        </ColorButton>
      </Flex>
    </>
  )
}

export default Navbar
