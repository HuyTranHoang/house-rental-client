import { PropertyDataSource } from '@/types/property.type.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { formatDateWithTime } from '@/utils/formatDate.ts'
import { EyeOutlined } from '@ant-design/icons'
import { Badge, Col, Descriptions, DescriptionsProps, Image, Modal, Row, Tag, Typography } from 'antd'
import DOMPurify from 'dompurify'
import { useTranslation } from 'react-i18next'

interface PostManagementPropertyDetailProps {
  property: PropertyDataSource | null
  isVisible: boolean
  onCancel: () => void
}

function PostManagementPropertyDetail({ property, isVisible, onCancel }: PostManagementPropertyDetailProps) {
  const { t } = useTranslation('postManagement')

  const modalItems: DescriptionsProps['items'] = [
    {
      key: 'roomType',
      label: t('propertyDetail.roomType'),
      children: property?.roomTypeName
    },
    {
      key: 'city',
      label: t('propertyDetail.city'),
      children: property?.cityName
    },
    {
      key: 'district',
      label: t('propertyDetail.district'),
      children: property?.districtName
    },
    {
      key: 'price',
      label: t('propertyDetail.price'),
      children: property ? formatCurrency(property.price) : ''
    },
    {
      key: 'location',
      label: t('propertyDetail.location'),
      children: property?.location,
      span: 2
    },
    {
      key: 'blocked',
      label: t('propertyDetail.status'),
      children: (
        <Badge
          status={property?.blocked ? 'error' : 'success'}
          text={property?.blocked ? t('propertyDetail.blocked') : t('propertyDetail.active')}
        />
      ),
      span: 3
    },
    {
      key: 'area',
      label: t('propertyDetail.area'),
      children: `${property?.area} m²`
    },
    {
      key: 'numRooms',
      label: t('propertyDetail.numRooms'),
      children: property?.numRooms
    },
    {
      key: 'createdAt',
      label: t('propertyDetail.createdAt'),
      children: formatDateWithTime(property?.createdAt)
    },
    {
      key: 'amenities',
      label: t('propertyDetail.amenities'),
      span: 3,
      children: (
        <>
          {property?.amenities.map((amenity, index) => (
            <Tag key={index} color='blue'>
              {amenity}
            </Tag>
          ))}
        </>
      )
    },
    {
      key: 'description',
      label: t('propertyDetail.description'),
      span: 3,
      children: (
        <>
          <Typography.Title level={5} style={{ margin: '0 0 12px' }}>
            {property?.title}
          </Typography.Title>
          <div dangerouslySetInnerHTML={{ __html: property ? DOMPurify.sanitize(property.description) : '' }} />
        </>
      )
    },
    {
      key: 'images',
      label: `${t('propertyDetail.images')} (${property?.propertyImages.length})`,
      children: (
        <Row gutter={[8, 8]}>
          <Image.PreviewGroup>
            {property?.propertyImages.map((image, index) => (
              <Col key={index} span={6}>
                <Image
                  preview={{
                    mask: (
                      <>
                        <EyeOutlined style={{ marginRight: 6 }} /> {t('propertyDetail.title')}
                      </>
                    )
                  }}
                  src={image}
                  alt={image}
                  className='size-48 object-cover p-2'
                />
              </Col>
            ))}
          </Image.PreviewGroup>
        </Row>
      )
    }
  ]

  return (
    <Modal
      title={t('propertyDetail.title')}
      open={isVisible}
      onCancel={onCancel}
      width={1000}
      okButtonProps={{ className: 'hidden' }}
      cancelText={t('propertyDetail.back')}
    >
      <Descriptions bordered items={modalItems} />
    </Modal>
  )
}

export default PostManagementPropertyDetail
