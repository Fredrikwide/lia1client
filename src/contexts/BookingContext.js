import React, { useState, createContext } from 'react'

export const BookingContext = createContext();

const intitalValues = {
    date: null,
    time: null,
    seats: 0,
}

export const BookingProvider = props => {

    const [date, setDate] = useState(new Date());
    const [pickedDate, setPickedDate] = useState(false)
    const [formValues, setFormValues] = useState(intitalValues)


    const bookingContextValue = {
        date,
        setDate,
        pickedDate,
        setPickedDate,
        formValues,
        setFormValues,
    }

    return (
        <BookingContext.Provider
            value=
            {bookingContextValue}
        >
            {props.children}
        </BookingContext.Provider>
    )
}
