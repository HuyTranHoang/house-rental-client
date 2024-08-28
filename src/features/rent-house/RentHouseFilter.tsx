import { fetchAllCities } from '@/api/city.api.ts'
import { fetchAllDistricts } from '@/api/district.api.ts'
import { fetchAllRoomTypes } from '@/api/roomType.api.ts'
import { DollarIcon, GeoIcon, HomeIcon } from '@/features/rent-house/RentHouseFilterIcons.tsx'
import { usePropertyFilters } from '@/hooks/useProperty.ts'
import { useQuery } from '@tanstack/react-query'
import { Cascader, CascaderProps, Col, Form, Input, Row, Select } from 'antd'
import { useEffect, useState } from 'react'
import RentHouseExtraFilterModal from './search-field/RentHouseExtraFilterModal.tsx'

interface Option {
  value: string
  label: string
  children?: Option[]
}

function RentHouseFilter() {
  const [form] = Form.useForm()
  const { search, cityId, districtId, roomTypeId, minPrice, maxPrice, setFilters } = usePropertyFilters()
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

  const onCityDistrictChange: CascaderProps<Option>['onChange'] = (value) => {
    if (value && value.length === 2) {
      const [cityId, districtId] = value.map(Number)
      setFilters({ cityId, districtId })
    } else {
      setFilters({ cityId: 0, districtId: 0 })
    }
  }

  const handlePriceChange = (value: string) => {
    const [min, max] = value.split(',')

    const milion = 1000000

    if (min === '0' && max === '0') {
      setFilters({ minPrice: 0, maxPrice: 0 })
    } else if (min === '0') {
      setFilters({ minPrice: 0, maxPrice: Number(max) * milion })
    } else if (max === '0') {
      setFilters({ minPrice: Number(min) * milion, maxPrice: 0 })
    } else {
      setFilters({ minPrice: Number(min) * milion, maxPrice: Number(max) * milion })
    }
  }

  // Dùng useEffect để cập nhật giá trị của form khi có thay đổi từ các biến roomTypeId, cityId, districtId ở bên ngoài
  useEffect(() => {
    if (search) {
      form.setFieldsValue({ search })
    } else {
      form.setFieldsValue({ search: undefined })
    }
  }, [form, search])

  useEffect(() => {
    if (roomTypeId) {
      form.setFieldsValue({ roomType: roomTypeId.toString() })
    } else {
      form.setFieldsValue({ roomType: undefined })
    }
  }, [form, roomTypeId])

  useEffect(() => {
    if (cityId && districtId) {
      form.setFieldsValue({ cityDistrict: [cityId.toString(), districtId.toString()] })
    } else if (cityId) {
      form.setFieldsValue({ cityDistrict: [cityId.toString(), '0'] })
    } else {
      form.setFieldsValue({ cityDistrict: [] })
    }
  }, [form, cityId, districtId])

  useEffect(() => {
    if (minPrice || maxPrice) {
      const milion = 1000000
      form.setFieldsValue({ price: `${minPrice / milion},${maxPrice / milion}` })
    } else {
      form.setFieldsValue({ price: undefined })
    }
  }, [form, maxPrice, minPrice])

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
          roomType: roomTypeId ? roomTypeId.toString() : undefined,
          price: minPrice || maxPrice ? `${minPrice},${maxPrice}` : '0,0'
        }}
        className='mt-4'
      >
        <Row gutter={12}>
          <Col span={7}>
            <Form.Item name='search'>
              <Input.Search
                size='large'
                allowClear={true}
                placeholder='Từ khóa, đường, quận hoặc địa danh'
                onSearch={(value) => setFilters({ search: value })}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
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
          </Col>
          <Col span={5}>
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
          </Col>
          <Col span={5}>
            <Form.Item name='price'>
              <Select
                size='large'
                onChange={handlePriceChange}
                placeholder={'Giá thuê'}
                suffixIcon={<DollarIcon />}
                options={[
                  { value: '0,0', label: 'Tất cả' },
                  { value: '0,3', label: 'Dưới 3 triệu' },
                  { value: '3,7', label: '3 đến 7 triệu' },
                  { value: '7,10', label: '7 đến 10 triệu' },
                  { value: '10,0', label: 'Trên 10 triệu' }
                ]}
              />
            </Form.Item>
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
