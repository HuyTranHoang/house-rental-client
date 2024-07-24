import { Alert, Card, Form, FormProps, Input } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons'
import GradientButton from '../../components/GradientButton.jsx'
import { useState } from 'react'


type FieldType = {
  password: string
  newPassword: string
  confirmPassword: string
}
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

function ChangePassword() {
  const [error] = useState<undefined | string>(undefined)
  const [isLoading] = useState(false)

  return (
    <Card style={{ width: 768, marginTop: '2rem', marginBottom: '3rem', borderRadius: 0, borderLeft: 'none' }}>
      <Form
        name="changePassword"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: true }}
        autoComplete="off"
        labelCol={{ span: 6 }}
      >

        {error && <Form.Item>
          <Alert message={error} type="error" showIcon />
        </Form.Item>}

        <Form.Item
          label="Mật khẩu hiện tại"
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu hiện tại!'
            },
            {
              min: 6,
              message: 'Mật khẩu phải có ít nhất 6 ký tự!'
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
              min: 6,
              message: 'Mật khẩu phải có ít nhất 6 ký tự!'
            }
          ]}
        >
          <Input.Password placeholder="Mật khẩu mới" />
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu mới"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập "Nhập lại mật khẩu mới"!'
            },
            {
              min: 6,
              message: 'Mật khẩu phải có ít nhất 6 ký tự!'
            }
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
