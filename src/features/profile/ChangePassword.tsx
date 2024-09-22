import { changePasswordApi } from '@/api/user.api.ts'
import GradientButton from '@/components/GradientButton.tsx'
import { AntDesignOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Alert, Card, Form, Input, Typography } from 'antd'
import { useState } from 'react'
import { toast } from 'sonner'

type ChangePasswordField = {
  oldPassword: string
  newPassword: string
}

function ChangePassword() {
  const [error] = useState<undefined | string>(undefined)
  const [form] = Form.useForm()

  const { mutate: updatePasswordMutate, isPending } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: (response) => {
      if (response && response.status === 200) {
        toast.success('Cập nhật mật khẩu thành công!')
        form.resetFields()
      }
    },
    onError: (error: string[]) => {
      toast.error(error || 'Cập nhật mật khẩu thất bại!')
    }
  })

  return (
    <Card
      title={<Typography.Title level={4}>Thay đổi mật khẩu</Typography.Title>}
      className='mb-12 rounded-none border-l-0'
    >
      <Form
        form={form}
        name='changePassword'
        onFinish={(values: ChangePasswordField) => updatePasswordMutate(values)}
        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
        autoComplete='off'
        labelCol={{ span: 6 }}
      >
        {error && (
          <Form.Item>
            <Alert message={error} type='error' showIcon />
          </Form.Item>
        )}

        <Form.Item
          label='Mật khẩu hiện tại'
          name='oldPassword'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu hiện tại!'
            },
            {
              pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
              message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số!'
            }
          ]}
        >
          <Input.Password placeholder='Mật khẩu hiện tại' />
        </Form.Item>

        <Form.Item
          label='Mật khẩu mới'
          name='newPassword'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu mới!'
            },
            {
              pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
              message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số!'
            }
          ]}
        >
          <Input.Password placeholder='Mật khẩu mới' />
        </Form.Item>

        <Form.Item
          label='Nhập lại mật khẩu mới'
          name='confirmPassword'
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập "Nhập lại mật khẩu mới"!'
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
          <Input.Password placeholder='Nhập lại mật khẩu mới' />
        </Form.Item>

        <Form.Item>
          <GradientButton type='primary' htmlType='submit' icon={<AntDesignOutlined />} loading={isPending} block>
            Cập nhật mật khẩu
          </GradientButton>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default ChangePassword
