import ROUTER_NAMES from '@/constant/routerNames.ts'
import { selectAuth } from '@/features/auth/authSlice.js'
import MenuDesktop from '@/ui/MenuDesktop.tsx'
import MenuMobile from '@/ui/MenuMobile.tsx'
import { Flex } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Navbar() {
  const { user } = useSelector(selectAuth)

  return (
    <Flex justify='space-between' align='center' className='h-16 text-[#4E4E4E]'>
      <Link to={ROUTER_NAMES.RENT_HOUSE} className='flex'>
        <img className='my-auto w-32' src='/logo.webp' alt='Logo' />
      </Link>
      {/*Mobile: xs*/}
      <MenuMobile user={user} />
      {/*Desktop: md*/}
      <MenuDesktop user={user} />
    </Flex>
  )
}

export default Navbar
