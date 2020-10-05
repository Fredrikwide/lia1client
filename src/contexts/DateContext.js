import React, { useState, createContext, useEffect } from 'react'

export const DateContext = createContext();


const logMessage = message => {
    console.log(message);
};

export const DateProvider = props => {

    const [date, setDate] = useState(new Date());
    const [pickedDate, setPickedDate] = useState(false)
    const [availableDate, setAvailableDate] = useState(true)


    const dateContextValue = {
        date,
        setDate,
        pickedDate,
        setPickedDate,
        availableDate,
        setAvailableDate,
        logMessage
    }

    return (
        <DateContext.Provider
            value=
            {dateContextValue}
        >
            {props.children}
        </DateContext.Provider>
    )
}
