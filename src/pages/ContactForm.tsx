import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { Button, Col, Form, FormProps, Input, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { toast } from 'sonner'

type FieldType = {
  name: string
  email: string
  message: string
}

function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setLoading(true)
      await axiosInstance.post('/api/contact', values)
      toast.success('Gửi thành công!')
      form.resetFields()
    } catch (error) {
      toast.error('Gửi thất bại, vui lòng thử lại sau!')
      console.error('CONTACTFORM.TSX >>>:', error)
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
            label='Nội dung'
            name='message'
            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item<FieldType>
            label='Họ tên'
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không đúng định dạng!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='w-full sm:w-24' loading={loading}>
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={24} md={12} className='flex items-center justify-center md:justify-start'>
        <img src='/contact-icon-mail.png' alt='email image' className='hidden w-48 opacity-50 md:block md:w-64' />
      </Col>
    </Row>
  )
}

export default ContactForm
