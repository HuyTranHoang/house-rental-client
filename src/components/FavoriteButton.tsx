import { Skeleton, Tooltip } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import React from 'react'

interface FavoriteButtonProps {
  isFavorite: boolean | undefined
  isPending: boolean
  onClick: (e: React.MouseEvent) => void
}

const FavoriteButton = ({ isFavorite, isPending, onClick }: FavoriteButtonProps) => {
  if (isPending) {
    return (
      <div style={{ fontSize: 24, position: 'relative', height: 24, width: 24 }}>
        <Skeleton.Avatar active size='small' shape='circle' />
      </div>
    )
  }

  return (
    <div onClick={onClick} style={{ fontSize: 24, position: 'relative', height: 24, width: 24, cursor: 'pointer' }}>
      <Tooltip title={isFavorite ? 'Bỏ khỏi danh sách yêu thích' : 'Thêm vào danh sách yêu thích'}>
        {isFavorite ? <HeartFilled style={{ fontSize: 24, color: '#ff4d4f' }} /> : <HeartOutlined />}
      </Tooltip>
    </div>
  )
}

export default FavoriteButton
