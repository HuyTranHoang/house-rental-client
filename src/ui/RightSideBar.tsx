import { fetchAllCities } from '@/api/city.api.ts'
import { fetchAllDistricts } from '@/api/district.api.ts'
import { fetchAllRoomTypes } from '@/api/roomType.api.ts'
import { useAdvertisements } from '@/hooks/useAdvertisement'
import { usePropertyFilters } from '@/hooks/useProperty.ts'
import { RightCircleOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, List, Typography } from 'antd'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

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

  const { t } = useTranslation()
  const { cityId, setFilters } = usePropertyFilters()
  const { advData, advIsLoading } = useAdvertisements()
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageClass, setImageClass] = useState('');

  useEffect(() => {
    if (!advIsLoading && advData && advData.length > 0) {
      const interval = setInterval(() => {
        setImageClass('fade-out');
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % advData.length);
          setImageClass('fade-in');
        }, 3000); 
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [advIsLoading, advData]);

  if (advIsLoading) {
    return <Loader/>
  }

  if (!advData || advData.length === 0) {
    return <Loader/>
  }

  return (
    <>
      {advData.length > 0 && (
        <img
          src={advData[currentImageIndex].imageUrl}
          className={`mt-4 w-full fixed-image ${imageClass}`}
          alt='banner'
          onLoad={() => setImageClass('')}
        />
      )}
      <List
        size='small'
        header={
          <Typography.Title level={5} className='m-0'>
            {t('home.rightSidebar.roomType')}
          </Typography.Title>
        }
        bordered
        dataSource={roomTypeData}
        loading={roomTypeIsLoading}
        className='mb-5 mt-3 w-full bg-white pb-2 shadow-myShadow'
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
              {t('home.rightSidebar.cityDistrict')}
            </Typography.Title>
          }
          bordered
          dataSource={cityData}
          loading={cityIsLoading}
          className='mb-5 mt-3 w-full bg-white pb-2 shadow-myShadow'
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
              {t('home.rightSidebar.cityDistrictIn')} {cityData.find((city) => city.id === cityId)?.name}
            </Typography.Title>
          }
          bordered
          dataSource={districtData.filter((district) => district.cityId === cityId)}
          loading={districtIsLoading}
          className='mb-5 mt-3 w-full bg-white pb-2 shadow-myShadow'
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
