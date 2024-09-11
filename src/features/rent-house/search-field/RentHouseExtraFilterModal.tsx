import RentHouseFilterCityDistrict from '@/features/rent-house/search-field/RentHouseFilterCityDistrict.tsx'
import RentHouseFilterPrice from '@/features/rent-house/search-field/RentHouseFilterPrice.tsx'
import RentHouseFilterRoomType from '@/features/rent-house/search-field/RentHouseFilterRoomType.tsx'
import { usePropertyFilters } from '@/hooks/useProperty.ts'
import { CalendarOutlined, ProductOutlined, SelectOutlined } from '@ant-design/icons'
import { Badge, Button, CascaderProps, Modal, Select, Typography } from 'antd'
import { useState } from 'react'

interface Option {
  value: string
  label: string
  children?: Option[]
}

function RentHouseExtraFilterModal() {
  const { setFilters } = usePropertyFilters()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cityId, setCityId] = useState(0)
  const [districtId, setDistrictId] = useState(0)
  const [roomType, setRoomType] = useState(0)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [area, setArea] = useState('0,0')
  const [time, setTime] = useState('0')
  const [count, setCount] = useState(0)

  const onCityDistrictChange: CascaderProps<Option>['onChange'] = (value) => {
    if (value && value.length === 2) {
      const [cityId, districtId] = value.map(Number)
      setCityId(cityId)
      setDistrictId(districtId)
    } else {
      setCityId(0)
      setDistrictId(0)
    }
  }

  const onRoomTypeChange = (value: string) => {
    setRoomType(parseInt(value))
  }

  const onPriceChange = (value: string) => {
    const [min, max] = value.split(',')
    setMinPrice(Number(min || '0'))
    setMaxPrice(Number(max || '0'))
  }

  const handleOk = () => {
    const [minArea, maxArea] = area.split(',')

    setFilters({
      cityId,
      districtId,
      roomTypeId: roomType,
      minArea: parseInt(minArea) * 10,
      maxArea: parseInt(maxArea) * 10,
      numOfDays: parseInt(time)
    })

    let activeFilters = 0

    if (cityId !== 0 || districtId !== 0) {
      activeFilters += 1
    }

    if (roomType !== 0) {
      activeFilters += 1
    }

    if (minPrice !== 0 || maxPrice !== 0) {
      activeFilters += 1
    }

    if (area !== '0,0') {
      activeFilters += 1
    }

    if (time !== '0') {
      activeFilters += 1
    }

    setCount(activeFilters)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleResetExtraFilter = () => {
    setIsModalOpen(false)
    setCityId(0)
    setDistrictId(0)
    setRoomType(0)
    setMinPrice(0)
    setMaxPrice(0)
    setArea('0,0')
    setTime('0')

    setFilters({
      cityId: 0,
      districtId: 0,
      roomTypeId: 0,
      minPrice: 0,
      maxPrice: 0,
      minArea: 0,
      maxArea: 0,
      numOfDays: 0
    })
    setCount(0)
  }

  return (
    <>
      <Badge count={count}>
        <Button onClick={() => setIsModalOpen(true)} size='large' icon={<ProductOutlined className='text-blue-400' />}>
          Lọc thêm
        </Button>
      </Badge>
      <Modal
        title='Bộ lọc'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleResetExtraFilter}>
            Xóa lọc
          </Button>,
          <Button key='submit' type='primary' onClick={handleOk}>
            Tìm kiếm
          </Button>
        ]}
      >
        <Typography.Paragraph className='mb-1 mt-4'>Thành phố và quận huyện</Typography.Paragraph>
        <RentHouseFilterCityDistrict onCityDistrictChange={onCityDistrictChange} />

        <Typography.Paragraph className='mb-1 mt-4'>Loại phòng</Typography.Paragraph>
        <RentHouseFilterRoomType onRoomTypeChange={onRoomTypeChange} />

        <Typography.Paragraph className='mb-1 mt-4'>Giá</Typography.Paragraph>
        <RentHouseFilterPrice onPriceChange={onPriceChange} />

        <Typography.Paragraph className='mb-1 mt-4'>Diện tích</Typography.Paragraph>
        <Select
          size='large'
          onChange={(value) => setArea(value)}
          placeholder={'Diện tích'}
          value={area}
          suffixIcon={<SelectOutlined className='text-base' />}
          options={[
            { value: '0,0', label: 'Tất cả' },
            { value: '0,3', label: '< 30 m2' },
            { value: '3,5', label: '30 - 50 m2' },
            { value: '5,7', label: '50 - 70 m2' },
            { value: '7,10', label: '70 - 100 m2' },
            { value: '10,0', label: '> 100 m2' }
          ]}
          className='w-full'
        />
        <Typography.Paragraph className='mb-1 mt-4'>Thời gian đăng</Typography.Paragraph>
        <Select
          size='large'
          onChange={(value) => setTime(value)}
          placeholder={'Thời gian đăng'}
          value={time}
          suffixIcon={<CalendarOutlined className='text-base' />}
          options={[
            { value: '0', label: 'Tất cả' },
            { value: '1', label: 'Cách đây 1 ngày' },
            { value: '3', label: 'Cách đây 3 ngày' },
            { value: '7', label: 'Cách đây 7 ngày' },
            { value: '15', label: 'Cách đây 15 ngày' },
            { value: '30', label: 'Cách đây 30 ngày' }
          ]}
          className='w-full'
        />
      </Modal>
    </>
  )
}

export default RentHouseExtraFilterModal
