import { useState } from 'react'

export const useForm = (fieldNames = []) => {
    const [form, setForm] = useState(
        Object.fromEntries(fieldNames.map((field) => [field, '']))
    )

    const handleFormInput = (field) => (e) =>
        setForm((f) => ({ ...f, [field]: e.target.value }))

    return [form, handleFormInput]
}
