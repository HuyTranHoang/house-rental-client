import { Button, Checkbox, Col, Divider, Flex, Form, FormProps, Input, Row, Typography } from 'antd'
import {
  AntDesignOutlined,
  FacebookFilled,
  GoogleCircleFilled,
  UnlockOutlined,
  UserOutlined
} from '@ant-design/icons'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { loginFailure, loginRequest, loginSuccess, selectAuth } from './authSlice.ts'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GradientButton from '../../components/GradientButton.jsx'
import { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner.jsx'
import axiosInstance from '../../inteceptor/axiosInstance.ts'
import { User } from '../../models/user.type.ts'
import { useAppDispatch } from '../../store.ts'
import { delay } from '../../utils/delay.ts'


type FieldType = {
  username: string
  password: string
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

function Login() {
  const { isAuthenticated, isLoading } = useSelector(selectAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/'

  const [spinning, setSpinning] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      delay(300).then(() => navigate(redirectTo))
    } else {
      delay(300).then(() => setSpinning(false))
    }
  }, [isAuthenticated, navigate, redirectTo])

  const onFinish = async (values: FieldType) => {
    console.log('Success submit:', values)
    try {
      dispatch(loginRequest())
      const response = await axiosInstance.post<User>('/api/auth/login', values)
      console.log('>>>LOGIN.JSX', response)
      toast.success('Đăng nhập thành công')

      const payload: {user: User, token: string} = {
        user: response.data,
        token: response.headers['jwt-token']
      }

      localStorage.setItem('jwtToken', payload.token)
      dispatch(loginSuccess(payload))
      navigate(redirectTo)
    } catch (error) {
      console.log('>>>LOGIN.JSX', error)
      dispatch(loginFailure())
    }
  }

  if (isAuthenticated) {
    return <Spinner spinning={spinning} />
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
              <Link to={'/request-reset-password'}>
                <Button type="link">
                  Quên mật khẩu?
                </Button>
              </Link>
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
