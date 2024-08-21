import { Alert, Button, Col, Flex, Form, FormProps, Input, Row, Space, Spin, Typography } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AntDesignOutlined, MailOutlined, PhoneOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons'
import GradientButton from '@/components/GradientButton.jsx'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { selectAuth } from './authSlice.ts'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import CustomIndicator from '@/components/CustomIndicator.tsx'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import { delay } from '@/utils/delay.ts'

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
    return <Spin indicator={<CustomIndicator />}
                 spinning={spinning}
                 tip={'Đang tải dữ liệu...Vui lòng đợi trong giây lát!!!'}
                 fullscreen />
  }

  return (
    <Row style={{ textAlign: 'center', margin: '3rem 0' }}>
      <Col span={24}>
        <Flex justify="center" align="middle">
          <Form
            name="register"
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
              <Typography.Title level={3} style={{ textAlign: 'center' }}>Đăng ký</Typography.Title>
              <Typography.Text type="secondary" className="centered-text" style={{ fontSize: 12 }}>
                Đăng ký tài khoản để sử dụng dịch vụ của chúng tôi
              </Typography.Text>
            </Flex>

            {error && <Form.Item>
              <Alert message={error} type="error" showIcon />
            </Form.Item>}

            <Flex gap="small" justify="space-between">
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
              <Input placeholder="Tài khoản" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="password"
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
                {
                  pattern: new RegExp(/(84|0[35789])+([0-9]{8})\b/),
                  message: 'Số điện thoại không hợp lệ!'
                }
              ]}
            >
              <Input placeholder="Số điện thoại" prefix={<PhoneOutlined />} />
            </Form.Item>

            <Form.Item style={{ marginBottom: '0.6rem' }}>
              <GradientButton type="primary" htmlType="submit" size="large" icon={<AntDesignOutlined />}
                              loading={isLoading} block>
                Đăng ký
              </GradientButton>
            </Form.Item>

            <Space>
              <Typography.Text>
                Bạn đã có tài khoản?
              </Typography.Text>
              <Link to={ROUTER_NAMES.LOGIN}>
                <Button type="link">
                  Đăng nhập
                </Button>
              </Link>
            </Space>
          </Form>
        </Flex>
      </Col>
    </Row>
  )
}

export default Register
