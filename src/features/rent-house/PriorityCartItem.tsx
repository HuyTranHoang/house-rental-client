import ROUTER_NAMES from '@/constant/routerNames'
import { usePriorityProperties } from '@/hooks/useProperty'
import usePropertyStore from '@/store/propertyStore'
import { formatCurrency } from '@/utils/formatCurrentcy'
import { generateSlug } from '@/utils/generateSlug'
import { FireOutlined } from '@ant-design/icons'
import { Card, Skeleton, Typography } from 'antd'
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
          <Card
            key={item.id}
            className='group relative mr-4 transform cursor-pointer overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg'
            classNames={{ body: 'p-0' }}
            onClick={() => {
              setBreadcrumbName(item.title)
              navigate(ROUTER_NAMES.getRentHouseDetail(slug))
            }}
          >
            <div className='absolute -left-8 top-0 -rotate-45 bg-red-500 px-8 py-1 text-xs font-bold text-white shadow-md'>
              HOT
            </div>
            <div className='flex items-center justify-between p-4'>
              <div className='flex items-center space-x-2 transition-all duration-300 group-hover:translate-x-2'>
                <Text
                  strong
                  className='mx-2 flex-grow cursor-pointer truncate font-bold transition-all duration-300 group-hover:text-blue-600'
                >
                  {item.title}
                </Text>
                <FireOutlined className='animate-flame text-red-500' />
              </div>
              <Text strong className='whitespace-nowrap'>
                {formatCurrency(item.price)}
              </Text>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
