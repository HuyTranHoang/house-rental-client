import { selectAuth } from '@/features/auth/authSlice.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { RocketOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, Form, Input, Radio, Row, Space, Typography } from 'antd'
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

  const { user } = useSelector(selectAuth)

  const handleSubmit = (values: DepositForm) => {
    if (values.amount === 'custom' && !values.customAmount) {
      toast.error('Vui lòng nhập số tiền bạn muốn nạp.')
      return
    }

    if (values.amount === 'custom' && values.customAmount && values.customAmount < 50000) {
      toast.error('Số tiền nạp tối thiểu là 50.000đ.')
      return
    }

    if (values.amount === 'custom' && values.customAmount && values.customAmount > 1000000) {
      toast.error('Số tiền nạp tối đa là 1.000.000đ.')
      return
    }

    if (values.amount === 'custom' && values.customAmount) {
      values.amount = values.customAmount.toString()
    }

    toast.info(`Nạp ${formatCurrency(Number(values.amount))} thành công. --- Chỉ có toast chưa có call api`)
  }

  const renderDepositInfo = (amount: string, customAmount?: number) => {
    if (amount === 'custom' && customAmount) {
      return (
        <>
          <Typography.Paragraph>
            Số tiền bạn muốn nạp: <strong className='text-green-500'>{formatCurrency(customAmount)}</strong>
          </Typography.Paragraph>
          <Typography.Paragraph>
            Sau khi nạp:{' '}
            <strong className='text-green-500'>{formatCurrency(user!.balance + Number(customAmount))}</strong>
          </Typography.Paragraph>
        </>
      )
    }

    if (amount && amount !== 'custom') {
      return (
        <>
          <Typography.Paragraph>
            Số tiền đã chọn: <strong className='text-green-500'>{formatCurrency(Number(amount))}</strong>
          </Typography.Paragraph>
          <Typography.Paragraph>
            Sau khi nạp: <strong className='text-green-500'>{formatCurrency(user!.balance + Number(amount))}</strong>
          </Typography.Paragraph>
        </>
      )
    }

    return null
  }

  return (
    <Row className='mt-16' gutter={8}>
      <Col offset={8} span={6}>
        <Card
          title={
            <Flex>
              <img
                src='https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg'
                className='mr-4 w-8'
                alt='deposit'
              />
              <span>Nạp tiền</span>
            </Flex>
          }
        >
          <Form<DepositForm> form={form} layout='vertical' onFinish={handleSubmit}>
            <Form.Item<DepositForm> name='amount' label='Số tiền' required>
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
              <Form.Item name='customAmount' label='Số tiền tùy chọn (VND)' required>
                <Input type='number' placeholder='Nhập số tiền bạn muốn nạp' />
              </Form.Item>
            )}

            <Form.Item>
              <Button icon={<RocketOutlined />} type='primary' htmlType='submit'>
                Nạp tiền
              </Button>
            </Form.Item>
          </Form>
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

            {renderDepositInfo(amount, customAmount)}

            <Typography.Title level={5}>Lưu ý</Typography.Title>
            <Typography.Paragraph>- Số tiền nạp tối thiểu là 50.000đ.</Typography.Paragraph>
          </Card>
        </Col>
      )}
    </Row>
  )
}

export default Deposit
