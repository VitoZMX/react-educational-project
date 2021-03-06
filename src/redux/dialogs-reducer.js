const UPDATE_NEW_MESSAGE_BODY_TEXT = 'UPDATE-NEW-MESSAGE-BODY-TEXT'
const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are u?'},
        {id: 3, message: 'Yo'}
    ],
    dialogs: [
        {id: 1, name: 'Vito'},
        {id: 2, name: 'Max'},
        {id: 3, name: 'Li'},
        {id: 4, name: 'Eva'},
        {id: 5, name: 'Crazy'}
    ],
    newMessageBodyText: ''
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY_TEXT:
            return {
                ...state,
                newMessageBodyText: action.bodyText
            }
        case SEND_MESSAGE: {
            let newBodyText = state.newMessageBodyText
            return {
                ...state,
                newMessageBodyText: '',
                messages: [...state.messages, {id: 8, message: newBodyText}]
            }
        }
        default:
            return state
    }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyTextCreator = (text) => ({type: UPDATE_NEW_MESSAGE_BODY_TEXT, bodyText: text})

export default dialogsReducer