import { Button, Checkbox, Col, Divider, Flex, Form, Input, Row, Typography } from 'antd'
import {
  AntDesignOutlined,
  FacebookFilled,
  GoogleCircleFilled,
  UnlockOutlined,
  UserOutlined
} from '@ant-design/icons'
import axiosInstance from '../../interceptor/axiosInstance.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginRequest, loginSuccess, selectAuth } from './authSlice.js'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GradientButton from '../../components/GradientButton.jsx'
import { useEffect } from 'react'


const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

function Login() {
  const { isAuthenticated, isLoading } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const redirectTo = location.state?.from || '/'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo)
    }
  }, [isAuthenticated, navigate, redirectTo])

  const onFinish = async (values) => {
    console.log('Success submit:', values)
    try {
      dispatch(loginRequest())
      const response = await axiosInstance.post('/api/auth/login', values)
      console.log('>>>LOGIN.JSX', response)
      toast.success('Đăng nhập thành công')

      const payload = {
        user: response.data,
        token: response.headers['jwt-token']
      }

      dispatch(loginSuccess(payload))
      navigate(redirectTo)
    } catch (error) {
      console.log('>>>LOGIN.JSX', error)
      dispatch(loginFailure(error))
    }
  }

  return (
    <Row style={{ textAlign: 'center', margin: '3rem 0' }}>
      <Col offset={8} md={8} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem' }}>
        <img src="/logo.png" alt="logo image" />
        <Typography.Text style={{ display: 'block' }}>Nền tảng tìm kiếm và cho thuê nhà trọ</Typography.Text>
        <Divider />
        <Form
          name="login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ remember: true }}
          autoComplete="off"
          labelCol={{ span: 8 }}
        >
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

          <Flex justify="space-between" align="center">
            <Form.Item
              name="remember"
              valuePropName="checked"
            >
              <Checkbox>Nhớ đăng nhập</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="link" href="#">
                Quên mật khẩu?
              </Button>
            </Form.Item>
          </Flex>

          <Form.Item style={{ marginBottom: '0.6rem' }}>
            <GradientButton type="primary" htmlType="submit" size="large" icon={<AntDesignOutlined />}
                            loading={isLoading} block>
              Đăng nhập
            </GradientButton>
          </Form.Item>

          <Form.Item style={{ display: 'inline' }}>
            <Typography.Text>
              Bạn chưa có tài khoản?
            </Typography.Text>
            <Link to={'/register'}>
              <Button type="link">
                Đăng ký
              </Button>
            </Link>
          </Form.Item>

          <Divider>Hoặc đăng nhập với</Divider>

          <Form.Item style={{ marginBottom: 0 }}>
            <Flex gap="large" justify="center">
              <FacebookFilled style={{ fontSize: '1.8rem', color: '#2667F9' }} />
              <GoogleCircleFilled style={{ fontSize: '1.8rem', color: '#DB4437' }} />
            </Flex>
          </Form.Item>

        </Form>
      </Col>
    </Row>
  )
}

export default Login
