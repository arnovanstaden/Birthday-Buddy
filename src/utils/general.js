import { differenceInYears, getMonth, getDate, getYear, isPast, addYears, differenceInCalendarDays, format } from 'date-fns'

export const validateForm = (e, form) => {
    e.preventDefault()

    // Validate
    if (form.checkValidity() === false) {
        return false
    }

    return true
}

const getNextBirthday = (date) => {
    let nextBirthday;
    const birthdayThisYear = new Date(getYear(new Date()), getMonth(date), getDate(date));
    if (isPast(birthdayThisYear)) {
        nextBirthday = addYears(birthdayThisYear, 1)
    } else {
        nextBirthday = birthdayThisYear
    }
    return nextBirthday
}


export const getCardFormatBirthday = (date) => {
    return format(getNextBirthday(date), "E',' dd LLL yyyy");
}

export const getCardFormatAge = (date) => {
    const age = differenceInYears(new Date(), date);
    return age + 1
}

export const getBirthdayDaysAway = (date) => {
    const daysAway = differenceInCalendarDays(getNextBirthday(date), new Date());
    return daysAway
}