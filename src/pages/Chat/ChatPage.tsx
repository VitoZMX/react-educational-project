import React, {useEffect, useState} from 'react'
import userPhoto from '../../assets/images/noimg.jpeg'
import {ChatMessageType} from '../../api/chat-api'
import {useDispatch, useSelector} from 'react-redux'
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../redux/chat-reducer'
import {AppDispatch, AppStateType} from '../../redux/redux-store'

const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: React.FC<{}> = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

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

const AddMessageForm: React.FC<{}> = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch: AppDispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message.trim()) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={false} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}

export default ChatPage