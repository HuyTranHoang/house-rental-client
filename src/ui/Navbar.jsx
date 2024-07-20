import { Button, Flex, Typography } from 'antd'
import ColorButton from '../components/ColorButton.jsx'
import styled from 'styled-components'

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


const Navbar = () => (
  <>
    <CustomImg
      src="https://mogi.vn/content/Images/logo.svg"
      alt="Logo"
    />

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

      <Button type="link" href="#dang-nhap">
        <CustomTypography>
          Đăng Nhập
        </CustomTypography>
      </Button>

      <ColorButton defaultHover="#0499A8" borderColor="#0499A8" borderHoverColor="#0499A8"
                   lineWidth={1} fontWeight={500} type="default">
        Đăng Tin
      </ColorButton>
    </Flex>
  </>
)

export default Navbar