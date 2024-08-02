import { Badge, Button, Cascader, CascaderProps, Col, Form, Modal, Row, Select, Typography } from 'antd'
import Search from 'antd/es/input/Search'
import { DollarIcon, GeoIcon, HomeIcon } from './RentHouseFilterIcons.tsx'
import { CalendarOutlined, ProductOutlined, SelectOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { fetchAllCities } from '../../fetchers/city.fetch.ts'
import { fetchAllDistricts } from '../../fetchers/district.fetch.ts'
import { fetchAllRoomTypes } from '../../fetchers/roomType.fetch.ts'
import { useAppDispatch } from '../../store.ts'
import {
  setCityId,
  setDistrictId, setMaxArea,
  setMaxPrice,
  setMinArea,
  setMinPrice, setNumOfDays,
  setRoomTypeId,
  setSearch
} from './rentHouseSlice.ts'
import { useState } from 'react'

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

function RentHouseFilter() {
  const dispatch = useAppDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [area, setArea] = useState<string>('0,0')
  const [time, setTime] = useState<string>('0')
  const [count, setCount] = useState<number>(0)

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
      value: '0',
      label: 'Toàn Quốc'
    }
  ]

  const roomTypeOptions: Option[] = [
    {
      value: '0',
      label: 'Tất cả'
    }
  ]

  if (cityData && districtData) {
    const cityMap = cityData.map(city => ({
      value: city.id.toString(),
      label: city.name,
      children: [
        { value: '0', label: 'Tất cả' },
        ...districtData
          .filter(district => district.cityId === city.id)
          .map(district => ({
            value: district.id.toString(),
            label: district.name
          }))
      ]
    }))
    cityDistrictOptions.push(...cityMap)
  }

  if (roomTypeData) {
    roomTypeOptions.push(
      ...roomTypeData.map(roomType => ({
        value: roomType.id.toString(),
        label: roomType.name
      }))
    )
  }

  const onCityDistrictChange: CascaderProps<Option>['onChange'] = (value) => {
    if (value && value.length === 2) {
      // City = 0, District = 1
      dispatch(setCityId(parseInt(value[0])))
      dispatch(setDistrictId(parseInt(value[1])))
    }

    if (value && value.length === 1) {
      dispatch(setCityId(0))
      dispatch(setDistrictId(0))
    }
  }

  const handleRoomTypeChance = (value: string) => {
    dispatch(setRoomTypeId(parseInt(value)))
  }

  const handlePriceChance = (value: string) => {
    const [min, max] = value.split(',')
    dispatch(setMinPrice(parseInt(min) * 1000000))
    dispatch(setMaxPrice(parseInt(max) * 1000000))
  }

  const handleSearch = (value: string) => {
    dispatch(setSearch(value))
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    const [minArea, maxArea] = area.split(',')

    dispatch(setMinArea(parseInt(minArea) * 10))
    dispatch(setMaxArea(parseInt(maxArea) * 10))

    dispatch(setNumOfDays(parseInt(time)))

    if (area !== '0,0') {
      setCount(count + 1)
    }

    if (time !== '0') {
      setCount(count + 1)
    }

    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleResetExtraFilter = () => {
    setIsModalOpen(false)
    setArea('0,0')
    setTime('0')

    dispatch(setMinArea(0))
    dispatch(setMaxArea(0))

    dispatch(setNumOfDays(0))

    setCount(0)
  }

  return (
    <>
      <Form
        name="search"
        autoComplete="off"
        style={{ marginTop: '1rem' }}
      >
        <Row gutter={12}>
          <Col span={7}>
            <Form.Item<FieldType> name="search">
              <Search size="large" allowClear={true}
                      placeholder="Từ khóa, đường, quận hoặc địa danh"
                      onSearch={handleSearch} />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item<FieldType> name="district">
              <Cascader options={cityDistrictOptions} onChange={onCityDistrictChange} size="large"
                        allowClear={false} loading={cityIsLoading || districtIsLoading} placeholder="Chọn quận huyện"
                        suffixIcon={<GeoIcon />} />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item<FieldType> name="roomType">
              <Select
                size="large"
                onChange={handleRoomTypeChance}
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
                onChange={handlePriceChance}
                placeholder={'Giá thuê'}
                suffixIcon={<DollarIcon />}
                loading={roomTypeIsLoading}
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
              <Badge count={count}>
                <Button onClick={showModal} size="large" icon={<ProductOutlined style={{ color: '#91caff' }} />}>
                  Lọc thêm
                </Button>
              </Badge>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Modal title="Bộ lọc"
             open={isModalOpen}
             onCancel={handleCancel}
             footer={[
               <Button key="back" onClick={handleResetExtraFilter}>
                 Xóa lọc
               </Button>,
               <Button key="submit" type="primary" onClick={handleOk}>
                 Tìm kiếm
               </Button>
             ]}
      >

        <Typography.Paragraph style={{ marginTop: '1rem', marginBottom: '8px' }}>
          Diện tích
        </Typography.Paragraph>
        <Select
          size="large"
          onChange={(value) => setArea(value)}
          placeholder={'Diện tích'}
          value={area}
          suffixIcon={<SelectOutlined style={{ fontSize: 16 }} />}
          loading={roomTypeIsLoading}
          options={[
            { value: '0,0', label: 'Tất cả' },
            { value: '0,3', label: '< 30 m2' },
            { value: '3,5', label: '30 - 50 m2' },
            { value: '5,7', label: '50 - 70 m2' },
            { value: '7,10', label: '70 - 100 m2' },
            { value: '10,0', label: '> 100 m2' }
          ]}
          style={{ width: '100%' }}
        />

        <Typography.Paragraph style={{ marginTop: '1rem', marginBottom: '8px' }}>
          Thời gian đăng
        </Typography.Paragraph>
        <Select
          size="large"
          onChange={(value) => setTime(value)}
          placeholder={'Thời gian đăng'}
          value={time}
          suffixIcon={<CalendarOutlined style={{ fontSize: 16 }} />}
          loading={roomTypeIsLoading}
          options={[
            { value: '0', label: 'Tất cả' },
            { value: '1', label: 'Cách đây 1 ngày' },
            { value: '3', label: 'Cách đây 3 ngày' },
            { value: '7', label: 'Cách đây 7 ngày' },
            { value: '15', label: 'Cách đây 15 ngày' },
            { value: '30', label: 'Cách đây 30 ngày' }
          ]}
          style={{ width: '100%' }}
        />
      </Modal>
    </>
  )
}

export default RentHouseFilter
