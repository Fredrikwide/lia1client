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
//import icons
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import Editor from './Editor';
import SingleBooking from './SingleBooking'


const AdminHome = () => {
    const navigate = useNavigate()
    const { updatedBooking,
        setUpdatedBooking } = useContext(UpdateContext)
    const { userData, setUserData, setLoggedIn } = useContext(UserContext)

    const [dispSingleBooking, setDispSingleBooking] = useState(false)
    const [date, setDate] = useState(new Date())
    const [reservations, setReservations] = useState([])
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


    useEffect(() => {
        if (token) {
            console.log('im running')

        }
    }, [])

    useEffect(() => {
        if (token) {
            const getReservations = async () => {
                const reservationRes = await Axios.get(`http://localhost:5000/admin/${todaysDate}`, { headers: { 'x-auth-token': userData.token } })
                setReservations(reservationRes.data.data.reservation)
                if (reservationRes.data.data.reservation.length < 1) {
                    setNoBookings(true)
                }
                else {
                    setNoBookings(false)
                }
            }
            getReservations()

        }

    }, [])


    useEffect(() => {
        if (token) {
            const getNewReservations = async () => {
                const reservationRes = await Axios.get(`http://localhost:5000/admin/${todaysDate}`, { headers: { 'x-auth-token': userData.token } })
                setReservations(reservationRes.data.data.reservation)
            }
            getNewReservations()
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

    const handleDelete = async id => {

        let res = await Axios.delete(`http://localhost:5000/admin/reservation/${id}`, { headers: { 'x-auth-token': userData.token } })
        console.log(res)
        if (res.status === 200) {
            const formattedDate = moment(date).format('YYYY-MM-DD')
            const getReservations = async () => {
                const reservationRes = await Axios.get(`http://localhost:5000/admin/${formattedDate}`, { headers: { 'x-auth-token': userData.token } })
                setReservations(reservationRes.data.data.reservation)
            }
            getReservations()
            console.log(reservations)
        }
        else { return null }
    }

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
                    <h1> Login as, {userData.email}</h1>
                    <p>{todaysDate}</p>
                </div>
                <div className="cont">
                    <div className="outer">
                        <div className="booking-info">
                            {!noBookings ?
                                reservations.map((booking, index) => (
                                    <div key={index} onClick={() => handleEdit(booking)} className="inner">
                                        <div className="item-box">
                                            <p>{booking.firstname} {booking.lastname} {booking.time} hello</p>
                                        </div>
                                    </div>


                                )) :

                                <p className="no-books">Sorry no bookins on this date</p>



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
