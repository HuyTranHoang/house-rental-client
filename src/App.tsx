import CustomIndicator from '@/components/CustomIndicator.tsx'
import router from '@/router.tsx'
import { FloatButton, Spin } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import './App.css'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import useRefreshToken from '@/hooks/useRefreshToken.ts'
import useUIStore from '@/store/uiStore.ts'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'

function App() {
  const isLoading = useRefreshToken()
  const i18n = useUIStore((state) => state.i18n)
  const setI18n = useUIStore((state) => state.setI18n)
  const [showScrollButton, setShowScrollButton] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (isLoading) {
    return <Spin indicator={<CustomIndicator />} tip='Đang tải dữ liệu...Vui lòng đợi trong giây lát!!!' fullscreen />
  }

  return (
    <>
      <Toaster richColors={true} position='bottom-center' />
      <RouterProvider router={router} />
      <FloatButton.Group>
        {showScrollButton && <FloatButton icon={<VerticalAlignTopOutlined />} onClick={scrollToTop} />}
        <FloatButton
          onClick={() => setI18n(i18n === 'en' ? 'vi' : 'en')}
          className='size-10'
          icon={i18n === 'en' ? <ReactCountryFlag countryCode='VN' svg /> : <ReactCountryFlag countryCode='US' svg />}
        />
      </FloatButton.Group>
    </>
  )
}

export default App
