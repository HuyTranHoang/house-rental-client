import  { useState } from 'react';
import { Form, Input, Button, Radio, Card, Space } from 'antd';
import { toast } from 'sonner';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value !== 'custom') {
      setCustomAmount('');
    }
    setAmount(value);
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    if (!amount) {
      toast.error('Vui lòng chọn hoặc nhập số tiền.')
      return;
    }
    // Gửi request đến backend để xử lý giao dịch nạp tiền.
  };

  return (
    <Card title="Nạp tiền" style={{ width: 500, margin: 'auto' }}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Số tiền" required>
          <Radio.Group onChange={handleAmountChange} value={amount}>
            <Space direction="horizontal">
              <Radio.Button value="50000" style={{ width: 90}}>50.000đ</Radio.Button>
              <Radio.Button value="100000" style={{ width: 90}}>100.000đ</Radio.Button>
              <Radio.Button value="200000" style={{ width: 90}}>200.000đ</Radio.Button>
              <Radio.Button value="500000" style={{ width: 90}}>500.000đ</Radio.Button>
              <Radio.Button value="custom">Khác</Radio.Button>
            </Space>
          </Radio.Group>
          {amount === 'custom' && (
            <Input
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="Nhập số tiền bạn muốn nạp"
              style={{ marginTop: 16 }}
            />
          )}
        </Form.Item>

        <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
          <Button type="primary" htmlType="submit" style={{padding: 20}}>
            Nạp tiền
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Deposit;
