import React, { useState } from 'react'
import { connect } from 'react-redux'
import { APP_STATES } from '../const'
import { useForm } from '../hooks'
import { SET_APP_STATE, SIGNUP_REQUESTED } from '../redux'
import { signupInputs as inputs } from '../const'
import Input from './Input'
import { areAllInputsValid } from '../util'

const Signup = ({ goToLogin, signup }) => {
    const [form, handleFormInput] = useForm(inputs.map(({ key }) => key))
    const [didSubmit, setDidSubmit] = useState(false)

    const onSignup = () => {
        setDidSubmit(true)
        if (areAllInputsValid(inputs, form)) {
            signup({
                ...form,
                confirm_email: undefined,
                confirm_password: undefined,
            })
        }
    }

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
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
                    onClick={onSignup}
                >
                    Sign Up
                </button>
                <span
                    className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    onClick={goToLogin}
                >
                    Already a member? Log In
                </span>
            </div>
        </div>
    )
}

export default connect(
    ({}) => ({}),
    (dispatch) => ({
        goToLogin: () => dispatch(SET_APP_STATE(APP_STATES.LOGIN)),
        signup: (form) => dispatch(SIGNUP_REQUESTED(form)),
    })
)(Signup)
