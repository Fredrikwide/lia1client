import React, { useState, useContext, useEffect } from 'react'
import Editor from './Editor'
import moment from 'moment'
import { Button } from '../Button'
import { UserContext } from '../../contexts/UserContext'
import { UpdateContext } from '../../contexts/UpdateContext'
import { getReservations, deleteReservation } from '../../services/fetch'
import { getReservations } from '../../services/fetch'
import Axios from 'axios'
import { FaRegTimesCircle } from 'react-icons/fa';





const SingleBooking = (props) => {


    const { reservations, setReservations, hideCal, setHideCal, setDispSingleBooking } = useContext(UpdateContext)
    const { userData } = useContext(UserContext)
    const { setEditActive, editActive } = useContext(UpdateContext)
    const handleEdit = () => {
        setEditActive(!editActive)
    }


    useEffect(() => {
        console.log('helllo i ran')
    }, [reservations])


    const handleDelete = async (id) => {

        let res = await deleteReservation(id, userData.token)
        if (res.status === 200) {

            const rees = await getReservations(props.booking.date, userData.token)
            setReservations(rees.data.data.reservation)
            setHideCal(false)
            setDispSingleBooking(false)
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
                            <p className="cloase"><FaRegTimesCircle /></p>
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
                        buttonColor='outline'
                    >edit
                    </Button>
                    <Button
                        onClick={handleDelete}
                        buttonColor='outline'
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
