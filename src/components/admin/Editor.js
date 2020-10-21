import React, { useContext, useState, useEffect } from 'react'
import './admin.scss'
import './Editor.scss'
import { FaRegTimesCircle } from 'react-icons/fa';
import { UpdateContext } from '../../contexts/UpdateContext'
import { Button } from '../Button'
import { UserContext } from '../../contexts/UserContext'
import { updateReservation, getReservations } from '../../services/fetch'

const Editor = (props) => {

    const {
        setUpdatedBooking,
        reservations,
        setReservations } = useContext(UpdateContext)
    const { setEditActive, setHideCal, setDispSingleBooking } = useContext(UpdateContext)
    const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6])
    const [editBookingInfo, setEditBookingInfo] = useState({
        firstname: props.booking.firstname,
        lastname: props.booking.lastname,
        email: props.booking.email,
        phone: props.booking.phone,
        date: props.booking.date,
        time: props.booking.time,
        seats: props.booking.people
    })
    const { userData } = useContext(UserContext)


    const [defaultSelectTime, setDefaultSelectTime] = useState(editBookingInfo.time)
    const [defaultSelectSeat, setDefaultSelectSeat] = useState(editBookingInfo.seats)

    useEffect(() => {
        console.log('helllo i ran')
    }, [reservations])


    const handleUpdate = async (id, data, token) => {
        let res = await updateReservation(id, data, token)
        if (res.status === 200) {
            const rees = await getReservations(props.booking.date, userData.token)
            setReservations(rees.data.data.reservation)
            setEditActive(false)
            setHideCal(false)
            setEditActive(false)
            console.log(reservations)
        }
        else { return null }
    }


    const handleChangefirstName = (e) => {
        setEditBookingInfo({ ...editBookingInfo, firstname: e.target.value })
    }

    const handleChangelastName = (e) => {
        setEditBookingInfo({ ...editBookingInfo, lastname: e.target.value })
    }

    const handleChangeEmail = (e) => {
        setEditBookingInfo({ ...editBookingInfo, email: e.target.value })
    }

    const handleChangePhone = (e) => {
        setEditBookingInfo({ ...editBookingInfo, phone: e.target.value })
    }

    const handleChangeTime = (e) => {
        setDefaultSelectTime(e.target.value)
        setEditBookingInfo({ ...editBookingInfo, time: e.target.value })
    }


    const handleChangeSeats = (e) => {
        setDefaultSelectSeat(e.target.value)
        setEditBookingInfo({ ...editBookingInfo, people: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleUpdate(props.booking._id, editBookingInfo, userData.token)

    }

    const handleClose = () => {
        setEditActive(false)
    }

    return (
        <>
            <div className="edit-form">
                <form onSubmit={handleSubmit}>
                    <p className="exit" onClick={handleClose}><FaRegTimesCircle /></p>
                    <h1>Booking info</h1>
                    <p><strong>Booking number:</strong> {props.booking._id}</p>
                    <p><strong>Name:</strong> {editBookingInfo.firstname} {editBookingInfo.lastname}</p>
                    <div>
                        <div className="inp-box">
                            <input
                                type="text"
                                onChange={handleChangefirstName}
                                name="firstname"
                                value={editBookingInfo.firstname}
                            />
                        </div>
                        <div className="inp-box">
                            <input
                                type="text"
                                onChange={handleChangelastName}
                                name="lastname"
                                value={editBookingInfo.lastname}
                            />
                        </div>
                    </div>
                    <p><strong>Email:</strong> {editBookingInfo.email}</p>
                    <div className="inp-box">
                        <input
                            type="email"
                            onChange={handleChangeEmail}
                            name="email"
                            value={editBookingInfo.email} />
                    </div>
                    <p><strong>Phone:</strong> {editBookingInfo.phone}</p>
                    <div className="inp-box">
                        <input
                            type="tel"
                            minLength="10"
                            maxLength="12"
                            onChange={handleChangePhone}
                            name="phone"
                            value={editBookingInfo.phone} />

                    </div>

                    <div className="select-time-box">
                        <div className="select-inner">
                            <p><strong>Time:</strong> {editBookingInfo.time}</p>
                            <select
                                name="time"
                                id="time"
                                onChange={handleChangeTime}
                                value={defaultSelectTime}
                            >

                                <option
                                    value={defaultSelectTime}
                                    disabled >{defaultSelectTime}
                                </option>
                                <option
                                    value={'18:00'}

                                >18:00</option>
                                <option
                                    value={'21:00'}

                                >21:00</option>

                            </select>
                        </div>
                        <div className="select-inner">
                            <p><strong>Persons</strong> {props.booking.people}</p>
                            <select
                                name="seats"
                                id="seats"
                                onChange={handleChangeSeats}
                                value={defaultSelectSeat}
                            >
                                <option
                                    value={defaultSelectSeat}
                                    disabled>
                                    {defaultSelectSeat}
                                </option>
                                {
                                    seats.map((seat, index) =>
                                        (<option
                                            key={index}
                                            value={seat}
                                        >
                                            {seat}
                                        </option>)
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="btn-wrapper">

                        <Button
                            type='submit'
                            buttonSize='btn--medium'
                            buttonColor='black'
                        >Save changes
                            </Button>


                    </div>


                </form>
            </div>
        </>
    )
}

export default Editor
