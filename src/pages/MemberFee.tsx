import useAuthStore from '@/features/auth/authStore'
import { useMemberships } from '@/hooks/useMembership'
import { useUserMembership } from '@/hooks/useUserMembership'
import Container from '@/ui/Container'
import { CheckOutlined, CrownOutlined, RocketOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Card, Spin, Tooltip, Typography } from 'antd'
const { Text, Link, Title } = Typography


function MemberFee() {
  const currentUser = useAuthStore((state) => state.user)
  const { data: userMembership} = useUserMembership(currentUser!.id);
  const { membershipData, membershipIsLoading, membershipIsError } = useMemberships()



  if (membershipIsLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spin size='large' />
      </div>
    )
  }

  if (membershipIsError) {
    return <div>Đã xảy ra lỗi khi lấy dữ liệu gói thành viên.</div>
  }
  return (
    <Container>
      <div className='flex flex-wrap justify-center gap-6'>
        {membershipData?.map((membership) => (
          <Card key={membership.id} className={`mb-10 mt-12 w-72 rounded-xl border-2 shadow-sm`}>
            <div className='mb-4 flex items-center justify-between'>
              <div>
                <Text className='text-lg font-semibold'>{membership.name}</Text>
                <Title level={5} className='m-0 text-lg font-semibold text-gray-500'>
                  {membership.price}đ{membership.name !== 'Free' ? ' / ' + membership.durationDays + ' days' : ''}
                </Title>
              </div>
              {membership.name === 'Free' && <StarOutlined className='text-2xl text-yellow-500' />}
              {membership.name === 'Standard' && <CrownOutlined className='text-2xl text-blue-500' />}
              {membership.name === 'Premium' && <RocketOutlined className='text-2xl text-purple-500' />}
            </div>
            <Text className='mt-2 block text-sm text-gray-500'>{membership.description}</Text>

            <Tooltip title={membership.name === 'Free' ? 'Bạn đang sử dụng gói này' : 'Nâng cấp gói'}>
              <Button
                type='primary'
                disabled={membership.id === userMembership?.id}
                block
                size='middle'
                className='mb-4 mt-4 font-semibold'
              >
                {membership.name === 'Free' && 'Gói hiện tại của bản'}
                {membership.name === 'Standard' && 'Nâng lên gói Tiêu chuẩn'}
                {membership.name === 'Premium' && 'Nâng lên gói Cao cấp'}
              </Button>
            </Tooltip>

            <ul className='mb-4 space-y-2 p-0'>
              {membership.name === 'Free' && (
                <>
                  <li className='flex items-start'>
                    <CheckOutlined className='mr-2 mt-1 flex-shrink-0 text-green-500' />
                    <Text className='text-sm'>Tìm kiếm, đăng bài và nhiều tính năng khác</Text>
                  </li>
                </>
              )}
              {membership.name === 'Standard' && (
                <>
                  <li className='flex items-start'>
                    <CheckOutlined className='mr-2 mt-1 flex-shrink-0 text-green-500' />
                    <Text className='text-sm'>Tất cả tính năng của gói Cơ bản</Text>
                  </li>
                  <li className='flex items-start'>
                    <CheckOutlined className='mr-2 mt-1 flex-shrink-0 text-green-500' />
                    <Text className='text-sm'>Tăng hiệu suất, khả năng tiếp cận người dùng</Text>
                  </li>
                </>
              )}
              {membership.name === 'Premium' && (
                <>
                  <li className='flex items-start'>
                    <CheckOutlined className='mr-2 mt-1 flex-shrink-0 text-green-500' />
                    <Text className='text-sm'>Tất cả tính năng của gói Tiêu chuẩn</Text>
                  </li>
                  <li className='flex items-start'>
                    <CheckOutlined className='mr-2 mt-1 flex-shrink-0 text-green-500' />
                    <Text className='text-sm'>Hỗ trợ khách hàng nâng cao</Text>
                  </li>
                </>
              )}
              <li className='flex items-start'>
                <CheckOutlined className='mr-2 mt-1 flex-shrink-0 text-green-500' />
                <Text className='text-sm'>
                  Ưu tiên bài đăng: <span className='font-bold'>{membership.priority} lượt</span>
                </Text>
              </li>
              <li className='flex items-start'>
                <CheckOutlined className='mr-2 mt-1 flex-shrink-0 text-green-500' />
                <Text className='text-sm'>
                  Làm mới bài đăng: <span className='font-bold'>{membership.refresh} lượt</span>
                </Text>
              </li>
            </ul>

            {/* {membership.id === 1 && (
              <Text className='block text-xs text-gray-500'>
                Hiện tại bạn có kế hoạch rồi? Xem{' '}
                <Link
                  href='https://help.openai.com/en/collections/3943089-billing'
                  target='_blank'
                  className='font-semibold'
                >
                  trợ giúp thanh toán
                </Link>
              </Text>
            )} */}
          </Card>
        ))}
      </div>
    </Container>
  )
}

export default MemberFee
