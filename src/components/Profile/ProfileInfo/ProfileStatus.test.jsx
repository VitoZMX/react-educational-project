import React from 'react'
import {create} from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status='Vito Project'/>)
        const instance = component.getInstance()
        expect(instance.state.status).toBe('Vito Project')
    })

    test('after creation <span> should be display', () => {
        const component = create(<ProfileStatus status='Vito Project'/>)
        const root = component.root
        let span = root.findByType('span')
        expect(span).not.toBeNull()
    })

    test("after creation <input> shouldn't be display", () => {
        const component = create(<ProfileStatus status='Vito Project'/>)
        const root = component.root
        expect(() => {
            let input = root.findByType('input')
        }).toThrow()
    })

    test('after creation <span> should contains correct status', () => {
        const component = create(<ProfileStatus status='Vito Project'/>)
        const root = component.root
        let span = root.findByType('span')
        expect(span.children[1]).toBe('Vito Project')
    })

    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status='Vito Project'/>)
        const root = component.root
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe('Vito Project')
    })

    test('callback should be called', () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status='Vito Project' updateStatus={mockCallback}/>)
        const instance = component.getInstance()
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})