import React from 'react';
import {notification} from 'antd';
import {NotificationPlacement} from "antd/lib/notification";
import {Icon} from "semantic-ui-react";

type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'open'

export const openNotificationWithIcon = (type: NotificationType, message: React.ReactNode, description: React.ReactNode, placement?: NotificationPlacement) => {
    notification[type]({
        message: (<span className='dark:!text-gray-200'> {message}</span>),
        description: (<span className='dark:!text-gray-200'> {description}</span>),
        placement,
        closeIcon: (<Icon name={'close'} className='!text-xl dark:text-slack !text-grey-900 cursor-pointer' size={'small'}/>),
        className: 'dark:!bg-slack-content dark:!border dark:!border-[#4c545f]'
    });
};
