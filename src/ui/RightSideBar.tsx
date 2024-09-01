import { usePropertyFilters } from '@/hooks/useProperty.ts'
import { RightCircleOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, List, Typography } from 'antd'
import { CSSProperties } from 'react'
import { fetchAllCities } from '../api/city.api.ts'
import { fetchAllDistricts } from '../api/district.api.ts'
import { fetchAllRoomTypes } from '../api/roomType.api.ts'

const listStyle: CSSProperties = {
  width: '100%',
  backgroundColor: 'white',
  border: 0,
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  marginTop: '15px',
  marginBottom: '30px',
  paddingBottom: '8px'
}

function RightSideBar() {
  const { data: roomTypeData, isLoading: roomTypeIsLoading } = useQuery({
    queryKey: ['roomTypes'],
    queryFn: fetchAllRoomTypes
  })
  const { data: cityData, isLoading: cityIsLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchAllCities
  })
  const { data: districtData, isLoading: districtIsLoading } = useQuery({
    queryKey: ['districts'],
    queryFn: fetchAllDistricts
  })

  const { cityId, setFilters } = usePropertyFilters()

  return (
    <>
      <img src='/aptechonehome.webp' style={{ width: '100%', marginTop: '16px' }} alt='banner' />
      <List
        size='small'
        header={
          <Typography.Title level={5} className='m-0'>
            Loại bất động sản
          </Typography.Title>
        }
        bordered
        dataSource={roomTypeData}
        loading={roomTypeIsLoading}
        style={listStyle}
        renderItem={(item) => (
          <List.Item className='border-0 pb-0 pt-1'>
            <Button
              block
              type='text'
              icon={<RightCircleOutlined />}
              onClick={() => setFilters({ roomTypeId: item.id })}
              className='justify-start'
            >
              {item.name}
            </Button>
          </List.Item>
        )}
      />

      {!cityId && (
        <List
          size='small'
          header={
            <Typography.Title level={5} className='m-0'>
              Nhà đất cho thuê tại các khu vực
            </Typography.Title>
          }
          bordered
          dataSource={cityData}
          loading={cityIsLoading}
          style={listStyle}
          renderItem={(item) => (
            <List.Item className='border-0 pb-0 pt-1'>
              <Button
                block
                type='text'
                icon={<RightCircleOutlined />}
                onClick={() => setFilters({ cityId: item.id })}
                className='justify-start'
              >
                {item.name}
              </Button>
            </List.Item>
          )}
        />
      )}
      {cityId && cityData && districtData ? (
        <List
          size='small'
          header={
            <Typography.Title level={5} className='m-0'>
              Nhà đất cho thuê tại {cityData.find((city) => city.id === cityId)?.name}
            </Typography.Title>
          }
          bordered
          dataSource={districtData.filter((district) => district.cityId === cityId)}
          loading={districtIsLoading}
          style={listStyle}
          renderItem={(item) => (
            <List.Item className='border-0 pb-0 pt-1'>
              <Button
                block
                type='text'
                icon={<RightCircleOutlined />}
                onClick={() => setFilters({ districtId: item.id })}
                className='justify-start'
              >
                {item.name}
              </Button>
            </List.Item>
          )}
        />
      ) : null}
    </>
  )
}

export default RightSideBar
