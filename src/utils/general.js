export const validateForm = (e, form) => {
    e.preventDefault()

    // Validate
    if (form.checkValidity() === false) {
        return false
    }

    return true
}