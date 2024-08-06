import { Form, Input } from 'antd'
import { useAppDispatch } from '../../../store.ts'
import { setSearch } from '../rentHouseSlice.ts'

type FieldType = {
  search?: string;
};

function RentHouseSearchField() {
  const dispatch = useAppDispatch()

  const handleSearch = (value: string) => {
    dispatch(setSearch(value))
  }

  return (
    <Form.Item<FieldType> name="search">
      <Input.Search
        size="large"
        allowClear={true}
        placeholder="Từ khóa, đường, quận hoặc địa danh"
        onSearch={handleSearch}
      />
    </Form.Item>
  )
}

export default RentHouseSearchField
