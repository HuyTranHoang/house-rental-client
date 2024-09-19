import PostPropertyDescription from '@/features/post-property/PostPropertyDescription.tsx'
import PostPropertyDetail from '@/features/post-property/PostPropertyDetail.tsx'
import PostPropertyImage from '@/features/post-property/PostPropertyImage.tsx'
import PostPropertyLocation from '@/features/post-property/PostPropertyLocation'
import PostPropertyOverview from '@/features/post-property/PostPropertyOverview.tsx'
import PostPropertyRoomType from '@/features/post-property/PostPropertyRoomType'
import Container from '@/ui/Container'
import { SendOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, Form, Row, Space, Steps } from 'antd'
import { useEffect, useState } from 'react'
import './post-property.css'

export interface OriginFileObj {
  uid: string
}

interface Image {
  uid: string
  lastModified: number
  name: string
  size: number
  type: string
  percent: number
  originFileObj: OriginFileObj
  thumbUrl: string
}

export interface PostPropertyFormData {
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
  images: Image[]
}

const stepItems = [
  {
    title: 'Loại bất động sản',
    description: 'Chọn loại bất động sản bạn muốn đăng.'
  },
  {
    title: 'Vị trí đăng',
    description: 'Thông tin vị trí bất động sản.'
  },
  {
    title: 'Thông tin chi tiết',
    description: 'Giá, tiện ích, mô tả chi tiết.'
  },
  {
    title: 'Tiêu đề & mô tả',
    description: 'Tiêu đề, mô tả bất động sản.'
  },
  {
    title: 'Hình ảnh',
    description: 'Thêm hình ảnh bất động sản.'
  },
  {
    title: 'Xác nhận',
    description: 'Xem lại thông tin trước khi đăng.'
  }
]

export default function PostProperty() {
  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm()
  const [formData, setFormData] = useState<PostPropertyFormData>({} as PostPropertyFormData)

  const handleNext = async () => {
    try {
      const values = await form.validateFields()

      if (values.price) {
        values.price = values.price.replace(/,/g, '')
      }
      if (values.area) {
        values.area = values.area.replace(/,/g, '')
      }

      setFormData({ ...formData, ...values })
      if (current < stepItems.length - 1) {
        setCurrent(current + 1)
      }
      console.log('Success:', values)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const handlePrev = () => {
    setFormData({ ...formData, ...form.getFieldsValue() })
    if (current > 0) {
      setCurrent(current - 1)
    }
  }

  useEffect(() => {
    form.setFieldsValue(formData)
  }, [current, form, formData])

  return (
    <Container>
      <Card title='Đăng tin bất động sản' className='mb-10 mt-12'>
        <Row className='overflow-hidden rounded-lg bg-gray-50'>
          <Col span={8} className='border-0 border-r border-solid border-gray-200 p-6 shadow-md'>
            <Steps current={current} direction='vertical' items={stepItems} />
          </Col>
          <Col span={16} className='bg-white p-6'>
            <Flex vertical className='min-h-[400px]'>
              {current === 0 && <PostPropertyRoomType form={form} />}
              {current === 1 && <PostPropertyLocation form={form} />}
              {current === 2 && <PostPropertyDetail form={form} />}
              {current === 3 && <PostPropertyDescription form={form} />}
              {current === 4 && <PostPropertyImage form={form} />}
              {current === 5 && <PostPropertyOverview formData={formData} />}

              <Flex className='mt-auto pt-8'>
                <Space>
                  <Button onClick={handlePrev} icon={<StepBackwardOutlined />} danger disabled={current === 0}>
                    Quay lại
                  </Button>
                  <Button
                    onClick={handleNext}
                    icon={<StepForwardOutlined />}
                    iconPosition='end'
                    type='primary'
                    disabled={current === stepItems.length - 1}
                  >
                    Tiếp tục
                  </Button>
                </Space>

                {current === stepItems.length - 1 && (
                  <Button icon={<SendOutlined />} type='primary' className='ml-auto bg-green-500 hover:bg-green-400'>
                    Đăng tin
                  </Button>
                )}
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}
