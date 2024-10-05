import { PropertyDataSource } from '@/types/property.type.ts'
import { formatCurrency } from '@/utils/formatCurrentcy.ts'
import { formatDateWithTime } from '@/utils/formatDate.ts'
import { EyeOutlined } from '@ant-design/icons'
import { Badge, Col, Descriptions, DescriptionsProps, Image, Modal, Row, Tag, Typography } from 'antd'
import DOMPurify from 'dompurify'

interface PostManagementPropertyDetailProps {
  property: PropertyDataSource | null
  isVisible: boolean
  onCancel: () => void
}

function PostManagementPropertyDetail({ property, isVisible, onCancel }: PostManagementPropertyDetailProps) {
  const modalItems: DescriptionsProps['items'] = [
    {
      key: 'roomType',
      label: 'Loại phòng',
      children: property?.roomTypeName
    },
    {
      key: 'city',
      label: 'Thành phố',
      children: property?.cityName
    },
    {
      key: 'district',
      label: 'Quận huyện',
      children: property?.districtName
    },
    {
      key: 'price',
      label: 'Giá',
      children: property ? formatCurrency(property.price) : ''
    },
    {
      key: 'location',
      label: 'Địa chỉ',
      children: property?.location,
      span: 2
    },
    {
      key: 'blocked',
      label: 'Trạng thái',
      children: (
        <Badge status={property?.blocked ? 'error' : 'success'} text={property?.blocked ? 'Khóa' : 'Hoạt động'} />
      ),
      span: 3
    },
    {
      key: 'area',
      label: 'Diện tích',
      children: `${property?.area} m²`
    },
    {
      key: 'numRooms',
      label: 'Số phòng ngủ',
      children: property?.numRooms
    },
    {
      key: 'createdAt',
      label: 'Ngày đăng',
      children: formatDateWithTime(property?.createdAt)
    },
    {
      key: 'amenities',
      label: 'Tiện ích',
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
      label: 'Mô tả',
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
      label: `Hình ảnh (${property?.propertyImages.length})`,
      children: (
        <Row gutter={[8, 8]}>
          <Image.PreviewGroup>
            {property?.propertyImages.map((image, index) => (
              <Col key={index} span={6}>
                <Image
                  preview={{
                    mask: (
                      <>
                        <EyeOutlined style={{ marginRight: 6 }} /> Chi tiết
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
      title='Chi tiết bài đăng'
      open={isVisible}
      onCancel={onCancel}
      width={1000}
      okButtonProps={{ className: 'hidden' }}
      cancelText='Quay lại'
    >
      <Descriptions bordered items={modalItems} />
    </Modal>
  )
}

export default PostManagementPropertyDetail
