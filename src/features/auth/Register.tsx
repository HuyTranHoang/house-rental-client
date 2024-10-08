import GradientButton from '@/components/GradientButton'
import ROUTER_NAMES from '@/constant/routerNames'
import axiosInstance from '@/inteceptor/axiosInstance'
import { AntDesignOutlined, MailOutlined, PhoneOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Alert, Button, Col, Flex, Form, Input, Row, Space, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type RegisterFormType = {
  lastName: string
  firstName: string
  username: string
  password: string
  email: string
  phoneNumber: string
}

export default function Register() {
  const navigate = useNavigate()

  const registerMutation = useMutation({
    mutationFn: (values: RegisterFormType) => axiosInstance.post('/api/auth/register', values),
    onSuccess: () => {
      toast.success('Đăng ký thành công')
      navigate(ROUTER_NAMES.LOGIN)
    },
    onError: () => {
      toast.error('Đăng ký thất bại. Vui lòng thử lại.')
    }
  })

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
          name='register'
          onFinish={(values: RegisterFormType) => registerMutation.mutate(values)}
          autoComplete='off'
          className='w-full max-w-[400px] rounded-lg bg-white p-8 shadow-lg'
        >
          <Flex vertical justify='center' align='center' className='mb-6'>
            <img src='/logo.webp' alt='Mogu logo' className='w-36' />
            <Typography.Title level={3} className='text-center'>
              Đăng ký
            </Typography.Title>
            <Typography.Text type='secondary' className='text-center text-xs'>
              Đăng ký tài khoản để sử dụng dịch vụ của chúng tôi
            </Typography.Text>
          </Flex>

          {registerMutation.isError && (
            <Form.Item>
              <Alert message='Đăng ký thất bại. Vui lòng thử lại.' type='error' showIcon />
            </Form.Item>
          )}

          <Flex gap='small' justify='space-between' className='flex-col sm:flex-row'>
            <Form.Item
              name='lastName'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ!'
                }
              ]}
              className='w-full sm:w-1/2'
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
              className='w-full sm:w-1/2'
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
              loading={registerMutation.isPending}
              block
            >
              Đăng ký
            </GradientButton>
          </Form.Item>

          <Space className='w-full justify-center'>
            <Typography.Text>Bạn đã có tài khoản?</Typography.Text>
            <Link to={ROUTER_NAMES.LOGIN}>
              <Button type='link'>Đăng nhập</Button>
            </Link>
          </Space>
        </Form>
      </Col>
    </Row>
  )
}
