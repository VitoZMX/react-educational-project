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
    ]
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE: {
            let newBodyText = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 8, message: newBodyText}]
            }
        }
        default:
            return state
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer