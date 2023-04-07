import {FormAction, stopSubmit} from 'redux-form'
import {PhotosType, PostType, ProfileType} from '../types/types'
import {profileAPI} from '../api/profile-api'
import {BaseThunkType, InferActionsTypes} from './redux-store'

let initialState = {
    posts: [
        {id: 1, message: 'Hi, are you?', likesCount: 2},
        {id: 2, message: 'It\'s my first post!', likesCount: 12},
        {id: 3, message: 'LOLUK', likesCount: 1338},
        {id: 4, message: 'WTF', likesCount: 0},
        {id: 5, message: 'Hello world!', likesCount: 42}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/PROFILE/ADD-POST' :
            let newPost = {
                id: 6,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case 'SN/PROFILE/SET_STATUS' :
            return {
                ...state,
                status: action.status
            }
        case 'SN/PROFILE/SET_USER_PROFILE' :
            return {
                ...state,
                profile: action.profile
            }
        case 'SN/PROFILE/DELETE_POST' :
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS' :
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)

    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {
    const userID = getState().auth.userId
    const data = await profileAPI.saveProfile(profileData)

    if (data.resultCode === 0) {
        if (userID != null) {
            dispatch(getUserProfile(userID))
        } else {
            throw new Error("user can't be null")
        }

    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)

        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch (error) {
        console.log(error)
    }
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

export default profileReducer