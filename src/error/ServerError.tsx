import { Button, Col, Flex, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'

function ServerError() {
  return (
    <Row>
      <Col span={6}>
      </Col>
      <Col span={12}>
        <img src="/500_InternalServerError.png" alt="500 Internal Server Error"
             style={{ objectFit: 'cover', width: '100%' }} />
        <Typography.Paragraph style={{ padding: '16px' }}>
          ❌ Có lỗi xảy ra trên máy chủ, vui lòng thử lại sau.
        </Typography.Paragraph>

        <Flex justify="space-between">
          <Link to={'/'}>
            <Button type="link">Trở về trang chủ</Button>
          </Link>
          <Link to={'/contact'}>
            <Button type="primary">Liên hệ quản trị viên</Button>
          </Link>
        </Flex>


      </Col>
      <Col span={6}>
      </Col>
    </Row>
  )
}

export default ServerError
