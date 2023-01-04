import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true, baseURL: 'https://social-network.samuraijs.com/api/1.0/', headers: {
        'API-KEY': 'cf3331ca-929b-4d3e-9d1c-4d65e80ca53c'
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    }, followUser(UserId) {
        return instance.post(`follow/${UserId}`)
    }, unfollowUser(UserId) {
        return instance.delete(`follow/${UserId}`)
    }, getProfile(userId) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    }, getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    }, updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    }, savePhoto(photoFile) {
        const formData = new FormData()
        formData.append('image', photoFile)

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }, saveProfile(profileData) {
        return instance.put(`profile/`, profileData)
    }
}

export const authAPI = {
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`/auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`/auth/login`)
    },
    me() {
        return instance.get(`auth/me`)
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
    }
}