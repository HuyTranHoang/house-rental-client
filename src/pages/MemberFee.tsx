import Container from '@/ui/Container'
import { CheckOutlined, CrownOutlined, RocketOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Card, Tooltip, Typography } from 'antd'
import React from 'react'

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

const MemberFee: React.FC = () => {
  return (
    <Container>
      <div className='flex flex-wrap justify-center gap-6'>
        {plans.map((plan, index) => (
          <Card key={index} className={`mb-10 mt-12 w-80 rounded-xl border-2 shadow-sm`}>
            <div className='mb-4 flex items-center justify-between'>
              <div>
                <Text className='text-lg font-semibold'>{plan.name}</Text>
                <Title level={5} className='m-0 text-lg font-semibold text-gray-500'>
                  {plan.price}
                </Title>
              </div>
              {plan.icon}
            </div>
            <Text className='mt-2 block text-sm text-gray-500'>{plan.description}</Text>

            <Tooltip title={plan.buttonDisabled ? 'Bạn đang sử dụng gói này' : ''}>
              <Button
                type={plan.buttonDisabled ? 'default' : 'primary'}
                disabled={plan.buttonDisabled}
                block
                size='middle'
                className='mb-4 mt-4 font-semibold'
              >
                {plan.buttonText}
              </Button>
            </Tooltip>

            <ul className='mb-4 space-y-2 p-0'>
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className='flex items-start'>
                  <CheckOutlined className='mr-2 mt-1 flex-shrink-0 text-green-500' />
                  <Text className='text-sm'>{feature}</Text>
                </li>
              ))}
            </ul>

            {index === 0 && (
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
