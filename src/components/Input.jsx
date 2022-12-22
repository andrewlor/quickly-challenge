import React from 'react'

const Input = ({
    label,
    value,
    onChange,
    type,
    invalid,
    validationMessage,
}) => (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
        </label>
        <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                invalid && 'border-red-700'
            }`}
            type={type}
            placeholder={label}
            value={value}
            onChange={onChange}
        />
        {invalid && <p className="text-sm text-red-700">{validationMessage}</p>}
    </div>
)

export default Input
