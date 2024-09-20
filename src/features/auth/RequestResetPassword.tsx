import GradientButton from '@/components/GradientButton'
import ROUTER_NAMES from '@/constant/routerNames'
import axiosInstance from '@/inteceptor/axiosInstance'
import { AntDesignOutlined, MailOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Alert, Button, Col, Form, Input, Row, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type ResetPasswordForm = {
  email: string
}

function RequestResetPassword() {
  const navigate = useNavigate()

  const resetPasswordMutation = useMutation({
    mutationFn: (values: ResetPasswordForm) =>
      axiosInstance.post(`/api/auth/send-reset-password-email?email=${values.email}`, {}),
    onSuccess: () => {
      toast.success('Vui lòng kiểm tra email để đặt lại mật khẩu')
      navigate(ROUTER_NAMES.LOGIN)
    },
    onError: (error) => {
      console.error('>>>REQUEST RESET PASSWORD.JSX ERROR', error)
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.')
    }
  })

  return (
    <Row className='my-12 text-center'>
      <Col span={24}>
        <div className='flex items-center justify-center'>
          <Form
            name='requestResetPassword'
            onFinish={(values: ResetPasswordForm) => resetPasswordMutation.mutate(values)}
            autoComplete='off'
            className='my-16 w-[400px] rounded-lg bg-white p-8 shadow-lg'
          >
            <div className='mb-6 flex flex-col items-center justify-center'>
              <img src='/logo.webp' alt='Mogu logo' className='w-36' />
              <Typography.Title level={3} className='text-center'>
                Quên mật khẩu
              </Typography.Title>
              <Typography.Text type='secondary' className='text-center text-xs'>
                Vui lòng nhập email để đặt lại mật khẩu
              </Typography.Text>
            </div>

            {resetPasswordMutation.isError && (
              <Form.Item>
                <Alert message='Có lỗi xảy ra. Vui lòng thử lại sau.' type='error' showIcon />
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
                loading={resetPasswordMutation.isPending}
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
