import {useEffect, useState} from "react";
import {openNotificationWithIcon} from "../message.helpers";
import history from "../../routes/history";
import {useTranslation} from "react-i18next";
import { singletonHook } from 'react-singleton-hook';
import {ICrendentials, ILogin, IUseLogin } from "./interface.hooks";

const useLoginProfile = (): IUseLogin => {
    const {t} = useTranslation('main');
    const [{
        isAuthenticated,
        loading,
        user,
    }, setLogin] = useState<ILogin>({
        isAuthenticated: false,
        loading: false,
    });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLogin({
                isAuthenticated: true,
                user: {
                    email: 'admin@cujae.edu.cu',
                    username: 'superAdmin',
                    name: "Bob Esponja"
                }
            });
        }
    }, [isAuthenticated]);

    const loginUser = (credentials: ICrendentials) => {
        setLogin({loading: true})
        setTimeout(() => {
            const response = findUser(credentials);
            if (response) {
                setLogin({
                    isAuthenticated: true,
                    user: {
                        email: response.email,
                        username: 'superAdmin',
                        name: "Bob Esponja"
                    }
                });
                localStorage.setItem('token', response.token);
                setLogoutTimer();
                history.push('/');
                openNotificationWithIcon('success', t('login.Perfect'), t('login.Welcome Ad'), 'bottomRight');
            }
            else {
                openNotificationWithIcon('error', t('login.Authentication'), t('login.Authentication error'));
            }
            setLogin({loading: false})
        }, 1000)
    }

    const logout = () => {
        history.push('/');
        localStorage.removeItem('token');
        setLogin({user: undefined, isAuthenticated: false});
    }

    const setLogoutTimer = () => {
        setTimeout(() => {
            history.push('/');
            logout();
        }, 86400000)
    }

    return {
        isAuthenticated,
        loading,
        loginUser,
        logout,
        user
    }
}

// todo: fake api data
function findUser(credentials: ICrendentials): any {
    const {password, email} = credentials;
    const response = AdUsers.find(user => user.email === email && user.password === password)
    if (response) {
        return response
    }
}

const AdUsers = [
    {
        email: "admin@cujae.edu.cu",
        password: "adminadmin",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiYWRtaW4iLCJ1c2VyTmFtZSI6Ik9ybHkgTXVsZXJvIn0.hfMUhdkDfROjbOikoP84nYSepqseNS0bxFc1UDQBXL0"
    }
]

export const useLogin = singletonHook<IUseLogin>({}, useLoginProfile);
