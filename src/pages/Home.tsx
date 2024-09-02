import ROUTER_NAMES from '@/constant/routerNames.ts'
import { Button, Space } from 'antd'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

function Home() {
  return (
    <div style={{ width: 600 }}>
      <h1>Home page</h1>

      <Space>
        <Button onClick={() => toast.success('Success')}>
          Success Toast
        </Button>

        <Button onClick={() => toast.error('Error')}>
          Error Toast
        </Button>
      </Space>

      <Link to={ROUTER_NAMES.TOP_UP}>
        <Button className='mb-4' size='large' block>
          Nạp tiền
        </Button>
      </Link>
      <Link to={ROUTER_NAMES.CONTACT}>
        <Button className='mb-4' size='large' block>
          Contact
        </Button>
      </Link>
      <Link to={ROUTER_NAMES.ABOUT}>
        <Button className='mb-4' size='large' block>
          About
        </Button>
      </Link>
      <Link to={ROUTER_NAMES.LOGIN}>
        <Button className='mb-4' size='large' block>
          Login
        </Button>
      </Link>
      <Link to={ROUTER_NAMES.REGISTER}>
        <Button className='mb-4' size='large' block>
          Register
        </Button>
      </Link>
      <Link to={'/profile'}>
        <Button className='mb-4' size='large' block>
          Profile - Protected Route
        </Button>
      </Link>
      <Link to={ROUTER_NAMES.RENT_HOUSE}>
        <Button className='mb-4' size='large' block>
          Tìm thuê
        </Button>
      </Link>
      <Link to={ROUTER_NAMES.SERVER_ERROR}>
        <Button className='mb-4' size='large' block>
          Server Error
        </Button>
      </Link>
      <Link to={'/not-found'}>
        <Button className='mb-4' size='large' block>
          Not Found
        </Button>
      </Link>
    </div>
  )
}

export default Home
