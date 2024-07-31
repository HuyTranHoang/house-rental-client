import { Breadcrumb, Card, Col, Divider, Flex, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, HomeOutlined } from '@ant-design/icons'

function RentHouse() {
  return (
    <>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: <Link to="/"><HomeOutlined /> Mogu</Link>
          },
          {
            title: <Link to="/rent-house">Tìm thuê nhà đất</Link>
          }
        ]}
      />

      <Divider />

      <Card>
        <Row gutter={12}>
          <Col span={8}>
            <img src="https://placehold.co/600x400" alt="rent-house" style={{width: '100%'}} />
          </Col>
          <Col span={16}>
            <Typography.Title level={4} style={{marginTop: 0}}>Cho thuê căn hộ cao cấp gần đại học Văn Hiến </Typography.Title>
            <Typography.Paragraph style={{color: '#657786'}}>
              Quận Tân Phú, TP.Hồ Chí Minh
            </Typography.Paragraph>
            <Typography.Title level={3} style={{color: '#096dd9', marginTop:'12px', marginBottom: '8px'}}>3 triệu 700 nghìn</Typography.Title>
            <Typography.Title level={5} style={{margin: 0}}>
              35 m<sup>2</sup>
            </Typography.Title>
            <Flex justify='space-between' align='center'>
              <Typography.Paragraph style={{color: '#657786', margin: 0}}>
                Hôm nay.
              </Typography.Paragraph>
              <HeartOutlined style={{fontSize: '24px'}} />
            </Flex>
          </Col>
        </Row>
      </Card>

    </>
  )
}

export default RentHouse
