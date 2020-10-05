import React, { useState, createContext, useEffect } from 'react'

export const TimeContext = createContext();

export const TimeProvider = props => {

    const [availableFirst, setAvailableFirst] = useState(true)
    const [availableLast, setAvailableLast] = useState(true)
    const [availableTimes, setAvailableTimes] = useState([])


    const TimeContextValue = {

        availableFirst,
        setAvailableFirst,
        availableLast,
        setAvailableLast,
    }

    return (
        <TimeContext.Provider
            value=
            {TimeContextValue}
        >
            {props.children}
        </TimeContext.Provider>
    )
}