import React, {useEffect, useState} from "react";
import {ConfigProvider, Layout} from "antd";
import {ILayoutProvider, ILayoutState} from "./interface.layout";
import {Content} from './content/content';
import {Header} from './header/header';
import {Sider} from './sider/sider';
import {Settings} from "./options/Settings/Settings";
import {useTranslation} from "react-i18next";
import en_US from 'antd/es/locale/en_US';
import es_ES from 'antd/es/locale/es_ES';
import {StringParam, useQueryParams} from "use-query-params";
import './index.scss';

export const AppLayoutContext = React.createContext<ILayoutProvider>({});

const AppLayout = ({children}: { children?: any }) => {
    const {i18n} = useTranslation('main');
    const [query, setQuery] = useQueryParams({lang: StringParam});

    const [{collapsed, visibleSettings}, setOptionLayout] = useState<ILayoutState>({
        collapsed: false,
        visibleSettings: false,
    });

    useEffect(() => {
        i18n.changeLanguage(query.lang || 'en')
        !query.lang && setQuery({lang: 'en'})
    }, []);

    return (
        <AppLayoutContext.Provider value={{collapsed, visibleSettings, setOptionLayout}}>
            <ConfigProvider locale={i18n.language == 'en' ? en_US : es_ES}>
                <Layout className='motion-effect'>
                    <Header/>
                    <Sider/>
                    <Content>
                        {children}
                    </Content>
                    <Settings visible={visibleSettings}
                              handleCancel={() => setOptionLayout({visibleSettings: false})}/>
                </Layout>
            </ConfigProvider>
        </AppLayoutContext.Provider>
    );
};

export default AppLayout;
