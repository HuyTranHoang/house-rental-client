import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'

function RentHouse() {
  return (
    <Breadcrumb
      separator=">"
      items={[
        {
          title: <Link to="/"><HomeOutlined /> Mogu</Link>
        },
        {
          title: <Link to="/rent-house">Tìm thuê nhà đất</Link>
        }
      ]}
    />
  )
}

export default RentHouse
