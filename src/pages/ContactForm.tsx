import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { Button, Col, Form, FormProps, Input, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

type FieldType = {
  name: string
  email: string
  message: string
}

function ContactForm() {
  const { t } = useTranslation('contact')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setLoading(true)
      await axiosInstance.post('/api/contact', values)
      toast.success(t('form.sendSuccess'))
      form.resetFields()
    } catch (error) {
      toast.error(t('form.sendFailure'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[16, 24]} className='flex flex-col-reverse md:flex-row'>
      <Col xs={24} md={12}>
        <Form
          form={form}
          name='contact'
          className='mx-auto mb-8 mt-4 max-w-lg rounded-lg border border-gray-500 bg-white p-4 sm:p-8 md:mx-0 md:mb-16'
          style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)' }}
          onFinish={onFinish}
          autoComplete='off'
          layout='vertical'
          size='large'
        >
          <Form.Item<FieldType>
            label={t('form.message')}
            name='message'
            rules={[{ required: true, message: t('form.messageRequired') }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item<FieldType>
            label={t('form.name')}
            name='name'
            rules={[{ required: true, message: t('form.nameRequired') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label={t('form.email')}
            name='email'
            rules={[
              { required: true, message: t('form.emailRequired') },
              { type: 'email', message: t('form.emailInvalid') }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='w-full sm:w-24' loading={loading}>
              {t('form.send')}
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={24} md={12} className='flex items-center justify-center md:justify-start'>
        <img
          src='/contact-icon-mail.png'
          alt={t('form.emailImageAlt')}
          className='hidden w-48 opacity-50 md:block md:w-64'
        />
      </Col>
    </Row>
  )
}

export default ContactForm
