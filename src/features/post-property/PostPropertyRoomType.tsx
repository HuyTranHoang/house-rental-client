import { PostPropertyFormData } from '@/features/post-property/PostProperty.tsx'
import { useRoomTypes } from '@/hooks/useRoomType'
import { Form, FormInstance, Radio, Spin, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export default function PostPropertyRoomType({ form }: { form: FormInstance<PostPropertyFormData> }) {
  const { t } = useTranslation('postProperty')

  const { roomTypeData, roomTypeIsLoading } = useRoomTypes()

  if (roomTypeIsLoading) {
    return (
      <div className='flex h-40 items-center justify-center'>
        <Spin />
      </div>
    )
  }

  return (
    <>
      <Typography.Title level={4} className='mt-0 text-lg font-semibold'>
        <span className='text-red-500'>*</span> {t('form.selectRoomType')}
      </Typography.Title>

      <Form form={form}>
        <Form.Item<PostPropertyFormData>
          name='roomType'
          rules={[{ required: true, message: t('form.roomTypeRequired') }]}
          preserve
        >
          <Radio.Group optionType='button' buttonStyle='solid' className='w-full space-y-2'>
            {roomTypeData?.map((roomType) => (
              <Radio key={roomType.id} value={roomType.id} className='w-full rounded-none'>
                <div className='hover:bg-primary/10 w-full'>{roomType.name}</div>
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      </Form>
    </>
  )
}
