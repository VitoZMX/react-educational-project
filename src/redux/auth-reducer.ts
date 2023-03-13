import {FormAction, stopSubmit} from 'redux-form'
import {ResultCodeForCaptchaEnum, ResultCodesEnum} from '../api/api'
import {authAPI} from '../api/auth-api'
import {securityAPI} from '../api/security-api'
import {BaseThunkType, InferActionsTypes} from './redux-store'

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null // if null, then captcha is not required
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'samurai-network/auth/SET_USER_DATA':
        case 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'samurai-network/auth/SET_USER_DATA', payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string | null) => ({
        type: 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    } as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)

    if (loginData.resultCode === ResultCodesEnum.Success) {
        // success, get auth data
        dispatch(getAuthUserData())
        dispatch(actions.getCaptchaUrlSuccess(null))
    } else {
        if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let messages = loginData.messages.length > 0 ? loginData.messages : 'Some error'
        dispatch(stopSubmit('login', {_error: messages}))
    }
}

export const getCaptchaUrl = (): BaseThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptcha()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    let logoutData = await authAPI.logout()

    if (logoutData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

export default authReducer