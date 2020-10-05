import React, { useState, createContext, useEffect } from 'react'

export const BookingContext = createContext();


const initialBookingVal = false

const logMessage = message => {
    console.log(message);
};

export const BookingProvider = props => {

    const [bookingMade, setBookingMade] = useState(initialBookingVal)

    const bookingContextValue = {

        bookingMade,
        setBookingMade,
        logMessage
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
