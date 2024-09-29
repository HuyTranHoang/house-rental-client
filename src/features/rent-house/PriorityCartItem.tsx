import { Card, Col, Row, Tooltip, Typography } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import { usePriorityProperties } from '@/hooks/useProperty.ts';
import './PriorityCartItem.css';
import { formatCurrency } from '@/utils/formatCurrentcy';
import { useNavigate } from 'react-router-dom';
import { generateSlug } from '@/utils/generateSlug';
import usePropertyStore from '@/store/propertyStore';
import ROUTER_NAMES from '@/constant/routerNames';

function PriorityCartItem() {
  const navigate = useNavigate();
  const { data: priorityProperties, isLoading, isError } = usePriorityProperties();
  const setBreadcrumbName = usePropertyStore((state) => state.setName);

  if (isLoading) return <Typography.Text>Đang tải...</Typography.Text>;
  if (isError) return <Typography.Text>Có lỗi xảy ra khi tải dữ liệu.</Typography.Text>;
  if (!priorityProperties || priorityProperties.length === 0) return <Typography.Text>Không có dữ liệu để hiển thị.</Typography.Text>;

  return (
    <>
      {priorityProperties.map((item) => {
        const slug = generateSlug(item.title, item.id);
        return (
          <Card
            key={item.id}
            className="priority-card mb-1 h-14"
            hoverable
            onClick={() => {
              setBreadcrumbName(item.title);
              navigate(ROUTER_NAMES.getRentHouseDetail(slug));
            }}
          >
            <div className="hot-label">HOT</div>
            <FireOutlined className='hot-label' />
            <Row gutter={8}>
              <Col span={16} className="flex text-center">
                <Tooltip title={item.title} >
                    <Typography.Text strong className="font-bold ml-2 line-clamp-1">{item.title}</Typography.Text>
                </Tooltip>
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <Typography.Text strong>{formatCurrency(item.price)} VNĐ</Typography.Text>
              </Col>
            </Row>
          </Card>
        );
      })}
    </>
  );
}

export { PriorityCartItem };
