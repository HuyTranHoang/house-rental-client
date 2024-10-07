import { Form, Select } from 'antd'
import { DollarSign } from 'lucide-react'

function RentHouseFilterPrice({ onPriceChange }: { onPriceChange: (value: string) => void }) {
  return (
    <Form.Item name='price'>
      <Select
        size='large'
        onChange={onPriceChange}
        placeholder={'Giá thuê'}
        suffixIcon={<DollarSign size={16} />}
        options={[
          { value: '0,0', label: 'Tất cả' },
          { value: '0,3000000', label: 'Dưới 3 triệu' },
          { value: '3000000,7000000', label: '3 đến 7 triệu' },
          { value: '7000000,10000000', label: '7 đến 10 triệu' },
          { value: '10000000,0', label: 'Trên 10 triệu' }
        ]}
      />
    </Form.Item>
  )
}

export default RentHouseFilterPrice
