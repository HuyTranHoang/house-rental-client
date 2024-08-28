import CustomIndicator from '@/components/CustomIndicator.tsx'
import GradientButton from '@/components/GradientButton.tsx'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { delay } from '@/utils/delay.ts'
import { AntDesignOutlined, MailOutlined } from '@ant-design/icons'
import { Alert, Button, Col, Form, Input, Row, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { selectAuth } from './authSlice.ts'

type FieldType = {
  email: string
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
      await axiosInstance.post(`/api/auth/send-reset-password-email?email=${values.email}`, {})
      toast.success('Vui lòng kiểm tra email để đặt lại mật khẩu')
      navigate(ROUTER_NAMES.LOGIN)
    } catch (error) {
      console.log('>>>REQUEST RESET PASSWORD.JSX ERROR', error)
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
            name='requestResetPassword'
            onFinish={onFinish}
            autoComplete='off'
            className='my-16 w-[400px] rounded-lg bg-white p-8 shadow-lg'
          >
            <div className='mb-6 flex flex-col items-center justify-center'>
              <img src='/logo.png' alt='Mogu logo' className='w-36' />
              <Typography.Title level={3} className='text-center'>
                Quên mật khẩu
              </Typography.Title>
              <Typography.Text type='secondary' className='text-center text-xs'>
                Vui lòng nhập email để đặt lại mật khẩu
              </Typography.Text>
            </div>

            {error && (
              <Form.Item>
                <Alert message={error} type='error' showIcon />
              </Form.Item>
            )}

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

            <Form.Item className='mb-2'>
              <GradientButton
                type='primary'
                htmlType='submit'
                size='large'
                icon={<AntDesignOutlined />}
                loading={isLoading}
                block
              >
                Gửi email đặt lại mật khẩu
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

export default RequestResetPassword
