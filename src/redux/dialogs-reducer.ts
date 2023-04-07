import {InferActionsTypes} from './redux-store'

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

export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'SN/DIALOGS/SEND-MESSAGE', newMessageBody} as const)
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/DIALOGS/SEND-MESSAGE': {
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

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export default dialogsReducer