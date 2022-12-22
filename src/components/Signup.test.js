import React from 'react'
import { render } from '@testing-library/react'
import { Signup } from './Signup'

it('Renders', () => {
    const { getByText } = render(<Signup />)

    expect(getByText('Sign Up')).toBeTruthy()
})
