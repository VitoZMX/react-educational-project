import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import AddPostForm, {AddPostFormValuesType} from "./Post/AddPostForm/AddPostForm";
import {PostType} from "../../../types/types";

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
    console.log('RENDER MyPosts')

    let postElements = [...props.posts]
        .reverse()
        .map(p => <Post message={p.message} key={p.id} likeCount={p.likesCount}/>)

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.conteinerPosts}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized