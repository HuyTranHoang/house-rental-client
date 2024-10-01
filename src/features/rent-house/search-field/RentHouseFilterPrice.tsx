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
          { value: '0,3', label: 'Dưới 3 triệu' },
          { value: '3,7', label: '3 đến 7 triệu' },
          { value: '7,10', label: '7 đến 10 triệu' },
          { value: '10,0', label: 'Trên 10 triệu' }
        ]}
      />
    </Form.Item>
  )
}

export default RentHouseFilterPrice
