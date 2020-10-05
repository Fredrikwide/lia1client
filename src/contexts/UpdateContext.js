import React, { useState, createContext, useEffect } from 'react'

export const UpdateContext = createContext();


const initialCont = false

const logMessage = message => {
    console.log(message);
};

export const UpdateProvider = props => {
    const [hideMsg, setHideMsg] = useState(false)
    const [isClicked, setIsClicked] = useState(initialCont)
    const [isHidden, setIsHidden] = useState(false)

    const updateContextValue = {

        isClicked,
        setIsClicked,
        isHidden,
        setIsHidden,
        hideMsg,
        setHideMsg,
        logMessage
    }

    return (
        <UpdateContext.Provider
            value=
            {updateContextValue}
        >
            {props.children}
        </UpdateContext.Provider>
    )
}
