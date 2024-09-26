import CustomIndicator from '@/components/CustomIndicator.tsx'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import useAuthStore from '@/store/authStore.ts'
import { MembershipCard } from '@/features/membership/MembershipCard.tsx'
import { useMemberships } from '@/hooks/useMembership.ts'
import { useCreateTransactionWithDrawal } from '@/hooks/useTransaction'
import { useUpdateUserMembership, useUserMembership } from '@/hooks/useUserMembership'
import { Membership } from '@/types/membership.type.ts'
import { Col, Modal, Row, Spin, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const { Text } = Typography

export function MemberFee() {
  const navigate = useNavigate()
  const currentUser = useAuthStore((state) => state.user)
  const deincrementUserBalance = useAuthStore((state) => state.deincrementUserBalance)
  const { data: userMembership } = useUserMembership(currentUser?.id)
  const { membershipData, membershipIsLoading, membershipIsError } = useMemberships()
  const [confirmModal, setConfirmModal] = useState(false)
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null)

  const { mutate: upgradeMembership, isPending: upgradeMembershipPending } = useUpdateUserMembership()
  
  const { mutate: createTransactionWithDrawal } = useCreateTransactionWithDrawal()

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
      if (selectedMembership.price > currentUser.balance) {
        toast.error('Số dư không đủ để nâng cấp gói thành viên.')
        setConfirmModal(false)
        navigate(ROUTER_NAMES.TOP_UP)
        return
      }

      upgradeMembership({ userId: currentUser.id, membershipId: selectedMembership.id }).then(() => {
        deincrementUserBalance(selectedMembership.price)
        toast.success('Nâng cấp gói thành viên thành công.')
        navigate(ROUTER_NAMES.RENT_HOUSE)
      })

      createTransactionWithDrawal({
        amount: selectedMembership.price,
        type: 'withdrawal',
        description: 'Mua gói thành viên'
      })
      setConfirmModal(false)
    }
  }

  if (membershipIsLoading) {
    return <Spin indicator={<CustomIndicator />} tip='Đang tải dữ liệu...Vui lòng đợi trong giây lát!!!' fullscreen />
  }

  if (membershipIsError) {
    return <Text>Đã xảy ra lỗi khi lấy dữ liệu gói thành viên.</Text>
  }

  return (
    <>
      <Row gutter={32} justify='center' className='mb-10 mt-12 md:px-24'>
        {membershipData?.map((membership) => (
          <Col key={membership.id} xs={24} sm={12} md={8} className='my-2 md:my-0'>
            <MembershipCard
              membership={membership}
              isCurrentMembership={membership.id === userMembership?.membershipId}
              onUpgrade={showConfirm}
              isLoggedIn={!!currentUser}
            />
          </Col>
        ))}
      </Row>
      <Modal
        title='Xác nhận nâng cấp'
        open={confirmModal}
        onOk={handleOk}
        onCancel={() => setConfirmModal(false)}
        okButtonProps={{
          loading: upgradeMembershipPending
        }}
        cancelButtonProps={{
          disabled: upgradeMembershipPending
        }}
      >
        <p>Bạn có chắc chắn muốn nâng cấp lên gói {selectedMembership?.name} không?</p>
      </Modal>
    </>
  )
}
