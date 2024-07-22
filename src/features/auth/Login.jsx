import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import axiosInstance from '../../interceptor/axiosInstance.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginRequest, loginSuccess, selectAuth } from './authSlice.js'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

function Login() {
  const { isAuthenticated, isLoading } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    } catch (error) {
      console.log('>>>LOGIN.JSX', error)
      dispatch(loginFailure(error))
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }

  }, [navigate, isAuthenticated])

  return (
    <Row style={{ textAlign: 'center', margin: '3rem 0' }}>
      <Col offset={8} md={8} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem' }}>
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
            <Button type="primary" htmlType="submit" icon={<LoginOutlined />} iconPosition={'end'} loading={isLoading} block>
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
