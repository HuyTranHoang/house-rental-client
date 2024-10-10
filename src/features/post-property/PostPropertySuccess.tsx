import ROUTER_NAMES from '@/constant/routerNames.ts'
import { ArrowLeftOutlined, HomeOutlined } from '@ant-design/icons'
import { Button, Flex, Space } from 'antd'
import { Link } from 'react-router-dom'

function PostPropertySuccess({ setCurrent }: { setCurrent: (current: number) => void }) {
  return (
    <Space direction='vertical' size={16} className='w-full bg-white'>
      <h1 className='font-inter bg-gradient-to-r from-sky-500 to-lime-500 bg-clip-text text-3xl font-extrabold leading-9 text-transparent'>
        Đăng bài thành công
      </h1>

      <p>Bài đăng của bạn đã được gửi thành công. Bài đăng sẽ được duyệt trong thời gian sớm nhất.</p>

      <Flex gap={12} justify='space-between'>
        <Button icon={<ArrowLeftOutlined />} className='pl-0' type='link' onClick={() => setCurrent(0)}>
          Tiếp tục đăng bài khác
        </Button>

        <div>
          <Button icon={<HomeOutlined />} type='link'>
            <Link to={ROUTER_NAMES.POST_MANAGEMENT}>Quay về trang chủ</Link>
          </Button>
          <Button type='link' onClick={() => alert('Tạm thời chưa có trang quản lý')}>Quản lý bài đăng</Button>
        </div>
      </Flex>
    </Space>
  )
}

export default PostPropertySuccess
