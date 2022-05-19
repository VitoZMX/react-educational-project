import React from 'react'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import s from './Dialogs.module.css'

const Dialogs = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>)
    let newMessageBodyText = state.newMessageBodyText

    let onSendMessageClick = () => {
        props.sendMessage()
    }

    let onNewMassageChange = (event) => {
        let bodyText = event.target.value
        props.updateNewMessageBodyText(bodyText)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.massages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={newMessageBodyText} onChange={onNewMassageChange}
                                   placeholder='Enter your message'></textarea></div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs