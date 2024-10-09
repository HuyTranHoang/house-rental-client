import { PostPropertyFormData } from '@/features/post-property/PostProperty.tsx'
import { useAmenities } from '@/hooks/useAmenity.ts'
import { Form, FormInstance, Input, Select, Spin, Typography } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const formatNumber = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default function PostPropertyDetail({ form }: { form: FormInstance<PostPropertyFormData> }) {
  const { t } = useTranslation('postProperty')

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
        {t('form.details')}
      </Typography.Title>

      <Form form={form} layout='vertical' className='space-y-4'>
        <Form.Item<PostPropertyFormData>
          name='numRooms'
          label={t('form.numRooms')}
          rules={[
            {
              required: true,
              message: t('form.numRoomsRequired')
            },
            {
              pattern: new RegExp(/^[0-9]+$/),
              message: t('form.numRoomsPattern')
            }
          ]}
        >
          <Input placeholder={t('form.numRomsPlaceholder')} />
        </Form.Item>

        <Form.Item<PostPropertyFormData>
          name='amenities'
          label={t('form.amenities')}
          rules={[
            {
              required: true,
              message: t('form.amenitiesRequired')
            }
          ]}
        >
          <Select
            options={amenityOptions}
            mode='multiple'
            placeholder={t('form.amenitiesPlaceholder')}
            style={{ width: '100%' }}
            optionFilterProp='children'
          />
        </Form.Item>

        <Form.Item<PostPropertyFormData>
          name='area'
          label={t('form.area')}
          rules={[
            {
              required: true,
              message: t('form.areaRequired')
            },
            {
              pattern: new RegExp(/^[0-9,]+$/),
              message: t('form.areaPattern')
            },
            {
              max: 7,
              message: t('form.areaMax')
            }
          ]}
        >
          <Input
            placeholder={t('form.areaPlaceholder')}
            addonAfter='m²'
            value={areaValue}
            onChange={handleAreaChange}
          />
        </Form.Item>

        <Form.Item<PostPropertyFormData>
          name='price'
          label={t('form.price')}
          rules={[
            {
              required: true,
              message: t('form.priceRequired')
            },
            {
              pattern: new RegExp(/^[0-9,]+$/),
              message: t('form.pricePattern')
            },
            {
              max: 12,
              message: t('form.priceMax')
            }
          ]}
        >
          <Input
            placeholder={t('form.pricePlaceholder')}
            addonAfter={t('form.priceAddon')}
            value={priceValue}
            onChange={handlePriceChange}
          />
        </Form.Item>
      </Form>
    </>
  )
}
