import React from 'react'
import {sendMessageCreator, updateNewMessageBodyTextCreator} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import StoreContext from '../../storeContext'

const DialogsContainer = () => {

    return <StoreContext.Consumer>
        {(store) => {
            let state = store.getState().dialogsPage

            let onSendMessageClick = () => {
                store.dispatch(sendMessageCreator())
            }

            let onNewMassageChange = (body) => {
                store.dispatch(updateNewMessageBodyTextCreator(body))
            }

            return <Dialogs updateNewMessageBodyText={onNewMassageChange} sendMessage={onSendMessageClick}
                            dialogsPage={state}/>
        }
        }
    </StoreContext.Consumer>
}

export default DialogsContainer