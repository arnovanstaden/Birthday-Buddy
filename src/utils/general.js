export const validateForm = (e, form) => {
    console.log(form)
    e.preventDefault()

    // Validate
    if (form.checkValidity() === false) {
        return false
    }

    return true
}