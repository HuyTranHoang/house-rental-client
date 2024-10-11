import { Image as ImageType, OriginFileObj } from '@/features/post-property/PostProperty.tsx'
import { useAmenities } from '@/hooks/useAmenity.ts'
import { useCities } from '@/hooks/useCity.ts'
import { useDistricts } from '@/hooks/useDistrict.ts'
import { useRoomTypes } from '@/hooks/useRoomType.ts'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { PropertyDataSource } from '@/types/property.type.ts'
import { validateFile } from '@/utils/uploadFile.ts'
import { DeleteOutlined, PictureOutlined, UploadOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Col,
  Drawer,
  Flex,
  Form,
  Image,
  Input,
  Row,
  Select,
  Space,
  Tooltip,
  Upload,
  UploadFile,
  UploadProps
} from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactQuill from 'react-quill'
import { toast } from 'sonner'

interface PostManagementEditPropertyModalProps {
  property: PropertyDataSource | null
  isVisible: boolean
  onCancel: () => void
}

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean']
  ]
}

const quillFormats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet', 'link']

interface PutPropertyFormData {
  roomType: string
  city: string
  district: string
  location: string
  numRooms: string
  area: string
  price: string
  amenities: string[]
  title: string
  description: string
  images: ImageType[]
  thumbnailImage: ImageType
  deleteImages: string
  thumbnailUrl: string
}

function PostManagementEditPropertyModal({ property, isVisible, onCancel }: PostManagementEditPropertyModalProps) {
  const { t } = useTranslation('postManagement')
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  const [selectedCity, setselectedCity] = useState<string | null>(null)
  const [districtOptions, setDistrictOptions] = useState<{ label: string; value: number }[]>([])

  const [deleteImages, setDeleteImages] = useState<string[]>([])
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const { roomTypeData, roomTypeIsLoading } = useRoomTypes()
  const { cityData, cityIsLoading } = useCities()
  const { districtData, districtIsLoading } = useDistricts()
  const { amenityData, amenityIsLoading } = useAmenities()

  const roomTypeOptions = roomTypeData?.map((roomType) => ({
    label: roomType.name,
    value: roomType.id
  }))

  const cityOptions = cityData?.map((city) => ({
    label: city.name,
    value: city.id
  }))

  const amenityOptions = amenityData?.map((amenity) => ({
    label: amenity.name,
    value: amenity.name
  }))

  const putPropertyMutation = useMutation({
    mutationFn: (data: FormData) => {
      return axiosInstance.putForm(`/api/properties/self/${property!.id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      toast.success(t('editPropertyModal.toast.updateSuccess'))
      form.resetFields()
      onCancel()
    },
    onError: (error) => {
      console.error('Error posting property:', error)
      toast.error(t('editPropertyModal.toast.updateError'))
    }
  })

  const handleDeleteImage = (imageUrl: string) => {
    if (imageUrl === thumbnailUrl) {
      toast.error(t('editPropertyModal.toast.deleteThumbnailError'))
      return
    }

    setDeleteImages((prev) => [...prev, imageUrl])
    property!.propertyImages = property!.propertyImages.filter((image) => image !== imageUrl)
  }

  const handleUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList)

  const handleFinish = async (values: PutPropertyFormData) => {
    const formDataToSend = new FormData()
    formDataToSend.append('title', values.title)
    formDataToSend.append('description', values.description)
    formDataToSend.append('price', values.price)
    formDataToSend.append('location', values.location)
    formDataToSend.append('area', values.area)
    formDataToSend.append('numRooms', values.numRooms)
    formDataToSend.append('cityId', values.city)
    formDataToSend.append('districtId', values.district)
    formDataToSend.append('roomTypeId', values.roomType)

    values.amenities.forEach((amenity) => {
      formDataToSend.append('amenities', amenity)
    })

    const images: ImageType[] = fileList.map((file) => ({
      uid: file.uid,
      lastModified: file.lastModified ?? 0,
      name: file.name,
      size: file.size ?? 0,
      type: file.type ?? '',
      percent: file.percent ?? 0,
      originFileObj: file.originFileObj as OriginFileObj,
      thumbUrl: file.thumbUrl ?? ''
    }))

    images.forEach((image) => {
      formDataToSend.append('images', image.originFileObj)
    })

    formDataToSend.append('status', 'PENDING')
    formDataToSend.append('deleteImages', deleteImages.join('|'))
    formDataToSend.append('thumbnailUrl', thumbnailUrl)

    await putPropertyMutation.mutateAsync(formDataToSend)
  }

  useEffect(() => {
    if (property) {
      setselectedCity(property.cityId.toString())
      setThumbnailUrl(property.thumbnailUrl)

      form.setFieldsValue({
        title: property.title,
        roomType: property.roomTypeId,
        city: property.cityId,
        district: property.districtId,
        location: property.location,
        price: property.price.toString(),
        area: property.area.toString(),
        numRooms: property.numRooms,
        amenities: property.amenities.map((amenity) => amenity),
        description: property.description
      })
    }
  }, [form, property])

  useEffect(() => {
    if (selectedCity) {
      const filteredDistricts = districtData
        ?.filter((district) => district.cityId === parseInt(selectedCity))
        .map((district) => ({
          label: district.name,
          value: district.id
        }))
      setDistrictOptions(filteredDistricts || [])
    }
  }, [districtData, selectedCity])

  return (
    <Drawer title={t('editPropertyModal.title')} size='large' onClose={onCancel} open={isVisible}>
      <Form form={form} layout='vertical' onFinish={handleFinish}>
        <Form.Item<PutPropertyFormData>
          label={t('editPropertyModal.form.title')}
          name='title'
          rules={[
            {
              required: true,
              message: t('editPropertyModal.form.titleRequired')
            }
          ]}
        >
          <Input placeholder={t('editPropertyModal.form.titlePlaceholder')} />
        </Form.Item>

        <Form.Item
          label={
            <>
              {t('editPropertyModal.form.images')}
              <span className='ml-2 text-xs text-gray-500'>
                ({Number(property?.propertyImages.length) + fileList.length}/10)
              </span>
            </>
          }
          required
        >
          <Image.PreviewGroup>
            <Space wrap>
              {property?.propertyImages.map((image) => (
                <Flex vertical className='w-32'>
                  <Image key={image} src={image} className='h-24 object-cover' />
                  <Flex justify='space-evenly'>
                    <Tooltip title={t('editPropertyModal.form.delete')}>
                      <Button
                        icon={<DeleteOutlined />}
                        type='link'
                        size='small'
                        danger
                        onClick={() => handleDeleteImage(image)}
                      />
                    </Tooltip>
                    {thumbnailUrl === image ? (
                      <Tooltip title={t('editPropertyModal.form.thumbnail')}>
                        <Button icon={<PictureOutlined />} type='link' size='small' disabled>
                          {t('editPropertyModal.form.thumbnail')}
                        </Button>
                      </Tooltip>
                    ) : (
                      <Tooltip title={t('editPropertyModal.form.setThumbnail')}>
                        <Button
                          icon={<PictureOutlined />}
                          type='link'
                          size='small'
                          onClick={() => setThumbnailUrl(image)}
                        />
                      </Tooltip>
                    )}
                  </Flex>
                </Flex>
              ))}
            </Space>
          </Image.PreviewGroup>
        </Form.Item>

        <Form.Item>
          <Upload
            multiple
            accept='image/*'
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={(file) => {
              const isValid = validateFile(file)
              return isValid ? false : Upload.LIST_IGNORE
            }}
          >
            {Number(property?.propertyImages.length) + fileList.length >= 10 ? null : (
              <Button icon={<UploadOutlined />}>{t('editPropertyModal.form.uploadImages')}</Button>
            )}
          </Upload>
        </Form.Item>

        <Form.Item<PutPropertyFormData>
          label={t('editPropertyModal.form.roomType')}
          name='roomType'
          rules={[
            {
              required: true,
              message: t('editPropertyModal.form.roomTypeRequired')
            }
          ]}
        >
          <Select loading={roomTypeIsLoading} options={roomTypeOptions} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<PutPropertyFormData>
              label={t('editPropertyModal.form.city')}
              name='city'
              rules={[
                {
                  required: true,
                  message: t('editPropertyModal.form.cityRequired')
                }
              ]}
            >
              <Select
                loading={cityIsLoading}
                options={cityOptions}
                onChange={(value) => {
                  setselectedCity(value)
                  form.setFieldValue('district', undefined)
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<PutPropertyFormData>
              label={t('editPropertyModal.form.district')}
              name='district'
              rules={[
                {
                  required: true,
                  message: t('editPropertyModal.form.districtRequired')
                }
              ]}
            >
              <Select
                loading={districtIsLoading}
                options={districtOptions}
                disabled={!selectedCity}
                placeholder={t('editPropertyModal.form.district')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<PutPropertyFormData>
          label={t('editPropertyModal.form.location')}
          name='location'
          rules={[
            {
              required: true,
              message: t('editPropertyModal.form.locationRequired')
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item<PutPropertyFormData>
              label={t('editPropertyModal.form.price')}
              name='price'
              rules={[
                {
                  required: true,
                  message: t('editPropertyModal.form.priceRequired')
                },
                {
                  pattern: new RegExp(/^[0-9,]+$/),
                  message: t('editPropertyModal.form.pricePattern')
                },
                {
                  max: 12,
                  message: t('editPropertyModal.form.priceMax')
                }
              ]}
            >
              <Input placeholder={t('editPropertyModal.form.pricePlaceholder')} addonAfter='₫ / tháng' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<PutPropertyFormData>
              label={t('editPropertyModal.form.area')}
              name='area'
              rules={[
                {
                  required: true,
                  message: t('editPropertyModal.form.areaRequired')
                },
                {
                  pattern: new RegExp(/^[0-9,]+$/),
                  message: t('editPropertyModal.form.areaPattern')
                },
                {
                  max: 7,
                  message: t('editPropertyModal.form.areaMax')
                }
              ]}
            >
              <Input placeholder={t('editPropertyModal.form.areaPlaceholder')} addonAfter='m²' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<PutPropertyFormData>
              label={t('editPropertyModal.form.numRooms')}
              name='numRooms'
              rules={[
                {
                  required: true,
                  message: t('editPropertyModal.form.numRoomsRequired')
                },
                {
                  pattern: new RegExp(/^[0-9]+$/),
                  message: t('editPropertyModal.form.numRoomsPattern')
                }
              ]}
            >
              <Input placeholder={t('editPropertyModal.form.numRoomsPlaceholder')} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<PutPropertyFormData>
          name='amenities'
          label={t('editPropertyModal.form.amenities')}
          rules={[
            {
              required: true,
              message: t('editPropertyModal.form.amenitiesRequired')
            }
          ]}
        >
          <Select
            loading={amenityIsLoading}
            options={amenityOptions}
            mode='multiple'
            placeholder={t('editPropertyModal.form.amenities')}
            style={{ width: '100%' }}
            optionFilterProp='children'
          />
        </Form.Item>

        <Form.Item<PutPropertyFormData>
          name='description'
          label={t('editPropertyModal.form.description')}
          rules={[
            {
              required: true,
              message: t('editPropertyModal.form.descriptionRequired')
            },
            {
              min: 50,
              message: t('editPropertyModal.form.descriptionMin')
            }
          ]}
        >
          <ReactQuill theme='snow' modules={quillModules} formats={quillFormats} className='custom-quill' />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button onClick={onCancel}>{t('editPropertyModal.form.back')}</Button>

            <Button type='primary' htmlType='submit' loading={putPropertyMutation.isPending}>
              {t('editPropertyModal.form.update')}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default PostManagementEditPropertyModal
