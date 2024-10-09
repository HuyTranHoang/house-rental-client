import { useComments, useCreateComment, useDeleteComment } from '@/hooks/useComment.ts'
import useAuthStore from '@/store/authStore.ts'
import { Comment, CommentFieldType } from '@/types/comment.type.ts'
import { formatDate } from '@/utils/formatDate'
import { CalendarOutlined, CommentOutlined, DeleteOutlined, WarningOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Form, FormProps, Input, List, Modal, Space, Tooltip, Typography } from 'antd'
import { useState } from 'react'
import CommentReportButton from './CommentReportButton'
import { useTranslation } from 'react-i18next'

const { TextArea } = Input

interface PropertyDetailReviewProps {
  propertyId: string | undefined
}

function PropertyDetailComment({ propertyId }: PropertyDetailReviewProps) {
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [open, setOpen] = useState(false)
  const [currentComment, setcurrentComment] = useState<Comment | undefined>(undefined)
  const haveDeleteReviewPrivilege = useAuthStore((state) => state.haveDeleteReviewPrivilege)

  const [form] = Form.useForm()

  const { commentData, commentIsLoading } = useComments(Number(propertyId), pageNumber, pageSize)
  const { createComment, createCommentIsPending } = useCreateComment()
  const { deleteComment, deleteCommentIsPending } = useDeleteComment()

  const { t } = useTranslation(['common', 'propertyDetail'])

  const commentListData = commentData
    ? [
        ...commentData.data.map((comment) => ({
          avatar: comment.userAvatar
            ? comment.userAvatar
            : `https://api.dicebear.com/7.x/miniavs/svg?seed=${comment.userId}`,
          title: <Typography.Text strong>@{comment.userName}</Typography.Text>,
          description: (
            <Flex vertical>
              <Typography.Text>{comment.comment}</Typography.Text>
              <Flex justify='space-between' align='center'>
                <Typography.Text type='secondary' className='mt-2 text-xs'>
                  <CalendarOutlined /> {formatDate(comment.createdAt)}
                </Typography.Text>

                <Space>
                  <CommentReportButton commentId={comment.id} />

                  {haveDeleteReviewPrivilege && (
                    <Tooltip title={t('propertyDetail:component.DELETE_COMMENT')}>
                      <Button
                        type='text'
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          setcurrentComment(comment)
                          setOpen(true)
                        }}
                      />
                    </Tooltip>
                  )}
                </Space>
              </Flex>
            </Flex>
          )
        }))
      ]
    : []

  const onFinish: FormProps<CommentFieldType>['onFinish'] = (values) => {
    createComment({ ...values, propertyId: Number(propertyId) })
    form.resetFields()
  }

  return (
    <>
      <Typography.Title level={4} className='mt-2'>
        {t('propertyDetail:component.COMMENT_INFO')}
      </Typography.Title>
      {commentListData.length > 0 ? (
        <List
          pagination={{
            total: commentData?.pageInfo.totalElements,
            pageSize: pageSize,
            current: pageNumber,
            showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} bình luận`,
            onShowSizeChange: (_, size) => setPageSize(size),
            onChange: (page) => setPageNumber(page)
          }}
          dataSource={commentListData}
          loading={commentIsLoading || createCommentIsPending || deleteCommentIsPending}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta avatar={<Avatar src={item.avatar} />} title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      ) : (
        <Typography.Text type='secondary'>{t('propertyDetail:component.NOTIFI_COMMENT')}</Typography.Text>
      )}

      <Typography.Title level={5}>
        {t('propertyDetail:component.COMMENT')} <CommentOutlined />
      </Typography.Title>
      <Form form={form} layout='vertical' name='feedbackForm' autoComplete='off' onFinish={onFinish}>
        <Form.Item<CommentFieldType>
          name='comment'
          validateTrigger={['onBlur']}
          rules={[
            { required: true, message: t('propertyDetail:component.COMMENT_REQUIRED') },
            {
              min: 10,
              message: t('propertyDetail:component.COMMENT_MIN')
            },
            {
              max: 500,
              message: t('propertyDetail:component.COMMENT_MAX')
            }
          ]}
        >
          <TextArea rows={4} placeholder={t('propertyDetail:component.COMMENT_ABOUT')} />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={createCommentIsPending}>
            {t('propertyDetail:component.COMMENT_SEND')}
          </Button>
        </Form.Item>
      </Form>

      {currentComment && (
        <Modal
          title={
            <Flex vertical align='center'>
              <div className='flex size-12 items-center justify-center rounded-full bg-red-100'>
                <WarningOutlined className='text-2xl text-red-600' />
              </div>
              <Typography.Title level={3} className='text-gray-600'>
                {t('propertyDetail:component.CONFIRM_DELETE')}
              </Typography.Title>
            </Flex>
          }
          open={open}
          onOk={() => {
            deleteComment(currentComment.id)
            setOpen(false)
            setcurrentComment(undefined)
          }}
          onCancel={() => setOpen(false)}
          okText={t('propertyDetail:component.DELETE_COMMENT')}
          cancelText={t('propertyDetail:component.BACK')}
          okButtonProps={{ className: 'bg-red-500 hover:bg-red-400 hover:border-red-600' }}
        >
          <Typography.Paragraph className='mb-1 mt-2'>
            {t('propertyDetail:component.CONFIRM_ACCESS_DELETE')} <span className='font-semibold'>{currentComment.userName}</span>?
          </Typography.Paragraph>

          <Typography.Paragraph className='mb-0 text-gray-500'>
            {t('propertyDetail:component.WARRING_NOTIFI')}
          </Typography.Paragraph>
        </Modal>
      )}
    </>
  )
}

export default PropertyDetailComment
