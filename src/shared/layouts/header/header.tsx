import React, { useContext } from 'react'
import { Badge, Col, Layout, Row } from 'antd'
import './header.css'
import { SearchContentSite } from '../components/search_content_site/search_content_site'
import { Dropdown, Icon } from 'semantic-ui-react'
import { useResponsive } from '../../helpers/hooks/layout.hooks'
import { ADIcon } from '../../icons/app.icons'
import { ILayoutProvider } from '../interface.layout'
import { AppLayoutContext } from '../index'
import { useTranslation } from 'react-i18next'
import { useLogin } from '../../helpers/hooks/session.hooks'
import { IChatContext, ISessionContext } from '../../providers/context/session.interface'
import { SessionContext } from '../../providers/context/session.provider'
import { ChatContext } from '../../providers/context/chat.provider'

export const Header = () => {
  const { t } = useTranslation('main')
  const { user, logout }: any = useContext<ISessionContext>(SessionContext)
  const { setOptionLayout }: any = useContext<ILayoutProvider>(AppLayoutContext)
  const { groupChanel }: any = useContext<IChatContext>(ChatContext)
  const { xs } = useResponsive()
  const { Header } = Layout
  const options = [
    {
      key: 'user',
      text: (
        <span>
          {t('header.Login as')}
          <strong> {user?.username}</strong>
        </span>
      ),
      disabled: true,
    },
    { key: 'help', text: t('header.Task'), icon: 'calendar' },
    { key: 'settings', text: t('header.Profile'), icon: 'user' },
    {
      key: 'sign-out',
      text: t('header.Logout'),
      icon: 'sign-out',
      onClick: () => {
        groupChanel.presence.leave()
        logout()
      },
    },
  ]
  return (
    <Header className="!bg-white !h-16 !shadow-sm !px-px fixed w-full z-10 dark:!bg-gray-800 !border-b dark:!border-b-slack">
      <Row gutter={8}>
        <Col xs={1} sm={4} md={4} lg={4} xl={3}>
          <ADIcon className="!mt-2 !cursor-pointer !align-top" />
        </Col>
        <Col xs={23} sm={20} md={20} lg={20} xl={21} className="!pr-4">
          <Row justify="end" gutter={24}>
            {!xs && (
              <Col className="search-style">
                <SearchContentSite />
              </Col>
            )}
            <Col className="-mt-2">
              <Badge count="5" title="Notificaciones" size="small">
                <Icon
                  size="large"
                  name="bell"
                  className="transform rotate-45 transition duration-500 ease-in-out hover:text-blue-900 transform hover:-translate-y-1 hover:scale-110 !text-gray-600 dark:!text-slack cursor-pointer"
                />
              </Badge>
            </Col>
            <Col className="-mt-2">
              <Icon
                size="large"
                name="help circle"
                className="transition duration-500 ease-in-out hover:text-blue-900 transform hover:-translate-y-1 hover:scale-110 !text-gray-600 dark:!text-slack cursor-pointer"
              />
            </Col>
            <Col className="-mt-2">
              <Icon
                onClick={() => setOptionLayout({ visibleSettings: true })}
                size="large"
                name="setting"
                className="transition duration-500 ease-in-out hover:text-blue-900 transform hover:-translate-y-1 hover:scale-110 !text-gray-600 dark:!text-slack cursor-pointer"
              />
            </Col>
            <Col className="-mt-2">
              <Dropdown
                trigger={
                  <span className="dark:!text-slack">
                    <Icon name="user" className="!-pl-5 !text-gray-600 dark:!text-slack" /> {t('header.Hello')},{' '}
                    {user?.name}
                  </span>
                }
                options={options}
                direction="left"
                floating
                labeled
                selection={false}
                selectOnNavigation={false}
                wrapSelection={false}
                button
                className="hover:text-blue-900 text-gray-800 dark:!text-gray-200"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  )
}
