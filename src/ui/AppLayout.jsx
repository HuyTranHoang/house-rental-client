import {Layout} from 'antd';

import MyFooter from './Footer.jsx'

const {Header, Footer, Sider, Content} = Layout;
import {Row, Col} from 'antd'
import Navbar from "./Navbar.jsx";
import {Outlet} from "react-router-dom";

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
};

const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#1677ff',
};

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};

function AppLayout() {
    return (
        <Layout style={{minHeight: "100vh"}}>
            <Header style={headerStyle}>
                <Navbar />
            </Header>
            <Layout>
                <Row>
                    <Col xs={1} sm={2} md={3}></Col>
                    <Col xs={22} sm={20} md={18}>
                        <Layout>
                            <Content style={contentStyle}>
                                <Outlet />
                            </Content>
                            <Sider width="25%" style={siderStyle}>
                                Sider
                            </Sider>
                        </Layout>
                    </Col>
                    <Col xs={1} sm={2} md={3}></Col>
                </Row>
            </Layout>
            <Footer style={footerStyle}>
                <MyFooter />
            </Footer>
        </Layout>
    )
}

export default AppLayout
