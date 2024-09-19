import { Form, FormInstance, Input, Typography } from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { PostPropertyFormData } from '@/features/post-property/PostProperty.tsx'

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
  return (
    <>
      <Typography.Title level={4} className='mt-0 text-lg font-semibold'>
        <span className='text-red-500'>*</span> Tiêu đề
      </Typography.Title>
      <Form form={form} layout='vertical'>
        <Form.Item<PostPropertyFormData>
          name='title'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tiêu đề bài đăng'
            }
          ]}
        >
          <Input placeholder='Nhập tiêu đề bài đăng' />
        </Form.Item>
      </Form>

      <Typography.Title level={4} className='mt-0 text-lg font-semibold'>
        <span className='text-red-500'>*</span> Mô tả
      </Typography.Title>
      <Form form={form} layout='vertical'>
        <Form.Item<PostPropertyFormData>
          name='description'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mô tả bài đăng'
            },
            {
              min: 50,
              message: 'Mô tả phải chứa ít nhất 50 ký tự'
            }
          ]}
        >
          <ReactQuill theme='snow' modules={quillModules} formats={quillFormats} className='custom-quill' />
        </Form.Item>
      </Form>
    </>
  )
}
