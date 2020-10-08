import axios from 'axios'
// import { useContext, useEffect } from 'react'
// import { TimeContext } from '../../contexts/TimeContext'
const baseApiUrl = 'http://localhost:5000'
const requestConfig = {}






export const createBooking = async (endpoint, data) => {
    await axios.post(baseApiUrl + endpoint, data)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        });
}

export const checkAvailability = async (endpoint, date) => {
    await axios.get(baseApiUrl + endpoint + date)
        .then(response => {
            console.log('response is', response)
            if (response.data.data.avilable_first && response.data.data.avilable_last <= 0) {
                return false
            }
            else if (response.data.data.avilable_first <= 0) {


            }
            else if (response.data.data.avilable_last <= 0) {

            }
            else console.log('first', 'last')
        })
        .catch(error => {
            console.log(error)
        })
}

