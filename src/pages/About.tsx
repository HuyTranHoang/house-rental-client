import { Button, Col, Row, Typography } from 'antd'
import Container from '../ui/Container.tsx'
import { Link } from 'react-router-dom'
import ROUTER_NAMES from '@/constant/routerNames.ts'

function About() {
  return (
    <Container>
      <Row style={{ marginBottom: '32px' }}>
        <Col span="11">
          <Typography.Title>Giới thiệu</Typography.Title>

          <Typography.Paragraph>
            Ngày nay với nhu cầu học tập cũng như công việc ngày càng lớn tại các thành phố,
            lượng người lao động, sinh viên đổ về các thành phố lớn ngày càng nhiều,
            nhu cầu tìm một chỗ trọ tốt hợp lý đã là một trong những nhu cầu cấp bách hiện nay của rất nhiều người.
          </Typography.Paragraph>

          <Typography.Paragraph>
            Nắm bắt được những tình hình đó, <strong>Mogu.vn</strong>
            đã được xây dụng để trở thành một trong những website cho phép đăng tin và tìm kiếm phòng trọ một cách tốt
            nhất
            hiện nay.
          </Typography.Paragraph>

          <Typography.Paragraph>
            Tại <strong>Mogu.vn</strong> luôn có một đội ngủ chăm sóc khách hàng nhiệt tình, luôn phản hồi những thắc
            mắc
            của bạn cũng
            như hỗ trợ những vướn mắc của bạn trong quá trình đăng thông của nhà trọ cũng như tìm kiếm thông tin nhà
            trọ.
          </Typography.Paragraph>

          <Typography.Paragraph>
            Những thông tin về nhà trọ luôn được cập nhật liên tục và nhanh chóng sẽ giúp cho mọi người có thể tìm kiếm
            cho mình một nơi trọ tốt nhất. Tất cả đều dễ dàng với cho thuê phòng trọ.
          </Typography.Paragraph>

          <Typography.Paragraph>
            <strong>Mogu.vn</strong> sẽ góp phần giải quyết các vấn đề về tìm kiếm phòng trọ cũng như cho thuê phòng trọ
            hiện nay,
            giúp mọi người có thể tìm kiếm cho mình một phòng trọ, nhà trọ phù hợp nhất với bản thân mình. Hy
            vọng <strong>Mogu.vn</strong>
            sẽ là một địa chỉ quen thuộc và đang tin cậy cho mọi người.
          </Typography.Paragraph>
        </Col>
        <Col span="12" offset="1">
          <img src="https://placehold.co/600x400" alt="some image" style={{ marginTop: '64px' }} />
        </Col>

        <Col span="24">
          <Typography.Title level={2} style={{ marginTop: '64px' }}>Chúng tôi là ai?</Typography.Title>
          <Typography.Paragraph>
            <strong>Mogu.vn</strong> là một trong những website hàng đầu về tìm kiếm phòng trọ, nhà trọ tại Việt Nam.
            Với hệ thống thông tin phong phú, đa dạng về phòng trọ, nhà trọ từ các tỉnh thành lớn nhỏ trên cả nước.
          </Typography.Paragraph>

          <Typography.Paragraph>
            Với sự chăm sóc khách hàng tận tình, chúng tôi luôn mong muốn mang lại cho khách hàng những trải nghiệm tốt
            nhất khi sử dụng dịch vụ của chúng tôi.
          </Typography.Paragraph>

          <Typography.Paragraph>
            Chúng tôi luôn lắng nghe, tiếp thu ý kiến từ khách hàng để ngày càng hoàn thiện hơn nữa.
          </Typography.Paragraph>

          <Typography.Title level={2} style={{ marginTop: '64px' }}>Liên hệ với chúng tôi nếu bạn cần hỗ
            trợ</Typography.Title>
          <Typography.Paragraph>
            Địa chỉ: 180 Cao Lỗ, Phường 4, Quận 8, TP.HCM
            <Link to={ROUTER_NAMES.CONTACT}><Button type="link">Đi đến trang liên hệ</Button></Link>
          </Typography.Paragraph>

        </Col>
      </Row>
    </Container>
  )
}

export default About
