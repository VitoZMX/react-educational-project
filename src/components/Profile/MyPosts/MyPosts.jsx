import React from 'react'
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div className={s.conteinerPosts}>
            <h3>My posts</h3>
            <div>
                <div><textarea></textarea></div>
                <div>
                    <button>Add post</button>
                    <button>Remove</button>
                </div>

            </div>
            <div className={s.posts}>
                <Post message='Hi, are you?' likeCoun="2"/>
                <Post message="It's my first post!" likeCoun="12"/>
                <Post message="Hello world!" likeCoun="4"/>
            </div>
        </div>
    )
}

export default MyPosts