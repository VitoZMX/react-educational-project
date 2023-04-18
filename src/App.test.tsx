import JSApp from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import {render, screen} from '@testing-library/react'

// test('renders without crashing', () => {
//     const div = document.createElement('div')
//     ReactDOM.render(<JSApp/>, div)
//     ReactDOM.unmountComponentAtNode(div)
// })
//
// test('renders learn react link', () => {
//     render(<JSApp/>)
//     const linkElement = screen.getByText(/learn react/i)
//     expect(linkElement).toBeInTheDocument()
// })

test('renders app component', () => {
    render(<JSApp/>)
    const appElement = screen.getByRole('img')
    expect(appElement).toBeInTheDocument()
})