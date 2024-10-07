import { useCities } from '@/hooks/useCity.ts'
import { useDistricts } from '@/hooks/useDistrict.ts'
import { usePropertyFilters } from '@/hooks/useProperty.ts'
import { useRoomTypes } from '@/hooks/useRoomType.ts'
import { CalendarOutlined, ProductOutlined, SelectOutlined } from '@ant-design/icons'
import { Badge, Button, Cascader, CascaderProps, Modal, Select, Typography } from 'antd'
import { DollarSign, House, MapPin } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

interface Option {
  value: string
  label: string
  children?: Option[]
}

function RentHouseExtraFilterModal() {
  const { cityId, districtId, roomTypeId, minPrice, maxPrice, minArea, maxArea, numOfDays, setFilters } =
    usePropertyFilters()

  const [localFilters, setLocalFilters] = useState({
    cityId,
    districtId,
    roomTypeId,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    numOfDays
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [count, setCount] = useState(0)

  // City District
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

  const onCityDistrictChange: CascaderProps<Option>['onChange'] = useCallback((value: string[]) => {
    if (value && value.length === 2) {
      const [cityId, districtId] = value.map(Number)
      setLocalFilters((prev) => ({
        ...prev,
        cityId,
        districtId
      }))
    } else if (value && value.length === 1) {
      const [cityId] = value.map(Number)
      setLocalFilters((prev) => ({
        ...prev,
        cityId,
        districtId: 0
      }))
    } else {
      setLocalFilters((prev) => ({
        ...prev,
        cityId: 0,
        districtId: 0
      }))
    }
  }, [])

  // Room Type

  const roomTypeOptions: Option[] = [{ value: '0', label: 'Tất cả' }]

  const { roomTypeData, roomTypeIsLoading } = useRoomTypes()

  if (roomTypeData) {
    roomTypeOptions.push(
      ...roomTypeData.map((roomType) => ({
        value: roomType.id.toString(),
        label: roomType.name
      }))
    )
  }

  const onRoomTypeChange = useCallback((value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      roomTypeId: parseInt(value)
    }))
  }, [])

  const onPriceChange = useCallback((value: string) => {
    const [min, max] = value.split(',')
    setLocalFilters((prev) => ({
      ...prev,
      minPrice: Number(min || '0'),
      maxPrice: Number(max || '0')
    }))
  }, [])

  const handleOk = () => {
    setFilters(localFilters)
    setIsModalOpen(false)
  }

  const handleResetExtraFilter = () => {
    const resetFilters = {
      cityId: 0,
      districtId: 0,
      roomTypeId: 0,
      minPrice: 0,
      maxPrice: 0,
      minArea: 0,
      maxArea: 0,
      numOfDays: 0
    }
    setLocalFilters(resetFilters)
    setFilters({ ...resetFilters, search: '' })
    setCount(0)
    setIsModalOpen(false)
  }

  useEffect(() => {
    const conditions = [cityId || districtId, roomTypeId, minPrice || maxPrice, minArea || maxArea, numOfDays];
    const count = conditions.filter(Boolean).length;
    setCount(count);
  }, [cityId, districtId, roomTypeId, minPrice, maxPrice, minArea, maxArea, numOfDays]);

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
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key='back' onClick={handleResetExtraFilter}>
            Xóa lọc
          </Button>,
          <Button key='submit' type='primary' onClick={handleOk}>
            Tìm kiếm
          </Button>
        ]}
      >
        <div className='md:hidden'>
          <Typography.Paragraph className='mb-1 mt-4'>Thành phố và quận huyện</Typography.Paragraph>
          <Cascader
            value={
              localFilters.cityId && localFilters.districtId
                ? [localFilters.cityId.toString(), localFilters.districtId.toString()]
                : localFilters.cityId
                  ? [localFilters.cityId.toString()]
                  : []
            }
            options={cityDistrictOptions}
            onChange={onCityDistrictChange}
            size='large'
            allowClear={false}
            loading={cityIsLoading || districtIsLoading}
            placeholder='Chọn quận huyện'
            suffixIcon={<MapPin size={16} />}
            className='w-full'
          />

          <Typography.Paragraph className='mb-1 mt-4'>Loại phòng</Typography.Paragraph>
          <Select
            value={localFilters.roomTypeId ? localFilters.roomTypeId.toString() : undefined}
            size='large'
            onChange={onRoomTypeChange}
            loading={roomTypeIsLoading}
            placeholder={'Loại phòng'}
            suffixIcon={<House size={16} />}
            options={roomTypeOptions}
            className='w-full'
          />

          <Typography.Paragraph className='mb-1 mt-4'>Giá</Typography.Paragraph>
          <Select
            value={
              localFilters.minPrice || localFilters.maxPrice
                ? `${localFilters.minPrice},${localFilters.maxPrice}`
                : undefined
            }
            size='large'
            onChange={onPriceChange}
            placeholder={'Giá thuê'}
            suffixIcon={<DollarSign size={16} />}
            options={[
              { value: '0,0', label: 'Tất cả' },
              { value: '0,3000000', label: 'Dưới 3 triệu' },
              { value: '3000000,7000000', label: '3 đến 7 triệu' },
              { value: '7000000,10000000', label: '7 đến 10 triệu' },
              { value: '10000000,0', label: 'Trên 10 triệu' }
            ]}
            className='w-full'
          />
        </div>

        <Typography.Paragraph className='mb-1 mt-4'>Diện tích</Typography.Paragraph>
        <Select
          size='large'
          onChange={(value) => {
            const [min, max] = value.split(',')
            setLocalFilters((prev) => ({
              ...prev,
              minArea: Number(min || '0'),
              maxArea: Number(max || '0')
            }))
          }}
          placeholder={'Diện tích'}
          value={`${localFilters.minArea},${localFilters.maxArea}`}
          suffixIcon={<SelectOutlined className='text-base' />}
          options={[
            { value: '0,0', label: 'Tất cả' },
            { value: '0,30', label: '< 30 m2' },
            { value: '30,50', label: '30 - 50 m2' },
            { value: '50,70', label: '50 - 70 m2' },
            { value: '70,100', label: '70 - 100 m2' },
            { value: '100,0', label: '> 100 m2' }
          ]}
          className='w-full'
        />
        <Typography.Paragraph className='mb-1 mt-4'>Thời gian đăng</Typography.Paragraph>
        <Select
          size='large'
          onChange={(value) => {
            setLocalFilters((prev) => ({
              ...prev,
              numOfDays: Number(value)
            }))
          }}
          placeholder={'Thời gian đăng'}
          value={localFilters.numOfDays.toString()}
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
