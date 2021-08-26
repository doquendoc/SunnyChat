import {PageHeader} from 'antd'
import React from 'react'
// @ts-ignore
import 'react-chat-elements/dist/main.css'
import {Icon, Image, Label, List} from 'semantic-ui-react'
import {ChatUser} from '../../../shared/models/chat.model'
import {ChatContext} from '../../../shared/providers/context/chat.provider'
import {CheckCircleTwoTone, MinusCircleTwoTone} from '@ant-design/icons';

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
        setTimeout(() => {
        }, 200)
    }

    userList = (): ChatUser[] => {
        return this.props.userList.map((user: any) => new ChatUser(user))
    }

    startConversation = (userData: ChatUser) => {
        const {
            context: {setcurrentChatId},
            props: {cleanMessageList, passUserData},
        } = this
        setcurrentChatId && setcurrentChatId(userData.email)
        cleanMessageList && cleanMessageList()
        passUserData && passUserData(userData)
    }

    render() {
        return [
            <PageHeader className="!border !bg-white -mb-6" onBack={null} title="User List"/>,
            <List animated verticalAlign="middle" size="huge" celled className="bg-white !border-l !border-r">
                {this.props.userList.map((item: ChatUser) => (
                    <List.Item
                        onClick={() => {
                            this.startConversation(item)
                        }}
                        className="!py-5 cursor-pointer !pl-8"
                    >
                        {!item.isGroup &&
                          item.active ?
                              <CheckCircleTwoTone className='absolute left-22 z-50 !mt-14' twoToneColor='green' />
                              :
                              <MinusCircleTwoTone className='absolute left-22 z-50 !mt-14' twoToneColor='red' />
                        }
                      <Image avatar src={item.avatar} size="tiny"/>
                        <List.Content>
                            <List.Header className='!mb-2'>
                                {item.name}
                            </List.Header>
                            <List.Description>{item.subtitle}</List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>,
        ]
    }
}

export default SChatList
