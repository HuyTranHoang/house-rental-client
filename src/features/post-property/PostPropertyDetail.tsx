import { useAmenities } from '@/hooks/useAmenity.ts'
import { Form, FormInstance, Input, Select, Spin, Typography } from 'antd'

const { Option } = Select

export default function PostPropertyDetail({ form }: { form: FormInstance }) {
  const { amenityData, amenityIsLoading } = useAmenities()

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
          <Select mode='multiple' placeholder='Chọn tiện nghi' style={{ width: '100%' }} optionFilterProp='children'>
            {amenityData?.map((amenity) => (
              <Option key={amenity.id} value={amenity.id}>
                {amenity.name}
              </Option>
            ))}
          </Select>
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
