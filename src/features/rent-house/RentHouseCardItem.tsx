import FavoriteButton from '@/components/FavoriteButton.tsx'
import ImageComponent from '@/components/ImageComponent.tsx'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import useAuthStore from '@/features/auth/authStore.ts'
import { useAddFavorite, useFavoriteByUserId, useRemoveFavorite } from '@/hooks/useFavorite.ts'
import { Property } from '@/models/property.type.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { formatDate } from '@/utils/formatDate.ts'
import { CalendarOutlined } from '@ant-design/icons'
import { Card, Col, Flex, Row, Space, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

interface RentHouseCardItemProps {
  property: Property
}

function RentHouseCardItem({ property }: RentHouseCardItemProps) {
  const navigate = useNavigate()
  const currentUser = useAuthStore((state) => state.user)
  const { favorites } = useFavoriteByUserId(currentUser?.id)
  const isFavorite = favorites?.some((favorite) => favorite.propertyId === property.id)
  const { addFavoriteMutate } = useAddFavorite()
  const { removeFavoriteMutate } = useRemoveFavorite()

  const thumbnailImage = property.thumbnailUrl
    ? {
        imageUrl: property.thumbnailUrl,
        blurhash: property.thumbnailBlurhash
      }
    : property.propertyImages[0]

  return (
    <Card
      className='mb-2 mr-0 cursor-pointer md:mr-4'
      onClick={() => navigate(ROUTER_NAMES.getRentHouseDetail(property.id))}
    >
      <Row gutter={24}>
        <Col xs={24} md={8}>
          <div className='h-52 w-full overflow-hidden rounded-lg'>
            <ImageComponent image={thumbnailImage} className='h-full w-full object-cover' />
          </div>
        </Col>

        <Col xs={24} md={16}>
          <Flex vertical justify='space-between' className='h-full'>
            <div className='mb-2'>
              <Typography.Title level={4} className='mt-0'>
                {property.title}
              </Typography.Title>

              <Typography.Paragraph className='text-gray-500'>
                {property.districtName}, {property.cityName}
              </Typography.Paragraph>

              <Typography.Title level={3} className='mb-2 mt-1 text-blue-500'>
                {formatCurrency(property.price)}
              </Typography.Title>

              <Space size='large'>
                <Typography.Text strong>{property.roomTypeName}</Typography.Text>
                <span>{property.area} m&sup2;</span>
                <span>{property.numRooms} phòng ngủ</span>
              </Space>

              <div className='mt-2'>
                {property.amenities.map((amenity, index) => (
                  <Typography.Text key={index}>
                    <Tag color='geekblue'>{amenity}</Tag>
                  </Typography.Text>
                ))}
              </div>
            </div>
            <div>
              <Flex justify='space-between' align='center'>
                <Typography.Paragraph className='m-0 text-gray-500'>
                  <CalendarOutlined /> {formatDate(property.createdAt)}
                </Typography.Paragraph>

                <FavoriteButton
                  isFavorite={isFavorite}
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
              </Flex>
            </div>
          </Flex>
        </Col>
      </Row>
    </Card>
  )
}

export default RentHouseCardItem
