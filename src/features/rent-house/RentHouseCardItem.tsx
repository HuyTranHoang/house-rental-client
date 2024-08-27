import { Card, Col, Flex, Image, Row, Space, Tag, Typography } from 'antd'
import { formatDate } from '@/utils/formatDate.ts'
import { CalendarOutlined } from '@ant-design/icons'
import { Property } from '@/models/property.type.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { useNavigate } from 'react-router-dom'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import { useSelector } from 'react-redux'
import { selectAuth } from '@/features/auth/authSlice.ts'
import { useAddFavorite, useFavoriteByUserId, useRemoveFavorite } from '@/hooks/useFavorite.ts'
import FavoriteButton from '@/components/FavoriteButton.tsx'

interface RentHouseCardItemProps {
  property: Property
}

function RentHouseCardItem({ property }: RentHouseCardItemProps) {
  const { user } = useSelector(selectAuth)
  const navigate = useNavigate()

  const { favorites } = useFavoriteByUserId(user?.id)
  const { addFavoriteMutate, isPendingAddFavorite } = useAddFavorite()
  const { removeFavoriteMutate, isPendingRemoveFavorite } = useRemoveFavorite()

  return (
    <Card
      style={{ marginRight: '16px', marginBottom: '8px', cursor: 'pointer' }}
      onClick={() => navigate(ROUTER_NAMES.getRentHouseDetail(property.id))}
    >
      <Row gutter={24}>
        <Col md={8}>
          <Image preview={false} src={property.propertyImages[0]} style={{ objectFit: 'cover' }} />
        </Col>

        <Col md={16}>
          <Flex vertical justify='space-between' style={{ height: '100%' }}>
            <div style={{ marginBottom: '8px' }}>
              <Typography.Title level={4} style={{ marginTop: 0 }}>
                {property.title}
              </Typography.Title>

              <Typography.Paragraph style={{ color: '#657786' }}>
                {property.districtName}, {property.cityName}
              </Typography.Paragraph>

              <Typography.Title level={3} style={{ color: '#096dd9', marginTop: '12px', marginBottom: '8px' }}>
                {formatCurrency(property.price)}
              </Typography.Title>

              <Space size='large'>
                <Typography.Text strong>{property.roomTypeName}</Typography.Text>
                <span>{property.area} m&sup2;</span>
                <span>{property.numRooms} phòng ngủ</span>
              </Space>

              <div style={{ marginTop: '8px' }}>
                {property.amenities.map((amenity, index) => (
                  <Typography.Text key={index} style={{ color: '#657786' }}>
                    <Tag color='geekblue'>{amenity}</Tag>
                  </Typography.Text>
                ))}
              </div>
            </div>
            <div>
              <Flex justify='space-between' align='center'>
                <Typography.Paragraph style={{ color: '#657786', margin: 0 }}>
                  <CalendarOutlined /> {formatDate(property.createdAt)}
                </Typography.Paragraph>

                <FavoriteButton
                  isFavorite={favorites?.some((favorite) => favorite.propertyId === property.id)}
                  isPending={isPendingAddFavorite || isPendingRemoveFavorite}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!user) {
                      navigate(ROUTER_NAMES.LOGIN)
                      return
                    }
                    const isFavorite = favorites?.some((favorite) => favorite.propertyId === property.id)
                    if (isFavorite) {
                      removeFavoriteMutate({ propertyId: property.id, userId: user.id })
                    } else {
                      addFavoriteMutate(property.id)
                    }
                  }}
                />
              </Flex>
            </div>
          </Flex>
        </Col>
      </Row>
    </Card>
  )
}

export default RentHouseCardItem
