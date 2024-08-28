import CustomIndicator from '@/components/CustomIndicator.tsx'
import GradientButton from '@/components/GradientButton.jsx'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { delay } from '@/utils/delay.ts'
import { AntDesignOutlined, MailOutlined, PhoneOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Col, Flex, Form, FormProps, Input, Row, Space, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { selectAuth } from './authSlice.ts'

type FieldType = {
  lastName: string
  firstName: string
  username: string
  password: string
  email: string
  phoneNumber: string
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

function Register() {
  const { isAuthenticated } = useSelector(selectAuth)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
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
    setIsLoading(true)
    setError(undefined)
    try {
      await axiosInstance.post('/api/auth/register', values)
      toast.success('Đăng ký thành công')
      navigate('/login')
    } catch (error) {
      console.log('>>>REGISTER.JSX ERROR', error)
      setError(error as string)
    } finally {
      setIsLoading(false)
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
    <>
      <Row className='relative text-center'>
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
        <Col md={5}></Col>
        <Col md={14}>
          <Flex justify='center' align='middle'>
            <Form
              name='register'
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
              className='my-16 w-[400px] rounded-lg bg-white p-8 shadow-lg'
            >
              <Flex vertical justify='center' align='center' className='mb-6'>
                <img src='/logo.png' alt='Mogu logo' className='w-36' />
                <Typography.Title level={3} className='text-center'>
                  Đăng ký
                </Typography.Title>
                <Typography.Text type='secondary' className='text-center text-xs'>
                  Đăng ký tài khoản để sử dụng dịch vụ của chúng tôi
                </Typography.Text>
              </Flex>

              {error && (
                <Form.Item>
                  <Alert message={error} type='error' showIcon />
                </Form.Item>
              )}

              <Flex gap='small' justify='space-between'>
                <Form.Item
                  name='lastName'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập họ!'
                    }
                  ]}
                >
                  <Input placeholder='Họ' />
                </Form.Item>
                <Form.Item
                  name='firstName'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên!'
                    }
                  ]}
                >
                  <Input placeholder='Tên' />
                </Form.Item>
              </Flex>
              <Form.Item
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tài khoản!'
                  },
                  {
                    min: 4,
                    message: 'Tài khoản phải có ít nhất 4 ký tự!'
                  },
                  {
                    max: 50,
                    message: 'Tài khoản không được quá 50 ký tự!'
                  }
                ]}
              >
                <Input placeholder='Tài khoản' prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!'
                  },
                  {
                    pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
                    message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số!'
                  }
                ]}
              >
                <Input.Password placeholder='Mật khẩu' prefix={<UnlockOutlined />} />
              </Form.Item>

              <Form.Item
                name='email'
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
                <Input placeholder='Email' prefix={<MailOutlined />} />
              </Form.Item>

              <Form.Item
                name='phoneNumber'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại!'
                  },
                  {
                    pattern: new RegExp(/(84|0[35789])+([0-9]{8})\b/),
                    message: 'Số điện thoại không hợp lệ!'
                  }
                ]}
              >
                <Input placeholder='Số điện thoại' prefix={<PhoneOutlined />} />
              </Form.Item>

              <Form.Item className='mb-1.5'>
                <GradientButton
                  type='primary'
                  htmlType='submit'
                  size='large'
                  icon={<AntDesignOutlined />}
                  loading={isLoading}
                  block
                >
                  Đăng ký
                </GradientButton>
              </Form.Item>

              <Space>
                <Typography.Text>Bạn đã có tài khoản?</Typography.Text>
                <Link to={ROUTER_NAMES.LOGIN}>
                  <Button type='link'>Đăng nhập</Button>
                </Link>
              </Space>
            </Form>
          </Flex>
        </Col>
        <Col md={5}></Col>
      </Row>
    </>
  )
}

export default Register
