import { Membership } from '@/types/membership.type.ts'
import { CheckOutlined, CrownOutlined, RocketOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Card, Tooltip, Typography } from 'antd'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'

const { Text, Title } = Typography

interface MembershipCardProps {
  membership: Membership
  isCurrentMembership: boolean
  onUpgrade: (membership: Membership) => void
  isLoggedIn: boolean
}

export function MembershipCard({ membership, isCurrentMembership, onUpgrade, isLoggedIn }: MembershipCardProps) {
  const { name, price, durationDays, description, priority, refresh } = membership

  const getIcon = () => {
    switch (name) {
      case 'Free':
        return <StarOutlined className='text-2xl text-yellow-500' />
      case 'Standard':
        return <CrownOutlined className='text-2xl text-blue-500' />
      case 'Premium':
        return <RocketOutlined className='text-2xl text-purple-500' />
      default:
        return null
    }
  }

  const getButtonText = () => {
    if (name === 'Free') return 'Gói Miễn phí'
    if (name === 'Standard') return 'Tiêu chuẩn'
    if (name === 'Premium') return 'Cao cấp'
    return name
  }

  return (
    <Card className='flex h-full flex-col rounded-xl border-2 shadow-sm'>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <Text className='text-lg font-semibold'>{name}</Text>
          <Title level={5} className='m-0 text-lg font-semibold text-gray-500'>
            {formatCurrency(price)}{name !== 'Free' ? ` / ${durationDays} ngày` : ''}
          </Title>
        </div>
        {getIcon()}
      </div>
      <Text className='mt-2 block flex-grow text-sm text-gray-500'>{description}</Text>

      <div className='mt-auto'>
        <Tooltip title={isCurrentMembership ? 'Gia hạn' : 'Nâng cấp gói'}>
          <Button
            type='primary'
            disabled={name === 'Free' || (!isLoggedIn && name !== 'Free')}
            block
            size='middle'
            className='mt-4 font-semibold'
            onClick={() => onUpgrade(membership)}
          >
            {isCurrentMembership && <CheckOutlined />}
            {getButtonText()}
          </Button>
        </Tooltip>
        {isCurrentMembership && (
          <Text className='mt-2 block text-center text-sm text-gray-500'>(Bạn đang sử dụng gói này)</Text>
        )}
      </div>

      <ul className='mb-4 mt-8 space-y-2 p-0'>
        <MembershipFeature
          text={name === 'Free' ? 'Tìm kiếm, đăng bài và nhiều tính năng khác' : 'Tất cả tính năng của gói Cơ bản'}
        />
        {name !== 'Free' && <MembershipFeature text='Tăng hiệu suất, khả năng tiếp cận người dùng' />}
        {name === 'Premium' && <MembershipFeature text='Hỗ trợ khách hàng nâng cao' />}
        <MembershipFeature text={`Ưu tiên bài đăng: ${priority} lượt`} />
        <MembershipFeature text={`Làm mới bài đăng: ${refresh} lượt`} />
      </ul>
    </Card>
  )
}

function MembershipFeature({ text }: { text: string }) {
  return (
    <li className='flex items-start'>
      <CheckOutlined className='mr-2 mt-1 flex-shrink-0 text-green-500' />
      <Text className='text-sm'>{text}</Text>
    </li>
  )
}
