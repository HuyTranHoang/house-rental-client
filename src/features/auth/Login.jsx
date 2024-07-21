import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import axiosInstance from '../../interceptor/axiosInstance.js'
import { toast } from 'sonner'

const onFinish = async (values) => {
  console.log('Success:', values)
  try {
    const response = await axiosInstance.post('/api/auth/login', values)
    console.log('>>>LOGIN.JSX' ,response)
    toast.success('Đăng nhập thành công', {
      style: {
        color: '#4CAF50'
      }
    })
  } catch (error) {
    console.log('>>>LOGIN.JSX', error)
    // Toast error dc handle trong interceptor
  }

}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

function Login() {
  return (
    <Row style={{ textAlign: 'center', margin: '3rem 0' }}>
      <Col offset={8} md={8} style={{backgroundColor: 'white', padding: '2rem', borderRadius: '1rem'}}>
        <img src="/logo.png" alt="logo image" />
        <Typography.Text style={{ display: 'block' }}>Nền tảng tìm kiếm và cho thuê nhà trọ</Typography.Text>
        <Divider />
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tài khoản!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<LoginOutlined />} iconPosition={'end'} block>
              Đăng nhập
            </Button>
          </Form.Item>

          <Form.Item style={{ display: 'inline' }}>
            <Typography.Text>
              Bạn chưa có tài khoản?
            </Typography.Text>
            <Button type="link" href="#">
              Đăng ký
            </Button>
          </Form.Item>
          <Form.Item style={{ display: 'inline' }}>
            <Button type="link" href="#">
              Quên mật khẩu?
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Login
