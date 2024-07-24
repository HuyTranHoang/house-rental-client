import { Layout } from 'antd'

import MyFooter from './Footer.tsx'

const { Header, Footer, Sider, Content } = Layout
import { Row, Col } from 'antd'
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

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff'
}

const footerStyle: React.CSSProperties = {
  backgroundColor: '#E9E9E9'
}

interface AppLayoutProps {
  withSidebar: boolean
}

function AppLayout({ withSidebar }: AppLayoutProps) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={headerStyle}>
        <Navbar />
      </Header>
      <Layout>
        <Row>
          <Col xs={1} sm={2} md={5}></Col>
          <Col xs={22} sm={20} md={14}>
            <Layout>
              <Content>
                <Outlet />
              </Content>
              {withSidebar && (
                <Sider width="25%" style={siderStyle}>
                  Sider
                </Sider>
              )}
            </Layout>
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
