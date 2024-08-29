import ROUTER_NAMES from '@/constant/routerNames.ts'
import { selectAuth } from '@/features/auth/authSlice.ts'
import { useFavoritePropertyByUserId, useRemoveFavorite } from '@/hooks/useFavorite.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { formatDate } from '@/utils/formatDate.ts'
import { Card, Empty, Flex, List, Space, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Favorite() {
  const { user: currentUser } = useSelector(selectAuth)
  const { favortieProperties, isLoadingFavoriteProperties } = useFavoritePropertyByUserId(currentUser?.id)
  const { removeFavoriteMutate, isPendingRemoveFavorite } = useRemoveFavorite()

  const propertiesData = favortieProperties?.properties.map((property) => ({
    id: property.id,
    title: property.title,
    price: property.price,
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
        loading={isLoadingFavoriteProperties || isPendingRemoveFavorite}
        itemLayout='horizontal'
        dataSource={propertiesData}
        locale={{
          emptyText: (
            <Empty
              description={
                <Typography.Text type='secondary'>
                  Bạn chưa lưu bất kỳ bất động sản nào.{' '}
                  <Link to={ROUTER_NAMES.RENT_HOUSE} className='text-blue-500'>
                    Xem bất động sản
                  </Link>
                </Typography.Text>
              }
            />
          )
        }}
        pagination={{
          pageSize: 3,
          size: 'small',
          showTotal: (total, range) => (
            <span className='text-xs text-slate-500'>
              {range[0]}-{range[1]} trong {total} bất động sản
            </span>
          )
        }}
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

                  <Typography.Text className='mt-1 font-semibold text-blue-500'>
                    {formatCurrency(item.price)}
                  </Typography.Text>

                  <Space size='large' className='mt-1'>
                    <Typography.Text type='secondary' className='text-xs'>
                      Ngày đăng: {formatDate(item.createdAt)}
                    </Typography.Text>

                    <Typography.Text className='text-xs'>
                      <Link to={ROUTER_NAMES.getRentHouseDetail(item.id)} target='_blank' rel='noopener noreferrer'>
                        Xem chi tiết
                      </Link>
                    </Typography.Text>

                    <Typography.Text
                      type='danger'
                      className='cursor-pointer text-xs hover:underline'
                      onClick={() => removeFavoriteMutate({ propertyId: item.id, userId: currentUser!.id })}
                    >
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
