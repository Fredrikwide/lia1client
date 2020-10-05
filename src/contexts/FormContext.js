import React, { useState, createContext, useEffect } from 'react'

export const FormContext = createContext();

const intitalValues = {
    firstname: '',
    lastname: '',
    phone: '',
    date: null,
    time: null,
    seats: 0
}

export const FormProvider = props => {


    const [formValues, setFormValues] = useState(intitalValues)

    const [latestBooking, setLatestBooking] = useState({})
    const [bookingMade, setBookingMade] = useState(false)



    const formContextValue = {

        formValues,
        setFormValues,
        latestBooking,
        setLatestBooking,

    }

    return (
        <FormContext.Provider
            value=
            {formContextValue}
        >
            {props.children}
        </FormContext.Provider>
    )
}
