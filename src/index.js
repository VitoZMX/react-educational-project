import reportWebVitals from './reportWebVitals'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import JSApp from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <JSApp/>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()