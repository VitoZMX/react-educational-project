import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import style from './Users.module.css'
import {UserType} from '../../types/types'
import {UsersSearchForm} from './UsersSearchForm'
import {FilterType} from '../../redux/users-reducer'

type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    totalUserCounter: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({
                                      currentPage, onPageChanged,
                                      totalUserCounter, pageSize,
                                      users, ...props
                                  }) => {
    return <div>
        <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUserCounter} pageSize={pageSize}/>
        <div className={style.usersContainer}>
            {
                users.map(u => <User user={u}
                                     followingInProgress={props.followingInProgress}
                                     unfollow={props.unfollow}
                                     follow={props.follow}
                                     key={u.id}/>)
            }
        </div>
    </div>
}

export default Users