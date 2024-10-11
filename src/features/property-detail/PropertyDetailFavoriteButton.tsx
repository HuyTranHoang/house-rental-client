import ROUTER_NAMES from '@/constant/routerNames.ts'
import { useAddFavorite, useFavoriteByUserId, useRemoveFavorite } from '@/hooks/useFavorite.ts'
import { User } from '@/types/user.type.ts'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { clsx } from 'clsx/lite'
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
    <Button
      className={clsx('hover:text-red-500', isFavorite ? 'border-red-500' : 'border-gray-400')}
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
      block
    >
      {isFavorite ? t('propertyDetail:favorite.unsave') : t('propertyDetail:favorite.save')}
    </Button>
  )
}

export default PropertyDetailFavoriteButton
