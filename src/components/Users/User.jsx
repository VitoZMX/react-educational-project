import React from 'react'
import s from './User.module.css'
import userPhoto from '../../assets/images/noimg.jpeg'
import {NavLink} from 'react-router-dom'

let User = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.userPhoto}
                             alt='avaImg'/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed ?
                            <button disabled={followingInProgress
                                .some(id => id === user.id)}
                                    onClick={() => {unfollow(user.id)}}>
                                Unfollow</button>
                            : <button disabled={followingInProgress
                                .some(id => id === user.id)}
                                      onClick={() => {follow(user.id)}}>
                                Follow</button>}
                    </div>
                </span>
            <span>
                    <span>
                        <div className={s.fullName}>{user.name}</div><div>{user.status}</div>
                    </span>
                    <span>
                        <div>{'user1.location.country'}</div><div>{'user1.location.city'}</div>
                    </span>
                </span>
        </div>)
}

export default User