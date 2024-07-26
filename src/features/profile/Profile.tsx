import { Alert, Avatar, Button, Card, Divider, Form, FormProps, Input, Space } from 'antd'
import {
  AntDesignOutlined,
  UploadOutlined,
  UserOutlined
} from '@ant-design/icons'
import GradientButton from '../../components/GradientButton.jsx'
import { useState } from 'react'
import { toast } from 'sonner'
import { useAppDispatch } from '../../store.ts'
import { updateProfile } from '../auth/authSlice.ts'
import { updateUserProfileApi } from '../../fetchers/user.fetch.ts'

type FieldType = {
  lastName: string
  firstName: string
  // email: string
  phoneNumber: string
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}


function Profile() {
  const [error] = useState(null)
  const [isLoading] = useState(false)
  const dispatch = useAppDispatch()

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    const response = await updateUserProfileApi(values)

    if (response && response.status === 200) {
      dispatch(updateProfile(response.data))
      toast.success('Cập nhật thông tin cá nhân thành công!')
    }
  }

  return (
    <Card style={{ width: 768, marginBottom: '3rem', borderRadius: 0, borderLeft: 'none' }}>
      <Space size={32}>
        <Avatar size={64} icon={<UserOutlined />} />
        <Button type="primary" icon={<UploadOutlined />}>Tải ảnh lên</Button>
      </Space>

      <Divider />

      <Form
        name="profile"
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
          label="Họ"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ!'
            }
          ]}
        >
          <Input placeholder="Họ" />
        </Form.Item>
        <Form.Item
          label="Tên"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên!'
            }
          ]}
        >
          <Input placeholder="Tên" />
        </Form.Item>


        {/*<Form.Item*/}
        {/*  label="Email"*/}
        {/*  name="email"*/}
        {/*  rules={[*/}
        {/*    {*/}
        {/*      required: true,*/}
        {/*      message: 'Vui lòng nhập email!'*/}
        {/*    },*/}
        {/*    {*/}
        {/*      type: 'email',*/}
        {/*      message: 'Email không hợp lệ!'*/}
        {/*    }*/}
        {/*  ]}*/}
        {/*>*/}
        {/*  <Input placeholder="Email" />*/}
        {/*</Form.Item>*/}

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại!'
            },
            {
              pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
              message: 'Số điện thoại không hợp lệ!'
            }
          ]}
        >
          <Input placeholder="Số điện thoại" />
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

export default Profile
