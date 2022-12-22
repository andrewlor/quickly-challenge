import React, { useState } from 'react'
import { connect } from 'react-redux'
import { APP_STATES } from '../const'
import { useForm } from '../hooks'
import { LOGIN_REQUESTED, SET_APP_STATE } from '../redux'
import { loginInputs as inputs } from '../const'
import Input from './Input'
import { areAllInputsValid } from '../util'

export const Login = ({ goToSignup, login }) => {
    const [form, handleFormInput] = useForm(inputs.map(({ key }) => key))
    const [didSubmit, setDidSubmit] = useState(false)

    const onLogin = () => {
        setDidSubmit(true)
        if (areAllInputsValid(inputs, form)) {
            login(form)
        }
    }

    return (
        <div className="bg-white shadow-md rounded p-8 mb-4 w-1/3">
            {inputs.map(({ label, key, type, isValid, validationMessage }) => (
                <Input
                    key={key}
                    label={label}
                    value={form[key]}
                    onChange={handleFormInput(key)}
                    type={type}
                    invalid={didSubmit && !isValid(form)}
                    validationMessage={validationMessage}
                />
            ))}
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={onLogin}
                >
                    Log In
                </button>
                <span
                    className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    onClick={goToSignup}
                >
                    Not a member? Sign Up
                </span>
            </div>
        </div>
    )
}

export default connect(
    ({}) => ({}),
    (dispatch) => ({
        login: (form) => dispatch(LOGIN_REQUESTED(form)),
        goToSignup: () => dispatch(SET_APP_STATE(APP_STATES.SIGNUP)),
    })
)(Login)
