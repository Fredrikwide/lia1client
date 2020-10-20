import Axios from 'axios'

const baseApiUrl = process.env.REACT_APP_BASE_API_URI
const reservationEndpoint = process.env.REACT_APP_POST_BOOKING_ENDPOINT



export const post = async (data) => {
    const postRes = await Axios.post(`${baseApiUrl}+${reservationEndpoint}`, data)
    return postRes
}

export const getReservations = async (date, token) => {
    const reservationRes = await Axios.get(`http://localhost:5000/admin/${date}`, { headers: { 'x-auth-token': token } })
    return reservationRes
}

export const getAllReservations = async (token) => {
    const getAllReservationsRes = await Axios.get(`http://localhost:5000/admin/reservation`, { headers: { 'x-auth-token': token } })
    return getAllReservationsRes
}

export const updateReservation = async (id, data, token) => {
    const updateRes = await Axios.put(`http://localhost:5000/admin/reservation/${id}`, data, { headers: { 'x-auth-token': token } })
    return updateRes
}


export const deleteReservation = async (id, token) => {
    const deleteRes = await Axios.delete(`http://localhost:5000/admin/reservation/${id}`, { headers: { 'x-auth-token': token } })
    return deleteRes
}

export const getUserFromToken = async (token) => {
    const UserRes = await Axios.get('http://localhost:5000/admin/', { headers: { 'x-auth-token': token } })
    console.log("user resp is", UserRes.data)
    return UserRes
}