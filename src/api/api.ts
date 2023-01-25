import axios from 'axios'
import {ProfileType} from '../types/types'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'cf3331ca-929b-4d3e-9d1c-4d65e80ca53c'
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    }, followUser(UserId: number) {
        return instance.post(`follow/${UserId}`)
    }, unfollowUser(UserId: number) {
        return instance.delete(`follow/${UserId}`)
    }, getProfile(userId: number) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId)
    }, getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
    }, updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    }, savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }, saveProfile(profileData: ProfileType) {
        return instance.put(`profile/`, profileData)
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}

type LogoutResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: any
}

export const authAPI = {
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`/auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>(`/auth/login`).then(res => res.data)
    },
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
    }
}

type GetCaptchaType = {
    url: string
}

export const securityAPI = {
    getCaptcha() {
        return instance.get<GetCaptchaType>(`security/get-captcha-url`).then(res => res.data)
    }
}