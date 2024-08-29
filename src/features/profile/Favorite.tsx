import ROUTER_NAMES from '@/constant/routerNames.ts'
import { selectAuth } from '@/features/auth/authSlice.ts'
import { useFavoritePropertyByUserId } from '@/hooks/useFavorite.ts'
import { formatDate } from '@/utils/formatDate.ts'
import { Card, Flex, List, Space, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Favorite() {
  const { user: currentUser } = useSelector(selectAuth)
  const { favortieProperties, isLoadingFavoriteProperties } = useFavoritePropertyByUserId(currentUser?.id)

  const propertiesData = favortieProperties?.properties.map((property) => ({
    id: property.id,
    title: property.title,
    image: property.propertyImages[0],
    location: property.location,
    createdAt: property.createdAt
  }))

  return (
    <Card
      title={<Typography.Title level={4}>Danh sách bất động sản đã lưu</Typography.Title>}
      className='mb-12 w-[768px] rounded-none border-l-0'
    >
      <List
        loading={isLoadingFavoriteProperties}
        itemLayout='horizontal'
        dataSource={propertiesData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link to={ROUTER_NAMES.getRentHouseDetail(item.id)} target='_blank' rel='noopener noreferrer'>
                  {item.title}
                </Link>
              }
              description={
                <Flex vertical>
                  <Typography.Text type='secondary'>{item.location}</Typography.Text>
                  <Space size='large' className='mt-2'>
                    <Typography.Text type='secondary' className='text-xs'>
                      Ngày lưu: {formatDate(item.createdAt)}
                    </Typography.Text>

                    <Typography.Text className='text-xs'>
                      <Link to={ROUTER_NAMES.getRentHouseDetail(item.id)} target='_blank' rel='noopener noreferrer'>
                        Xem chi tiết
                      </Link>
                    </Typography.Text>

                    <Typography.Text type='danger' className='text-xs'>
                      Xóa khỏi danh sách
                    </Typography.Text>
                  </Space>
                </Flex>
              }
            />
            <div
              className='h-24 w-32 overflow-hidden rounded-lg bg-cover bg-center'
              style={{ backgroundImage: `url(${item.image})` }}
            />
          </List.Item>
        )}
      />
    </Card>
  )
}

export default Favorite
