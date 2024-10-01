import { useCities } from '@/hooks/useCity.ts'
import { useDistricts } from '@/hooks/useDistrict.ts'
import { Cascader, Form } from 'antd'
import { MapPin } from 'lucide-react'

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

  const { cityData, cityIsLoading } = useCities()
  const { districtData, districtIsLoading } = useDistricts()

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
        suffixIcon={<MapPin size={16} />}
      />
    </Form.Item>
  )
}

export default RentHouseFilterCityDistrict
