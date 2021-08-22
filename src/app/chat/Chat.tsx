import React from 'react'
import {SessionContext} from "../../shared/providers/context/session.provider";
// @ts-ignore
import {MessageList} from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';

import Ably from "ably/promises";
import {Col, Input, PageHeader, Row} from "antd";
import {Icon} from "semantic-ui-react";
import SChatList from './ChatList/ChatList';

interface IState {
    messageList?: any[];
    message?: string;
    client?: Ably.Realtime;
    channel?: any;
}

class Chat extends React.Component<{}, IState> {
    static contextType = SessionContext;
    context!: React.ContextType<typeof SessionContext>;

    constructor(args: any) {
        super(args);
        this.state = {
            messageList: [],
            message: "",
        }
    }


    authCallback = (tokenParams:any, callback:any) => {
        var rest = new Ably.Rest({key: 'AxN5xw.SJVx5g:crbQ6fEXvKWzJhhg'});
        // @ts-ignore
        rest.auth.createTokenRequest({clientId: this.context.user.email}, (err:any, tokenRequest:any) => {
            console.log('Token request created for clientId: ' + tokenRequest.clientId, 'orange');
            callback(null, tokenRequest);
        });
    }

    componentDidMount() {
        const client = new Ably.Realtime({authCallback: this.authCallback});
        this.setState({
            client,
            channel: client.channels.get('diana-channel')
        })
        const a = client.channels.get('diana-channel').presence.enter().then(response => {
            client.channels.get('diana-channel').presence.get().then(responses => {
                debugger
            });
        })
        setTimeout(() => {
            this.subscribe()
        }, 200)
    }

    subscribe = async () => {
        await this.state.channel.subscribe((message: any) => {
            const messageList = this.state.messageList.slice();
            message.data.date = new Date(message.data.date);
            if (message.clientId === this.context.user.email) {
                messageList.push(message.data);
            } else {
                message.data.position = 'left';
                messageList.push(message.data);
            }
            this.setState({messageList});
        });
    }

    sendMessage = () => {
        const {message, channel} = this.state;
        message && channel.publish({
            name: "myEventName", data: {
                date: new Date(),
                text: message,
                type: 'text',
                position: 'right',
            }
        });
        this.setState({message: ""});
    };

    render() {
        return (
            <Row>
                <Col span={12}>
                    <div className='mr-6 rounded-t-lg'>
                        <PageHeader
                            avatar={{src: "https://react.semantic-ui.com/images/avatar/large/justen.jpg"}}
                            className="!border !bg-white"
                            onBack={null}
                            title="Oscar"
                        />
                        <MessageList
                            className='message-list !shadow-sm h-[420px] !bg-[#cdcdcd]'
                            lockable={true}
                            toBottomHeight={'100px'}
                            dataSource={this.state.messageList}
                        />
                        <Input
                            value={this.state.message}
                            onPressEnter={this.sendMessage}
                            onChange={(e: any) => this.setState({message: e.target.value})}
                            size='large'
                            suffix={
                                <Icon name='send'
                                      size='large'
                                      onClick={this.sendMessage}
                                      className='cursor-pointer !bg-blue !mb-2'
                                />
                            }
                            placeholder='Type here...'
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

export default Chat;
