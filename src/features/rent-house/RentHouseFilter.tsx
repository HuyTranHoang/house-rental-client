import { Button, Cascader, CascaderProps, Col, Form, FormProps, Row, Select } from 'antd'
import Search from 'antd/es/input/Search'
import { DollarIcon, GeoIcon, HomeIcon } from './RentHouseFilterIcons.tsx'
import { ProductOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { fetchAllCities } from '../../fetchers/city.fetch.ts'
import { fetchAllDistricts } from '../../fetchers/district.fetch.ts'
import { fetchAllRoomTypes } from '../../fetchers/roomType.fetch.ts'

type FieldType = {
  search?: string;
  district?: string;
  roomType?: string;
  price?: string;
};

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

// TODO: Implement the following functions

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value)
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}

//

function RentHouseFilter() {
  const { data: cityData, isLoading: cityIsLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchAllCities
  })

  const { data: districtData, isLoading: districtIsLoading } = useQuery({
    queryKey: ['districts'],
    queryFn: fetchAllDistricts
  })

  const { data: roomTypeData, isLoading: roomTypeIsLoading } = useQuery({
    queryKey: ['roomTypes'],
    queryFn: fetchAllRoomTypes
  })

  const cityDistrictOptions: Option[] = [
    {
      value: 'Toàn Quốc',
      label: 'Toàn Quốc'
    }
  ]

  if (cityData && districtData) {
    const cityMap = cityData.map(city => ({
      value: city.name,
      label: city.name,
      children: districtData
        .filter(district => district.cityId === city.id)
        .map(district => ({
          value: district.name,
          label: district.name
        }))
    }))
    cityDistrictOptions.push(...cityMap)
  }

  const roomTypeOptions: Option[] = []

  if (roomTypeData) {
    roomTypeOptions.push(
      ...roomTypeData.map(roomType => ({
        value: roomType.name,
        label: roomType.name
      }))
    )
  }

  return (
    <>
      <Form
        name="search"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{district: 'Toàn Quốc'}}
        style={{ marginTop: '1rem' }}
      >
        <Row gutter={12}>
          <Col span={7}>
            <Form.Item<FieldType> name="search">
              <Search size="large" placeholder="Từ khóa, đường, quận hoặc địa danh" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item<FieldType> name="district">
              <Cascader options={cityDistrictOptions} onChange={onChange} size="large"
                        allowClear={false} loading={cityIsLoading || districtIsLoading} placeholder="Chọn quận huyện"
                        suffixIcon={<GeoIcon />} />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item<FieldType> name="roomType">
              <Select
                size="large"
                onChange={handleChange}
                placeholder={'Loại phòng'}
                suffixIcon={<HomeIcon />}
                options={roomTypeOptions}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item<FieldType> name="price">
              <Select
                size="large"
                onChange={handleChange}
                placeholder={'Giá thuê'}
                suffixIcon={<DollarIcon />}
                loading={roomTypeIsLoading}
                options={[
                  { value: 'Tất cả', label: 'Tất cả' },
                  { value: 'Dưới 3 triệu', label: 'Dưới 3 triệu' },
                  { value: '3 đến 7 triệu', label: '3 đến 7 triệu' },
                  { value: '7 đến 10 triệu', label: '7 đến 10 triệu' },
                  { value: 'Trên 10 triệu', label: 'Trên 10 triệu' }
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button size="large" icon={<ProductOutlined style={{ color: '#91caff' }} />}>Lọc thêm</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default RentHouseFilter
