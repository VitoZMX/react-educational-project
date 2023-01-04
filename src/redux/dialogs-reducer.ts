const SEND_MESSAGE = 'SEND-MESSAGE'

type DialogsType = {
    id: number
    name: string
}

type MessagesType = {
    id: number
    message: string
}

let initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are u?'},
        {id: 3, message: 'Yo'}
    ] as Array<MessagesType>,
    dialogs: [
        {id: 1, name: 'Vito'},
        {id: 2, name: 'Max'},
        {id: 3, name: 'Li'},
        {id: 4, name: 'Eva'},
        {id: 5, name: 'Crazy'}
    ] as Array<DialogsType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

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
type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({
    type: SEND_MESSAGE,
    newMessageBody
})

export default dialogsReducer