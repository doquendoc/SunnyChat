import React from 'react'
import { SessionContext } from '../../shared/providers/context/session.provider'
// @ts-ignore
import { MessageList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'

import Ably from 'ably/promises'
import { Col, Input, PageHeader, Row } from 'antd'
import { Icon } from 'semantic-ui-react'
import SChatList from './ChatList/ChatList'
import {BROADCAST_CHAT, ChatContext, ChatProvider} from '../../shared/providers/context/chat.provider'
import { IUser } from '../../shared/helpers/hooks/interface.hooks'
import { ChatUser } from '../../shared/models/chat.model'
import fakeUsers from '../../shared/providers/context/fakeUsers.json'
import { openNotificationWithIcon } from '../../shared/helpers/message.helpers'

interface IState {
  messageList?: any[]
  message?: string
  selectedUser: ChatUser
}

class Chat extends React.Component<{}, IState> {
  static contextType = ChatContext
  declare context: React.ContextType<typeof ChatContext>

  constructor(args: any) {
    super(args)
    this.state = {
      messageList: [],
      message: '',
      selectedUser: new ChatUser(BROADCAST_CHAT),
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.subscribe()
    }, 200)
  }

  subscribe = async () => {
    await this.context.userChannel.subscribe((message: any) => {
      const messageList = this.state.messageList.slice()
      message.data.date = new Date(message.data.date)
      if (message.clientId === this.context.currentChatId) {
        message.data.position = 'left'
        messageList.push(message.data)
      } else {
        openNotificationWithIcon(
          'info',
          'Message',
          `El usuario ${message.clientId} te ha enviado un mensjae: ${message.data.text}`,
        )
      }
      this.setState({ messageList })
    })

    await this.context.groupChanel.subscribe((message: any) => {
      if (this.context.user.email !== this.context.adminEmail && message.clientId === this.context.adminEmail) {
          if(this.context.currentChatId === BROADCAST_CHAT.email){
              const messageList = this.state.messageList.slice()
              message.data.date = new Date(message.data.date)
              message.data.position = 'left'
              messageList.push(message.data)
              this.setState({ messageList })
          }
          else {
              openNotificationWithIcon(
                  'info',
                  'Message',
                  `El usuario ${message.clientId} te ha enviado un mensjae: ${message.data.text}`,
              )
          }
      }
    })
  }

  sendMessage = () => {
    const { message } = this.state
    if (message) {
      const data = {
        date: new Date(),
        text: message,
        type: 'text',
        position: 'right',
      }
      this.context.activeChanel.publish({ name: 'myEventName', data })
      const messageList = this.state.messageList
      messageList.push(data)
      this.setState({ messageList })
    }
    this.setState({ message: '' })
  }

  render() {
    return (
      <Row>
        <Col span={12}>
          <div className="mr-6 rounded-t-lg">
            <PageHeader
              avatar={{ src: this.state.selectedUser.avatar }}
              className="!border !bg-white"
              onBack={null}
              title={this.state.selectedUser.username}
            />
            <MessageList
              className="message-list !shadow-sm h-[420px] !bg-[#cdcdcd]"
              lockable={true}
              toBottomHeight={'100px'}
              dataSource={this.state.messageList}
            />
            <Input
              disabled={this.context.currentChatId === BROADCAST_CHAT.email && this.context.isSuperAdmin() }
              value={this.state.message}
              onPressEnter={this.sendMessage}
              onChange={(e: any) => this.setState({ message: e.target.value })}
              size="large"
              suffix={
                <Icon name="send" size="large" onClick={this.sendMessage} className="cursor-pointer !bg-blue !mb-2" />
              }
              placeholder="Type here..."
            />
          </div>
        </Col>
        <Col span={12}>
          <SChatList
            cleanMessageList={() => this.setState({ messageList: [] })}
            passUserData={selectedUser => {
              this.setState({ selectedUser })
            }}
          />
        </Col>
      </Row>
    )
  }
}

export default Chat
