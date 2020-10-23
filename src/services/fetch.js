import Axios from 'axios'


const base_url = 'https://booking-app-lia1.herokuapp.com/'
const get_res_url = `${base_url}reservation/`
const admin_url = `${base_url}admin/`
const reservation_url = `${base_url}admin/reservation/`
const login_url = `${admin_url}/login`

export const getReservationByDate = async (date) => {
    const getByDate = await Axios.get(`${get_res_url}${date}`)
    return getByDate
}

export const postReservation = async (data) => {
    const postRes = await Axios.post(get_res_url, data)
    return postRes
}


export const getReservations = async (date, token) => {
    const reservationRes = await Axios.get(`${admin_url}${date}`, { headers: { 'x-auth-token': token } })
    return reservationRes
}

export const getAllReservations = async (token) => {
    const getAllReservationsRes = await Axios.get(`${reservation_url}`, { headers: { 'x-auth-token': token } })
    return getAllReservationsRes
}

export const updateReservation = async (id, data, token) => {
    const updateRes = await Axios.put(`${reservation_url}${id}`, data, { headers: { 'x-auth-token': token } })
    return updateRes
}


export const deleteReservation = async (id, token) => {
    const deleteRes = await Axios.delete(`${reservation_url}${id}`, { headers: { 'x-auth-token': token } })
    return deleteRes
}

export const getUserFromToken = async (token) => {
    const UserRes = await Axios.get(`${admin_url}`, { headers: { 'x-auth-token': token } })

    return UserRes
}

export const login = async (info) => {
    const loginRes = await Axios.post(login_url, info)
    return loginRes
}