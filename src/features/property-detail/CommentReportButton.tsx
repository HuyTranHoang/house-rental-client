import { CommentReportFormData } from '@/api/commentReport.api'
import { useSubmitCommentReport } from '@/hooks/useCommentReport'
import { SendOutlined, WarningOutlined } from '@ant-design/icons'
import { Button, Flex, Form, FormProps, Input, Modal, Select, Tooltip } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'

const { Option } = Select

type ReportCategory = 'SCAM' | 'INAPPROPRIATE_CONTENT' | 'DUPLICATE' | 'MISINFORMATION' | 'OTHER'

const reasons: Record<ReportCategory, string> = {
  SCAM: 'Bình luận này có dấu hiệu lừa đảo!',
  INAPPROPRIATE_CONTENT: 'Bình luận này có nội dung không phù hợp!',
  DUPLICATE: 'Bình luận này bị trùng lặp!',
  MISINFORMATION: 'Bình luận này có thông tin sai sự thật!',
  OTHER: ''
}

function CommentReportButton({ commentId }: { commentId: number }) {
  const [reportForm] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { submitCommentReport, submitCommentReportIsPending } = useSubmitCommentReport()

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

  const onFinish: FormProps<CommentReportFormData>['onFinish'] = (values) => {
    submitCommentReport(values).then(() => setIsModalOpen(false))
  }

  reportForm.setFieldsValue({ commentId })

  return (
    <>
      <Tooltip title='Báo cáo bình luận'>
        <Button type='text' icon={<WarningOutlined />} onClick={showModal} aria-label='Report violation' />
      </Tooltip>

      <Modal title='Báo cáo vi phạm' footer={null} onCancel={handleCancel} open={isModalOpen} destroyOnClose>
        <Form form={reportForm} name='report' layout='vertical' onFinish={onFinish} autoComplete='off'>
          <Form.Item<CommentReportFormData> name='commentId' hidden>
            <Input />
          </Form.Item>

          <Form.Item<CommentReportFormData>
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

          <Form.Item<CommentReportFormData>
            label='Lý do'
            name='reason'
            rules={[{ required: true, message: 'Vui lòng nhập lý do!' }]}
          >
            <TextArea placeholder={'Nhập nội dung vi phạm của bình luận'} />
          </Form.Item>

          <Form.Item>
            <Flex justify='end'>
              <Button
                loading={submitCommentReportIsPending}
                icon={<SendOutlined />}
                iconPosition='end'
                type='primary'
                htmlType='submit'
              >
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

export default CommentReportButton
