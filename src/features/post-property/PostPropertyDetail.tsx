import { PostPropertyFormData } from '@/features/post-property/PostProperty.tsx'
import { useAmenities } from '@/hooks/useAmenity.ts'
import { Form, FormInstance, Input, Select, Spin, Typography } from 'antd'
import React, { useState } from 'react'

const formatNumber = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default function PostPropertyDetail({ form }: { form: FormInstance<PostPropertyFormData> }) {
  const { amenityData, amenityIsLoading } = useAmenities()
  const [areaValue, setAreaValue] = useState('')
  const [priceValue, setPriceValue] = useState('')

  const amenityOptions = amenityData?.map((amenity) => ({
    label: amenity.name,
    value: amenity.name
  }))

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const formattedValue = formatNumber(value.replace(/,/g, ''))
    setAreaValue(formattedValue)
    form.setFieldsValue({ area: formattedValue })
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const formattedValue = formatNumber(value.replace(/,/g, ''))
    setPriceValue(formattedValue)
    form.setFieldsValue({ price: formattedValue })
  }

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
        <Form.Item<PostPropertyFormData>
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

        <Form.Item<PostPropertyFormData>
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

        <Form.Item<PostPropertyFormData>
          name='area'
          label='Diện tích'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập diện tích bất động sản'
            },
            {
              pattern: new RegExp(/^[0-9,]+$/),
              message: "Vui lòng nhập số cho 'diện tích'"
            },
            {
              max: 7,
              message: 'Diện tích không được vượt quá 6 chữ số'
            }
          ]}
        >
          <Input
            placeholder='Nhập diện tích bất động sản'
            addonAfter='m²'
            value={areaValue}
            onChange={handleAreaChange}
          />
        </Form.Item>

        <Form.Item<PostPropertyFormData>
          name='price'
          label='Giá'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập giá cho thuê'
            },
            {
              pattern: new RegExp(/^[0-9,]+$/),
              message: "Vui lòng nhập số cho 'giá'"
            },
            {
              max: 12,
              message: 'Giá không được vượt quá 9 chữ số'
            }
          ]}
        >
          <Input
            placeholder='Nhập giá cho thuê'
            addonAfter='₫ / tháng'
            value={priceValue}
            onChange={handlePriceChange}
          />
        </Form.Item>
      </Form>
    </>
  )
}
