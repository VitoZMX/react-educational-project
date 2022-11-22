import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import style from './Users.module.css'

let Users = ({currentPage, onPageChanged, totalUserCounter, pageSize, users, ...props}) => {
    return <div>
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