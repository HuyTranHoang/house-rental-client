import { Button, Card, Col, Row, Typography, Form, Input, Radio, Space } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import axiosInstance from '@/inteceptor/axiosInstance';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/features/auth/authSlice';
import { formatCurrency } from '@/utils/formatCurrentcy';
import { toast } from 'sonner';
import { useState } from 'react';

interface DepositForm {
  amount: string;
  customAmount?: number;
}

const Deposit = () => {
  const [form] = Form.useForm();
  const [selectedAmount, setSelectedAmount] = useState<string | undefined>();
  const { user } = useSelector(selectAuth);

  const onFinish = async (values: DepositForm) => {
    try {
      const amountToDeposit = values.amount === 'custom' && values.customAmount !== undefined ? values.customAmount : Number(values.amount);
  
      if (isNaN(amountToDeposit) || amountToDeposit <= 0) {
        toast.error('Số tiền không hợp lệ');
        return;
      }
  
      const response = await axiosInstance.post('/api/vnpay/create-payment', {
        amount: amountToDeposit
      });
  
      const { status, message, url } = response.data;
  
      if (status === 'Ok') {
        window.location.href = url;
      } else {
        throw new Error(message || 'Lỗi khi tạo yêu cầu thanh toán.');
      }
    } catch (error) {
      toast.error(`Đã xảy ra lỗi`);
    }
  };

  const renderDepositInfo = (amount: string, customAmount?: number) => {
    const depositAmount = amount === 'custom' && customAmount ? customAmount : Number(amount);
    const newBalance = user ? user.balance + depositAmount : 0;

    return (
      <>
        <Typography.Paragraph>
          Số tiền đã chọn: <strong className='text-green-500'>{formatCurrency(depositAmount)}</strong>
        </Typography.Paragraph>
        <Typography.Paragraph>
          Sau khi nạp: <strong className='text-green-500'>{formatCurrency(newBalance)}</strong>
        </Typography.Paragraph>
      </>
    );
  };

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
          <Form form={form} layout='vertical' onFinish={onFinish}>
            <Form.Item name='amount' label='Số tiền' required>
              <Radio.Group onChange={(e) => setSelectedAmount(e.target.value)}>
                <Space wrap>
                  <Radio.Button value='50000'>{formatCurrency(50000)}</Radio.Button>
                  <Radio.Button value='100000'>{formatCurrency(100000)}</Radio.Button>
                  <Radio.Button value='200000'>{formatCurrency(200000)}</Radio.Button>
                  <Radio.Button value='500000'>{formatCurrency(500000)}</Radio.Button>
                  <Radio.Button value='custom'>Tùy chọn</Radio.Button>
                </Space>
              </Radio.Group>
            </Form.Item>

            {selectedAmount === 'custom' && (
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

            {selectedAmount && renderDepositInfo(selectedAmount, form.getFieldValue('customAmount'))}

            <Typography.Title level={5}>Lưu ý</Typography.Title>
            <Typography.Paragraph>- Số tiền nạp tối thiểu là 50.000đ.</Typography.Paragraph>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default Deposit;
