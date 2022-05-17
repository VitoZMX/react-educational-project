import React from 'react'
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'
import StoreContext from '../../../storeContext'

const MyPostsContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {

                let state = store.getState()

                let addPost = () => {
                    store.dispatch(addPostActionCreator())
                }

                let onPostChange = (text) => {
                    let action = updateNewPostTextActionCreator(text)
                    store.dispatch(action)
                }

                return <MyPosts posts={store.getState().profilePage.posts} updateNewPostText={onPostChange}
                                addPost={addPost}
                                newPostText={store.getState().profilePage.newPostText}/>
            }
            }
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer