import MyFooter from '@/ui/Footer.tsx'
import Navbar from '@/ui/Navbar.tsx'
import { Col, Layout, Row } from 'antd'
import { Outlet } from 'react-router-dom'

const { Header, Footer, Content } = Layout

function AppLayout() {
  return (
    <Layout className='min-h-screen'>
      <Header className='bg-white px-2 md:px-12'>
        <Navbar />
      </Header>
      <Layout>
        <Row>
          <Col xs={1} sm={2} md={5}></Col>
          <Col xs={22} sm={20} md={14}>
            <Content>
              <Outlet />
            </Content>
          </Col>
          <Col xs={1} sm={2} md={5}></Col>
        </Row>
      </Layout>
      <Footer className='bg-[#E9E9E9] px-2 md:px-4'>
        <MyFooter />
      </Footer>
    </Layout>
  )
}

export default AppLayout
