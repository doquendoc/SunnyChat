import React, {useContext, useRef, useState} from 'react';
import {Button, Col, Divider, Layout, Menu, Row} from 'antd';
import {Link} from 'react-router-dom';
import {AppLayoutContext} from "../index";
import {Icon} from 'semantic-ui-react';
import './sider.css'
import {useResponsive} from '../../helpers/hooks/layout.hooks';
import {ILayoutProvider} from "../interface.layout";
import {useTranslation} from "react-i18next";

const {Sider: SiderLayout} = Layout;

export const Sider = () => {
    const {t} = useTranslation('main');
    const {collapsed, setOptionLayout}: any = useContext<ILayoutProvider>(AppLayoutContext);
    const {isMobile} = useResponsive();
    const showFooter = !collapsed && !isMobile;


    const sidebarRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(240);

    const startResizing = React.useCallback((mouseDownEvent) => {
        setIsResizing(true);
    }, []);

    const stopResizing = React.useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = React.useCallback(
        (mouseMoveEvent) => {
            if (isResizing) {
                setSidebarWidth(
                    mouseMoveEvent.clientX -
                    sidebarRef?.current.getBoundingClientRect().left
                );
            }
        },
        [isResizing]
    );

    React.useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    return (
            <SiderLayout
                width={sidebarWidth}
                trigger={null}
                collapsed={isMobile || collapsed}
                collapsible
                className='seder-menu-style dark:!bg-slack border-r-slack'
                style={{overflowY: isMobile ? 'scroll' : 'hidden'}}
                ref={sidebarRef}
                onMouseDown={(e) => e.preventDefault()}
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
                                name='home'
                                className='!text-gray-600 !leading-12 dark:!text-slack'
                            />}
                    >
                        <Link to='/'>
                            <span className='dark:!text-slack !font-sans !font-medium'>{t('sider.Home')}</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        className='cursor-pointer !mb-1 hover:!bg-indigo-100 dark:hover:!bg-gray-600'
                        key="2"
                        icon={<Icon size='big' name='user' className='!text-gray-600 !leading-12 dark:!text-slack'/>}
                        style={{marginBottom: -10}}
                    >
                        <Link to='/users'>
                            <span className='dark:!text-slack !font-sans !font-medium'>{t('sider.Users')}</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        className='cursor-pointer !mb-1 hover:!bg-indigo-100 dark:hover:!bg-gray-600'
                        key="3"
                        icon={<Icon size='big' name='lock' className='!text-gray-600 !leading-12 dark:!text-slack'/>}
                        style={{marginBottom: -10}}
                    >
                        <span className='dark:!text-slack !font-sans !font-medium'>{t('sider.Security Groups')}</span>
                    </Menu.Item>
                    <Menu.Item
                        className='cursor-pointer !mb-1 hover:!bg-indigo-100 dark:hover:!bg-gray-600'
                        key="4"
                        icon={<Icon size='big' name='sitemap' className='!text-gray-600 !leading-12 dark:!text-slack'/>}
                        style={{marginBottom: -10}}
                    >
                        <span className='dark:!text-slack !font-sans !font-medium'>{t('sider.Directory Tree')}</span>
                    </Menu.Item>
                    <Divider className='sid-main-divider dark:!border-divider'/>
                    {showFooter && (
                        <Row justify={'center'} className='sid-footer-text'>
                            <p style={{textAlign: 'center'}} className='dark:!text-slack'>
                                {t('sider.Company description')}
                            </p>
                        </Row>
                    )}
                </Menu>
                <div className="app-sidebar-resizer" onMouseDown={startResizing} />
                <Button size='small' shape="circle" className='sid-resize-button dark:!sid-resize-button-dark right-4'
                        onClick={() => setOptionLayout({collapsed: !collapsed})}>
                    {!collapsed && <Icon name='angle left'/>}
                    {collapsed && <Icon name='angle right' style={{marginRight: 0}}/>}
                </Button>
            </SiderLayout>

    );
}
