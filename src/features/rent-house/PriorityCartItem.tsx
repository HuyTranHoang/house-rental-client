import ROUTER_NAMES from '@/constant/routerNames'
import { usePriorityProperties } from '@/hooks/useProperty'
import usePropertyStore from '@/store/propertyStore'
import { formatCurrency } from '@/utils/formatCurrentcy'
import { generateSlug } from '@/utils/generateSlug'
import { FireOutlined } from '@ant-design/icons'
import { Badge, Card, Skeleton, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Text } = Typography

export default function PriorityCardItem() {
  const navigate = useNavigate()
  const { data: priorityProperties, isLoading } = usePriorityProperties()
  const setBreadcrumbName = usePropertyStore((state) => state.setName)

  if (isLoading) return <Skeleton className='my-2 pr-4' />
  if (!priorityProperties || priorityProperties.length === 0) return ''

  return (
    <div className='mb-2 space-y-2'>
      {priorityProperties.map((item) => {
        const slug = generateSlug(item.title, item.id)

        return (
          <Badge.Ribbon text={<FireOutlined className='animate-flame' />} color='red' placement='start'>
            <Card
              key={item.id}
              className='group relative mr-4 cursor-pointer overflow-hidden hover:shadow-lg'
              classNames={{ body: 'p-0' }}
              onClick={() => {
                setBreadcrumbName(item.title)
                navigate(ROUTER_NAMES.getRentHouseDetail(slug))
              }}
            >
              <div className='flex items-center justify-between p-4'>
                <div className='flex items-center space-x-2 transition-all duration-300 group-hover:translate-x-2'>
                  <Text
                    strong
                    className='mx-2 flex-grow cursor-pointer truncate font-bold transition-all duration-300 group-hover:text-blue-600'
                  >
                    {item.title}
                  </Text>
                </div>
                <Text strong className='whitespace-nowrap'>
                  {formatCurrency(item.price)}
                </Text>
              </div>
            </Card>
          </Badge.Ribbon>
        )
      })}
    </div>
  )
}
