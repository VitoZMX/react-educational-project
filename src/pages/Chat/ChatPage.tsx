import React, {useEffect, useState} from 'react'
import userPhoto from '../../assets/images/noimg.jpeg'

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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket

        const closeHandler = () => {
            console.log('CLOSE WS')
            setTimeout(createChannel, 2000)
        }

        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws?.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }

        createChannel()
        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return <div>
        <Messages wsChannel={wsChannel}/>
        <AddMessageForm wsChannel={wsChannel}/>
    </div>
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }
        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

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

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }

        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessageHandler = () => {
        if (!message.trim()) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}

export default ChatPage