import { FacebookFilled, MailOutlined, PhoneOutlined, YoutubeFilled } from '@ant-design/icons'
import { Col, Row, Space, Typography } from 'antd'

interface FooterItemProps {
  title: string
  items: string[]
}

function FooterItem({ title, items }: FooterItemProps) {
  return (
    <Col xs={12} md={6} className='md:mb-4'>
      <Typography.Title level={5} className='mt-0'>{title}</Typography.Title>
      <ul className='list-none p-0'>
        {items.map((item, index) => (
          <li className='text-xs text-[#5e5e5e]' key={index}>
            {item}
          </li>
        ))}
      </ul>
    </Col>
  )
}

function Footer() {
  return (
    <Row className='py-8'>
      <Col xs={1} md={4}></Col>
      <Col xs={22} md={16}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Space direction='vertical' size='small' className='w-full'>
              <img className='w-24' src='/logo.webp' alt='Logo' />
              <Space>
                <PhoneOutlined /> <span className='text-sm'>(012) 123456789</span>
              </Space>
              <Space>
                <MailOutlined /> <span className='text-sm'>trogiup@mogu.vn</span>
              </Space>
              <Space className='mt-2'>
                <FacebookFilled className='text-2xl text-blue-600' />
                <YoutubeFilled className='text-2xl text-red-600' />
              </Space>
            </Space>

            <div className='mt-4'>
              <Typography.Title level={5}>CÔNG TY CỔ PHẦN MOGU</Typography.Title>
              <p className='text-sm text-gray-600'>
                Trụ sở chính: Quận Bình Thạnh, TP. Hồ Chí Minh Giấy phép số: 111/GP-BTTTT do Bộ TTTT cấp ngày 01/01/2024
              </p>
              <img className='my-2 w-32' src='https://mogi.vn/content/images/bocongthuong.png' alt='Bộ công thương' />
              <p className='text-sm text-gray-600'>
                Mogu có trách nhiệm chuyển tải thông tin. Chúng tôi không chịu bất kỳ trách nhiệm nào từ các tin này.
              </p>
            </div>
          </Col>

          <Col xs={24} md={18}>
            <Row gutter={8}>
              <FooterItem
                title='Bất động sản TPHCM'
                items={[
                  'Mua bán nhà đất TPHCM',
                  'Bán nhà quận 7',
                  'Căn hộ quận 7',
                  'Bán đất quận 9',
                  'Phòng trọ quận 10',
                  'Cho thuê nhà quận 8'
                ]}
              />
              <FooterItem
                title='Bất động sản Hà Nội'
                items={[
                  'Bán đất Hà Nội',
                  'Bán nhà Hà Nội',
                  'Cho thuê nhà Hà Nội',
                  'Chung cư Hà Nội',
                  'Nhà đất Hà Nội',
                  'Phòng trọ Hà Nội'
                ]}
              />
              <FooterItem
                title='Bất động sản Đà Nẵng'
                items={[
                  'Bán đất Đà Nẵng',
                  'Bán nhà Đà Nẵng',
                  'Cho thuê nhà Đà Nẵng',
                  'Chung cư Đà Nẵng',
                  'Nhà đất Đà Nẵng',
                  'Phòng trọ Đà Nẵng'
                ]}
              />
              <FooterItem
                title='Cho thuê nhà đất'
                items={[
                  'Cho thuê căn hộ',
                  'Cho thuê mặt bằng',
                  'Cho thuê nhà nguyên căn',
                  'Cho thuê nhà xưởng',
                  'Cho thuê phòng trọ',
                  'Cho thuê văn phòng'
                ]}
              />
            </Row>
            <Row gutter={8} className='mt-4'>
              <FooterItem
                title='Về Mogu'
                items={['Về chúng tôi', 'Điều khoản sử dụng', 'Quy chế hoạt động', 'Thỏa thuận mạng XH', 'Liên hệ']}
              />
              <FooterItem
                title='Đối tác - Thông tin'
                items={['Tin tức bất động sản', 'Muaban.net - Mua bán rao vặt', 'Góc báo chí']}
              />
              <FooterItem
                title='Hỗ trợ khách hàng'
                items={[
                  'Hướng dẫn sử dụng',
                  'Hỏi đáp',
                  'Góp ý - Báo lỗi',
                  'Chính sách bảo mật',
                  'Chính sách giải quyết khiếu nại'
                ]}
              />
              <FooterItem
                title='Dịch Vụ - Quảng Cáo'
                items={['Chương trình - Khuyến mãi', 'Bảng giá dịch vụ', 'Hướng dẫn đăng tin', 'Hướng dẫn thanh toán']}
              />
            </Row>
          </Col>
        </Row>
      </Col>
      <Col xs={1} md={4}></Col>
    </Row>
  )
}

export default Footer
