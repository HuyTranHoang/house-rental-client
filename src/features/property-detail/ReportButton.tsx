import { ReportFormData } from '@/api/report.api.ts'
import { useSubmitReport } from '@/hooks/useReport'
import { SendOutlined, WarningOutlined } from '@ant-design/icons'
import { Button, Flex, Form, FormProps, Input, Modal, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const { Option } = Select

type ReportCategory = 'SCAM' | 'INAPPROPRIATE_CONTENT' | 'DUPLICATE' | 'MISINFORMATION' | 'OTHER'

function ReportButton({ propertyId }: { propertyId: number }) {
  const [reportForm] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { submitReport, isPending } = useSubmitReport()
  const { t } = useTranslation(['common', 'propertyDetail'])

  const reasons: Record<ReportCategory, string> = {
    SCAM: t('propertyDetail:form.scam'),
    INAPPROPRIATE_CONTENT: t('propertyDetail:form.inappropriateContent'),
    DUPLICATE: t('propertyDetail:form.duplicate'),
    MISINFORMATION: t('propertyDetail:form.misinformation'),
    OTHER: ''
  }

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

  const onFinish: FormProps<ReportFormData>['onFinish'] = (values) => {
    submitReport(values).then(() => setIsModalOpen(false))
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
        {t('propertyDetail:form.report')}
      </Button>

      <Modal title={t('propertyDetail:form.commentReport')} footer={null} onCancel={handleCancel} open={isModalOpen} destroyOnClose>
        <Form form={reportForm} name='report' layout='vertical' onFinish={onFinish} autoComplete='off'>
          <Form.Item<ReportFormData> name='propertyId' hidden>
            <Input />
          </Form.Item>

          <Form.Item<ReportFormData>
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

          <Form.Item<ReportFormData>
            label={t('propertyDetail:form.reason')}
            name='reason'
            rules={[{ required: true, message: t('propertyDetail:form.reasonRequired') }]}
          >
            <TextArea placeholder={t('propertyDetail:form.contentReason')} />
          </Form.Item>

          <Form.Item>
            <Flex justify='end'>
              <Button loading={isPending} icon={<SendOutlined />} type='primary' htmlType='submit'>
                {t('button.send')}
              </Button>

              <Button onClick={handleCancel} className='ml-3'>
                {t('button.cancel')}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ReportButton