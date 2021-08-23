import * as React from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ICrendentials, ILogin, IUser } from '../../helpers/hooks/interface.hooks'
import history from '../../routes/history'
import { IChatContext, IChatState, ISessionContext } from './session.interface'
import { createUser, findUser, userDecode } from './session.helper'
import Ably from 'ably/promises'
import { SessionContext } from './session.provider'

export const ChatContext = React.createContext<IChatContext>({})

export const ChatProvider = ({ children }: { children: any }) => {
  const { user, adminEmail } = React.useContext<ISessionContext>(SessionContext)
  const authCallback = (tokenParams: any, callback: any) => {
    const rest = new Ably.Rest({ key: 'AxN5xw.SJVx5g:crbQ6fEXvKWzJhhg' })
    // @ts-ignore
    rest.auth.createTokenRequest({ clientId: user.email }, (err: any, tokenRequest: any) => {
      console.log('Token request created for clientId: ' + tokenRequest.clientId, 'orange')
      callback(null, tokenRequest)
    })
  }
  const client = new Ably.Realtime({ authCallback })
  const [{ userChannel, activeChanel, currentChatId }, setChatState] = useState<IChatState>({
    currentChatId: undefined,
    userChannel: undefined,
  })

  useEffect(() => {
    setChatState({
      userChannel: client.channels.get(user.email),
      activeChanel: client.channels.get(adminEmail),
      currentChatId: adminEmail,
    })
  }, [])

  useEffect(() => {
    setChatState({
      activeChanel: client.channels.get(currentChatId),
      ...{ userChannel, currentChatId },
    })
  }, [currentChatId])

  return (
    <ChatContext.Provider
      value={{
        activeChanel,
        userChannel,
        user,
        currentChatId,
        setcurrentChatId: currentChatId => setChatState({ currentChatId }),
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
