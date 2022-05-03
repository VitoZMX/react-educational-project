import React from 'react'
import s from './Dialogs.module.css'

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog + " " + s.active}>
                    Vito
                </div>
                <div className={s.dialog}>
                    Max
                </div>
                <div className={s.dialog}>
                    Li
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