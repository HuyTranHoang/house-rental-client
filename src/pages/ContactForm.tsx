import { Col, FormProps, Row } from 'antd'
import { Button, Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'

type FieldType = {
  content: string;
  phoneNumber: string;
  email: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

function ContactForm() {
  return (
    <Row>
      <Col span={12}>
        <Form
          name="contact"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{
            maxWidth: 500,
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            marginTop: '16px',
            marginBottom: '64px'
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Nội dung"
            name="content"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Số điện thoại"
            name="phoneNumber"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit" style={{ minWidth: '100px' }}>
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
