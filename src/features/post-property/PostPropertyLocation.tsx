import { useCities } from '@/hooks/useCity.ts'
import { useDistricts } from '@/hooks/useDistrict.ts'
import { Form, FormInstance, Input, Select, Spin, Typography } from 'antd'
import { useState } from 'react'
import { PostPropertyFormData } from '@/features/post-property/PostProperty.tsx'

export default function PostPropertyLocation({ form }: { form: FormInstance<PostPropertyFormData> }) {
  const [selectedCity, setselectedCity] = useState<string | null>(null)

  const { cityData, cityIsLoading } = useCities()
  const { districtData, districtIsLoading } = useDistricts()

  const cityOptions = cityData?.map((city) => ({
    label: city.name,
    value: city.id
  }))

  const districtOptions = districtData
    ?.filter((district) => district.cityId === Number(selectedCity))
    .map((district) => ({
      label: district.name,
      value: district.id
    }))

  if (cityIsLoading || districtIsLoading) {
    return (
      <div className='flex h-40 items-center justify-center'>
        <Spin />
      </div>
    )
  }

  return (
    <>
      <Typography.Title level={4} className='mt-0 text-lg font-semibold'>
        Địa điểm
      </Typography.Title>

      <Form form={form} layout='vertical' className='space-y-4'>
        <Form.Item<PostPropertyFormData>
          name='city'
          label='Tỉnh/Thành phố'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn Tỉnh/Thành phố.'
            }
          ]}
        >
          <Select
            options={cityOptions}
            placeholder='Chọn Tỉnh/Thành phố'
            onChange={(value) => {
              setselectedCity(value)
              form.setFieldValue('district', undefined)
            }}
            className='w-full'
          />
        </Form.Item>

        <Form.Item<PostPropertyFormData>
          name='district'
          label='Quận/Huyện'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn Quận/Huyện.'
            }
          ]}
        >
          <Select options={districtOptions} placeholder='Chọn Quận/Huyện' disabled={!selectedCity} className='w-full' />
        </Form.Item>

        <Form.Item
          name='location'
          label='Địa chỉ cụ thể'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ cụ thể.'
            }
          ]}
        >
          <Input placeholder='Nhập địa chỉ cụ thể' />
        </Form.Item>
      </Form>
    </>
  )
}
