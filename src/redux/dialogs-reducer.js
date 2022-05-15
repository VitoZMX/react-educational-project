const UPDATE_NEW_MESSAGE_BODY_TEXT = 'UPDATE-NEW-MESSAGE-BODY-TEXT'
const SEND_MESSAGE = 'SEND-MESSAGE'

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY_TEXT:
            state.newMessageBodyText = action.bodyText
            return state
        case SEND_MESSAGE:
            let newBodyText = state.newMessageBodyText
            state.newMessageBodyText = ''
            state.messages.push({id: 8, message: newBodyText})
            return state
        default:
            return state
    }
}
export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyTextCreator = (text) => ({type: UPDATE_NEW_MESSAGE_BODY_TEXT, bodyText: text})

export default dialogsReducer