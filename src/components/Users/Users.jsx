import React from 'react'
import s from './Users.module.css'
import * as axios from 'axios'
import userPhoto from '../../assets/images/noimg.jpeg'

let Users = (props) => {

    if (props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                props.setUsers(response.data.items)
            })
    }

// props.setUsers(
    //     [
    //         {
    //             id: 1,
    //             followed: true,
    //             photoUrl: 'https://funik.ru/wp-content/uploads/2018/10/17478da42271207e1d86.jpg',
    //             fullName: 'Vito Zhavnerovskiy',
    //             status: 'TextStatus',
    //             location: {city: 'Minsk', country: 'Belarus'}
    //         },
    //         {
    //             id: 2,
    //             followed: true,
    //             photoUrl: 'https://cdn.fishki.net/upload/post/2016/08/13/2041199/koshki-zhivotnye-17795.jpg',
    //             fullName: 'Max Kozlov',
    //             status: 'Хэй гайс, у меня всё найс!',
    //             location: {city: 'Moskoy', country: 'Russia'}
    //         },
    //         {
    //             id: 3,
    //             followed: true,
    //             photoUrl: 'https://cs.pikabu.ru/post_img/big/2013/11/25/5/1385362124_897680212.jpg',
    //             fullName: 'Li Kudravetc',
    //             status: 'TextStatusProTOP',
    //             location: {city: 'Kiev', country: 'Ukrain'}
    //         },
    //         {
    //             id: 4,
    //             followed: false,
    //             photoUrl: 'https://phonoteka.org/uploads/posts/2021-07/1625116437_28-phonoteka_org-p-smeshnoi-kot-oboi-krasivo-29.jpg',
    //             fullName: 'Eva Evovna',
    //             status: 'LONGTextStatus',
    //             location: {city: 'Vitebsk', country: 'Belarus'}
    //         },
    //         {
    //             id: 5,
    //             followed: false,
    //             photoUrl: 'https://i.ucrazy.ru/files/i/2013.7.7/1373197910_k-24.jpg',
    //             fullName: 'ProstName ProstoLongSurnameTOP',
    //             status: 'MiniTextStatusLong13P-R-O',
    //             location: {city: 'Varshava', country: 'Poland'}
    //         }
    //     ]
    // )

    return <div className={s.usersPage}>
        {
            props.users.map(u => <div key={u.id} className={s.userCont}>
                <span>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto}
                             alt='avaImg'/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
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
            </div>)
        }
    </div>
}

export default Users