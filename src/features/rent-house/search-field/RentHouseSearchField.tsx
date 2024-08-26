import { Form, Input } from 'antd'
import { usePropertyFilters } from '@/hooks/useProperty.ts'

function RentHouseSearchField() {
  const { setFilters } = usePropertyFilters()

  return (
    <Form.Item name='search'>
      <Input.Search
        size='large'
        allowClear={true}
        placeholder='Từ khóa, đường, quận hoặc địa danh'
        onSearch={(value) => setFilters({ search: value })}
      />
    </Form.Item>
  )
}

export default RentHouseSearchField
