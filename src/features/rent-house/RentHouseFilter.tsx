import RentHouseFilterCityDistrict from '@/features/rent-house/search-field/RentHouseFilterCityDistrict.tsx'
import RentHouseFilterPrice from '@/features/rent-house/search-field/RentHouseFilterPrice.tsx'
import RentHouseFilterRoomType from '@/features/rent-house/search-field/RentHouseFilterRoomType.tsx'
import { usePropertyFilters } from '@/hooks/useProperty.ts'
import { CascaderProps, Col, Form, Input, Row } from 'antd'
import { useCallback, useEffect } from 'react'
import RentHouseExtraFilterModal from './search-field/RentHouseExtraFilterModal.tsx'

interface Option {
  value: string
  label: string
  children?: Option[]
}

const milion = 1000000

function RentHouseFilter() {
  const [form] = Form.useForm()
  const { search, cityId, districtId, roomTypeId, minPrice, maxPrice, setFilters } = usePropertyFilters()

  const onCityDistrictChange: CascaderProps<Option>['onChange'] = useCallback(
    (value: string[]) => {
      if (value && value.length === 2) {
        const [cityId, districtId] = value.map(Number)
        setFilters({ cityId, districtId })
      } else {
        setFilters({ cityId: 0, districtId: 0 })
      }
    },
    [setFilters]
  )

  const onRoomTypeChange = useCallback(
    (value: string) => {
      setFilters({ roomTypeId: Number(value) })
    },
    [setFilters]
  )

  const onPriceChange = useCallback(
    (value: string) => {
      const [min, max] = value.split(',')
      setFilters({
        minPrice: Number(min || '0') * milion,
        maxPrice: Number(max || '0') * milion
      })
    },
    [setFilters]
  )

  // Dùng useEffect để cập nhật giá trị của form khi có thay đổi từ các biến roomTypeId, cityId, districtId ở bên ngoài
  useEffect(() => {
    form.setFieldsValue({
      search: search || undefined,
      roomType: roomTypeId ? roomTypeId.toString() : undefined,
      cityDistrict:
        cityId && districtId ? [cityId.toString(), districtId.toString()] : cityId ? [cityId.toString(), '0'] : [],
      price: minPrice || maxPrice ? `${minPrice / milion},${maxPrice / milion}` : '0,0'
    })
  }, [form, search, cityId, districtId, roomTypeId, minPrice, maxPrice])

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
          <Col xs={16} md={7}>
            <Form.Item name='search'>
              <Input.Search
                size='large'
                allowClear={true}
                placeholder='Từ khóa, đường, quận hoặc địa danh'
                onSearch={(value) => setFilters({ search: value })}
              />
            </Form.Item>
          </Col>
          <Col xs={0} md={5}>
            <RentHouseFilterCityDistrict onCityDistrictChange={onCityDistrictChange} />
          </Col>
          <Col xs={0} md={5}>
            <RentHouseFilterRoomType onRoomTypeChange={onRoomTypeChange} />
          </Col>
          <Col xs={0} md={5}>
            <RentHouseFilterPrice onPriceChange={onPriceChange} />
          </Col>
          <Col xs={8} md={2}>
            <Form.Item>
              <RentHouseExtraFilterModal />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default RentHouseFilter
