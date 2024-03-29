import React from 'react'
import s from './Message.module.css'

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={s.massage}>{props.message}</div>
    )
}

export default Message