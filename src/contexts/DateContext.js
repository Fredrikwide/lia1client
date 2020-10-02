import React, { useState, createContext } from 'react'

export const DateContext = createContext();

export const DateProvider = props => {


    const [date, setDate] = useState(new Date());
    const [availableFirst, setAvailableFirst] = useState(true)
    const [availableLast, setAvailableLast] = useState(true)
    const [startDate, setStartDate] = useState(new Date());
    const [availableDate, setAvailableDate] = useState(true)
    const [datePicked, setDatePicked] = useState(false)
    const [pickedTime, setPickedTime] = useState(false)
    const [latestBooking, setLatestBooking] = useState()
    const [pickedSeat, setPickedSeat] = useState(false)
    const [bookingMade, setBookingMade] = useState(false)
    const [show, setShow] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [availableTimes, setAvailableTimes] = useState([])
    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        date: null,
        time: false,
        seats: 0
    })


    return (
        <DateContext.Provider
            value=
            {
                [startDate, setStartDate],
                [date, setDate],
                [availableFirst, setAvailableFirst],
                [availableLast, setAvailableLast],
                [availableDate, setAvailableDate],
                [datePicked, setDatePicked],
                [pickedTime, setPickedTime],
                [pickedSeat, setPickedSeat],
                [formValues, setFormValues],
                [showForm, setShowForm],
                [availableTimes, setAvailableTimes],
                [latestBooking, setLatestBooking],
                [bookingMade, setBookingMade]

            }
        >
            {props.children}
        </DateContext.Provider>
    )
}
