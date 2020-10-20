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
import { FaFilter } from 'react-icons/fa';

//import icons

import SingleBooking from './SingleBooking'


const AdminHome = () => {
    const navigate = useNavigate()
    const { updatedBooking,
        setUpdatedBooking,
        dispSingleBooking,
        setDispSingleBooking } = useContext(UpdateContext)

    const { userData, setUserData, setLoggedIn } = useContext(UserContext)


    const [date, setDate] = useState(new Date())
    const { reservations, setReservations } = useContext(UpdateContext)
    const [todaysDate, setTodaysDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [noBookings, setNoBookings] = useState()
    const [timeArr18, setTimeArr18] = useState([])
    const [timeArr21, setTimeArr21] = useState([])
    const [currBooking, setCurrBooking] = useState()
    const [hideCal, setHideCal] = useState(false)
    const [token, setToken] = useState("")
    const [isActive18, setIsActive18] = useState(false)
    const [isActive21, setIsActive21] = useState(false)
    const [isActiveAll, setIsActiveAll] = useState(true)


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


    useEffect(() => {
        if (token) {
            const res = getReservations(todaysDate, userData.token)
            setReservations(res.data.data.reservation)
            if (res.data.data.reservation.length < 1) {
                setNoBookings(true)
            }
            else {
                setNoBookings(false)
            }
        }


    }, [])


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
        if (e.target.value === "18:00") {
            const filtered18 = reservations.filter(res => res.time === e.target.value)
            setTimeArr18(timeArr18 => [...filtered18])
            setIsActive18(true)
            setIsActive21(false)
            setIsActiveAll(false)
        }
        else if (e.target.value === "21:00") {
            const filtered21 = reservations.filter(res => res.time === e.target.value)
            setTimeArr21(timeArr21 => [...filtered21])
            setIsActive18(false)
            setIsActive21(true)
            setIsActiveAll(false)
        }
        else {
            setIsActive18(false)
            setIsActive21(false)
            setIsActiveAll(true)
        }

    }



    useEffect(() => {

    }, [timeArr18, timeArr21])




    const handleEdit = (data) => {
        setHideCal(!hideCal)
        setDispSingleBooking(!dispSingleBooking)
        setCurrBooking(data)
    }



    return (
        <>
            <div className="admin-wrapper">
                <div className="head">
                    <h1 className="header"> Logged in as, {userData.user.email}</h1>
                    <p>{todaysDate}</p>
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
                                        value={'18:00'}
                                    >
                                        18:00</Button>
                                </div>
                                <div className="btn-wrapper">
                                    <Button
                                        buttonColor={isActive21 ? 'outline-active' : 'outline'}
                                        value={'21:00'}
                                        onClick={handleSelectBooking}>21:00</Button>
                                </div>
                               
                        </div>
                </div>
                <div className="cont">
                    <div className="outer">
                        <div className="booking-info">
                            {!noBookings && isActiveAll ?
                                reservations.map((booking, index) => (
                                    <div key={index} onClick={() => handleEdit(booking)} className="inner">
                                        <div className="item-box">
                                            <ul>
                                                <li><strong>{booking.firstname} {booking.lastname}</strong> | {booking.time}  | people   {booking.people} | {booking.email}</li>
                                            </ul>
                                        </div>
                                    </div>

                                ))
                                : isActive18 ? timeArr18.map((res, index) => (
                                    <div key={index} onClick={() => handleEdit(res)} className="inner">
                                        <div className="item-box">
                                            <ul>
                                                <li><strong>{res.firstname} {res.lastname}</strong>  | {res.time}  | people   {res.people} | {res.email} </li>
                                            </ul>
                                        </div>
                                    </div>

                                ))

                                    : isActive21 ? timeArr21.map((res, index) => (
                                        <div key={index} onClick={() => handleEdit(res)} className="inner">
                                            <div className="item-box">
                                                <ul>
                                                    <li><strong>{res.firstname} {res.lastname}</strong> | {res.time}  | people   {res.people} | {res.email} </li>
                                                </ul>
                                            </div>
                                        </div>

                                    ))

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
