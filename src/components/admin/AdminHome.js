import './admin.scss'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import Calendar from 'react-calendar'
import { config } from '../../config';
import moment from 'moment'
import Axios from 'axios'


const AdminHome = () => {

    const { userData, setUserData } = useContext(UserContext)
    const [deleted, setDeleted] = useState(false)
    const [currId, setCurrId] = useState()
    const [reservations, setReservations] = useState([])
    const [todaysDate, setTodaysDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [newDate, setNewDate] = useState(new Date())


    let maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + config.maxMonths)

    useEffect(() => {
        const getReservations = async () => {
            const reservationRes = await Axios.get(`http://localhost:5000/admin/${todaysDate}`)
            setReservations(reservationRes.data.data.reservation)
        }
        getReservations()
    }, [])


    useEffect(() => {
        const getNewReservations = async () => {
            const reservationRes = await Axios.get(`http://localhost:5000/admin/${todaysDate}`)
            setReservations(reservationRes.data.data.reservation)
        }
        getNewReservations()
    }, [todaysDate])

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

    const handleChangeDate = newDate => {
        setTodaysDate(newDate)
    }


    return (
        <>
            <div className="admin-wrapper">
                <div className="head">
                    <h1>Hello, you are logged in as {userData.user.email}</h1>
                </div>
                <div className="cont">
                    <div className="outer">
                        {reservations.map((booking, index) => (
                            <div key={index} className="inner">
                                <div className="item-box">
                                    <p>Name: {booking.firstname} </p>
                                    <p>Lastname: {booking.lastname}</p>
                                    <p>date: {moment(booking.date).format('YYYY-MM-DD')}</p>
                                    <p>time: {booking.time}</p>
                                    <p>seats: {booking.people}</p>
                                    <div className="btn-box-outer">
                                        <div className="btn">
                                            <button onClick={() => handleDelete(booking._id)}>X</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                    <div className="date-outer">
                        <Calendar
                            onChange={handleChangeDate}
                            value={newDate}
                            maxDate={maxDate}
                            minDate={new Date()}

                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHome
