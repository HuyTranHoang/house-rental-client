import { Form, Input, Button, Radio, Card, Space, Row, Col, Flex } from 'antd'
import { toast } from 'sonner'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { RocketOutlined } from '@ant-design/icons'

interface DepositForm {
  amount: string;
  customAmount?: number;
}

const Deposit = () => {
  const [form] = Form.useForm()
  const amount = Form.useWatch('amount', form)

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

  return (
    <Row style={{ marginTop: 64 }}>
      <Col offset={9} span={6}>
        <Card title={<Flex>
          <img src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg" alt="deposit" style={{ width: 32, height: 32, marginRight: 8 }} />
          <span>Nạp tiền</span>
        </Flex>
        }>
          <Form<DepositForm> form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item<DepositForm> name="amount" label="Số tiền" required>
              <Radio.Group>
                <Space wrap>
                  <Radio.Button value="50000">{formatCurrency(50000)}</Radio.Button>
                  <Radio.Button value="100000">{formatCurrency(100000)}</Radio.Button>
                  <Radio.Button value="200000">{formatCurrency(200000)}</Radio.Button>
                  <Radio.Button value="500000">{formatCurrency(500000)}</Radio.Button>
                  <Radio.Button value="custom">Tùy chọn</Radio.Button>
                </Space>
              </Radio.Group>
            </Form.Item>

            {
              amount === 'custom' && (
                <Form.Item name="customAmount" label="Số tiền tùy chọn (VND)" required>
                  <Input type="number" placeholder="Nhập số tiền bạn muốn nạp" />
                </Form.Item>
              )
            }

            <Form.Item>
              <Button icon={<RocketOutlined />} type="primary" htmlType="submit">
                Nạp tiền
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Deposit
