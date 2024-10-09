import { CommentReportFormData } from '@/api/commentReport.api'
import { useSubmitCommentReport } from '@/hooks/useCommentReport'
import { SendOutlined, WarningOutlined } from '@ant-design/icons'
import { Button, Flex, Form, FormProps, Input, Modal, Select, Tooltip } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const { Option } = Select

type ReportCategory = 'SCAM' | 'INAPPROPRIATE_CONTENT' | 'DUPLICATE' | 'MISINFORMATION' | 'OTHER'



function CommentReportButton({ commentId }: { commentId: number }) {
  const [reportForm] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useTranslation(['common', 'propertyDetail'])

  const { submitCommentReport, submitCommentReportIsPending } = useSubmitCommentReport()

  const showModal = () => {
    reportForm.resetFields()
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const reasons: Record<ReportCategory, string> = {
    SCAM: t('propertyDetail:record.SCAM'),
    INAPPROPRIATE_CONTENT: t('propertyDetail:record.INAPPROPRIATE_CONTENT'),
    DUPLICATE: t('propertyDetail:record.DUPLICATE'),
    MISINFORMATION: t('propertyDetail:record.MISINFORMATION'),
    OTHER: ''
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
      <Tooltip title={t('propertyDetail:form.COMMENT_REPORT')}>
        <Button type='text' icon={<WarningOutlined />} onClick={showModal} aria-label='Report violation' />
      </Tooltip>

      <Modal title={t('propertyDetail:form.REPORT_A_VIOLATION')} footer={null} onCancel={handleCancel} open={isModalOpen} destroyOnClose>
        <Form form={reportForm} name='report' layout='vertical' onFinish={onFinish} autoComplete='off'>
          <Form.Item<CommentReportFormData> name='commentId' hidden>
            <Input />
          </Form.Item>

          <Form.Item<CommentReportFormData>
            label={t('propertyDetail:form.TYPE_VIOLATION')}
            name='category'
            rules={[{ required: true, message: t('propertyDetail:form.REQUIRED_VIOLATION') }]}
          >
            <Select placeholder={t('propertyDetail:form.SELECT_VIOLATION')} onChange={onCategoryChange} allowClear>
              <Option value='SCAM'>{t('propertyDetail:form.SCAM')}</Option>
              <Option value='INAPPROPRIATE_CONTENT'>{t('propertyDetail:form.INAPPROPRIATE_CONTENT')}</Option>
              <Option value='DUPLICATE'>{t('propertyDetail:form.DUPLICATE')}</Option>
              <Option value='MISINFORMATION'>{t('propertyDetail:form.MISINFORMATION')}</Option>
              <Option value='OTHER'>{t('propertyDetail:form.OTHER')}</Option>
            </Select>
          </Form.Item>

          <Form.Item<CommentReportFormData>
            label={t('propertyDetail:form.REASON')}
            name='reason'
            rules={[{ required: true, message: t('propertyDetail:form.REASON_REQUIRED') }]}
          >
            <TextArea placeholder={t('propertyDetail:form.CONTENT_REASON')} />
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
                {t('common:button.send')}
              </Button>

              <Button onClick={handleCancel} className='ml-3'>
              {t('common:button.cancel')}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CommentReportButton
