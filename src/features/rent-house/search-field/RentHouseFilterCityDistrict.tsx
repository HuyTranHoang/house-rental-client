import { fetchAllCities } from '@/api/city.api.ts'
import { fetchAllDistricts } from '@/api/district.api.ts'
import { GeoIcon } from '@/features/rent-house/RentHouseFilterIcons.tsx'
import { useQuery } from '@tanstack/react-query'
import { Cascader, Form } from 'antd'

interface Option {
  value: string
  label: string
  children?: Option[]
}

interface RentHouseFilterCityDistrictProps {
  onCityDistrictChange: (value: string[], selectOptions: Option[]) => void
}

function RentHouseFilterCityDistrict({ onCityDistrictChange }: RentHouseFilterCityDistrictProps) {
  const cityDistrictOptions: Option[] = [{ value: '0', label: 'Toàn Quốc' }]

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
