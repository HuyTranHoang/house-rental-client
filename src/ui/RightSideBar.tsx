import { fetchAllCities } from '@/api/city.api.ts'
import { fetchAllDistricts } from '@/api/district.api.ts'
import { fetchAllRoomTypes } from '@/api/roomType.api.ts'
import { useAdvertisements } from '@/hooks/useAdvertisement'
import { usePropertyFilters } from '@/hooks/useProperty.ts'
import { Advertisement } from '@/types/advertisement.type'
import { RightCircleOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, List, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

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
  const { advData } = useAdvertisements()

  return (
    <>
      {advData && (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
        >
          {advData.map((ad: Advertisement) => (
            <SwiperSlide key={ad.id}>
              <img src={ad.imageUrl} className='fixed-image mt-4 w-full' alt='banner' />
            </SwiperSlide>
          ))}
        </Swiper>
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
