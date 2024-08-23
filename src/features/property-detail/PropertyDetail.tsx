import CustomBreadcrumbs from '@/components/CustomBreadcrumbs.tsx'
import Container from '@/ui/Container.tsx'
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  DescriptionsProps,
  Divider,
  Flex,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography
} from 'antd'
import { useParams } from 'react-router-dom'

import DOMPurify from 'dompurify'

import ReportButton from '@/features/property-detail/ReportButton.tsx'
import { useProperty } from '@/hooks/useProperty'
import { useUser } from '@/hooks/useUser'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { formatDate, formatJoinedDate } from '@/utils/formatDate.ts'
import { formatPhoneNumber, hidePhoneNumber } from '@/utils/formatPhoneNumber'
import { blue, red } from '@ant-design/colors'
import {
  CheckCircleFilled,
  HeartOutlined,
  LeftCircleOutlined,
  MailOutlined,
  PhoneFilled,
  RightCircleOutlined
} from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import PropertyDetailReview from './PropertyDetailReview'
import styled from 'styled-components'
import { toast } from 'sonner'

const PrevButton = styled(Button)`
  border: 0;
  background-color: #ffffff;
  color: #657786;

  &:after {
    content: '';
    display: block;
    position: absolute;
    border-style: solid;
    top: 0;
    width: 0;
    height: 0;
    left: -9px;
    border-width: 11px 11px 12px 0;
    border-color: transparent #ffffff transparent transparent;
  }
`

const NextButton = styled(Button)`
  border: 0;
  background-color: #69b1ff;
  color: #ffffff;

  &:hover {
    color: #ffffff !important;
    background-color: #69b1ff !important;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    border-style: solid;
    top: 0;
    width: 0;
    height: 0;
    right: -9px;
    border-width: 11px 0 12px 11px;
    border-color: transparent transparent transparent #69b1ff;
  }
`

function PropertyDetail() {
  const { id } = useParams<{ id: string }>()

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPhoneNumberVisible, setIsPhoneNumberVisible] = useState(false)

  const { propertyData, propertyIsLoading } = useProperty(Number(id))
  const { userData, userIsLoading } = useUser(propertyData?.userId)

  const descriptionCleanHTML = propertyData ? DOMPurify.sanitize(propertyData.description) : ''

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

  const handleShowPhoneNumber = () => {
    if (!isPhoneNumberVisible) {
      setIsPhoneNumberVisible(true)
    } else {
      toast.info('Số điện thoại đã được sao chép')
      navigator.clipboard.writeText(userData!.phoneNumber)
    }
  }

  return (
    <Container>
      <Row gutter={24}>
        <Col span={16} style={{ margin: '24px 0 16px' }}>
          <CustomBreadcrumbs />
        </Col>

        <Col span={8}>
          <Space style={{ margin: '24px 0 16px' }}>
            <PrevButton size='small'>Về danh sách</PrevButton>
            <NextButton size='small'>Tin tiếp</NextButton>
          </Space>
        </Col>

        <Col span={16} style={{ backgroundColor: '#FFFFFF', padding: 24, marginBottom: 32 }}>
          {propertyIsLoading && (
            <section>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </section>
          )}

          {propertyData && (
            <section>
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
              <div dangerouslySetInnerHTML={{ __html: descriptionCleanHTML }} />

              <ReportButton propertyId={propertyData.id} />

              <Divider />

              <PropertyDetailReview propertyId={id} />
            </section>
          )}
        </Col>

        <Col span={8}>
          <Card loading={userIsLoading}>
            {userData && (
              <>
                <Meta
                  avatar={
                    <Flex align='center' justify='center' style={{ height: '100%', marginRight: 12 }}>
                      <Avatar size='large' src={userData.avatarUrl} />
                    </Flex>
                  }
                  title={
                    <Space>
                      <span>
                        {userData.firstName} {userData.lastName}
                      </span>
                      <CheckCircleFilled style={{ color: blue[3] }} />
                    </Space>
                  }
                  description={<span>Đã tham gia: {formatJoinedDate(userData.createdAt)}</span>}
                />
                <Divider style={{ margin: 16 }} />

                <Button
                  size='large'
                  onClick={handleShowPhoneNumber}
                  style={{ width: '100%', marginBottom: 12, borderColor: blue.primary }}
                >
                  <Flex justify='space-between' style={{ width: '100%' }}>
                    <span>
                      <PhoneFilled />{' '}
                      {isPhoneNumberVisible
                        ? formatPhoneNumber(userData.phoneNumber)
                        : hidePhoneNumber(userData.phoneNumber)}
                    </span>
                    <b style={{ color: blue.primary }}>{isPhoneNumberVisible ? 'Bấm để sao chép' : 'Bấm để hiện số'}</b>
                  </Flex>
                </Button>

                <Button icon={<MailOutlined />} size='large' style={{ width: '100%' }} type='primary'>
                  Gửi tin nhắn
                </Button>
              </>
            )}
          </Card>

          <Button icon={<HeartOutlined style={{ color: red.primary }} />} size='large' style={{ marginTop: 16 }}>
            Lưu tin
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default PropertyDetail
