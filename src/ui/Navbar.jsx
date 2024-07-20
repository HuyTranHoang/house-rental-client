import { Flex } from 'antd'
import './navbar.css'
import ColorButton from '../components/ColorButton.jsx'

const Navbar = () => (
  <>
    <img
      src="https://mogi.vn/content/Images/logo.svg"
      alt="Logo"
      className={'logo'}
    />

    <Flex gap="small" wrap>
      <ColorButton linkHover={"#0499A8"} type={'link'} href={'#tim-thue'}>Tìm Thuê</ColorButton>

      <ColorButton linkHover={"#0499A8"} type={'link'} href={'#phi-thanh-vien'}>Phí Thành Viên</ColorButton>

      <ColorButton linkHover={"#0499A8"} type={'link'} href={'#du-an'}>Dự Án</ColorButton>

      <ColorButton linkHover={"#0499A8"} type={'link'} href={'#dang-nhap'}>Đăng Nhập</ColorButton>

      <ColorButton defaultHover={"#0499A8"} borderColor={"#0499A8"} borderHoverColor={"#0499A8"}
                   lineWidth={1} fontWeight={500} type="default" >
          Đăng Tin
      </ColorButton>
    </Flex>
  </>
)

export default Navbar