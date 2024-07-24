import { Row, Col, Typography } from 'antd'
import { FacebookFilled, MailOutlined, PhoneOutlined, YoutubeFilled } from '@ant-design/icons'
import styled from 'styled-components'

const { Link } = Typography

const CustomText = styled(Typography.Text)`
    font-size: 12px;
    color: #5E5E5E;
`

const CustomImg = styled.img`
    width: 90px;
    height: 31px;
`

interface FooterItemProps {
  title: string
  items: string[]
}

function FooterItem({ title, items }: FooterItemProps) {
  return (
    <Col md={6}>
      <Typography.Title level={5}>{title}</Typography.Title>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {items.map((item, index) => (
          <li key={index}>
            <CustomText>{item}</CustomText>
          </li>
        ))}
      </ul>
    </Col>
  )
}

function Footer() {
  return (
    <Row>
      <Col xs={1} sm={2} md={4}></Col>
      <Col xs={22} sm={20} md={16}>
        <Row>
          <Col md={6}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>
                <CustomImg src="/logo.png" alt="Logo" />
              </li>
              <li>
                <span><PhoneOutlined style={{ fontSize: '16px' }} /> (012) 123456789</span>
              </li>
              <li>
                <span><MailOutlined style={{ fontSize: '16px' }} /> trogiup@mogu.vn</span>
              </li>
            </ul>

            <div>
              <FacebookFilled style={{ color: '#2667F9', fontSize: '1.6rem', marginRight: '0.8rem' }} />
              <YoutubeFilled style={{ color: 'red', fontSize: '1.6rem' }} />
            </div>

            <div>
              <Typography.Title level={5}>CÔNG TY CỔ PHẦN MOGU</Typography.Title>

              <p style={{ color: '#745E5E' }}>
                Trụ sở chính: Quận Bình Thạnh, TP. Hồ Chí Minh<br />
                Chịu trách nhiệm chính: Ông Nguyễn Văn A<br />
                Giấy phép số: 111/GP-BTTTT do Bộ TTTT cấp ngày 11/11/2011
              </p>

              <Link>
                <img src="https://mogi.vn/content/images/bocongthuong.png" width="150" height="47"
                     alt="bo cong thuong" />
              </Link>

              <p style={{ color: '#745E5E' }}>
                House-rental có trách nhiệm chuyển tải thông tin. Chúng tôi không chịu bất kỳ trách nhiệm nào từ các tin
                này.
              </p>
            </div>
          </Col>

          <Col md={18}>
            <Row>
              <FooterItem title="Bất động sản TPHCM" items={[
                'Mua bán nhà đất TPHCM',
                'Bán nhà quận 7',
                'Căn hộ quận 7',
                'Bán đất quận 9',
                'Phòng trọ quận 10',
                'Cho thuê nhà quận 8'
              ]} />
              <FooterItem title="Bất động sản Hà Nội" items={[
                'Bán đất Hà Nội',
                'Bán nhà Hà Nội',
                'Cho thuê nhà Hà Nội',
                'Chung cư Hà Nội',
                'Nhà đất Hà Nội',
                'Phòng trọ Hà Nội'
              ]} />
              <FooterItem title="Bất động sản Đà Nẵng" items={[
                'Bán đất Đà Nẵng',
                'Bán nhà Đà Nẵng',
                'Cho thuê nhà Đà Nẵng',
                'Chung cư Đà Nẵng',
                'Nhà đất Đà Nẵng',
                'Phòng trọ Đà Nẵng'
              ]} />
              <FooterItem title="Cho thuê nhà đất" items={[
                'Cho thuê căn hộ',
                'Cho thuê mặt bằng',
                'Cho thuê nhà nguyên căn',
                'Cho thuê nhà xưởng',
                'Cho thuê phòng trọ',
                'Cho thuê văn phòng'
              ]} />
            </Row>
            <Row>
              <FooterItem title="Về Mogu" items={[
                'Về chúng tôi',
                'Điều khoản sử dụng',
                'Quy chế hoạt động',
                'Thỏa thuận mạng XH',
                'Liên hệ'
              ]} />
              <FooterItem title="Đối tác - Thông tin" items={[
                'Tin tức bất động sản',
                'Muaban.net - Mua bán rao vặt',
                'Góc báo chí'
              ]} />
              <FooterItem title="Hỗ trợ khách hàng" items={[
                'Hướng dẫn sử dụng',
                'Hỏi đáp',
                'Góp ý - Báo lỗi',
                'Chính sách bảo mật',
                'Chính sách giải quyết khiếu nại'
              ]} />
              <FooterItem title="Dịch Vụ - Quảng Cáo" items={[
                'Chương trình - Khuyến mãi',
                'Bảng giá dịch vụ',
                'Hướng dẫn đăng tin',
                'Hướng dẫn thanh toán'
              ]} />
            </Row>
          </Col>
        </Row>
      </Col>
      <Col xs={1} sm={2} md={4}></Col>
    </Row>
  )
}

export default Footer
