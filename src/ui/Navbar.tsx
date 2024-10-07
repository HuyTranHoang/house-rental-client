import ROUTER_NAMES from '@/constant/routerNames.ts'
import MenuDesktop from '@/ui/MenuDesktop.tsx'
import MenuMobile from '@/ui/MenuMobile.tsx'
import { Button, Flex } from 'antd'
import { Link } from 'react-router-dom'
import useAuthStore from '@/store/authStore.ts'
import useUIStore from '@/store/uiStore.ts'
import { useTranslation } from 'react-i18next'

function Navbar() {
  const currentUser = useAuthStore((state) => state.user)
  const setI18n = useUIStore((state) => state.setI18n)
  const {t} = useTranslation('common')

  return (
    <Flex justify='space-between' align='center' className='h-16 text-[#4E4E4E]'>
      <Link to={ROUTER_NAMES.RENT_HOUSE} className='flex'>
        <img className='my-auto w-32' src='/logo.webp' alt='Logo' />
      </Link>

      <Button onClick={() => setI18n('vi')}>
        VI
      </Button>

      <Button onClick={() => setI18n('en')}>
        EN
      </Button>

      <Button>
        {t('test')}
      </Button>
      {/*Mobile: xs*/}
      <MenuMobile user={currentUser} />
      {/*Desktop: md*/}
      <MenuDesktop user={currentUser} />
    </Flex>
  )
}

export default Navbar
