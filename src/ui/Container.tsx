import React from 'react'
import { Col, Row } from 'antd'


interface ContainerProps {
  children: React.ReactNode
}

function Container({ children }: ContainerProps) {
  return (
    <Row>
      <Col xs={1} sm={2} md={5}></Col>
      <Col xs={22} sm={20} md={14}>
        {children}
      </Col>
      <Col xs={1} sm={2} md={5}></Col>
    </Row>
  )
}

export default Container
