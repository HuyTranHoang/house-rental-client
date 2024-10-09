import ROUTER_NAMES from '@/constant/routerNames.ts'
import { useAddFavorite, useFavoriteByUserId, useRemoveFavorite } from '@/hooks/useFavorite.ts'
import { User } from '@/types/user.type.ts'
import { red } from '@ant-design/colors'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Button, ConfigProvider } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface PropertyDetailFavoriteButtonProps {
  id: number
  currentUser: User | null
}

function PropertyDetailFavoriteButton({ id, currentUser }: PropertyDetailFavoriteButtonProps) {
  const navigate = useNavigate()
  const { favorites } = useFavoriteByUserId(currentUser?.id)
  const isFavorite = favorites?.some((favorite) => favorite.propertyId === Number(id))
  const { addFavoriteMutate } = useAddFavorite()
  const { removeFavoriteMutate } = useRemoveFavorite()

  const { t } = useTranslation(['common', 'propertyDetail'])

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultHoverBorderColor: red.primary,
            defaultHoverColor: red[3]
          }
        }
      }}
    >
      <Button
        icon={isFavorite ? <HeartFilled className='text-red-500' /> : <HeartOutlined className='text-red-500' />}
        onClick={() => {
          if (!currentUser) {
            navigate(ROUTER_NAMES.LOGIN)
            return
          }
          if (isFavorite) {
            removeFavoriteMutate({ propertyId: id, userId: currentUser.id })
          } else {
            addFavoriteMutate(id)
          }
        }}
        size='large'
        className='mb-6 mt-3 w-full md:mb-0 md:w-48'
      >
        {t('propertyDetail:favorite.save')}
      </Button>
    </ConfigProvider>
  )
}

export default PropertyDetailFavoriteButton