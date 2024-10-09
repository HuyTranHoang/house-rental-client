import { createTransactionDeposit, getTransaction } from '@/api/transaction.api.ts'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import useAuthStore from '@/store/authStore.ts'
import { TransactionStatus } from '@/types/transaction.type.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { LoadingOutlined, RocketOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Alert, Button, Card, Col, Form, Input, Radio, Row, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

interface DepositForm {
  amount: string
  customAmount?: number
}

const formatNumber = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const useGetTransaction = (transactionId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['transaction', transactionId],
    queryFn: () => getTransaction(transactionId),
    enabled: !!transactionId,
    refetchInterval: 5000
  })

  return { data, isLoading }
}

const Recharge = () => {
  const [form] = Form.useForm()
  const amount = Form.useWatch('amount', form)

  const { t } = useTranslation()

  const queryClient = useQueryClient()
  const [transactionId, setTransactionId] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFail, setIsFail] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [rawCustomAmount, setRawCustomAmount] = useState<number | null>(null)

  const currentUser = useAuthStore((state) => state.user)
  const updateUserBalance = useAuthStore((state) => state.incrementUserBalance)

  const { data: transaction } = useGetTransaction(transactionId)

  const { mutate: createTransactionMutation } = useMutation({
    mutationFn: createTransactionDeposit,
    onSuccess: (response) => {
      if (!response) return

      const { url, transactionId } = response.data
      setTransactionId(transactionId)
      window.open(url, '_blank')
    },
    onError: (error) => {
      console.error('Failed to create transaction', error)
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const rawValue = parseInt(value.replace(/,/g, ''), 10)
    const formattedValue = formatNumber(value.replace(/,/g, ''))
    setInputValue(formattedValue)
    setRawCustomAmount(rawValue)
    form.setFieldsValue({ customAmount: formattedValue })
  }

  useEffect(() => {
    if (transaction) {
      if (transaction.status === TransactionStatus.SUCCESS) {
        setIsSubmitting(false)
        setIsSuccess(true)
        updateUserBalance(transaction.amount)
      } else if (transaction.status === TransactionStatus.FAILED) {
        setIsSubmitting(false)
        setIsFail(true)
      }
    }
  }, [transaction, queryClient, updateUserBalance])

  const onFinish = async (values: DepositForm) => {
    const amountToDeposit = values.amount === 'custom' && rawCustomAmount ? rawCustomAmount : Number(values.amount)

    if (isNaN(amountToDeposit) || amountToDeposit < 50000) {
      toast.error(t('recharge.accountInfo.min'))
      return
    }

    setIsSubmitting(true)

    createTransactionMutation({
      amount: amountToDeposit,
      type: 'deposit',
      description: 'Nạp tiền vào tài khoản'
    })
  }

  const renderDepositInfo = () => {
    const depositAmount = amount === 'custom' && rawCustomAmount ? rawCustomAmount : Number(amount)
    const newBalance = currentUser ? currentUser.balance + depositAmount : 0

    if (amount === 'custom' && !rawCustomAmount) {
      return null
    }

    return (
      <>
        <Typography.Paragraph>
          {t('recharge.selectedAmount')}: <strong className='text-green-500'>{formatCurrency(depositAmount)}</strong>
        </Typography.Paragraph>
        <Typography.Paragraph>
          {t('recharge.afterRecharge')}: <strong className='text-green-500'>{formatCurrency(newBalance)}</strong>
        </Typography.Paragraph>
      </>
    )
  }

  return (
    <Row className='mb-10 mt-16' gutter={[16, 16]}>
      <Col
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 20, offset: 2 }}
        md={{ span: 16, offset: 4 }}
        lg={{ span: 8, offset: 6 }}
      >
        <Card
          title={
            <div className='flex items-center'>
              <img
                src='https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg'
                className='mr-4 w-8'
                alt='deposit'
              />
              <span>{t('recharge.title')}</span>
            </div>
          }
        >
          {!isSubmitting && !isSuccess && !isFail && (
            <Form form={form} layout='vertical' onFinish={onFinish}>
              <Form.Item
                name='amount'
                label={t('recharge.amount')}
                rules={[{ required: true, message: t('recharge.amountSelectRequired') }]}
              >
                <Radio.Group>
                  <Space wrap>
                    <Radio.Button value='50000'>{formatCurrency(50000)}</Radio.Button>
                    <Radio.Button value='100000'>{formatCurrency(100000)}</Radio.Button>
                    <Radio.Button value='200000'>{formatCurrency(200000)}</Radio.Button>
                    <Radio.Button value='500000'>{formatCurrency(500000)}</Radio.Button>
                    <Radio.Button value='custom'>{t('recharge.custom')}</Radio.Button>
                  </Space>
                </Radio.Group>
              </Form.Item>

              {amount === 'custom' && (
                <Form.Item
                  name='customAmount'
                  label={t('recharge.customAmount')}
                  rules={[{ required: true, message: t('recharge.amountRequired') }]}
                >
                  <Input
                    type='text'
                    placeholder={t('recharge.amountPlaceholder')}
                    value={inputValue}
                    onChange={handleInputChange}
                    addonAfter='₫'
                  />
                </Form.Item>
              )}

              <Form.Item>
                <Button
                  htmlType='submit'
                  icon={<RocketOutlined />}
                  className='w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300'
                >
                  {t('recharge.recharge')}
                </Button>
              </Form.Item>
            </Form>
          )}

          {isSubmitting && (
            <Typography.Paragraph type='secondary'>
              <LoadingOutlined className='mr-2' />
              {t('recharge.redirecting')}
            </Typography.Paragraph>
          )}
          {isSuccess && (
            <>
              <Alert message={t('recharge.rechargeSuccess')} type='success' showIcon className='mb-4' />
              <Typography.Paragraph>
                {t('recharge.rechargeAmount')}: <strong>{formatCurrency(transaction!.amount)}</strong>
              </Typography.Paragraph>
              <Typography.Paragraph>
                {t('recharge.rechargeTransaction')}: <strong>{transaction!.transactionId}</strong>
              </Typography.Paragraph>
              <Typography.Paragraph>
                {t('recharge.rechargeDate')}: <strong>{new Date(transaction!.transactionDate).toLocaleString()}</strong>
              </Typography.Paragraph>
              <Space>
                <Typography.Paragraph>
                  <Link to={ROUTER_NAMES.TRANSACTION_HISTORY}>Lịch sử giao dịch</Link>
                </Typography.Paragraph>
                <Typography.Paragraph>
                  <Button type='link' onClick={() => setIsSuccess(false)}>
                    {t('recharge.continue')}
                  </Button>
                </Typography.Paragraph>
              </Space>
            </>
          )}
          {isFail && (
            <>
              <Alert message={t('recharge.rechargeFailed')} type='error' showIcon className='mb-4' />
              <Typography.Paragraph>{t('recharge.transactionFailed')}</Typography.Paragraph>
              <Typography.Paragraph>
                {t('recharge.rechargeTransaction')}: <strong>{transaction!.transactionId}</strong>
              </Typography.Paragraph>
              <Space>
                <Typography.Paragraph>
                  <Link to={ROUTER_NAMES.PROFILE}>{t('recharge.transactionHistory')}</Link>
                </Typography.Paragraph>
                <Typography.Paragraph>
                  <Button type='link' onClick={() => setIsSuccess(false)}>
                    {t('recharge.retry')}
                  </Button>
                </Typography.Paragraph>
              </Space>
            </>
          )}
        </Card>
      </Col>

      {currentUser && (
        <Col
          xs={{ span: 22, offset: 1 }}
          sm={{ span: 20, offset: 2 }}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 4, offset: 0 }}
        >
          <Card className='flex items-center'>
            <Typography.Title level={5} className='mt-0'>
              {t('recharge.accountInfo.accountBalance')}
            </Typography.Title>
            <Typography.Paragraph>
              {t('recharge.accountInfo.present')}: <strong>{formatCurrency(currentUser.balance)}</strong>
            </Typography.Paragraph>

            {amount && renderDepositInfo()}

            <Typography.Title level={5}>{t('recharge.accountInfo.note')}</Typography.Title>
            <Typography.Paragraph>- {t('recharge.accountInfo.min')}</Typography.Paragraph>
          </Card>
        </Col>
      )}
    </Row>
  )
}

export default Recharge
