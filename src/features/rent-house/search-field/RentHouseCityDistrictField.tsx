import { Form, Cascader, CascaderProps } from 'antd'
import { GeoIcon } from '../RentHouseFilterIcons.tsx'
import { usePropertyFilters } from '@/hooks/useProperty.ts'

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

interface DistrictFieldProps {
  options: Option[];
  loading: boolean;
}


function RentHouseCityDistrictField({ options, loading }: DistrictFieldProps) {
  const {setFilters} = usePropertyFilters()

  const onCityDistrictChange: CascaderProps<Option>['onChange'] = (value) => {
    if (value && value.length === 2) {
      const [cityId, districtId] = value.map(Number)
      setFilters({ cityId, districtId })
    } else {
      setFilters({ cityId: 0, districtId: 0 })
    }
  }

  return (
    <Form.Item name="cityDistrict">
      <Cascader
        options={options}
        onChange={onCityDistrictChange}
        size="large"
        allowClear={false}
        loading={loading}
        placeholder="Chọn quận huyện"
        suffixIcon={<GeoIcon />}
      />
    </Form.Item>
  )
}

export default RentHouseCityDistrictField
