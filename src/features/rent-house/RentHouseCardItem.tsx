import { Card, Col, Flex, Row, Tag, Typography } from 'antd'
import { formatDate } from '@/utils/formatDate.ts'
import { HeartOutlined } from '@ant-design/icons'
import { Property } from '@/models/property.type.ts'

interface RentHouseCardItemProps {
  property: Property
}

function RentHouseCardItem({ property }: RentHouseCardItemProps) {
  return (
    <Card style={{ marginRight: '16px', marginBottom: '8px' }}>
      <Row gutter={12}>
        <Col span={6}>
          <img src={property.propertyImages[0]} alt="rent-house" style={{ width: '100%' }} />
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
                {property.price.toLocaleString()} đ/tháng
              </Typography.Title>
              <Typography.Title level={5} style={{ margin: 0 }}>
                {property.roomTypeName} - {property.area} m<sup>2</sup> - {property.numRooms} phòng ngủ
              </Typography.Title>
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
                  {formatDate(property.createdAt)}
                </Typography.Paragraph>
                <HeartOutlined style={{ fontSize: '24px' }} />
              </Flex>
            </div>
          </Flex>
        </Col>
      </Row>
    </Card>
  )
}

export default RentHouseCardItem
