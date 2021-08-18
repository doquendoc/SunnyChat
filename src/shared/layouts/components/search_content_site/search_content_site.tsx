import * as React from 'react';
import {Input} from 'semantic-ui-react';
import './search_content_site.css'
import {useTranslation} from "react-i18next";

export const SearchContentSite = () => {
    const {t} = useTranslation('main');
    return (
            <Input
                className='hd-input dark:focus-within:border-indigo-200 dark:focus-within:hd-input-d-focus dark:focus-within:border-2 dark:border-0 dark:hd-input-d h-9 hover:w-96 focus-within:w-96 border-2 border-grey-600 rounded-md focus-within:border-indigo-500'
                icon='search'
                placeholder={t('header.Search')}
                inverted
                iconPosition='left'
            />
        )
}
