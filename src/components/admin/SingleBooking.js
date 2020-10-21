import React, { useState, useContext, useEffect } from 'react'
import Editor from './Editor'
import moment from 'moment'
import { Button } from '../Button'
import { UserContext } from '../../contexts/UserContext'
import { UpdateContext } from '../../contexts/UpdateContext'
import { getReservations, deleteReservation } from '../../services/fetch'



const SingleBooking = (props) => {


    const { reservations, setReservations, hideCal, setHideCal, setDispSingleBooking } = useContext(UpdateContext)
    const { userData } = useContext(UserContext)
    const { setEditActive, editActive } = useContext(UpdateContext)
    const handleEdit = () => {
        setEditActive(true)
    }


    useEffect(() => {
        console.log('helllo i ran')
    }, [reservations])


    const handleDelete = async (id) => {
        console.log('token is in SINGLE', userData.token)
        let res = await deleteReservation(id, userData.token)
        console.log(res)
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
                        !editActive && props.booking._id ?
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
                            : editActive ?

                                <Editor booking={props.booking} />
                                :
                                <p>error</p>
                    }
                    {!editActive &&
                        <>
                            <Button
                                onClick={handleEdit}
                                buttonColor='outline'
                            >edit
                            </Button>
                            <Button
                                onClick={() => handleDelete(props.booking._id)}
                                buttonColor='outline'
                            >delete
                            </Button>
                        </>
                    }

                </div>
                {

                }
            </div>
        </>
    )
}

export default SingleBooking