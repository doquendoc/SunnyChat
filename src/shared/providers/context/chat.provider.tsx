import * as React from 'react'
import { useEffect, useState } from 'react'
import { IChatContext, ISessionContext } from './session.interface'
import Ably from 'ably/promises'
import { SessionContext } from './session.provider'

export const ChatContext = React.createContext<IChatContext>({})

export const BROADCAST_CHAT = {
  avatar: 'https://react.semantic-ui.com/images/avatar/large/tom.jpg',
  id: '5',
  email: 'broadcast@sunnychat.cu',
  name: 'Grup Chat',
  username: 'Grup Chat',
  subtitle: 'Company Chat',
  active: true,
}

const channelOptions = {
  params: {
    rewind: '0',
  },
}

const rewind = '[?rewind=2]'

export const ChatProvider = ({ children }: { children: any }) => {
  const { user, adminEmail, isSuperAdmin } = React.useContext<ISessionContext>(SessionContext)
  const authCallback = (tokenParams: any, callback: any) => {
    const rest = new Ably.Rest({ key: 'AxN5xw.SJVx5g:crbQ6fEXvKWzJhhg' })
    // @ts-ignore
    rest.auth.createTokenRequest({ clientId: user.email }, (err: any, tokenRequest: any) => {
      callback(null, tokenRequest)
    })
  }
  const client = new Ably.Realtime({ authCallback })
  const [userChannel, setUserChannel] = useState<any>({})
  const [activeChanel, setActiveChanel] = useState<any>({})
  const [groupChanel, setGroupChanel] = useState<any>({})
  const [currentChatId, setCurrentChatId] = useState<any>({})

  useEffect(() => {
    const groupChat = client.channels.get(BROADCAST_CHAT.email, channelOptions)
    setUserChannel(client.channels.get(user.email, channelOptions))
    setActiveChanel(client.channels.get(BROADCAST_CHAT.email, channelOptions))
    setGroupChanel(groupChat)
    groupChat.presence.enter()
    setCurrentChatId(BROADCAST_CHAT.email)
  }, [])

  useEffect(() => {
    if (currentChatId) {
      setActiveChanel(client.channels.get(rewind + currentChatId, channelOptions))
    }
  }, [currentChatId])

  return (
    <ChatContext.Provider
      value={{
        activeChanel,
        userChannel,
        user,
        currentChatId,
        groupChanel,
        adminEmail,
        isSuperAdmin,
        setcurrentChatId: currentChatId => setCurrentChatId(currentChatId),
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
