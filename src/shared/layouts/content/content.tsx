import React, { useContext } from 'react'
import { Layout } from 'antd'
import './content.css'
import { AppLayoutContext } from '..'
import { useResponsive } from '../../helpers/hooks/layout.hooks'
import { ILayoutProvider } from '../interface.layout'

const { Content: ContentLayout } = Layout

export const Content = (props: any) => {
  const { collapsed }: any = useContext<ILayoutProvider>(AppLayoutContext)
  const { isMobile } = useResponsive()
  return (
    <ContentLayout
      className="site-layout-background dark:!bg-slack-content bg-gray-100"
      style={{ paddingLeft: collapsed || isMobile ? 96 : 256, paddingRight: 9 }}
    >
      {props.children}
    </ContentLayout>
  )
}
