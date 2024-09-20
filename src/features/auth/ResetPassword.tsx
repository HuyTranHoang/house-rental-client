import GradientButton from '@/components/GradientButton'
import ROUTER_NAMES from '@/constant/routerNames'
import axiosInstance from '@/inteceptor/axiosInstance'
import { AntDesignOutlined, UnlockOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Alert, Button, Col, Form, Input, Row, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

type ResetPasswordForm = {
  email: string
  token: string
  newPassword: string
  confirmPassword: string
}

function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    setEmail(searchParams.get('email'))
    setToken(searchParams.get('token'))
  }, [searchParams])

  const resetPasswordMutation = useMutation({
    mutationFn: (values: ResetPasswordForm) => axiosInstance.post('/api/auth/reset-password', values),
    onSuccess: () => {
      toast.success('Đặt lại mật khẩu thành công')
      navigate(ROUTER_NAMES.LOGIN)
    },
    onError: (error) => {
      console.error('>>>RESET PASSWORD.JSX ERROR', error)
      toast.error('Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.')
    }
  })

  const onFinish = (values: Omit<ResetPasswordForm, 'email' | 'token'>) => {
    if (!email || !token) {
      toast.error('Email hoặc token không hợp lệ!')
      return
    }

    resetPasswordMutation.mutate({
      ...values,
      email,
      token
    })
  }

  return (
    <Row className='my-12 text-center'>
      <Col span={24}>
        <div className='flex items-center justify-center'>
          <Form
            name='resetPassword'
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

            {resetPasswordMutation.isError && (
              <Form.Item>
                <Alert message='Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.' type='error' showIcon />
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
                loading={resetPasswordMutation.isPending}
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
