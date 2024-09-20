import { Image, OriginFileObj, PostPropertyFormData } from '@/features/post-property/PostProperty'
import { PlusOutlined, WarningOutlined } from '@ant-design/icons'
import { Form, FormInstance, Typography, Upload } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { UploadChangeParam } from 'antd/lib/upload'
import { useState } from 'react'
import { toast } from 'sonner'

const { Dragger } = Upload

export default function PostPropertyImage({ form }: { form: FormInstance<PostPropertyFormData> }) {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const validateFile = (file: UploadFile) => {
    const isValidType = file.type?.startsWith('image/') ?? false
    const isValidSize = (file.size ?? 0) / 1024 / 1024 < 5

    if (!isValidType) {
      toast.error('Chỉ được tải lên các tệp hình ảnh.')
    }

    if (!isValidSize) {
      toast.error('Hình ảnh phải nhỏ hơn 5MB.')
    }

    return isValidType && isValidSize
  }

  const createThumbUrl = (file: UploadFile) => {
    return new Promise<string | undefined>((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => resolve(undefined)
      if (file.originFileObj) {
        reader.readAsDataURL(file.originFileObj as Blob)
      } else {
        resolve(undefined)
      }
    })
  }

  const handleFileChange = async ({ fileList: newFileList }: UploadChangeParam<UploadFile>) => {
    const updatedFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.thumbUrl) {
          const thumbUrl = await createThumbUrl(file)
          return {
            ...file,
            thumbUrl
          }
        }
        return file
      })
    )

    setFileList(updatedFileList)

    // Transform UploadFile[] to Image[]
    const images: Image[] = updatedFileList.map((file) => ({
      uid: file.uid,
      lastModified: file.lastModified ?? 0,
      name: file.name,
      size: file.size ?? 0,
      type: file.type ?? '',
      percent: file.percent ?? 0,
      originFileObj: file.originFileObj as OriginFileObj,
      thumbUrl: file.thumbUrl ?? ''
    }))

    form.setFieldsValue({ images })
  }

  return (
    <div className='space-y-4'>
      <Typography.Title level={4} className='mt-0 text-lg font-semibold'>
        Hình ảnh bất động sản
      </Typography.Title>
      <Form form={form}>
        <Form.Item<PostPropertyFormData>
          name='images'
          valuePropName='fileList'
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e
            }
            return e && e.fileList
          }}
          rules={[
            { required: true, message: 'Vui lòng tải lên ít nhất một hình ảnh' },
            {
              validator: (_, value) => {
                if (value.length > 10) {
                  return Promise.reject(new Error('Chỉ được tải lên tối đa 10 hình ảnh.'))
                }
                return Promise.resolve()
              }
            }
          ]}
        >
          <Dragger
            listType='picture-card'
            fileList={fileList}
            beforeUpload={(file) => {
              const isValid = validateFile(file)
              return isValid ? false : Upload.LIST_IGNORE
            }}
            onChange={handleFileChange}
            multiple
            accept='image/*'
            maxCount={10}
          >
            <PlusOutlined />
            <div>Tải lên hình ảnh</div>
          </Dragger>
        </Form.Item>
      </Form>
      <Typography.Paragraph className='mt-4' type='secondary'>
        <WarningOutlined /> Bạn có thể tải lên tối đa 10 hình ảnh. Mỗi hình ảnh không được vượt quá 5MB.
      </Typography.Paragraph>
    </div>
  )
}
