import MyFooter from '@/ui/Footer.tsx'
import Navbar from '@/ui/Navbar.tsx'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const { Header, Footer, Content } = Layout

function AppLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className='bg-white px-2 md:px-12'>
        <Navbar />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer className='bg-[#E9E9E9] px-2 md:px-4'>
        <MyFooter />
      </Footer>
    </Layout>
  )
}

export default AppLayout
