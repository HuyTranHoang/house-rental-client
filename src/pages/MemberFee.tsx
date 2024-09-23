import { useMemberships } from '@/hooks/useMembership'
import Container from '@/ui/Container'
import { CheckOutlined, CrownOutlined, RocketOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Card, Spin, Tooltip, Typography } from 'antd'

const { Text, Link, Title } = Typography

const plans = [
  {
    name: 'Miễn phí',
    price: '0₫/tháng',
    description: 'Cùng khám phá sự hỗ trợ của AI trong các công việc hằng ngày của bạn',
    icon: <StarOutlined className='text-2xl text-yellow-500' />,
    features: [
      'Hỗ trợ viết, giải quyết vấn đề và nhiều tính năng khác',
      'Truy cập vào GPT-4o mini',
      'Quyền truy cập hạn chế vào GPT‑4o',
      'Truy cập hạn chế vào phân tích dữ liệu, tải lên tệp, thị giác, duyệt web và tạo hình ảnh',
      'Sử dụng GPT tùy chỉnh'
    ],
    buttonText: 'Kế hoạch hiện tại của bạn',
    buttonDisabled: true
  },
  {
    name: 'Tiêu chuẩn',
    price: '200.000₫/tháng',
    description: 'Trải nghiệm đầy đủ các tính năng AI với tốc độ cao',
    icon: <CrownOutlined className='text-2xl text-blue-500' />,
    features: [
      'Tất cả các tính năng của gói Miễn phí',
      'Truy cập đầy đủ vào GPT-4o',
      'Tốc độ phản hồi nhanh hơn',
      'Ưu tiên truy cập vào các tính năng mới',
      'Hỗ trợ khách hàng nâng cao'
    ],
    buttonText: 'Nâng cấp lên Tiêu chuẩn',
    buttonDisabled: false
  },
  {
    name: 'Cao cấp',
    price: '500.000₫/tháng',
    description: 'Giải pháp AI tối ưu cho doanh nghiệp và chuyên gia',
    icon: <RocketOutlined className='text-2xl text-purple-500' />,
    features: [
      'Tất cả các tính năng của gói Tiêu chuẩn',
      'Tốc độ xử lý cực nhanh',
      'Tùy chỉnh AI theo nhu cầu riêng',
      'Tích hợp API nâng cao',
      'Hỗ trợ kỹ thuật 24/7'
    ],
    buttonText: 'Nâng cấp lên Cao cấp',
    buttonDisabled: false
  }
]

function MemberFee() {
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

            <Tooltip title='Bạn đang sử dụng gói này'>
              <Button
                // type={plan.buttonDisabled ? 'default' : 'primary'}
                // disabled={plan.buttonDisabled}
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

            {membership.id === 1 && (
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
            )}
          </Card>
        ))}
      </div>
    </Container>
  )
}

export default MemberFee
