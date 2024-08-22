import Container from '@/ui/Container.tsx'
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  DescriptionsProps,
  Divider,
  Form,
  FormProps,
  Input,
  List,
  Rate,
  Row,
  Space,
  Spin,
  Tag,
  Typography
} from 'antd'
import CustomBreadcrumbs from '@/components/CustomBreadcrumbs.tsx'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchPropertyById } from '@/api/property.api.ts'
import CustomIndicator from '@/components/CustomIndicator.tsx'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import { blue } from '@ant-design/colors'
import { useState } from 'react'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { formatDate } from '@/utils/formatDate.ts'
import ReportButton from '@/features/property-detail/ReportButton.tsx'
const { TextArea } = Input

const ratingDesc = ['Rất tệ 😭', 'Tệ 😢', 'Bình thường 😊', 'Tốt 😀', 'Tuyệt vời! 😆']

interface ReviewFieldType {
  propertyId?: number
  rating: number
  comment: string
}

const onFinish: FormProps<ReviewFieldType>['onFinish'] = (values) => {
  console.log('Success:', values)
}

function PropertyDetail() {
  const { id } = useParams<{ id: string }>()

  const [currentSlide, setCurrentSlide] = useState(0)

  const { data, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => fetchPropertyById(Number(id)),
    enabled: id !== undefined
  })

  const items: DescriptionsProps['items'] = [
    {
      key: 'area',
      label: 'Diện tích',
      children: <span>{data?.area} m&sup2;</span>
    },
    {
      key: 'numRooms',
      label: 'Số phòng ngủ',
      children: data?.numRooms
    },
    {
      key: 'createAt',
      label: 'Ngày đăng',
      children: formatDate(data?.createdAt)
    },
    {
      key: 'amenities',
      label: 'Tiện ích',
      children: data?.amenities.join(', '),
      span: 3
    }
  ]

  const feedbackData = [
    {
      title: (
        <Space size='large'>
          Nguyễn Văn A
          <Rate disabled defaultValue={2} />
        </Space>
      )
    },
    {
      title: (
        <Space size='large'>
          Nguyễn Văn B
          <Rate disabled defaultValue={3} />
        </Space>
      )
    },
    {
      title: (
        <Space size='large'>
          Nguyễn Văn C
          <Rate disabled defaultValue={4} />
        </Space>
      )
    },
    {
      title: (
        <Space size='large'>
          Nguyễn Văn D
          <Rate disabled defaultValue={5} />
        </Space>
      )
    }
  ]

  return (
    <Container>
      {isLoading && (
        <Spin indicator={<CustomIndicator />} tip={'Đang tải dữ liệu...Vui lòng đợi trong giây lát!!!'} fullscreen />
      )}

      <Row style={{ margin: '32px 0' }}>
        <Col span={24}>
          <CustomBreadcrumbs />
        </Col>

        {data && (
          <Col span={16}>
            <section style={{ marginRight: 24 }}>
              <Swiper
                modules={[Navigation, Pagination]}
                grabCursor
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev'
                }}
                pagination={{ clickable: true }}
                slidesPerView={1}
                spaceBetween={30}
                onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                style={{ margin: '24px 0', backgroundColor: '#fafafa', position: 'relative' }}
              >
                {data.propertyImages.map((image, index) => (
                  <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={image} alt='image' />
                  </SwiperSlide>
                ))}
                <div className='swiper-button-prev'>
                  <LeftCircleOutlined style={{ fontSize: 32, color: blue.primary }} />
                </div>
                <div className='swiper-button-next'>
                  <RightCircleOutlined style={{ fontSize: 32, color: blue.primary }} />
                </div>

                <Tag
                  color='#595959'
                  style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '10px',
                    zIndex: 99
                  }}
                >
                  {`${currentSlide + 1}/${data.propertyImages.length}`}
                </Tag>
              </Swiper>

              <Typography.Title level={4}>{data.title}</Typography.Title>

              <Typography.Text>{data.location}</Typography.Text>

              <Typography.Title level={3} style={{ color: '#096dd9', marginTop: 12 }}>
                {formatCurrency(data.price)}
              </Typography.Title>

              <Typography.Title level={4}>Thông tin chính</Typography.Title>

              <Typography.Paragraph>
                <Descriptions bordered items={items} />
              </Typography.Paragraph>

              <Typography.Title level={4}>Giới thiệu</Typography.Title>
              <Typography.Paragraph>
                ---- Để tạm, bổ sung sau. Sẽ cần convert sang HTML với WYSIWYG editor.
                <br />
                {data.description}
              </Typography.Paragraph>

              <ReportButton propertyId={data.id} />

              <Divider />

              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 24px' }}>
                <Typography.Title level={4} style={{ marginTop: 8 }}>
                  Đánh giá
                </Typography.Title>
                <List
                  pagination={{ align: 'center', pageSize: 3 }}
                  dataSource={feedbackData}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                        title={item.title}
                        description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                      />
                    </List.Item>
                  )}
                />

                <Typography.Title level={5}>Để lại đánh giá</Typography.Title>
                <Form name='feedbackForm' autoComplete='off' onFinish={onFinish}>
                  <Form.Item<ReviewFieldType>
                    name='comment'
                    rules={[
                      { required: true, message: 'Vui lòng nhập đánh giá của bạn' },
                      {
                        min: 10,
                        message: 'Đánh giá phải có ít nhất 10 ký tự'
                      },
                      {
                        max: 500,
                        message: 'Đánh giá không được vượt quá 500 ký tự'
                      }
                    ]}
                  >
                    <TextArea rows={4} placeholder='Đánh giá của bạn về bất động sản này...' />
                  </Form.Item>

                  <Form.Item<ReviewFieldType>
                    name='rating'
                    label='Đánh giá'
                    rules={[{ required: true, message: 'Vui lòng chọn số sao đánh giá!' }]}
                  >
                    <Rate allowClear={false} tooltips={ratingDesc} />
                  </Form.Item>

                  <Form.Item>
                    <Button type='primary' htmlType='submit'>
                      Gửi đánh giá
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </section>
          </Col>
        )}

        <Col span={8} style={{ backgroundColor: 'pink' }}>
          THÔNG TIN NGƯỜI ĐĂNG
          <br />
          SỐ ĐIỆN THOẠI, ZALO
          <br />
          MẠNG XÃ HỘI CÁC THỨ
        </Col>
      </Row>
    </Container>
  )
}

export default PropertyDetail
