import React from 'react';
import {Dropdown, Flag, Header} from "semantic-ui-react";
import {Divider, Row} from "antd";
import {ADIcon} from "../../../../icons/app.icons";
import {useTranslation} from 'react-i18next';
import {StringParam, useQueryParams} from "use-query-params";
import {useTheme} from "../../../../helpers/hooks/layout.hooks";


export const Language = () => {
    const {t, i18n} = useTranslation('main');
    const {isDark}= useTheme();
    const [_, setQuery] = useQueryParams({lang: StringParam});
    const changeLanguage = async (lang: 'en' | 'es') => {
        await i18n.changeLanguage(lang);
        setQuery({lang})
    }
    const options = [
        {
            key: 1,
            text: t('language.English'),
            className:'dark:!bg-slack-content',
            value: 'en',
            onClick: () => changeLanguage('en'),
            content: (
                <Header
                    inverted={isDark}
                    icon={<Flag name='gb'/>}
                    content={t('language.English')}
                    subheader={`US - ${t('language.Keyboard layout')}`}
                />
            ),
        },
        {
            key: 2,
            text: t('language.Spanish'),
            className:'dark:!bg-slack-content',
            value: 'es',
            onClick: () => changeLanguage('es'),
            content: (
                <Header
                    inverted={isDark}
                    icon={<Flag name='es'/>}
                    content={t('language.Spanish')}
                    subheader={`ES - ${t('language.Keyboard layout')}`}
                />
            ),
        },
    ]

    return (
        <>
            <div className='text-2xl mb-2 dark:!text-gray-200'>{t('language.Language')}</div>
            <Dropdown
                value={i18n.language}
                className='dark:!bg-slack-content dark:!border-gray-100 dark:!text-gray-200 !w-96'
                selection
                fluid
                options={options}
                placeholder={t('language.Select a language')}
            />
            <div className='text-lg text-gray-500 mt-1 ml-1 dark:!text-gray-400'>{t('language.Choose description')}</div>
            <Divider className='!mb-2'/>
            <div className='text-sm mt-6 mb-6 text-current dark:!text-gray-200'>
                {t('language.Working language')} <ADIcon className='-mt-12 -ml-3 -mr-3 !cursor-pointer'/>!
            </div>
        </>
    )
}
