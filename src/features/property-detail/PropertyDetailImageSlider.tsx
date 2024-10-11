import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import { useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface ImageSliderProps {
  propertyImages: string[]
}

function PropertyDetailImageSlider({ propertyImages }: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      grabCursor
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }}
      pagination={{ clickable: true }}
      slidesPerView={1}
      spaceBetween={30}
      onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
      className='h-[500px] w-full'
    >
      {propertyImages.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={image}
              alt={`Property image ${index + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </SwiperSlide>
      ))}
      <div className='swiper-button-prev'>
        <LeftCircleOutlined className='text-2xl' />
      </div>
      <div className='swiper-button-next'>
        <RightCircleOutlined className='text-2xl' />
      </div>

      <Tag color='#595959' className='absolute bottom-0 right-0 z-10 m-4'>
        {`${currentSlide + 1}/${propertyImages.length}`}
      </Tag>
    </Swiper>
  )
}

export default PropertyDetailImageSlider
