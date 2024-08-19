import Container from '@/ui/Container.tsx'
import { Button, Col, Row, Spin, Tag, Typography } from 'antd'
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
import { LeftCircleOutlined, RightCircleOutlined, WarningOutlined } from '@ant-design/icons'
import { blue } from '@ant-design/colors'
import { useState } from 'react'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'

function PropertyDetail() {

  const { id } = useParams<{ id: string }>()

  const [currentSlide, setCurrentSlide] = useState(0)

  const { data, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => fetchPropertyById(Number(id)),
    enabled: id !== undefined
  })

  return (
    <Container>
      {isLoading && <Spin indicator={<CustomIndicator />}
                          tip={'Đang tải dữ liệu...Vui lòng đợi trong giây lát!!!'}
                          fullscreen />}

      <Row style={{ margin: '32px 0' }}>
        <Col span={24}>
          <CustomBreadcrumbs />
        </Col>

        {data && <Col span={16}>
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
            onSwiper={(swiper) => console.log(swiper)}
            style={{ margin: '24px 12px 24px 0', backgroundColor: '#fafafa', position: 'relative' }}
          >
            {data.propertyImages.map((image, index) => (
              <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={image} alt="image" />
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev"><LeftCircleOutlined style={{ fontSize: 32, color: blue.primary }} />
            </div>
            <div className="swiper-button-next"><RightCircleOutlined style={{ fontSize: 32, color: blue.primary }} />
            </div>

            <Tag color="#595959" style={{
              position: 'absolute',
              bottom: '15px',
              left: '10px',
              zIndex: 99
            }}>
              {`${currentSlide + 1}/${data.propertyImages.length}`}
            </Tag>
          </Swiper>

          <Typography.Title level={4}>
            {data.title}
          </Typography.Title>
          <Typography.Text>
            {data.location}
          </Typography.Text>
          <Typography.Title level={3} style={{ color: '#096dd9', marginTop: 12 }}>
            {formatCurrency(data.price)}
          </Typography.Title>

          <Typography.Title level={4}>
            Thông tin chính
          </Typography.Title>

          <Typography.Paragraph>
            ---- Để tạm, bổ sung sau.
          </Typography.Paragraph>

          <Typography.Title level={4}>
            Giới thiệu
          </Typography.Title>
          <Typography.Paragraph>
            ---- Để tạm, bổ sung sau. Sẽ cần convert sang HTML với WYSIWYG editor.
            <br/>
            {data.description}
          </Typography.Paragraph>

          <Button icon={<WarningOutlined />} iconPosition="end" size="small"
                  onClick={() => alert('Report violation -- Chưa làm .w.')}
                  style={{ marginTop: 24, fontWeight: 600, color: '#657786', borderColor: '#9fbdd4' }}>
            Báo vi phạm
          </Button>
        </Col>
        }

        <Col span={8} style={{ backgroundColor: '#fafafa' }}>
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
