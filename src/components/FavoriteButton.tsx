import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { clsx } from 'clsx/lite'
import React from 'react'

interface FavoriteButtonProps {
  isFavorite: boolean | undefined
  onClick: (e: React.MouseEvent) => void
}

const FavoriteButton = ({ isFavorite, onClick }: FavoriteButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'relative flex cursor-pointer items-center justify-center text-2xl transition ease-in-out hover:scale-110 hover:text-red-400 active:scale-95',
        isFavorite && 'text-red-500'
      )}
    >
      <Tooltip title={isFavorite ? 'Bỏ khỏi danh sách yêu thích' : 'Thêm vào danh sách yêu thích'}>
        {isFavorite ? <HeartFilled /> : <HeartOutlined />}
      </Tooltip>
    </div>
  )
}

export default FavoriteButton
