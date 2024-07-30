import { Link } from 'react-router-dom'
import { Button } from 'antd'

function Home() {
  return (
    <div style={{width: 600}}>
      <h1>Home page</h1>
      <Link style={{ color: 'white'}} to={'/contact'}>
        <Button style={{marginBottom: 16}} size='large'  block> Contact </Button>
      </Link>
      <Link style={{ color: 'white' }} to={'/about'}>
        <Button style={{marginBottom: 16}} size='large' block> About </Button>
      </Link>
      <Link style={{ color: 'white' }} to={'/login'}>
        <Button style={{marginBottom: 16}} size='large' block> Login </Button>
      </Link>
      <Link style={{ color: 'white' }} to={'/register'}>
        <Button style={{marginBottom: 16}} size='large' block> Register </Button>
      </Link>
      <Link style={{ color: 'white' }} to={'/profile'}>
        <Button style={{marginBottom: 16}} size='large' block> Profile - Protected Route </Button>
      </Link>
      <Link style={{ color: 'white' }} to={'/rent-house'}>
        <Button style={{marginBottom: 16}} size='large' block> Tìm thuê </Button>
      </Link>
      <Link style={{ color: 'white' }} to={'/server-error'}>
        <Button style={{marginBottom: 16}} size='large' block> Server Error </Button>
      </Link>
      <Link style={{ color: 'white' }} to={'/not-found'}>
        <Button style={{marginBottom: 16}} size='large' block> Not Found </Button>
      </Link>
    </div>
  )
}

export default Home
