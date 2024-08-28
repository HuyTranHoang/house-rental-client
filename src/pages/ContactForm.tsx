import { Button, Col, Form, FormProps, Input, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { toast } from 'sonner'
import axiosInstance from '../inteceptor/axiosInstance.ts'

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
    <Row>
      <Col span={12}>
        <Form
          form={form}
          name='contact'
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          className='mb-16 mt-4 max-w-lg rounded-lg border border-gray-500 bg-white p-8'
          style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)' }}
          onFinish={onFinish}
          autoComplete='off'
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
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
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

          <Form.Item wrapperCol={{ offset: 5, span: 18 }}>
            <Button type='primary' htmlType='submit' className='w-24' loading={loading}>
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <img src='/contact-icon-mail.png' alt='email image' className='w-64 opacity-50' />
      </Col>
    </Row>
  )
}

export default ContactForm
