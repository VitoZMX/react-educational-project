import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

let posts = [
    {id: 1, message: 'Hi, are you?', likesCount: 2},
    {id: 2, message: 'It\'s my first post!', likesCount: 12},
    {id: 3, message: 'LOLUK', likesCount: 1338},
    {id: 4, message: 'WTF', likesCount: 0},
    {id: 5, message: 'Hello world!', likesCount: 42}
]

let dialogs = [
    {id: 1, name: 'Vito'},
    {id: 2, name: 'Max'},
    {id: 3, name: 'Li'},
    {id: 4, name: 'Eva'},
    {id: 5, name: 'Crazy'}
]

let messages = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How are u?'},
    {id: 3, message: 'Yo'}
]

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App posts={posts} dialogs={dialogs} messages={messages}/>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
