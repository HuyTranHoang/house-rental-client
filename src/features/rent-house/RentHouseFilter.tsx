import { Row, Col, Form } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { fetchAllCities } from '@/api/city.api.ts'
import { fetchAllDistricts } from '@/api/district.api.ts'
import { fetchAllRoomTypes } from '@/api/roomType.api.ts'
import { useState } from 'react'
import RentHouseSearchField from './search-field/RentHouseSearchField.tsx'
import RentHouseCityDistrictField from './search-field/RentHouseCityDistrictField.tsx'
import RentHouseRoomTypeField from './search-field/RentHouseRoomTypeField.tsx'
import RentHousePriceField from './search-field/RentHousePriceField.tsx'
import RentHouseExtraFilterModal from './search-field/RentHouseExtraFilterModal.tsx'
import { usePropertyFilters } from '@/hooks/useProperty.ts'

interface Option {
  value: string
  label: string
  children?: Option[]
}

function RentHouseFilter() {
  const [form] = Form.useForm()
  const { search, cityId, districtId, roomTypeId } = usePropertyFilters()
  const { data: cityData, isLoading: cityIsLoading } = useQuery({ queryKey: ['cities'], queryFn: fetchAllCities })
  const { data: districtData, isLoading: districtIsLoading } = useQuery({
    queryKey: ['districts'],
    queryFn: fetchAllDistricts
  })
  const { data: roomTypeData, isLoading: roomTypeIsLoading } = useQuery({
    queryKey: ['roomTypes'],
    queryFn: fetchAllRoomTypes
  })

  const [count, setCount] = useState<number>(0)

  const cityDistrictOptions: Option[] = [{ value: '0', label: 'Toàn Quốc' }]
  const roomTypeOptions: Option[] = [{ value: '0', label: 'Tất cả' }]

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

  if (roomTypeData) {
    roomTypeOptions.push(
      ...roomTypeData.map((roomType) => ({
        value: roomType.id.toString(),
        label: roomType.name
      }))
    )
  }

  // Dùng useEffect để cập nhật giá trị của form khi có thay đổi từ các biến roomTypeId, cityId, districtId ở bên ngoài
  // useEffect(() => {
  //   if (roomTypeId) {
  //     form.setFieldsValue({ roomType: roomTypeId.toString() })
  //   } else {
  //     if (form.getFieldValue('roomType')) form.setFieldsValue({ roomType: '0' })
  //     else form.setFieldsValue({ roomType: undefined })
  //   }
  // }, [form, roomTypeId])

  // useEffect(() => {
  //   if (cityId && districtId) {
  //     form.setFieldsValue({ district: [cityId.toString(), districtId.toString()] })
  //   } else if (cityId) {
  //     form.setFieldsValue({ district: [cityId.toString(), '0'] })
  //   } else {
  //     form.setFieldsValue({ district: undefined })
  //   }
  // }, [form, cityId, districtId])

  return (
    <>
      <Form
        form={form}
        name='search'
        autoComplete='off'
        initialValues={{
          search: search,
          cityDistrict:
            cityId && districtId ? [cityId.toString(), districtId.toString()] : cityId ? [cityId.toString(), '0'] : [],
          roomType: roomTypeId ? roomTypeId.toString() : undefined
        }}
        style={{ marginTop: '1rem' }}
      >
        <Row gutter={12}>
          <Col span={7}>
            <RentHouseSearchField />
          </Col>
          <Col span={5}>
            <RentHouseCityDistrictField options={cityDistrictOptions} loading={cityIsLoading || districtIsLoading} />
          </Col>
          <Col span={5}>
            <RentHouseRoomTypeField options={roomTypeOptions} />
          </Col>
          <Col span={5}>
            <RentHousePriceField loading={roomTypeIsLoading} />
          </Col>
          <Col span={2}>
            <Form.Item>
              <RentHouseExtraFilterModal count={count} setCount={setCount} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default RentHouseFilter
