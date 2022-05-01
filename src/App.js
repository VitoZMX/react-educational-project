import React from "react"
import './App.css'


const App = () => {
    return (
        <div className='app-wrapper'>
            <header className='header'>
                <img src="https://png.pngtree.com/element_our/png/20180912/coffee-time-png_91570.jpg"/>
            </header>
            <nav className='nav'>
                <div><a>Profile</a></div>
                <div><a>Massages</a></div>
                <div><a>News</a></div>
                <div><a>Music</a></div>
                <div><a>Settings</a></div>
            </nav>
            <div className='content'>
                <div>
                    <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"/>
                </div>
                <div>ava + description</div>
                <div>My posts
                    <div>New post</div>
                    <div>
                        <div>post 1</div>
                        <div>post 2</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App