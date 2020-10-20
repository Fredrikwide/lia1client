import React, { useState, useContext, useEffect } from 'react'
import Editor from './Editor'
import moment from 'moment'
import { Button } from '../Button'
import { UserContext } from '../../contexts/UserContext'
import { UpdateContext } from '../../contexts/UpdateContext'
import { getReservations } from '../../services/fetch'
import Axios from 'axios'





const SingleBooking = (props) => {

    const [date, setDate] = useState(new Date())
    const { reservations, setReservations, hideCal, setHideCal } = useContext(UpdateContext)
    const { userData, setUserData, setLoggedIn } = useContext(UserContext)
    const { setEditActive, editActive } = useContext(UpdateContext)
    const handleEdit = () => {
        setEditActive(!editActive)
    }


    useEffect(() => {
        console.log('helllo i ran')
    }, [reservations])


    const handleDelete = async id => {

        let res = await Axios.delete(`http://localhost:5000/admin/reservation/${props.booking._id}`, { headers: { 'x-auth-token': userData.token } })
        console.log(res)
        if (res.status === 200) {
            const formattedDate = moment(date).format('YYYY-MM-DD')
            const rees = getReservations(formattedDate, userData.token)
            setReservations(rees.data.data.reservation)

            console.log(reservations)
        }
        else { return null }
    }

    return (
        <>
            <div className="show-booking-container">
                <div className="show-booking">
                    {
                        props.booking._id &&
                        <>
                            <h1>Booking info</h1>
                            <p><strong>Booking number:</strong> {props.booking._id}</p>
                            <p><strong>Name:</strong> {props.booking.firstname} {props.booking.lastname}</p>
                            <p><strong>Email:</strong> {props.booking.email}</p>
                            <p><strong>Phone:</strong> {props.booking.phone}</p>
                            <p><strong>Date:</strong> {moment(props.booking.date).format('DD/MM')}</p>
                            <p><strong>Time:</strong> {props.booking.time}</p>
                            <p><strong>Persons</strong> {props.booking.people}</p>
                        </>
                    }
                    <Button
                        onClick={handleEdit}
                        buttonColor='orange'
                    >edit
                    </Button>
                    <Button
                        onClick={handleDelete}
                        buttonColor='red'
                    >delete
                    </Button>


                </div>
                {
                    editActive && <div className="container"><Editor booking={props.booking} /></div>
                }
            </div>
        </>
    )
}

export default SingleBooking
