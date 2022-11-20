import React from 'react'
import style from './Paginator.module.css'

let Paginator = ({totalUserCounter, pageSize, currentPage, onPageChanged}) => {

    let pagesCount = Math.ceil(totalUserCounter / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div className={style.paginator}>
        {pages.map(p => {
            return <span className={currentPage === p && style.selectedPage || style.userCont}
                         onClick={(e) => {
                             onPageChanged(p)
                         }}>{p}</span>
        })}
    </div>
}

export default Paginator