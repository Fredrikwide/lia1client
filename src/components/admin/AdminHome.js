import './admin.scss'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { UpdateContext } from '../../contexts/UpdateContext'
import Calendar from 'react-calendar'
import { config } from '../../config';
import moment from 'moment'
import Axios from 'axios'
import { checkToken } from '../../services/authToken'
import { getUserFromToken } from '../../services/fetch'
import { getReservations } from '../../services/fetch'
import { Button } from '../Button'
//import icons

import SingleBooking from './SingleBooking'


const AdminHome = () => {
    const navigate = useNavigate()
    const { updatedBooking,
        setUpdatedBooking } = useContext(UpdateContext)
    const { userData, setUserData, setLoggedIn } = useContext(UserContext)

    const [dispSingleBooking, setDispSingleBooking] = useState(false)
    const [date, setDate] = useState(new Date())
    const { reservations, setReservations } = useContext(UpdateContext)
    const [todaysDate, setTodaysDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [noBookings, setNoBookings] = useState()
    const [currBooking, setCurrBooking] = useState()
    const [hideCal, setHideCal] = useState(false)
    const [token, setToken] = useState("")


    let maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + config.maxMonths)

    useEffect(() => {

        const checking = async () => {
            console.table(userData)
            let res = await checkToken(userData.token)

            console.log("token", res)
            if (!res) {
                console.log('user token not valid')
                setLoggedIn(false)
                navigate('/')
            }
            else {
                let currUser = await getUserFromToken(userData.token)
                console.log(currUser)
                const getNewReservations = async () => {
                    const reservationRes = await Axios.get(`http://localhost:5000/admin/${todaysDate}`, { headers: { 'x-auth-token': userData.token } })
                    setReservations(reservationRes.data.data.reservation)
                    if (reservationRes.data.data.reservation.length < 1) {
                        setNoBookings(true)
                    }
                    else {
                        setNoBookings(false)
                    }
                }
                getNewReservations()

            }

        }
        checking()


    }, [])


    // useEffect(() => {
    //     if (token) {
    //         const res = getReservations(todaysDate, userData.token)
    //         setReservations(res.data.data.reservation)
    //         if (res.data.data.reservation.length < 1) {
    //             setNoBookings(true)
    //         }
    //         else {
    //             setNoBookings(false)
    //         }
    //     }


    // }, [])


    useEffect(() => {
        if (token) {
            const res = getReservations(todaysDate, userData.token)
            setReservations(res.data.data.reservation)
        }

    }, [todaysDate])


    useEffect(() => {
        if (token) {
            const formattedDate = moment(date).format('YYYY-MM-DD')
            const getReservations = async () => {
                const reservationRes = await Axios.get(`http://localhost:5000/admin/${formattedDate}`, { headers: { 'x-auth-token': userData.token } })
                setReservations(reservationRes.data.data.reservation)
            }
            getReservations()

        }
    }, [updatedBooking])


    const handleChangeDate = date => {
        setDate(date)
        const formattedDate = moment(date).format('YYYY-MM-DD')
        const getReservations = async () => {
            const reservationRes = await Axios.get(`http://localhost:5000/admin/${formattedDate}`, { headers: { 'x-auth-token': userData.token } })
            setReservations(reservationRes.data.data.reservation)
            console.log(reservationRes.data.data.reservation)
            if (reservationRes.data.data.reservation.length < 1) {
                setNoBookings(true)
            }
            else {
                setNoBookings(false)
            }
        }
        getReservations()
    }

    const handleSelectBooking18 = async () => {
        setReservations(reservations.filter(res => res.time === '18:00'))
    }

    const handleSelectBooking21 = async () => {
        setReservations(reservations.filter(res => res.time === '21:00'))
    }


    const handleEdit = (data) => {
        setHideCal(!hideCal)
        setDispSingleBooking(!dispSingleBooking)
        setCurrBooking(data)
    }

    const showBookingInfo = (data) => {
        setHideCal(!hideCal)
        setCurrBooking(data)

    }

    return (
        <>
            <div className="admin-wrapper">
                <div className="head">
                    <h1 className="header"> Logged in as, {userData.user.email}</h1>
                    <p>{todaysDate}</p>
                </div>
                <div className="cont">
                    <div className="outer">
                        <div className="time-select">
                            <div className="sortbytime">
                                <div className="btn-wrapper">
                                    <Button
                                        onClick={handleSelectBooking18}
                                        buttonColor='green'
                                    >
                                        18:00</Button>
                                </div>
                                <div className="btn-wrapper">
                                    <Button
                                        buttonColor='red'
                                        onClick={handleSelectBooking21}>21:00</Button>
                                </div>

                            </div>
                        </div>
                        <div className="booking-info">
                            {!noBookings ?
                                reservations.map((booking, index) => (
                                    <div key={index} onClick={() => handleEdit(booking)} className="inner">
                                        <div className="item-box">
                                            <ul>
                                                <li><strong>{booking.firstname} {booking.lastname}</strong> | {booking.time} | {booking.people} pepole | {booking.email} </li>
                                            </ul>
                                        </div>
                                    </div>


                                )) :

                                <p className="no-books">no bookings on this date</p>



                            }
                        </div>
                        {
                            dispSingleBooking ? <SingleBooking booking={currBooking} /> : !hideCal &&
                                <div className="date-outer">
                                    <Calendar
                                        onChange={handleChangeDate}
                                        value={date}
                                        maxDate={maxDate}
                                        minDate={new Date()}
                                    />
                                </div>
                        }
                    </div>

                </div>

            </div>
        </>
    )
}

export default AdminHome
