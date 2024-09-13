import { Form, FormInstance, Input, Typography } from 'antd'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean']
  ]
}

const quillFormats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet']

export default function PostPropertyDescription({ form }: { form: FormInstance }) {
  const [description, setDescription] = useState('')

  return (
    <>
      <Typography.Title level={4} className='mt-0 text-lg font-semibold'>
        <span className='text-red-500'>*</span> Tiêu đề
      </Typography.Title>
      <Form form={form} layout='vertical'>
        <Form.Item name='title' required>
          <Input placeholder='Nhập tiêu đề bài đăng' />
        </Form.Item>
      </Form>

      <Typography.Title level={4} className='mt-0 text-lg font-semibold'>
        <span className='text-red-500'>*</span> Mô tả
      </Typography.Title>
      <Form form={form} layout='vertical'>
        <Form.Item name='description' required>
          <ReactQuill
            theme='snow'
            value={description}
            onChange={setDescription}
            modules={quillModules}
            formats={quillFormats}
            className='custom-quill'
          />
        </Form.Item>
      </Form>
    </>
  )
}
