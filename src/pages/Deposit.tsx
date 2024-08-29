import { Button, Card, Col, Row, Typography, Form, Input, Radio, Space } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/features/auth/authSlice.ts';
import { formatCurrency } from '@/utils/formatCurrentcy.ts';
import { toast } from 'sonner';
import axiosInstance from '@/inteceptor/axiosInstance';

interface DepositForm {
  amount: string;
  customAmount?: number;
}

const Deposit = () => {
  const { control, handleSubmit, watch } = useForm<DepositForm>();
  const amount = watch('amount');
  const customAmount = watch('customAmount');

  const { user } = useSelector(selectAuth);

  const onSubmit = async (data: DepositForm) => {
    try {
      const amountToDeposit = data.amount === 'custom' && data.customAmount ? data.customAmount : Number(data.amount);
  
      if (isNaN(amountToDeposit) || amountToDeposit <= 0) {
        toast.error('Số tiền không hợp lệ');
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
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi khi gửi yêu cầu.';
  
        switch (status) {
          case 400:
            toast.error(`Lỗi yêu cầu: ${errorMessage}`);
            break;
          case 401:
            toast.error(`Lỗi xác thực: ${errorMessage}`);
            break;
          case 403:
            toast.error(`Quyền truy cập bị từ chối: ${errorMessage}`);
            break;
          case 404:
            toast.error(`Không tìm thấy: ${errorMessage}`);
            break;
          case 500:
            toast.error(`Lỗi máy chủ: ${errorMessage}`);
            break;
          default:
            toast.error(`Lỗi không xác định: ${errorMessage}`);
        }
      } else {
        toast.error(`Lỗi không xác định: ${error.message}`);
      }
    }
  };

  const renderDepositInfo = (amount: string, customAmount?: number) => {
    const depositAmount = amount === 'custom' && customAmount ? customAmount : Number(amount);
    const newBalance = user ? user.balance + depositAmount : 0;

    return (
      <>
        {amount === 'custom' && customAmount ? (
          <>
            <Typography.Paragraph>
              Số tiền bạn muốn nạp: <strong className='text-green-500'>{formatCurrency(customAmount)}</strong>
            </Typography.Paragraph>
            <Typography.Paragraph>
              Sau khi nạp: <strong className='text-green-500'>{formatCurrency(newBalance)}</strong>
            </Typography.Paragraph>
          </>
        ) : amount && amount !== 'custom' ? (
          <>
            <Typography.Paragraph>
              Số tiền đã chọn: <strong className='text-green-500'>{formatCurrency(Number(amount))}</strong>
            </Typography.Paragraph>
            <Typography.Paragraph>
              Sau khi nạp: <strong className='text-green-500'>{formatCurrency(newBalance)}</strong>
            </Typography.Paragraph>
          </>
        ) : null}
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
          <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
            <Form.Item name='amount' label='Số tiền' required>
              <Controller
                name='amount'
                control={control}
                render={({ field }) => (
                  <Radio.Group {...field}>
                    <Space wrap>
                      <Radio.Button value='50000'>{formatCurrency(50000)}</Radio.Button>
                      <Radio.Button value='100000'>{formatCurrency(100000)}</Radio.Button>
                      <Radio.Button value='200000'>{formatCurrency(200000)}</Radio.Button>
                      <Radio.Button value='500000'>{formatCurrency(500000)}</Radio.Button>
                      <Radio.Button value='custom'>Tùy chọn</Radio.Button>
                    </Space>
                  </Radio.Group>
                )}
              />
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
  );
};

export default Deposit;
