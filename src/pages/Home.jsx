import { Link } from 'react-router-dom'
import { Button } from 'antd'

function Home() {
  return (
    <div>
      HomePage
      <br />
      <Link style={{ color: 'white' }} to={'/contact'}>
        <Button> Contact </Button>
      </Link>
      <br />
      <Link style={{ color: 'white' }} to={'/about'}>
        <Button> About </Button>
      </Link>
      <br />
      <Link style={{ color: 'white' }} to={'/login'}>
        <Button> Login </Button>
      </Link>
      <br />
      <Link style={{ color: 'white' }} to={'/register'}>
        <Button> Register </Button>
      </Link>
    </div>
  )
}

export default Home
