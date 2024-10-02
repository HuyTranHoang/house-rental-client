import FavoriteButton from '@/components/FavoriteButton.tsx'
import ImageComponent from '@/components/ImageComponent.tsx'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import { useAddFavorite, useFavoriteByUserId, useRemoveFavorite } from '@/hooks/useFavorite.ts'
import useAuthStore from '@/store/authStore.ts'
import usePropertyStore from '@/store/propertyStore.ts'
import { Property } from '@/types/property.type.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { formatDate } from '@/utils/formatDate.ts'
import { generateSlug } from '@/utils/generateSlug.ts'
import { CalendarOutlined, FireOutlined } from '@ant-design/icons'
import { Badge, Card, Col, Flex, Row, Space, Tag, Typography } from 'antd'
import { clsx } from 'clsx/lite'
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
  const slug = generateSlug(property.title, property.id)
  const setBreadcrumbName = usePropertyStore((state) => state.setName)

  const thumbnailImage = property.thumbnailUrl
    ? {
        imageUrl: property.thumbnailUrl,
        blurhash: property.thumbnailBlurhash
      }
    : property.propertyImages[0]

  return (
    <Badge.Ribbon
      className={clsx(!property.priority && 'hidden')}
      key={property.id}
      text={<FireOutlined className='animate-flame' />}
      color='red'
      placement='start'
    >
      <Card
        className='mb-2 mr-0 cursor-pointer transition-all hover:border-blue-300 md:mr-4'
        onClick={() => {
          setBreadcrumbName(property.title)
          navigate(ROUTER_NAMES.getRentHouseDetail(slug))
        }}
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

                <div className='mt-2 space-y-2'>
                  {property.amenities.map((amenity, index) => (
                    <Tag key={index} color='geekblue'>
                      {amenity}
                    </Tag>
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
    </Badge.Ribbon>
  )
}

export default RentHouseCardItem
