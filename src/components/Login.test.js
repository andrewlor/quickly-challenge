import React from 'react'
import { render } from '@testing-library/react'
import { Login } from './Login'

it('Renders', () => {
    const { getByText } = render(<Login />)

    expect(getByText('Log In')).toBeTruthy()
})
