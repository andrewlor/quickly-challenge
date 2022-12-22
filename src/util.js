export const areAllInputsValid = (inputs, form) =>
    inputs.map(({ isValid }) => isValid(form)).reduce((a, b) => a && b, true)
