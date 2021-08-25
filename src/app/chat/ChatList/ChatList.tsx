import { PageHeader } from 'antd'
import React from 'react'
// @ts-ignore
import { ChatList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'
import { List, Image, Label } from 'semantic-ui-react'
import { ChatUser } from '../../../shared/models/chat.model'
import { BROADCAST_CHAT, ChatContext } from '../../../shared/providers/context/chat.provider'
import fakeUsers from '../../../shared/providers/context/fakeUsers.json'

interface IProps {
  cleanMessageList?: () => void
  passUserData?: (data: ChatUser) => void
  userList: ChatUser[]
}

class SChatList extends React.Component<IProps, {}> {
  static contextType = ChatContext
  declare context: React.ContextType<typeof ChatContext>

  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    setTimeout(() => {}, 200)
  }

  userList = (): ChatUser[] => {
    return this.props.userList.map((user: any) => new ChatUser(user))
  }

  startConversation = (userData: ChatUser) => {
    const {
      context: { setcurrentChatId },
      props: { cleanMessageList, passUserData },
    } = this
    setcurrentChatId && setcurrentChatId(userData.email)
    cleanMessageList && cleanMessageList()
    passUserData && passUserData(userData)
  }

  render() {
    return [
      <PageHeader className="!border !bg-white -mb-6" onBack={null} title="User List" />,
      <List animated verticalAlign="middle" size="huge" celled className="bg-white !border-l !border-r">
        {this.props.userList.map((item: ChatUser) => (
          <List.Item
            onClick={() => {
              this.startConversation(item)
            }}
            className="!py-5 cursor-pointer"
          >
            <Label as="a" color={item.active ? 'green' : 'grey'} ribbon size="small">
              {item.active ? 'Online' : 'Offline'}
            </Label>
            <Image avatar src={item.avatar} size="tiny" />
            <List.Content>
              <List.Header>{item.name}</List.Header>
              <List.Description>{item.subtitle}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>,

      // <ChatList
      //   className="chat-list"
      //   dataSource={this.props.userList}
      //   onClick={(e: ChatUser) => {
      //     this.startConversation(e)
      //   }}
      // />
    ]
  }
}

export default SChatList
