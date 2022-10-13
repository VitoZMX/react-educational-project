import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true, baseURL: 'https://social-network.samuraijs.com/api/1.0/', headers: {
        'API-KEY': 'c8260a91-1168-464a-8d27-ab49b995c9ea'
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
    }
}

export const authAPI = {
    login(email, password, rememberMe = false) {
        return instance.post(`/auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`/auth/login`)
    },
    me() {
        return instance.get(`auth/me`)
    }
}