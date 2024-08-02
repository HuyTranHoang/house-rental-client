import { Breadcrumb, Card, Divider, Pagination, PaginationProps, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { fetchAllProperties } from '../../fetchers/property.fetch.ts'
import { Property } from '../../models/property.type.ts'
import RentHouseCardItem from './RentHouseCardItem.tsx'
import { useAppDispatch } from '../../store.ts'
import { useSelector } from 'react-redux'
import { selectPropertyParams, setPageSize, setPageNumber } from './rentHouseSlice.ts'


function RentHouse() {
  const dispatch = useAppDispatch()
  const { pageSize, pageNumber } = useSelector(selectPropertyParams)

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (_, pageSize) => {
    dispatch(setPageSize(pageSize))
  }

  const onPageChange: PaginationProps['onChange'] = (pageNumber) => {
    dispatch(setPageNumber(pageNumber))
  }


  const { data, isLoading, isError } = useQuery({
      queryKey: ['rentHouse', pageSize, pageNumber],
      queryFn: () => fetchAllProperties(pageSize, pageNumber)
    }
  )

  return (
    <>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: <Link to="/"><HomeOutlined /> Mogu</Link>
          },
          {
            title: <Link to="/rent-house">Tìm thuê nhà đất</Link>
          }
        ]}
      />

      <Divider />

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

      {data && data.data.map((property: Property) => <RentHouseCardItem key={property.id} property={property} />)
      }

      {
        data && <Pagination
          total={data.pageInfo.totalElements}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          pageSize={pageSize}
          current={pageNumber}
          align="center"
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          pageSizeOptions={['2', '4', '6']}
          onChange={onPageChange}
          style={{ margin: '16px 0' }}
        />
      }
    </>
  )
}

export default RentHouse
