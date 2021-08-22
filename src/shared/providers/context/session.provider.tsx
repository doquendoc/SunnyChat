import * as React from 'react';
import {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {ICrendentials, ILogin, IUser} from "../../helpers/hooks/interface.hooks";
import history from "../../routes/history";
import {ISessionContext} from "./session.interface";
import {findUser, userDecode} from "./session.helper";

export const SessionContext = React.createContext<ISessionContext>({});

export const SessionProvider = ({children}: {children: any}) => {
    const {t} = useTranslation('main');
    const [{
        isAuthenticated,
        loading,
        user,
    }, setSession] = useState<ILogin>({
        isAuthenticated: false,
        loading: false,
    });

    useEffect(() => {
        const token= localStorage.getItem('token');
        if (token) {
            setSession({
                isAuthenticated: true,
                user: userDecode(token)
            });
        }
    }, [isAuthenticated]);

    const loginUser = (credentials: ICrendentials) => {
        setSession({loading: true})
        return new Promise<IUser>((resolve, reject) => {
            setTimeout(() => {
                const response = findUser(credentials);
                if (response) {
                    const {email, username, name, roles}= response;
                    setSession({
                        isAuthenticated: true,
                        user: {email, username, name, roles},
                    });
                    localStorage.setItem('token', response.token);
                    resolve(response);
                    setLogoutTimer();
                    history.push('/');
                }
                else {
                    reject({message: t('login.Authentication error')});
                }
                setSession({loading: false})
            }, 1000)
        });
    }

    const logout = () => {
        history.push('/');
        localStorage.removeItem('token');
        setSession({user: undefined, isAuthenticated: false});
    }

    const setLogoutTimer = () => {
        setTimeout(() => {
            history.push('/');
            logout();
        }, 86400000)
    }

    const isSuperAdmin = (): boolean => {
        return user && !!user.roles?.find(role => role === 'admin')
    }

    return (
        <SessionContext.Provider value={{isAuthenticated, loading, user, loginUser, logout, isSuperAdmin }}>
            {children}
        </SessionContext.Provider>
    );
};

