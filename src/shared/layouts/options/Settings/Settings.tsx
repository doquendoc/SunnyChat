// eslint-disable-next-line no-use-before-define
import React, {useState} from 'react';
import {Layout, Menu, Modal} from 'antd';
import {Icon} from 'semantic-ui-react';
import './Settings.scss';
import {Theme} from './Theme/Theme';
import {Language} from "./Language/Language";
import {Advance} from "./Advance/Advance";
import {useTranslation} from "react-i18next";
import { AdModal } from '../../../components/ad-modal/AdModal';

interface IProps {
    visible?: boolean;
    handleOk?: () => void;
    handleCancel?: () => void;
}

type OptionKeys = 'theme' | 'lang' | 'notify' | 'advance';

const {Content: ContentLayout, Sider: SiderLayout} = Layout;

export const Settings = ({visible, handleOk, handleCancel}: IProps) => {
    const {t} = useTranslation('main');
    const [selectedOption, setSelectedOption] = useState<OptionKeys>("theme");

    const getOptions = (key: OptionKeys): React.ReactNode => {
        const options = {
            'theme': <Theme/>,
            'lang': <Language/>,
            'notify': <Advance/>,
            'advance': <Advance/>,
        }
        return options[key];
    }

    return (
        <AdModal
            title={<div className='text-3xl font-bold mb-2 mt-2'>{t('options.Options')}</div>}
            footer={null}
            className='modal-options'
            contentClassName='!p-0'
            visible={visible}
            width={800}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Layout>
                <SiderLayout
                    trigger={null}
                    className='!bg-white dark:!bg-slack'
                >
                    <Menu
                        style={{width: 230}}
                        defaultSelectedKeys={["theme"]}
                        mode="inline"
                        className='!pt-6 !pb-6 !h-full not-border dark:!bg-slack'
                    >
                        <Menu.Item
                            key={"theme"}
                            icon={<Icon className='dark:!text-slack !text-gray-600' name={'theme'} size={'large'}/>}
                            onClick={() => setSelectedOption("theme")}
                        >
                            <span className='dark:!text-slack !font-sans !font-medium'>{t('options.Themes')}</span>
                        </Menu.Item>
                        <Menu.Item
                            key={"lang"}
                            icon={<Icon className='dark:!text-slack !text-gray-600' name={'globe'} size={'large'}/>}
                            onClick={() => setSelectedOption("lang")}
                        >
                            <span className='dark:!text-slack !font-sans !font-medium'>{t('language.Language')}</span>
                        </Menu.Item>
                        <Menu.Item
                            key={"notify"}
                            icon={<Icon className='dark:!text-slack !text-gray-600' name={'alarm'} size={'large'}/>}
                            onClick={() => setSelectedOption("notify")}
                        >
                            <span className='dark:!text-slack !font-sans !font-medium'>{t('options.Notifications')}</span>
                        </Menu.Item>
                        <Menu.Item
                            key={"advance"}
                            icon={<Icon className='dark:!text-slack !text-gray-600' name={'setting'} size={'large'}/>}
                            onClick={() => setSelectedOption("advance")}
                        >
                            <span className='dark:!text-slack !font-sans !font-medium'>{t('options.Advanced')}</span>
                        </Menu.Item>
                    </Menu>
                </SiderLayout>
                <ContentLayout className='pl-16 pr-5 pt-5 pb-3 !bg-white dark:!bg-slack-content'>
                    {getOptions(selectedOption)}
                </ContentLayout>
            </Layout>
        </AdModal>
    );
}
