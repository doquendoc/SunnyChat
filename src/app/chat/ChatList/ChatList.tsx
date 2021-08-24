import React from 'react'
// @ts-ignore
import {ChatList} from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'
import {ChatUser} from '../../../shared/models/chat.model'
import {ChatContext} from '../../../shared/providers/context/chat.provider'
import fakeUsers from '../../../shared/providers/context/fakeUsers.json'

interface IProps {
  cleanMessageList?: ()=>void;
  passUserData?: (data: ChatUser)=>void
}

class SChatList extends React.Component<IProps, {}> {
  static contextType = ChatContext
  declare context: React.ContextType<typeof ChatContext>

  constructor(props: any) {
    super(props)
  }

  userList = (): ChatUser[] => {
    // const a = client.channels
    //   .get('diana-channel')
    //   .presence.enter()
    //   .then(response => {
    //     client.channels
    //       .get('diana-channel')
    //       .presence.get()
    //       .then(responses => {
    //         debugger
    //       })
    //   })
    const userList = fakeUsers.filter(user=> user.email !== this.context.user.email)
    return userList.map(user => new ChatUser(user))
  }

  startConversation = (userData: ChatUser) => {
    const {context: {setcurrentChatId}, props: {cleanMessageList, passUserData}} = this;
    setcurrentChatId && setcurrentChatId(userData.email)
    cleanMessageList && cleanMessageList();
    passUserData && passUserData(userData)
  }

  render() {
    return (
      <ChatList
        className="chat-list"
        dataSource={this.userList()}
        onClick={(e: ChatUser) => {
          this.startConversation(e)
        }}
      />
    )
  }
}

export default SChatList
