import CustomBreadcrumbs from '@/components/CustomBreadcrumbs.tsx'
import ImageComponent from '@/components/ImageComponent.tsx'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import useAuthStore from '@/features/auth/authStore.ts'
import ReportButton from '@/features/property-detail/ReportButton.tsx'
import { useAddFavorite, useFavoriteByUserId, useRemoveFavorite } from '@/hooks/useFavorite.ts'
import { useProperty } from '@/hooks/useProperty'
import { useUser } from '@/hooks/useUser'
import Container from '@/ui/Container.tsx'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { formatDate, formatJoinedDate } from '@/utils/formatDate.ts'
import { formatPhoneNumberWithSpaces, maskPhoneNumber } from '@/utils/formatPhoneNumber'
import { red } from '@ant-design/colors'
import {
  CheckCircleFilled,
  CheckOutlined,
  CopyOutlined,
  HeartFilled,
  HeartOutlined,
  LeftCircleOutlined,
  MailOutlined,
  PhoneFilled,
  RightCircleOutlined
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Divider,
  Flex,
  Row,
  Skeleton,
  Space,
  Tag,
  Tooltip,
  Typography
} from 'antd'
import Meta from 'antd/es/card/Meta'
import DOMPurify from 'dompurify'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import PropertyDetailReview from './PropertyDetailReview'

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

const StickyDiv = styled('div')`
  position: sticky;
  top: 24px;
  z-index: 1000;
`

function PropertyDetail() {
  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()
  const currentUser = useAuthStore((state) => state.user)
  const { favorites } = useFavoriteByUserId(currentUser?.id)
  const isFavorite = favorites?.some((favorite) => favorite.propertyId === Number(id))

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPhoneNumberVisible, setIsPhoneNumberVisible] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const { propertyData, propertyIsLoading } = useProperty(Number(id))
  const { userData, userIsLoading } = useUser(propertyData?.userId)

  const { addFavoriteMutate } = useAddFavorite()
  const { removeFavoriteMutate } = useRemoveFavorite()

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
      navigator.clipboard.writeText(userData!.phoneNumber)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }

  return (
    <Container>
      <Row gutter={24}>
        <Col xs={24} md={16} className='mb-3 mt-5'>
          <CustomBreadcrumbs />
        </Col>

        <Col xs={24} md={8}>
          <Space className='mb-3 mt-5'>
            <PrevButton size='small'>Về danh sách</PrevButton>
            <NextButton size='small'>Tin tiếp</NextButton>
          </Space>
        </Col>

        <Col xs={24} md={16} className='mb-6 bg-white p-5'>
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
                className='h-[500px] w-full'
              >
                {propertyData.propertyImages.map((image, index) => (
                  <SwiperSlide key={index} className='flex justify-center'>
                    {/*<img src={image.imageUrl} alt='image' />*/}
                    <ImageComponent image={image} />
                  </SwiperSlide>
                ))}
                <div className='swiper-button-prev'>
                  <LeftCircleOutlined className='text-2xl' />
                </div>
                <div className='swiper-button-next'>
                  <RightCircleOutlined className='text-2xl' />
                </div>

                <Tag color='#595959' className='absolute bottom-0 right-0 z-10 m-4'>
                  {`${currentSlide + 1}/${propertyData.propertyImages.length}`}
                </Tag>
              </Swiper>

              <Typography.Title level={4}>{propertyData.title}</Typography.Title>

              <Typography.Text>{propertyData.location}</Typography.Text>

              <Typography.Title level={3} className='mt-2 text-blue-600'>
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

        <Col xs={24} md={8}>
          <StickyDiv>
            <Card loading={userIsLoading}>
              {userData && (
                <>
                  <Meta
                    avatar={
                      <Flex align='center' justify='center' className='mr-2 h-full'>
                        <Avatar size='large' src={userData.avatarUrl} />
                      </Flex>
                    }
                    title={
                      <Space>
                        <span>
                          {userData.firstName} {userData.lastName}
                        </span>
                        <CheckCircleFilled className='text-blue-400' />
                      </Space>
                    }
                    description={<span>Đã tham gia: {formatJoinedDate(userData.createdAt)}</span>}
                  />
                  <Divider className='m-3' />

                  <Button block size='large' onClick={handleShowPhoneNumber} className='mb-2 border-blue-400'>
                    <Flex justify='space-between' className='w-full'>
                      <span>
                        <PhoneFilled />{' '}
                        {isPhoneNumberVisible
                          ? formatPhoneNumberWithSpaces(userData.phoneNumber)
                          : maskPhoneNumber(userData.phoneNumber)}
                      </span>
                      <b className='text-blue-500'>
                        {isPhoneNumberVisible ? (
                          isCopied ? (
                            <CheckOutlined />
                          ) : (
                            <Tooltip title='Sao chép số điện thoại'>
                              <CopyOutlined />
                            </Tooltip>
                          )
                        ) : (
                          'Bấm để hiện số'
                        )}
                      </b>
                    </Flex>
                  </Button>

                  <Button block icon={<MailOutlined />} size='large' type='primary'>
                    Gửi tin nhắn
                  </Button>
                </>
              )}
            </Card>

            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultHoverBorderColor: red.primary,
                    defaultHoverColor: red[3]
                  }
                }
              }}
            >
              <Button
                icon={
                  isFavorite ? <HeartFilled className='text-red-500' /> : <HeartOutlined className='text-red-500' />
                }
                onClick={() => {
                  if (!currentUser) {
                    navigate(ROUTER_NAMES.LOGIN)
                    return
                  }
                  if (isFavorite) {
                    removeFavoriteMutate({ propertyId: Number(id), userId: currentUser.id })
                  } else {
                    addFavoriteMutate(Number(id))
                  }
                }}
                size='large'
                className='mt-3 mb-6 md:mb-0 w-full md:w-32'
              >
                Lưu tin
              </Button>
            </ConfigProvider>
          </StickyDiv>
        </Col>
      </Row>
    </Container>
  )
}

export default PropertyDetail
