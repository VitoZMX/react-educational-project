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
import {useLocation, useNavigate} from 'react-router-dom'

type PropsType = {}

type QueryParamsType = { term?: string, page?: string, friend?: string }

export const Users: React.FC<PropsType> = ({...props}) => {

    const totalUserCounter = useSelector(getTotalUserCounter)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const parsed = new URLSearchParams(location.search)
        const parsedObject = Object.fromEntries(parsed.entries()) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsedObject.page) actualPage = Number(parsedObject.page)
        if (!!parsedObject.term) actualFilter = {...actualFilter, term: parsedObject.term as string}

        switch (parsedObject.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (filter.friend !== null) query.friend = String(filter.friend)
        if (!!filter.term) query.term = filter.term
        if (currentPage !== 1) query.page = String(currentPage)

        const queryString = new URLSearchParams(query).toString()

        navigate({pathname: '/users', search: queryString})
    }, [filter, currentPage])

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