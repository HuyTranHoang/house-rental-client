import { Image as ImageType, OriginFileObj, PostPropertyFormData } from '@/features/post-property/PostProperty'
import { FileType, getBase64, validateFile } from '@/utils/uploadFile.ts'
import { PictureOutlined, PlusOutlined, WarningOutlined } from '@ant-design/icons'
import { Form, FormInstance, Image, Tooltip, Typography, Upload } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { UploadChangeParam } from 'antd/lib/upload'
import { clsx } from 'clsx/lite'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

const { Dragger } = Upload

export default function PostPropertyImage({ form }: { form: FormInstance<PostPropertyFormData> }) {
  const { t } = useTranslation('postProperty')

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [coverImageUid, setCoverImageUid] = useState<string | null>(null)

  useEffect(() => {
    // Initialize fileList and coverImageUid from form values
    const formImages = form.getFieldValue('images') as ImageType[] | undefined
    const formThumbnailImage = form.getFieldValue('thumbnailImage') as ImageType | undefined

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

      if (formThumbnailImage) {
        setCoverImageUid(formThumbnailImage.uid)
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

      // Update thumbnailImage if the cover image is removed
      if (coverImageUid) {
        const isCoverImageRemoved = !images.some((image) => image.uid === coverImageUid)
        if (isCoverImageRemoved) {
          setCoverImageUid(null)
          form.setFieldsValue({ thumbnailImage: undefined })
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

      // Chuyển đổi file thành đối tượng Image
      const thumbnailImage: ImageType = {
        uid: file.uid,
        lastModified: file.lastModified ?? Date.now(),
        name: file.name,
        size: file.size ?? 0,
        type: file.type ?? '',
        percent: file.percent ?? 0,
        originFileObj: file.originFileObj as OriginFileObj,
        thumbUrl: file.thumbUrl ?? file.url ?? ''
      }

      form.setFieldsValue({ thumbnailImage })
      toast.success(t('toast.success.setCoverImage'))
    },
    [coverImageUid, form]
  )

  const itemRender = useCallback(
    (originNode: React.ReactNode, file: UploadFile) => {
      return (
        <>
          {originNode}
          <div className='flex items-center justify-center'>
            <Tooltip title={file.uid === coverImageUid ? t('form.currentCover') : t('form.setCover')}>
              <Typography.Text
                onClick={() => setCoverImage(file)}
                className={clsx('cursor-pointer', file.uid === coverImageUid ? 'text-blue-500' : 'text-gray-500')}
              >
                {file.uid === coverImageUid ? (
                  <>
                    <PictureOutlined /> {t('form.cover')}
                  </>
                ) : (
                  <span className='hover:underline'>{t('form.setCover')}</span>
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
        {t('form.propertyImage')}
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
            { required: true, message: t('form.propertyImageRequired') },
            {
              validator: (_, value) => {
                if (value.length > 10) {
                  return Promise.reject(new Error(t('form.propertyImageMax')))
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
            <div>{t('form.uploadImage')}</div>
          </Dragger>
        </Form.Item>

        <Form.Item name='thumbnailImage' hidden>
          <input type='hidden' />
        </Form.Item>
      </Form>

      <div className='flex flex-col pt-4'>
        <Typography.Text type='secondary'>
          <WarningOutlined /> {t('form.note')}
        </Typography.Text>
        <Typography.Text type='secondary'>
          {t('form.noteCover')}
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
