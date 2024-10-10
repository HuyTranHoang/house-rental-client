import ROUTER_NAMES from '@/constant/routerNames'
import { usePriorityProperties } from '@/hooks/useProperty'
import lottieJson from '@/lottie/hot.json'
import { formatCurrency } from '@/utils/formatCurrentcy'
import { generateSlug } from '@/utils/generateSlug'
import { FireOutlined } from '@ant-design/icons'
import { Badge, Card, Typography } from 'antd'
import Lottie from 'react-lottie-player'
import { useNavigate } from 'react-router-dom'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const { Text } = Typography

export default function PriorityCardItem() {
  const navigate = useNavigate()
  const { data: priorityProperties } = usePriorityProperties()

  const filteredProperties = priorityProperties?.filter((item) => !item.hidden && !item.blocked)

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 15000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      speed={1000}
      className='mb-2 -translate-x-2'
    >
      {filteredProperties &&
        filteredProperties.map((item) => {
          const slug = generateSlug(item.title, item.id)

          return (
            <SwiperSlide key={item.id} className='pl-2'>
              <Badge.Ribbon
                text={<FireOutlined className='animate-flame' />}
                color='red'
                placement='start'
                className='z-10'
              >
                <div className='group relative mr-0 h-full cursor-pointer overflow-hidden rounded-lg md:mr-2'>
                  <div className='animate-gradient-xy absolute inset-0 z-0 bg-gradient-to-r from-blue-400 via-pink-500 to-sky-300 opacity-75'></div>
                  <Card
                    className='z-10 mb-[2px] mr-[3px] mt-[1px] h-[calc(100%-3px)] w-[calc(100%-3px)] bg-white transition-all duration-300'
                    classNames={{ body: 'p-0' }}
                    onClick={() => navigate(ROUTER_NAMES.getRentHouseDetail(slug))}
                  >
                    <div className='flex items-center justify-between p-4'>
                      <div className='mx-2 flex flex-col transition-all duration-300 group-hover:translate-x-2'>
                        <Text className='line-clamp-2 flex-grow font-bold transition-colors duration-300 group-hover:text-blue-600'>
                          {item.title}
                        </Text>
                        <Text strong className='text-xs text-gray-500'>
                          {item.districtName}, {item.cityName}
                        </Text>
                      </div>

                      <div className='flex items-center whitespace-nowrap font-semibold'>
                        {formatCurrency(item.price)}
                        <Lottie loop play animationData={lottieJson} style={{ width: 50, height: 50 }} />
                      </div>
                    </div>
                  </Card>
                </div>
              </Badge.Ribbon>
            </SwiperSlide>
          )
        })}
    </Swiper>
  )
}
