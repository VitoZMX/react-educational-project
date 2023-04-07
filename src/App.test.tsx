import {render, screen} from '@testing-library/react'
import JSApp from './App'
import React from 'react'
import ReactDOM from 'react-dom'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<JSApp/>, div)
    ReactDOM.unmountComponentAtNode(div)
})

test('renders learn react link', () => {
    render(<JSApp/>)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})