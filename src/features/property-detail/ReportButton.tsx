import { Button, Flex, Form, FormProps, Input, Modal, Select } from 'antd'
import { SendOutlined, WarningOutlined } from '@ant-design/icons'
import { useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { ReportFormData, submitReport } from '@/api/report.api.ts'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

const { Option } = Select

function ReportButton({ propertyId }: { propertyId: number }) {

  const [reportForm] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    reportForm.resetFields()
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onCategoryChange = (value: string) => {
    switch (value) {
      case 'SCAM':
        reportForm.setFieldsValue({ reason: 'Bài đăng này có dấu hiệu lừa đảo!' })
        break
      case 'INAPPROPRIATE_CONTENT':
        reportForm.setFieldsValue({ reason: 'Bài đăng này có nội dung không phù hợp!' })
        break
      case 'DUPLICATE':
        reportForm.setFieldsValue({ reason: 'Bài đăng này bị trùng lặp!' })
        break
      case 'MISINFORMATION':
        reportForm.setFieldsValue({ reason: 'Bài đăng này có thông tin sai sự thật!' })
        break
      case 'OTHER':
        reportForm.setFieldsValue({ reason: '' })
        break
      default:
    }
  }

  const { mutate, isPending } = useMutation({
    mutationFn: submitReport,
    onSuccess: () => {
      toast.success('Báo cáo vi phạm của bạn đã được gửi!');
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error('Error submitting report:', error);
      toast.error('Gửi báo cáo thất bại!');
    }
  });

  const onFinish: FormProps<ReportFormData>['onFinish'] = (values) => {
    mutate(values)
  }

  reportForm.setFieldsValue({ propertyId })

  return (
    <>
      <Button icon={<WarningOutlined />} iconPosition="end" size="small"
              onClick={showModal}
              style={{ marginTop: 24, fontWeight: 600, color: '#657786', borderColor: '#9fbdd4' }}>
        Báo vi phạm
      </Button>

      <Modal title="Báo cáo vi phạm"
             footer={null}
             onCancel={handleCancel}
             open={isModalOpen}
      >
        <Form
          form={reportForm}
          name="report"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<ReportFormData> name="propertyId" hidden>
            <Input />
          </Form.Item>

          <Form.Item<ReportFormData>
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

          <Form.Item<ReportFormData>
            label="Lý do"
            name="reason"
            rules={[{ required: true, message: 'Vui lòng nhập lý do!' }]}
          >
            <TextArea placeholder={'Nhập nội dung vi phạm của bài đăng'} />
          </Form.Item>

          <Form.Item>
            <Flex justify="end">
              <Button loading={isPending} icon={<SendOutlined />} iconPosition="end" type="primary" htmlType="submit">
                Gửi
              </Button>

              <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
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
