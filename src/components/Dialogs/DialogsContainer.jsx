import React from 'react'
import {sendMessageCreator, updateNewMessageBodyTextCreator} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'

const DialogsContainer = (props) => {

    let state = props.store.getState().dialogsPage

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }

    let onNewMassageChange = (body) => {
        props.store.dispatch(updateNewMessageBodyTextCreator(body))
    }

    return (
        <Dialogs updateNewMessageBodyText={onNewMassageChange} sendMessage={onSendMessageClick} dialogsPage={state}/>
    )
}

export default DialogsContainer