import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { clsx } from 'clsx/lite'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface FavoriteButtonProps {
  isFavorite: boolean | undefined
  onClick: (e: React.MouseEvent) => void
}

const FavoriteButton = ({ isFavorite, onClick }: FavoriteButtonProps) => {
  const { t } = useTranslation()

  return (
    <div
      onClick={onClick}
      className={clsx(
        'relative flex cursor-pointer items-center justify-center text-2xl transition ease-in-out hover:scale-110 hover:text-red-400 active:scale-95',
        isFavorite && 'text-red-500'
      )}
    >
      <Tooltip title={isFavorite ? t('button.unfavorite') : t('button.favorite')}>
        {isFavorite ? <HeartFilled /> : <HeartOutlined />}
      </Tooltip>
    </div>
  )
}

export default FavoriteButton
