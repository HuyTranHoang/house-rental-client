import { useEffect } from 'react';
import { Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom'

const PaymentFailure = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const vnp_ResponseCode = query.get('vnp_ResponseCode');
  const vnp_OrderInfo = query.get('vnp_OrderInfo');

  useEffect(() => {
    if (vnp_ResponseCode) {
      console.log('Mã phản hồi:', vnp_ResponseCode);
    }
    if (vnp_OrderInfo) {
      console.log('Thông tin đơn hàng:', vnp_OrderInfo);
    }
  }, [vnp_ResponseCode, vnp_OrderInfo]);

  return (
    <div className='flex items-center justify-center min-h-60'>
      <div className='text-center'>
        <Typography.Title level={2} className='mb-4 text-red-600'>
          Thanh toán thất bại
        </Typography.Title>
        <Typography.Paragraph>
          Rất tiếc, thanh toán của bạn không thành công. Vui lòng thử lại hoặc liên hệ với hỗ trợ khách hàng nếu vấn đề vẫn tiếp tục.
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Link to='/' className='text-blue-500 hover:underline'>
            Trở về trang chủ
          </Link>
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default PaymentFailure;
