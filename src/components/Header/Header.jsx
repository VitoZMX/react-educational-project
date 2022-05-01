import React from 'react'
import cat from "../../img/cat.png"
import s from './Header.module.css'

const Header = () => {
    return (
        <header className={s.header}>
            <img src={cat}/>
        </header>
    )
}

export default Header