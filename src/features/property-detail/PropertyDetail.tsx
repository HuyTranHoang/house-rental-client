import Container from '@/ui/Container.tsx'
import { Carousel, Col, Row, Spin } from 'antd'
import CustomBreadcrumbs from '@/components/CustomBreadcrumbs.tsx'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchPropertyById } from '@/api/property.api.ts'
import CustomIndicator from '@/components/CustomIndicator.tsx'

function PropertyDetail() {

  const { id } = useParams<{ id: string }>()

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

        <Col span={16} style={{ backgroundColor: 'red' }}>
          <Carousel arrows infinite={false}>
            {data?.propertyImages.map((image, index) => (
              <div key={index} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={image} alt={image} style={{ width: '450px', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </Carousel>

          <h1>
            {data?.title}
          </h1>
        </Col>

        <Col span={8} style={{ backgroundColor: 'blue' }}>
          TEST
        </Col>
      </Row>
    </Container>
  )
}

export default PropertyDetail
