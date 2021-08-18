import React, {useEffect, useState} from "react";
import {ConfigProvider, Layout} from "antd";
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {ILayoutProvider, ILayoutState} from "./interface.layout";
import {Content} from './content/content';
import {Header} from './header/header';
import {Sider} from './sider/sider';
import {Login} from './login/login';
import {Settings} from "./options/Settings/Settings";
import {useTranslation} from "react-i18next";
import en_US from 'antd/es/locale/en_US';
import es_ES from 'antd/es/locale/es_ES';
import {routes} from '../routes/routes';
import history from '../routes/history';
import {StringParam, useQueryParams} from "use-query-params";
import './index.scss';
import {useLogin} from "../helpers/hooks/session.hooks";

export const AppLayoutContext = React.createContext<ILayoutProvider>({});

const AppLayout = () => {
    const {i18n} = useTranslation('main');
    const login = useLogin();
    const [query, setQuery] = useQueryParams({lang: StringParam});

    const [{collapsed, visibleSettings }, setOptionLayout] = useState<ILayoutState>({
        collapsed: false,
        visibleSettings: false,
    });

    useEffect(() => {
        i18n.changeLanguage(query.lang || 'en')
        !query.lang && setQuery({lang: 'en'})
    }, []);

    const PrivateRoute = ({path, key, component: Component, permission}: any) => (
        <Route
            path={path}
            key={key}
            render={props =>
                permission ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{pathname: '/', state: {from: props.location}}}/>
                )
            }
        />
    );

    return (
        <AppLayoutContext.Provider value={{collapsed, visibleSettings, setOptionLayout}}>
            <ConfigProvider locale={i18n.language == 'en' ? en_US : es_ES}>
                <Router history={history}>
                    <Switch>
                        {
                            login?.isAuthenticated ? (
                                <Layout className='motion-effect'>
                                    <Header onLogout={login?.logout}/>
                                    <Sider/>
                                    <Content>
                                        {routes.map(item => (
                                            <PrivateRoute path={item.routeTo} key={item.id}
                                                          permission={item.permissionSection}
                                                          component={item.component}/>
                                        ))}
                                    </Content>
                                    <Settings visible={visibleSettings}
                                              handleCancel={() => setOptionLayout({visibleSettings: false})}/>
                                </Layout>
                            ) : (
                                <Route path="/" component={Login}/>
                            )
                        }
                    </Switch>
                </Router>
            </ConfigProvider>
        </AppLayoutContext.Provider>
    );
};

export default AppLayout;
