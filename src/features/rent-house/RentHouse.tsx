import CustomBreadcrumbs from '@/components/CustomBreadcrumbs.tsx'
import RentHouseFilter from '@/features/rent-house/RentHouseFilter.tsx'
import { useProperties, usePropertyFilters } from '@/hooks/useProperty.ts'
import { Property } from '@/types/property.type.ts'
import RightSideBar from '@/ui/RightSideBar.tsx'
import { BookOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Empty, Flex, Pagination, Row, Skeleton, Typography } from 'antd'
import { useMemo, useRef } from 'react'
import RentHouseCardItem from './RentHouseCardItem.tsx'
import PriorityCardItem from '@/features/rent-house/PriorityCartItem.tsx'

function RentHouse() {
  const {
    search,
    cityId,
    districtId,
    roomTypeId,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    numOfDays,
    sortBy,
    pageNumber,
    pageSize,
    setFilters
  } = usePropertyFilters()

  const { data, isError, isLoading } = useProperties(
    search,
    cityId,
    districtId,
    roomTypeId,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    numOfDays,
    sortBy,
    pageNumber,
    pageSize
  )

  const myRef = useRef<null | HTMLDivElement>(null);

  const startIndex = useMemo(() => (pageNumber - 1) * pageSize, [pageNumber, pageSize])
  const endIndex = useMemo(() => (data ? startIndex + data.data.length : 0), [data, startIndex])
  const range = useMemo(() => [startIndex + 1, endIndex], [startIndex, endIndex])
  const total = useMemo(() => (data ? data.pageInfo.totalElements : 0), [data])

  return (
    <>
      <RentHouseFilter />

      <CustomBreadcrumbs />

      <Row>
        <Col xs={24} md={18}>
          <Typography.Title level={4} className='mt-3.5' ref={myRef}>
            Cho Thuê Nhà Đất Giá Rẻ, Tiện Nghi, Uy Tín, Cập Nhật Mới Nhất T9/2024
          </Typography.Title>

          <Flex align='center' justify='space-between' className='rounded-lg bg-[#f0f0f0] p-2 pr-4'>
            {isLoading ? (
              <Skeleton.Button active={true} size='small' shape='round' className='mr-2 w-64' />
            ) : (
              <>
                {total > 0 && (
                  <div>
                    Hiển thị <strong>{`${range[0]}-${range[1]}`}</strong> trong <strong>{`${total}`}</strong> tin đăng
                  </div>
                )}

                {total === 0 && <div>Không có tin đăng nào phù hợp</div>}
              </>
            )}

            <Button type='default' className='bg-[#f0f0f0]' icon={<BookOutlined />}>
              Lưu tìm kiếm
            </Button>
          </Flex>

          <Divider className='mb-4 mt-3' />

          <PriorityCardItem />

          {isError && (
            <Typography.Title level={4} className='text-center'>
              Đã xảy ra lỗi khi tải dữ liệu
            </Typography.Title>
          )}

          {isLoading && (
            <>
              {Array.from({ length: pageSize }).map((_, index) => (
                <Card key={index} loading className='mb-2 mr-0 md:mr-4' />
              ))}
            </>
          )}

          {data && data.data.length === 0 && (
            <Empty
              className='mb-6 mt-12'
              description={<Typography.Text>Không tìm thấy bài đăng nào phù hợp</Typography.Text>}
            >
              <Button type='primary'>Tìm kiếm lại</Button>
            </Empty>
          )}

          {data && data.data.map((property: Property) => <RentHouseCardItem key={property.id} property={property} />)}

          {data && data.data.length > 0 && (
            <Pagination
              total={data.pageInfo.totalElements}
              pageSize={pageSize}
              current={pageNumber}
              align='center'
              showSizeChanger
              pageSizeOptions={['5', '10', '20']}
              locale={{ items_per_page: '/ trang' }}
              onChange={(page, pageSize) => {
                setFilters({ pageNumber: page, pageSize })
                if (myRef && myRef.current) {
                  myRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onShowSizeChange={(current, size) => setFilters({ pageNumber: current, pageSize: size })}
              className='mb-6 mt-4'
            />
          )}
        </Col>

        <Col xs={0} md={6}>
          <RightSideBar />
        </Col>
      </Row>
    </>
  )
}

export default RentHouse
