import { Card, Col, Flex, Image, Row, Space, Tag, Typography } from 'antd'
import { formatDate } from '@/utils/formatDate.ts'
import { CalendarOutlined, EyeOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Property } from '@/models/property.type.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { useState } from 'react'


interface RentHouseCardItemProps {
  property: Property
}

function RentHouseCardItem({ property }: RentHouseCardItemProps) {
  const [isHover, setIsHover] = useState(false)

  return (
    <Card style={{ marginRight: '16px', marginBottom: '8px' }}>
      <Row gutter={24}>
        <Col span={6}>
          <Image preview={{ mask: <><EyeOutlined style={{ marginRight: 6 }} /> Chi tiết</> }}
                 height={200} width={200} src={property.propertyImages[0]} style={{ objectFit: 'cover' }} />
        </Col>

        <Col span={18}>
          <Flex vertical justify="space-between" style={{ height: '100%' }}>
            <div style={{ marginBottom: '8px' }}>
              <Typography.Title level={4} style={{ marginTop: 0 }}>
                {property.title}
              </Typography.Title>

              <Typography.Paragraph style={{ color: '#657786' }}>
                {property.districtName}, {property.cityName}
              </Typography.Paragraph>

              <Typography.Title level={3} style={{ color: '#096dd9', marginTop: '12px', marginBottom: '8px' }}>
                {formatCurrency(property.price)}
              </Typography.Title>

              <Space size="large">
                <Typography.Text strong>{property.roomTypeName}</Typography.Text>
                <span>{property.area} m&sup2;</span>
                <span>{property.numRooms} phòng ngủ</span>
              </Space>

              <div style={{ marginTop: '8px' }}>
                {property.amenities.map((amenity, index) => (
                  <Typography.Text key={index} style={{ color: '#657786' }}>
                    <Tag color="geekblue">{amenity}</Tag>
                  </Typography.Text>
                ))}
              </div>
            </div>
            <div>
              <Flex justify="space-between" align="center">
                <Typography.Paragraph style={{ color: '#657786', margin: 0 }}>
                  <CalendarOutlined /> {formatDate(property.createdAt)}
                </Typography.Paragraph>
                <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                     style={{ fontSize: 24, position: 'relative', height: 24, width: 24, cursor: 'pointer' }}>
                  <HeartOutlined style={{ position: 'absolute', opacity: isHover ? 0 : 1 }} />
                  <HeartFilled style={{ color: '#ff4d4f', position: 'absolute', opacity: isHover ? 1 : 0 }} />
                </div>
              </Flex>
            </div>
          </Flex>
        </Col>
      </Row>
    </Card>
  )
}

export default RentHouseCardItem
