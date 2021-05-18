import axios from "axios";
import { getDate, getMonth } from 'date-fns'

export const getFamousBirthdays = async (birthday) => {
    // const result = axios({
    //     method: "GET",
    //     url: "/"
    // }).then(response => {
    //     // console.log(response.data)
    // }).catch(err => console.log(err))
    return "Chuck Norris, John Cena & Rick Astley"
}

export const getTodayInHistory = async (birthday) => {
    const dateToGet = `${getMonth(birthday) + 1}/${getDate(birthday)}`;
    const result = axios({
        method: "GET",
        url: `https://numbersapi.p.rapidapi.com/${dateToGet}/date`,
        headers: {
            "x-rapidapi-key": process.env.REACT_APP_RAPID_NUMBERS_API_KEY
        }
    }).then(response => {
        return response.data
    }).catch(err => {
        console.log(err);
        return err.response
    })
    return result
}