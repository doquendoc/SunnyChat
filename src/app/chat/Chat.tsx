import React from 'react'
import { SessionContext } from '../../shared/providers/context/session.provider'
// @ts-ignore
import { MessageList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'

import Ably from 'ably/promises'
import { Col, Input, PageHeader, Row } from 'antd'
import { Icon } from 'semantic-ui-react'
import SChatList from './ChatList/ChatList'
import { ChatContext, ChatProvider } from '../../shared/providers/context/chat.provider'

interface IState {
  messageList?: any[]
  message?: string
  client?: Ably.Realtime
  channel?: any
}

class Chat extends React.Component<{}, IState> {
  static contextType = ChatContext
  declare context: React.ContextType<typeof ChatContext>

  constructor(args: any) {
    super(args)
    this.state = {
      messageList: [],
      message: '',
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
      if (message.clientId === this.context.user.email) {
        messageList.push(message.data)
      } else {
        message.data.position = 'left'
        messageList.push(message.data)
      }
      this.setState({ messageList })
    })
  }

  sendMessage = () => {
    const { message } = this.state
    message &&
      this.context.userChannel.publish({
        name: 'myEventName',
        data: {
          date: new Date(),
          text: message,
          type: 'text',
          position: 'right',
        },
      })
    this.setState({ message: '' })
  }

  render() {
    return (
      <Row>
        <Col span={12}>
          <div className="mr-6 rounded-t-lg">
            <PageHeader
              avatar={{ src: 'https://react.semantic-ui.com/images/avatar/large/justen.jpg' }}
              className="!border !bg-white"
              onBack={null}
              title="Oscar"
            />
            <MessageList
              className="message-list !shadow-sm h-[420px] !bg-[#cdcdcd]"
              lockable={true}
              toBottomHeight={'100px'}
              dataSource={this.state.messageList}
            />
            <Input
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
          <SChatList />
        </Col>
      </Row>
    )
  }
}

export default Chat
