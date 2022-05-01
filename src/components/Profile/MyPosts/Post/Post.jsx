import React from 'react'
import s from './Post.module.css'

const Post = () => {
    return (
        <div className={s.item}>
            <img
                src='https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
                alt='img'/>
            <span>Hello world!</span>
            <div><span>like</span></div>
        </div>
    )
}

export default Post