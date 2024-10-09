import ErrorFetching from '@/components/ErrorFetching.tsx'
import PostManagementTable from '@/features/post-management/PostManagementTable.tsx'
import { usePropertiesByUserId } from '@/hooks/useProperty.ts'
import useAuthStore from '@/store/authStore.ts'
import { PropertyDataSource, PropertyStatus } from '@/types/property.type.ts'
import Container from '@/ui/Container'
import { CheckCircleOutlined, CloseSquareOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Card, Col, Divider, Flex, Input, Row, TableProps, Tabs, TabsProps, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const PostManagement = () => {
  const { t } = useTranslation('postManagement')
  const curerntUser = useAuthStore((state) => state.user)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(PropertyStatus.PENDING)
  const [sortBy, setSortBy] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const { data, isError, isLoading } = usePropertiesByUserId(
    search,
    status,
    curerntUser?.id,
    sortBy,
    pageNumber,
    pageSize
  )

  const dataSource: PropertyDataSource[] = data
    ? data.data.map((item, idx) => ({
        ...item,
        index: (pageNumber - 1) * pageSize + idx + 1,
        key: item.id
      }))
    : []

  const handleTableChange: TableProps<PropertyDataSource>['onChange'] = (_, __, sorter) => {
    if (!Array.isArray(sorter) && sorter.order) {
      const order = sorter.order === 'ascend' ? 'Asc' : 'Desc'
      setSortBy(`${sorter.columnKey}${order}`)
    } else {
      setSortBy('')
    }
  }

  if (isError) {
    return <ErrorFetching />
  }

  const items: TabsProps['items'] = [
    {
      key: 'PENDING',
      label: (
        <>
          <ExclamationCircleOutlined /> {t('pending')}
        </>
      )
    },
    {
      key: 'APPROVED',
      label: (
        <>
          <CheckCircleOutlined /> {t('approved')}
        </>
      )
    },
    {
      key: 'REJECTED',
      label: (
        <>
          <CloseSquareOutlined /> {t('rejected')}
        </>
      )
    }
  ]

  return (
    <Container>
      <Row gutter={24}>
        <Col xs={24} md={24}>
          <Card
            title={
              <Flex align='center' gap={12}>
                <Typography.Title level={4} className='m-0'>
                  {t('title')}
                </Typography.Title>
                <Divider type='vertical' className='h-6' />
                <Input.Search
                  placeholder={t('searchPlaceholder')}
                  allowClear
                  enterButton
                  onSearch={(value) => setSearch(value)}
                  className='w-96'
                />
              </Flex>
            }
            className='mb-10 mt-12'
          >
            <Tabs
              defaultActiveKey='PENDING'
              items={items}
              onChange={(key) => {
                setStatus(key as PropertyStatus)
                setPageNumber(1)
              }}
            />

            <PostManagementTable
              dataSource={dataSource}
              isLoading={isLoading}
              handleTableChange={handleTableChange}
              paginationProps={{
                total: data?.pageInfo.totalElements,
                pageSize: pageSize,
                current: pageNumber,
                showTotal: (total, range) => `${range[0]}-${range[1]} ${t('of')} ${total} ${t('properties')}`,
                onShowSizeChange: (_, size) => setPageSize(size),
                onChange: (page) => setPageNumber(page)
              }}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default PostManagement
