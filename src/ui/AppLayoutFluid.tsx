import MyFooter from '@/ui/Footer.tsx'
import Navbar from '@/ui/Navbar.tsx'
import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

const { Header, Footer, Content } = Layout

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 18%',
  height: 50,
  color: '#4E4E4E',
  backgroundColor: '#FFFFFF'
}

function AppLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={headerStyle}>
        <Navbar />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer className='bg-[#E9E9E9]'>
        <MyFooter />
      </Footer>
    </Layout>
  )
}

export default AppLayout
