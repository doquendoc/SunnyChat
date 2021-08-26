import React from 'react'
// @ts-ignore
import {MessageList} from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'
import {Col, Input, PageHeader, Row} from 'antd'
import {Icon} from 'semantic-ui-react'
import SChatList from './ChatList/ChatList'
import {BROADCAST_CHAT, ChatContext} from '../../shared/providers/context/chat.provider'
import {ChatUser} from '../../shared/models/chat.model'
import fakeUsers from '../../shared/providers/context/fakeUsers.json'
import {openNotificationWithIcon} from '../../shared/helpers/message.helpers'

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
        const isGroup = user.email === BROADCAST_CHAT.email;
        return new ChatUser({ ...user, active, isGroup })
      }),
    })
  }

  cleanChat = () => {
    return this.state.allMessageList.filter(
      (item: any) =>
        (item.clientId === this.context.currentChatId && item.targgetId !== BROADCAST_CHAT.email) ||
        (item.targgetId === this.context.currentChatId && !this.context.isSuperAdmin()) ||
        (item.clientId === this.context.user.email && item.targgetId === this.context.currentChatId),
    )
  }

  subscribe = async () => {
    await this.context.userChannel.subscribe((message: any) => {
      const allMessageList = this.state.allMessageList.slice()
      message.data.date = new Date(message.data.date)
      if (message.clientId !== this.context.user.email) {
        message.data.position = 'left'
        if (message.clientId !== this.context.currentChatId) {
          openNotificationWithIcon('info', 'Message', `The user ${message.clientId} says: ${message.data.text}`)
        }
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
        targgetId: this.context.currentChatId,
      }
      this.context.activeChanel.publish({ name: 'myEventName', data })
      const allMessageList = this.state.allMessageList
      allMessageList.push(data)
      this.setState({ allMessageList })
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
