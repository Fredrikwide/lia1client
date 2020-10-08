import './admin.scss'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'

import moment from 'moment'
import Axios from 'axios'
import DatePicker from '../DatePicker'

const AdminHome = () => {

    const { userData, setUserData } = useContext(UserContext)
    const [deleted, setDeleted] = useState(false)
    const [currId, setCurrId] = useState()
    const [reservations, setReservations] = useState([])
    const [todaysDate, setTodaysDate] = useState(moment(new Date()).format('YYYY-MM-DD'))


    useEffect(() => {
        const getReservations = async () => {
            const reservationRes = await Axios.get(`http://localhost:5000/admin/${todaysDate}`)
            setReservations(reservationRes.data.data.reservation)
        }
        getReservations()
    }, [])

    const handleDelete = async id => {

        let res = await Axios.delete(`http://localhost:5000/admin/reservation/${id}`)

        if (res.status === 200) {
            const getReservations = async () => {
                const reservationRes = await Axios.get(`http://localhost:5000/admin/${todaysDate}`)
                setReservations(reservationRes.data.data.reservation)
            }
            getReservations()
            console.log(reservations)
        }
        else { return null }
    }




    return (
        <>
            <div className="admin-wrapper">
                <div className="head">
                    <h1>Hello, you are logged in as {userData.user.email}</h1>
                </div>
                {reservations.map((booking, index) => (
                    <div key={index} className="wrap">
                        <div className="item-box">
                            <p>Name: {booking.firstname} </p>
                            <p>Lastname: {booking.lastname}</p>
                            <p>date: {moment(booking.date).format('YYYY-MM-DD')}</p>
                            <p>time: {booking.time}</p>
                            <p>seats: {booking.people}</p>
                            <div>
                                <button onClick={() => handleDelete(booking._id)}>X</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <DatePicker />
        </>
    )
}

export default AdminHome
