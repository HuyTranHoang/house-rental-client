import { Col, FormProps, Row } from 'antd'
import { Button, Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import axiosInstance from '../inteceptor/axiosInstance.ts'
import {toast} from 'sonner'
import { useState } from 'react'

type FieldType = {
  name: string;
  email: string;
  message: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
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
          name="contact"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{
            maxWidth: 500,
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            marginTop: '16px',
            marginBottom: '64px',
            border: '1px solid #f0f0f0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)'
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Nội dung"
            name="message"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Họ tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không đúng định dạng!' }
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit" style={{ minWidth: '100px' }} loading={loading}>
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <img src="/contact-icon-mail.png" alt="email image" style={{width: '300px', opacity: '0.5'}} />
      </Col>

    </Row>

  )
}

export default ContactForm
