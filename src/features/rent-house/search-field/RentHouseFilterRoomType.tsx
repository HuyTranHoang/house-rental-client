import { Form, Select } from 'antd'
import { HomeIcon } from '@/features/rent-house/RentHouseFilterIcons.tsx'
import { useQuery } from '@tanstack/react-query'
import { fetchAllRoomTypes } from '@/api/roomType.api.ts'
import { usePropertyFilters } from '@/hooks/useProperty.ts'

interface Option {
  value: string
  label: string
  children?: Option[]
}

function RentHouseFilterRoomType() {

  const roomTypeOptions: Option[] = [{ value: '0', label: 'Tất cả' }]
  const { setFilters } = usePropertyFilters()

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
        onChange={(value) => {
          setFilters({ roomTypeId: Number(value) })
        }}
        loading={roomTypeIsLoading}
        placeholder={'Loại phòng'}
        suffixIcon={<HomeIcon />}
        options={roomTypeOptions}
      />
    </Form.Item>
  )
}

export default RentHouseFilterRoomType
