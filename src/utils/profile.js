import axios from "axios";
import { getDate, getMonth } from 'date-fns'

export const getFamousBirthdays = async (birthday) => {
    const result = axios({
        method: "GET",
        url: "/"
    }).then(response => {
        console.log(response.data)
    }).catch(err => console.log(err))
    return "blah blah"
}

export const getTodayInHistory = async (birthday) => {
    const dateToGet = `${getMonth(birthday) + 1}/${getDate(birthday)}`
    const result = axios({
        method: "GET",
        url: `http://numbersapi.com/${dateToGet}/date`
    }).then(response => {
        return response.data
    }).catch(err => console.log(err))
    return result
}