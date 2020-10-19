import React, { useState, useContext } from 'react'
import Editor from './Editor'
import moment from 'moment'
import { Button } from '../Button'

import { UpdateContext } from '../../contexts/UpdateContext'

const SingleBooking = (props) => {

    const { setEditActive, editActive } = useContext(UpdateContext)
    const handleClick = () => {
        setEditActive(!editActive)
    }
    return (
        <>
            <div className="show-booking-container">
                <div className="show-booking">
                    <h1>Booking info</h1>
                    <p><strong>Booking number:</strong> {props.booking._id}</p>
                    <p><strong>Name:</strong> {props.booking.firstname} {props.booking.lastname}</p>
                    <p><strong>Email:</strong> {props.booking.email}</p>
                    <p><strong>Phone:</strong> {props.booking.phone}</p>
                    <p><strong>Date:</strong> {moment(props.booking.date).format('DD/MM')}</p>
                    <p><strong>Time:</strong> {props.booking.time}</p>
                    <p><strong>Persons</strong> {props.booking.people}</p>
                    <Button
                        onClick={handleClick}
                        buttonColor='orange'
                    >edit
                    </Button>
                    <Button
                        onClick={handleClick}
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
