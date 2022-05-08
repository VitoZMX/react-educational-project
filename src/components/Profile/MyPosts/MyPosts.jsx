import React from 'react'
import s from './MyPosts.module.css'
import Post from "./Post/Post"

const MyPosts = () => {

    let posts = [
        {id: 1, message: 'Hi, are you?', likesCount: 2},
        {id: 2, message: 'It\'s my first post!', likesCount: 12},
        {id: 3, message: 'LOLUK', likesCount: 1338},
        {id: 4, message: 'WTF', likesCount: 0},
        {id: 5, message: 'Hello world!', likesCount: 42}
    ]

    let postElements = posts.map(p => <Post message={p.message} likeCoun={p.likesCount}/>)

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
                {postElements}
            </div>
        </div>
    )
}

export default MyPosts