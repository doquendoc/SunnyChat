import React from 'react'
import { SessionContext } from '../../shared/providers/context/session.provider'
// @ts-ignore
import { MessageList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'

import Ably from 'ably/promises'
import { Col, Input, PageHeader, Row } from 'antd'
import { Icon, Label } from 'semantic-ui-react'
import SChatList from './ChatList/ChatList'
import { BROADCAST_CHAT, ChatContext, ChatProvider } from '../../shared/providers/context/chat.provider'
import { IUser } from '../../shared/helpers/hooks/interface.hooks'
import { ChatUser } from '../../shared/models/chat.model'
import fakeUsers from '../../shared/providers/context/fakeUsers.json'
import { openNotificationWithIcon } from '../../shared/helpers/message.helpers'

interface IState {
  messageList?: any[]
  allMessageList?: any[]
  message?: string
  selectedUser: ChatUser
  userList?: ChatUser[]
  activeUsers?: string[]
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
      userList: [],
      activeUsers: [],
      allMessageList: [],
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.subscribe()
      this.getPresence()
    }, 200)
  }

  getPresence = async () => {
    let activeUsers: string[] = this.state.activeUsers
    this.context.groupChanel.presence.get().then((responses: any) => {
      responses.map((user: any) => {
        if (!this.state.activeUsers.includes(user.clientId)) {
          activeUsers.push(user.clientId)
          this.setState(
            {
              activeUsers: activeUsers,
            },
            () => this.createUserList(),
          )
        }
      })
      this.setState({
        activeUsers: activeUsers,
      })
    })

    await this.context.groupChanel.presence.subscribe('enter', (member: any) => {
      if (!this.state.activeUsers.includes(member.clientId)) {
        activeUsers.push(member.clientId)
        openNotificationWithIcon('info', 'Message', `The user ${member.clientId} is ready to have a nice chat!`)
        this.setState(
          {
            activeUsers: activeUsers,
          },
          () => this.createUserList(),
        )
      }
    })

    await this.context.groupChanel.presence.subscribe('leave', (member: any) => {
      if (this.state.activeUsers.includes(member.clientId)) {
        activeUsers = activeUsers.filter((email: any) => email != member.clientId)
        openNotificationWithIcon('info', 'Message', `The user ${member.clientId} have better things to do!`)
        this.setState(
          {
            activeUsers: activeUsers,
          },
          () => this.createUserList(),
        )
      }
    })
  }

  createUserList = (): void => {
    const userList: any = fakeUsers.filter(user => user.email !== this.context.user.email)
    userList.push(BROADCAST_CHAT)
    this.setState({
      userList: userList.map((user: any) => {
        const active = this.state.activeUsers.includes(user.email)
        console.log(new ChatUser({ ...user, active }))
        return new ChatUser({ ...user, active })
      }),
    })
  }

  cleanChat = () => {
    return this.state.allMessageList.filter(
      (item: any) => item === this.context.currentChatId || item === this.context.user.clientID,
    )
  }

  subscribe = async () => {
    await this.context.userChannel.subscribe((message: any) => {
      const allMessageList = this.state.allMessageList.slice()
      message.data.date = new Date(message.data.date)
      if (message.clientId === this.context.currentChatId) {
        message.data.position = 'left'
      } else {
        openNotificationWithIcon('info', 'Message', `The user ${message.clientId} says: ${message.data.text}`)
      }
      allMessageList.push(message.data)
      this.setState({ allMessageList })
    })

    await this.context.groupChanel.subscribe((message: any) => {
      if (this.context.user.email !== this.context.adminEmail && message.clientId === this.context.adminEmail) {
        if (this.context.currentChatId === BROADCAST_CHAT.email) {
          const allMessageList = this.state.allMessageList.slice()
          message.data.date = new Date(message.data.date)
          message.data.position = 'left'
          allMessageList.push(message.data)
          this.setState({ allMessageList })
        } else {
          openNotificationWithIcon('info', 'Message', `The admin ${message.clientId} says: ${message.data.text}`)
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
        clientId: this.context.user.email,
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
              avatar={{ src: this.state.selectedUser.avatar, size: 60 }}
              className="!border !bg-white"
              onBack={null}
              title={this.state.selectedUser.name}
              extra={
                this.state.activeUsers.includes(this.state.selectedUser.email)
                  ? 'Online'
                  : this.context.currentChatId == BROADCAST_CHAT.email
                  ? 'Online'
                  : 'Offline'
              }
            />
            <MessageList
              className="message-list !shadow-sm h-[400px] !bg-[#cdcdcd]"
              lockable={true}
              toBottomHeight={'100px'}
              dataSource={this.cleanChat()}
            />
            <Input
              disabled={this.context.currentChatId === BROADCAST_CHAT.email && !this.context.isSuperAdmin()}
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
            passUserData={selectedUser => {
              this.setState({ selectedUser })
            }}
            userList={this.state.userList}
          />
        </Col>
      </Row>
    )
  }
}

export default Chat
