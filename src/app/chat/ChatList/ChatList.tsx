import React from 'react'
// @ts-ignore
import {ChatList} from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'
import {ChatUser} from '../../../shared/models/chat.model'
import {ChatContext} from '../../../shared/providers/context/chat.provider'
import fakeUsers from '../../../shared/providers/context/fakeUsers.json'

class SChatList extends React.Component<{}, {}> {
  static contextType = ChatContext
  declare context: React.ContextType<typeof ChatContext>

  constructor(props: any) {
    super(props)
  }

  createList = (): ChatUser[] => {
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
    return fakeUsers.map(user => new ChatUser(user))
  }

  startConversation = (e: ChatUser) => {
    this.context.setcurrentChatId(e.email)
  }

  render() {
    return (
      <ChatList
        className="chat-list"
        dataSource={this.createList()}
        onClick={(e: ChatUser) => {
          this.startConversation(e)
        }}
      />
    )
  }
}

export default SChatList
