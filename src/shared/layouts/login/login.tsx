import React, {useContext} from 'react';
import loginImage from '../../../assets/login-image.jpg'
import {ADIcon} from "../../icons/app.icons";
import {Loader} from "semantic-ui-react";
import './login.scss';
import {useTranslation} from "react-i18next";
import {SessionContext} from "../../providers/context/session.provider";
import {ISessionContext} from "../../providers/context/session.interface";
import {Button, Form, Input} from "antd";
import {openNotificationWithIcon} from "../../helpers/message.helpers";

export const Login = () => {
    const {t} = useTranslation('main');
    const {loginUser, loading}: any = useContext<ISessionContext>(SessionContext);

    const handleLogin = async ({email, password}: any) => {
        try {
           const response = await loginUser({email, password});
            openNotificationWithIcon(
                'success',
                t('login.Perfect'),
                `${t('header.Hello')} ${response.name}. ${t('login.Welcome Ad')}`,
                'bottomRight'
            );
        } catch (e) {
            openNotificationWithIcon('error', t('login.Authentication'), e.message);
        }
    }

    return (
        <body className="bg-white font-family-karla h-screen">
        <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2 flex flex-col">

                <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                    <ADIcon className='!cursor-pointer'/>
                </div>

                <div
                    className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                    <p className="text-center text-4xl md:pt-8 font-bold">{t('login.Welcome')}</p>
                    <Form
                        className="mt-10"
                        name="basic"
                        onFinish={handleLogin}
                        layout="vertical"
                    >
                        <Form.Item
                            initialValue='admin@sunnychat.cu'
                            className="flex flex-col pt-4"
                            label={<strong>Email</strong>}
                            labelAlign='left'
                            name="email"
                            rules={[{required: true, message: t('login.Please input your username!')}]}
                        >
                            <Input
                                className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>

                        </Form.Item>

                        <Form.Item
                            initialValue='123456'
                            className="flex flex-col"
                            label={<strong>Password</strong>}
                            labelAlign='left'
                            name="password"
                            rules={[{required: true, message: t('login.Please input your password!')}]}
                        >
                            <Input.Password
                                className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>

                        </Form.Item>

                        <Form.Item className="flex flex-col">
                            <Button
                                disabled={loading}
                                className="w-full h-14 bg-blue-700 text-white font-bold rounded text-lg hover:bg-blue-900"
                                htmlType="submit">
                                {t('login.Sign in')}
                            </Button>
                        </Form.Item>

                    </Form>
                    <div className="text-center pt-12 pb-12">
                        <p>{t('login.Need help')}
                            <a href="#" className="underline font-semibold">
                                {t('login.Enter here')}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Loader indeterminate active={loading} size={'large'} className='blue-600 !z-50'/>
            <div className="w-1/2 shadow-2xl">
                <img className="object-cover w-full h-screen hidden md:block"
                     src={loginImage}/>
            </div>
        </div>
        </body>
    );
}
