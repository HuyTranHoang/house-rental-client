import { PostPropertyFormData } from '@/features/post-property/PostProperty.tsx'
import { useCities } from '@/hooks/useCity.ts'
import { useDistricts } from '@/hooks/useDistrict.ts'
import { Form, FormInstance, Input, Select, Spin, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function PostPropertyLocation({ form }: { form: FormInstance<PostPropertyFormData> }) {
  const { t } = useTranslation('postProperty')

  const [selectedCity, setselectedCity] = useState<string | null>(form.getFieldValue('city'))

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
        {t('form.location')}
      </Typography.Title>

      <Form form={form} layout='vertical' className='space-y-4'>
        <Form.Item<PostPropertyFormData>
          name='city'
          label={t('form.provinceCity')}
          rules={[
            {
              required: true,
              message: t('form.provinceCityRequired')
            }
          ]}
        >
          <Select
            options={cityOptions}
            placeholder={t('form.provinceCityPlaceholder')}
            onChange={(value) => {
              setselectedCity(value)
              form.setFieldValue('district', undefined)
            }}
            className='w-full'
          />
        </Form.Item>

        <Form.Item<PostPropertyFormData>
          name='district'
          label={t('form.district')}
          rules={[
            {
              required: true,
              message: t('form.districtRequired')
            }
          ]}
        >
          <Select
            options={districtOptions}
            placeholder={t('form.districtPlaceholder')}
            disabled={!selectedCity}
            className='w-full'
          />
        </Form.Item>

        <Form.Item
          name='location'
          label={t('form.address')}
          rules={[
            {
              required: true,
              message: t('form.addressRequired')
            }
          ]}
        >
          <Input placeholder={t('form.addressPlaceholder')} />
        </Form.Item>
      </Form>
    </>
  )
}
