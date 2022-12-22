import EmailValidator from 'email-validator'

export const APP_STATES = {
    UNMOUNTED: 'UNMOUNTED',
    MOUNTED: 'MOUNTED',
    LOGIN: 'LOGIN',
    SIGNUP: 'SIGNUP',
    PROFILE: 'PROFILE',
}

export const loginInputs = [
    {
        label: 'Email',
        key: 'email',
        type: 'email',
        isValid: ({ email }) =>
            email && email.length > 0 && EmailValidator.validate(email),
        validationMessage: 'Must be a valid email',
    },
    {
        label: 'Password',
        key: 'password',
        type: 'password',
        isValid: ({ password }) => password && password.length >= 8,
        validationMessage: 'Must be at least 8 characters',
    },
]

export const signupInputs = [
    {
        label: 'First Name',
        key: 'first_name',
        type: 'text',
        isValid: ({ first_name }) => first_name && first_name.length > 0,
        validationMessage: 'Cannot be blank',
    },
    {
        label: 'Last Name',
        key: 'last_name',
        type: 'text',
        isValid: ({ last_name }) => last_name && last_name.length > 0,
        validationMessage: 'Cannot be blank',
    },
    loginInputs[0], // email
    {
        label: 'Confirm Email',
        key: 'confirm_email',
        type: 'email',
        isValid: ({ email, confirm_email }) =>
            confirm_email && confirm_email === email,
        validationMessage: 'Must match email',
    },
    loginInputs[1], // password
    {
        label: 'Confirm Password',
        key: 'confirm_password',
        type: 'password',
        isValid: (value) => value && value.length > 0,
        isValid: ({ password, confirm_password }) =>
            confirm_password && confirm_password === password,
        validationMessage: 'Must match password',
    },
]
