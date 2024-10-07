import MyFooter from '@/ui/Footer.tsx'
import Navbar from '@/ui/Navbar.tsx'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { Col, FloatButton, Layout, Row } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const { Header, Footer, Content } = Layout

function AppLayout() {
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

  return (
    <Layout className='min-h-screen'>
      <Header className='bg-white px-2 md:px-12'>
        <Navbar />
      </Header>
      <Layout>
        <Row>
          <Col xs={1} sm={2} md={4}></Col>
          <Col xs={22} sm={20} md={16}>
            <Content>
              <Outlet />
              {showScrollButton && <FloatButton icon={<VerticalAlignTopOutlined />} onClick={scrollToTop} />}
            </Content>
          </Col>
          <Col xs={1} sm={2} md={4}></Col>
        </Row>
      </Layout>
      <Footer className='bg-[#E9E9E9] px-2 md:px-4'>
        <MyFooter />
      </Footer>
    </Layout>
  )
}

export default AppLayout
