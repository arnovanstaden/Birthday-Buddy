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

export const resizeProfilePicture = async (file) => {
    const image = new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            200,
            200,
            "jpeg",
            80,
            0,
            (uri) => {
                resolve(uri);
            },
            "file",
            200,
            200
        );
    });
    return image
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

export const sendMessage = (name) => {
    if (navigator.share) {
        navigator.share({
            text: `Happy Birthday!`,
        })
            .catch((error) => console.log('Error sharing', error));
    }
}



export const urlBase64ToUint8Array = (base64String) => {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}