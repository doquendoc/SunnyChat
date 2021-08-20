import React, {useContext, useEffect, useState} from 'react'
import {ISessionContext} from "../../shared/providers/context/session.interface";
import {SessionContext} from "../../shared/providers/context/session.provider";
import Ably from "ably/promises";

const client = new Ably.Realtime("AxN5xw.SJVx5g:crbQ6fEXvKWzJhhg");

const Chat = () => {
    const {user}: any = useContext<ISessionContext>(SessionContext);
    const channel = client.channels.get('diana-channel');
    const [ messages, updateMessages ] = useState([]);

    useEffect(() => {
        subscribe();
        return function cleanup() {
            channel.unsubscribe();
        };
    });

    async function subscribe() {
        await channel.subscribe(message => {
            console.log("A message was received", message);

            const newMessages = messages.slice();
            newMessages.push(message.data.text);

            updateMessages(newMessages);
        });
    }

    const sendMessage = () => {
        channel.publish({ name: "myEventName", data: { text: "Hello diana maria." } });
    };

    return (
        <main>
            <button onClick={sendMessage}>Click here to send a message</button>
            <h2>Messages will go here:</h2>
            <ul>
                { messages.map((text, index) => (<li key={"item" + index}>{text}</li>)) }
            </ul>
        </main>
    );
};

export default Chat;
