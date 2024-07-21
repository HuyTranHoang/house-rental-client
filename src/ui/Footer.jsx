import {Row, Col, Typography} from 'antd';
import {MailOutlined, PhoneOutlined} from '@ant-design/icons';
import styled from "styled-components";
const { Text, Link } = Typography;

const CustomText = styled(Typography.Text)`
    font-size: 12px;
    color : #5E5E5E;
`

const CustomImg = styled.img`
    width: 90px;
    height: 31px;
`
function Footer() {
    return (
        <Row>
            <Col xs={1} sm={2} md={4}></Col>
            <Col xs={22} sm={20} md={16}>
                <Row>
                    <Col md={6}>
                        <ul style={{listStyleType: 'none', padding: 0}}>
                            <li>
                                <CustomImg src="https://mogi.vn/content/Images/logo.svg" alt="Logo"/>
                            </li>
                            <li>
                                <span><PhoneOutlined /> (028) 73001234</span>
                            </li>
                            <li>
                                <span><MailOutlined /> trogiup@mogi.vn</span>
                            </li>
                        </ul>

                        <div>
                            <Typography.Title level={5} strong>CÔNG TY CỔ PHẦN ĐỊNH ANH</Typography.Title>

                            <p style={{color: "#745E5E"}}>
                                Trụ sở chính: 28-30 đường số 2, Hưng Gia 5, P.Tân Phong, Quận 7, TP. Hồ Chí Minh<br/>
                                Chịu trách nhiệm chính: Ông Phạm Chu Hi<br/>
                                Giấy phép số: 429/GP-BTTTT do Bộ TTTT cấp ngày 11/10/2019
                            </p>

                            <Link>
                                <img src="https://mogi.vn/content/images/bocongthuong.png" width="150" height="47" alt="bo cong thuong" />
                            </Link>

                            <p style={{color: "#745E5E"}}>
                                Mogi.vn có trách nhiệm chuyển tải thông tin. Chúng tôi không chịu bất kỳ trách nhiệm nào từ các tin này.
                            </p>
                        </div>
                    </Col>

                    <Col md={18}>
                        <Row>
                            <Col md={6}>
                                <ul style={{listStyleType: 'none'}}>
                                    <li><Text level={5} strong>Bất động sản TPHCM</Text></li>
                                    <li><CustomText>Mua bán nhà đất TPHCM</CustomText></li>
                                    <li><CustomText>Bán nhà quận 7</CustomText></li>
                                    <li><CustomText>Căn hộ quận 7</CustomText></li>
                                    <li><CustomText>Bán đất quận 9</CustomText></li>
                                    <li><CustomText>Phòng trọ quận 10</CustomText></li>
                                    <li><CustomText>Cho thuê nhà quận 8</CustomText></li>
                                </ul>
                            </Col>
                            <Col md={6}>
                                <ul style={{listStyleType: 'none'}}>
                                    <li><Text level={5} strong>Bất động sản Hà Nội</Text></li>
                                    <li><CustomText>Bán đất Hà Nội</CustomText></li>
                                    <li><CustomText>Bán nhà Hà Nội</CustomText></li>
                                    <li><CustomText>Cho thuê nhà Hà Nội</CustomText></li>
                                    <li><CustomText>Chung cư Hà Nội</CustomText></li>
                                    <li><CustomText>Nhà đất Hà Nội</CustomText></li>
                                    <li><CustomText>Phòng trọ Hà Nội</CustomText></li>
                                </ul>
                            </Col>
                            <Col md={6}>
                                <ul style={{listStyleType: 'none'}}>
                                    <li><Text level={5} strong>Bất động sản Đà Nẵng</Text></li>
                                    <li><CustomText>Bán đất Đà Nẵng</CustomText></li>
                                    <li><CustomText>Bán nhà Đà Nẵng</CustomText></li>
                                    <li><CustomText>Cho thuê nhà Đà Nẵng</CustomText></li>
                                    <li><CustomText>Chung cư Đà Nẵng</CustomText></li>
                                    <li><CustomText>Nhà đất Đà Nẵng</CustomText></li>
                                    <li><CustomText>Phòng trọ Đà Nẵng</CustomText></li>
                                </ul>
                            </Col>
                            <Col md={6}>
                                <ul style={{listStyleType: 'none'}}>
                                    <li><Text level={5} strong>Cho thuê nhà đất</Text></li>
                                    <li><CustomText>Cho thuê căn hộ</CustomText></li>
                                    <li><CustomText>Cho thuê mặt bằng</CustomText></li>
                                    <li><CustomText>Cho thuê nhà nguyên căn</CustomText></li>
                                    <li><CustomText>Cho thuê nhà xưởng</CustomText></li>
                                    <li><CustomText>Cho thuê phòng trọ</CustomText></li>
                                    <li><CustomText>Cho thuê văn phòng</CustomText></li>
                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <ul style={{listStyleType: 'none'}}>
                                    <li><Text level={5} strong>Về Mogi</Text></li>
                                    <li><CustomText>Về chúng tôi</CustomText></li>
                                    <li><CustomText>Điều khoản sử dụng</CustomText></li>
                                    <li><CustomText>Quy chế hoạt động</CustomText></li>
                                    <li><CustomText>Thỏa thuận mạng XH</CustomText></li>
                                    <li><CustomText>Liên hệ</CustomText></li>
                                </ul>
                            </Col>
                            <Col md={6}>
                                <ul style={{listStyleType: 'none'}}>
                                    <li><Text level={5} strong>Đối Tác - Thông Tin</Text></li>
                                    <li><CustomText>Tin tức bất động sản</CustomText></li>
                                    <li><CustomText>Muaban.net - Mua bán rao vặt</CustomText></li>
                                    <li><CustomText>Góc báo chí</CustomText></li>
                                </ul>
                            </Col>
                            <Col md={6}>
                                <ul style={{listStyleType: 'none'}}>
                                    <li><Text level={5} strong>Công Cụ - Tiện Ích</Text></li>
                                    <li><CustomText>Phòng trọ gần KCN</CustomText></li>
                                    <li><CustomText>Phòng trọ gần trường</CustomText></li>
                                    <li><CustomText>10 Bước mua nhà</CustomText></li>
                                    <li><CustomText>Môi giới bất động sản TPHCM</CustomText></li>
                                    <li><CustomText>Môi giới nhà đất Hà Nội</CustomText></li>
                                </ul>
                            </Col>
                            <Col md={6}>
                                <ul style={{listStyleType: 'none'}}>
                                    <li><Text level={5} strong>Dịch Vụ - Quảng Cáo</Text></li>
                                    <li><CustomText>Chương trình - Khuyến mãi</CustomText></li>
                                    <li><CustomText>Bảng giá dịch vụ</CustomText></li>
                                    <li><CustomText>Hướng dẫn đăng tin</CustomText></li>
                                    <li><CustomText>Hướng dẫn thanh toán</CustomText></li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col xs={1} sm={2} md={4}></Col>
        </Row>
    )
}

export default Footer
