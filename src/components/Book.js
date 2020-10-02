import React, { useEffect, useContext, useState } from 'react'
import DatePicker from './DatePicker'
import ChooseTimeAndGuests from './forms/ChooseTimeAndGuests'
import BookingForm from './forms/BookingForm'
import ShowBooking from './ShowBooking'
import { DateContext } from '../contexts/DateContext'
import { Button } from './Button'
import './Button.css'
import './MakeBooking.css'

const Book = () => {

    const [datePicked, setDatePicked] = useContext(DateContext)
    const [bookingMade, setBookingMade] = useContext(DateContext)
    const [pickedTime, setPickedTime] = useContext(DateContext)
    const [pickedSeat, setPickedSeat] = useContext(DateContext)
    const [showForm, setShowForm] = useContext(DateContext)

    useEffect(() => {
        console.log('I RAN I RAN', datePicked)
    }, [datePicked])


    const handleClick = (e) => {
        setShowForm(true)
    }





    return (
        <>{
            !bookingMade ?
                <DatePicker />
                : datePicked ?
                    <>
                        <DatePicker />
                        <ChooseTimeAndGuests />
                    </>
                    : (pickedTime && pickedSeat) ?
                        (<>
                            <DatePicker />
                            <ChooseTimeAndGuests />
                            <div className="btn-wrapper">
                                <Button
                                    buttonSize='btn--medium'
                                    buttonColor='black'
                                    onClick={handleClick}>
                                    Continue
                                </Button>
                            </div>

                        </>
                        )
                        : showForm ? <BookingForm />
                            : (!pickedSeat || !pickedTime) ? <p>please pick a time and seat </p>
                                : !datePicked ? <p>please pick a date</p> : bookingMade ? <ShowBooking /> : null

        }</>
    )
}

export default Book
