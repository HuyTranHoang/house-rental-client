import ROUTER_NAMES from '@/constant/routerNames.ts'
import Container from '@/ui/Container.tsx'
import { Button, Col, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function About() {
  const { t } = useTranslation(['about'])

  return (
    <Container>
      <Row gutter={[16, 24]} className="mb-8">
        <Col xs={24} md={14}>
          <Typography.Title level={1} className="text-2xl sm:text-3xl md:text-4xl">{t('introduction')}</Typography.Title>

          <Typography.Paragraph>
            {t('paragraph1')}
          </Typography.Paragraph>

          <Typography.Paragraph>
            {t('paragraph2')}
          </Typography.Paragraph>

          <Typography.Paragraph>
            {t('paragraph3')}
          </Typography.Paragraph>

          <Typography.Paragraph>
            {t('paragraph4')}
          </Typography.Paragraph>

          <Typography.Paragraph>
            {t('paragraph5')}
          </Typography.Paragraph>
        </Col>
        <Col xs={24} md={10}>
          <img src='https://placehold.co/600x400' alt={t('imageAlt')} className='w-full h-auto mt-4 md:mt-8' />
        </Col>

        <Col xs={24}>
          <Typography.Title level={2} className='mt-8 text-xl sm:text-2xl md:text-3xl'>
            {t('whoWeAre')}
          </Typography.Title>
          <Typography.Paragraph>
            {t('paragraph6')}
          </Typography.Paragraph>

          <Typography.Paragraph>
            {t('paragraph7')}
          </Typography.Paragraph>

          <Typography.Paragraph>
            {t('paragraph8')}
          </Typography.Paragraph>

          <Typography.Title level={2} className='mt-8 text-xl sm:text-2xl md:text-3xl'>
            {t('contactUs')}
          </Typography.Title>
          <Typography.Paragraph className="flex flex-col sm:flex-row items-start sm:items-center">
            <span className="mb-2 sm:mb-0 sm:mr-4">{t('address')}</span>
            <Link to={ROUTER_NAMES.CONTACT}>
              <Button type='link'>{t('goToContactPage')}</Button>
            </Link>
          </Typography.Paragraph>
        </Col>
      </Row>
    </Container>
  )
}

export default About