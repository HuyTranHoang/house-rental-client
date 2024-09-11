import { fetchAllRoomTypes } from '@/api/roomType.api.ts'
import { HomeIcon } from '@/features/rent-house/RentHouseFilterIcons.tsx'
import { useQuery } from '@tanstack/react-query'
import { Form, Select } from 'antd'

interface Option {
  value: string
  label: string
  children?: Option[]
}

function RentHouseFilterRoomType({ onRoomTypeChange }: { onRoomTypeChange: (value: string) => void }) {
  const roomTypeOptions: Option[] = [{ value: '0', label: 'Tất cả' }]

  const { data: roomTypeData, isLoading: roomTypeIsLoading } = useQuery({
    queryKey: ['roomTypes'],
    queryFn: fetchAllRoomTypes
  })

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
