import React, { useState, useEffect } from 'react'
import { Tooltip } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import styled from 'styled-components'

interface FavoriteButtonProps {
  isFavorite: boolean | undefined
  onClick: (e: React.MouseEvent) => void
}

const HeartIcon = styled.div<{ $isFavorite: boolean }>`
    font-size: 24px;
    color: ${(props) => (props.$isFavorite ? '#ff4d4f' : 'inherit')};
    transition: all 0.3s ease;
    transform: ${(props) => (props.$isFavorite ? 'scale(1.1)' : 'scale(1)')};
`

const ButtonWrapper = styled.div<{ $isFavorite: boolean }>`
    font-size: 24px;
    position: relative;
    height: 24px;
    width: 24px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover ${HeartIcon} {
        transform: ${(props) => (props.$isFavorite ? 'scale(1.2)' : 'scale(1.1)')};
        color: ${(props) => (props.$isFavorite ? '#ff4d4f' : '#ff7875')};
    }

    &:active ${HeartIcon} {
        transform: scale(0.95);
    }
`

const FavoriteButton = ({ isFavorite, onClick }: FavoriteButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  const handleClick = (e: React.MouseEvent) => {
    setIsAnimating(true)
    onClick(e)
  }

  return (
    <ButtonWrapper onClick={handleClick} $isFavorite={!!isFavorite}>
      <Tooltip title={isFavorite ? 'Bỏ khỏi danh sách yêu thích' : 'Thêm vào danh sách yêu thích'}>
        <HeartIcon $isFavorite={!!isFavorite}>{isFavorite ? <HeartFilled /> : <HeartOutlined />}</HeartIcon>
      </Tooltip>
    </ButtonWrapper>
  )
}

export default FavoriteButton