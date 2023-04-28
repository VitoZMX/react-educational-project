import React, {useEffect, useState} from 'react'
import userPhoto from '../../assets/images/noimg.jpeg'


const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {
    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: React.FC = () => {
    const [messages, setMessages]
        = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    return <div style={{height: '600px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}

    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return <div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={message.photo != null ? message.photo : userPhoto}
                 style={{borderRadius: '50%', width: '50px',}}/>

            <div style={{margin: ' 8px  8px '}}>
                <b>{message.userName}</b>
                <br/>
                <a>ID: {message.userId}</a>
            </div>
        </div>
        <br/>
        <h3>{message.message}</h3>
        <hr/>
    </div>
}

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')

    const sendMessageHandler = () => {
        if (!message.trim()) {
            return
        }
        wsChannel.send(message)
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}

export default ChatPage