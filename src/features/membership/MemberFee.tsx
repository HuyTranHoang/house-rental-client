import ROUTER_NAMES from '@/constant/routerNames.ts'
import { MembershipCard } from '@/features/membership/MembershipCard.tsx'
import { useMemberships } from '@/hooks/useMembership.ts'
import { useCreateTransactionWithDrawal } from '@/hooks/useTransaction'
import { useUpdateUserMembership, useUserMembership } from '@/hooks/useUserMembership'
import useAuthStore from '@/store/authStore.ts'
import { Membership } from '@/types/membership.type.ts'
import { CheckOutlined } from '@ant-design/icons'
import { Card, Col, Modal, Row } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function MemberFee() {
  const navigate = useNavigate()
  const currentUser = useAuthStore((state) => state.user)
  const deincrementUserBalance = useAuthStore((state) => state.deincrementUserBalance)
  const { data: userMembership } = useUserMembership(currentUser?.id)
  const { membershipData, membershipIsLoading } = useMemberships()
  const [confirmModal, setConfirmModal] = useState(false)
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null)
  const { t } = useTranslation()

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
        toast.error(t('toast.insufficientBalance'))
        setConfirmModal(false)
        navigate(ROUTER_NAMES.RECHARGE)
        return
      }

      upgradeMembership({ userId: currentUser.id, membershipId: selectedMembership.id }).then(() => {
        deincrementUserBalance(selectedMembership.price)
        toast.success(t('toast.upgradePackageSuccess'))
        navigate(ROUTER_NAMES.SUCCESS_UPGRADE, {
          state: {
            membership: selectedMembership,
            user: {
              balance: currentUser.balance - selectedMembership.price
            }
          }
        })
      })

      createTransactionWithDrawal({
        amount: selectedMembership.price,
        type: 'withdrawal',
        description: t('membership.purchasePackage')
      })
      setConfirmModal(false)
    }
  }

  return (
    <Row className='relative min-h-screen md:min-h-0'>
      <section className='mx-auto'>
        <div className='mb-16 text-center'>
          <h1 className='font-inter mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl'>
            {t('membership.membershipPackage')}
          </h1>
          <p className='mb-8 p-2 text-xl text-gray-600'>{t('membership.descriptionPackage')}</p>
          <div className='mb-12 flex flex-wrap justify-center gap-6'>
            <div className='space-x-1'>
              <CheckOutlined className='text-green-500' />
              <span>{t('membership.priorityPosting')}</span>
            </div>
            <div className='space-x-1'>
              <CheckOutlined className='text-green-500' />
              <span>{t('membership.exclusiveDiscount')}</span>
            </div>
            <div className='space-x-1'>
              <CheckOutlined className='text-green-500' />
              <span>{t('membership.24/7Support')}</span>
            </div>
          </div>
        </div>

        <Col xs={24} md={24} className='mb-24 flex items-center justify-center px-4 md:mb-0'>
          <Row gutter={32} justify='center' className='mb-10'>
            {membershipIsLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <Col key={index} xs={24} sm={12} md={8} className='my-2 md:my-0'>
                  <Card className='flex h-full w-56 flex-col rounded-xl border-2 shadow-sm' loading></Card>
                </Col>
              ))}
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
        </Col>
      </section>

      <Modal
        title={t('membership.comfirmUpgrade')}
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
        <p>
          {t('membership.comfirmUpgradePackage')} {selectedMembership?.name}?
        </p>
      </Modal>
    </Row>
  )
}
