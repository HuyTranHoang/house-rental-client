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
    SCAM: t('propertyDetail:form.SCAM'),
    INAPPROPRIATE_CONTENT: t('propertyDetail:form.INAPPROPRIATE_CONTENT'),
    DUPLICATE: t('propertyDetail:form.DUPLICATE'),
    MISINFORMATION: t('propertyDetail:form.MISINFORMATION'),
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
        {t('propertyDetail:form.REPORT')}
      </Button>

      <Modal title={t('propertyDetail:form.COMMENT_REPORT')} footer={null} onCancel={handleCancel} open={isModalOpen} destroyOnClose>
        <Form form={reportForm} name='report' layout='vertical' onFinish={onFinish} autoComplete='off'>
          <Form.Item<ReportFormData> name='propertyId' hidden>
            <Input />
          </Form.Item>

          <Form.Item<ReportFormData>
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

          <Form.Item<ReportFormData>
            label={t('propertyDetail:form.REASON')}
            name='reason'
            rules={[{ required: true, message: t('propertyDetail:form.REASON_REQUIRED') }]}
          >
            <TextArea placeholder={t('propertyDetail:form.CONTENT_REASON')} />
          </Form.Item>

          <Form.Item>
            <Flex justify='end'>
              <Button loading={isPending} icon={<SendOutlined />} iconPosition='end' type='primary' htmlType='submit'>
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
