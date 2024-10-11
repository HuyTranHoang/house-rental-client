import { PostPropertyFormData } from '@/features/post-property/PostProperty.tsx'
import { useCities } from '@/hooks/useCity.ts'
import { useDistricts } from '@/hooks/useDistrict.ts'
import { useRoomTypes } from '@/hooks/useRoomType.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { Descriptions, Image, Spin, Tag, Typography } from 'antd'
import DOMPurify from 'dompurify'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const { Title } = Typography

function PostPropertyOverview({ formData }: { formData: PostPropertyFormData }) {
  const { t } = useTranslation('postProperty')
  const { roomTypeData, roomTypeIsLoading } = useRoomTypes()
  const { cityData, cityIsLoading } = useCities()
  const { districtData, districtIsLoading } = useDistricts()

  const descriptionCleanHTML = formData ? DOMPurify.sanitize(formData.description) : ''

  const cityMap = useMemo(() => new Map(cityData?.map((city) => [city.id, city.name])), [cityData])
  const districtMap = useMemo(
    () => new Map(districtData?.map((district) => [district.id, district.name])),
    [districtData]
  )
  const roomTypeMap = useMemo(
    () => new Map(roomTypeData?.map((roomType) => [roomType.id, roomType.name])),
    [roomTypeData]
  )

  const renderAmenities = () =>
    formData.amenities?.map((amenity) => (
      <Tag key={amenity} color='blue'>
        {amenity}
      </Tag>
    ))

  const renderImages = () =>
    formData.images?.map((image, index) => (
      <Image
        key={index}
        src={image.thumbUrl}
        alt={`${t('overview.propertyImage')} ${index + 1}`}
        width={100}
        height={100}
        className='object-cover p-1'
      />
    ))

  if (cityIsLoading || districtIsLoading || roomTypeIsLoading) {
    return <Spin size='large' />
  }

  return (
    <>
      <Title level={3} className='mt-0'>
        {t('overview.reviewPropertyInfo')}
      </Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item label={t('overview.title')}>{formData.title}</Descriptions.Item>
        <Descriptions.Item label={t('overview.description')}>
          <div dangerouslySetInnerHTML={{ __html: descriptionCleanHTML }} />
        </Descriptions.Item>
        <Descriptions.Item label={t('overview.address')}>{formData.location}</Descriptions.Item>
        <Descriptions.Item label={t('overview.price')}>{formatCurrency(Number(formData.price))}</Descriptions.Item>
        <Descriptions.Item label={t('overview.area')}>{formData.area} m²</Descriptions.Item>
        <Descriptions.Item label={t('overview.numRooms')}>{formData.numRooms}</Descriptions.Item>
        <Descriptions.Item label={t('overview.city')}>{cityMap.get(Number(formData.city))}</Descriptions.Item>
        <Descriptions.Item label={t('overview.district')}>
          {districtMap.get(Number(formData.district))}
        </Descriptions.Item>
        <Descriptions.Item label={t('overview.roomType')}>
          {roomTypeMap.get(Number(formData.roomType))}
        </Descriptions.Item>
        <Descriptions.Item label={t('overview.amenities')}>{renderAmenities()}</Descriptions.Item>
        <Descriptions.Item label={t('overview.images')}>{renderImages()}</Descriptions.Item>
      </Descriptions>
    </>
  )
}

export default PostPropertyOverview
