import ROUTER_NAMES from '@/constant/routerNames';
import { Membership } from '@/models/membership.type';
import { CheckOutlined, CrownOutlined, RocketOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Card, Tooltip, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

interface MembershipCardProps {
  memberships?: Membership[];
}

function MembershipCard({ memberships }: MembershipCardProps) {
  const navigate = useNavigate();


  const handleLoginRedirect = () => {
    const redirectUrl = window.location.href;
    console.log('Redirecting to login...', redirectUrl);
    localStorage.setItem('redirectMembership', redirectUrl);
    navigate(ROUTER_NAMES.LOGIN);
  };

  if (!memberships || memberships.length === 0) {
    return <Text>Không có gói thành viên nào để hiển thị.</Text>;
  }

  return (
    <div className='flex flex-wrap justify-center gap-6'>
      {memberships.map((mem) => (
        <Card key={mem.id} className={`mb-10 mt-12 w-72 rounded-xl border-2 shadow-sm`}>
          <div className='mb-4 flex items-center justify-between'>
            <div>
              <Text className='text-lg font-semibold'>{mem.name}</Text>
              <Title level={5} className='m-0 text-lg font-semibold text-gray-500'>
                {mem.price}đ{mem.name !== 'Free' ? ' / ' + mem.durationDays + ' days' : ''}
              </Title>
            </div>
            {mem.name === 'Free' && <StarOutlined className='text-2xl text-yellow-500' />}
            {mem.name === 'Standard' && <CrownOutlined className='text-2xl text-blue-500' />}
            {mem.name === 'Premium' && <RocketOutlined className='text-2xl text-purple-500' />}
          </div>
          <Text className='mt-2 block text-sm text-gray-500'>{mem.description}</Text>

          <Tooltip title={mem.name === 'Free' ? 'Bạn đang sử dụng gói này' : 'Nâng cấp gói'}>
            <Button
              type='primary'
              disabled={mem.id === 1}
              block
              size='middle'
              className={`mt-4 font-semibold`}
              onClick={handleLoginRedirect}
            >
              {mem.id === 1 && <CheckOutlined />}
              {mem.name === 'Free' && 'Gói Miễn phí'}
              {mem.name === 'Standard' && 'Tiêu chuẩn'}
              {mem.name === 'Premium' && 'Cao cấp'}
            </Button>
            <div className='flex items-center justify-center'>
              <Text className='mt-2 block text-sm text-gray-500'>
                {mem.id === 1 && '(Bạn đang sử dụng gói này)'}
              </Text>
            </div>
          </Tooltip>

          <ul className='mb-4 mt-8 space-y-2 p-0'>
            <li className='flex items-start'>
              <CheckOutlined className='mr-2 mt-1 flex-shrink-0 text-green-500' />
              <Text className='text-sm'>{mem.name === 'Free' ? 'Tìm kiếm, đăng bài và nhiều tính năng khác' : 'Tất cả tính năng của gói Cơ bản'}</Text>
            </li>
            {mem.name !== 'Free' && (
              <>
                <li className='flex items-start'>
                  <CheckOutlined className='mr-2 mt-1 flex-shrink-0 text-green-500' />
                  <Text className='text-sm'>Tăng hiệu suất, khả năng tiếp cận người dùng</Text>
                </li>
              </>
            )}
            {mem.name === 'Premium' && (
              <li className='flex items-start'>
                <CheckOutlined className='mr-2 mt-1 flex-shrink-0 text-green-500' />
                <Text className='text-sm'>Hỗ trợ khách hàng nâng cao</Text>
              </li>
            )}
            <li className='flex items-start'>
              <CheckOutlined className='mr-2 mt-1 flex-shrink-0 text-green-500' />
              <Text className='text-sm'>
                Ưu tiên bài đăng: <span className='font-bold'>{mem.priority} lượt</span>
              </Text>
            </li>
            <li className='flex items-start'>
              <CheckOutlined className='mr-2 mt-1 flex-shrink-0 text-green-500' />
              <Text className='text-sm'>
                Làm mới bài đăng: <span className='font-bold'>{mem.refresh} lượt</span>
              </Text>
            </li>
          </ul>
        </Card>
      ))}
    </div>
  );
}

export default MembershipCard;
