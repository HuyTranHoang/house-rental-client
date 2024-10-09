import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { routerList } from '../router.tsx'

const CustomBreadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routerList)
  const { t } = useTranslation('breadcrumb')

  const breadcrumbItems = breadcrumbs.map(({ match, breadcrumb }) => {
    let breadcrumbText

    console.log('breadcrumb', breadcrumb)

    if (breadcrumb) {
      if (typeof breadcrumb === 'string') {
        breadcrumbText = t(breadcrumb, breadcrumb)
      } else if (React.isValidElement(breadcrumb) && breadcrumb.key === '/') {
        breadcrumbText = (
          <>
            <HomeOutlined /> {t('home')}
          </>
        )
      } else if (React.isValidElement(breadcrumb)) {
        const element = breadcrumb as React.ReactElement<{ children: string }>
        breadcrumbText = t(element.props.children, element.props.children)
      }
    }

    return {
      title: <NavLink to={match.pathname}>{breadcrumbText as ReactNode}</NavLink>,
      key: match.pathname
    }
  })

  return <Breadcrumb items={breadcrumbItems} />
}

export default CustomBreadcrumbs
