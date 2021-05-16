import { differenceInYears, getMonth, getDate, getYear, isPast, addYears, differenceInCalendarDays, format, isToday } from 'date-fns'
import Resizer from "react-image-file-resizer";

export const validateForm = (e, form) => {
    e.preventDefault()

    // Validate
    if (form.checkValidity() === false) {
        return false
    }

    return true
}

export const resizeProfilePicture = (file) => {
    console.log(file)

    const image = Resizer.imageFileResizer(
        file,
        200,
        200,
        "png",
        100,
        0,
        (uri) => {
            return uri;
        },
        "file"
    );
    console.log(image)
}

const getNextBirthday = (date) => {
    let nextBirthday;
    const birthdayThisYear = new Date(getYear(new Date()), getMonth(date), getDate(date));
    if (isPast(birthdayThisYear) && !isToday(birthdayThisYear)) {
        nextBirthday = addYears(birthdayThisYear, 1)
    } else {
        nextBirthday = birthdayThisYear
    }
    return nextBirthday
}

export const isBirthdayToday = (date) => {
    const birthdayDate = getDate(getNextBirthday(date));
    const birthdayMonth = getMonth(getNextBirthday(date));
    const todayDate = getDate(new Date());
    const todayMonth = getMonth(new Date());
    if (birthdayDate === todayDate && birthdayMonth === todayMonth) {
        return true
    }
    return false
}


export const getCardFormatBirthday = (date) => {
    return format(getNextBirthday(date), "E',' dd LLL yyyy");
}

export const getCardFormatAge = (date) => {
    const age = differenceInYears(new Date(), date);
    if (isBirthdayToday(date)) {
        return age
    }
    return age + 1
}

export const getBirthdayDaysAway = (date) => {
    const daysAway = differenceInCalendarDays(getNextBirthday(date), new Date());
    return daysAway
}

export const sortBirthdays = (birthdays) => {
    const sorted = birthdays.sort((a, b) => getNextBirthday(new Date(a.date)) - getNextBirthday(new Date(b.date)));
    return sorted
}

export const sendMessage = () => {
    if (navigator.share) {
        navigator.share({
            title: "Happy Birthday",
            text: `Happy Birthday!`,
        })
            .catch((error) => console.log('Error sharing', error));
    }
}
