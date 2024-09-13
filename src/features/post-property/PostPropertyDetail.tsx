import { useAmenities } from '@/hooks/useAmenity.ts'
import { Form, FormInstance, Input, Select, Spin, Typography } from 'antd'

export default function PostPropertyDetail({ form }: { form: FormInstance }) {
  const { amenityData, amenityIsLoading } = useAmenities()

  const amenityOptions = amenityData?.map((amenity) => ({
    label: amenity.name,
    value: amenity.id
  }))

  if (amenityIsLoading) {
    return (
      <div className='flex h-40 items-center justify-center'>
        <Spin />
      </div>
    )
  }

  return (
    <>
      <Typography.Title level={4} className='mt-0 text-lg font-semibold'>
        Thông tin chi tiết
      </Typography.Title>

      <Form form={form} layout='vertical' className='space-y-4'>
        <Form.Item name='numRooms' label='Số phòng ngủ' required>
          <Input placeholder='Nhập số phòng ngủ' />
        </Form.Item>

        <Form.Item name='amenities' label='Tiện nghi' required>
          <Select
            options={amenityOptions}
            mode='multiple'
            placeholder='Chọn tiện nghi'
            style={{ width: '100%' }}
            optionFilterProp='children'
          />
        </Form.Item>

        <Form.Item name='area' label='Diện tích' required>
          <Input placeholder='Nhập diện tích bất động sản' addonAfter='m²' />
        </Form.Item>

        <Form.Item name='price' label='Giá' required>
          <Input placeholder='Nhập giá cho thuê' addonAfter='₫ / tháng' />
        </Form.Item>
      </Form>
    </>
  )
}
