import React, {useContext} from 'react';
import {Button, Col, Divider, Layout, Menu, Row, Tag} from 'antd';
import {AppLayoutContext} from "../index";
import {Icon} from 'semantic-ui-react';
import './sider.css'
import {useResponsive} from '../../helpers/hooks/layout.hooks';
import {ILayoutProvider} from "../interface.layout";
import {useTranslation} from "react-i18next";
import {Link} from 'react-router-dom';
import {ISessionContext} from "../../providers/context/session.interface";
import {SessionContext} from "../../providers/context/session.provider";

const {Sider: SiderLayout} = Layout;

export const Sider = () => {
    const {t} = useTranslation('main');
    const {isSuperAdmin}: any = useContext<ISessionContext>(SessionContext);
    const {collapsed, setOptionLayout}: any = useContext<ILayoutProvider>(AppLayoutContext);
    const {isMobile} = useResponsive();
    const showFooter = !collapsed && !isMobile;
    return (
        <SiderLayout
            width={240}
            trigger={null}
            collapsed={isMobile || collapsed}
            collapsible
            className='seder-menu-style dark:!bg-slack !border-r-slack'
            style={{overflowY: isMobile ? 'scroll' : 'hidden'}}
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                className='menu-style dark:!bg-slack'
            >
                <Menu.Item
                    key="1"
                    className='hover:!bg-indigo-100 dark:hover:!bg-gray-600'
                    icon={
                        <Icon
                            size='big'
                            name='sun'
                            className='!text-gray-600 !leading-12 dark:!text-slack'
                        />}
                >
                    <Link to='/'>
                        <span className='dark:!text-slack !font-sans !font-medium'>{t('sider.Weather')}</span>
                    </Link>
                </Menu.Item>
                {!isSuperAdmin() ?
                    [
                        <Menu.Item
                            className='cursor-pointer !mb-1 hover:!bg-indigo-100 dark:hover:!bg-gray-600'
                            key="2"
                            icon={<Icon size='big' name='chat'
                                        className='!text-gray-600 !leading-12 dark:!text-slack'/>}
                            style={{marginBottom: -10}}
                        >
                            <Link to='/user/chat'>
                                <span className='dark:!text-slack !font-sans !font-medium'>{t('sider.Chat')}</span>
                            </Link>
                        </Menu.Item>,
                        <Menu.Item
                            className='cursor-pointer !mb-1 hover:!bg-indigo-100 dark:hover:!bg-gray-600'
                            key="3"
                            icon={<Icon size='big' name='user plus'
                                        className='!text-gray-600 !leading-12 dark:!text-slack'/>}
                            style={{marginBottom: -10}}
                        >
                            <Link to='/user/register'>
                                <span
                                    className='dark:!text-slack !font-sans !font-medium'>{t('sider.Register user')}</span>
                            </Link>
                        </Menu.Item>,
                        <Menu.Item
                            className='cursor-pointer !mb-1 hover:!bg-indigo-100 dark:hover:!bg-gray-600'
                            key="4"
                            icon={<Icon size='big' name='users'
                                        className='!text-gray-600 !leading-12 dark:!text-slack'/>}
                            style={{marginBottom: -10}}
                        >
                            <Link to='/user/list'>
                                <span className='dark:!text-slack !font-sans !font-medium'>{t('sider.User list')}</span>
                            </Link>
                        </Menu.Item>
                    ] :
                    [
                        <Menu.Item
                            className='cursor-pointer !mb-1 hover:!bg-indigo-100 dark:hover:!bg-gray-600'
                            key="5"
                            icon={<Icon size='big' name='user circle outline'
                                        className='!text-gray-600 !leading-12 dark:!text-slack'/>}
                            style={{marginBottom: -10}}
                        >
                            <Link to='/admin/connected'>
                                <span className='dark:!text-slack !font-sans !font-medium'>{t('sider.User Connected')}</span>
                            </Link>
                        </Menu.Item>,
                        <Menu.Item
                            className='cursor-pointer !mb-1 hover:!bg-indigo-100 dark:hover:!bg-gray-600'
                            key="6"
                            icon={<Icon size='big' name='bullhorn'
                                        className='!text-gray-600 !leading-12 dark:!text-slack'/>}
                            style={{marginBottom: -10}}
                        >
                            <Link to='/admin/broadcast'>
                                <span className='dark:!text-slack !font-sans !font-medium'>{t('sider.Broadcast Chat')}</span>
                            </Link>
                        </Menu.Item>,
                    ]
                }
                <Divider className='sid-main-divider dark:!border-divider'>
                    <Col span={24} style={{textAlign: 'end'}}>
                        <Button size='small' shape="circle" className='sid-resize-button'
                                onClick={() => setOptionLayout({collapsed: !collapsed})}>
                            {!collapsed && <Icon name='angle left'/>}
                            {collapsed && <Icon name='angle right' style={{marginRight: 0}}/>}
                        </Button>
                    </Col>
                </Divider>
                {showFooter && (
                    <Row justify={'center'} className='sid-footer-text'>
                        <p style={{textAlign: 'center'}} className='dark:!text-slack'>
                            {t('sider.Company description')}
                        </p>
                    </Row>
                )}
            </Menu>
        </SiderLayout>
    );
}
