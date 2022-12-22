import React from 'react'
import { render } from '@testing-library/react'
import { Profile } from './Profile'

it('Renders', () => {
    const { getByText } = render(<Profile />)

    expect(getByText('Log out')).toBeTruthy()
})
