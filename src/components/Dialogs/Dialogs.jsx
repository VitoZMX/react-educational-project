import React from 'react'
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

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
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name="Vito" id="1"/>
                <DialogItem name="Max" id="2"/>
                <DialogItem name="Li" id="3"/>
                <DialogItem name="Eva" id="4"/>
                <DialogItem name="Crazy" id="5"/>
            </div>
            <div className={s.massages}>
                <Message message="HI"/>
                <Message message="How are u?"/>
                <Message message="Yo"/>
            </div>
        </div>
    )
}

export default Dialogs