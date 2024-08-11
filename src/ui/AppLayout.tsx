import { Col, Layout, Row } from 'antd'

import MyFooter from './Footer.tsx'
import Navbar from './Navbar.tsx'
import { Outlet } from 'react-router-dom'
import React from 'react'

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

const footerStyle: React.CSSProperties = {
  backgroundColor: '#E9E9E9'
}


function AppLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={headerStyle}>
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
      <Footer style={footerStyle}>
        <MyFooter />
      </Footer>
    </Layout>
  )
}

export default AppLayout
