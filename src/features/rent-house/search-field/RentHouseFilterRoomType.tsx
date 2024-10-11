import { useRoomTypes } from '@/hooks/useRoomType.ts'
import { Form, Select } from 'antd'
import { House } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Option {
  value: string
  label: string
  children?: Option[]
}

function RentHouseFilterRoomType({ onRoomTypeChange }: { onRoomTypeChange: (value: string) => void }) {
  const { t } = useTranslation()
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
        placeholder={t('filter.roomTypePlaceholder')}
        suffixIcon={<House size={16} />}
        options={roomTypeOptions}
      />
    </Form.Item>
  )
}

export default RentHouseFilterRoomType
