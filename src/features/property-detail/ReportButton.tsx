import { Button, Flex, Form, FormProps, Input, Modal, Select } from 'antd'
import { WarningOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/lib/form/Form'
import TextArea from 'antd/es/input/TextArea'

const { Option } = Select

type ReportFieldType = {
  propertyId: number;
  reason: string;
  category: string;
};

function ReportButton({ propertyId }: { propertyId: number }) {

  const [form] = useForm<ReportFieldType>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onCategoryChange = (value: string) => {
    switch (value) {
      case 'SCAM':
        form.setFieldsValue({ reason: 'Bài đăng này có dấu hiệu lừa đảo!'})
        break
      case 'INAPPROPRIATE_CONTENT':
        form.setFieldsValue({ reason: 'Bài đăng này có nội dung không phù hợp!' })
        break
      case 'DUPLICATE':
        form.setFieldsValue({ reason: 'Bài đăng này bị trùng lặp!' })
        break
      case 'MISINFORMATION':
        form.setFieldsValue({ reason: 'Bài đăng này có thông tin sai sự thật!' })
        break
      case 'OTHER':
        form.setFieldsValue({ reason: '' })
        break
      default:
    }
  }


  const onFinish: FormProps<ReportFieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
  }

  useEffect(() => {
    form.setFieldsValue({ propertyId: propertyId })
  }, [form, propertyId])

  return (
    <>
      <Button icon={<WarningOutlined />} iconPosition="end" size="small"
              onClick={showModal}
              style={{ marginTop: 24, fontWeight: 600, color: '#657786', borderColor: '#9fbdd4' }}>
        Báo vi phạm
      </Button>

      <Modal title="Báo cáo vi phạm"
             footer={null}
             open={isModalOpen}
             onOk={handleOk}
             onCancel={handleCancel}>
        <Form
          form={form}
          name="report"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<ReportFieldType> name="propertyId" hidden>
            <Input />
          </Form.Item>

          <Form.Item<ReportFieldType>
            label="Loại vi phạm"
            name="category"
            rules={[{ required: true, message: 'Vui lòng chọn loại vi phạm!' }]}
          >
            <Select
              placeholder="Chọn loại vi phạm bạn muốn báo cáo"
              onChange={onCategoryChange}
              allowClear
            >
              <Option value="SCAM">Lừa đảo</Option>
              <Option value="INAPPROPRIATE_CONTENT">Nội dung không phù hợp</Option>
              <Option value="DUPLICATE">Nội dung trùng lặp</Option>
              <Option value="MISINFORMATION">Nội dung sai sự thật</Option>
              <Option value="OTHER">Khác</Option>
            </Select>
          </Form.Item>

          <Form.Item<ReportFieldType>
            label="Lý do"
            name="reason"
            rules={[{ required: true, message: 'Vui lòng nhập lý do!' }]}
          >
            <TextArea placeholder={'Nhập nội dung vi phạm của bài đăng'} />
          </Form.Item>

          <Form.Item>
            <Flex justify='end'>
              <Button type="primary" htmlType="submit" style={{width: 100}}>
                Gửi
              </Button>

              <Button onClick={handleCancel} style={{ marginLeft: 8, width: 100 }}>
                Hủy
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ReportButton
