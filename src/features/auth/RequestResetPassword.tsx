import { useSelector } from 'react-redux'
import { selectAuth } from './authSlice.ts'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../inteceptor/axiosInstance.ts'
import { toast } from 'sonner'
import Spinner from '../../components/Spinner.tsx'
import { Alert, Button, Col, Divider, Form, FormProps, Input, Row, Typography } from 'antd'
import { AntDesignOutlined, MailOutlined } from '@ant-design/icons'
import GradientButton from '../../components/GradientButton.tsx'


type FieldType = {
  email: string
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

function RequestResetPassword() {
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
      await axiosInstance.post(`/api/auth/send-reset-password-email?email=${values.email}`, {})
      toast.success('Vui lòng kiểm tra email để đặt lại mật khẩu')
      navigate('/login')
    } catch (error) {
      console.log('>>>REQUEST RESET PASSWORD.JSX ERROR', error)
      setError(error as string)
    } finally {
      setIsLoading(false)
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
          name="requestResetPassword"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{ span: 8 }}
        >

          {error && <Form.Item>
            <Alert message={error} type="error" showIcon />
          </Form.Item>}

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

          <Form.Item style={{ marginBottom: '0.6rem' }}>
            <GradientButton type="primary" htmlType="submit" size="large" icon={<AntDesignOutlined />}
                            loading={isLoading} block>
              Gửi email đặt lại mật khẩu
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

export default RequestResetPassword
