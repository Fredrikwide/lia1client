import './admin.scss'
import React, { useState, useContext, useEffect } from 'react'
import moment from 'moment'
import Axios from 'axios'
import Calendar from 'react-calendar'

import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { UpdateContext } from '../../contexts/UpdateContext'
import { config } from '../../config';
import { checkToken } from '../../services/authToken'
import { getUserFromToken } from '../../services/fetch'
import { getReservations } from '../../services/fetch'
import { Button } from '../Button'
import { BookingList } from './BookingList'
import { FaFilter } from 'react-icons/fa'

import SingleBooking from './SingleBooking'

const AdminHome = () => {

    const navigate = useNavigate()

    const { userData, setLoggedIn } = useContext(UserContext)

    const {

        reservations,
        setReservations,
        hideCal,
        currBooking,
        dispSingleBooking,
        setDispSingleBooking,
        updatedBooking

    } = useContext(UpdateContext)

    const [date, setDate] = useState(new Date())
    const [todaysDate, setTodaysDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [noBookings, setNoBookings] = useState()
    const [timeArr18, setTimeArr18] = useState([])
    const [timeArr21, setTimeArr21] = useState([])
    const [firstTime, setFirstTime] = useState('18:00')
    const [lastTime, setLastTime] = useState('21:00')
    const [isActive18, setIsActive18] = useState(false)
    const [isActive21, setIsActive21] = useState(false)
    const [isActiveAll, setIsActiveAll] = useState(true)


    let maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + config.maxMonths)

    useEffect(() => {

        const checking = async () => {
            let res = await checkToken(userData.token)
            if (!res) {
                setLoggedIn(false)
                navigate('/')
            }
            else {
                // let currUser = await getUserFromToken(userData.token)
                const getNewReservations = async () => {
                    const reservationRes = await getReservations(todaysDate, userData.token)
                    setReservations(reservationRes.data.data.reservation)
                    setDispSingleBooking(false)
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


    useEffect(() => {
        const get = async () => {
            const res = await getReservations(todaysDate, userData.token)
            setReservations(res.data.data.reservation)
        }
        get()

    }, [todaysDate, updatedBooking])



    const handleChangeDate = date => {
        setDate(date)
        const formattedDate = moment(date).format('YYYY-MM-DD')
        const getReservations = async () => {
            const reservationRes = await Axios.get(`http://localhost:5000/admin/${formattedDate}`, { headers: { 'x-auth-token': userData.token } })
            setReservations(reservationRes.data.data.reservation)
            setIsActive18(false)
            setIsActive21(false)
            setIsActiveAll(true)

            if (reservationRes.data.data.reservation.length < 1) {
                setNoBookings(true)
            }
            else {
                setNoBookings(false)
            }
        }
        getReservations()
    }

    const handleSelectBooking = (e) => {
        if (e.target.value === firstTime) {
            const filtered18 = reservations.filter(res => res.time === e.target.value)
            if (!filtered18.length < 1) {
                setTimeArr18(timeArr18 => [...filtered18])
                setIsActive18(true)
                setIsActive21(false)
                setIsActiveAll(false)
            }
            else setNoBookings(true)
        }
        else if (e.target.value === lastTime) {
            const filtered21 = reservations.filter(res => res.time === e.target.value)
            if (!filtered21.length < 1) {
                setTimeArr21(timeArr21 => [...filtered21])
                setIsActive18(false)
                setIsActive21(true)
                setIsActiveAll(false)
            }
            else setNoBookings(true)
        }
        else {
            setIsActive18(false)
            setIsActive21(false)
            setIsActiveAll(true)
        }

    }



    useEffect(() => {

    }, [timeArr18, timeArr21, noBookings])


    return (
        <>
            <div className="admin-wrapper">
                <div>
                    <div className="head">
                        <h1 className="header"> Logged in as, {userData.user.email}</h1>
                    </div>
                    <div className="time-select">
                        <div className="sortbytime">
                            <div className="icon">
                                <p><FaFilter /></p>
                            </div>
                            <div className="btn-wrapper">
                                <Button
                                    buttonColor={isActiveAll ? 'outline-active' : 'outline'}
                                    onClick={handleSelectBooking}>All</Button>
                            </div>
                            <div className="btn-wrapper">
                                <Button
                                    onClick={handleSelectBooking}
                                    buttonColor={isActive18 ? 'outline-active' : 'outline'}
                                    value={firstTime}
                                >
                                    18:00</Button>
                            </div>
                            <div className="btn-wrapper">
                                <Button
                                    buttonColor={isActive21 ? 'outline-active' : 'outline'}
                                    value={lastTime}
                                    onClick={handleSelectBooking}>21:00</Button>
                            </div>
                            <p className="todays-date">Todays date: {moment(todaysDate).format('MMMM Do YYYY')}</p>
                            <p className="todays-date">Reservations today: {reservations.length}</p>
                        </div>


                    </div>
                </div>
                <div className="cont">
                    <div className="outer">
                        <div className="booking-info">
                            {
                                !noBookings && isActiveAll
                                    ?
                                    <BookingList booking={reservations} />
                                    : isActive18
                                        ? <BookingList booking={timeArr18} />
                                        : isActive21
                                            ? <BookingList booking={timeArr21} />

                                            : <p className="no-books">no bookings on this date</p>
                            }
                        </div>
                        {
                            dispSingleBooking ?
                                <SingleBooking booking={currBooking} />
                                : !hideCal &&
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
