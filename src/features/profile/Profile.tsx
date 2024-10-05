import { updateUserProfileApi } from '@/api/user.api.ts'
import GradientButton from '@/components/GradientButton.tsx'
import useAuthStore from '@/store/authStore.ts'
import { useUserMembership } from '@/hooks/useUserMembership.ts'
import { calculateMembershipRemainingDays } from '@/utils/formatDate.ts'
import { AntDesignOutlined, ClockCircleOutlined, CrownOutlined, FireOutlined, ReloadOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Alert, Card, Form, Input, Progress, ProgressProps, Typography } from 'antd'
import { useState } from 'react'
import { toast } from 'sonner'

type ChangeProfileForm = {
  lastName: string
  firstName: string
  phoneNumber: string
}

const twoColors: ProgressProps['strokeColor'] = {
  '0%': '#108ee9',
  '100%': '#87d068'
}

function Profile() {
  const [error] = useState(null)
  const currentUser = useAuthStore((state) => state.user)
  const updateProfile = useAuthStore((state) => state.updateProfile)

  const { data: membership } = useUserMembership(currentUser?.id)
  const remainingDays = calculateMembershipRemainingDays(membership)

  const { mutate: updateUserProfileMutate, isPending } = useMutation({
    mutationFn: updateUserProfileApi,
    onSuccess: (response) => {
      if (!response) return

      updateProfile(response.data)
      toast.success('Cập nhật thông tin cá nhân thành công!')
    },
    onError: () => {
      toast.error('Cập nhật thông tin cá nhân thất bại!')
    }
  })

  return (
    <>
      <Card className='mb-6 rounded-none border-l-0 md:hidden'>
        {membership && (
          <div className='space-y-2'>
            <div className='flex items-center'>
              <CrownOutlined className='mr-2 text-lg text-yellow-500' />
              <Typography.Text>
                Loại tài khoản: <strong>{membership.membershipName}</strong>
              </Typography.Text>
            </div>
            <div className='flex items-center justify-between'>
              <Typography.Text>
                <ClockCircleOutlined className='mr-2' />
                Thời hạn còn lại:
              </Typography.Text>
              {remainingDays <= 0 && <Typography.Text className='text-xl font-semibold'>∞</Typography.Text>}
              {remainingDays > 0 && <Typography.Text strong>{remainingDays} ngày</Typography.Text>}
            </div>
            {remainingDays <= 0 && <Progress strokeColor={twoColors} percent={100} showInfo={false} />}
            {remainingDays > 0 && (
              <Progress strokeColor={twoColors} percent={Math.round((remainingDays / 30) * 100)} showInfo={false} />
            )}
            <div className='flex items-center justify-between'>
              <Typography.Text>
                <ReloadOutlined className='mr-2' />
                Lượt làm mới:
              </Typography.Text>
              <Typography.Text strong>
                {membership.totalRefreshLimit - membership.refreshesPostsUsed}/{membership.totalRefreshLimit}
              </Typography.Text>
            </div>
            <Progress
              strokeColor={twoColors}
              percent={Math.round(
                ((membership.totalRefreshLimit - membership.refreshesPostsUsed) / membership.totalRefreshLimit) * 100
              )}
              showInfo={false}
            />
            <div className='flex items-center justify-between'>
              <Typography.Text>
                <FireOutlined className='mr-2' />
                Lượt đẩy bài ưu tiên:
              </Typography.Text>
              <Typography.Text strong>
                {membership.totalPriorityLimit - membership.priorityPostsUsed}/{membership.totalPriorityLimit}
              </Typography.Text>
            </div>
            <Progress
              strokeColor={twoColors}
              percent={Math.round(
                ((membership.totalPriorityLimit - membership.priorityPostsUsed) / membership.totalPriorityLimit) * 100
              )}
              showInfo={false}
            />
          </div>
        )}
      </Card>
      <Card
        title={<Typography.Title level={4}>Thay đổi thông tin cá nhân</Typography.Title>}
        className='mb-12 rounded-none border-l-0'
      >
        <Form
          name='profile'
          initialValues={{
            lastName: currentUser!.lastName,
            firstName: currentUser!.firstName,
            phoneNumber: currentUser!.phoneNumber
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
    </>
  )
}

export default Profile
