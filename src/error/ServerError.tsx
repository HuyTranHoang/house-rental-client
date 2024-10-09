import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import ROUTER_NAMES from '@/constant/routerNames.ts'

function ServerError() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Có lỗi xảy ra trên máy chủ. Vui lòng thử lại sau."
      extra={<Link to={ROUTER_NAMES.RENT_HOUSE}><Button type="primary">Trở về trang chủ</Button></Link>}
    />
  )
}

export default ServerError
