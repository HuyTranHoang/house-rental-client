import { Image as ImageType, OriginFileObj, PostPropertyFormData } from '@/features/post-property/PostProperty'
import { PictureOutlined, PlusOutlined, WarningOutlined } from '@ant-design/icons'
import { Form, FormInstance, GetProp, Image, Tooltip, Typography, Upload, UploadProps } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { UploadChangeParam } from 'antd/lib/upload'
import { clsx } from 'clsx/lite'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

const { Dragger } = Upload

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export default function PostPropertyImage({ form }: { form: FormInstance<PostPropertyFormData> }) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [coverImageUid, setCoverImageUid] = useState<string | null>(null)

  useEffect(() => {
    // Initialize fileList and coverImageUid from form values
    const formImages = form.getFieldValue('images') as ImageType[] | undefined
    const formThumbnailName = form.getFieldValue('thumbnailOriginalName')

    if (formImages) {
      const initialFileList = formImages.map(
        (image) =>
          ({
            uid: image.uid,
            name: image.name,
            status: 'done',
            url: image.thumbUrl,
            thumbUrl: image.thumbUrl
          }) as UploadFile
      )
      setFileList(initialFileList)

      if (formThumbnailName) {
        const coverImage = initialFileList.find((file) => file.name === formThumbnailName)
        if (coverImage) {
          setCoverImageUid(coverImage.uid)
        }
      }
    }
  }, [form])

  const handlePreview = useCallback(async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }, [])

  const validateFile = useCallback((file: UploadFile) => {
    const isValidType = file.type?.startsWith('image/') ?? false
    const isValidSize = (file.size ?? 0) / 1024 / 1024 < 5

    if (!isValidType) {
      toast.error('Chỉ được tải lên các tệp hình ảnh.')
    }

    if (!isValidSize) {
      toast.error('Hình ảnh phải nhỏ hơn 5MB.')
    }

    return isValidType && isValidSize
  }, [])

  const createThumbUrl = useCallback((file: UploadFile) => {
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
  }, [])

  const handleFileChange = useCallback(
    async ({ fileList: newFileList }: UploadChangeParam<UploadFile>) => {
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
      const images: ImageType[] = updatedFileList.map((file) => ({
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

      // Update thumbnailOriginalName if the cover image is removed
      if (coverImageUid) {
        const coverImageStillExists = updatedFileList.some((file) => file.uid === coverImageUid)
        if (!coverImageStillExists) {
          setCoverImageUid(null)
          form.setFieldsValue({ thumbnailOriginalName: undefined })
        }
      }
    },
    [form, coverImageUid, createThumbUrl]
  )

  const setCoverImage = useCallback(
    (file: UploadFile) => {
      if (coverImageUid === file.uid) {
        return
      }

      setCoverImageUid(file.uid)
      form.setFieldsValue({ thumbnailOriginalName: file.name })
      toast.success('Ảnh bìa đã được đặt thành công')
    },
    [coverImageUid, form]
  )

  const itemRender = useCallback(
    (originNode: React.ReactNode, file: UploadFile) => {
      return (
        <>
          {originNode}
          <div className='flex items-center justify-center'>
            <Tooltip title={file.uid === coverImageUid ? 'Ảnh bìa hiện tại' : 'Đặt làm ảnh bìa'}>
              <Typography.Text
                onClick={() => setCoverImage(file)}
                className={clsx('cursor-pointer', file.uid === coverImageUid ? 'text-blue-500' : 'text-gray-500')}
              >
                {file.uid === coverImageUid ? (
                  <>
                    <PictureOutlined /> Ảnh bìa
                  </>
                ) : (
                  <span className='hover:underline'>Đặt ảnh bìa</span>
                )}
              </Typography.Text>
            </Tooltip>
          </div>
        </>
      )
    },
    [coverImageUid, setCoverImage]
  )

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
            onPreview={handlePreview}
            itemRender={itemRender}
          >
            <PlusOutlined />
            <div>Tải lên hình ảnh</div>
          </Dragger>
        </Form.Item>

        <Form.Item name='thumbnailOriginalName' hidden>
          <input type='hidden' />
        </Form.Item>
      </Form>

      <div className='flex flex-col pt-4'>
        <Typography.Text type='secondary'>
          <WarningOutlined /> Bạn có thể tải lên tối đa 10 hình ảnh. Mỗi hình ảnh không được vượt quá 5MB.
        </Typography.Text>
        <Typography.Text type='secondary'>
          *Ảnh bìa là hình ảnh sẽ được hiển thị ở danh sách bất động sản.
        </Typography.Text>
      </div>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage('')
          }}
          src={previewImage}
        />
      )}
    </div>
  )
}
