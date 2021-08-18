// eslint-disable-next-line no-use-before-define
import React from 'react';
import {Col, Divider, Modal, ModalProps, Row} from 'antd';
import {Icon} from 'semantic-ui-react';
import './AdModal.scss';

interface IProps extends ModalProps {
    children?: any;
    contentClassName?: string;
}

export const AdModal = (props: IProps) => {
    const {title, children, contentClassName, ...otherProps}= props;
    return (
        <Modal
            title={null}
            footer={null}
            className='modal-options'
            wrapClassName='-top-12'
            closable={false}
            {...otherProps}
        >
            <Row>
                <Col span={24} className='dark:!bg-gray-800'>
                    <Row className='p-4'>
                        <Col span={18}>
                            <span className='text-2xl font-medium dark:!text-slack'> {title} </span>
                        </Col>
                        <Col span={6} className='text-right'>
                            <Icon name={'close'} className='!text-2xl dark:text-slack !text-grey-900 cursor-pointer !mt-3' onClick={props.onCancel} size={'small'}/>
                        </Col>
                    </Row>
                    <Divider className='mt-1 mb-0 dark:!border-divider'/>
                </Col>
                <Col span={24} className={`dark:!bg-slack-content p-4 ${contentClassName}`}>
                    {children}
                </Col>
            </Row>

        </Modal>
    );
}
