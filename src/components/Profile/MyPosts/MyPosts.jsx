import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import {Field, reduxForm} from 'redux-form'
import {maxLengthCreator, required} from '../../../utils/validators/validators'
import {Textarea} from '../../common/FormsControls/FormsControls'

let maxLength10 = maxLengthCreator(10)

const MyPosts = (props) => {
    let postElements = props.posts.map(p => <Post message={p.message} key={p.id} likeCoun={p.likesCount}/>)

    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.conteinerPosts}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
}

const addNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'newPostText'}
                       placeholder='Enter your post...' validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
                <button>Remove</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(addNewPostForm)

export default MyPosts