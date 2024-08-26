import { Form, Select } from 'antd'
import { HomeIcon } from '../RentHouseFilterIcons.tsx'
import { usePropertyFilters } from '@/hooks/useProperty.ts'

interface RoomTypeFieldProps {
  options: { value: string; label: string }[];
}

function RentHouseRoomTypeField({ options }: RoomTypeFieldProps) {
  const {setFilters} = usePropertyFilters()

  return (
    <Form.Item name="roomType">
      <Select
        size="large"
        onChange={(value) => {setFilters({ roomTypeId: Number(value) })}}
        placeholder={'Loại phòng'}
        suffixIcon={<HomeIcon />}
        options={options}
      />
    </Form.Item>
  )
}

export default RentHouseRoomTypeField
