import { getTransaction } from '@/api/transaction.api.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { useQuery } from '@tanstack/react-query'
import { Divider, Skeleton } from 'antd'
import { useLocation } from 'react-router-dom'

const Item = ({ label, value }: { label: string; value: string }) => (
  <div className='sm:col-span-1'>
    <dt className='text-sm font-medium text-gray-500'>{label}</dt>
    <dd className='mt-1 text-sm text-gray-900'>{value}</dd>
  </div>
)

const PaymentSuccess = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const transactionId = query.get('vnp_TxnRef')

  const { data, isLoading } = useQuery({
    queryKey: ['transaction', transactionId],
    queryFn: () => getTransaction(transactionId!),
    enabled: !!transactionId
  })

  return (
    <>
      {isLoading && (
        <div className='bg-gray-100 px-4 py-12 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md'>
            <Skeleton className='p-4' />
            <Skeleton className='p-4' />
            <Skeleton className='p-4' />
          </div>
        </div>
      )}

      {data && (
        <div className='bg-gray-100 px-4 py-12 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md'>
            <div className='px-4 py-5 sm:p-6'>
              <h1 className='font-poppins bg-gradient-to-r from-sky-500 to-lime-500 bg-clip-text text-center text-3xl font-extrabold leading-9 text-transparent'>
                Thanh toán thành công!
              </h1>
              <div className='mt-5 text-center text-gray-600'>
                Cảm ơn bạn đã thanh toán. Dưới đây là chi tiết giao dịch của bạn.
              </div>
              <Divider />
              <dl className='grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2'>
                <Item label='Mã giao dịch' value={data.transactionId || 'N/A'} />
                <Item label='Số tiền' value={formatCurrency(data.amount)} />
                <Item label='Ngày giao dịch' value={new Date(data!.transactionDate).toLocaleString()} />
                <Item label='Phương thức' value='VNPAY' />
                <div className='sm:col-span-2'>
                  <dt className='text-sm font-medium text-gray-500'>Nội dung giao dịch</dt>
                  <dd className='mt-1 text-sm text-gray-900'>{data.description}</dd>
                </div>
                <div className='sm:col-span-2'>
                  <dt className='text-sm font-medium text-gray-500'>Trạng thái</dt>
                  <dd className='mt-1 text-sm font-semibold text-green-600'>{data.status}</dd>
                </div>
              </dl>
            </div>
            <div className='bg-gray-50 px-4 py-4 text-center text-sm text-gray-500 sm:px-6'>
              Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi.
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PaymentSuccess
