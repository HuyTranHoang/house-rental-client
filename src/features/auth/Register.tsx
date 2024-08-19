import { Alert, Button, Col, Divider, Flex, Form, FormProps, Input, Row, Spin, Typography } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AntDesignOutlined, MailOutlined, PhoneOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons'
import GradientButton from '@/components/GradientButton.jsx'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { selectAuth } from './authSlice.ts'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import CustomIndicator from '@/components/CustomIndicator.tsx'

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
    if (isAuthenticated) {
      setTimeout(() => {
        navigate(redirectTo)
      }, 300)
    } else {
      setTimeout(() => {
        setSpinning(false)
      }, 300)
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
                pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
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
