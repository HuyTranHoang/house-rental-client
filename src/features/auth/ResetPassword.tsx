import { useSelector } from 'react-redux'
import { selectAuth } from './authSlice.ts'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { toast } from 'sonner'
import { Alert, Button, Col, Divider, Form, FormProps, Input, Row, Spin, Typography } from 'antd'
import { AntDesignOutlined, UnlockOutlined } from '@ant-design/icons'
import GradientButton from '@/components/GradientButton.tsx'
import CustomIndicator from '@/components/CustomIndicator.tsx'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import { delay } from '@/utils/delay.ts'

type FieldType = {
  email: string
  token: string
  newPassword: string
  confirmPassword: string
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}


function ResetPassword() {
  const { isAuthenticated } = useSelector(selectAuth)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/'

  const [spinning, setSpinning] = useState(true)

  const [email, setEmail] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    setEmail(searchParams.get('email'))
    setToken(searchParams.get('token'))
  }, [location.search])

  useEffect(() => {
    let isMounted = true;

    if (isAuthenticated) {
      delay(300).then(() => {
        if (isMounted) {
          toast.info('Bạn đã đăng nhập rồi!!!');
          navigate(redirectTo);
        }
      });
    } else {
      delay(300).then(() => {
        if (isMounted) {
          setSpinning(false);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, navigate, redirectTo]);

  const onFinish = async (values: FieldType) => {
    console.log('Success submit:', values)
    setIsLoading(true)
    setError(undefined)

    if (!email || !token) {
      setError('Email hoặc token không hợp lệ!')
      setIsLoading(false)
      return
    }

    values.email = email
    values.token = token

    try {
      await axiosInstance.post('/api/auth/reset-password', values)
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
            name="newPassword"
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
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập "Xác nhận mật khẩu"!'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'))
                }
              })
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu" prefix={<UnlockOutlined />} />
          </Form.Item>

          <Form.Item style={{ marginBottom: '0.6rem' }}>
            <GradientButton type="primary" htmlType="submit" size="large" icon={<AntDesignOutlined />}
                            loading={isLoading} block>
              Đặt lại mật khẩu
            </GradientButton>
          </Form.Item>

          <Form.Item style={{ display: 'inline' }}>
            <Typography.Text>
              Bạn đã có tài khoản?
            </Typography.Text>
            <Link to={ROUTER_NAMES.LOGIN}>
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

export default ResetPassword
