// eslint-disable-next-line no-use-before-define
import React from 'react';
import {Card, Divider, Radio, RadioChangeEvent, Row} from 'antd';
import {ADIcon, DarkModeIcon, LightModeIcon} from "../../../../icons/app.icons";
import {useTheme} from "../../../../helpers/hooks/layout.hooks";
import {useTranslation} from "react-i18next";
import {openNotificationWithIcon} from "../../../../helpers/message.helpers";

const {Meta} = Card;

export const Theme = () => {
    const {t} = useTranslation('main');
    const {currentTheme, setTheme}= useTheme();

    const changeTheme=(event: RadioChangeEvent)=>{
        const theme = event?.target?.value || 'light'
        setTheme(theme);
    }
    return (
        <>
            <div className='text-2xl mb-5 dark:!text-gray-200'>
                {t('theme.Change theme')}
            </div>
            <Row>
                <Radio.Group className='dark:!bg-slack-content' defaultValue={currentTheme} buttonStyle="solid" onChange={changeTheme}>
                    <Radio value="light" className='dark:!bg-slack-content'>
                        <Card
                            className='!rounded dark:!bg-slack-content'
                            hoverable
                            style={{width: 202}}
                            cover={<LightModeIcon className='cursor-pointer'/>}
                        >
                            <Meta
                                title={
                                    <span className='dark:!text-gray-200'>
                                        {t('theme.Light Mode')}
                                    </span>}
                            />

                        </Card>
                    </Radio>
                    <Radio value="dark" className='dark:!bg-slack-content'>
                        <Card
                            className='!rounded dark:!bg-slack-content'
                            hoverable
                            style={{width: 202}}
                            cover={<DarkModeIcon className='cursor-pointer'/>}
                        >
                            <Meta title={<span className='dark:!text-gray-200'>{t('theme.Dark Mode')}</span>}/>
                        </Card>
                    </Radio>
                </Radio.Group>
                <Divider className='!mb-2'/>
                <div className='text-sm mt-6 mb-6 text-gray-700 dark:!text-gray-200'>
                    {t('theme.Working theme')} <ADIcon className='-mt-12 -ml-3 -mr-3 !cursor-pointer'/>!
                </div>
            </Row>
        </>
    );
}
