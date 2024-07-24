import { Button, Cascader, CascaderProps, Col, Form, FormProps, Row, Select } from 'antd'
import Search from 'antd/es/input/Search'
import { DollarIcon, GeoIcon, HomeIcon } from './RentHouseFilterIcons.tsx'
import { ProductOutlined } from '@ant-design/icons'

type FieldType = {
  search?: string;
  district?: string;
  roomType?: string;
  price?: string;
};

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'Toàn Quốc',
    label: 'Toàn Quốc'
  },
  {
    value: 'Hồ Chí Minh',
    label: 'Hồ Chí Minh',
    children: [
      {
        value: 'Tất cả',
        label: 'Tất cả'
      },
      {
        value: 'Quận 1',
        label: 'Quận 1'
      },
      {
        value: 'Quận 2',
        label: 'Quận 2'
      }
    ]
  },
  {
    value: 'Hà Nội',
    label: 'Hà Nội',
    children: [
      {
        value: 'Tất cả',
        label: 'Tất cả'
      },
      {
        value: 'Hoàn Kiếm',
        label: 'Hoàn Kiếm'
      },
      {
        value: 'Đống Đa',
        label: 'Đống Đa'
      }
    ]
  }
]

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value)
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}

function RentHouseFilter() {
  return (
    <Form
      name="search"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{marginTop: '1rem'}}
    >
      <Row gutter={12}>
        <Col span={7}>
          <Form.Item<FieldType> name="search">
            <Search size="large" placeholder="Từ khóa, đường, quận hoặc địa danh" />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item<FieldType> name="district">
            <Cascader options={options} onChange={onChange} size="large" defaultValue={['Toàn Quốc']} allowClear={false}
                      suffixIcon={<GeoIcon />} />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item<FieldType> name="roomType">
            <Select
              size="large"
              onChange={handleChange}
              placeholder={'Loại phòng'}
              suffixIcon={<HomeIcon />}
              options={[
                { value: 'Nhà Ở', label: 'Nhà Ở' },
                { value: 'Chung Cư', label: 'Chung Cư' },
                { value: 'Ký Túc Xá', label: 'Ký Túc Xá' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item<FieldType> name="price">
            <Select
              size="large"
              onChange={handleChange}
              placeholder={'Giá thuê'}
              suffixIcon={<DollarIcon />}
              options={[
                { value: 'Tất cả', label: 'Tất cả' },
                { value: 'Dưới 3 triệu', label: 'Dưới 3 triệu' },
                { value: '3 đến 7 triệu', label: '3 đến 7 triệu' },
                { value: '7 đến 10 triệu', label: '7 đến 10 triệu' },
                { value: 'Trên 10 triệu', label: 'Trên 10 triệu' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Button size='large' icon={<ProductOutlined style={{color: '#91caff'}} />}>Lọc thêm</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default RentHouseFilter
