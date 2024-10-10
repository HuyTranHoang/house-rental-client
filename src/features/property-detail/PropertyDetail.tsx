import CustomBreadcrumbs from '@/components/CustomBreadcrumbs.tsx'
import ROUTER_NAMES from '@/constant/routerNames.ts'
import PropertyDetailImageSlider from '@/features/property-detail/PropertyDetailImageSlider.tsx'
import PropertyDetailOwnerDetail from '@/features/property-detail/PropertyDetailOwnerDetail.tsx'
import RelatedProperty from '@/features/property-detail/RelatedProperty.tsx'
import ReportButton from '@/features/property-detail/ReportButton.tsx'
import { useProperty } from '@/hooks/useProperty'
import useAuthStore from '@/store/authStore.ts'
import Container from '@/ui/Container.tsx'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { formatDate } from '@/utils/formatDate.ts'
import { Button, Col, Descriptions, DescriptionsProps, Divider, Row, Skeleton, Space, Typography } from 'antd'
import DOMPurify from 'dompurify'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import PropertyDetailComment from './PropertyDetailComment.tsx'

function PropertyDetail() {
  const navigate = useNavigate()

  const { slug } = useParams<{ slug: string }>()
  const id = slug ? slug.split('-').pop() : ''

  const currentUser = useAuthStore((state) => state.user)

  const { propertyData, propertyIsLoading } = useProperty(Number(id))

  const descriptionCleanHTML = propertyData ? DOMPurify.sanitize(propertyData.description) : ''

  const { t } = useTranslation(['common', 'propertyDetail'])

  const items: DescriptionsProps['items'] = [
    {
      key: 'area',
      label: t('propertyDetail:property.area'),
      children: <span>{propertyData?.area} m&sup2;</span>
    },
    {
      key: 'numRooms',
      label: t('propertyDetail:property.numRooms'),
      children: propertyData?.numRooms
    },
    {
      key: 'createAt',
      label: t('propertyDetail:property.createAt'),
      children: formatDate(propertyData?.createdAt)
    },
    {
      key: 'amenities',
      label: t('propertyDetail:property.amenities'),
      children: propertyData?.amenities.join(', ')
    }
  ]

  useEffect(() => {
    if (propertyData && (propertyData.blocked || propertyData.hidden)) {
      navigate(ROUTER_NAMES.RENT_HOUSE)
    }
  }, [navigate, propertyData])

  return (
    <Container>
      <Row gutter={24}>
        <Col xs={24} md={16} className='mb-3 mt-5'>
          <CustomBreadcrumbs />
        </Col>

        <Col xs={24} md={8}>
          <Space className='mb-3 mt-5'>
            <Button
              size='small'
              onClick={() => navigate(ROUTER_NAMES.RENT_HOUSE)}
              className='group relative border-0 bg-white pl-4 pr-3 text-gray-500 transition-none hover:bg-slate-200 hover:text-gray-700'
            >
              <span>{t('propertyDetail:property.aboutList')}</span>
              <span className='absolute left-0 top-0 h-0 w-0 -translate-x-full border-b-[12px] border-l-0 border-r-[11px] border-t-[11px] border-solid border-transparent border-r-white transition-none group-hover:border-r-slate-200' />
            </Button>
            <Button
              size='small'
              className='group relative border-0 bg-blue-400 pl-3 pr-4 text-white transition-none hover:bg-blue-500 hover:text-white'
            >
              <span>{t('propertyDetail:property.nextProperty')}</span>
              <span className='absolute right-[2px] top-0 h-0 w-0 translate-x-full border-b-[12px] border-l-[11px] border-r-0 border-t-[11px] border-solid border-transparent border-l-blue-400 transition-none group-hover:border-l-blue-500' />
            </Button>
          </Space>
        </Col>

        <Col xs={24} md={16} className='mb-6 bg-white p-5'>
          {propertyIsLoading && (
            <section>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </section>
          )}

          {propertyData && (
            <section>
              <PropertyDetailImageSlider propertyImages={propertyData.propertyImages} />

              <Typography.Title level={4}>{propertyData.title}</Typography.Title>

              <Typography.Text>{propertyData.location}</Typography.Text>

              <Typography.Title level={3} className='mt-2 text-blue-600'>
                {formatCurrency(propertyData.price)}
              </Typography.Title>

              <Typography.Title level={4}>{t('propertyDetail:property.mainInfo')}</Typography.Title>

              <Typography.Paragraph>
                <Descriptions labelStyle={{ width: 120 }} bordered items={items} />
              </Typography.Paragraph>

              <Typography.Title level={4}>{t('propertyDetail:property.introduce')}</Typography.Title>
              <div dangerouslySetInnerHTML={{ __html: descriptionCleanHTML }} />

              <ReportButton propertyId={propertyData.id} />

              <Divider />

              <PropertyDetailComment propertyId={id} />
            </section>
          )}
        </Col>

        <Col xs={24} md={8}>
          <div className='sticky top-6 z-10 mb-6'>
            <PropertyDetailOwnerDetail
              userId={propertyData?.userId}
              propertyId={Number(id)}
              currentUser={currentUser}
            />
          </div>
        </Col>

        <Col span={24} className='p-0'>
          <RelatedProperty id={Number(id)} currentUser={currentUser} />
        </Col>
      </Row>
    </Container>
  )
}

export default PropertyDetail
