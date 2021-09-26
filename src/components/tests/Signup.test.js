import React from 'react'
import { render } from '@testing-library/react'
import Signup from '../Signup'

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