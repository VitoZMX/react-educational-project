import {GetItemsType, instance, APIResponseType} from './api'

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    }, followUser(UserId: number) {
        return instance.post<APIResponseType>(`follow/${UserId}`).then(res => res.data)
    }, unfollowUser(UserId: number) {
        return instance.delete(`follow/${UserId}`).then(res => res.data) as Promise<APIResponseType>
    }
}