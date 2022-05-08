import React from 'react'
import s from './MyPosts.module.css'
import Post from "./Post/Post"

const MyPosts = () => {

    let postData = [
        {id: 1, message: 'Hi, are you?', likesCount: 2},
        {id: 2, message: 'It\'s my first post!', likesCount: 12},
        {id: 3, message: 'Hello world!', likesCount: 42}
    ]

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
                <Post message={postData[0].message} likeCoun={postData[0].likesCount}/>
                <Post message={postData[1].message} likeCoun={postData[1].likesCount}/>
                <Post message={postData[2].message} likeCoun={postData[2].likesCount}/>
            </div>
        </div>
    )
}

export default MyPosts