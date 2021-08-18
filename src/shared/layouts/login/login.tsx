import React from 'react';
import loginImage from '../../../assets/login-image.jpg'
import {ADIcon} from "../../icons/app.icons";
import {Loader} from "semantic-ui-react";
import './login.scss';
import {useTranslation} from "react-i18next";
import {useLogin} from '../../helpers/hooks/session.hooks';

export const Login = () => {
    const {t} = useTranslation('main');
    const {loginUser, loading} = useLogin();

    const handleLogin = () => {
        loginUser && loginUser({email: 'admin@sunnychat.cu', password: 'adminadmin'});
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
                    <form className="flex flex-col pt-3" onSubmit={(event)=>event.preventDefault()}>
                        <div className="flex flex-col pt-4">
                            <label htmlFor="email" className="text-lg font-bold mb-1">{t('login.Email')}</label>
                            <input
                                disabled={loading}
                                type="email"
                                id="email"
                                value="admin@sunnychat.cu"
                                placeholder={t('login.Your email')}
                                className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>

                        <div className="flex flex-col pt-4">
                            <label htmlFor="password" className="text-lg mb-1 font-bold">{t('login.Password')}</label>
                            <input
                                disabled={loading}
                                type="password"
                                id="password"
                                value="adminadmin"
                                placeholder={t('login.Password')}
                                className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>

                        <input type="submit" value={t('login.Sign in') as string} disabled={loading} onClick={handleLogin}
                               className="bg-blue-700 text-white font-bold rounded text-lg hover:bg-blue-900 py-4 p-2 mt-8"/>
                    </form>
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
