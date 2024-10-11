import { Membership } from '@/types/membership.type.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { CheckOutlined, CrownOutlined, RocketOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Card, Tooltip, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const { Text, Title } = Typography

interface MembershipCardProps {
  membership: Membership
  isCurrentMembership: boolean
  onUpgrade: (membership: Membership) => void
  isLoggedIn: boolean
}

export function MembershipCard({ membership, isCurrentMembership, onUpgrade, isLoggedIn }: MembershipCardProps) {
  const { name, price, durationDays, description, priority, refresh } = membership
  const { t } = useTranslation('membership')

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
    if (name === 'Free') return t('free')
    if (name === 'Standard') return t('standard')
    if (name === 'Premium') return t('premium')
    return name
  }

  return (
    <Card className='flex h-full flex-col rounded-xl border-2 shadow-sm'>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <Text className='text-lg font-semibold'>{name}</Text>
          <Title level={5} className='m-0 text-lg font-semibold text-gray-500'>
            {formatCurrency(price)}
            {name !== 'Free' ? ` / ${durationDays} ngày` : ''}
          </Title>
        </div>
        {getIcon()}
      </div>
      <Text className='mt-2 block flex-grow text-sm text-gray-500'>{description}</Text>

      <div className='mt-auto'>
        <Tooltip title={isCurrentMembership ? t('extend') : t('upgrade')}>
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
          <Text className='mt-2 block text-center text-sm text-gray-500'>({t('urUseThisPackage')})</Text>
        )}
      </div>

      <ul className='mb-4 mt-8 space-y-2 p-0'>
        <MembershipFeature text={name === 'Free' ? t('freePackage') : t('basicPackage')} />
        {name !== 'Free' && <MembershipFeature text={t('descriptionPackageStandardAndPremium')} />}
        {name === 'Premium' && <MembershipFeature text={t('descriptionPackagePremium')} />}
        <MembershipFeature
          text={t('postPriority', {
            priority
          })}
        />
        <MembershipFeature
          text={t('refreshPost', {
            refresh
          })}
        />
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
