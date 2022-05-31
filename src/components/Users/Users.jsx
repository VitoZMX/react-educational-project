import React from 'react'
import s from './Users.module.css'
import userPhoto from '../../assets/images/noimg.jpeg'
import {NavLink} from 'react-router-dom'
import {followedAPI} from '../../api/api'

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUserCounter / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div className={s.usersPage}>
        <div className={s.selectedPageContainer}>
            {pages.map(p => {
                return <span className={props.currentPage === p && s.selectedPage}
                             onClick={(e) => {props.onPageChanged(p)}}>{p}</span>
            })}
        </div>
        {props.users.map(u => <div key={u.id} className={s.userCont}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto}
                             alt='avaImg'/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed ? <button onClick={() => {

                                followedAPI.unfollowUser(u.id).then(data => {
                                    if (data.resultCode === 0) {
                                        props.unfollow(u.id)
                                    }
                                })

                            }}>Unfollow</button>
                            : <button onClick={() => {

                                followedAPI.followUser(u.id).then(data => {
                                    if (data.resultCode === 0) {
                                        props.follow(u.id)
                                    }
                                })

                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div className={s.fullName}>{u.name}</div><div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div><div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)}
    </div>
}

export default Users