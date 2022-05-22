import React from 'react'
import s from './Post.module.css'
import photoImg from '../../../../assets/images/avaCat.jpeg'

const Post = (props) => {
    return (
        <div className={s.item}>
            <img
                src={photoImg}
                alt='img'/>
            <span>{props.message}</span>
            <div><span>like {props.likeCoun}</span></div>
        </div>
    )
}

export default Post