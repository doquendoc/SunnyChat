import * as React from 'react'
import {useEffect, useState} from 'react'
import {IChatContext, ISessionContext} from './session.interface'
import Ably from 'ably/promises'
import {SessionContext} from './session.provider'

export const ChatContext = React.createContext<IChatContext>({})

const authAbly = (clientId: any) => {
    return (tokenParams: any, callback: any) => {
        const rest = new Ably.Rest({key: 'AxN5xw.SJVx5g:crbQ6fEXvKWzJhhg'})
        // @ts-ignore
        rest.auth.createTokenRequest({clientId}, (err: any, tokenRequest: any) => {
            callback(null, tokenRequest)
        })
    }
}

export const ChatProvider = ({children}: { children: any }) => {
    const {user, adminEmail} = React.useContext<ISessionContext>(SessionContext)
    const authCallback = (tokenParams: any, callback: any) => {
        const rest = new Ably.Rest({key: 'AxN5xw.SJVx5g:crbQ6fEXvKWzJhhg'})
        // @ts-ignore
        rest.auth.createTokenRequest({clientId: user.email}, (err: any, tokenRequest: any) => {
            callback(null, tokenRequest)
        })
    }
    const client = new Ably.Realtime({authCallback})
    const [userChannel, setUserChannel] = useState<any>({})
    const [currentChatId, setCurrentChatId] = useState<any>({})
    const [activeChanel, setActiveChanel] = useState<any>({})

    useEffect(() => {
        setUserChannel(client.channels.get(user.email))
        setActiveChanel(client.channels.get(adminEmail))
        setCurrentChatId(adminEmail)
    }, [])

    useEffect(() => {
        if (currentChatId) {
            setActiveChanel(client.channels.get(currentChatId));
        }
    }, [currentChatId])

    return (
        <ChatContext.Provider
            value={{
                activeChanel,
                userChannel,
                user,
                currentChatId,
                setcurrentChatId: currentChatId => setCurrentChatId(currentChatId),
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}
