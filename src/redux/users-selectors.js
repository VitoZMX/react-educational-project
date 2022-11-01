export const getUsers = (state) => {
    return state.usersPage.users
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getTotalUserCounter = (state) => {
    return state.usersPage.totalUserCounter
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getToggleFollowingProgress = (state) => {
    return state.usersPage.toggleFollowingProgress
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}