import React, { useState, createContext } from 'react'

export const UpdateContext = createContext();





export const UpdateProvider = props => {
    const [hideMsg, setHideMsg] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [isHidden, setIsHidden] = useState(false)

    const updateContextValue = {

        isClicked,
        setIsClicked,
        isHidden,
        setIsHidden,
        hideMsg,
        setHideMsg,
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
