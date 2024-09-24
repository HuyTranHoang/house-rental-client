import useAuthStore from '@/features/auth/authStore'
import { useMemberships } from '@/hooks/useMembership'
import { useUpdateUserMembership, useUserMembership } from '@/hooks/useUserMembership'
import { Membership } from '@/models/membership.type'
import Container from '@/ui/Container'
import { CheckOutlined, CrownOutlined, RocketOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Card, Modal, Spin, Tooltip, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MembershipCard from './MembershipCard'
const { Text, Title } = Typography

function MemberFee() {
  const navigate = useNavigate()
  const currentUser = useAuthStore((state) => state.user)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: userMembership } = currentUser ? useUserMembership(currentUser.id) : { data: null };
  const { membershipData, membershipIsLoading, membershipIsError } = useMemberships()
  const [confirmModal, setConfirmModal] = useState(false)
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null)

  const { mutate: upgradeMembership } = useUpdateUserMembership()
  const handleUpgrade = (membershipId: number) => {
    upgradeMembership({ userId: currentUser!.id, membershipId })
    setConfirmModal(false)
  }

  const showConfirm = (membership: Membership) => {
    setSelectedMembership(membership)
    setConfirmModal(true)
  }

  const handleOk = () => {
    if (selectedMembership) {
      handleUpgrade(selectedMembership.id)
      navigate('/')
    }
  }

  const handleCancel = () => {
    setConfirmModal(false)
  }

  if (membershipIsLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spin size='large' />
      </div>
    )
  }

  if (membershipIsError) {
    return <Text>Đã xảy ra lỗi khi lấy dữ liệu gói thành viên.</Text>
  }
  return (
    <>
      <Container>
      {currentUser ? (
        <div className='flex flex-wrap justify-center gap-1'>
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

              <Tooltip
                title={
                  membership.id === 1
                    ? ''
                    : membership.id === userMembership?.membershipId
                      ? 'Gia hạn'
                      : 'Chuyển gói'
                }
              >
                <Button
                  type='primary'
                  disabled={membership.id === 1}
                  block
                  size='middle'
                  className={`mt-4 font-semibold`}
                  onClick={() => showConfirm(membership)}
                >
                  {membership.id === userMembership?.membershipId && <CheckOutlined></CheckOutlined>}
                  {membership.name === 'Free' && 'Gói Miễn phí'}
                  {membership.name === 'Standard' && 'Tiêu chuẩn'}
                  {membership.name === 'Premium' && 'Cao cấp'}
                </Button>
                <div className='flex items-center justify-center'>
                  <Text className='mt-2 block text-sm text-gray-500'>
                    {membership.id === 1
                      ? ''
                      : membership.id === userMembership?.membershipId
                        ? '(Bạn đang sử dụng gói này)'
                        : ''}
                  </Text>
                </div>

                
              </Tooltip>

              <ul className='mb-4 space-y-2 p-0 mt-8'>
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
            </Card>
          ))}
        </div>
      ) : <MembershipCard memberships={membershipData}/>}
      </Container>
      <Modal title='Xác nhận nâng cấp' open={confirmModal} onOk={handleOk} onCancel={handleCancel}>
        <p>Bạn có chắc chắn muốn nâng cấp lên gói {selectedMembership?.name} không?</p>
      </Modal>
    </>
  )
}

export default MemberFee
