import ROUTER_NAMES from '@/constant/routerNames.ts'
import MenuDesktop from '@/ui/MenuDesktop.tsx'
import MenuMobile from '@/ui/MenuMobile.tsx'
import { Flex } from 'antd'
import { Link } from 'react-router-dom'
import useAuthStore from '@/store/authStore.ts'

function Navbar() {
  const currentUser = useAuthStore((state) => state.user)

  return (
    <Flex justify='space-between' align='center' className='h-16 text-[#4E4E4E]'>
      <Link to={ROUTER_NAMES.RENT_HOUSE} className='flex'>
        <img className='my-auto w-32' src='/logo.webp' alt='Logo' />
      </Link>
      {/*Mobile: xs*/}
      <MenuMobile user={currentUser} />
      {/*Desktop: md*/}
      <MenuDesktop user={currentUser} />
    </Flex>
  )
}

export default Navbar
