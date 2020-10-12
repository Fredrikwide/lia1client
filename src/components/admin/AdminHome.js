import './admin.scss'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { UpdateContext } from '../../contexts/UpdateContext'
import Calendar from 'react-calendar'
import { config } from '../../config';
import moment from 'moment'
import Axios from 'axios'

//import icons
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import Editor from './Editor';


const AdminHome = () => {
    const { updatedBooking,
        setUpdatedBooking } = useContext(UpdateContext)
    const { userData, setUserData } = useContext(UserContext)
    const [edit, setEdit] = useState(false)
    const [date, setDate] = useState(new Date())
    const [reservations, setReservations] = useState([])
    const [todaysDate, setTodaysDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [noBookings, setNoBookings] = useState()
    const [currBooking, setCurrBooking] = useState()
    const [hideCal, setHideCal] = useState(false)


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


    useEffect(() => {
        const formattedDate = moment(date).format('YYYY-MM-DD')
        const getReservations = async () => {
            const reservationRes = await Axios.get(`http://localhost:5000/admin/${formattedDate}`)
            setReservations(reservationRes.data.data.reservation)
        }
        getReservations()
    }, [updatedBooking])

    const handleDelete = async id => {

        let res = await Axios.delete(`http://localhost:5000/admin/reservation/${id}`)
        console.log(res)
        if (res.status === 200) {
            const formattedDate = moment(date).format('YYYY-MM-DD')
            const getReservations = async () => {
                const reservationRes = await Axios.get(`http://localhost:5000/admin/${formattedDate}`)
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
            const reservationRes = await Axios.get(`http://localhost:5000/admin/${formattedDate}`)
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
        setEdit(!edit)
        setCurrBooking(data)
    }

    const showBookingInfo = (data) =>{
        setHideCal(!hideCal)
        setCurrBooking(data)
        
    }

    return (
        <>
            <div className="admin-wrapper">
                <div className="head">
                    <h1> Login as, {userData.user.email}</h1>
                    <p>{todaysDate}</p>
                </div>
                <div className="cont">
                    <div className="outer">
                        <div className="booking-info">
                            {!noBookings ?
                                reservations.map((booking, index) => (
                                    <div key={index} onClick={()=> handleEdit(booking)} className="inner">
                                        <div className="item-box">
                                           <p>{booking.firstname} {booking.lastname} {booking.time}</p>
                                        </div>
                                    </div>


                                )) :

                                <p className="no-books">Sorry no bookins on this date</p>



                        }
                        </div>
                        {
                            edit ? <Editor booking={currBooking} /> : !hideCal &&
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
                    {

                    }
                </div>

            </div>
        </>
    )
}

export default AdminHome
