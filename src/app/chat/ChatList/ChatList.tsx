import React from 'react'
// @ts-ignore
import {ChatList} from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';


class SChatList extends React.Component<{}, {}> {

    render() {
        return (
            <ChatList
                className='chat-list'
                dataSource={[
                    {
                        avatar: 'https://react.semantic-ui.com/images/avatar/large/justen.jpg',
                        alt: 'Reactjs',
                        title: 'Oscar',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    },
                    {
                        avatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
                        alt: 'Reactjs',
                        title: 'Vlad',
                        subtitle: 'Hello',
                        date: new Date(),
                        unread: 0,
                    },
                    {
                        avatar: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
                        alt: 'Reactjs',
                        title: 'Euge',
                        subtitle: 'Hi!!!!',
                        date: new Date(),
                        unread: 0,
                    },
                ]}/>
        )
    }
}

export default SChatList;
