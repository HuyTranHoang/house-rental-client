import { PostPropertyFormData } from '@/features/post-property/PostProperty.tsx'
import { useAmenities } from '@/hooks/useAmenity.ts'
import { useCities } from '@/hooks/useCity.ts'
import { useDistricts } from '@/hooks/useDistrict.ts'
import { useRoomTypes } from '@/hooks/useRoomType.ts'
import { PropertyDataSource } from '@/types/property.type.ts'
import { Button, Col, Drawer, Form, Image, Input, Row, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'

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

function PostManagementEditPropertyModal({ property, isVisible, onCancel }: PostManagementEditPropertyModalProps) {
  const [form] = Form.useForm<PostPropertyFormData>()

  const [selectedCity, setselectedCity] = useState<string | null>(null)
  const [districtOptions, setDistrictOptions] = useState<{ label: string; value: number }[]>([])

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

  useEffect(() => {
    if (property) {
      setselectedCity(property.cityId.toString())
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
      <Form<PostPropertyFormData>
        initialValues={{
          title: property?.title,
          roomType: property?.roomTypeId,
          city: property?.cityId,
          district: property?.districtId,
          location: property?.location,
          price: property?.price,
          area: property?.area,
          numRooms: property?.numRooms,
          amenities: property?.amenities.map((amenity) => amenity),
          description: property?.description
        }}
        form={form}
        layout='vertical'
      >
        <Form.Item<PostPropertyFormData>
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

        <Form.Item label='* Hình ảnh'>
          <Image.PreviewGroup>
            <Space wrap>
              {property?.propertyImages.map((image) => <Image key={image} src={image} width={100} />)}
            </Space>
          </Image.PreviewGroup>
        </Form.Item>

        <Form.Item<PostPropertyFormData>
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
            <Form.Item<PostPropertyFormData>
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
            <Form.Item<PostPropertyFormData>
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

        <Form.Item<PostPropertyFormData>
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
            <Form.Item<PostPropertyFormData>
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
            <Form.Item<PostPropertyFormData>
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
            <Form.Item<PostPropertyFormData>
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

        <Form.Item<PostPropertyFormData>
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

        <Form.Item<PostPropertyFormData>
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

            <Button type='primary' htmlType='submit'>
              Cập nhật
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default PostManagementEditPropertyModal
