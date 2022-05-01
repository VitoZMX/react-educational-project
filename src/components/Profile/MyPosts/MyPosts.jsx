import React from 'react'
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>My posts
            <div>
                <textarea></textarea>
                <button>Add post</button>
                <button>Remove</button>
            </div>
            <div className={s.conteinerPosts}>
                <Post message='Hi, are you?'/>
                <Post message="It's my first post!"/>
                <Post message="Hello world!"/>
            </div>
        </div>
    )
}

export default MyPosts