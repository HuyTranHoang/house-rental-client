import { Image as ImageType } from '@/features/post-property/PostProperty.tsx'
import { useAmenities } from '@/hooks/useAmenity.ts'
import { useCities } from '@/hooks/useCity.ts'
import { useDistricts } from '@/hooks/useDistrict.ts'
import { useRoomTypes } from '@/hooks/useRoomType.ts'
import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { PropertyDataSource } from '@/types/property.type.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Col, Drawer, Flex, Form, Image, Input, Row, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
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

  // [key: string]: string | string[] | ImageType[] | ImageType
}

function PostManagementEditPropertyModal({ property, isVisible, onCancel }: PostManagementEditPropertyModalProps) {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  const [selectedCity, setselectedCity] = useState<string | null>(null)
  const [districtOptions, setDistrictOptions] = useState<{ label: string; value: number }[]>([])

  const [deleteImages, setDeleteImages] = useState<string[]>([])
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('')

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
      toast.success('Cập nhật bài đăng thành công')
      form.resetFields()
      onCancel()
    },
    onError: (error) => {
      console.error('Error posting property:', error)
      toast.error('Có lỗi xảy ra khi đăng tin, vui lòng thử lại sau.')
    }
  })

  const handleDeleteImage = (imageUrl: string) => {
    if (imageUrl === thumbnailUrl) {
      toast.error('Vui lòng chọn ảnh khác làm ảnh bìa trước khi xóa ảnh này')
      return
    }

    setDeleteImages((prev) => [...prev, imageUrl])
    property!.propertyImages = property!.propertyImages.filter((image) => image !== imageUrl)
  }

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

    // formData.images.forEach((image) => {
    //   if (image.uid === formData.thumbnailImage.uid) return
    //
    //   formDataToSend.append('images', image.originFileObj)
    // })
    // formDataToSend.append('thumbnailImage', formData.thumbnailImage.originFileObj)

    formDataToSend.append('status', 'PENDING')

    formDataToSend.append('deleteImages', deleteImages.join(','))
    formDataToSend.append('thumbnailUrl', thumbnailUrl)

    await putPropertyMutation.mutateAsync(formDataToSend)
  }

  useEffect(() => {
    if (property) {
      setselectedCity(property.cityId.toString())
      setThumbnailUrl(property.thumbnailUrl)
    }
  }, [property])

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
    <Drawer title='Sửa bài đăng' size='large' onClose={onCancel} open={isVisible}>
      <Form
        initialValues={{
          title: property?.title,
          roomType: property?.roomTypeId,
          city: property?.cityId,
          district: property?.districtId,
          location: property?.location,
          price: property?.price.toString(),
          area: property?.area.toString(),
          numRooms: property?.numRooms,
          amenities: property?.amenities.map((amenity) => amenity),
          description: property?.description
        }}
        form={form}
        layout='vertical'
        onFinish={handleFinish}
      >
        <Form.Item<PutPropertyFormData>
          label='Tiêu đề'
          name='title'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tiêu đề bài đăng'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label='Hình ảnh'>
          <Image.PreviewGroup>
            <Space wrap>
              {property?.propertyImages.map((image) => (
                <Flex vertical className='w-32'>
                  <Image key={image} src={image} />
                  <Flex justify='space-between'>
                    <Button type='link' size='small' danger onClick={() => handleDeleteImage(image)}>
                      Xóa
                    </Button>
                    {thumbnailUrl === image ? (
                      <Button type='link' size='small' disabled>
                        Ảnh bìa
                      </Button>
                    ) : (
                      <Button type='link' size='small' onClick={() => setThumbnailUrl(image)}>
                        Đặt ảnh bìa
                      </Button>
                    )}
                  </Flex>
                </Flex>
              ))}
            </Space>
          </Image.PreviewGroup>
        </Form.Item>

        <Form.Item<PutPropertyFormData>
          label='Loại bất động sản'
          name='roomType'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn loại bất động sản'
            }
          ]}
        >
          <Select loading={roomTypeIsLoading} options={roomTypeOptions} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<PutPropertyFormData>
              label='Thành phố'
              name='city'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn thành phố'
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
              label='Quận/Huyện'
              name='district'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn quận/huyện'
                }
              ]}
            >
              <Select
                loading={districtIsLoading}
                options={districtOptions}
                disabled={!selectedCity}
                placeholder='Chọn quận huyện'
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<PutPropertyFormData>
          label='Địa chỉ cụ thể'
          name='location'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ cụ thể'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item<PutPropertyFormData>
              label='Giá'
              name='price'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập giá'
                },
                {
                  pattern: new RegExp(/^[0-9,]+$/),
                  message: "Vui lòng nhập số cho 'giá'"
                },
                {
                  max: 12,
                  message: 'Giá không được vượt quá 9 chữ số'
                }
              ]}
            >
              <Input placeholder='Nhập giá cho thuê' addonAfter='₫ / tháng' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<PutPropertyFormData>
              label='Diện tích'
              name='area'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập diện tích bất động sản'
                },
                {
                  pattern: new RegExp(/^[0-9,]+$/),
                  message: "Vui lòng nhập số cho 'diện tích'"
                },
                {
                  max: 7,
                  message: 'Diện tích không được vượt quá 6 chữ số'
                }
              ]}
            >
              <Input placeholder='Nhập diện tích bất động sản' addonAfter='m²' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<PutPropertyFormData>
              label='Số phòng ngủ'
              name='numRooms'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số phòng ngủ'
                },
                {
                  pattern: new RegExp(/^[0-9]+$/),
                  message: "Vui lòng nhập số cho 'số phòng ngủ'"
                }
              ]}
            >
              <Input placeholder='Nhập số phòng ngủ' />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<PutPropertyFormData>
          name='amenities'
          label='Tiện nghi'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn ít nhất một tiện nghi'
            }
          ]}
        >
          <Select
            loading={amenityIsLoading}
            options={amenityOptions}
            mode='multiple'
            placeholder='Chọn tiện nghi'
            style={{ width: '100%' }}
            optionFilterProp='children'
          />
        </Form.Item>

        <Form.Item<PutPropertyFormData>
          name='description'
          label='Mô tả'
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

        <Form.Item>
          <Space>
            <Button onClick={onCancel}>Quay lại</Button>

            <Button type='primary' htmlType='submit' loading={putPropertyMutation.isPending}>
              Cập nhật
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default PostManagementEditPropertyModal
