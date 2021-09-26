import React from 'react'
import { render } from '@testing-library/react'
import Signup from '../Signup'
import userEvent from '@testing-library/user-event'

const testSignup = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: ''
}

test('renders without error', () => {
    render(<Signup signup={testSignup} />)
})

test('when the fetch button is pressed, the Items component will display', async () => {
    render(<Signup Item={testItem} />)
    const button = screen.queryByRole('button')
    userEvent.click(button)
    await waitFor(() => {
        const Item = screen.queryAllByTestId('item-container')
        expect(Item).toBeTruthy()
    })
})