import { Breadcrumb } from 'antd'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { Link } from 'react-router-dom'
import { routerList } from '@/router.tsx'

const CustomBreadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routerList, {
    excludePaths: ['/city/:id', '/roomType/:id', '/amenity/:id']
  })

  const breadcrumbItems = breadcrumbs.map(({ match, breadcrumb }) => ({
    title: <Link to={match.pathname}>{breadcrumb}</Link>,
    key: match.pathname
  }))

  return (
    <Breadcrumb separator=">" items={breadcrumbItems} />
  )
}

export default CustomBreadcrumbs