import { Link } from 'react-router-dom'
import { Button } from 'antd'
import ROUTER_NAMES from '@/constant/routerNames.ts'

function Home() {
  return (
    <div style={{width: 600}}>
      <h1>Home page</h1>
      <Link style={{ color: 'white'}} to={ROUTER_NAMES.CONTACT}>
        <Button style={{marginBottom: 16}} size='large'  block> Contact </Button>
      </Link>
      <Link style={{ color: 'white' }} to={ROUTER_NAMES.ABOUT}>
        <Button style={{marginBottom: 16}} size='large' block> About </Button>
      </Link>
      <Link style={{ color: 'white' }} to={ROUTER_NAMES.LOGIN}>
        <Button style={{marginBottom: 16}} size='large' block> Login </Button>
      </Link>
      <Link style={{ color: 'white' }} to={ROUTER_NAMES.REGISTER}>
        <Button style={{marginBottom: 16}} size='large' block> Register </Button>
      </Link>
      <Link style={{ color: 'white' }} to={'/profile'}>
        <Button style={{marginBottom: 16}} size='large' block> Profile - Protected Route </Button>
      </Link>
      <Link style={{ color: 'white' }} to={ROUTER_NAMES.RENT_HOUSE}>
        <Button style={{marginBottom: 16}} size='large' block> Tìm thuê </Button>
      </Link>
      <Link style={{ color: 'white' }} to={ROUTER_NAMES.SERVER_ERROR}>
        <Button style={{marginBottom: 16}} size='large' block> Server Error </Button>
      </Link>
      <Link style={{ color: 'white' }} to={'/not-found'}>
        <Button style={{marginBottom: 16}} size='large' block> Not Found </Button>
      </Link>
    </div>
  )
}

export default Home
