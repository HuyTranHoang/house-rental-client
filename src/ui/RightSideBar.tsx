import { Button, List, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { fetchAllRoomTypes } from '../api/roomType.api.ts'
import { District } from '../models/district.type.ts'
import { RightCircleOutlined } from '@ant-design/icons'
import { CSSProperties } from 'react'
import { fetchAllCities } from '../api/city.api.ts'
import { City } from '../models/city.type.ts'
import { useSelector } from 'react-redux'
import { selectPropertyParams, setCityId, setDistrictId, setRoomTypeId } from '../features/rent-house/rentHouseSlice.ts'
import { fetchAllDistricts } from '../api/district.api.ts'
import { useAppDispatch } from '../store.ts'

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

  const { cityId } = useSelector(selectPropertyParams)

  const dispatch = useAppDispatch()

  return (
    <>
      <img src="https://cdn.mogi.vn/banner/2024/2_d87b2319-9b47-4dde-b479-89f4bd4bc581.jpg"
           style={{ width: '100%', marginTop: '16px' }} alt="banner" />
      <List
        size="small"
        header={<Typography.Title level={5} style={{ margin: 0 }}>Loại bất động sản</Typography.Title>}
        bordered
        dataSource={roomTypeData}
        loading={roomTypeIsLoading}
        style={listStyle}
        renderItem={(item: District) => (
          <List.Item style={{ paddingTop: '4px', paddingBottom: 0, border: 0 }}>
            <Button block type="text" icon={<RightCircleOutlined />}
                    onClick={() => dispatch(setRoomTypeId(item.id))}
                    style={{ justifyContent: 'start' }}>
              {item.name}
            </Button>
          </List.Item>
        )}
      />

      {!cityId && <List
        size="small"
        header={<Typography.Title level={5} style={{ margin: 0 }}>Nhà đất cho thuê tại các khu vực</Typography.Title>}
        bordered
        dataSource={cityData}
        loading={cityIsLoading}
        style={listStyle}
        renderItem={(item: City) => (
          <List.Item style={{ paddingTop: '4px', paddingBottom: 0, border: 0 }}>
            <Button block type="text" icon={<RightCircleOutlined />}
                    onClick={() => dispatch(setCityId(item.id))}
                    style={{ justifyContent: 'start' }}>
              {item.name}
            </Button>
          </List.Item>
        )}
      />}
      {cityId && cityData && districtData ? (
        <List
          size="small"
          header={
            <Typography.Title level={5} style={{ margin: 0 }}>
              Nhà đất cho thuê tại {cityData.find(city => city.id === cityId)?.name}
            </Typography.Title>
          }
          bordered
          dataSource={districtData.filter(district => district.cityId === cityId)}
          loading={districtIsLoading}
          style={listStyle}
          renderItem={(item: District) => (
            <List.Item style={{ paddingTop: '4px', paddingBottom: 0, border: 0 }}>
              <Button block type="text" icon={<RightCircleOutlined />}
                      onClick={() => dispatch(setDistrictId(item.id))}
                      style={{ justifyContent: 'start' }}>
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
