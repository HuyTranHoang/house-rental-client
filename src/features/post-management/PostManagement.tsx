import Container from '@/ui/Container'
import { Card, Table, Tabs, TabsProps } from 'antd'

const onTabChange = (key: string) => {
  console.log(key)
}

const items: TabsProps['items'] = [
  {
    key: 'PENDING',
    label: 'Chờ duyệt',
    children: 'Content of Tab Pane 1'
  },
  {
    key: 'APPROVED',
    label: 'Đã được duyệt',
    children: 'Content of Tab Pane 2'
  },
  {
    key: 'REJECTED',
    label: 'Bị từ chối',
    children: 'Content of Tab Pane 3'
  }
]

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  }
]

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }
]

function PostManagement() {
  return (
    <Container>
      <Card title='Quản lý tin đăng' className='mb-10 mt-12'>
        <Tabs defaultActiveKey='1' items={items} onChange={onTabChange} />
        <Table dataSource={dataSource} columns={columns} />
      </Card>
    </Container>
  )
}

export default PostManagement
