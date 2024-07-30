import { Button, Col, Flex, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Row>
      <Col span={6}>
      </Col>
      <Col span={12}>
        <img src="/404_NotFound.png" alt="404 Not Found"
             style={{ objectFit: 'cover', width: '100%' }} />
        <Typography.Paragraph style={{ padding: '16px' }}>
          ❌ Trang bạn đang tìm kiếm không tồn tại.
        </Typography.Paragraph>

        <Flex justify="space-between">
          <Link to={'/'}>
            <Button type="link">Trở về trang chủ</Button>
          </Link>
        </Flex>


      </Col>
      <Col span={6}>
      </Col>
    </Row>
  )
}

export default NotFound
