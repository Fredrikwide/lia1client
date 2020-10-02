import axios from 'axios'
const baseApiUrl = 'http://localhost:5000'
const requestConfig = {}


const availableFirst = true
const availableLast = true
export const createBooking = async (endpoint, data) => {
    await axios.post(baseApiUrl + endpoint, data, requestConfig)
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
                availableFirst = false

            }
            else if (response.data.data.avilable_last <= 0) {
                availableLast = false
            }
            else console.log('first', availableFirst, 'last', availableLast)
        })
        .catch(error => {
            console.log(error)
        })
}