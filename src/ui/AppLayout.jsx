import { Layout } from 'antd'

import MyFooter from './Footer.jsx'

const { Header, Footer, Sider, Content } = Layout
import { Row, Col } from 'antd'
import Navbar from './Navbar.jsx'
import { Outlet } from 'react-router-dom'

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 18%',
  height: 50,
  color: '#4E4E4E',
  backgroundColor: '#FFFFFF'
}

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff'
}

const footerStyle = {
  backgroundColor: '#E9E9E9'
}

function AppLayout({ withSidebar }) {
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
