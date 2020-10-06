import React, { useEffect, useContext, useState } from 'react'
import DatePicker from './DatePicker'
import ChooseTimeAndGuests from './forms/ChooseTimeAndGuests'
import BookingForm from './forms/BookingForm'
import ShowBooking from './ShowBooking'
import { DateContext } from '../contexts/DateContext'
import { TimeContext } from '../contexts/TimeContext'
import { FormContext, FormProvider } from '../contexts/FormContext'
import { BookingContext } from '../contexts/BookingContext'
import { UpdateContext } from '../contexts/UpdateContext'

import './Button.css'
import './MakeBooking.css'

const Book = () => {

    const { hideMsg, setHideMsg } = useContext(UpdateContext)
    const { pickedDate, setPickedDate } = useContext(DateContext)
    const { bookingMade, setBookingMade } = useContext(BookingContext)
    const { formValues, setFormValues } = useContext(FormContext)
    const { isHidden, setIsHidden } = useContext(UpdateContext)


    const { isClicked, setIsClicked } = useContext(UpdateContext)

    useEffect(() => {
        console.log('I picked a date', pickedDate)

    }, [pickedDate])

    useEffect(() => {
        console.log('Date you picked is', formValues.date)
    }, [])

    useEffect(() => {
        console.log('im clicked')
    }, [isClicked])




    // const dispSelectTimeAndSeats = (date) => {
    //     if (pickedDate) {
    //         return <ChooseTimeAndGuests />
    //     }
    //     else if (!pickedDate) {
    //         return <p className="pickInfo">select a date</p>
    //     }
    //     else return false
    // }

    // const dispForm = (isClicked) => {
    //     if (isClicked) {
    //         return <BookingForm />
    //     }
    //     else return null
    // }


    return (

        <>
            {
                isHidden ? null : !hideMsg && !isHidden ?
                    <>
                        <DatePicker />
                        <p className="pickInfo" id="pickDate">please pick a date</p>
                    </>
                    : <DatePicker />
            }
            {
                (pickedDate && !isHidden) &&
                <ChooseTimeAndGuests />

            }
            {
                isClicked &&
                <BookingForm />
            }
            {

            }
        </>

    )
}

export default Book
