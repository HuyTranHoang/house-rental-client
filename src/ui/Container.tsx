import React from 'react'
import { Col, Row } from 'antd'

interface ContainerProps {
  children: React.ReactNode
}

function Container({ children }: ContainerProps) {
  return (
    <Row>
      <Col xs={1} sm={2} md={4}></Col>
      <Col xs={22} sm={20} md={16}>
        {children}
      </Col>
      <Col xs={1} sm={2} md={4}></Col>
    </Row>
  )
}

export default Container
