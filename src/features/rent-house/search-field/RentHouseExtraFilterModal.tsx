import { useState } from 'react'
import { Modal, Button, Select, Typography, Badge } from 'antd'
import { ProductOutlined, SelectOutlined, CalendarOutlined } from '@ant-design/icons'
import { usePropertyFilters } from '@/hooks/useProperty.ts'

interface ExtraFiltersModalProps {
  count: number
  setCount: (count: number) => void
}

function RentHouseExtraFilterModal({ count, setCount }: ExtraFiltersModalProps) {
  const { setFilters } = usePropertyFilters()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [area, setArea] = useState<string>('0,0')
  const [time, setTime] = useState<string>('0')

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleAreaChange = (value: string) => {
    setArea(value)
  }

  const handleOk = () => {
    const [minArea, maxArea] = area.split(',')

    setFilters({ minArea: parseInt(minArea) * 10, maxArea: parseInt(maxArea) * 10, numOfDays: parseInt(time) })

    let activeFilters = 0

    if (area !== '0,0') {
      activeFilters += 1
    }

    if (time !== '0') {
      activeFilters += 1
    }

    setCount(activeFilters)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleResetExtraFilter = () => {
    setIsModalOpen(false)
    setArea('0,0')
    setTime('0')
    setFilters({ minArea: 0, maxArea: 0, numOfDays: 0 })
    setCount(0)
  }

  return (
    <>
      <Badge count={count}>
        <Button onClick={showModal} size='large' icon={<ProductOutlined style={{ color: '#91caff' }} />}>
          Lọc thêm
        </Button>
      </Badge>
      <Modal
        title='Bộ lọc'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleResetExtraFilter}>
            Xóa lọc
          </Button>,
          <Button key='submit' type='primary' onClick={handleOk}>
            Tìm kiếm
          </Button>
        ]}
      >
        <Typography.Paragraph style={{ marginTop: '1rem', marginBottom: '8px' }}>Diện tích</Typography.Paragraph>
        <Select
          size='large'
          onChange={handleAreaChange}
          placeholder={'Diện tích'}
          value={area}
          suffixIcon={<SelectOutlined style={{ fontSize: 16 }} />}
          options={[
            { value: '0,0', label: 'Tất cả' },
            { value: '0,3', label: '< 30 m2' },
            { value: '3,5', label: '30 - 50 m2' },
            { value: '5,7', label: '50 - 70 m2' },
            { value: '7,10', label: '70 - 100 m2' },
            { value: '10,0', label: '> 100 m2' }
          ]}
          style={{ width: '100%' }}
        />
        <Typography.Paragraph style={{ marginTop: '1rem', marginBottom: '8px' }}>Thời gian đăng</Typography.Paragraph>
        <Select
          size='large'
          onChange={(value) => setTime(value)}
          placeholder={'Thời gian đăng'}
          value={time}
          suffixIcon={<CalendarOutlined style={{ fontSize: 16 }} />}
          options={[
            { value: '0', label: 'Tất cả' },
            { value: '1', label: 'Cách đây 1 ngày' },
            { value: '3', label: 'Cách đây 3 ngày' },
            { value: '7', label: 'Cách đây 7 ngày' },
            { value: '15', label: 'Cách đây 15 ngày' },
            { value: '30', label: 'Cách đây 30 ngày' }
          ]}
          style={{ width: '100%' }}
        />
      </Modal>
    </>
  )
}

export default RentHouseExtraFilterModal
