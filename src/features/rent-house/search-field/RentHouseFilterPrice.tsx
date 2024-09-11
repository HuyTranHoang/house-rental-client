import { Form, Select } from 'antd'
import { DollarIcon } from '@/features/rent-house/RentHouseFilterIcons.tsx'
import { usePropertyFilters } from '@/hooks/useProperty.ts'

const milion = 1000000


function RentHouseFilterPrice() {

  const { setFilters } = usePropertyFilters()

  const handlePriceChange = (value: string) => {
    const [min, max] = value.split(',')
    setFilters({
      minPrice: Number(min || '0') * milion,
      maxPrice: Number(max || '0') * milion
    })
  }

  return (
    <Form.Item name='price'>
      <Select
        size='large'
        onChange={handlePriceChange}
        placeholder={'Giá thuê'}
        suffixIcon={<DollarIcon />}
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
