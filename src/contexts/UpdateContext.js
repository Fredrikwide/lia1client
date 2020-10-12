import React, { useState, createContext } from 'react'

export const UpdateContext = createContext();





export const UpdateProvider = props => {
    const [hideMsg, setHideMsg] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [pageReset, setPageReset] = useState(false)
    const [updatedBooking, setUpdatedBooking] = useState(false)
    const [editActive, setEditActive] = useState(false)

    const updateContextValue = {

        isClicked,
        setIsClicked,
        isHidden,
        setIsHidden,
        hideMsg,
        setHideMsg,
        pageReset,
        setPageReset,
        updatedBooking,
        setUpdatedBooking,
        editActive,
        setEditActive
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
