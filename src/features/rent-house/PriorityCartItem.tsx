import ROUTER_NAMES from '@/constant/routerNames'
import { usePriorityProperties } from '@/hooks/useProperty'
import usePropertyStore from '@/store/propertyStore'
import { formatCurrency } from '@/utils/formatCurrentcy'
import { generateSlug } from '@/utils/generateSlug'
import { FireOutlined } from '@ant-design/icons'
import { Badge, Card, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const { Text } = Typography

export default function PriorityCardItem() {
  const navigate = useNavigate()
  const { data: priorityProperties, isLoading, isError } = usePriorityProperties()
  const setBreadcrumbName = usePropertyStore((state) => state.setName)

  if (isLoading) return <Text className='text-gray-500'>Đang tải...</Text>
  if (isError) return <Text className='text-red-500'>Có lỗi xảy ra khi tải dữ liệu.</Text>
  if (!priorityProperties || priorityProperties.length === 0)
    return <Text className='text-gray-500'>Không có dữ liệu để hiển thị.</Text>

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      speed={1000}
      className='mb-2 -translate-x-2'
    >
      {priorityProperties.map((item) => {
        const slug = generateSlug(item.title, item.id)

        return (
          <SwiperSlide key={item.id} className='pl-2'>
            <Badge.Ribbon text={<FireOutlined className='animate-flame' />} color='red' placement='start'>
              <Card
                className='group relative mr-0 h-full cursor-pointer hover:shadow-lg md:mr-2'
                classNames={{ body: 'p-0' }}
                onClick={() => {
                  setBreadcrumbName(item.title)
                  navigate(ROUTER_NAMES.getRentHouseDetail(slug))
                }}
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

                  <Text strong className='whitespace-nowrap'>
                    {formatCurrency(item.price)}
                  </Text>
                </div>
              </Card>
            </Badge.Ribbon>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
