import { Layout } from 'antd'

import MyFooter from './Footer.tsx'

const { Header, Footer, Content } = Layout

import Navbar from './Navbar.tsx'
import { Outlet } from 'react-router-dom'
import React from 'react'

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 18%',
  height: 50,
  color: '#4E4E4E',
  backgroundColor: '#FFFFFF'
}


const footerStyle: React.CSSProperties = {
  backgroundColor: '#E9E9E9'
}


function AppLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={headerStyle}>
        <Navbar />
      </Header>
      <Content style={{flex: 0}}>
        <Outlet />
      </Content>
      <Footer style={footerStyle}>
        <MyFooter />
      </Footer>
    </Layout>
  )
}

export default AppLayout
