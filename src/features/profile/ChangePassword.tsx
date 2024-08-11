import { Alert, Card, Form, FormProps, Input } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { changePasswordApi } from '@/api/user.api.ts'
import { toast } from 'sonner'
import GradientButton from '@/components/GradientButton.tsx'


type FieldType = {
  oldPassword: string
  newPassword: string
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

function ChangePassword() {
  const [error] = useState<undefined | string>(undefined)
  const [isLoading] = useState(false)
  const [form] = Form.useForm()


  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    const response = await changePasswordApi(values)

    if (response && response.status === 200) {
      toast.success('Cập nhật mật khẩu thành công!')
      form.resetFields()
    }


  }

  return (
    <Card style={{ width: 768, marginBottom: '3rem', borderRadius: 0, borderLeft: 'none' }}>
      <Form
        form={form}
        name="changePassword"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
        autoComplete="off"
        labelCol={{ span: 6 }}
      >

        {error && <Form.Item>
          <Alert message={error} type="error" showIcon />
        </Form.Item>}

        <Form.Item
          label="Mật khẩu hiện tại"
          name="oldPassword"
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
          <Input.Password placeholder="Mật khẩu hiện tại" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
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
          <Input.Password placeholder="Mật khẩu mới" />
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu mới"
          name="confirmPassword"
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
          <Input.Password placeholder="Nhập lại mật khẩu mới" />
        </Form.Item>


        <Form.Item style={{ marginBottom: '0.6rem' }}>
          <GradientButton type="primary" htmlType="submit" icon={<AntDesignOutlined />}
                          loading={isLoading} block>
            Cập nhật
          </GradientButton>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default ChangePassword
