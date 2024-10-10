import { updateUserProfileApi } from '@/api/user.api.ts'
import GradientButton from '@/components/GradientButton.tsx'
import { useUserMembership } from '@/hooks/useUserMembership.ts'
import useAuthStore from '@/store/authStore.ts'
import { calculateMembershipRemainingDays } from '@/utils/formatDate.ts'
import { AntDesignOutlined, ClockCircleOutlined, FireOutlined, ReloadOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Alert, Card, Form, Input, Progress, ProgressProps, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

const { Text } = Typography

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

  const { t } = useTranslation('profile')

  const { mutate: updateUserProfileMutate, isPending } = useMutation({
    mutationFn: updateUserProfileApi,
    onSuccess: (response) => {
      if (!response) return

      updateProfile(response.data)
      toast.success(t('toast.updateProfileSuccess'))
    },
    onError: () => {
      toast.error(t('toast.updateProfileFailed'))
    }
  })

  return (
    <>
      <Card className='mb-6 rounded-none border-l-0 md:hidden'>
        {membership && (
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Text>
                <ClockCircleOutlined className='mr-2' />
                {t('accountType.remainingTerm')}:
              </Text>
              {remainingDays <= 0 && <Text className='text-xl font-semibold'>∞</Text>}
              {remainingDays > 0 && (
                <Text strong>
                  {remainingDays} {t('accountType.days')}
                </Text>
              )}
            </div>
            {remainingDays <= 0 && <Progress strokeColor={twoColors} percent={100} showInfo={false} />}
            {remainingDays > 0 && (
              <Progress strokeColor={twoColors} percent={Math.round((remainingDays / 30) * 100)} showInfo={false} />
            )}
            <div className='flex items-center justify-between'>
              <Text>
                <ReloadOutlined className='mr-2' />
                {t('accountType.refeshCount')}:
              </Text>
              <Text strong>
                {membership.totalRefreshLimit - membership.refreshesPostsUsed}/{membership.totalRefreshLimit}
              </Text>
            </div>
            <Progress
              strokeColor={twoColors}
              percent={Math.round(
                ((membership.totalRefreshLimit - membership.refreshesPostsUsed) / membership.totalRefreshLimit) * 100
              )}
              showInfo={false}
            />
            <div className='flex items-center justify-between'>
              <Text>
                <FireOutlined className='mr-2' />
                {t('accountType.priorityCount')}:
              </Text>
              <Text strong>
                {membership.totalPriorityLimit - membership.priorityPostsUsed}/{membership.totalPriorityLimit}
              </Text>
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
        title={<Typography.Title level={4}>{t('personalInfo.title')}</Typography.Title>}
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
            label={t('personalInfo.lastName')}
            name='lastName'
            rules={[
              {
                required: true,
                message: t('changePassword.requiredOldPassword')
              }
            ]}
          >
            <Input placeholder={t('personalInfo.lastName')} />
          </Form.Item>
          <Form.Item<ChangeProfileForm>
            label={t('personalInfo.firstName')}
            name='firstName'
            rules={[
              {
                required: true,
                message: t('changePassword.requiredNewPassword')
              }
            ]}
          >
            <Input placeholder={t('personalInfo.firstName')} />
          </Form.Item>

          <Form.Item<ChangeProfileForm>
            label={t('personalInfo.phoneNumber')}
            name='phoneNumber'
            rules={[
              {
                required: true,
                message: t('changePassword.requiredReEnterNewPassword')
              },
              {
                pattern: new RegExp(/(84|0[35789])+([0-9]{8})\b/),
                message: t('changePassword.validatePassword')
              }
            ]}
          >
            <Input placeholder={t('personalInfo.phoneNumber')} />
          </Form.Item>

          <Form.Item>
            <GradientButton type='primary' htmlType='submit' icon={<AntDesignOutlined />} loading={isPending} block>
              {t('personalInfo.update')}
            </GradientButton>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

export default Profile