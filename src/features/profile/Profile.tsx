import { Alert, Card, Form, FormProps, Input } from 'antd'
import {
  AntDesignOutlined
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAppDispatch } from '@/store.ts'
import { updateUserProfileApi } from '@/api/user.api.ts'
import { updateProfile } from '@/features/auth/authSlice.ts'
import GradientButton from '@/components/GradientButton.tsx'
import { selectMenu } from '@/features/profile/profileSlice.ts'

type ChangeProfileForm = {
  lastName: string
  firstName: string
  phoneNumber: string
}

function Profile() {
  const [error] = useState(null)
  const [isLoading] = useState(false)
  const dispatch = useAppDispatch()

  const onFinish: FormProps<ChangeProfileForm>['onFinish'] = async (values) => {
    console.log('Success:', values)
    const response = await updateUserProfileApi(values)

    if (response && response.status === 200) {
      dispatch(updateProfile(response.data))
      toast.success('Cập nhật thông tin cá nhân thành công!')
    }
  }

  useEffect(() => {
    dispatch(selectMenu(['thongTinCaNhan']))
  }, [dispatch])

  return (
    <Card style={{ width: 768, marginBottom: '3rem', borderRadius: 0, borderLeft: 'none' }}>
      <Form
        name="profile"
        onFinish={onFinish}
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
