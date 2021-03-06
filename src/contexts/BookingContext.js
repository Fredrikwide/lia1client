import React, { useState, createContext, useEffect } from 'react'
import moment from 'moment'
export const BookingContext = createContext();

const intitalValues = {
    date: null,
    time: null,
    people: 0,
    gdpr: false
}


export const BookingProvider = props => {

    const [date, setDate] = useState(new Date());
    const [pickedDate, setPickedDate] = useState(false)
    const [formValues, setFormValues] = useState(intitalValues)
    const [latestBooking, setLatestBooking] = useState({})
    const [fullyBooked, setFullyBooked] = useState(false)
    const [fullyBooked18, setFullyBooked18] = useState(false)
    const [fullyBooked21, setFullyBooked21] = useState(false)
    const [currTime, setCurrTime] = useState(moment(date).format('MMMM Do YYYY, h:mm:ss a'))


    useEffect(() => {

    }, [formValues])


    const bookingContextValue = {
        date,
        setDate,
        pickedDate,
        setPickedDate,
        formValues,
        setFormValues,
        latestBooking,
        setLatestBooking,
        fullyBooked,
        setFullyBooked,
        fullyBooked18,
        setFullyBooked18,
        fullyBooked21,
        setFullyBooked21,
        currTime,
        setCurrTime

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
