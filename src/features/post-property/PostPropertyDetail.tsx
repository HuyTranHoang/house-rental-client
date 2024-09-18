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
        <Form.Item
          name='numRooms'
          label='Số phòng ngủ'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số phòng ngủ'
            },
            {
              pattern: new RegExp(/^[0-9]+$/),
              message: "Vui lòng nhập số cho 'số phòng ngủ'"
            }
          ]}
        >
          <Input placeholder='Nhập số phòng ngủ' />
        </Form.Item>

        <Form.Item
          name='amenities'
          label='Tiện nghi'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn ít nhất một tiện nghi'
            }
          ]}
        >
          <Select
            options={amenityOptions}
            mode='multiple'
            placeholder='Chọn tiện nghi'
            style={{ width: '100%' }}
            optionFilterProp='children'
          />
        </Form.Item>

        <Form.Item
          name='area'
          label='Diện tích'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập diện tích bất động sản'
            },
            {
              pattern: new RegExp(/^[0-9]+$/),
              message: "Vui lòng nhập số cho 'diện tích'"
            }
          ]}
        >
          <Input placeholder='Nhập diện tích bất động sản' addonAfter='m²' />
        </Form.Item>

        <Form.Item
          name='price'
          label='Giá'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập giá cho thuê'
            },
            {
              pattern: new RegExp(/^[0-9]+$/),
              message: "Vui lòng nhập số cho 'giá'"
            }
          ]}
        >
          <Input placeholder='Nhập giá cho thuê' addonAfter='₫ / tháng' />
        </Form.Item>
      </Form>
    </>
  )
}
