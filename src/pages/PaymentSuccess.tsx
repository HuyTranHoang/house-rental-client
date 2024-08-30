import { useEffect } from 'react';
import { Typography } from 'antd';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const vnp_TransactionNo = query.get('vnp_TransactionNo');

  useEffect(() => {
    if (vnp_TransactionNo) {
      console.log('Mã giao dịch:', vnp_TransactionNo);
    }
  }, [vnp_TransactionNo]);

  return (
    <div className='flex items-center justify-center min-h-60 bg-gray-100'>
      <div className='text-center'>
        <Typography.Title level={2} className='mb-4'>
          Thanh toán thành công!
        </Typography.Title>
        <Typography.Paragraph>
          Cảm ơn bạn đã thanh toán. Hãy kiểm tra email của bạn để biết thêm chi tiết.
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default PaymentSuccess;
