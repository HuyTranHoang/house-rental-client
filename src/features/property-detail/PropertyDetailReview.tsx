import { useCreateReview, useDeleteReview, useReview } from '@/hooks/useReview'
import { ReviewFieldType } from '@/models/review.type'
import { formatDate } from '@/utils/formatDate'
import { CalendarOutlined, CommentOutlined, DeleteOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Form, FormProps, Input, List, Rate, Space, Tooltip, Typography } from 'antd'
import { useState } from 'react'

const { TextArea } = Input

const ratingDesc = ['Rất tệ 😭', 'Tệ 😢', 'Bình thường 😊', 'Tốt 😀', 'Tuyệt vời! 😆']

interface PropertyDetailReviewProps {
  propertyId: string | undefined
}

function PropertyDetailReview({ propertyId }: PropertyDetailReviewProps) {
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(5)

  const [form] = Form.useForm()

  const { reviewData, reviewIsLoading } = useReview(Number(propertyId), pageNumber, pageSize)
  const { createReview, createReviewIsPending } = useCreateReview()
  const { deleteReview, deleteReviewIsPending } = useDeleteReview()

  const reviewListData = reviewData
    ? [
        ...reviewData.data.map((review) => ({
          avatar: review.userAvatar
            ? review.userAvatar
            : `https://api.dicebear.com/7.x/miniavs/svg?seed=${review.userId}`,
          title: (
            <Space size='large'>
              <Typography.Text strong>{review.userName}</Typography.Text>
              <Rate disabled value={review.rating} />
            </Space>
          ),
          description: (
            <Flex vertical>
              <Typography.Text>{review.comment}</Typography.Text>
              <Flex justify='space-between' align='center'>
                <Typography.Text type='secondary' className='mt-2 text-xs'>
                  <CalendarOutlined /> {formatDate(review.createdAt)}
                </Typography.Text>

                <Tooltip title='Xóa đánh giá'>
                  <Button
                    danger
                    size='small'
                    type='text'
                    icon={<DeleteOutlined />}
                    onClick={() => deleteReview(review.id)}
                  >
                    Xóa -- Chưa hoàn thiện [Phân quyền. Modal xác nhận]
                  </Button>
                </Tooltip>
              </Flex>
            </Flex>
          )
        }))
      ]
    : []

  const onFinish: FormProps<ReviewFieldType>['onFinish'] = (values) => {
    createReview({ ...values, propertyId: Number(propertyId) })
    form.resetFields()
  }

  return (
    <>
      <Typography.Title level={4} className='mt-2'>
        Đánh giá
      </Typography.Title>
      {reviewListData.length > 0 ? (
        <List
          pagination={{
            total: reviewData?.pageInfo.totalElements,
            pageSize: pageSize,
            current: pageNumber,
            showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} đánh giá`,
            onShowSizeChange: (_, size) => setPageSize(size),
            onChange: (page) => setPageNumber(page)
          }}
          dataSource={reviewListData}
          loading={reviewIsLoading || createReviewIsPending || deleteReviewIsPending}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta avatar={<Avatar src={item.avatar} />} title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      ) : (
        <Typography.Text type='secondary'>Chưa có đánh giá nào cho bất động sản này!!!</Typography.Text>
      )}

      <Typography.Title level={5}>
        Để lại đánh giá <CommentOutlined />
      </Typography.Title>
      <Form form={form} layout='vertical' name='feedbackForm' autoComplete='off' onFinish={onFinish}>
        <Form.Item<ReviewFieldType>
          name='comment'
          rules={[
            { required: true, message: 'Vui lòng nhập đánh giá của bạn' },
            {
              min: 10,
              message: 'Đánh giá phải có ít nhất 10 ký tự'
            },
            {
              max: 500,
              message: 'Đánh giá không được vượt quá 500 ký tự'
            }
          ]}
        >
          <TextArea rows={4} placeholder='Đánh giá của bạn về bất động sản này...' />
        </Form.Item>

        <Form.Item<ReviewFieldType>
          name='rating'
          label='Số sao đánh giá'
          rules={[{ required: true, message: 'Vui lòng chọn số sao đánh giá!' }]}
        >
          <Rate allowClear={false} tooltips={ratingDesc} />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={createReviewIsPending}>
            Gửi đánh giá
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default PropertyDetailReview
