import React from 'react'
import {sendMessageCreator, updateNewMessageBodyTextCreator} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import {connect} from 'react-redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'

let AuthRedirectComponent = withAuthRedirect(Dialogs)

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBodyText: (body) => {
            dispatch(updateNewMessageBodyTextCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default DialogsContainer