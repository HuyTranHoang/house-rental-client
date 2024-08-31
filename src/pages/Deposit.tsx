import { createTransaction, getTransaction } from '@/api/transaction.api.ts'
import { selectAuth } from '@/features/auth/authSlice'
import { formatCurrency } from '@/utils/formatCurrentcy'
import { CheckOutlined, CloseOutlined, LoadingOutlined, RocketOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Radio, Row, Space, Typography } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

interface DepositForm {
  amount: string
  customAmount?: number
}

const Deposit = () => {
  const [form] = Form.useForm()
  const amount = Form.useWatch('amount', form)
  const customAmount = Form.useWatch('customAmount', form)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFail, setIsFail] = useState(false)

  const { user } = useSelector(selectAuth)

  const onFinish = async (values: DepositForm) => {
    const amountToDeposit =
      values.amount === 'custom' && values.customAmount ? values.customAmount : Number(values.amount)

    if (isNaN(amountToDeposit) || amountToDeposit < 50000) {
      toast.error('Số tiền nạp tối thiểu là 50.000đ.')
      return
    }

    const response = await createTransaction({
      amount: amountToDeposit,
      type: 'deposit',
      description: 'Nạp tiền vào tài khoản'
    })

    if (response) {
      const { url, transactionId } = response
      setIsSubmitting(true)
      window.open(url, '_blank')

      const interval = setInterval(async () => {
        const transaction = await getTransaction(transactionId)
        if (transaction && transaction.status === 'SUCCESS') {
          clearInterval(interval)
          setIsSubmitting(false)
          setIsSuccess(true)
        }

        if (transaction && transaction.status === 'FAILED') {
          clearInterval(interval)
          setIsSubmitting(false)
          setIsFail(true)
        }
      }, 5000)
    }
  }

  const renderDepositInfo = () => {
    const depositAmount = amount === 'custom' && customAmount ? customAmount : amount
    const newBalance = user ? user.balance + Number(depositAmount) : 0

    if (amount === 'custom' && customAmount === undefined) {
      return null
    }

    return (
      <>
        <Typography.Paragraph>
          Số tiền đã chọn: <strong className='text-green-500'>{formatCurrency(Number(depositAmount))}</strong>
        </Typography.Paragraph>
        <Typography.Paragraph>
          Sau khi nạp: <strong className='text-green-500'>{formatCurrency(newBalance)}</strong>
        </Typography.Paragraph>
      </>
    )
  }

  return (
    <Row className='mt-16' gutter={8}>
      <Col offset={8} span={6}>
        <Card
          title={
            <div className='flex items-center'>
              <img
                src='https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg'
                className='mr-4 w-8'
                alt='deposit'
              />
              <span>Nạp tiền</span>
            </div>
          }
        >
          <Form form={form} layout='vertical' onFinish={onFinish} disabled={isSubmitting}>
            <Form.Item name='amount' label='Số tiền'>
              <Radio.Group>
                <Space wrap>
                  <Radio.Button value='50000'>{formatCurrency(50000)}</Radio.Button>
                  <Radio.Button value='100000'>{formatCurrency(100000)}</Radio.Button>
                  <Radio.Button value='200000'>{formatCurrency(200000)}</Radio.Button>
                  <Radio.Button value='500000'>{formatCurrency(500000)}</Radio.Button>
                  <Radio.Button value='custom'>Tùy chọn</Radio.Button>
                </Space>
              </Radio.Group>
            </Form.Item>

            {amount === 'custom' && (
              <Form.Item name='customAmount' label='Số tiền tùy chọn (VND)'>
                <Input type='number' placeholder='Nhập số tiền bạn muốn nạp' />
              </Form.Item>
            )}

            <Form.Item>
              <Button icon={<RocketOutlined />} type='primary' htmlType='submit'>
                Nạp tiền
              </Button>
            </Form.Item>
          </Form>

          {isSubmitting && (
            <Typography.Paragraph type='secondary'>
              <LoadingOutlined className='mr-2' />
              Đang chuyển hướng đến cổng thanh toán...
            </Typography.Paragraph>
          )}
          {isSuccess && (
            <Typography.Paragraph type='success'>
              <CheckOutlined className='mr-2' />
              Nạp tiền thành công!
            </Typography.Paragraph>
          )}
          {isFail && (
            <Typography.Paragraph type='danger'>
              <CloseOutlined className='mr-2' />
              Nạp tiền thất bại!
            </Typography.Paragraph>
          )}
        </Card>
      </Col>
      {user && (
        <Col span={3}>
          <Card>
            <Typography.Title level={5} className='mt-0'>
              Số dư
            </Typography.Title>
            <Typography.Paragraph>
              Hiện tại: <strong>{formatCurrency(user.balance)}</strong>
            </Typography.Paragraph>

            {amount && renderDepositInfo()}

            <Typography.Title level={5}>Lưu ý</Typography.Title>
            <Typography.Paragraph>- Số tiền nạp tối thiểu là 50.000đ.</Typography.Paragraph>
          </Card>
        </Col>
      )}
    </Row>
  )
}

export default Deposit
