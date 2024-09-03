import { updateUserProfileApi } from '@/api/user.api.ts'
import GradientButton from '@/components/GradientButton.tsx'
import { selectAuth, updateProfile } from '@/features/auth/authSlice.ts'
import { useAppDispatch } from '@/store.ts'
import { AntDesignOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Alert, Card, Form, Input, Typography } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

type ChangeProfileForm = {
  lastName: string
  firstName: string
  phoneNumber: string
}

function Profile() {
  const [error] = useState(null)
  const dispatch = useAppDispatch()
  const { user } = useSelector(selectAuth)

  const { mutate: updateUserProfileMutate, isPending } = useMutation({
    mutationFn: updateUserProfileApi,
    onSuccess: (response) => {
      if (!response) return

      dispatch(updateProfile(response.data))
      toast.success('Cập nhật thông tin cá nhân thành công!')
    },
    onError: () => {
      toast.error('Cập nhật thông tin cá nhân thất bại!')
    }
  })

  return (
    <Card
      title={<Typography.Title level={4}>Thay đổi thông tin cá nhân</Typography.Title>}
      className='mb-12 w-[768px] rounded-none border-l-0'
    >
      <Form
        name='profile'
        initialValues={{
          lastName: user!.lastName,
          firstName: user!.firstName,
          phoneNumber: user!.phoneNumber
        }}
        onFinish={(values) => updateUserProfileMutate(values)}
        autoComplete='off'
        labelCol={{ span: 6 }}
      >
        {error && (
          <Form.Item>
            <Alert message={error} type='error' showIcon />
          </Form.Item>
        )}

        <Form.Item<ChangeProfileForm>
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
        <Form.Item<ChangeProfileForm>
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

        <Form.Item<ChangeProfileForm>
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
          <GradientButton type='primary' htmlType='submit' icon={<AntDesignOutlined />} loading={isPending} block>
            Cập nhật thông tin
          </GradientButton>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Profile
