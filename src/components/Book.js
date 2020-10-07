import React, { useContext } from 'react'
import DatePicker from './DatePicker'
import ChooseTimeAndGuests from './forms/ChooseTimeAndGuests'
import BookingForm from './forms/BookingForm'
import { BookingContext } from '../contexts/BookingContext'
import { UpdateContext } from '../contexts/UpdateContext'

import './Button.css'
import './MakeBooking.css'

const Book = () => {

    const { hideMsg } = useContext(UpdateContext)
    const { pickedDate } = useContext(BookingContext)

    const { isHidden } = useContext(UpdateContext)
    const { isClicked } = useContext(UpdateContext)


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
