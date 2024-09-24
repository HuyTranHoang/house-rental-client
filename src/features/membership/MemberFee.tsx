import ROUTER_NAMES from '@/constant/routerNames.ts'
import useAuthStore from '@/features/auth/authStore.ts'
import { MembershipCard } from '@/features/membership/MembershipCard.tsx'
import { useMemberships } from '@/hooks/useMembership.ts'
import { useUpdateUserMembership, useUserMembership } from '@/hooks/useUserMembership'
import { Membership } from '@/models/membership.type.ts'
import { Col, Modal, Row, Spin, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const { Text } = Typography

export function MemberFee() {
  const navigate = useNavigate()
  const currentUser = useAuthStore((state) => state.user)
  const { data: userMembership } = useUserMembership(currentUser?.id)
  const { membershipData, membershipIsLoading, membershipIsError } = useMemberships()
  const [confirmModal, setConfirmModal] = useState(false)
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null)

  const { mutate: upgradeMembership } = useUpdateUserMembership()

  const showConfirm = (membership: Membership) => {
    if (!currentUser) {
      const redirectUrl = window.location.href
      localStorage.setItem('redirectMembership', redirectUrl)
      navigate(ROUTER_NAMES.LOGIN)
      return
    }
    setSelectedMembership(membership)
    setConfirmModal(true)
  }

  const handleOk = () => {
    if (selectedMembership && currentUser) {
      upgradeMembership({ userId: currentUser.id, membershipId: selectedMembership.id })
      setConfirmModal(false)
    }
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
      <Row gutter={32} justify="center" className='px-24 mt-12 mb-10'>
        {membershipData?.map((membership) => (
          <Col key={membership.id} xs={24} sm={12} md={8}>
            <MembershipCard
              membership={membership}
              isCurrentMembership={membership.id === userMembership?.membershipId}
              onUpgrade={showConfirm}
              isLoggedIn={!!currentUser}
            />
          </Col>
        ))}
      </Row>
      <Modal title='Xác nhận nâng cấp' open={confirmModal} onOk={handleOk} onCancel={() => setConfirmModal(false)}>
        <p>Bạn có chắc chắn muốn nâng cấp lên gói {selectedMembership?.name} không?</p>
      </Modal>
    </>
  )
}