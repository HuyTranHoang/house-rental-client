import { ReportFormData, submitReport } from '@/api/report.api.ts'
import { SendOutlined, WarningOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, Flex, Form, FormProps, Input, Modal, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { toast } from 'sonner'

const { Option } = Select

type ReportCategory = 'SCAM' | 'INAPPROPRIATE_CONTENT' | 'DUPLICATE' | 'MISINFORMATION' | 'OTHER'

const reasons: Record<ReportCategory, string> = {
  SCAM: 'Bài đăng này có dấu hiệu lừa đảo!',
  INAPPROPRIATE_CONTENT: 'Bài đăng này có nội dung không phù hợp!',
  DUPLICATE: 'Bài đăng này bị trùng lặp!',
  MISINFORMATION: 'Bài đăng này có thông tin sai sự thật!',
  OTHER: ''
}

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

  const onCategoryChange = (value: ReportCategory) => {
    reportForm.setFieldsValue({ reason: reasons[value] })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: submitReport,
    onSuccess: () => {
      toast.success('Báo cáo vi phạm của bạn đã được gửi!')
      setIsModalOpen(false)
    },
    onError: (error) => {
      console.error('Error submitting report:', error)
      toast.error('Gửi báo cáo thất bại!')
    }
  })

  const onFinish: FormProps<ReportFormData>['onFinish'] = (values) => {
    mutate(values)
  }

  reportForm.setFieldsValue({ propertyId })

  return (
    <>
      <Button
        icon={<WarningOutlined />}
        iconPosition='end'
        size='small'
        onClick={showModal}
        className='mt-6 border-[#9fbdd4] font-semibold text-[#657786]'
        aria-label='Report violation'
      >
        Báo vi phạm
      </Button>

      <Modal title='Báo cáo vi phạm' footer={null} onCancel={handleCancel} open={isModalOpen} destroyOnClose>
        <Form form={reportForm} name='report' layout='vertical' onFinish={onFinish} autoComplete='off'>
          <Form.Item<ReportFormData> name='propertyId' hidden>
            <Input />
          </Form.Item>

          <Form.Item<ReportFormData>
            label='Loại vi phạm'
            name='category'
            rules={[{ required: true, message: 'Vui lòng chọn loại vi phạm!' }]}
          >
            <Select placeholder='Chọn loại vi phạm bạn muốn báo cáo' onChange={onCategoryChange} allowClear>
              <Option value='SCAM'>Lừa đảo</Option>
              <Option value='INAPPROPRIATE_CONTENT'>Nội dung không phù hợp</Option>
              <Option value='DUPLICATE'>Nội dung trùng lặp</Option>
              <Option value='MISINFORMATION'>Nội dung sai sự thật</Option>
              <Option value='OTHER'>Khác</Option>
            </Select>
          </Form.Item>

          <Form.Item<ReportFormData>
            label='Lý do'
            name='reason'
            rules={[{ required: true, message: 'Vui lòng nhập lý do!' }]}
          >
            <TextArea placeholder={'Nhập nội dung vi phạm của bài đăng'} />
          </Form.Item>

          <Form.Item>
            <Flex justify='end'>
              <Button loading={isPending} icon={<SendOutlined />} iconPosition='end' type='primary' htmlType='submit'>
                Gửi
              </Button>

              <Button onClick={handleCancel} className='ml-3'>
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
