import Container from '@/ui/Container.tsx'
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  DescriptionsProps,
  Divider,
  Flex,
  Form,
  FormProps,
  Input,
  List,
  Rate,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography
} from 'antd'
import CustomBreadcrumbs from '@/components/CustomBreadcrumbs.tsx'
import { useParams } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { CalendarOutlined, CommentOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import { blue } from '@ant-design/colors'
import { useState } from 'react'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { formatDate } from '@/utils/formatDate.ts'
import ReportButton from '@/features/property-detail/ReportButton.tsx'
import { useProperty } from '@/hooks/useProperty'
import { useCreateReview, useReview } from '@/hooks/useReview'
import { ReviewFieldType } from '@/models/review.type'
const { TextArea } = Input

const ratingDesc = ['Rất tệ 😭', 'Tệ 😢', 'Bình thường 😊', 'Tốt 😀', 'Tuyệt vời! 😆']

function PropertyDetail() {
  const { id } = useParams<{ id: string }>()

  const [currentSlide, setCurrentSlide] = useState(0)

  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(5)

  const [form] = Form.useForm()

  const { propertyData, propertyIsLoading } = useProperty(Number(id))
  const { reviewData, reviewIsLoading } = useReview(Number(id), pageNumber, pageSize)
  const { createReview, createReviewIsPending } = useCreateReview()

  const items: DescriptionsProps['items'] = [
    {
      key: 'area',
      label: 'Diện tích',
      children: <span>{propertyData?.area} m&sup2;</span>
    },
    {
      key: 'numRooms',
      label: 'Số phòng ngủ',
      children: propertyData?.numRooms
    },
    {
      key: 'createAt',
      label: 'Ngày đăng',
      children: formatDate(propertyData?.createdAt)
    },
    {
      key: 'amenities',
      label: 'Tiện ích',
      children: propertyData?.amenities.join(', '),
      span: 3
    }
  ]

  const reviewListData = reviewData
    ? [
        ...reviewData.data.map((review) => ({
          avatar: review.userAvatar
            ? review.userAvatar
            : `https://api.dicebear.com/7.x/miniavs/svg?seed=${review.userId}`,
          title: (
            <Space size='large'>
              <Typography.Text strong>{review.userName}</Typography.Text>
              <Rate disabled defaultValue={review.rating} />
            </Space>
          ),
          description: (
            <Flex vertical>
              <Typography.Text>{review.comment}</Typography.Text>
              <Typography.Text type='secondary' style={{ fontSize: 12, marginTop: 8 }}>
                <CalendarOutlined /> {formatDate(review.createdAt)}
              </Typography.Text>
            </Flex>
          )
        }))
      ]
    : []

  const onFinish: FormProps<ReviewFieldType>['onFinish'] = (values) => {
    createReview({ ...values, propertyId: Number(id) })
    form.resetFields()
  }

  return (
    <Container>
      <Row style={{ margin: '32px 0' }}>
        <Col span={24}>
          <CustomBreadcrumbs />
        </Col>

        <Col span={16}>
          {propertyIsLoading && (
            <section style={{ marginRight: 24 }}>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </section>
          )}

          {propertyData && (
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
                {propertyData.propertyImages.map((image, index) => (
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
                  {`${currentSlide + 1}/${propertyData.propertyImages.length}`}
                </Tag>
              </Swiper>

              <Typography.Title level={4}>{propertyData.title}</Typography.Title>

              <Typography.Text>{propertyData.location}</Typography.Text>

              <Typography.Title level={3} style={{ color: '#096dd9', marginTop: 12 }}>
                {formatCurrency(propertyData.price)}
              </Typography.Title>

              <Typography.Title level={4}>Thông tin chính</Typography.Title>

              <Typography.Paragraph>
                <Descriptions bordered items={items} />
              </Typography.Paragraph>

              <Typography.Title level={4}>Giới thiệu</Typography.Title>
              <Typography.Paragraph>
                ---- Để tạm, bổ sung sau. Sẽ cần convert sang HTML với WYSIWYG editor.
                <br />
                {propertyData.description}
              </Typography.Paragraph>

              <ReportButton propertyId={propertyData.id} />

              <Divider />

              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 24px' }}>
                <Typography.Title level={4} style={{ marginTop: 8 }}>
                  Đánh giá
                </Typography.Title>
                <List
                  pagination={{
                    total: reviewData?.pageInfo.totalElements,
                    pageSize: pageSize,
                    current: pageNumber,
                    showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} đánh giá`,
                    onShowSizeChange: (_, size) => setPageSize(size),
                    onChange: (page) => setPageNumber(page)
                  }}
                  dataSource={reviewListData}
                  loading={reviewIsLoading || createReviewIsPending}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={item.title}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />

                <Typography.Title level={5}>
                  Để lại đánh giá <CommentOutlined />
                </Typography.Title>
                <Form form={form} name='feedbackForm' autoComplete='off' onFinish={onFinish}>
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
                    <Button type='primary' htmlType='submit' loading={createReviewIsPending}>
                      Gửi đánh giá
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </section>
          )}
        </Col>

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
