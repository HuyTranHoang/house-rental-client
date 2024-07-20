import {Button, Typography, Flex} from 'antd';
import '../assets/css/navbar.css'
const { Text } = Typography;

const Navbar = () => (
    <>
        <img
            src="https://mogi.vn/content/Images/logo.svg"
            alt="Logo"
            className={"logo"}
        />
        <Flex gap="small" wrap>
            <Button type={"text"}  href={"#tim-thue"}>Tìm Thuê</Button>
            <Button type={"text"} href={"#phi-thanh-vien"}>Phí Thành Viên</Button>
            <Button type={"text"} href={"#du-an"}>Dự Án</Button>
            <Button type={"text"} href={"#dang-nhap"}>Đăng Nhập</Button>
            <Button type="default" className={"buttonStyle"} href={"#dang-tin"}>
                <Text strong className={"textStyle"}>
                    Đăng Tin
                </Text>
            </Button>
        </Flex>
    </>
);

export default Navbar;