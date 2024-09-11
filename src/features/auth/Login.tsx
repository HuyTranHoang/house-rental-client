import CustomIndicator from '@/components/CustomIndicator'
import GradientButton from '@/components/GradientButton'
import ROUTER_NAMES from '@/constant/routerNames'
import axiosInstance from '@/inteceptor/axiosInstance'
import { User } from '@/models/user.type'
import { useAppDispatch } from '@/store'
import { delay } from '@/utils/delay'
import { AntDesignOutlined, FacebookFilled, GoogleCircleFilled, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Divider, Flex, Form, Input, Row, Space, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { loginFailure, loginRequest, loginSuccess, selectAuth } from './authSlice'
import './Login.css'

type FieldType = {
  username: string
  password: string
}

export default function Login() {
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
    try {
      dispatch(loginRequest())
      const response = await axiosInstance.post<User>('/api/auth/login', values)
      toast.success('Đăng nhập thành công')

      const payload = {
        user: response.data,
        token: response.headers['jwt-token']
      }

      localStorage.setItem('jwtToken', payload.token)
      dispatch(loginSuccess(payload))
      navigate(redirectTo)
    } catch (error) {
      dispatch(loginFailure())
    }
  }

  if (isAuthenticated) {
    return (
      <Spin
        indicator={<CustomIndicator />}
        spinning={spinning}
        tip={'Đang tải dữ liệu...Vui lòng đợi trong giây lát!!!'}
        fullscreen
      />
    )
  }

  return (
    <Row className='relative min-h-screen bg-gray-100 md:min-h-0 md:py-24'>
      <div className='custom-shape-divider-top-1722496454'>
        <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
          <path
            d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
            className='shape-fill'
          ></path>
        </svg>
      </div>
      <div className='custom-shape-divider-bottom-1724270951'>
        <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
          <path
            d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z'
            className='shape-fill'
          ></path>
        </svg>
      </div>
      <Col xs={24} md={24} className='mb-24 flex items-center justify-center px-4 md:mb-0'>
        <Form
          name='login'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
          className='w-full max-w-[400px] rounded-lg bg-white p-8 shadow-lg'
        >
          <Flex vertical justify='center' align='center' className='mb-6'>
            <img src='/logo.webp' alt='Mogu logo' className='w-36' />
            <Typography.Title level={3} className='text-center'>
              Đăng nhập
            </Typography.Title>
            <Typography.Text type='secondary' className='text-center text-xs'>
              Chào mừng bạn trở lại, vui lòng nhập thông tin tài khoản để tiếp tục.
            </Typography.Text>
          </Flex>

          <Form.Item<FieldType> name='username' rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}>
            <Input prefix={<UserOutlined />} placeholder='Tài khoản' />
          </Form.Item>

          <Form.Item<FieldType> name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder='Mật khẩu' />
          </Form.Item>

          <Form.Item>
            <Flex justify='space-between' align='center' className='flex-wrap gap-2'>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Ghi nhớ thông tin</Checkbox>
              </Form.Item>
              <Link to={ROUTER_NAMES.REQUEST_RESET_PASSWORD}>Quên mật khẩu?</Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <GradientButton type='primary' htmlType='submit' icon={<AntDesignOutlined />} loading={isLoading} block>
              Đăng nhập
            </GradientButton>
          </Form.Item>

          <Space className='w-full justify-center'>
            <Typography.Text>Bạn chưa có tài khoản?</Typography.Text>
            <Link to={ROUTER_NAMES.REGISTER}>
              <Button type='link'>Đăng ký</Button>
            </Link>
          </Space>

          <Divider>Hoặc đăng nhập với</Divider>

          <Form.Item className='mb-0'>
            <Flex gap='large' justify='center'>
              <FacebookFilled className='text-3xl text-[#2667F9]' />
              <GoogleCircleFilled className='text-3xl text-[#DB4437]' />
            </Flex>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
