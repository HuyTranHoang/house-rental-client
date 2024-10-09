import ROUTER_NAMES from '@/constant/routerNames'
import { useFavoritePropertyByUserId, useRemoveFavorite } from '@/hooks/useFavorite'
import useAuthStore from '@/store/authStore.ts'
import { formatCurrency } from '@/utils/formatCurrentcy'
import { formatDate } from '@/utils/formatDate'
import { generateSlug } from '@/utils/generateSlug.ts'
import { Card, Empty, Flex, Grid, List, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const { useBreakpoint } = Grid

export default function Favorite() {
  const { t } = useTranslation('profile')
  const screens = useBreakpoint()
  const currentUser = useAuthStore((state) => state.user)
  const { favortieProperties, isLoadingFavoriteProperties } = useFavoritePropertyByUserId(currentUser?.id)
  const { removeFavoriteMutate, isPendingRemoveFavorite } = useRemoveFavorite()

  const propertiesData = favortieProperties?.properties.map((property) => ({
    id: property.id,
    title: property.title,
    price: property.price,
    image: property.thumbnailUrl || property.propertyImages[0],
    location: property.location,
    createdAt: property.createdAt
  }))

  return (
    <Card
      title={<Typography.Title level={4}>{t('favoriteProperties.title')}</Typography.Title>}
      className='mb-12 rounded-none border-l-0 sm:border-l'
    >
      <List
        loading={isLoadingFavoriteProperties || isPendingRemoveFavorite}
        itemLayout={screens.sm ? 'horizontal' : 'vertical'}
        dataSource={propertiesData}
        locale={{
          emptyText: (
            <Empty
              description={
                <Typography.Text type='secondary'>
                  {t('favoriteProperties.noData')}{' '}
                  <Link to={ROUTER_NAMES.RENT_HOUSE} className='text-blue-500'>
                    {t('favoriteProperties.viewProperties')}
                  </Link>
                </Typography.Text>
              }
            />
          )
        }}
        pagination={{
          pageSize: 3,
          showTotal: (total, range) => (
            <span className='text-xs text-slate-500'>
              {range[0]}-{range[1]} {t('favoriteProperties.of')} {total} {t('favoriteProperties.properties')}
            </span>
          ),
          hideOnSinglePage: true
        }}
        renderItem={(item) => (
          <List.Item>
            <Flex vertical={!screens.sm} align={screens.sm ? 'flex-start' : 'stretch'} className='w-full'>
              <div
                className='mb-4 h-48 w-full overflow-hidden rounded-lg bg-cover bg-center sm:mb-0 sm:h-24 sm:w-32 sm:flex-shrink-0'
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <Flex vertical className='ml-0 w-full sm:ml-4'>
                <Typography.Title level={5} className='mb-2 mt-0'>
                  <Link
                    to={ROUTER_NAMES.getRentHouseDetail(generateSlug(item.title, item.id))}
                    className='text-gray-700'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {item.title}
                  </Link>
                </Typography.Title>
                <Typography.Text type='secondary' className='mb-2'>
                  {item.location}
                </Typography.Text>
                <Typography.Text className='mb-2 font-semibold text-blue-500'>
                  {formatCurrency(item.price)}
                </Typography.Text>
                <Space direction={screens.sm ? 'horizontal' : 'vertical'} size='small' className='w-full'>
                  <Typography.Text type='secondary' className='text-xs'>
                    {t('favoriteProperties.postedDate')}: {formatDate(item.createdAt)}
                  </Typography.Text>
                  <Typography.Text className='text-xs'>
                    <Link
                      to={ROUTER_NAMES.getRentHouseDetail(generateSlug(item.title, item.id))}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {t('favoriteProperties.viewDetails')}
                    </Link>
                  </Typography.Text>
                  <Typography.Text
                    type='danger'
                    className='cursor-pointer text-xs hover:underline'
                    onClick={() => removeFavoriteMutate({ propertyId: item.id, userId: currentUser!.id })}
                  >
                    {t('favoriteProperties.removeFromList')}
                  </Typography.Text>
                </Space>
              </Flex>
            </Flex>
          </List.Item>
        )}
      />
    </Card>
  )
}