import { Form, Select } from 'antd'
import { useAppDispatch } from '../../../store.ts'
import { setMinPrice, setMaxPrice } from '../rentHouseSlice.ts'
import { DollarIcon } from '../RentHouseFilterIcons.tsx'

type FieldType = {
  price?: string;
};

interface PriceFieldProps {
  loading: boolean;
}

function RentHousePriceField({ loading }: PriceFieldProps) {
  const dispatch = useAppDispatch()

  const handlePriceChange = (value: string) => {
    const [min, max] = value.split(',')
    dispatch(setMinPrice(parseInt(min) * 1000000))
    dispatch(setMaxPrice(parseInt(max) * 1000000))
  }

  return (
    <Form.Item<FieldType> name="price">
      <Select
        size="large"
        onChange={handlePriceChange}
        placeholder={'Giá thuê'}
        suffixIcon={<DollarIcon />}
        loading={loading}
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

export default RentHousePriceField
