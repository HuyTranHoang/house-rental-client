import { Button, Checkbox, Col, Divider, Flex, Form, FormProps, Input, Row, Space, Spin, Typography } from 'antd'
import { AntDesignOutlined, FacebookFilled, GoogleCircleFilled, LockOutlined, UserOutlined } from '@ant-design/icons'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { loginFailure, loginRequest, loginSuccess, selectAuth } from './authSlice.ts'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GradientButton from '@/components/GradientButton.jsx'
import { useEffect, useState } from 'react'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { User } from '@/models/user.type.ts'
import { useAppDispatch } from '@/store.ts'
import { delay } from '@/utils/delay.ts'
import CustomIndicator from '@/components/CustomIndicator.tsx'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import './Login.css'


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
    let isMounted = true

    if (isAuthenticated) {
      delay(300).then(() => {
        if (isMounted) {
          toast.info('Bạn đã đăng nhập rồi!!!')
          navigate(redirectTo)
        }
      })
    } else {
      delay(300).then(() => {
        if (isMounted) {
          setSpinning(false)
        }
      })
    }

    return () => {
      isMounted = false
    }
  }, [isAuthenticated, navigate, redirectTo])

  const onFinish = async (values: FieldType) => {
    console.log('Success submit:', values)
    try {
      dispatch(loginRequest())
      const response = await axiosInstance.post<User>('/api/auth/login', values)
      console.log('>>>LOGIN.JSX', response)
      toast.success('Đăng nhập thành công')

      const payload: { user: User, token: string } = {
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
    return <Spin indicator={<CustomIndicator />}
                 spinning={spinning}
                 tip={'Đang tải dữ liệu...Vui lòng đợi trong giây lát!!!'}
                 fullscreen />
  }

  return (
    <>
      <Row style={{ position: 'relative', textAlign: 'center' }}>
        <div className="custom-shape-divider-top-1722496454">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
               preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"></path>
          </svg>
        </div>
        <div className="custom-shape-divider-bottom-1724270951">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"></path>
          </svg>
        </div>
        <Col md={5}></Col>
        <Col md={14}>
          <Flex justify="center" align="middle">
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              style={{
                width: '400px',
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '32px',
                margin: '64px 0',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
              }}
            >

              <Flex vertical justify="center" align="center" style={{ marginBottom: '24px' }}>
                <img src="/logo.png" alt="Mogu logo" style={{ width: 140 }} />
                <Typography.Title level={3} style={{ textAlign: 'center' }}>Đăng nhập</Typography.Title>
                <Typography.Text type="secondary" className="centered-text" style={{ fontSize: 12 }}>
                  Chào mừng bạn trở lại,
                  vui lòng nhập thông tin
                  tài khoản để tiếp tục.
                </Typography.Text>
              </Flex>

              <Form.Item<FieldType>
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Tài khoản" />
              </Form.Item>

              <Form.Item<FieldType>
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Ghi nhớ thông tin</Checkbox>
                  </Form.Item>
                  <Link to={ROUTER_NAMES.REQUEST_RESET_PASSWORD}>Quên mật khẩu?</Link>
                </Flex>
              </Form.Item>

              <Form.Item>
                <GradientButton type="primary" htmlType="submit" icon={<AntDesignOutlined />}
                                loading={isLoading} block>
                  Đăng nhập
                </GradientButton>
              </Form.Item>

              <Space>
                <Typography.Text>
                  Bạn chưa có tài khoản?
                </Typography.Text>
                <Link to={ROUTER_NAMES.REGISTER}>
                  <Button type="link">
                    Đăng ký
                  </Button>
                </Link>
              </Space>

              <Divider>Hoặc đăng nhập với</Divider>

              <Form.Item style={{ marginBottom: 0 }}>
                <Flex gap="large" justify="center">
                  <FacebookFilled style={{ fontSize: '1.8rem', color: '#2667F9' }} />
                  <GoogleCircleFilled style={{ fontSize: '1.8rem', color: '#DB4437' }} />
                </Flex>
              </Form.Item>
            </Form>
          </Flex>
        </Col>
        <Col md={5}></Col>
      </Row>
    </>
  )
}

export default Login
