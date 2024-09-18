import PostPropertyDescription from '@/features/post-property/PostPropertyDescription.tsx'
import PostPropertyDetail from '@/features/post-property/PostPropertyDetail.tsx'
import PostPropertyImage from '@/features/post-property/PostPropertyImage.tsx'
import PostPropertyLocation from '@/features/post-property/PostPropertyLocation'
import PostPropertyOverview from '@/features/post-property/PostPropertyOverview.tsx'
import PostPropertyRoomType from '@/features/post-property/PostPropertyRoomType'
import Container from '@/ui/Container'
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, Form, Row, Space, Steps } from 'antd'
import { useEffect, useState } from 'react'
import './post-property.css'

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
  const [formData, setFormData] = useState({})

  const handleNext = async () => {
    try {
      const values = await form.validateFields()
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
      <Card>
        Giá trị hiện tại của form:
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </Card>

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
              {current === 5 && <PostPropertyOverview form={form} />}

              <Space className='mt-auto pt-8'>
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
            </Flex>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}
