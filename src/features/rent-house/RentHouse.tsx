import { Button, Card, Col, Divider, Empty, Flex, Pagination, PaginationProps, Row, Skeleton, Typography } from 'antd'
import { BookOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { fetchAllProperties } from '@/api/property.api.ts'
import { Property } from '@/models/property.type.ts'
import RentHouseCardItem from './RentHouseCardItem.tsx'
import { useAppDispatch } from '@/store.ts'
import { useSelector } from 'react-redux'
import { selectPropertyParams, setPageNumber, setPageSize } from './rentHouseSlice.ts'
import RentHouseFilter from '@/features/rent-house/RentHouseFilter.tsx'
import RightSideBar from '@/ui/RightSideBar.tsx'
import CustomBreadcrumbs from '@/components/CustomBreadcrumbs.tsx'

function RentHouse() {
  const dispatch = useAppDispatch()
  const {
    pageSize,
    pageNumber,
    cityId,
    districtId,
    roomTypeId,
    minPrice,
    maxPrice,
    search,
    minArea,
    maxArea,
    numOfDays
  } = useSelector(selectPropertyParams)

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (_, pageSize) => {
    dispatch(setPageSize(pageSize))
  }

  const onPageChange: PaginationProps['onChange'] = (pageNumber) => {
    dispatch(setPageNumber(pageNumber))
  }

  const { data, isLoading, isError } = useQuery({
      queryKey: ['rentHouse', pageSize, pageNumber, cityId, districtId, roomTypeId, minPrice, maxPrice, search, minArea, maxArea, numOfDays],
      queryFn: () => fetchAllProperties(pageSize, pageNumber, cityId, districtId, roomTypeId, minPrice, maxPrice, search, minArea, maxArea, numOfDays)
    }
  )

  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = data ? startIndex + data.data.length : 0

  const range = data ? [startIndex + 1, endIndex] : [0, 0]
  const total = data ? data.pageInfo.totalElements : 0

  return (
    <>
      <RentHouseFilter />

      <CustomBreadcrumbs />

      <Row>
        <Col span={18}>
          <Typography.Title level={4} style={{ marginTop: 16 }}>
            Cho Thuê Nhà Đất Giá Rẻ, Tiện Nghi, Uy Tín, Cập Nhật Mới Nhất T8/2024
          </Typography.Title>

          <Flex align="center" justify="space-between"
                style={{ backgroundColor: '#f0f0f0', padding: 8, borderRadius: 8, marginRight: 16 }}>

            {isLoading
              ? <Skeleton.Button active={true} size="small" shape="round" style={{ marginRight: 8, width: 200 }} />
              : <div>
                Hiển thị <strong>{`${range[0]}-${range[1]}`}</strong> trong <strong>{`${total}`}</strong> tin đăng
              </div>
            }

            <Button type="default" style={{ backgroundColor: '#f0f0f0' }} icon={<BookOutlined />}>
              Lưu tìm kiếm
            </Button>
          </Flex>

          <Divider style={{ marginTop: 12, marginBottom: 16 }} />

          {isError && (
            <Typography.Title level={4} style={{ textAlign: 'center' }}>
              Đã xảy ra lỗi khi tải dữ liệu
            </Typography.Title>
          )}

          {isLoading && (
            <>
              {Array.from({ length: pageSize }).map((_, index) => (
                <Card key={index} style={{ marginBottom: '8px' }} loading={true}></Card>
              ))}
            </>
          )}

          {data && data.data.length === 0 && (
            <Empty
              style={{ marginTop: '32px', marginBottom: '64px' }}
              description={
                <Typography.Text>
                  Không tìm thấy bài đăng nào phù hợp
                </Typography.Text>
              }
            >
              <Button type="primary">
                Tìm kiếm lại
              </Button>
            </Empty>)
          }

          {data && data.data.map((property: Property) => <RentHouseCardItem key={property.id} property={property} />)}

          {
            data && data.data.length > 0 && <Pagination
              total={data.pageInfo.totalElements}
              pageSize={pageSize}
              current={pageNumber}
              align="center"
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              pageSizeOptions={['2', '4', '6']}
              locale={{ items_per_page: '/ trang' }}
              onChange={onPageChange}
              style={{ margin: '20px 0 32px' }}
            />
          }
        </Col>

        <Col span={6}>
          <RightSideBar />
        </Col>
      </Row>
    </>
  )
}

export default RentHouse
