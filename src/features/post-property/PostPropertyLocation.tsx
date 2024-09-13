import { useCities } from '@/hooks/useCity.ts'
import { useDistricts } from '@/hooks/useDistrict.ts'
import { Form, FormInstance, Input, Select, Spin, Typography } from 'antd'
import { useState } from 'react'

const { Option } = Select

export default function PostPropertyLocation({ form }: { form: FormInstance }) {
  const [selectedCity, setselectedCity] = useState<string | null>(null)

  const { cityData, cityIsLoading } = useCities()
  const { districtData, districtIsLoading } = useDistricts()

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
        <Form.Item name='city' label='Tỉnh/Thành phố' required>
          <Select
            placeholder='Chọn Tỉnh/Thành phố'
            onChange={(value) => {
              setselectedCity(value)
              form.setFieldValue('district', undefined)
              console.log(form.getFieldValue('city'))
              console.log(form.getFieldValue('district'))
            }}
            className='w-full'
          >
            {cityData?.map((city) => (
              <Option key={city.id} value={city.id}>
                {city.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name='district' label='Quận/Huyện' required>
          <Select placeholder='Chọn Quận/Huyện' disabled={!selectedCity} className='w-full'>
            {districtData
              ?.filter((district) => district.cityId === Number(selectedCity))
              .map((district) => (
                <Option key={district.id} value={district.id}>
                  {district.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item name='location' label='Địa chỉ cụ thể' required>
          <Input placeholder='Nhập địa chỉ cụ thể' />
        </Form.Item>
      </Form>
    </>
  )
}
