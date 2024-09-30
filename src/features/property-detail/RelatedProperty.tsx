import ImageComponent from '@/components/ImageComponent.tsx'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import { useAddFavorite, useFavoriteByUserId, useRemoveFavorite } from '@/hooks/useFavorite.ts'
import { useRelatedProperties } from '@/hooks/useProperty.ts'
import { User } from '@/types/user.type.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { generateSlug } from '@/utils/generateSlug.ts'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

interface RelatedPropertyProps {
  id: number
  currentUser: User | null
}

function RelatedProperty({ id, currentUser }: RelatedPropertyProps) {
  const navigate = useNavigate()
  const { relatedPropertiesData, relatedPropertiesIsLoading } = useRelatedProperties(id)
  const { favorites } = useFavoriteByUserId(currentUser?.id)
  const { addFavoriteMutate } = useAddFavorite()
  const { removeFavoriteMutate } = useRemoveFavorite()

  if (relatedPropertiesIsLoading) {
    return (
      <Row gutter={[16, 16]} className='mb-12'>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <Card loading={true} />
            </Col>
          ))}
      </Row>
    )
  }

  return (
    <>
      <Typography.Title level={4} className='mb-4 mt-8'>
        Có thể bạn quan tâm
      </Typography.Title>
      <Row gutter={[16, 16]} className='mb-12'>
        {relatedPropertiesData &&
          relatedPropertiesData.map((property) => {
            const isFavorite = favorites?.some((favorite) => favorite.propertyId === property.id)
            return (
              <Col key={property.id} xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  cover={
                    <div className='h-48 overflow-hidden'>
                      <ImageComponent image={property.propertyImages[0]} className='h-full w-full object-cover' />
                    </div>
                  }
                  onClick={() => {
                    const slug = generateSlug(property.title, property.id)
                    navigate(ROUTER_NAMES.getRentHouseDetail(slug))
                  }}
                >
                  <Card.Meta
                    title={<Typography.Text ellipsis>{property.title}</Typography.Text>}
                    description={
                      <>
                        <Typography.Paragraph className='mb-1 font-semibold text-blue-600'>
                          {formatCurrency(property.price)}
                        </Typography.Paragraph>
                        <Typography.Paragraph ellipsis className='text-gray-500'>
                          {property.location}
                        </Typography.Paragraph>
                        <Space className='mt-2'>
                          <span>{property.area} m²</span>
                          <span>{property.numRooms} phòng ngủ</span>
                        </Space>
                      </>
                    }
                  />
                  <Button
                    icon={isFavorite ? <HeartFilled className='text-red-500' /> : <HeartOutlined />}
                    className='absolute right-2 top-2 bg-white/80 hover:bg-white'
                    shape='circle'
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!currentUser) {
                        navigate(ROUTER_NAMES.LOGIN)
                        return
                      }
                      if (isFavorite) {
                        removeFavoriteMutate({ propertyId: property.id, userId: currentUser.id })
                      } else {
                        addFavoriteMutate(property.id)
                      }
                    }}
                  />
                </Card>
              </Col>
            )
          })}
      </Row>
    </>
  )
}

export default RelatedProperty