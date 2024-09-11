import { fetchAllCities } from '@/api/city.api.ts'
import { fetchAllDistricts } from '@/api/district.api.ts'
import { GeoIcon } from '@/features/rent-house/RentHouseFilterIcons.tsx'
import { usePropertyFilters } from '@/hooks/useProperty.ts'
import { useQuery } from '@tanstack/react-query'
import { Cascader, CascaderProps, Form } from 'antd'

interface Option {
  value: string
  label: string
  children?: Option[]
}

function RentHouseFilterCityDistrict() {
  const cityDistrictOptions: Option[] = [{ value: '0', label: 'Toàn Quốc' }]
  const { setFilters } = usePropertyFilters()

  const { data: cityData, isLoading: cityIsLoading } = useQuery({ queryKey: ['cities'], queryFn: fetchAllCities })
  const { data: districtData, isLoading: districtIsLoading } = useQuery({
    queryKey: ['districts'],
    queryFn: fetchAllDistricts
  })

  if (cityData && districtData) {
    const cityMap = cityData.map((city) => ({
      value: city.id.toString(),
      label: city.name,
      children: [
        { value: '0', label: 'Tất cả' },
        ...districtData
          .filter((district) => district.cityId === city.id)
          .map((district) => ({
            value: district.id.toString(),
            label: district.name
          }))
      ]
    }))
    cityDistrictOptions.push(...cityMap)
  }

  const onCityDistrictChange: CascaderProps<Option>['onChange'] = (value) => {
    if (value && value.length === 2) {
      const [cityId, districtId] = value.map(Number)
      setFilters({ cityId, districtId })
    } else {
      setFilters({ cityId: 0, districtId: 0 })
    }
  }

  return (
    <Form.Item name='cityDistrict'>
      <Cascader
        options={cityDistrictOptions}
        onChange={onCityDistrictChange}
        size='large'
        allowClear={false}
        loading={cityIsLoading || districtIsLoading}
        placeholder='Chọn quận huyện'
        suffixIcon={<GeoIcon />}
      />
    </Form.Item>
  )
}

export default RentHouseFilterCityDistrict
