import React, {useEffect} from 'react'
import Paginator from '../common/Paginator/Paginator'
import {User} from './User'
import style from './Users.module.css'
import {UsersSearchForm} from './UsersSearchForm'
import {FilterType, follow, requestUsers, unfollow} from '../../redux/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUserCounter,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors'
import {AppDispatch} from '../../redux/redux-store'

type PropsType = {}

export const Users: React.FC<PropsType> = ({...props}) => {

    const totalUserCounter = useSelector(getTotalUserCounter)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const _follow = (userId: number) => {
        dispatch(follow(userId))
    }
    const _unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUserCounter} pageSize={pageSize}/>
        <div className={style.usersContainer}>
            {
                users.map(u => <User user={u}
                                     followingInProgress={followingInProgress}
                                     unfollow={_unfollow}
                                     follow={_follow}
                                     key={u.id}/>)
            }
        </div>
    </div>
}