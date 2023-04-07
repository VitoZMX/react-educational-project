import React from 'react'
import s from './Post.module.css'
import photoImg from '../../../../assets/images/avaCat.jpeg'

type PropsType = {
    message: string
    likeCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <img src={photoImg} alt='img'/>
            <span>{props.message}</span>
            <div><span>like {props.likeCount}</span></div>
        </div>
    )
}

export default Post