import { Form, Select } from 'antd'
import { useAppDispatch } from '../../../store.ts'
import { setRoomTypeId } from '../rentHouseSlice.ts'
import { HomeIcon } from '../RentHouseFilterIcons.tsx'

type FieldType = {
  roomType?: string;
};

interface RoomTypeFieldProps {
  options: { value: string; label: string }[];
}

function RentHouseRoomTypeField({ options }: RoomTypeFieldProps) {
  const dispatch = useAppDispatch()

  const handleRoomTypeChange = (value: string) => {
    dispatch(setRoomTypeId(parseInt(value)))
  }

  return (
    <Form.Item<FieldType> name="roomType">
      <Select
        size="large"
        onChange={handleRoomTypeChange}
        placeholder={'Loại phòng'}
        suffixIcon={<HomeIcon />}
        options={options}
      />
    </Form.Item>
  )
}

export default RentHouseRoomTypeField
