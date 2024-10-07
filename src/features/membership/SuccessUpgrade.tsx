import { useLocation } from 'react-router-dom'
import { Card, Col, Row, Typography } from 'antd'
import { formatCurrency } from '@/utils/formatCurrentcy'
import useAuthStore from '@/store/authStore'
import { useUserMembership } from '@/hooks/useUserMembership'
import { formatDate } from '@/utils/formatDate'

const { Title, Text } = Typography

export function SuccessUpgrade() {
  const location = useLocation()
  const { membership, user } = location.state || {}
  const currentUser = useAuthStore((state) => state.user)
  const { data: userMembership } = useUserMembership(currentUser?.id)

  return (
    <Row justify="center" className="mt-10">
      <Col xs={24} md={16} lg={12}>
        <Card className="text-center shadow-lg" bordered={false}>
          <Title level={2}>Mua gói thành công!</Title>
          <Text className="text-xl">
            Chúc mừng, bạn đã mua gói thành viên{' '}
            <Text strong className="text-green-500 text-xl">
              {membership?.name}
            </Text>
            .
          </Text>

          <Card
            className="mt-2 text-center"
            bordered={false}
            style={{ maxWidth: 400, margin: '0 auto', borderRadius: 10 }}
          >
            <p>
              <Text strong>Số dư hiện tại:</Text> {formatCurrency(user?.balance)}
            </p>
            <p>
              <Text strong>Ngày hết hạn:</Text> {formatDate(userMembership?.endDate) || 'Không xác định'}
            </p>
          </Card>
        </Card>
      </Col>
    </Row>
  )
}
