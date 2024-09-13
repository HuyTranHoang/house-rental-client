import { PlusOutlined } from '@ant-design/icons'
import { Form, FormInstance, message, Typography, Upload } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { useState } from 'react'

const { Dragger } = Upload

export default function PostPropertyImage({ form }: { form: FormInstance }) {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList)
    form.setFieldsValue({ images: newFileList })
  }

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('You can only upload image files!')
    }
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('Image must be smaller than 5MB!')
    }
    return isImage && isLt5M
  }

  return (
    <div className='space-y-4'>
      <Typography.Title level={4} className='mt-0 text-lg font-semibold'>
        Hình ảnh bất động sản
      </Typography.Title>
      <Form.Item
        name='images'
        valuePropName='fileList'
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            return e
          }
          return e && e.fileList
        }}
        rules={[{ required: true, message: 'Vui lòng tải lên ít nhất một hình ảnh' }]}
      >
        <Dragger
          listType='picture-card'
          fileList={fileList}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          multiple
          accept='image/*'
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên hình ảnh</div>
          </div>
        </Dragger>
      </Form.Item>
      <Typography.Text type='secondary'>
        Bạn có thể tải lên tối đa 10 hình ảnh. Mỗi hình ảnh không được vượt quá 5MB.
      </Typography.Text>
    </div>
  )
}
