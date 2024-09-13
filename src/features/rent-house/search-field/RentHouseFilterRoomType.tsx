import { HomeIcon } from '@/features/rent-house/RentHouseFilterIcons.tsx'
import { useRoomTypes } from '@/hooks/useRoomType.ts'
import { Form, Select } from 'antd'

interface Option {
  value: string
  label: string
  children?: Option[]
}

function RentHouseFilterRoomType({ onRoomTypeChange }: { onRoomTypeChange: (value: string) => void }) {
  const roomTypeOptions: Option[] = [{ value: '0', label: 'Tất cả' }]

  const { roomTypeData, roomTypeIsLoading } = useRoomTypes()

  if (roomTypeData) {
    roomTypeOptions.push(
      ...roomTypeData.map((roomType) => ({
        value: roomType.id.toString(),
        label: roomType.name
      }))
    )
  }

  return (
    <Form.Item name='roomType'>
      <Select
        size='large'
        onChange={onRoomTypeChange}
        loading={roomTypeIsLoading}
        placeholder={'Loại phòng'}
        suffixIcon={<HomeIcon />}
        options={roomTypeOptions}
      />
    </Form.Item>
  )
}

export default RentHouseFilterRoomType
