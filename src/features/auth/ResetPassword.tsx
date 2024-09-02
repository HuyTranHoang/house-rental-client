import CustomIndicator from '@/components/CustomIndicator.tsx'
import GradientButton from '@/components/GradientButton.tsx'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { delay } from '@/utils/delay.ts'
import { AntDesignOutlined, UnlockOutlined } from '@ant-design/icons'
import { Alert, Button, Col, Form, Input, Row, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { selectAuth } from './authSlice.ts'

type FieldType = {
  email: string
  token: string
  newPassword: string
  confirmPassword: string
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

    if (!email || !token) {
      setError('Email hoặc token không hợp lệ!')
      setIsLoading(false)
      return
    }

    values.email = email
    values.token = token

    try {
      await axiosInstance.post('/api/auth/reset-password', values)
      toast.success('Đặt lại mật khẩu thành công')
      navigate(ROUTER_NAMES.LOGIN)
    } catch (error) {
      console.log('>>>RESET PASSWORD.JSX ERROR', error)
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
    <Row className='my-12 text-center'>
      <Col span={24}>
        <div className='flex items-center justify-center'>
          <Form
            name='resetPassword'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            className='my-16 w-[400px] rounded-lg bg-white p-8 shadow-lg'
          >
            <div className='mb-6 flex flex-col items-center justify-center'>
              <img src='/logo.webp' alt='Mogu logo' className='w-36' />
              <Typography.Title level={3} className='text-center'>
                Đặt lại mật khẩu
              </Typography.Title>
              <Typography.Text type='secondary' className='text-center text-xs'>
                Nhập mật khẩu mới để đặt lại mật khẩu
              </Typography.Text>
            </div>

            {error && (
              <Form.Item>
                <Alert message={error} type='error' showIcon />
              </Form.Item>
            )}

            <Form.Item
              name='newPassword'
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
              name='confirmPassword'
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
              <Input.Password placeholder='Xác nhận mật khẩu' prefix={<UnlockOutlined />} />
            </Form.Item>

            <Form.Item className='mb-2'>
              <GradientButton
                type='primary'
                htmlType='submit'
                size='large'
                icon={<AntDesignOutlined />}
                loading={isLoading}
                block
              >
                Đặt lại mật khẩu
              </GradientButton>
            </Form.Item>

            <Form.Item className='inline'>
              <Typography.Text>Bạn đã có tài khoản?</Typography.Text>
              <Link to={ROUTER_NAMES.LOGIN}>
                <Button type='link'>Đăng nhập</Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  )
}

export default ResetPassword
