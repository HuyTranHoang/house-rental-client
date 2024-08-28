import { ArrowRightOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Col, Row, Typography } from 'antd'
import Meta from 'antd/es/card/Meta'
import styled from 'styled-components'
import ContactForm from './ContactForm.tsx'
import './contact.css'

const CustomMetaStyle = styled(Meta)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const CustomAvatarStyle = styled(Avatar)`
  padding: 16px;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
`

function Contact() {
  return (
    <>
      <Row className='relative bg-blue-50'>
        <div className='custom-shape-divider-top-1722496454'>
          <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
            <path
              d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
              className='shape-fill'
            ></path>
          </svg>
        </div>
        <Col md={5}></Col>
        <Col md={14}>
          <Typography.Title level={2} className='mt-16 text-center'>
            Liên hệ với Mogu
          </Typography.Title>
          <Typography.Paragraph className='text-center'>
            Hãy liên hệ và cho chúng tôi biết chúng tôi có thể giúp gì
          </Typography.Paragraph>
          <Row gutter={128} className='mb-16 mt-16'>
            <Col span={8}>
              <Card
                actions={[
                  <Button type='link' icon={<ArrowRightOutlined />} iconPosition='end' className='text-white'>
                    Địa chỉ văn phòng Mogu
                  </Button>
                ]}
              >
                <CustomMetaStyle
                  className='-mt-16'
                  avatar={<CustomAvatarStyle size={84} src='/contact-icon-company.png' />}
                  title='Văn phòng'
                />
                <Typography.Paragraph className='pt-8 text-gray-600'>
                  Trực tiếp tại các văn phòng trên toàn quốc
                </Typography.Paragraph>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                actions={[
                  <Button type='link' icon={<ArrowRightOutlined />} iconPosition='end' className='text-white'>
                    Liên hệ qua Zalo
                  </Button>
                ]}
              >
                <CustomMetaStyle
                  className='-mt-16'
                  avatar={<CustomAvatarStyle size={84} src='/contact-icon-phone.png' />}
                  title='Tổng đài'
                />
                <Typography.Paragraph className='pt-8 text-gray-600'>
                  Chúng tôi luôn hỗ trợ 24/7, gọi ngay 1900 1000
                </Typography.Paragraph>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                actions={[
                  <Button type='link' icon={<ArrowRightOutlined />} iconPosition='end' className='text-white'>
                    Facebook Mogu VN
                  </Button>
                ]}
              >
                <CustomMetaStyle
                  className='-mt-16'
                  avatar={<CustomAvatarStyle size={84} src='/contact-icon-social.png' />}
                  title='Email và mạng xã hội'
                />
                <Typography.Paragraph className='pt-8 text-gray-600'>
                  Liên hệ qua email: <strong>hotro@mogu.vn</strong> hoặc page hỗ trợ
                </Typography.Paragraph>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={5}></Col>
      </Row>

      <Row className='relative'>
        <div className='custom-shape-divider-top-1722502307'>
          <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
            <path d='M649.97 0L599.91 54.12 550.03 0 0 0 0 120 1200 120 1200 0 649.97 0z' className='shape-fill'></path>
          </svg>
        </div>
        <Col md={5}></Col>
        <Col md={14}>
          <Typography.Title level={5}>Quý khách hàng có thể liên hệ trực tiếp tại đây:</Typography.Title>
          <ContactForm />
        </Col>
        <Col md={5}></Col>
      </Row>
    </>
  )
}

export default Contact
