import React from 'react'
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom"

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id

    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={path} className={s.dialog + " " + s.active}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props) => {
    return (
        <div className={s.massage}>{props.message}</div>
    )
}

const Dialogs = (props) => {

    let dialogs = [
        {id: 1, name: 'Vito'},
        {id: 2, name: 'Max'},
        {id: 3, name: 'Li'},
        {id: 4, name: 'Eva'},
        {id: 5, name: 'Crazy'}
    ]

    let messages = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are u?'},
        {id: 3, message: 'Yo'}
    ]

    let dialogsElements = dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)

    let messagesElements = messages.map(m => <Message message={m.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.massages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs