import { useUserMembership } from '@/hooks/useUserMembership'
import useAuthStore from '@/store/authStore'
import { formatCurrency } from '@/utils/formatCurrentcy'
import { formatDateWithTime } from '@/utils/formatDate'
import { Card, Col, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const { Title, Text } = Typography

export function SuccessUpgrade() {
  const { t } = useTranslation('membership')
  const location = useLocation()
  const { membership, user } = location.state || {}
  const currentUser = useAuthStore((state) => state.user)
  const { data: userMembership } = useUserMembership(currentUser?.id)

  return (
    <Row justify='center' className='mt-12 mb-24'>
      <Col xs={24} md={16} lg={12}>
        <Card className='rounded-lg p-6 text-center shadow-lg' bordered={false}>
          <Title level={2} className='text-gradient'>
            {t('purchaseSuccess.purchaseSuccess')}
          </Title>
          <Text className='text-xl'>
            {t('purchaseSuccess.congratulations')}{' '}
            <Text strong className='text-xl text-green-500'>
              {membership?.name}
            </Text>
            .
          </Text>

          <Card
            className='mt-4 rounded-lg p-4 text-center'
            bordered={false}
            style={{ maxWidth: 400, margin: '0 auto' }}
          >
            <p>
              <Text strong>{t('purchaseSuccess.currentBalance')}:</Text> {formatCurrency(user?.balance)}
            </p>
            <p>
              <Text strong>{t('purchaseSuccess.expiryDate')}:</Text>{' '}
              {formatDateWithTime(userMembership?.endDate) || t('purchaseSuccess.undefined')}
            </p>
          </Card>
        </Card>
      </Col>
    </Row>
  )
}
