import { Form, FormInstance, Input, Typography } from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { PostPropertyFormData } from '@/features/post-property/PostProperty.tsx'
import { useTranslation } from 'react-i18next'

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean']
  ]
}

const quillFormats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet']

export default function PostPropertyDescription({ form }: { form: FormInstance<PostPropertyFormData> }) {
  const { t } = useTranslation('postProperty')

  return (
    <>
      <Typography.Title level={4} className='mt-0 text-lg font-semibold'>
        <span className='text-red-500'>*</span> {t('form.title')}
      </Typography.Title>
      <Form form={form} layout='vertical'>
        <Form.Item<PostPropertyFormData>
          name='title'
          rules={[
            {
              required: true,
              message: t('form.titleRequired')
            }
          ]}
        >
          <Input placeholder={t('form.titlePlaceholder')} />
        </Form.Item>
      </Form>

      <Typography.Title level={4} className='mt-0 text-lg font-semibold'>
        <span className='text-red-500'>*</span> {t('form.description')}
      </Typography.Title>
      <Form form={form} layout='vertical'>
        <Form.Item<PostPropertyFormData>
          name='description'
          rules={[
            {
              required: true,
              message: t('form.descriptionRequired')
            },
            {
              min: 50,
              message: t('form.descriptionMin')
            }
          ]}
        >
          <ReactQuill theme='snow' modules={quillModules} formats={quillFormats} className='custom-quill' />
        </Form.Item>
      </Form>
    </>
  )
}
