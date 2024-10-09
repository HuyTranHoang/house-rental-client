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
    SCAM: t('propertyDetail:record.scam'),
    INAPPROPRIATE_CONTENT: t('propertyDetail:record.inappropriateContent'),
    DUPLICATE: t('propertyDetail:record.duplicate'),
    MISINFORMATION: t('propertyDetail:record.misinformation'),
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
      <Tooltip title={t('propertyDetail:form.commentReport')}>
        <Button type='text' icon={<WarningOutlined />} onClick={showModal} aria-label='Report violation' />
      </Tooltip>

      <Modal
        title={t('propertyDetail:form.reportAViolation')}
        footer={null}
        onCancel={handleCancel}
        open={isModalOpen}
        destroyOnClose
      >
        <Form form={reportForm} name='report' layout='vertical' onFinish={onFinish} autoComplete='off'>
          <Form.Item<CommentReportFormData> name='commentId' hidden>
            <Input />
          </Form.Item>

          <Form.Item<CommentReportFormData>
            label={t('propertyDetail:form.typeViolation')}
            name='category'
            rules={[{ required: true, message: t('propertyDetail:form.requiredViolation') }]}
          >
            <Select placeholder={t('propertyDetail:form.selectViolation')} onChange={onCategoryChange} allowClear>
              <Option value='SCAM'>{t('propertyDetail:form.scam')}</Option>
              <Option value='INAPPROPRIATE_CONTENT'>{t('propertyDetail:form.inappropriateContent')}</Option>
              <Option value='DUPLICATE'>{t('propertyDetail:form.duplicate')}</Option>
              <Option value='MISINFORMATION'>{t('propertyDetail:form.misinformation')}</Option>
              <Option value='OTHER'>{t('propertyDetail:form.other')}</Option>
            </Select>
          </Form.Item>

          <Form.Item<CommentReportFormData>
            label={t('propertyDetail:form.reason')}
            name='reason'
            rules={[{ required: true, message: t('propertyDetail:form.reasonRequired') }]}
          >
            <TextArea placeholder={t('propertyDetail:form.contentReason')} />
          </Form.Item>

          <Form.Item>
            <Flex justify='end'>
              <Button loading={submitCommentReportIsPending} icon={<SendOutlined />} type='primary' htmlType='submit'>
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
