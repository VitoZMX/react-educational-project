import React from 'react'
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog + " " + s.active}>
                    <NavLink to="/dialogs/1" className={s.dialog + " " + s.active}>Vito</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to="/dialogs/2" className={s.dialog}>Max</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to="/dialogs/3" className={s.dialog}>Li</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to="/dialogs/4" className={s.dialog}>Eva</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to="/dialogs/5" className={s.dialog}>Crazy</NavLink>
                </div>
            </div>
            <div className={s.massages}>
                <div className={s.massage}>Hi</div>
                <div className={s.massage}>How are u?</div>
                <div className={s.massage}>Yo</div>
            </div>
        </div>
    )
}

export default Dialogs