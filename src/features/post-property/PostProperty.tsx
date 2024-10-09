import PostPropertyDescription from '@/features/post-property/PostPropertyDescription'
import PostPropertyDetail from '@/features/post-property/PostPropertyDetail'
import PostPropertyImage from '@/features/post-property/PostPropertyImage'
import PostPropertyLocation from '@/features/post-property/PostPropertyLocation'
import PostPropertyOverview from '@/features/post-property/PostPropertyOverview'
import PostPropertyRoomType from '@/features/post-property/PostPropertyRoomType'
import PostPropertySuccess from '@/features/post-property/PostPropertySuccess.tsx'
import axiosInstance from '@/inteceptor/axiosInstance'
import useAuthStore from '@/store/authStore.ts'
import Container from '@/ui/Container'
import { SendOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, Card, Col, Flex, Form, Row, Space, Steps } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import './post-property.css'

export interface OriginFileObj extends Blob {
  uid: string
}

export interface Image {
  uid: string
  lastModified: number
  name: string
  size: number
  type: string
  percent: number
  originFileObj: OriginFileObj
  thumbUrl: string
}

export interface PostPropertyFormData {
  roomType: string
  city: string
  district: string
  location: string
  numRooms: string
  area: string
  price: string
  amenities: string[]
  title: string
  description: string
  images: Image[]
  thumbnailImage: Image

  [key: string]: string | string[] | Image[] | Image
}

export default function PostProperty() {
  const currentUser = useAuthStore((state) => state.user)
  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm<PostPropertyFormData>()
  const [formData, setFormData] = useState<PostPropertyFormData>({} as PostPropertyFormData)

  const { t } = useTranslation('postProperty')

  const stepItems = [
    {
      title: t('steps.propertyType.title'),
      description: t('steps.propertyType.description')
    },
    {
      title: t('steps.location.title'),
      description: t('steps.location.description')
    },
    {
      title: t('steps.details.title'),
      description: t('steps.details.description')
    },
    {
      title: t('steps.titleDescription.title'),
      description: t('steps.titleDescription.description')
    },
    {
      title: t('steps.images.title'),
      description: t('steps.images.description')
    },
    {
      title: t('steps.confirmation.title'),
      description: t('steps.confirmation.description')
    }
  ]

  const cartTitle = current > stepItems.length ? null : 'Đăng tin bất động sản'

  const postPropertyMutation = useMutation({
    mutationFn: (data: FormData) => {
      return axiosInstance.postForm('/api/properties', data)
    },
    onSuccess: () => {
      setCurrent(stepItems.length + 1)
      setFormData({} as PostPropertyFormData)
      form.resetFields()
    },
    onError: (error) => {
      console.error('Error posting property:', error)
      toast.error(t('toast.error.message'))
    }
  })

  const handleNext = async () => {
    try {
      const values = await form.validateFields()

      if (values.price) {
        values.price = values.price.replace(/,/g, '')
      }
      if (values.area) {
        values.area = values.area.replace(/,/g, '')
      }

      if (current === 4 && !values.thumbnailImage) {
        toast.error(t('form.thumbmailRequired'))
        return
      }

      setFormData({ ...formData, ...values })
      if (current < stepItems.length - 1) {
        setCurrent(current + 1)
      }
      console.log('Success:', values)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const handlePrev = () => {
    setFormData({ ...formData, ...form.getFieldsValue() })
    if (current > 0) {
      setCurrent(current - 1)
    }
  }

  const handleFinish = async () => {
    if (!currentUser) return

    const formDataToSend = new FormData()
    formDataToSend.append('title', formData.title)
    formDataToSend.append('description', formData.description)
    formDataToSend.append('price', formData.price)
    formDataToSend.append('location', formData.location)
    formDataToSend.append('area', formData.area)
    formDataToSend.append('numRooms', formData.numRooms)
    formDataToSend.append('userId', currentUser.id.toString())
    formDataToSend.append('cityId', formData.city)
    formDataToSend.append('districtId', formData.district)
    formDataToSend.append('roomTypeId', formData.roomType)

    formData.amenities.forEach((amenity) => {
      formDataToSend.append('amenities', amenity)
    })

    formData.images.forEach((image) => {
      if (image.uid === formData.thumbnailImage.uid) return

      formDataToSend.append('images', image.originFileObj)
    })

    formDataToSend.append('thumbnailImage', formData.thumbnailImage.originFileObj)

    formDataToSend.append('status', 'PENDING')

    await postPropertyMutation.mutateAsync(formDataToSend)
  }

  useEffect(() => {
    form.setFieldsValue(formData)
  }, [current, form, formData])

  return (
    <Container>
      {/*<Card>*/}
      {/*  <pre>{JSON.stringify(formData, null, 2)}</pre>*/}
      {/*</Card>*/}
      <Card title={cartTitle} className='mb-10 mt-12'>
        <Row className='overflow-hidden rounded-lg bg-gray-50'>
          {current < 6 && (
            <>
              <Col xs={24} md={8} className='border-0 border-r border-solid border-gray-200 p-6 shadow-md'>
                <Steps current={current} direction='vertical' items={stepItems} />
              </Col>
              <Col xs={24} md={16} className='bg-white p-6'>
                <Flex vertical className='min-h-[400px] border-r'>
                  {current === 0 && <PostPropertyRoomType form={form} />}
                  {current === 1 && <PostPropertyLocation form={form} />}
                  {current === 2 && <PostPropertyDetail form={form} />}
                  {current === 3 && <PostPropertyDescription form={form} />}
                  {current === 4 && <PostPropertyImage form={form} />}
                  {current === 5 && <PostPropertyOverview formData={formData} />}

                  <Flex className='mt-auto items-center pt-8'>
                    {current <= stepItems.length && (
                      <Space wrap style={{ width: '100%' }}>
                        <Button onClick={handlePrev} icon={<StepBackwardOutlined />} danger disabled={current === 0}>
                          {t('button.back')}
                        </Button>
                        <Button
                          onClick={handleNext}
                          icon={<StepForwardOutlined />}
                          iconPosition='end'
                          type='primary'
                          disabled={current === stepItems.length - 1}
                        >
                          {t('button.next')}
                        </Button>

                        {current === stepItems.length - 1 && (
                          <Button
                            icon={<SendOutlined />}
                            onClick={handleFinish}
                            type='primary'
                            className='bg-green-500 hover:bg-green-400'
                            loading={postPropertyMutation.isPending}
                          >
                            {t('button.submit')}
                          </Button>
                        )}
                      </Space>
                    )}
                  </Flex>
                </Flex>
              </Col>
            </>
          )}

          {current > stepItems.length && (
            <Col xs={24} md={24}>
              <PostPropertySuccess setCurrent={setCurrent} />
            </Col>
          )}
        </Row>
      </Card>
    </Container>
  )
}
