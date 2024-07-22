import { Button, Col, Divider, Flex, Form, Input, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { MailOutlined, PhoneOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons'

const onFinish = (values) => {
  console.log('Success submit:', values)
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

function Register() {
  return (
    <Row style={{ textAlign: 'center', margin: '3rem 0' }}>
      <Col offset={8} md={8} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem' }}>
        <img src="/logo.png" alt="logo image" />
        <Typography.Text style={{ display: 'block' }}>Nền tảng tìm kiếm và cho thuê nhà trọ</Typography.Text>
        <Divider />
        <Form
          name="register"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ remember: true }}
          autoComplete="off"
          labelCol={{ span: 8 }}
        >
          <Flex gap="small">
            <Form.Item
              name="lastName"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ!'
                }
              ]}
            >
              <Input placeholder="Họ" />
            </Form.Item>
            <Form.Item
              name="firstName"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên!'
                }
              ]}
            >
              <Input placeholder="Tên" />
            </Form.Item>
          </Flex>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tài khoản!'
              }
            ]}
          >
            <Input placeholder="Tài khoản" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!'
              }
            ]}
          >
            <Input.Password placeholder="Mật khẩu" prefix={<UnlockOutlined />} />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email!'
              },
              {
                type: 'email',
                message: 'Email không hợp lệ!'
              }
            ]}
          >
            <Input placeholder="Email" prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại!'
              },

            ]}
          >
            <Input placeholder="Số điện thoại" prefix={<PhoneOutlined />} />
          </Form.Item>

          <Form.Item style={{ marginBottom: '0.6rem' }}>
            <Button type="primary" htmlType="submit" block>
              Đăng ký
            </Button>
          </Form.Item>

          <Form.Item style={{ display: 'inline' }}>
            <Typography.Text>
              Bạn đã có tài khoản?
            </Typography.Text>
            <Link to={'/login'}>
              <Button type="link">
                Đăng nhập
              </Button>
            </Link>
          </Form.Item>


        </Form>
      </Col>
    </Row>
  )
}

export default Register
