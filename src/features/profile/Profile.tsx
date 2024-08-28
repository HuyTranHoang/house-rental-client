import { updateUserProfileApi } from '@/api/user.api.ts'
import GradientButton from '@/components/GradientButton.tsx'
import { updateProfile } from '@/features/auth/authSlice.ts'
import { selectMenu } from '@/features/profile/profileSlice.ts'
import { useAppDispatch } from '@/store.ts'
import { AntDesignOutlined } from '@ant-design/icons'
import { Alert, Card, Form, FormProps, Input, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

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
    <Card
      title={<Typography.Title level={4}>Thay đổi thông tin cá nhân</Typography.Title>}
      className='mb-12 w-[768px] rounded-none border-l-0'
    >
      <Form name='profile' onFinish={onFinish} autoComplete='off' labelCol={{ span: 6 }}>
        {error && (
          <Form.Item>
            <Alert message={error} type='error' showIcon />
          </Form.Item>
        )}

        <Form.Item
          label='Họ'
          name='lastName'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ!'
            }
          ]}
        >
          <Input placeholder='Họ' />
        </Form.Item>
        <Form.Item
          label='Tên'
          name='firstName'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên!'
            }
          ]}
        >
          <Input placeholder='Tên' />
        </Form.Item>

        <Form.Item
          label='Số điện thoại'
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
          <Input placeholder='Số điện thoại' />
        </Form.Item>

        <Form.Item>
          <GradientButton type='primary' htmlType='submit' icon={<AntDesignOutlined />} loading={isLoading} block>
            Cập nhật
          </GradientButton>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Profile
