import { changePasswordApi } from '@/api/user.api.ts'
import GradientButton from '@/components/GradientButton.tsx'
import { AntDesignOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Alert, Card, Form, Input, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

type ChangePasswordField = {
  oldPassword: string
  newPassword: string
}

function ChangePassword() {
  const [error] = useState<undefined | string>(undefined)
  const [form] = Form.useForm()
  const { t } = useTranslation('profile')

  const { mutate: updatePasswordMutate, isPending } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: (response) => {
      if (response && response.status === 200) {
        toast.success(t('toast.changePasswordSuccess'))
        form.resetFields()
      }
    },
    onError: (error: string[]) => {
      toast.error(error || t('toast.changePasswordFailed'))
    }
  })

  return (
    <Card
      title={<Typography.Title level={4}>{t('changePassword.changePassword')}</Typography.Title>}
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
          label={t('changePassword.oldPassword')}
          name='oldPassword'
          rules={[
            {
              required: true,
              message: t('changePassword.requiredOldPassword')
            },
            {
              pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
              message: t('changePassword.validatePassword')
            }
          ]}
        >
          <Input.Password placeholder={t('changePassword.oldPassword')} />
        </Form.Item>

        <Form.Item
          label={t('changePassword.newPassword')}
          name='newPassword'
          rules={[
            {
              required: true,
              message: t('changePassword.requiredNewPassword')
            },
            {
              pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
              message: t('changePassword.validatePassword')
            }
          ]}
        >
          <Input.Password placeholder={t('changePassword.newPassword')} />
        </Form.Item>

        <Form.Item
          label={t('changePassword.reEnterNewPassword')}
          name='confirmPassword'
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: t('changePassword.requiredReEnterNewPassword')
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(t('changePassword.passwordNotMatch')))
              }
            })
          ]}
        >
          <Input.Password placeholder={t('changePassword.reEnterNewPassword')} />
        </Form.Item>

        <Form.Item>
          <GradientButton type='primary' htmlType='submit' icon={<AntDesignOutlined />} loading={isPending} block>
            {t('changePassword.updatePassword')}
          </GradientButton>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default ChangePassword
